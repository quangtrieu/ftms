// load.mjs — nạp kernel prototype trong sandbox Node/Bun, không DOM thật.
// Hai chế độ dùng:
//   1. Tính toán (API JSON, golden test): gọi hàm miền, bỏ qua phần vẽ.
//   2. Vẽ giao diện (SSR): bộ "DOM ghi hình" ghi lại mọi innerHTML/classList/toast
//      mà hàm vẽ của prototype thực hiện, trả về cho trình duyệt áp lại nguyên văn.
// Giá trị input của người dùng (#yk_nd, #nsTen, …) tiêm vào qua rec.inputs.
import fs from 'node:fs';
import vm from 'node:vm';

function makeRecorder() {
  const rec = {
    els: new Map(),          // id → bản ghi phần tử
    cls: [],                 // [id, 'add'|'remove'|'toggle', class]
    inputs: {},              // id → value do client gửi lên (đọc qua .value)
    reset() { this.cls = []; for (const e of this.els.values()) e._dirty = false; },
    dirtyHtml() {
      const o = {};
      for (const [id, e] of this.els) if (e._dirty) o[id] = e._html;
      return o;
    },
  };
  rec.el = (id) => {
    if (!rec.els.has(id)) {
      const e = {
        _id: id, _html: '', _dirty: false,
        get innerHTML() { return this._html; },
        set innerHTML(v) { this._html = String(v); this._dirty = true; },
        get textContent() { return this._html; },
        set textContent(v) { this._html = String(v); this._dirty = true; },
        get value() { return rec.inputs[id] ?? ''; },
        set value(v) { rec.inputs[id] = v; },
        get checked() { return !!rec.inputs[id + '::checked']; },
        set checked(v) { rec.inputs[id + '::checked'] = !!v; },
        files: null, dataset: {},
        style: new Proxy({}, { get: () => '', set: () => true }),
        classList: {
          add: (c) => rec.cls.push([id, 'add', c]),
          remove: (c) => rec.cls.push([id, 'remove', c]),
          toggle: (c, force) => rec.cls.push([id, force === undefined ? 'toggle' : (force ? 'add' : 'remove'), c]),
          contains: () => false,
        },
        addEventListener() {}, removeEventListener() {},
        appendChild() { return rec.el('__tmp' + Math.random()); }, removeChild() {},
        insertAdjacentHTML(_, html) { this._html += String(html); this._dirty = true; },
        querySelector() { return rec.el('__q' + Math.random()); }, querySelectorAll() { return []; },
        closest() { return null; }, focus() {}, blur() {}, click() {},
        scrollIntoView() {}, getBoundingClientRect() { return { top: 0, left: 0, width: 0, height: 0 }; },
        setAttribute() {}, getAttribute() { return null; }, removeAttribute() {},
        scrollTop: 0, scrollLeft: 0, offsetWidth: 1280, offsetHeight: 800,
        onclick: null, onchange: null, oninput: null, onkeydown: null,
      };
      rec.els.set(id, e);
    }
    return rec.els.get(id);
  };
  return rec;
}

