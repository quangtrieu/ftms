// load-state.mjs — đọc DB → dựng trạng thái kernel đúng hệt prototype.
// Đây là "snapshot": ảnh chụp toàn bộ dữ liệu trong bộ nhớ. Được cache và
// huỷ khi có thao tác ghi (WriteService gọi invalidate qua Redis/pub-sub).
export async function loadStateFromDb(query) {
  const rows = async (sql) => await query(sql);
  const st = {};

  // U — giữ đúng thứ tự pos; CAP_TAY tách riêng
  st.U = {}; st.CAP_TAY = {};
  for (const r of await rows('SELECT id, doc, cap_tay FROM employee ORDER BY pos')) {
    st.U[r.id] = r.doc;
    if (r.cap_tay != null) st.CAP_TAY[r.id] = r.cap_tay;
  }
  st.DV = {};
  for (const r of await rows('SELECT ma, doc FROM org_unit ORDER BY pos')) st.DV[r.ma] = r.doc;
  st.KHOI = (await rows('SELECT doc FROM bod_block ORDER BY pos')).map(r => r.doc);
  st.VI_TRI = (await rows('SELECT doc FROM job_position ORDER BY pos')).map(r => r.doc);
  st.T = (await rows('SELECT doc FROM work_item ORDER BY pos')).map(r => r.doc);
  st.MAU = (await rows('SELECT doc FROM work_template ORDER BY pos')).map(r => r.doc);
  st.NT = (await rows('SELECT doc FROM notification ORDER BY pos, id')).map(r => r.doc);

  st.CH = {}; st.AI_CH = { bat: true };
  for (const r of await rows('SELECT key, value FROM parameter')) {
    if (r.key.startsWith('CH.')) st.CH[r.key.slice(3)] = r.value;
    else if (r.key === 'AI_CH') st.AI_CH = r.value;
  }

  st.NGHI_LE = (await rows('SELECT doc FROM holiday ORDER BY pos')).map(r => r.doc);
  st.BAC_DUYET = (await rows('SELECT doc FROM approval_tier ORDER BY pos')).map(r => r.doc);
  st.TT_RIENG = (await rows('SELECT doc FROM custom_status ORDER BY pos')).map(r => r.doc);
  st.NGUON_DX = (await rows('SELECT doc FROM adhoc_source ORDER BY pos')).map(r => r.doc);
  st.BANG_CHUNG = (await rows('SELECT doc FROM evidence_catalog ORDER BY pos')).map(r => r.doc);
  st.THUAT_NGU = (await rows('SELECT doc FROM glossary ORDER BY pos')).map(r => r.doc);

  st.VAI_TRO = {};
  for (const r of await rows('SELECT ma, doc FROM role ORDER BY pos')) st.VAI_TRO[r.ma] = r.doc;
  st.QUYEN = (await rows('SELECT doc FROM permission ORDER BY pos')).map(r => r.doc);
  st.PHAN_CONG = (await rows('SELECT doc FROM role_assignment ORDER BY pos, id')).map(r => r.doc);

  st.HANG_GAN = (await rows('SELECT doc FROM ai_tier_assign ORDER BY pos, id')).map(r => r.doc);
  st.AI_DUNG = {};
  for (const r of await rows('SELECT uid, doc FROM ai_usage')) st.AI_DUNG[r.uid] = r.doc;

  st.TIN_NGOAI = (await rows('SELECT doc FROM external_event ORDER BY pos')).map(r => r.doc);
  st.DOI_CHIEU = (await rows('SELECT doc FROM benchmark ORDER BY pos')).map(r => r.doc);
  st.NK = (await rows('SELECT doc FROM audit_log ORDER BY pos, id')).map(r => r.doc);
  st.RUI_RO = (await rows('SELECT doc FROM project_risk ORDER BY pos')).map(r => r.doc);
  st.QUYET_DINH = (await rows('SELECT doc FROM project_decision ORDER BY pos')).map(r => r.doc);

  for (const r of await rows('SELECT name, value FROM seq')) st[r.name] = r.value;

  // Ngày hệ thống: SYSTEM_TODAY (kiểm thử/golden) hoặc hôm nay
  const sysToday = process.env.SYSTEM_TODAY;
  if (sysToday) {
    const [y, m, d] = sysToday.split('-').map(Number);
    st.TODAY = new Date(y, m - 1, d);
  } else {
    const n = new Date();
    st.TODAY = new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }
  // Dưới SYSTEM_TODAY (chạy kiểm) giờ cố định 09:15 như prototype — các phép so
  // thao tác ghi (log, thông báo) mới lặp lại được. Chạy thật thì lấy giờ thật.
  st.NOW = `${String(st.TODAY.getDate()).padStart(2, '0')}/${String(st.TODAY.getMonth() + 1).padStart(2, '0')} ` +
    (sysToday ? '09:15' : new Date().toTimeString().slice(0, 5));
  return st;
}
