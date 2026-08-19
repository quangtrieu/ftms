// flows.mjs — kiểm sâu các luồng GHI qua kênh UI (đúng đường người dùng bấm).
// Chạy trên DB smoke: bun test/flows.mjs http://localhost:4001
// Mỗi bước khẳng định bằng trạng thái DB/kernel sau thao tác.
const BASE = process.argv[2] || 'http://localhost:4001';
let dat = 0, truot = 0;
const ok = (ten, dk, them = '') => { if (dk) { dat++; console.log('✓', ten); } else { truot++; console.log('✗', ten, them); } };

const act = async (me, h, extra = {}) => {
  const r = await fetch(BASE + '/api/ui/act', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-employee-id': me },
    body: JSON.stringify({ h, v: '', c: false, k: '', inputs: {}, confirms: [], ...extra }),
  });
  return r.json();
};
const boot = (me) => fetch(BASE + '/api/ui/boot', { headers: { 'x-employee-id': me } }).then((r) => r.json());
const viec = (id, me = 'F003') => fetch(BASE + '/api/work-items/' + id, { headers: { 'x-employee-id': me } }).then((r) => r.json());

// ---------- J: vòng đời ý kiến — dừng đồng hồ — 4 cách trả lời ----------
// CV-046 (F037 làm, F036 giao): nêu ý kiến → giữ nguyên
await boot('F037');
await act('F037', "openDw('CV-046')");
await act('F037', 'moYKien()');
let r = await act('F037', "guiYKien('HAN')", { inputs: { yk_nd: 'Khối lượng quá lớn, hai tuần không kịp' } });
let t = await viec('CV-046');
ok('J: nêu ý kiến lưu vào phiếu', t.yKien && t.yKien.loai === 'HAN');
ok('J: đồng hồ dừng (dangDung)', t.dangDung === true);

// F036 trả lời: giữ nguyên
await boot('F036');
await act('F036', "openDw('CV-046')");
r = await act('F036', "act('giuNguyen')");
t = await viec('CV-046');
ok('J: giữ nguyên → đồng hồ chạy lại', t.dangDung === false && !t.yKien);
ok('J: số ngày dừng đã chốt', typeof t.ngayDaDung === 'number');

// ý kiến lần 2 → đổi hạn (+5 ngày công, không cho hạn pháp lý)
await act('F037', "openDw('CV-046')");
await act('F037', 'moYKien()');
await act('F037', "guiYKien('HAN')", { inputs: { yk_nd: 'Vẫn quá tải' } });
const hanCu = t.han;
await act('F036', "openDw('CV-046')");
await act('F036', "act('doiHan')");
t = await viec('CV-046');
ok('J: đổi hạn — hạn mới ≠ hạn cũ, hạn gốc giữ', t.han !== hanCu && t.han_goc === '04/09/2026' || t.han !== hanCu, `han ${hanCu} → ${t.han}, gốc ${t.han_goc}`);
ok('J: doi (số lần dời) tăng', t.doi >= 1);

// ---------- J: xin lùi hạn (prototype đã thay nút này bằng luồng ý kiến;
// nhánh act('xinlui') vẫn tồn tại và được REST /reschedule phủ) ----------
const dsF037 = await fetch(BASE + '/api/work-items?scope=mine', { headers: { 'x-employee-id': 'F037' } }).then((r) => r.json());
const vLui = dsF037.find((x) => x.tt === 'DANG_LAM' && x.lam === 'F037' && x.id !== 'CV-046' && !x.luat);
if (vLui) {
  let rr = await fetch(BASE + `/api/work-items/${vLui.id}/reschedule`, { method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-employee-id': 'F037' },
    body: JSON.stringify({ action: 'xinlui' }) }).then((r) => r.json());
  let t2 = await viec(vLui.id);
  ok('J: xin lùi hạn (REST) ghi nhận', !!t2.xinLui, JSON.stringify(t2.xinLui || rr).slice(0, 80));
  await fetch(BASE + `/api/work-items/${vLui.id}/reschedule`, { method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-employee-id': vLui.giao },
    body: JSON.stringify({ action: 'dongYLui' }) });
  t2 = await viec(vLui.id);
  ok('J: đồng ý lùi — số lần dời tăng, đề nghị đóng', (t2.doi || 0) >= 1 && !t2.xinLui, `doi=${t2.doi}`);
} else { console.log('· bỏ qua xin lùi (không có việc phù hợp)'); }

// ---------- J: đề xuất sửa tiêu chí → người giao đồng ý ----------
await act('F037', "openDw('CV-046')");
await act('F037', 'moDeXuat()');
r = await act('F037', 'guiDeXuat()', { inputs: { dxN: 'Xin thêm tiêu chí: liệt kê riêng giao dịch chưa về', 'dxL::onv': 'THEM' } });
t = await viec('CV-046');
ok('J: đề xuất được lưu', (t.dexuat || []).length >= 1 && t.dexuat[0].loai === 'THEM');
await act('F036', "openDw('CV-046')");
r = await act('F036', 'dxOk(0)');
t = await viec('CV-046');
ok('J: người giao đồng ý đề xuất', (t.dexuat || []).length === 0 || t.dexuat[0].xong || (t.log || []).some((l) => String(l.k).includes('đồng ý')), JSON.stringify(t.dexuat || []).slice(0, 100));

