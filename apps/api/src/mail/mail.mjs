// mail.mjs — P5: báo cáo tuần qua email.
// Nội dung thư dựng bằng CHÍNH thuMau()/nguoiNhanBC() của kernel (đã có trong prototype);
// đây chỉ là đường gửi: SMTP client tối giản trên Bun.connect (465 TLS hoặc 25/không mã hoá
// trong LAN), AUTH LOGIN nếu có tài khoản. Mỗi lần gửi ghi report_delivery.
// PDF: theo đúng prototype, inPDF mở hộp in của trình duyệt — không cần dịch vụ PDF riêng.
import * as tls from 'node:tls';
import * as net from 'node:net';

function smtpConfig() {
  const url = process.env.SMTP_URL; // smtps://user:pass@smtp.gmail.com:465  |  smtp://relay.local:25
  if (!url) return null;
  const u = new URL(url);
  return {
    host: u.hostname, port: Number(u.port || (u.protocol === 'smtps:' ? 465 : 25)),
    tls: u.protocol === 'smtps:',
    user: decodeURIComponent(u.username || ''), pass: decodeURIComponent(u.password || ''),
    from: process.env.SMTP_FROM || (u.username ? decodeURIComponent(u.username) : 'ftms@forever.com.vn'),
  };
}

/** SMTP tối giản: HELO → (AUTH) → MAIL FROM → RCPT TO → DATA. */
export function guiSmtp({ toi, tieuDe, htmlBody }) {
  const cf = smtpConfig();
  if (!cf) return Promise.reject(new Error('SMTP_URL chưa cấu hình'));
  return new Promise((resolve, reject) => {
    const sock = cf.tls
      ? tls.connect({ host: cf.host, port: cf.port, servername: cf.host })
      : net.connect({ host: cf.host, port: cf.port });
    let buf = '', steps = [], idx = 0, done = false;
    const fail = (e) => { if (!done) { done = true; sock.destroy(); reject(e); } };
    const send = (line) => sock.write(line + '\r\n');
    const b64 = (s) => Buffer.from(s).toString('base64');
    const noiDung = [
      `From: FTMS Forever <${cf.from}>`, `To: ${toi}`,
      `Subject: =?UTF-8?B?${b64(tieuDe)}?=`,
      'MIME-Version: 1.0', 'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: base64', '',
      b64(htmlBody).replace(/(.{76})/g, '$1\r\n'), '.',
    ].join('\r\n');
    steps = [
      { cho: 220, gui: () => send('HELO ftms.local') },
      ...(cf.user ? [
        { cho: 250, gui: () => send('AUTH LOGIN') },
        { cho: 334, gui: () => send(b64(cf.user)) },
        { cho: 334, gui: () => send(b64(cf.pass)) },
        { cho: 235, gui: () => send(`MAIL FROM:<${cf.from}>`) },
      ] : [
        { cho: 250, gui: () => send(`MAIL FROM:<${cf.from}>`) },
      ]),
      { cho: 250, gui: () => send(`RCPT TO:<${toi}>`) },
      { cho: 250, gui: () => send('DATA') },
      { cho: 354, gui: () => send(noiDung) },
      { cho: 250, gui: () => { send('QUIT'); done = true; sock.end(); resolve(true); } },
    ];
    sock.on('data', (d) => {
      buf += d.toString();
      let nl;
      while ((nl = buf.indexOf('\r\n')) >= 0) {
        const line = buf.slice(0, nl); buf = buf.slice(nl + 2);
        if (/^\d{3}-/.test(line)) continue; // dòng giữa của phản hồi nhiều dòng
        const code = Number(line.slice(0, 3));
        const b = steps[idx];
        if (!b) return;
        if (code !== b.cho) return fail(new Error(`SMTP bước ${idx}: chờ ${b.cho}, nhận “${line}”`));
        idx++;
        b.gui();
      }
    });
    sock.on('error', fail);
    sock.setTimeout?.(30000, () => fail(new Error('SMTP quá giờ')));
  });
}

/** Job Chủ nhật 17:00: dựng thư cho từng người bằng kernel và gửi. */
export async function guiBaoCaoTuan({ sql, store }) {
  const danhSach = store.withSession('F003', (K) => {
    const X = K.X;
    return X.nguoiNhanBC().map((x) => ({
      id: x.u.id, ten: x.u.ten, email: x.email, ma: x.ma,
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${X.thuMau(x)}</body></html>`,
      tieuDe: `[FOREVER] Báo cáo tuần — ${x.u.ten}`,
    }));
  });
  const ky = new Date().toISOString().slice(0, 10);
  let guiDuoc = 0, loi = 0;
  for (const t of danhSach) {
    let trangThai = 'GUI';
    try {
      if (smtpConfig()) { await guiSmtp({ toi: t.email, tieuDe: t.tieuDe, htmlBody: t.html }); guiDuoc++; }
      else trangThai = 'BO_QUA_CHUA_CO_SMTP';
    } catch (e) { trangThai = 'LOI: ' + e.message.slice(0, 120); loi++; }
    await sql`INSERT INTO report_delivery(ky, nguoi, email, trang_thai) VALUES (${ky}, ${t.id}, ${t.email}, ${trangThai})`;
  }
  console.log(`[bao-cao-email] ${danhSach.length} người · gửi ${guiDuoc} · lỗi ${loi} · ${smtpConfig() ? 'SMTP bật' : 'SMTP chưa cấu hình — chỉ ghi log'}`);
  return { tong: danhSach.length, guiDuoc, loi };
}
