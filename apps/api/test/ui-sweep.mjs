// ui-sweep.mjs — quét giao diện: MỌI vai × MỌI cửa sổ × các handler an toàn-đọc.
// Mục tiêu: không một thao tác nào nổ lỗi máy chủ. Chạy trên DB smoke (dev header).
// Dùng: bun test/ui-sweep.mjs http://localhost:4001
const BASE = process.argv[2] || 'http://localhost:4001';

const AN_TOAN = /^(go|set[A-Z]|tog[A-Z]|moSo|moDG|moKhoi|moDA|moHet|moChon|moTao|moTroLy|moYKien|moCham|moDeXuat|moPQ|moGan|moMau|moSuaCK|moSuaDV|moSuaNS|moThemDV|moThemNS|bung|xem|loc[A-Z]|chuyenThang|zipAll|zgAll|daiOng|datOng|dong[A-Z]|closeDw|openDw|xoaLoc|veCTY|soiNguoi|khoiSo|hovG|chonTC|timTC|drawNav|draw|goiYHoi|datNV|xemGoi|fromNoti|readAll|chonNguoi|timChon|newFrm|doiNhomViec|useMau|boMau|khoiMau|renderMau|apBangChung|togTruoc|togPH|togTD|pickDx)\b/;

let goi = 0, loi = 0, tuChoi = 0;
const loiDs = [];

async function act(me, h, extra = {}) {
  goi++;
  const r = await fetch(BASE + '/api/ui/act', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-employee-id': me },
    body: JSON.stringify({ h, v: '', c: false, k: '', inputs: {}, confirms: [], ...extra }),
  });
  const d = await r.json().catch(() => ({}));
  if (d.tuChoi && d.reload) { loi++; loiDs.push([me, h.slice(0, 100)]); }
  else if (d.tuChoi) tuChoi++;
  return d;
}

async function boot(me) {
  const r = await fetch(BASE + '/api/ui/boot', { headers: { 'x-employee-id': me } });
  return r.json();
}

const dsNguoi = await fetch(BASE + '/api/org/tree', { headers: { 'x-employee-id': 'F003' } })
  .then((r) => r.json()).then((d) => d.nguoi.map((u) => u.id));
console.log('Quét', dsNguoi.length, 'vai…');

for (const me of dsNguoi) {
  const b = await boot(me);
  const nav = (b.html && b.html.nav) || '';
  const tabs = [...nav.matchAll(/go\('(\w+)'\)/g)].map((m) => m[1]);
  const daGoi = new Set();
  for (const tab of tabs) {
    const r = await act(me, `go('${tab}')`);
    const html = Object.values(r.html || {}).join('\n');
    // gom mọi handler trong màn này, chạy các handler an toàn-đọc chưa gọi
    const hs = new Set();
    for (const m of html.matchAll(/\son[a-z]+\s*=\s*"([^"]*)"/g))
      hs.add(m[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'));
    for (const h of hs) {
      if (!AN_TOAN.test(h)) continue;
      if (daGoi.has(h)) continue;
      daGoi.add(h);
      await act(me, h);
    }
    // trở về tab để trạng thái sạch cho vòng sau
    await act(me, `go('${tab}')`);
  }
}
console.log(`UI-SWEEP: ${goi} lượt gọi · lỗi máy chủ: ${loi} · từ chối thường: ${tuChoi}`);
if (loiDs.length) {
  console.log('— các handler nổ lỗi (tối đa 30):');
  loiDs.slice(0, 30).forEach(([me, h]) => console.log('  ', me, '·', h));
}
process.exit(loi ? 1 : 0);
