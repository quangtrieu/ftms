// harness.mjs — chạy JS của prototype trong Node, xuất mọi định danh mức đỉnh
// Dùng: import { loadProto } from './harness.mjs'; const P = loadProto();
import fs from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

function elStub() {
  const el = {
    innerHTML: '', textContent: '', value: '', checked: false, files: null,
    style: new Proxy({}, { get: () => '', set: () => true }),
    classList: { add(){}, remove(){}, toggle(){}, contains(){ return false; } },
    dataset: {},
    addEventListener(){}, removeEventListener(){},
    appendChild(){ return elStub(); }, removeChild(){},
    querySelector(){ return elStub(); }, querySelectorAll(){ return []; },
    closest(){ return null; }, focus(){}, blur(){}, click(){},
    insertAdjacentHTML(){}, scrollIntoView(){}, getBoundingClientRect(){ return {top:0,left:0,width:0,height:0}; },
    setAttribute(){}, getAttribute(){ return null; }, removeAttribute(){},
    scrollTop: 0, scrollLeft: 0, offsetWidth: 1000, offsetHeight: 800,
    onclick: null, onchange: null, oninput: null, onkeydown: null,
  };
  return el;
}

export function loadProto(jsPath = fileURLToPath(new URL('./proto.js', import.meta.url)), dbState = null) {
  let src = fs.readFileSync(jsPath, 'utf8');

  // Thu thập tên định danh mức đỉnh để xuất
  const names = new Set();
  for (const m of src.matchAll(/^(?:const|let|var)\s+([A-Za-z_$][\w$]*)/gm)) names.add(m[1]);
  for (const m of src.matchAll(/^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/gm)) names.add(m[1]);

  const exportCode = `\nglobalThis.__X = {};\n` +
    [...names].map(n => `try{globalThis.__X[${JSON.stringify(n)}] = ${n};}catch(e){}`).join('\n') +
    `\nglobalThis.__SET = {};\n` +
    // setter cho biến let (trạng thái giao diện) — cho phép test đổi vai, đổi ống kính…
    [...src.matchAll(/^let\s+([A-Za-z_$][\w$]*)/gm)].map(m => m[1])
      .map(n => `try{globalThis.__SET[${JSON.stringify(n)}] = v => { ${n} = v; globalThis.__X[${JSON.stringify(n)}] = ${n}; };}catch(e){}`).join('\n') +
    // getter tươi (đọc lại giá trị hiện tại của let sau khi hàm prototype tự đổi)
    `\nglobalThis.__GET = {};\n` +
    [...src.matchAll(/^let\s+([A-Za-z_$][\w$]*)/gm)].map(m => m[1])
      .map(n => `try{globalThis.__GET[${JSON.stringify(n)}] = () => ${n};}catch(e){}`).join('\n');

  const sandbox = {
    console,
    URL: { createObjectURL: () => 'blob:x' },
    localStorage: { getItem: () => null, setItem(){}, removeItem(){} },
    setTimeout: (fn) => 0, clearTimeout(){}, setInterval: () => 0, clearInterval(){},
    requestAnimationFrame: (fn) => 0,
    alert(){}, confirm(){ return true; }, prompt(){ return null; },
    navigator: { clipboard: { writeText: async () => {} } },
    Intl, Date, Math, JSON,
  };
  sandbox.window = sandbox;
  sandbox.document = {
    getElementById: () => elStub(),
    querySelector: () => elStub(),
    querySelectorAll: () => [],
    addEventListener(){}, removeEventListener(){},
    createElement: () => elStub(),
    body: elStub(), documentElement: elStub(),
    activeElement: elStub(),
  };
  sandbox.$ = () => elStub();
  sandbox.globalThis = sandbox;

  vm.createContext(sandbox);
  if (dbState) sandbox.__DB__ = dbState;
  vm.runInContext(src + exportCode, sandbox, { filename: jsPath.split('/').pop(), timeout: 120000 });
  if (sandbox.__drawErr) console.error('[harness] draw() lỗi (bỏ qua được):', sandbox.__drawErr);
  return { X: sandbox.__X, SET: sandbox.__SET, GET: sandbox.__GET, ctx: sandbox };
}

export function loadKernel(dbState = null, jsPath = fileURLToPath(new URL('./kernel.js', import.meta.url))) {
  let doiChieu = null;
  if (dbState && dbState.DOI_CHIEU) {
    // DOI_CHIEU chứa hàm lay() (logic lấy số nội bộ) — không đi qua JSON được.
    // Giữ hàng gốc trong kernel, chỉ chép đè các trường dữ liệu theo mã.
    doiChieu = dbState.DOI_CHIEU; dbState = { ...dbState }; delete dbState.DOI_CHIEU;
  }
  const K = loadProto(jsPath, dbState);
  if (doiChieu) {
    for (const row of doiChieu) {
      const goc = K.X.DOI_CHIEU.find(x => x.ma === row.ma);
      if (goc) Object.assign(goc, Object.fromEntries(Object.entries(row).filter(([k]) => k !== 'lay')));
    }
  }
  return K;
}
