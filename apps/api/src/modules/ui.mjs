// ui.mjs — kênh giao diện: "màn hình của prototype, vẽ tại máy chủ".
// Trình duyệt là client mỏng tuyệt đối: nhận các mảnh innerHTML + thao tác classList
// do KERNEL (chính mã vẽ của prototype) sinh ra, và gửi ngược nguyên văn chuỗi handler
// (onclick="act('nhan')" …) về đây thực thi trong sandbox kernel.
// An toàn: chỉ thực thi chuỗi handler mà CHÍNH máy chủ đã render cho phiên đó
// (đối chiếu tập allowedHandlers), cộng danh sách nền tảng cố định.
import vm from 'node:vm';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const STYLE = fs.readFileSync(path.join(__dir, '../ui/style.css'), 'utf8');
const SHELL_BODY = fs.readFileSync(path.join(__dir, '../ui/shell-body.html'), 'utf8');
const CLIENT_JS = fs.readFileSync(path.join(__dir, '../ui/client.js'), 'utf8');

// Handler nền tảng luôn cho phép (khung điều hướng, đóng cửa sổ, chuông…)
const HANDLER_NEN = new Set([
  'closeDw()', 'dongTao()', 'dongTroLy()', 'dongNganGiao()', 'dongCham()', 'dongTC()', 'dongDA()',
  'readAll()', 'moTroLy()', 'chonAnh()', 'xoaAnh()', 'draw()', 'drawNav()',
]);

const giaiMaEntity = (s) => String(s)
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/** Gom mọi chuỗi handler on*="…" trong một khối HTML (đã giải mã entity). */
export function trichHandler(html, vao) {
  for (const m of String(html).matchAll(/\son[a-z]+\s*=\s*"([^"]*)"/g)) vao.add(giaiMaEntity(m[1]));
  for (const m of String(html).matchAll(/\son[a-z]+\s*=\s*'([^']*)'/g)) vao.add(giaiMaEntity(m[1]));
}

class XacNhanCanHoi extends Error {}

export class UiService {
  constructor(store) {
    this.store = store;
    this.phien = new Map(); // me → {allow:Set}
  }

  _phien(me) {
    if (!this.phien.has(me)) this.phien.set(me, { allow: new Set(HANDLER_NEN) });
    return this.phien.get(me);
  }

