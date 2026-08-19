// store.mjs — trái tim của backend:
//   · snapshot: DB → trạng thái kernel (cache, huỷ khi ghi)
//   · kernel dùng chung một tiến trình; trạng thái GIAO DIỆN tách theo phiên người dùng
//   · WriteService: mọi thao tác ghi = chạy chính hàm prototype trong kernel
//     → so lệch từng bảng → ghi DB trong giao dịch → phát sự kiện SSE
// Đúng bốn bước bắt buộc của kế hoạch: giao dịch + nhật ký + huỷ cache + phát sự kiện
// (nhật ký do chính hàm prototype ghi vào t.log/NT/NK — không cần lớp nào nhớ hộ).
import { loadStateFromDb } from './load-state.mjs';
import { loadKernel } from '../domain/kernel/load.mjs';

// Khoá dữ liệu nằm trong DB (khớp make-kernel INJECT, trừ TODAY/NOW)
export const DB_KEYS = [
  'U', 'CAP_TAY', 'DV', 'KHOI', 'VI_TRI', 'T', 'MAU', 'NT', 'CH', 'NGHI_LE',
  'BAC_DUYET', 'TT_RIENG', 'NGUON_DX', 'BANG_CHUNG', 'THUAT_NGU',
  'VAI_TRO', 'QUYEN', 'PHAN_CONG', 'HANG_GAN', 'AI_CH', 'AI_DUNG',
  'TIN_NGOAI', 'DOI_CHIEU', 'NK', 'RUI_RO', 'QUYET_DINH', 'SEQ', 'MSEQ',
];
const KHONG_PHAI_UI = new Set([...DB_KEYS, 'TODAY', 'NOW', '_seed', '_NHANH', '_NHANH_CUA', '_sn', 'CFD', 'TL']);

const qj = (v) => JSON.stringify(v);

export class Store {
  constructor(sql) {
    this.sql = sql;                    // Bun SQL
    this.kernel = null;                // {X, SET, GET, rec, lets}
    this.baseline = new Map();         // khoá DB → chuỗi JSON để so lệch
    this.sessions = new Map();         // employeeId → {ui: {let → giá trị}}
    this.sseClients = new Set();       // {me, send(fn)}
    this.uiKeys = [];
    this._writing = Promise.resolve(); // xếp hàng ghi tuần tự
  }

  async init() { await this.reload(); }

  async reload() {
    const state = await loadStateFromDb((q) => this.sql.unsafe(q));
    this.kernel = loadKernel(structuredClone(state));
    this.uiKeys = this.kernel.lets.filter((n) => !KHONG_PHAI_UI.has(n));
    this.baseline = new Map(DB_KEYS.map((k) => [k, qj(this.kernel.X[k] ?? this.kernel.GET[k]?.())]));
    // Phiên cũ giữ nguyên trạng thái UI của người dùng (tab đang mở, bộ lọc…)
  }

  /** Đọc giá trị hiện tại của một khoá dữ liệu từ kernel (let hoặc const). */
  val(k) { return this.kernel.GET[k] ? this.kernel.GET[k]() : this.kernel.X[k]; }

  capNhatGio() {
    const sys = process.env.SYSTEM_TODAY;
    let today, now;
    if (sys) {
      const [y, m, d] = sys.split('-').map(Number);
      today = new Date(y, m - 1, d);
      now = `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')} 09:15`;
    } else {
      const n = new Date();
      today = new Date(n.getFullYear(), n.getMonth(), n.getDate());
      now = `${String(n.getDate()).padStart(2, '0')}/${String(n.getMonth() + 1).padStart(2, '0')} ${n.toTimeString().slice(0, 5)}`;
    }
    this.kernel.SET.TODAY(today);
    this.kernel.SET.NOW(now);
  }

  /** Chạy fn trong ngữ cảnh một người dùng: me + trạng thái UI của phiên người đó. */
  withSession(me, fn) {
    const K = this.kernel;
    K.SET.me(me);
    this.capNhatGio();
    let ses = this.sessions.get(me);
    if (!ses) {
      // Phiên mới: trạng thái UI về mặc định — đúng hành vi doiVai() của prototype
      ses = { ui: null };
      this.sessions.set(me, ses);
    }
    if (ses.ui) for (const k of this.uiKeys) K.SET[k](ses.ui[k]);
    else { K.X.doiVai && this._resetUi(me); }
    let out;
    try { out = fn(K); }
    finally {
      const ui = {};
      for (const k of this.uiKeys) ui[k] = K.GET[k]();
      ses.ui = ui;
    }
    return out;
  }

