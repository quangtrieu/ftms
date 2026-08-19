// golden.test.mjs — TRỌNG TÀI: DB → snapshot → kernel → 85.359 phép so với vang/ky-vong.
// Chạy: SYSTEM_TODAY=2026-09-04 DATABASE_URL=... node test/golden.test.mjs
// Lệch → sửa mã, KHÔNG sửa số vàng.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadStateFromDb } from '../src/snapshot/load-state.mjs';
import { loadKernel } from '../src/domain/kernel/load.mjs';
import { runProbes, countLeaves } from './probes.mjs';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const VANG = path.resolve(__dir, '../../../vang/ky-vong');

// deepEq bỏ qua thứ tự khoá đối tượng (jsonb của Postgres sắp lại khoá),
// nhưng GIỮ thứ tự phần tử mảng (thứ tự dòng là nghiệp vụ).
function deepEq(a, b, path = '') {
  if (a === b) return null;
  if (typeof a === 'number' && typeof b === 'number')
    return (Number.isNaN(a) && Number.isNaN(b)) || Math.abs(a - b) < 1e-9 ? null : path;
  if (a === null || b === null || typeof a !== typeof b) return path;
  if (Array.isArray(a) !== Array.isArray(b)) return path;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return path + '.length';
    for (let i = 0; i < a.length; i++) { const r = deepEq(a[i], b[i], path + '[' + i + ']'); if (r) return r; }
    return null;
  }
  if (typeof a === 'object') {
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return path + '{keys:' + ka.length + '≠' + kb.length + '}';
    for (const k of ka) { if (!(k in b)) return path + '.' + k + '(thiếu)'; const r = deepEq(a[k], b[k], path + '.' + k); if (r) return r; }
    return null;
  }
  return path;
}

import { SQL } from 'bun';
const sql = new SQL(process.env.DATABASE_URL);
const state = await loadStateFromDb((q) => sql.unsafe(q));
await sql.end();

let tong = 0, dat = 0;
// Chuẩn hoá qua JSON trước khi so: Date → chuỗi ISO, undefined → vắng — cùng khuôn với tệp ky-vong.
const R = JSON.parse(JSON.stringify(runProbes(() => loadKernel(structuredClone(state)))));
for (const [name, got] of Object.entries(R)) {
  const want = JSON.parse(fs.readFileSync(path.join(VANG, name + '.json'), 'utf8'));
  const n = countLeaves(want);
  tong += n;
  const lech = deepEq(want, got);
  if (lech) console.error(`✗ ${name}: lệch tại ${lech}`);
  else { dat += n; console.log(`✓ ${name} (${n})`); }
}
console.log(`GOLDEN: ${dat}/${tong}`);
process.exit(dat === tong ? 0 : 1);