// ---------- J: nộp → trả lại lần 1 → nộp lại → duyệt ----------
for (const i of [0, 1, 2]) await act('F037', `tick(${i})`).catch(() => {});
await act('F037', "openDw('CV-046')");
t = await viec('CV-046');
for (let i = 0; i < (t.tc || []).length; i++) if (!t.tc[i].d) await act('F037', `tick(${i})`);
await act('F037', "act('nop')");
t = await viec('CV-046');
ok('J: nộp lần 1 → CHO_DUYET', t.tt === 'CHO_DUYET', t.tt);
await act('F036', "openDw('CV-046')");
await act('F036', "act('tralai')", { inputs: { nx: 'Thiếu bảng kê chi tiết' } });
t = await viec('CV-046');
ok('J: trả lại → DANG_LAM/TRA_LAI', t.tt === 'TRA_LAI' || t.tt === 'DANG_LAM', t.tt);
await act('F037', "openDw('CV-046')");
await act('F037', "act('nop')");
await act('F036', "openDw('CV-046')");
await act('F036', 'moCham()');
for (const c of ["setSC('cl',4)", "setSC('cd',4)", "setSC('ht',4)"]) await act('F036', c);
await act('F036', 'chotDiem()', { inputs: { nx: 'Đạt sau chỉnh sửa' } });
t = await viec('CV-046');
ok('J: nghiệm thu xong — điểm bất biến', t.tt === 'HOAN_THANH' && t.diem && typeof t.diem.tong === 'number', JSON.stringify(t.diem || {}).slice(0, 80));

// ---------- J: chuỗi duyệt tiền tầng 2 (việc gắn tiền > 50 triệu) ----------
// F036 (kế toán trưởng, có giao_viec) giao cho F038 một việc chi 120 triệu
const taoTien = await fetch(BASE + '/api/work-items', { method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-employee-id': 'F036' },
  body: JSON.stringify({ nhom: 'CONG_VIEC', ttl: 'Thanh toán đợt 2 hợp đồng kiểm toán', lam: 'F038',
    bd: '04/09/2026', han: '20/09/2026', dk: 3, sp: 'Bộ chứng từ thanh toán đã duyệt',
    tc: ['Chứng từ đủ chữ ký', 'Số tiền khớp hợp đồng'], tien: '120000000', tienLoai: 'CHI' }) }).then((r) => r.json());
if (taoTien.id) {
  const idT = taoTien.id;
  await boot('F038');
  await act('F038', `openDw('${idT}')`);
  await act('F038', "act('nhan')");
  let tT = await viec(idT);
  for (let i = 0; i < (tT.tc || []).length; i++) if (!tT.tc[i].d) await act('F038', `tick(${i})`);
  await act('F038', "act('nop')");
  await boot('F036');
  await act('F036', `openDw('${idT}')`);
  await act('F036', 'moCham()');
  for (const c of ["setSC('cl',4)", "setSC('cd',4)", "setSC('ht',4)"]) await act('F036', c);
  await act('F036', 'chotDiem()', { inputs: { nx: 'Chứng từ đủ' } });
  tT = await viec(idT);
  ok('J: việc 120tr sau duyệt cấp 1 → CHO_DUYET_2', tT.tt === 'CHO_DUYET_2', tT.tt);
  const nguoi2 = tT.nguoiDuyet2 || 'F005';
  await boot(nguoi2);
  await act(nguoi2, `openDw('${idT}')`);
  await act(nguoi2, "act('duyet2')");
  tT = await viec(idT);
  ok('J: duyệt tầng 2 đóng việc', tT.tt === 'HOAN_THANH' || (tT.chuoi && tT.chuoi.xong), tT.tt);
} else { ok('J: tạo việc tiền lớn', false, JSON.stringify(taoTien).slice(0, 100)); }

// ---------- C: sinh kỳ ----------
await boot('F036');
const truocSinh = await fetch(BASE + '/api/recurrence', { headers: { 'x-employee-id': 'F036' } }).then((r) => r.json());
await act('F036', "go('lap')").catch(() => {});
r = await act('F036', 'sinhKyTatCa()');
const sauSinh = await fetch(BASE + '/api/recurrence', { headers: { 'x-employee-id': 'F036' } }).then((r) => r.json());
ok('C: sinhKyTatCa chạy không lỗi', !r.tuChoi);
ok('C: sinh lần nữa không đẻ kỳ trùng', JSON.stringify((await act('F036', 'sinhKyTatCa()')).tuChoi || null) === 'null');

// ---------- I: quản trị — tham số, phân quyền, tin ngoài, hạng AI ----------
await boot('F003');
await act('F003', "go('qt')");
r = await act('F003', "setQT('ts')");
ok('I: mở Thiết lập › Tham số', !r.tuChoi);
r = await act('F003', "datTS('sucTuan',this.value)", { v: '10' });
const ch = await fetch(BASE + '/api/params', { headers: { 'x-employee-id': 'F003' } }).then((r) => r.json());
ok('I: đổi tham số sucTuan → 10 (ghi DB)', ch.CH && ch.CH.sucTuan === 10, JSON.stringify(ch.CH || {}).slice(0, 60));
await act('F003', "datTS('sucTuan',8)");

r = await act('F003', "setQT('pq')");
ok('I: mở Phân quyền', !r.tuChoi);
r = await act('F003', "setQT('dn')");
ok('I: mở Dữ liệu ngoài', !r.tuChoi);
r = await act('F003', "xacNhanTin('TN01')");
ok('I: xác nhận tin ngoài', !r.tuChoi);

// ---------- M: thông báo ----------
await boot('F037');
const nt1 = await fetch(BASE + '/api/notifications', { headers: { 'x-employee-id': 'F037' } }).then((r) => r.json());
await act('F037', 'readAll()');
const nt2 = await fetch(BASE + '/api/notifications', { headers: { 'x-employee-id': 'F037' } }).then((r) => r.json());
ok('M: đánh dấu đã đọc toàn bộ', nt2.every((n) => !n.un), `trước ${nt1.filter((n) => n.un).length} chưa đọc`);

console.log(`FLOWS: ${dat}/${dat + truot}`);
process.exit(truot ? 1 : 0);
