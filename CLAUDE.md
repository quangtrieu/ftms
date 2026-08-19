# CLAUDE.md — chỉ dẫn cho AI viết mã trong kho này

Đọc trước khi sửa bất kỳ tệp nào. Kho này là bản cài đặt thật của prototype
`docs/prototype-forever.html` (bản đặc tả chạy được). **Mọi quy tắc nghiệp vụ đã có
sẵn ở prototype và bộ số vàng `vang/` — việc của bạn là tái tạo đúng, không phải nghĩ ra.**

## Ngăn xếp (đã chốt theo môi trường thật)
Bun 1.3 (HTTP + SQL + chạy TS/JS) · PostgreSQL 16 · SSE thời gian thực ·
Docker Compose + Caddy một origin · Turborepo/npm workspaces.
KHÔNG có build frontend: giao diện là chính bộ vẽ của prototype chạy ở máy chủ
(client mỏng `apps/api/src/ui/client.js`).

## Kiến trúc một câu
Kernel = mã prototype nguyên văn chạy trong sandbox VM ở máy chủ; DB là nguồn sự thật
lưu trạng thái; snapshot nạp DB → kernel; WriteService chạy hàm prototype rồi so lệch
từng bảng và ghi DB trong giao dịch; client chỉ áp mảnh HTML và gửi handler nguyên văn.

## Chạy
```
docker compose up --build            # đủ bộ: db + api  (http://localhost:4000)
# dev tay:
psql "$DATABASE_URL" -f db/schema.sql && psql "$DATABASE_URL" -f db/seed.sql
bun apps/api/src/main.mjs
SYSTEM_TODAY=2026-09-04 bun apps/api/test/golden.test.mjs    # PHẢI 85391/85391
bun apps/api/test/ui-sweep.mjs && bun apps/api/test/flows.mjs
```

## Luật bất di bất dịch
1. **KHÔNG sửa tay `apps/api/src/domain/kernel/kernel.js`** — tệp sinh tự động.
   Sửa nghiệp vụ = sửa `docs/prototype-forever.html` → `npm run kernel:build` →
   `npm run oracle:build` → mọi bài kiểm xanh lại. Một khái niệm, một chỗ định nghĩa.
2. **Máy chủ tính, màn hình vẽ.** `client.js` không có một phép tính nghiệp vụ nào —
   chỉ áp innerHTML/classList và chuyển tiếp handler + giá trị input.
3. **Máy chủ kiểm quyền.** Kênh UI chỉ thực thi handler mà chính máy chủ đã render cho
   phiên đó (whitelist), cộng ba mẫu có kiểm quyền riêng (openDw/moDA qua `xemDuoc`,
   go qua `tabs()`). REST lấy `me` từ JWT; không tin tham số trình duyệt.
4. **Số vàng là trọng tài.** 85.391 phép so trong `vang/ky-vong` sinh từ chính prototype.
   Lệch → sửa mã, không sửa số vàng. Tin prototype sai thì dừng lại và báo.
5. **Không hồi tố.** Điểm đã chấm bất biến; `parameter_history`, `audit_log` chỉ thêm.
6. **Quá hạn ≠ trễ.** `quaHan(t)` là hôm nay; `tre` là kết quả kỳ. Không gộp.
7. **Trợ lý: phần mềm tính số, mô hình viết nhận định.** Gói dựng bằng `goiBoiCanh`
   của kernel theo hạng ∩ quyền; khoá API chỉ ở `.env` máy chủ; mọi lượt lưu `ai_request`.
8. **Mọi thao tác ghi qua `store.write`** — giao dịch + so lệch + huỷ cache + SSE.
   Không ai được ghi DB tay ngoài đường này (trừ bảng auth/ai_request/report_delivery).

## Bản đồ mã
```
db/schema.sql             28 bảng "tài liệu + hình chiếu" (doc jsonb + cột GENERATED)
tools/make-kernel.mjs     proto.js → kernel.js (30 điểm tiêm __DB__, giữ nguyên logic)
tools/gen-oracle.mjs      sinh vang/ky-vong (13 tệp · 85.391 phép so)
apps/api/src/snapshot/    load-state (DB→trạng thái) · store (kernel + phiên + WriteService + SSE)
apps/api/src/modules/     ui (kênh UI) · api (REST) · files · assistant · pages
apps/api/src/auth/        đăng nhập nội bộ P1
apps/api/src/jobs/        nhắc hạn · sinh kỳ · dọn ai_request · email tuần
apps/api/src/ui/          style.css + shell (trích từ prototype) + client.js
apps/api/test/            golden · probes · ui-sweep · flows · web-e2e (Playwright)
```

## Ghi chú kỹ thuật đã vấp (đừng vấp lại)
- Bun SQL: truyền OBJECT cho tham số jsonb; truyền chuỗi JSON sẽ bị bọc thêm một lớp.
  Vô hướng (bool/số) → bọc mảng rồi `(->0)`.
- `let` nhiều biến một dòng trong prototype (`let A=1, B=2`) — bộ trích biến của
  load.mjs đã xử lý; thêm biến trạng thái mới thì kiểm lại `K.lets`.
- classList.toggle(force) của prototype → recorder đổi thành add/remove tường minh.
- Hai IIFE lúc nạp (sinhLichSu, gieoDanhMuc) phải tôn trọng dữ liệu tiêm — đã xử lý
  trong make-kernel; giữ nguyên khi regenerate.
- Môi trường xây dựng chặn npm registry — không thêm dependency npm nào vào apps/api.
- Chạy `oracle:build` trên Windows phải đặt `TZ=UTC` (kernel trong container chạy UTC;
  oracle sinh ở múi +07 sẽ lệch vài phép so ngày — duBao, log). harness.mjs đã sửa
  `.pathname` → `fileURLToPath` cho đường dẫn Windows.
- Golden test nạp trạng thái TỪ DB: phải chạy trên DB mới seed (schema+seed vào DB riêng
  ví dụ `golden_test`, trỏ DATABASE_URL vào đó). DB đang chạy bị job nhắc-hạn ghi thêm
  `log` vào việc đến hạn → lệch `log.length` dù mã đúng.
- `make-kernel.mjs` chỉ trích `tools/proto.js` từ prototype KHI CHƯA CÓ tệp — sửa
  prototype xong phải xoá `tools/proto.js` cũ (hoặc kiểm tra nó đã được sinh lại).
```