export function loadKernel(dbState = null, jsPath = new URL('./kernel.js', import.meta.url).pathname) {
  let doiChieu = null;
  if (dbState && dbState.DOI_CHIEU) {
    // DOI_CHIEU chứa hàm lay() (logic lấy số nội bộ) — không đi qua JSON được.
    // Giữ hàng gốc trong kernel, chỉ chép đè các trường dữ liệu theo mã.
    doiChieu = dbState.DOI_CHIEU; dbState = { ...dbState }; delete dbState.DOI_CHIEU;
  }
  const src = fs.readFileSync(jsPath, 'utf8');

  // Danh mục định danh mức đỉnh → khối xuất __X, setter __SET, getter __GET
  const names = new Set();
  for (const m of src.matchAll(/^(?:const|let|var)\s+([A-Za-z_$][\w$]*)/gm)) names.add(m[1]);
  for (const m of src.matchAll(/^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/gm)) names.add(m[1]);
  // Một dòng let có thể khai nhiều biến: let AI_MO = false, AI_NV = "TONG_HOP", …
  const lets = [];
  for (const m of src.matchAll(/^let\s+([^\n]*)/gm)) {
    // bỏ chú thích và phần sau dấu chấm phẩy đầu tiên trên dòng khai báo
    m[1] = m[1].replace(/\/\*[\s\S]*$/, '').replace(/\/\/.*$/, '');
    const iCham = m[1].indexOf(';');
    if (iCham >= 0) m[1] = m[1].slice(0, iCham);
    let depth = 0, seg = '', trongChuoi = null;
    const dong = m[1];
    const daySeg = [];
    for (let i = 0; i < dong.length; i++) {
      const c = dong[i];
      if (trongChuoi) { if (c === trongChuoi && dong[i - 1] !== '\\') trongChuoi = null; seg += c; continue; }
      if (c === '"' || c === "'" || c === '`') { trongChuoi = c; seg += c; continue; }
      if ('([{'.includes(c)) depth++;
      if (')]}'.includes(c)) depth--;
      if (c === ',' && depth === 0) { daySeg.push(seg); seg = ''; continue; }
      seg += c;
    }
    daySeg.push(seg);
    for (const sgm of daySeg) {
      const mm = sgm.match(/^\s*([A-Za-z_$][\w$]*)/);
      if (mm) lets.push(mm[1]);
    }
  }
  const exportCode = `\nglobalThis.__X = {};\n` +
    [...names].map((n) => `try{globalThis.__X[${JSON.stringify(n)}] = ${n};}catch(e){}`).join('\n') +
    `\nglobalThis.__SET = {};\nglobalThis.__GET = {};\n` +
    lets.map((n) =>
      `try{globalThis.__SET[${JSON.stringify(n)}] = v => { ${n} = v; };` +
      `globalThis.__GET[${JSON.stringify(n)}] = () => ${n};}catch(e){}`).join('\n');

  const rec = makeRecorder();
  const timeouts = [];
  const sandbox = {
    console,
    URL: { createObjectURL: () => 'blob:x' },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    setTimeout: (fn) => { timeouts.push(fn); return timeouts.length; },
    clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    requestAnimationFrame: () => 0,
    alert() {}, confirm() { return true; }, prompt() { return null; },
    navigator: { clipboard: { writeText: async () => {} } },
    Intl, Date, Math, JSON,
    print() {}, scrollTo() {}, scrollBy() {}, scroll() {},
    getComputedStyle: () => new Proxy({}, { get: () => '' }),
    open: () => ({ document: { write() {}, close() {} }, print() {}, close() {} }),
  };
  sandbox.window = sandbox;
  sandbox.document = {
    getElementById: (id) => rec.el(id),
    querySelector: (sel) => chonPhu(sel) || rec.el(String(sel).replace(/^#/, '')),
    querySelectorAll: () => [],
    addEventListener() {}, removeEventListener() {},
    createElement: () => rec.el('__c' + Math.random()),
    body: rec.el('__body'), documentElement: rec.el('__root'),
    activeElement: rec.el('__active'),
  };
  const chonPhu = (sel) => {
    // "#dxL button.on" — đọc lựa chọn client gửi lên qua inputs["dxL::onv"]
    const m = String(sel).match(/^#([\w-]+)\s+.+$/);
    if (!m) return null;
    const id = m[1];
    return {
      dataset: { get v() { return rec.inputs[id + '::onv'] ?? 'THEM'; } },
      get value() { return rec.inputs[id + '::onv'] ?? ''; },
      classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
      focus() {}, setSelectionRange() {},
    };
  };
  sandbox.$ = (sel) => chonPhu(sel) || rec.el(String(sel).replace(/^#/, ''));
  sandbox.globalThis = sandbox;

  vm.createContext(sandbox);
  if (dbState) sandbox.__DB__ = dbState;
  vm.runInContext(src + exportCode, sandbox, { filename: 'kernel.js', timeout: 120000 });

  if (doiChieu) {
    for (const row of doiChieu) {
      const goc = sandbox.__X.DOI_CHIEU.find((x) => x.ma === row.ma);
      if (goc) Object.assign(goc, Object.fromEntries(Object.entries(row).filter(([k]) => k !== 'lay')));
    }
  }
  return { X: sandbox.__X, SET: sandbox.__SET, GET: sandbox.__GET, rec, lets, ctx: sandbox };
}

// Giữ tên cũ cho harness/kiểm thử
export const loadProto = (jsPath, dbState = null) =>
  loadKernel(dbState, jsPath ?? new URL('./kernel.js', import.meta.url).pathname);
