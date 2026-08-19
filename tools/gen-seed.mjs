// gen-seed.mjs — sinh ftms/db/seed.sql từ vang/du-lieu-goc.json
import fs from 'node:fs';

const goc = JSON.parse(fs.readFileSync('../vang/du-lieu-goc.json', 'utf8'));
const L = [];
const q = (v) => "'" + JSON.stringify(v).replace(/'/g, "''") + "'::jsonb";
const s = (v) => v == null ? 'NULL' : "'" + String(v).replace(/'/g, "''") + "'";

L.push('-- seed.sql — dữ liệu gốc prototype (sinh tự động từ vang/du-lieu-goc.json)');
L.push('BEGIN;');

// U + CAP_TAY
Object.keys(goc.U).forEach((id, i) => {
  const cap = goc.CAP_TAY[id];
  L.push(`INSERT INTO employee(id,pos,doc,cap_tay) VALUES (${s(id)},${i},${q(goc.U[id])},${cap ?? 'NULL'});`);
});
// DV
Object.keys(goc.DV).forEach((ma, i) =>
  L.push(`INSERT INTO org_unit(ma,pos,doc) VALUES (${s(ma)},${i},${q(goc.DV[ma])});`));
// KHOI, VI_TRI
goc.KHOI.forEach((k, i) => L.push(`INSERT INTO bod_block(ma,pos,doc) VALUES (${s(k.ma)},${i},${q(k)});`));
goc.VI_TRI.forEach((v, i) => L.push(`INSERT INTO job_position(ma,pos,doc) VALUES (${s(v.ma)},${i},${q(v)});`));
// T
goc.T.forEach((t, i) => L.push(`INSERT INTO work_item(id,pos,doc) VALUES (${s(t.id)},${i},${q(t)});`));
// MAU
goc.MAU.forEach((m, i) => L.push(`INSERT INTO work_template(id,pos,doc) VALUES (${s(m.id)},${i},${q(m)});`));
// NT
goc.NT.forEach((n, i) => L.push(`INSERT INTO notification(pos,doc) VALUES (${i},${q(n)});`));
// CH + AI_CH → parameter
Object.entries(goc.CH).forEach(([k, v]) =>
  L.push(`INSERT INTO parameter(key,value) VALUES (${s('CH.' + k)},${q(v)});`));
L.push(`INSERT INTO parameter(key,value) VALUES ('AI_CH',${q(goc.AI_CH)});`);
// danh mục
goc.NGHI_LE.forEach((x, i) => L.push(`INSERT INTO holiday(pos,doc) VALUES (${i},${q(x)});`));
goc.BAC_DUYET.forEach((x, i) => L.push(`INSERT INTO approval_tier(pos,doc) VALUES (${i},${q(x)});`));
goc.TT_RIENG.forEach((x, i) => L.push(`INSERT INTO custom_status(ma,pos,doc) VALUES (${s(x.ma)},${i},${q(x)});`));
goc.NGUON_DX.forEach((x, i) => L.push(`INSERT INTO adhoc_source(ma,pos,doc) VALUES (${s(x.ma)},${i},${q(x)});`));
goc.BANG_CHUNG.forEach((x, i) => L.push(`INSERT INTO evidence_catalog(pos,doc) VALUES (${i},${q(x)});`));
goc.THUAT_NGU.forEach((x, i) => L.push(`INSERT INTO glossary(pos,doc) VALUES (${i},${q(x)});`));
// phân quyền
Object.keys(goc.VAI_TRO).forEach((ma, i) =>
  L.push(`INSERT INTO role(ma,pos,doc) VALUES (${s(ma)},${i},${q(goc.VAI_TRO[ma])});`));
goc.QUYEN.forEach((x, i) => L.push(`INSERT INTO permission(pos,doc) VALUES (${i},${q(x)});`));
goc.PHAN_CONG.forEach((x, i) => L.push(`INSERT INTO role_assignment(pos,doc) VALUES (${i},${q(x)});`));
// AI
goc.HANG_GAN.forEach((x, i) => L.push(`INSERT INTO ai_tier_assign(pos,doc) VALUES (${i},${q(x)});`));
Object.entries(goc.AI_DUNG).forEach(([uid, v]) =>
  L.push(`INSERT INTO ai_usage(uid,doc) VALUES (${s(uid)},${q(v)});`));
// dữ liệu ngoài + dự án
goc.TIN_NGOAI.forEach((x, i) => L.push(`INSERT INTO external_event(ma,pos,doc) VALUES (${s(x.ma)},${i},${q(x)});`));
goc.DOI_CHIEU.forEach((x, i) => L.push(`INSERT INTO benchmark(ma,pos,doc) VALUES (${s(x.ma)},${i},${q(x)});`));
goc.NK.forEach((x, i) => L.push(`INSERT INTO audit_log(pos,doc) VALUES (${i},${q(x)});`));
goc.RUI_RO.forEach((x, i) => L.push(`INSERT INTO project_risk(id,pos,doc) VALUES (${s(x.id)},${i},${q(x)});`));
goc.QUYET_DINH.forEach((x, i) => L.push(`INSERT INTO project_decision(pos,doc) VALUES (${i},${q(x)});`));
// bộ đếm
L.push(`INSERT INTO seq(name,value) VALUES ('SEQ',${goc.SEQ}),('MSEQ',${goc.MSEQ});`);
L.push('COMMIT;');

fs.mkdirSync('../db', { recursive: true });
fs.writeFileSync('../db/seed.sql', L.join('\n') + '\n');
console.log('ftms/db/seed.sql:', L.length, 'câu lệnh,', fs.statSync('../db/seed.sql').size, 'bytes');
