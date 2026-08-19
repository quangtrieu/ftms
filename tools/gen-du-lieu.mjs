// gen-du-lieu.mjs — xuất toàn bộ dữ liệu gốc của prototype thành vang/du-lieu-goc.json
import fs from 'node:fs';
import { loadProto } from './harness.mjs';

const { X } = loadProto();

// Các khối trạng thái sẽ nằm trong DB (bảng) — thứ tự có chủ đích, đọc dễ
const DB_KEYS = [
  'U', 'CAP_TAY', 'DV', 'KHOI', 'VI_TRI', 'T', 'MAU', 'NT', 'CH', 'NGHI_LE',
  'BAC_DUYET', 'TT_RIENG', 'NGUON_DX', 'BANG_CHUNG', 'THUAT_NGU',
  'VAI_TRO', 'QUYEN', 'PHAN_CONG', 'HANG_GAN', 'AI_CH', 'AI_DUNG',
  'TIN_NGOAI', 'DOI_CHIEU', 'NK', 'RUI_RO', 'QUYET_DINH', 'SEQ', 'MSEQ',
];
// Khối chỉ-đọc/mô phỏng giữ trong kernel nhưng xuất để đối chiếu
const REF_KEYS = ['DINH_BIEN', 'ORDER', 'NGUONG_DUYET_THEM', 'LS_DUYET', 'LS_MAU', 'MOC_NHAC', 'THAM_SO', 'MO_HINH', 'HANG_AI', 'NHIEM_VU', 'KY'];

const out = { __sinh: 'từ prototype-forever.html', __ngayHeThong: '04/09/2026' };
for (const k of [...DB_KEYS, ...REF_KEYS]) {
  if (!(k in X)) { console.error('THIẾU:', k); continue; }
  out[k] = X[k];
}
fs.mkdirSync('../vang', { recursive: true });
fs.writeFileSync('../vang/du-lieu-goc.json', JSON.stringify(out, null, 1));
console.log('vang/du-lieu-goc.json:',
  'U=' + Object.keys(out.U).length, 'DV=' + Object.keys(out.DV).length,
  'T=' + out.T.length, 'MAU=' + out.MAU.length, 'NT=' + out.NT.length,
  'bytes=' + fs.statSync('../vang/du-lieu-goc.json').size);
