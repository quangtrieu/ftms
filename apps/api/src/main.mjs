// main.mjs — điểm vào API FTMS (chạy bằng Bun).
// Một origin duy nhất: giao diện + API + SSE + tệp. Caddy đứng trước khi ra Internet.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { SQL } from 'bun';
import { Store } from './snapshot/store.mjs';
import { AuthService, ipQuaTay } from './auth/auth.mjs';
import { UiService } from './modules/ui.mjs';
import { dangKyApi } from './modules/api.mjs';
import { FileService } from './modules/files.mjs';
import { AssistantService } from './modules/assistant.mjs';
import { batDauJobs } from './jobs/jobs.mjs';
import { trangDangNhap, trangDoiMatKhau } from './modules/pages.mjs';

const PORT = Number(process.env.PORT || 4000);
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://ftms@127.0.0.1:5432/ftms';
const JWT_SECRET = process.env.JWT_SECRET || (() => {
  console.warn('[boot] JWT_SECRET chưa đặt — sinh tạm (phiên chết khi khởi động lại)');
  return crypto.randomBytes(32).toString('hex');
})();

const sql = new SQL(DATABASE_URL);

// migrate: áp schema nếu DB trống, rồi seed nếu bảng rỗng, rồi migrations/
async function migrate() {
  const goc = path.resolve(import.meta.dir, '../../..');
  const [t] = await sql`SELECT to_regclass('public.employee') AS r`;
  if (!t.r) {
    console.log('[boot] áp db/schema.sql');
    await sql.unsafe(fs.readFileSync(path.join(goc, 'db/schema.sql'), 'utf8'));
  }
  const [{ n }] = await sql`SELECT count(*)::int AS n FROM employee`;
  if (n === 0) {
    console.log('[boot] nạp db/seed.sql (44 người · 18 đơn vị · 88 việc mẫu)');
    await sql.unsafe(fs.readFileSync(path.join(goc, 'db/seed.sql'), 'utf8'));
  }
  const migDir = path.join(goc, 'db/migrations');
  if (fs.existsSync(migDir)) {
    await sql.unsafe(`CREATE TABLE IF NOT EXISTS _migration (ten text PRIMARY KEY, luc timestamptz DEFAULT now())`);
    for (const f of fs.readdirSync(migDir).sort()) {
      if (!f.endsWith('.sql')) continue;
      const [d] = await sql`SELECT 1 FROM _migration WHERE ten=${f}`;
      if (d) continue;
      console.log('[boot] migration', f);
      await sql.unsafe(fs.readFileSync(path.join(migDir, f), 'utf8'));
      await sql`INSERT INTO _migration(ten) VALUES (${f})`;
    }
  }
}

await migrate();
const store = new Store(sql);
await store.init();
const auth = new AuthService(sql, store, JWT_SECRET);
const initPw = process.env.INITIAL_PASSWORD || crypto.randomBytes(6).toString('base64url');
const soTk = await auth.taoTaiKhoanThieu(initPw);
if (soTk && !process.env.INITIAL_PASSWORD)
  console.log('[boot] INITIAL_PASSWORD (sinh ngẫu nhiên):', initPw);
console.log(`[boot] tạo ${soTk} tài khoản đăng nhập · ${Object.keys(store.val('U')).length} nhân sự`);