  _resetUi(me) {
    // Dùng chính doiVai của prototype để đưa mọi trạng thái UI về mặc định của vai,
    // nhưng không cho nó vẽ (draw đã bị recorder nuốt) — rẻ và đúng tuyệt đối.
    const K = this.kernel;
    K.rec.reset();
    try { K.X.doiVai(me); } catch (e) { /* draw lỗi vặt không ảnh hưởng trạng thái */ }
    K.rec.reset();
  }

  /**
   * WriteService — cổng ghi duy nhất.
   * op(K) chạy ĐỒNG BỘ các hàm prototype (mutate kernel); sau đó so lệch từng
   * bảng với baseline và ghi DB trong một giao dịch. Lỗi DB → nạp lại từ DB
   * (kernel quay về đúng sự thật), ném lỗi lên trên.
   */
  async write(me, op, { inputs = {}, uiSets = [] } = {}) {
    // tuần tự hoá các thao tác ghi — tránh hai diff chồng nhau
    const run = async () => {
      const K = this.kernel;
      K.rec.reset();
      K.rec.inputs = inputs || {};
      let out;
      try {
        out = this.withSession(me, (K2) => {
          for (const [path, value] of uiSets) this._apDatBien(path, value);
          return op(K2);
        });
      } catch (e) {
        // Hàm prototype ném lỗi giữa chừng → kernel có thể đã bị sửa dở.
        // Nạp lại từ DB để kernel quay về đúng sự thật, rồi báo lỗi lên trên.
        console.error('[write] lỗi trong thao tác — nạp lại kernel:', e.message);
        await this.reload();
        throw e;
      }
      const thayDoi = [];
      for (const k of DB_KEYS) {
        const now = qj(this.val(k));
        if (now !== this.baseline.get(k)) thayDoi.push(k);
      }
      if (thayDoi.length) {
        try {
          await this._persist(thayDoi);
          for (const k of thayDoi) this.baseline.set(k, qj(this.val(k)));
        } catch (e) {
          console.error('[write] lỗi ghi DB — nạp lại từ DB:', e.message);
          await this.reload();
          throw e;
        }
        this.phatSuKien({ kind: 'changed', keys: thayDoi });
      }
      return { ret: out, thayDoi, rec: this.snapRec() };
    };
    const p = this._writing.then(run, run);
    this._writing = p.catch(() => {});
    return p;
  }

  /** Đặt biến trạng thái từ client: CHỈ chấp nhận gốc là biến biểu mẫu đã biết. */
  _apDatBien(path, value) {
    const [goc, ...rest] = String(path).split('.');
    const CHO_PHEP = new Set(['FRM', 'GAN', 'MED', 'SC', 'AI_HOI', 'CN_TIM', 'NS_TIM', 'TC_TIM', 'DN_SUA', 'TC_MOI', 'TC_SUA', 'CK_SUA', 'EM_XEM']);
    if (!CHO_PHEP.has(goc)) throw new Error('Không được đặt biến ' + goc);
    if (!rest.length) { this.kernel.SET[goc](value); return; }
    let cur = this.kernel.GET[goc]();
    if (cur == null) { cur = {}; this.kernel.SET[goc](cur); }
    for (let i = 0; i < rest.length - 1; i++) {
      if (cur[rest[i]] == null) cur[rest[i]] = {};
      cur = cur[rest[i]];
    }
    cur[rest[rest.length - 1]] = value;
  }

  snapRec() {
    const K = this.kernel;
    return { html: K.rec.dirtyHtml(), cls: K.rec.cls.slice() };
  }

