# FTMS — Forever Task Management System

Bản cài đặt thật của prototype `docs/prototype-forever.html` (bản đặc tả chạy được):
quản lý công việc cho 44 nhân sự · 18 đơn vị của Công ty CP XNK & TM FOREVER.
9 cửa sổ · phiếu việc đầy đủ vòng đời · phân quyền 12 quyền × 10 vai · điểm tháng
ba tầng · giao ban · trợ lý AI · việc lặp · dự án · dữ liệu ngoài.

## Kiến trúc — "kernel prototype ở máy chủ"

```
Trình duyệt (client mỏng ~250 dòng JS, KHÔNG một phép tính nghiệp vụ nào)
   │  handler on* nguyên văn + giá trị input     ▲ mảnh innerHTML + classList + SSE
   ▼                                             │
API (Bun 1.3) ── kênh UI /api/ui/* ──► KERNEL = CHÍNH MÃ NGUỒN PROTOTYPE (11.000 dòng,
   │            REST JSON /api/*        chạy trong sandbox VM, DOM ghi hình)
   │                                             │
   ▼  WriteService: mutate kernel → so lệch → giao dịch │ snapshot: DB → trạng thái kernel
PostgreSQL 16 (28 bảng "tài liệu + hình chiếu": doc jsonb + cột GENERATED)
```

Vì sao làm vậy: **486 hàm nghiệp vụ của prototype không được viết lại** — chúng được
nạp nguyên văn và chạy ở máy chủ. Mọi phép tính (quá hạn, RACI, ưu tiên, điểm tháng,
kết luận điều hành, Monte Carlo, phân quyền, gói trợ lý…) là đúng theo nghĩa đen,
được trọng tài **85.391 phép so** xác nhận (xem Kiểm thử). Thao tác ghi cũng chạy
chính hàm prototype (`act`, `taoViec`, `guiYKien`, `chotDiem`…) rồi WriteService
so lệch từng bảng và ghi DB trong một giao dịch.

## Chạy

```bash
# Docker (khuyến nghị — máy chủ thật xem TRIEN-KHAI.md)
cp .env.example .env   # điền bí mật, chmod 600
docker compose up -d --build
# prod (Caddy HTTPS một origin):
docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Dev tay (cần Bun ≥ 1.3 + PostgreSQL 16)
psql "$DATABASE_URL" -f db/schema.sql && psql "$DATABASE_URL" -f db/seed.sql
DATABASE_URL=postgres://… bun apps/api/src/main.mjs      # http://localhost:4000
```

Đăng nhập: tên = mã nhân sự viết thường (`f003`), mật khẩu = `INITIAL_PASSWORD`
(in ra log lúc boot nếu không đặt) — lần đầu bắt đổi mật khẩu.

## Kiểm thử (tất cả PHẢI xanh trước khi giao)

| Bài | Lệnh | Nội dung | Kết quả hiện tại |
|-----|------|----------|------------------|
| Golden | `SYSTEM_TODAY=2026-09-04 bun apps/api/test/golden.test.mjs` | DB → snapshot → kernel so với `vang/ky-vong` | **85.391/85.391** |
| Quét UI | `bun apps/api/test/ui-sweep.mjs` | 44 vai × mọi cửa sổ × handler đọc | **2.716 lượt · 0 lỗi** |
| Luồng ghi | `bun apps/api/test/flows.mjs` | ý kiến→4 cách trả lời · xin lùi · đề xuất · nộp/trả lại/nghiệm thu · duyệt tiền tầng 2 · sinh kỳ · tham số · tin ngoài | **23/23** |
| Trình duyệt | `bun apps/api/test/web-e2e.mjs` + `web-e2e2.mjs` | đăng nhập→đổi mật khẩu→9 cửa sổ→phiếu→trợ lý→tạo việc thật | **11/11 + 14/14** |

Luật bất di bất dịch: lệch số vàng → sửa mã, **không sửa số vàng**.

## Bản đồ mã

```
docs/prototype-forever.html      NGUỒN SỰ THẬT nghiệp vụ (bản đặc tả chạy được)
tools/                           make-kernel.mjs (proto→kernel) · gen-oracle.mjs (sinh số vàng)
vang/                            du-lieu-goc.json + ky-vong/*.json (85.391 phép so)
db/schema.sql                    28 bảng "tài liệu + hình chiếu" · seed.sql · migrations/
apps/api/src/
  domain/kernel/kernel.js        mã prototype + 30 điểm tiêm dữ liệu (SINH TỰ ĐỘNG — sửa qua tools/)
  domain/kernel/load.mjs         sandbox VM + DOM ghi hình + tiêm input
  snapshot/{load-state,store}    DB→kernel · WriteService (giao dịch + so lệch + SSE)
  auth/auth.mjs                  P1 đăng nhập nội bộ: scrypt · JWT cookie 12h · token_version · khoá 5 lần
  modules/ui.mjs                 kênh UI: thực thi handler có whitelist theo phiên
  modules/api.mjs                REST JSON (openapi/openapi.json)
  modules/{files,assistant,pages}  P4 kho tệp · P6 trợ lý (Claude thật/tại chỗ) · trang đăng nhập
  jobs/jobs.mjs                  P3: nhắc hạn 07:00 · sinh kỳ 00:30 · dọn ai_request · email CN
  mail/mail.mjs                  P5: thư từ thuMau() của kernel + SMTP client tối giản
  ui/{style.css,shell-body.html,client.js}   giao diện = ĐÚNG khung + CSS prototype
deploy/                          Caddyfile (một origin HTTPS) · sao-luu.sh (đêm, giữ 30 ngày)
```

## Ghi chú vận hành

- Một origin duy nhất → cookie httpOnly dùng chung UI + API + SSE, không CORS.
- `SYSTEM_TODAY` CHỈ dùng khi chạy kiểm (đóng băng ngày hệ thống = ngày prototype).
- Trợ lý: không có `ANTHROPIC_API_KEY` vẫn chạy chế độ trả lời tại chỗ bằng số thật;
  đặt khoá vào `.env` là gọi Claude thật (khoá chỉ nằm trên máy chủ).
- Email báo cáo Chủ nhật 17:00: đặt `SMTP_URL` (`smtps://user:app-password@smtp.gmail.com:465`);
  chưa đặt thì hệ thống dựng đủ 44 thư và ghi `report_delivery` với trạng thái bỏ qua.
- In PDF phiếu/báo cáo: đúng cơ chế prototype — hộp in của trình duyệt (Ctrl+P).
- Sửa nghiệp vụ: sửa `docs/prototype-forever.html` → `npm run kernel:build` +
  `oracle:build` → mọi bài kiểm phải xanh lại. Một khái niệm, một chỗ định nghĩa.