const ui = new UiService(store);
const files = new FileService(sql, store);
const assistant = new AssistantService(sql, store);
ui.assistant = assistant;
const api = dangKyApi({ sql, store, auth, ui, files, assistant });
batDauJobs({ sql, store });

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers } });
const html = (s, status = 200, headers = {}) =>
  new Response(s, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', ...headers } });

const cookieSet = (token) => {
  const secure = process.env.COOKIE_SECURE === '1' ? '; Secure' : '';
  return `ftms_sid=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${12 * 3600}${secure}`;
};
const cookieClear = () => 'ftms_sid=; Path=/; HttpOnly; Max-Age=0';

Bun.serve({
  port: PORT,
  idleTimeout: 120,
  async fetch(req, server) {
    const url = new URL(req.url);
    const p = url.pathname;
    const ip = (req.headers.get('x-forwarded-for') || server.requestIP(req)?.address || '?').split(',')[0].trim();

    try {
      // ---------- công khai ----------
      if (p === '/api/health') {
        let db = false; try { await sql`SELECT 1`; db = true; } catch {}
        return json({
          ok: db, employees: Object.keys(store.val('U') || {}).length,
          redis: 'off', storage: files.trangThai(), version: '1.0.0',
        });
      }
      if (p === '/dang-nhap') return html(trangDangNhap());
      if (p === '/api/auth/login' && req.method === 'POST') {
        const b = await req.json().catch(() => ({}));
        const r = await auth.login(b.username, b.password, ip);
        if (r.loi) return json({ loi: r.loi }, r.ma);
        return json({ ok: true, mustChange: r.mustChange }, 200, { 'Set-Cookie': cookieSet(r.token) });
      }
      if (p === '/api/auth/logout') {
        return new Response(null, { status: 302, headers: { Location: '/dang-nhap', 'Set-Cookie': cookieClear() } });
      }

      // ---------- cần đăng nhập ----------
      const me = await auth.xacThuc(req);
      if (!me) {
        if (p.startsWith('/api/')) return json({ loi: 'Chưa đăng nhập' }, 401);
        return new Response(null, { status: 302, headers: { Location: '/dang-nhap' } });
      }
      const [acc] = await sql`SELECT must_change FROM user_account WHERE employee_id=${me}`;
      const dev = process.env.ALLOW_DEV_HEADER === '1' && !!req.headers.get('x-employee-id');
      if (dev && acc) acc.must_change = false;

      if (p === '/doi-mat-khau') return html(trangDoiMatKhau(!!acc?.must_change));
      if (p === '/api/auth/change-password' && req.method === 'POST') {
        const b = await req.json().catch(() => ({}));
        const r = await auth.doiMatKhau(me, b.cu, b.moi);
        if (r.loi) return json({ loi: r.loi }, r.ma);
        return json({ ok: true }, 200, { 'Set-Cookie': cookieSet(r.token) });
      }
      if (acc?.must_change && p !== '/api/ui/boot' && !p.startsWith('/api/auth/'))
        if (!p.startsWith('/api/')) return new Response(null, { status: 302, headers: { Location: '/doi-mat-khau' } });

      if (p === '/' || p === '/index.html') return html(ui.trangChinh());

      if (p === '/api/ui/boot') {
        if (acc?.must_change) return json({ doiMatKhau: true });
        return json(await ui.veToanBo(me));
      }
      if (p === '/api/ui/act' && req.method === 'POST') {
        const b = await req.json().catch(() => ({}));
        try {
          return json(await ui.thucThi(me, b));
        } catch (e) {
          console.error('[ui/act]', e.message, '· handler:', String(b.h).slice(0, 120));
          return json({ tuChoi: 'Thao tác gặp lỗi ở máy chủ. Màn hình sẽ tải lại.', reload: true }, 200);
        }
      }
      if (p === '/api/ui/files' && req.method === 'POST') {
        return json(await files.nhanTuUi(me, req, ui));
      }
      if (p === '/api/events') {
        let client;
        const stream = new ReadableStream({
          start(controller) {
            client = { me, send: (s) => controller.enqueue(new TextEncoder().encode(s)) };
            store.themSse(client);
            client.send(`data: {"kind":"hello"}\n\n`);
          },
          cancel() { store.boSse(client); },
        });
        return new Response(stream, {
          headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' },
        });
      }

      // ---------- REST JSON ----------
      const r = await api(req, url, me, ip);
      if (r) return r;

      return json({ loi: 'Không có đường dẫn ' + p }, 404);
    } catch (e) {
      console.error('[http]', p, e);
      return json({ loi: 'Lỗi máy chủ' }, 500);
    }
  },
});

console.log(`[boot] FTMS api chạy tại http://localhost:${PORT} (SYSTEM_TODAY=${process.env.SYSTEM_TODAY || 'hôm nay'})`);
