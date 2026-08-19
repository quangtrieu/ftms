// gen-oracle.mjs — sinh bộ số đối chiếu (test oracle) từ CHÍNH các hàm prototype.
// Mỗi tệp ky-vong sinh bằng một kernel TƯƠI (giữ chuỗi rnd tất định) và một trình tự gọi cố định.
// Bản cài đặt thật phải tái tạo đúng các số này qua: DB → snapshot → kernel → hàm.
import fs from 'node:fs';
import { loadProto } from './harness.mjs';

fs.mkdirSync('../vang/ky-vong', { recursive: true });
const save = (name, data) => {
  fs.writeFileSync(`../vang/ky-vong/${name}.json`, JSON.stringify(data, null, 0));
  const n = countLeaves(data);
  console.log(`${name}.json  phép so=${n}`);
  return n;
};
function countLeaves(v) {
  if (v === null || typeof v !== 'object') return 1;
  return Object.values(v).reduce((s, x) => s + countLeaves(x), 0);
}

let total = 0;
const fresh = () => loadProto().X;

// ---------- 1. theo-viec: chỉ số từng việc (góc nhìn F003 — thấy hết) ----------
{
  const X = fresh(); X.__SET ?? null;
  const S = loadProto(); const K = S.X; S.SET.me('F003');
  const o = {};
  for (const t of K.T) {
    o[t.id] = {
      quaHan: K.quaHan(t), dangDung: K.dangDung(t), ngayDaDung: K.ngayDaDung(t),
      hanThuc: K.fmtNgay(K.hanThuc(t)), conLai: K.conLai(t), uuTien: K.uuTien(t),
      tienDo: K.tienDo(t), tienDoLa: K.laLa(t) ? K.tienDoLa(t) : null,
      capViec: K.capViec(t), laLa: K.laLa(t), viecMo: K.viecMo(t),
      ruiRo: K.ruiRo(t), raci: K.raci(t), sucKhoeXau: K.suckhoeXau(t),
      nguon: K.nguonCua(t), laDuAn: K.laDuAn(t), duAn: (K.duAnCua(t) || {}).id ?? null,
      canThiep: K.canCanThiep(t), toTien: K.toTien(t).map(x => x.lam),
      nguoiDuyet: K.nguoiDuyet(t), nguoiDuyet2: K.nguoiDuyet2(t),
      chuoiDuyetThem: K.chuoiDuyetThem(t), laVuotCap: K.laVuotCap(t),
    };
  }
  total += save('theo-viec', o);
}

// ---------- 2. theo-nguoi ----------
{
  const S = loadProto(); const K = S.X;
  const o = {};
  for (const uid of Object.keys(K.U)) {
    o[uid] = {
      tinhNguoi: K.tinhNguoi(uid), taiTuanNay: K.taiTuanNay(uid),
      hangCua: K.hangCua(uid), nutThat: K.nutThat(uid),
      truongTrucTiep: K.truongTrucTiep(uid),
    };
  }
  total += save('theo-nguoi', o);
}

// ---------- 3. tabs + capDuoi theo từng vai ----------
{
  const S = loadProto(); const K = S.X;
  const o = {};
  for (const uid of Object.keys(K.U)) {
    S.SET.me(uid);
    o[uid] = { tabs: K.tabs(), capDuoi: K.capDuoi(), capBC: K.capBCChoPhep(), laBGD: K.laBGD(uid) };
  }
  total += save('tabs', o);
}

// ---------- 4. quyền: coQuyen ma trận + tầm nhìn ----------
{
  const S = loadProto(); const K = S.X;
  const o = {};
  for (const uid of Object.keys(K.U)) {
    S.SET.me(uid);
    const q = {};
    for (const [ma] of K.QUYEN) q[ma] = K.coQuyen(uid, ma);
    o[uid] = {
      quyen: q,
      xemDuoc: K.T.filter(t => K.xemDuoc(t)).map(t => t.id),
      tamNhin: K.T.filter(t => K.trongTamNhin(t)).map(t => t.id),
      pvAI: K.pvAI(uid).length,
    };
  }
  total += save('quyen', o);
}

// ---------- 5. giao-ban: soLieuKy các tổ hợp ----------
{
  const S = loadProto(); const K = S.X;
  const o = {};
  for (const me of ['F003', 'F005', 'F036', 'F037']) {
    S.SET.me(me);
    for (const loai of ['TUAN', 'THANG', 'QUY']) {
      for (const lech of [0, -1]) {
        const kt = K.khoangKy(loai, lech - 1), kn = K.khoangKy(loai, lech);
        const tap = K.T.filter(t => K.trongTamNhin(t));
        o[`${me}:${loai}:${lech}`] = K.soLieuKy(tap, kt, kn);
      }
    }
  }
  total += save('giao-ban', o);
}

