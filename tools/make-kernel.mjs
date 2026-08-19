// make-kernel.mjs — biến proto.js thành kernel.js nhận dữ liệu tiêm qua globalThis.__DB__.
// Nguyên tắc: KHÔNG sửa logic — chỉ đổi mỗi khai báo dữ liệu `const X = <literal>` thành
// `const X = globalThis.__DB__?.X ?? <literal>`, nhờ đó mọi hằng dẫn xuất phía sau
// (LS, KY, _NET…) tự tính lại trên dữ liệu tiêm vào, đúng hệt lúc prototype tự chạy.
import fs from 'node:fs';

const INJECT = [
  'TODAY', 'NOW',
  'U', 'CAP_TAY', 'DV', 'KHOI', 'VI_TRI', 'T', 'MAU', 'NT', 'CH', 'NGHI_LE',
  'BAC_DUYET', 'TT_RIENG', 'NGUON_DX', 'BANG_CHUNG', 'THUAT_NGU',
  'VAI_TRO', 'QUYEN', 'PHAN_CONG', 'HANG_GAN', 'AI_CH', 'AI_DUNG',
  'TIN_NGOAI', 'DOI_CHIEU', 'NK', 'RUI_RO', 'QUYET_DINH', 'SEQ', 'MSEQ',
];

// proto.js trích từ docs/prototype-forever.html nếu chưa có
if (!fs.existsSync('proto.js')) {
  const html = fs.readFileSync('../docs/prototype-forever.html', 'utf8').split('\n');
  const dau = html.findIndex((l) => l.trim() === '<script>');
  const cuoi = html.findIndex((l) => l.trim() === '</script>');
  let js = html.slice(dau + 1, cuoi).join('\n') + '\n';
  js = js.replace(/^draw\(\);$/m, 'try{draw()}catch(e){globalThis.__drawErr=String(e)}');
  fs.writeFileSync('proto.js', js);
}
let src = fs.readFileSync('proto.js', 'utf8');
let missed = [];
for (const name of INJECT) {
  const re = new RegExp(`^(const|let)\\s+(${name})\\s*=\\s*`, 'm');
  const m = src.match(re);
  if (!m) { missed.push(name); continue; }
  src = src.replace(re, `$1 $2 = globalThis.__DB__?.${name} ?? `);
}
if (missed.length) { console.error('KHÔNG TÌM THẤY:', missed.join(', ')); process.exit(1); }
// Hai IIFE lúc nạp phải tôn trọng dữ liệu tiêm:
// 1) sinhLichSu đẻ 37 việc mô phỏng CV-2xx — khi T tiêm từ DB thì chúng ĐÃ nằm trong T,
//    nhưng vẫn phải chạy để giữ nguyên chuỗi rnd() (Monte Carlo phía sau lệ thuộc con trỏ seed).
//    Giải pháp: đẩy vào mảng vứt đi thay vì T.
src = src.replace('      T.push({', '      (globalThis.__DB__?.T ? [] : T).push({');
// 2) gieoDanhMuc gán bcLoai/ttRieng — kết quả gieo đã nằm trong dữ liệu xuất; chạy lại
//    trên dữ liệu thật có thể gán nhầm việc khác. Bỏ qua khi tiêm.
src = src.replace('(function gieoDanhMuc(){', '(function gieoDanhMuc(){ if (globalThis.__DB__?.T) return;');
// TODAY/NOW phải đổi được theo thời gian thật khi kernel sống lâu → const → let
src = src.replace(/^const (TODAY|NOW) = /gm, 'let $1 = ');
fs.writeFileSync('kernel.js', src);
console.log('kernel.js ghi xong —', INJECT.length, 'điểm tiêm dữ liệu');