  async _persist(keys) {
    const st = {};
    for (const k of DB_KEYS) st[k] = this.val(k);
    const sql = this.sql;
    await sql.begin(async (tx) => {
      const doc = (v) => v; // Bun SQL: truyền OBJECT cho cột jsonb (chuỗi sẽ bị bọc thêm một lớp)
      for (const k of keys) {
        switch (k) {
          case 'U': case 'CAP_TAY': {
            await tx.unsafe('DELETE FROM employee');
            let i = 0;
            for (const [id, u] of Object.entries(st.U))
              await tx`INSERT INTO employee(id,pos,doc,cap_tay) VALUES (${id},${i++},${u}::jsonb,${st.CAP_TAY[id] ?? null})`;
            break;
          }
          case 'DV': {
            await tx.unsafe('DELETE FROM org_unit');
            let i = 0;
            for (const [ma, d] of Object.entries(st.DV))
              await tx`INSERT INTO org_unit(ma,pos,doc) VALUES (${ma},${i++},${d}::jsonb)`;
            break;
          }
          case 'KHOI': await this._taiBang(tx, 'bod_block', st.KHOI, 'ma'); break;
          case 'VI_TRI': await this._taiBang(tx, 'job_position', st.VI_TRI, 'ma'); break;
          case 'T': await this._taiBang(tx, 'work_item', st.T, 'id'); break;
          case 'MAU': await this._taiBang(tx, 'work_template', st.MAU, 'id'); break;
          case 'NT': await this._taiBang(tx, 'notification', st.NT, null); break;
          case 'CH': case 'AI_CH': {
            // giá trị CH là vô hướng (bool/số/chuỗi) — bọc mảng rồi ->0 để thành jsonb đúng kiểu
            for (const [kk, v] of Object.entries(st.CH))
              await tx`INSERT INTO parameter(key,value) VALUES (${'CH.' + kk},(${[v]}::jsonb)->0)
                       ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value, updated_at=now()`;
            await tx`INSERT INTO parameter(key,value) VALUES ('AI_CH',(${[st.AI_CH]}::jsonb)->0)
                     ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value, updated_at=now()`;
            break;
          }
          case 'NGHI_LE': await this._taiBang(tx, 'holiday', st.NGHI_LE, null); break;
          case 'BAC_DUYET': await this._taiBang(tx, 'approval_tier', st.BAC_DUYET, null); break;
          case 'TT_RIENG': await this._taiBang(tx, 'custom_status', st.TT_RIENG, 'ma'); break;
          case 'NGUON_DX': await this._taiBang(tx, 'adhoc_source', st.NGUON_DX, 'ma'); break;
          case 'BANG_CHUNG': await this._taiBang(tx, 'evidence_catalog', st.BANG_CHUNG, null); break;
          case 'THUAT_NGU': await this._taiBang(tx, 'glossary', st.THUAT_NGU, null); break;
          case 'VAI_TRO': {
            await tx.unsafe('DELETE FROM role');
            let i = 0;
            for (const [ma, r] of Object.entries(st.VAI_TRO))
              await tx`INSERT INTO role(ma,pos,doc) VALUES (${ma},${i++},${r}::jsonb)`;
            break;
          }
          case 'QUYEN': await this._taiBang(tx, 'permission', st.QUYEN, null); break;
          case 'PHAN_CONG': await this._taiBang(tx, 'role_assignment', st.PHAN_CONG, null, true); break;
          case 'HANG_GAN': await this._taiBang(tx, 'ai_tier_assign', st.HANG_GAN, null, true); break;
          case 'AI_DUNG': {
            await tx.unsafe('DELETE FROM ai_usage');
            for (const [uid, v] of Object.entries(st.AI_DUNG))
              await tx`INSERT INTO ai_usage(uid,doc) VALUES (${uid},${v}::jsonb)`;
            break;
          }
          case 'TIN_NGOAI': await this._taiBang(tx, 'external_event', st.TIN_NGOAI, 'ma'); break;
          case 'DOI_CHIEU': {
            await tx.unsafe('DELETE FROM benchmark');
            let i = 0;
            for (const x of st.DOI_CHIEU) {
              const { lay, ...data } = x;
              await tx`INSERT INTO benchmark(ma,pos,doc) VALUES (${x.ma},${i++},${data}::jsonb)`;
            }
            break;
          }
          case 'NK': await this._taiBang(tx, 'audit_log', st.NK, null, true); break;
          case 'RUI_RO': await this._taiBang(tx, 'project_risk', st.RUI_RO, 'id'); break;
          case 'QUYET_DINH': await this._taiBang(tx, 'project_decision', st.QUYET_DINH, null); break;
          case 'SEQ': await tx`UPDATE seq SET value=${st.SEQ} WHERE name='SEQ'`; break;
          case 'MSEQ': await tx`UPDATE seq SET value=${st.MSEQ} WHERE name='MSEQ'`; break;
          default: throw new Error('persist: chưa xử lý khoá ' + k);
        }
      }
    });
  }

  async _taiBang(tx, table, arr, keyField, serialId = false) {
    await tx.unsafe(`DELETE FROM ${table}`);
    let i = 0;
    for (const x of arr) {
      if (keyField)
        await tx.unsafe(`INSERT INTO ${table}(${keyField},pos,doc) VALUES ($1,$2,$3::jsonb)`, [x[keyField], i++, x]);
      else
        await tx.unsafe(`INSERT INTO ${table}(pos,doc) VALUES ($1,$2::jsonb)`, [i++, x]);
    }
  }

  // ---------- SSE ----------
  themSse(client) { this.sseClients.add(client); }
  boSse(client) { this.sseClients.delete(client); }
  phatSuKien(payload) {
    const data = `data: ${JSON.stringify(payload)}\n\n`;
    for (const c of this.sseClients) { try { c.send(data); } catch { this.sseClients.delete(c); } }
  }
}
