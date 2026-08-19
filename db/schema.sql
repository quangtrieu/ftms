-- =====================================================================
-- FTMS — LƯỢC ĐỒ POSTGRESQL 16 (nguồn sự thật)
-- Mô hình "tài liệu + hình chiếu": mỗi thực thể giữ nguyên văn JSON của
-- prototype trong cột doc (bảo toàn từng trường, từng thứ tự — điều kiện
-- để bộ số đối chiếu 85.359 phép so khớp tuyệt đối), kèm cột sinh
-- (GENERATED) chiếu ra các trường hay truy vấn để đánh chỉ mục/SQL.
-- Mọi thao tác ghi đi qua WriteService: sửa doc trong giao dịch,
-- cột sinh tự cập nhật. Thứ tự dòng giữ bằng cột pos.
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------- 1. TỔ CHỨC & CON NGƯỜI ----------

-- U — nhân sự (44 người F001…F045)
CREATE TABLE employee (
  id          text PRIMARY KEY,                          -- "F003"
  pos         integer NOT NULL,
  doc         jsonb   NOT NULL,                          -- {id,ten,tat,cd,dv,vt[,anh]}
  ten         text GENERATED ALWAYS AS (doc->>'ten') STORED,
  dv          text GENERATED ALWAYS AS (doc->>'dv')  STORED,
  vt          text GENERATED ALWAYS AS (doc->>'vt')  STORED,
  cap_tay     integer,                                   -- CAP_TAY[id] nếu có
  active      boolean NOT NULL DEFAULT true,
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ix_employee_dv ON employee(dv);

-- DV — cây đơn vị (18 đơn vị, cha trỏ lên; gốc HDQT/CTY)
CREATE TABLE org_unit (
  ma          text PRIMARY KEY,                          -- "TCKT_KT"
  pos         integer NOT NULL,
  doc         jsonb   NOT NULL,                          -- {ten,cha,truong[,khuyet…]}
  cha         text GENERATED ALWAYS AS (doc->>'cha')    STORED,
  truong      text GENERATED ALWAYS AS (doc->>'truong') STORED,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- KHOI — bốn khối Ban Giám đốc
CREATE TABLE bod_block (
  ma   text PRIMARY KEY, pos integer NOT NULL,
  doc  jsonb NOT NULL,                                   -- {ma,bod,ten,dv[],nguoi[]}
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- VI_TRI — vị trí việc làm (tách khỏi người, có người thay)
CREATE TABLE job_position (
  ma   text PRIMARY KEY, pos integer NOT NULL,
  doc  jsonb NOT NULL,                                   -- {ma,ten,dv,cap,thay}
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------- 2. CÔNG VIỆC ----------

-- T — phiếu việc (88 dòng gốc; con: tc/buoc/files/log/dexuat nằm TRONG doc
--     để giữ đúng thứ tự và sự có mặt của trường như prototype)
CREATE TABLE work_item (
  id          text PRIMARY KEY,                          -- "CV-052"
  pos         integer NOT NULL,
  doc         jsonb   NOT NULL,
  ttl         text GENERATED ALWAYS AS (doc->>'ttl')  STORED,
  tt          text GENERATED ALWAYS AS (doc->>'tt')   STORED,  -- MOI/DANG_LAM/…
  lam         text GENERATED ALWAYS AS (doc->>'lam')  STORED,
  giao        text GENERATED ALWAYS AS (doc->>'giao') STORED,
  loai        text GENERATED ALWAYS AS (doc->>'loai') STORED,  -- CONG_VIEC/DU_AN/CHU_KY/DOT_XUAT
  han         text GENERATED ALWAYS AS (doc->>'han')  STORED,  -- dd/mm/yyyy
  mat         text GENERATED ALWAYS AS (doc->>'mat')  STORED,  -- CONG_KHAI/NOI_BO/HAN_CHE
  cha         text GENERATED ALWAYS AS (doc->>'cha')  STORED,
  lap         text GENERATED ALWAYS AS (doc->>'lap')  STORED,  -- tần suất nếu là quy tắc lặp
  mp          boolean GENERATED ALWAYS AS ((doc->>'mp')::boolean) STORED, -- việc mô phỏng lịch sử
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ix_work_lam  ON work_item(lam);
CREATE INDEX ix_work_giao ON work_item(giao);
CREATE INDEX ix_work_tt   ON work_item(tt);

-- MAU — mẫu phiếu việc
CREATE TABLE work_template (
  id  text PRIMARY KEY, pos integer NOT NULL,
  doc jsonb NOT NULL,                                    -- {id,n,sp,dk,ng,tc[],md,luat,loai,boi,luc,dung}
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Khoá chống sinh kỳ trùng: khoaKy(t, han) → "CV-052:09/2026"
CREATE TABLE recurrence_lock (
  period_key text PRIMARY KEY,
  work_id    text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ---------- 3. THÔNG BÁO & NHẬT KÝ ----------

-- NT — thông báo trong ứng dụng (mới nhất pos nhỏ nhất, như NT.unshift)
CREATE TABLE notification (
  id   bigserial PRIMARY KEY, pos integer NOT NULL,
  doc  jsonb NOT NULL,                                   -- {to,ic,tx,tm,un,go}
  nguoi text  GENERATED ALWAYS AS (doc->>'to') STORED,
  un    integer GENERATED ALWAYS AS ((doc->>'un')::integer) STORED,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ix_notification_nguoi ON notification(nguoi, un);

-- NK — nhật ký hệ thống (chỉ thêm, không sửa không xoá)
CREATE TABLE audit_log (
  id  bigserial PRIMARY KEY, pos integer NOT NULL,
  doc jsonb NOT NULL,                                    -- {t,ai,viec,dt,ip}
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ---------- 4. THAM SỐ & DANH MỤC ----------

-- CH + AI_CH + biến vận hành — mỗi khoá một dòng, đổi là có lịch sử
CREATE TABLE parameter (
  key   text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE parameter_history (
  id bigserial PRIMARY KEY,
  key text NOT NULL, gia_tri_cu jsonb, gia_tri_moi jsonb,
  boi text, luc timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE holiday          (pos integer PRIMARY KEY, doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()); -- NGHI_LE
CREATE TABLE approval_tier    (pos integer PRIMARY KEY, doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()); -- BAC_DUYET
CREATE TABLE custom_status    (ma text PRIMARY KEY, pos integer NOT NULL, doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()); -- TT_RIENG
CREATE TABLE adhoc_source     (ma text PRIMARY KEY, pos integer NOT NULL, doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()); -- NGUON_DX
CREATE TABLE evidence_catalog (pos integer PRIMARY KEY, doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()); -- BANG_CHUNG
CREATE TABLE glossary         (pos integer PRIMARY KEY, doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()); -- THUAT_NGU

-- ---------- 5. PHÂN QUYỀN ----------

CREATE TABLE role (            -- VAI_TRO: R_NV, R_TT, … (q = danh sách quyền bật)
  ma text PRIMARY KEY, pos integer NOT NULL,
  doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE permission (      -- QUYEN: [ma, tên, các cấp mặc định]
  pos integer PRIMARY KEY, doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE role_assignment ( -- PHAN_CONG: gán vai có người gán, ngày, lý do
  id bigserial PRIMARY KEY, pos integer NOT NULL,
  doc jsonb NOT NULL,                                    -- {uid,vai,pv,dv,boi,ngay,ly}
  uid text GENERATED ALWAYS AS (doc->>'uid') STORED,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------- 6. TRỢ LÝ AI ----------

CREATE TABLE ai_tier_assign (  -- HANG_GAN: gán hạng khác hạng tự động
  id bigserial PRIMARY KEY, pos integer NOT NULL,
  doc jsonb NOT NULL,                                    -- {uid,hang,boi,ngay,ly}
  uid text GENERATED ALWAYS AS (doc->>'uid') STORED,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE ai_usage (        -- AI_DUNG: đếm lượt/chi phí theo người
  uid text PRIMARY KEY, doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE ai_request (      -- mọi lượt hỏi: gói gửi đi + trả lời + chi phí
  id bigserial PRIMARY KEY,
  uid text NOT NULL, nv text, mo_hinh text,
  goi jsonb, tra_loi text, chi_phi numeric(12,0) DEFAULT 0,
  luc timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ix_ai_request_uid ON ai_request(uid, luc DESC);

-- ---------- 7. DỮ LIỆU NGOÀI & DỰ ÁN ----------

CREATE TABLE external_event (  -- TIN_NGOAI (sửa nội dung → xacNhan=false, WriteService lo)
  ma text PRIMARY KEY, pos integer NOT NULL,
  doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE benchmark (       -- DOI_CHIEU (hàm lay ở kernel, DB chỉ giữ dữ liệu)
  ma text PRIMARY KEY, pos integer NOT NULL,
  doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE project_risk (    -- RUI_RO
  id text PRIMARY KEY, pos integer NOT NULL,
  doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE project_decision (-- QUYET_DINH
  pos integer PRIMARY KEY, doc jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------- 8. BỘ ĐẾM ----------

CREATE TABLE seq (name text PRIMARY KEY, value integer NOT NULL); -- SEQ (mã việc), MSEQ (mã mẫu)

-- ---------- 9. ĐĂNG NHẬP (P1 — nội bộ, không SSO) ----------

CREATE TABLE user_account (
  username        text PRIMARY KEY,                      -- mã nhân sự viết thường: "f003"
  employee_id     text NOT NULL UNIQUE REFERENCES employee(id),
  password_hash   text NOT NULL,                         -- scrypt: N=16384,r=8,p=1 "salt:hex"
  token_version   integer NOT NULL DEFAULT 1,            -- đổi/đặt lại mật khẩu → +1 → phiên cũ chết
  must_change     boolean NOT NULL DEFAULT true,
  failed_count    integer NOT NULL DEFAULT 0,
  locked_until    timestamptz,
  last_login_at   timestamptz,
  active          boolean NOT NULL DEFAULT true,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ---------- 10. TỆP & BÁO CÁO ----------

CREATE TABLE attachment_blob ( -- nội dung tệp: key trong kho (MinIO/đĩa); metadata nằm trong work_item.doc.files
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id     text NOT NULL,
  ten         text NOT NULL,
  mime        text,
  kich_thuoc  bigint NOT NULL DEFAULT 0,
  storage_key text NOT NULL,
  boi         text,
  luc         timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ix_attachment_work ON attachment_blob(work_id);

CREATE TABLE report_delivery ( -- log gửi báo cáo email
  id bigserial PRIMARY KEY,
  ky text NOT NULL, nguoi text NOT NULL, email text,
  trang_thai text NOT NULL DEFAULT 'CHO',
  luc timestamptz NOT NULL DEFAULT now()
);