  /** Trang HTML gốc — đúng khung của prototype + client mỏng. */
  trangChinh() {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FTMS — Forever · Quản lý công việc</title>
<style>
${STYLE}
</style>
</head>
<body>
${SHELL_BODY}
<script>
${CLIENT_JS}
</script>
</body>
</html>`;
  }

  /** Vẽ lần đầu / vẽ lại toàn bộ cho một người dùng. */
  async veToanBo(me) {
    const r = await this.store.write(me, (K) => {
      K.X.drawNav();
      K.X.draw();
      K.X.drawNoti();
      return null;
    });
    return this._donKetQua(me, r);
  }

  /**
   * Thực thi một chuỗi handler từ client.
   * body: {h: chuỗi handler, v: this.value, c: this.checked, k: event.key,
   *        inputs: {id → value}, confirms: [true…], prompts: […]}
   */
  async thucThi(me, body) {
    const ses = this._phien(me);
    let h = String(body.h ?? '');
    // Trợ lý là hàm async (gọi mạng) — đi đường riêng qua AssistantService
    if (h === 'hoiTroLy()' && this.assistant) return this.assistant.hoi(me, this, body);
    // Handler đặc biệt của khung client (không nằm trong HTML render)
    if (h === '__refresh') h = 'drawNav(); draw(); drawNoti();';
    else if (h === '__esc') h = `dongCham(); closeDw();
      if (typeof TAO_MO !== 'undefined' && TAO_MO){ TAO_MO = false; draw(); }
      if (typeof CN_MO !== 'undefined' && CN_MO){ CN_MO = null; CN_TIM = ""; draw(); }`;
    else if (h === '__outside_cn') h = `if (typeof CN_MO !== 'undefined' && CN_MO){ CN_MO = null; CN_TIM = ""; draw(); }`;
    else if (!ses.allow.has(h)) {
      // Ba mẫu handler chuẩn được phép không cần render trước — nhưng PHẢI qua kiểm quyền
      // (màn hình của người dùng có thể chưa kịp vẽ mục vừa xuất hiện qua SSE):
      const mOpen = h.match(/^openDw\('([\w-]+)'\)$/) || h.match(/^moDA\('([\w-]+)'\)$/);
      if (mOpen) {
        const duoc = this.store.withSession(me, (K) => {
          const t = K.X.find(mOpen[1]);
          return t && K.X.xemDuoc(t);
        });
        if (!duoc) return { tuChoi: 'Bạn không có quyền xem việc này.' };
        return this._chay(me, h, body);
      }
      const mGo = h.match(/^go\('(\w+)'\)$/);
      if (mGo) {
        const duoc = this.store.withSession(me, (K) => K.X.tabs().some(([k]) => k === mGo[1]));
        if (!duoc) return { tuChoi: 'Bạn không có cửa sổ này.' };
        return this._chay(me, h, body);
      }
      // Chưa từng render handler này cho phiên → vẽ lại một lượt (phiên mới sau khi
      // api khởi động lại) rồi thử lại; vẫn không có thì từ chối.
      await this.veToanBo(me);
      if (!ses.allow.has(h)) return { tuChoi: 'Thao tác không có trong màn hình của bạn.' };
    }
    return this._chay(me, h, body);
  }

  async _chay(me, h, body) {
    const confirms = Array.isArray(body.confirms) ? [...body.confirms] : [];
    let canXacNhan = null;
    const r = await this.store.write(me, (K) => {
      // this/event của handler
      const thisShim = { value: body.v ?? '', checked: !!body.c, files: null };
      const eventShim = {
        key: body.k ?? '', stopPropagation() {}, preventDefault() {},
        target: thisShim, currentTarget: thisShim, dataTransfer: null,
      };
      const sb = K.ctx;
      sb.confirm = (msg) => {
        if (confirms.length) return !!confirms.shift();
        canXacNhan = String(msg);
        throw new XacNhanCanHoi(msg);
      };
      try {
        const fn = vm.runInContext(
          `(function(event){ ${h} })`, sb, { timeout: 3000 });
        fn.call(thisShim, eventShim);
      } catch (e) {
        if (e instanceof XacNhanCanHoi || canXacNhan) return null; // hai pha xác nhận
        throw e;
      } finally {
        sb.confirm = () => true;
      }
      return null;
    }, { inputs: body.inputs || {} });
    if (canXacNhan) return { canXacNhan };
    return this._donKetQua(me, r);
  }

  _donKetQua(me, r) {
    const ses = this._phien(me);
    const html = { ...r.rec.html };
    // Chạy thật (không dev): menu "Xem với vai" của prototype thay bằng menu tài khoản.
    if (html.menu !== undefined && process.env.ALLOW_DEV_HEADER !== '1') {
      const u = (this.store.val('U') || {})[me] || {};
      html.menu =
        `<div class="hd">Tài khoản</div>` +
        `<div class="ft" style="flex-direction:column;align-items:stretch;gap:6px">` +
        `<a class="btn sm" href="/doi-mat-khau" style="text-align:center;text-decoration:none">Đổi mật khẩu</a>` +
        `<a class="btn sm" href="/api/auth/logout" style="text-align:center;text-decoration:none">Đăng xuất</a>` +
        `</div>` +
        `<div class="hd">Ảnh đại diện</div><div class="ft">` +
        `<button class="btn sm" onclick="chonAnh()">Đổi ảnh</button>` +
        (u.anh ? `<button class="btn sm" onclick="xoaAnh()">Bỏ ảnh, về chấm chữ</button>` : '') +
        `</div>`;
    }
    for (const s of Object.values(html)) trichHandler(s, ses.allow);
    return { html, cls: r.rec.cls, changed: r.thayDoi };
  }
}
