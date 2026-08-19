// jobs.mjs — P3: việc nền chạy trong tiến trình api (một máy chủ, một tiến trình).
// Bốn việc của kế hoạch:
//   nhac-han      mỗi sáng 07:00 — nhacHomNay() → notification cho đúng người
//   sinh-ky       mỗi đêm 00:30 — sinhKyTatCa() (kỳ trùng đã bị chặn bởi khoá kỳ)
//   bao-cao-email Chủ nhật 17:00 (theo parameter CH.emThu/emGio) — P5
//   don-ai        mỗi đêm — xoá ai_request quá 90 ngày
// SYSTEM_TODAY đặt (chạy kiểm) → jobs không tự chạy, chỉ chạy tay qua hàm xuất.
import { guiBaoCaoTuan } from '../mail/mail.mjs';

export function batDauJobs({ sql, store }) {
  const daChay = new Set(); // "ten:YYYY-MM-DD" — không chạy đúp trong ngày

  async function nhacHan() {
    await store.write('HE_THONG', (K) => {
      const X = K.X;
      K.SET.me('F003'); // quét với tầm nhìn rộng nhất; người nhận suy theo từng việc
      const ds = X.nhacHomNay();
      ds.forEach(({ t, moc, ai, ngay }) => {
        // không nhắc trùng: đã có thông báo cùng việc cùng mốc hôm nay thì thôi
        const daCo = X.NT.some((n) => n.to === ai && n.go === t.id && n.tm.startsWith(X.NOW.slice(0, 5)) && n.tx.includes(moc.ten));
        if (daCo) return;
        X.NT.unshift({
          to: ai, ic: moc.ma === 'M3' ? 'r' : 'a',
          tx: `<b>${moc.ten}</b> — việc <b>${X.esc(t.ttl)}</b> ${ngay < 0 ? `quá hạn ${-ngay} ngày công` : ngay === 0 ? 'đến hạn hôm nay' : `còn ${ngay} ngày công`}`,
          tm: X.NOW, un: 1, go: t.id,
        });
      });
      return ds.length;
    }).then((r) => console.log(`[job nhac-han] ${r.ret} việc tới mốc nhắc`))
      .catch((e) => console.error('[job nhac-han]', e.message));
  }

  async function sinhKy() {
    await store.write('HE_THONG', (K) => {
      K.SET.me('F003');
      if (!K.X.CH.ckTuDong) return 'tắt';
      K.X.sinhKyTatCa();
    }).then(() => console.log('[job sinh-ky] xong'))
      .catch((e) => console.error('[job sinh-ky]', e.message));
  }

  async function donAi() {
    const r = await sql`DELETE FROM ai_request WHERE luc < now() - interval '90 days'`;
    console.log('[job don-ai] xoá bản ghi quá 90 ngày');
  }

  async function baoCaoEmail() {
    try { await guiBaoCaoTuan({ sql, store }); }
    catch (e) { console.error('[job bao-cao-email]', e.message); }
  }

  function tick() {
    if (process.env.SYSTEM_TODAY) return; // môi trường kiểm — không tự chạy
    const n = new Date();
    const khoa = (ten) => `${ten}:${n.toISOString().slice(0, 10)}`;
    const den = (gio, phut) => n.getHours() === gio && n.getMinutes() >= phut;
    const chay = (ten, fn) => { if (!daChay.has(khoa(ten))) { daChay.add(khoa(ten)); fn(); } };
    if (den(7, 0)) chay('nhac-han', nhacHan);
    if (den(0, 30)) chay('sinh-ky', sinhKy);
    if (den(1, 0)) chay('don-ai', donAi);
    const CH = store.val('CH') || {};
    const emThu = Number(CH.emThu ?? 0); // 0 = Chủ nhật (getDay)
    const [gioEm, phutEm] = String(CH.emGio || '17:00').split(':').map(Number);
    if (CH.emBat && n.getDay() === emThu && den(gioEm, phutEm)) chay('bao-cao-email', baoCaoEmail);
    if (daChay.size > 100) daChay.clear();
  }
  setInterval(tick, 60 * 1000);
  console.log('[boot] jobs nền: nhac-han 07:00 · sinh-ky 00:30 · don-ai 01:00 · bao-cao-email theo tham số');
  return { nhacHan, sinhKy, donAi, baoCaoEmail }; // xuất để chạy tay / kiểm thử
}
