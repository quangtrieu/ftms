// auth.mjs — P1: đăng nhập nội bộ (không SSO).
// scrypt (node:crypto) · JWT HS256 tự dựng (không phụ thuộc thư viện) · cookie httpOnly 12h
// token_version giết phiên cũ khi đổi/đặt lại mật khẩu · khoá 5 lần sai/15 phút
// · 30 lượt/IP/15 phút · bắt đổi mật khẩu lần đầu · mọi sự kiện vào nhật ký NK.
import crypto from 'node:crypto';

const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };
export function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  const key = crypto.scryptSync(String(pw), salt, SCRYPT.keylen, SCRYPT);
  return `${salt}:${key.toString('hex')}`;
}
export function verifyPassword(pw, stored) {
  const [salt, hex] = String(stored).split(':');
  if (!salt || !hex) return false;
  const key = crypto.scryptSync(String(pw), salt, SCRYPT.keylen, SCRYPT);
  const a = Buffer.from(hex, 'hex');
  return a.length === key.length && crypto.timingSafeEqual(a, key);
}

const b64u = (b) => Buffer.from(b).toString('base64url');
export function kyJwt(payload, secret, hanGio = 12) {
  const h = b64u(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const p = b64u(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + hanGio * 3600 }));
  const sig = crypto.createHmac('sha256', secret).update(h + '.' + p).digest('base64url');
  return `${h}.${p}.${sig}`;
}
export function docJwt(token, secret) {
  try {
    const [h, p, sig] = String(token).split('.');
    const chuan = crypto.createHmac('sha256', secret).update(h + '.' + p).digest('base64url');
    if (sig !== chuan || sig.length === 0) return null;
    const payload = JSON.parse(Buffer.from(p, 'base64url').toString());
    if (payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch { return null; }
}

export function docCookie(req, ten) {
  const c = req.headers.get('cookie') || '';
  const m = c.match(new RegExp('(?:^|;\\s*)' + ten + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : null;
}

// Giới hạn 30 lượt thử/IP/15 phút — trong bộ nhớ (một tiến trình api)
const ipLog = new Map();
export function ipQuaTay(ip) {
  const now = Date.now();
  const arr = (ipLog.get(ip) || []).filter((t) => now - t < 15 * 60 * 1000);
  arr.push(now);
  ipLog.set(ip, arr);
  return arr.length > 30;
}

export class AuthService {
  constructor(sql, store, secret) {
    this.sql = sql; this.store = store; this.secret = secret;
  }

  /** Boot: tạo tài khoản cho nhân sự chưa có — tên đăng nhập = mã viết thường. */
  async taoTaiKhoanThieu(initialPassword) {
    const rows = await this.sql`SELECT id FROM employee ORDER BY pos`;
    const has = new Set((await this.sql`SELECT employee_id FROM user_account`).map((r) => r.employee_id));
    let n = 0;
    const hash = hashPassword(initialPassword);
    for (const r of rows) {
      if (has.has(r.id)) continue;
      await this.sql`INSERT INTO user_account(username, employee_id, password_hash)
                     VALUES (${r.id.toLowerCase()}, ${r.id}, ${hash})`;
      n++;
    }
    if (n) console.log(`[auth] tạo ${n} tài khoản đăng nhập (mật khẩu ban đầu dùng chung — phát trong ngày!)`);
    return n;
  }

  async login(username, password, ip) {
    if (ipQuaTay(ip)) return { loi: 'Quá nhiều lượt thử từ địa chỉ này. Chờ 15 phút.', ma: 429 };
    const [acc] = await this.sql`SELECT * FROM user_account WHERE username = ${String(username).toLowerCase()}`;
    const ghiNK = (viec, dt) => this.store.write('HE_THONG', (K) =>
      K.X.NK.unshift({ t: K.X.NOW, ai: acc?.employee_id || String(username), viec, dt, ip })).catch(() => {});
    if (!acc || !acc.active) { await ghiNK('Đăng nhập thất bại', 'tài khoản không tồn tại/đã khoá'); return { loi: 'Sai tên đăng nhập hoặc mật khẩu.', ma: 401 }; }
    if (acc.locked_until && new Date(acc.locked_until) > new Date())
      return { loi: 'Tài khoản tạm khoá do sai mật khẩu nhiều lần. Thử lại sau 15 phút.', ma: 423 };
    if (!verifyPassword(password, acc.password_hash)) {
      const fc = acc.failed_count + 1;
      await this.sql`UPDATE user_account SET failed_count=${fc},
        locked_until=${fc >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null}
        WHERE username=${acc.username}`;
      await ghiNK('Đăng nhập thất bại', `sai mật khẩu lần ${fc}`);
      return { loi: 'Sai tên đăng nhập hoặc mật khẩu.', ma: 401 };
    }
    await this.sql`UPDATE user_account SET failed_count=0, locked_until=NULL, last_login_at=now()
                   WHERE username=${acc.username}`;
    await ghiNK('Đăng nhập', 'thành công');
    const token = kyJwt({ sub: acc.employee_id, ver: acc.token_version }, this.secret);
    return { token, mustChange: acc.must_change, me: acc.employee_id };
  }

  async doiMatKhau(employeeId, cu, moi) {
    const [acc] = await this.sql`SELECT * FROM user_account WHERE employee_id=${employeeId}`;
    if (!acc) return { loi: 'Không có tài khoản.', ma: 404 };
    if (!verifyPassword(cu, acc.password_hash)) return { loi: 'Mật khẩu hiện tại không đúng.', ma: 400 };
    if (String(moi).length < 8) return { loi: 'Mật khẩu mới phải từ 8 ký tự.', ma: 400 };
    await this.sql`UPDATE user_account SET password_hash=${hashPassword(moi)},
      must_change=false, token_version=token_version+1 WHERE employee_id=${employeeId}`;
    const [acc2] = await this.sql`SELECT token_version FROM user_account WHERE employee_id=${employeeId}`;
    await this.store.write('HE_THONG', (K) =>
      K.X.NK.unshift({ t: K.X.NOW, ai: employeeId, viec: 'Đổi mật khẩu', dt: 'mọi phiên cũ hết hiệu lực', ip: '—' })).catch(() => {});
    return { token: kyJwt({ sub: employeeId, ver: acc2.token_version }, this.secret) };
  }

  /** Quản trị (cần quyền sua_to_chuc): đặt lại mật khẩu → mật khẩu tạm một lần. */
  async datLaiMatKhau(adminId, employeeId) {
    const tam = crypto.randomBytes(6).toString('base64url');
    await this.sql`UPDATE user_account SET password_hash=${hashPassword(tam)},
      must_change=true, token_version=token_version+1, failed_count=0, locked_until=NULL
      WHERE employee_id=${employeeId}`;
    await this.store.write('HE_THONG', (K) =>
      K.X.NK.unshift({ t: K.X.NOW, ai: adminId, viec: 'Đặt lại mật khẩu', dt: 'cho ' + employeeId, ip: '—' })).catch(() => {});
    return { matKhauTam: tam };
  }

  async datActive(adminId, employeeId, active) {
    await this.sql`UPDATE user_account SET active=${!!active},
      token_version=token_version+1 WHERE employee_id=${employeeId}`;
    await this.store.write('HE_THONG', (K) =>
      K.X.NK.unshift({ t: K.X.NOW, ai: adminId, viec: active ? 'Mở khoá tài khoản' : 'Khoá tài khoản', dt: employeeId, ip: '—' })).catch(() => {});
    return { ok: true };
  }

  async danhSach() {
    return await this.sql`SELECT username, employee_id, must_change, active, last_login_at AS "dangNhapCuoi",
      failed_count, locked_until FROM user_account ORDER BY employee_id`;
  }

  /** Guard: trả employeeId nếu phiên hợp lệ. */
  async xacThuc(req) {
    if (process.env.ALLOW_DEV_HEADER === '1') {
      const dev = req.headers.get('x-employee-id');
      if (dev) return dev;
    }
    const token = docCookie(req, 'ftms_sid');
    if (!token) return null;
    const p = docJwt(token, this.secret);
    if (!p) return null;
    const [acc] = await this.sql`SELECT token_version, active FROM user_account WHERE employee_id=${p.sub}`;
    if (!acc || !acc.active || acc.token_version !== p.ver) return null;
    return p.sub;
  }
}