// ---------- 6. khối + đơn vị + kết luận điều hành (vai F003) ----------
{
  const S = loadProto(); const K = S.X; S.SET.me('F003');
  const kt = K.khoangKy('TUAN', -1), kn = K.khoangKy('TUAN', 0);
  const o = { tomTatDV: {}, tomTatKhoi: {}, khoiHo: K.khoiHo(kt, kn), viecNamTrucTiep: {} };
  for (const ma of K.dvBaoCao()) o.tomTatDV[ma] = K.tomTatDV(ma, kt, kn);
  for (const k of K.KHOI) o.tomTatKhoi[k.ma] = K.tomTatKhoi(k, kt, kn);
  for (const k of K.KHOI) o.viecNamTrucTiep[k.ma] = K.viecNamTrucTiep(k.bod, K.T.filter(t => K.trongTamNhin(t))).map(t => t.id);
  const tap = K.T.filter(t => K.trongTamNhin(t));
  const Sq = K.soLieuKy(tap, kt, kn);
  o.ketLuanDH = K.ketLuanDH(tap, kt, kn, Sq);
  total += save('khoi-ket-luan', o);
}

// ---------- 7. điểm tháng ba tầng ----------
{
  const S = loadProto(); const K = S.X; S.SET.me('F003');
  const o = {};
  for (const [loai, lech] of [['THANG', 0], ['THANG', -1], ['QUY', 0]]) {
    const ky = K.khoangKy(loai, lech);
    const e = { khoi: {}, dv: {}, nguoi: {} };
    for (const k of K.KHOI) e.khoi[k.ma] = K.diemThangKhoi(k, ky);
    for (const ma of K.dvBaoCao()) e.dv[ma] = K.diemThangDV(ma, ky);
    for (const uid of Object.keys(K.U)) e.nguoi[uid] = K.diemThangNguoi(uid, ky);
    o[`${loai}:${lech}`] = e;
  }
  total += save('diem', o);
}

// ---------- 8. dự án ----------
{
  const S = loadProto(); const K = S.X; S.SET.me('F003');
  const o = {};
  for (const p of K.dsDuAn()) {
    o[p.id] = {
      sucKhoe: K.sucKhoeDA(p), duBao: (d => d instanceof Date ? K.fmtNgay(d) : d)(K.duBao(p.id)), cpm: K.cpm(p.id),
      moc: K.mocDA(p.id).map(t => t.id), viec: K.viecDA(p.id).map(t => t.id),
      tienDo: K.tienDo(p),
    };
  }
  total += save('du-an', o);
}

// ---------- 9. việc lặp ----------
{
  const S = loadProto(); const K = S.X; S.SET.me('F003');
  const o = { soViecLap: K.soViecLap() };
  for (const t of K.T.filter(t => t.loai === 'CHU_KY' && t.lap)) {
    o[t.id] = { kySau: K.kySau(t), kySauDay: K.kySauDay(t), khoaKy: K.khoaKy(t, t.han) };
  }
  total += save('viec-lap', o);
}

// ---------- 10. điều hành (theo vai) + monte carlo ----------
{
  const S = loadProto(); const K = S.X;
  const o = {};
  for (const me of ['F003', 'F005', 'F036']) {
    S.SET.me(me);
    o[me] = {
      dangChanBoi: K.dangChanBoi().map(t => t.id),
      nhacHomNay: K.nhacHomNay().map(x => (x.t ? x.t.id : x.id) ?? x),
      canThiep: K.T.filter(t => K.trongTamNhin(t) && K.canCanThiep(t)).map(t => t.id),
    };
  }
  o.monteCarlo = K.monteCarlo(5, 200);
  total += save('dieu-hanh', o);
}

// ---------- 11. ô số Giao ban (soTap các chỉ số chuẩn, vai F003, tuần hiện tại) ----------
{
  const S = loadProto(); const K = S.X; S.SET.me('F003');
  S.SET.BC_LOAI ? S.SET.BC_LOAI('TUAN') : null;
  const o = {};
  for (const ma of K.dvBaoCao()) {
    for (const chi of ['denHan', 'xong', 'tl', 'quaHan', 'dung']) {
      const r = K.soTap(`DV:${ma}:${chi}`);
      if (r) o[`DV:${ma}:${chi}`] = { n: r.n, ds: (r.ds || []).map(t => t.id) };
    }
  }
  total += save('o-so', o);
}

// ---------- 12. trợ lý: gói bối cảnh theo hạng ----------
{
  const S = loadProto(); const K = S.X;
  const o = {};
  for (const me of ['F003', 'F036', 'F037']) {
    S.SET.me(me);
    for (const nv of Object.keys(K.NHIEM_VU)) {
      const g = K.goiBoiCanh(nv, {});
      o[`${me}:${nv}`] = { soViec: (g.viec || g.ds || []).length ?? null, khoa: Object.keys(g) };
    }
  }
  total += save('tro-ly', o);
}

// ---------- 13. lịch làm việc ----------
{
  const S = loadProto(); const K = S.X;
  const o = { laNgayLe: {}, dCong: {} };
  for (const l of K.NGHI_LE) o.laNgayLe[l.ngay] = K.laNgayLe(K.parse(l.ngay));
  for (const iso of ['01/09/2026', '02/09/2026', '05/09/2026', '06/09/2026', '07/09/2026', '20/09/2026', '31/12/2026']) {
    o.dCong[iso] = K.dCong(K.TODAY, K.parse(iso));
  }
  o.themNgayCong = K.fmtNgay(K.themNgayCong('04/09/2026', 5));
  o.ngayLamViecTruoc = K.fmtNgay(K.ngayLamViecTruoc(K.parse('02/09/2026')));
  total += save('lich', o);
}

console.log('TỔNG PHÉP SO:', total);
