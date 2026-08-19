# TRIỂN KHAI LÊN MÁY CHỦ 150.95.108.206

Hai quyết định đã chốt: **đăng nhập nội bộ** (không SSO) · **kho tệp trên máy chủ này** (volume `uploads`; đổi sang MinIO/S3 chỉ là đổi driver, không đổi mã nghiệp vụ).
Toàn bộ hệ thống chạy trên **một máy chủ** bằng Docker Compose: `proxy` (Caddy, HTTPS) → `api` (Bun — phục vụ cả giao diện lẫn API) → `db` (PostgreSQL 16).
Chỉ `proxy` mở cổng ra ngoài (80/443). DB, API chỉ nói chuyện với nhau trong mạng nội bộ của Compose.

```
Internet ──443──▶ proxy (Caddy) ──▶ api:4000 (giao diện + API + SSE + jobs) ──▶ db:5432
```
Một origin duy nhất → cookie phiên httpOnly dùng chung; không có CORS chéo miền.

## 1. Yêu cầu máy chủ

| Mục | Tối thiểu cho 44–100 người |
|-----|----------------------------|
| Hệ điều hành | Ubuntu 22.04/24.04 LTS (hoặc Debian 12) |
| CPU / RAM / đĩa | 2 vCPU · 4 GB RAM · 40 GB SSD (api ~300 MB RAM; tệp đính kèm 25 MB/tệp — theo dõi volume `uploads`) |
| Phần mềm | Docker Engine 24+ · Docker Compose ≥ 2.24 (bản prod dùng thẻ `!reset`) |
| Cổng mở | 80, 443 (Caddy) · 22 (SSH — chỉ từ IP văn phòng nếu được) · **không** mở 5432/4000 |
| Tên miền | Khuyến nghị một tên miền phụ (`viec.<công-ty>.vn`) trỏ A → 150.95.108.206; Caddy tự xin/gia hạn Let's Encrypt. Chỉ có IP → Caddy dùng CA nội bộ, phát `root.crt` cho 44 máy (mục 4). |

## 2. Cài lần đầu (≈ 15 phút)

```bash
# 2.1 Docker
curl -fsSL https://get.docker.com | sh && sudo usermod -aG docker $USER && newgrp docker

# 2.2 Tường lửa
sudo ufw allow 22/tcp && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw allow 443/udp && sudo ufw enable

# 2.3 Mã nguồn
sudo mkdir -p /opt/ftms && sudo chown $USER /opt/ftms && cd /opt/ftms
# git clone <kho> .   hoặc giải nén ftms.zip vào đây

# 2.4 Bí mật — mỗi dòng một chuỗi ngẫu nhiên RIÊNG
cp .env.example .env
cat >> .env <<EOF
JWT_SECRET=$(openssl rand -base64 48)
DB_PASSWORD=$(openssl rand -hex 24)
INITIAL_PASSWORD=$(openssl rand -base64 9)   # phát cho 44 người TRONG NGÀY
SITE_ADDRESS=viec.congty.vn                  # hoặc 150.95.108.206
COOKIE_SECURE=1
ALLOW_DEV_HEADER=0
EOF
chmod 600 .env

# 2.5 Dựng và chạy
docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker compose logs -f api    # chờ: "áp db/schema.sql" · "nạp db/seed.sql" · "tạo 44 tài khoản đăng nhập"
curl -k https://$SITE_ADDRESS/api/health   # {"ok":true,"employees":44,"storage":"ok"}
```

Đăng nhập lần đầu: `https://<SITE_ADDRESS>` → `f003` + `INITIAL_PASSWORD` → hệ thống bắt đặt mật khẩu mới ngay.

> Seed là dữ liệu của prototype (44 người, 18 đơn vị, 88 việc trong đó 37 việc lịch sử mô phỏng gắn cờ `mp`). Người và đơn vị là thật, việc là mẫu — trước khi dùng thật, xoá/thay việc mẫu qua Thiết lập › Cơ cấu.

## 3. Phát tài khoản — làm trong MỘT ngày

1. Quản trị (F003 hoặc người có quyền `sua_to_chuc`) phát tên đăng nhập + mật khẩu ban đầu cho từng người **trong cùng ngày**.
2. Cuối ngày mở `GET /api/auth/accounts` — ai `dangNhapCuoi` còn trống thì đặt lại mật khẩu (`POST /api/auth/accounts/{id}/reset-password` → mật khẩu tạm một lần).
3. Người nghỉ việc: `POST /api/auth/accounts/{id}/active {"active":false}` — phiên đang mở chết ngay.

Cơ chế sẵn có: sai 5 lần → khoá 15 phút · 30 lượt/IP/15 phút · đổi/đặt lại mật khẩu → mọi phiên cũ hết hiệu lực (token_version) · phiên 12 giờ · mọi sự kiện vào nhật ký (Thiết lập › Nhật ký).

## 4. HTTPS khi chỉ có địa chỉ IP

`SITE_ADDRESS=150.95.108.206` → Caddy tự cấp chứng chỉ CA nội bộ; cài chứng chỉ gốc lên máy nhân viên:
```bash
docker compose cp proxy:/data/caddy/pki/authorities/local/root.crt ./forever-root.crt
```
Một tên miền phụ rẻ hơn nhiều và không phải cài gì. **Không chạy HTTP trần.**

## 5. Vận hành hằng ngày

| Việc | Lệnh |
|------|------|
| Trạng thái | `docker compose ps` · `curl -s https://<site>/api/health` |
| Nhật ký | `docker compose logs -f api` (đăng nhập, jobs, lỗi) |
| Cập nhật mã | `git pull && docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml up -d --build` (api tự áp `db/migrations/`) |
| Vào DB | `docker compose exec db psql -U forever forever` |
| Sao lưu | `deploy/sao-luu.sh` — cron 01:00, giữ 30 ngày (pg_dump + volume uploads). **Chép bản sao ra khỏi máy chủ.** |
| Khôi phục | `gunzip -c ftms-YYYY-MM-DD.sql.gz \| docker compose exec -T db psql -U forever forever` + bung `uploads-*.tar.gz` vào volume |
| Trợ lý AI thật | thêm `ANTHROPIC_API_KEY=` vào `.env`, `docker compose up -d api`. Khoá chỉ nằm trên máy chủ. |
| Email báo cáo CN 17:00 | thêm `SMTP_URL=smtps://user:app-password@smtp.gmail.com:465` vào `.env` |

Cron sao lưu: `0 1 * * * /opt/ftms/deploy/sao-luu.sh >> /var/log/ftms-sao-luu.log 2>&1`

## 6. Danh mục kiểm trước khi cho 44 người vào (go-live)

- [ ] `.env` không còn giá trị mẫu; `chmod 600 .env`; `.env` không nằm trong git.
- [ ] `https://<site>/api/health` trả `storage:"ok"`; trình duyệt không cảnh báo chứng chỉ.
- [ ] Đăng nhập `f003` → bị bắt đổi mật khẩu → vào được Việc của tôi; đăng xuất → không vào lại được bằng URL.
- [ ] `ALLOW_DEV_HEADER=0`: `curl -H 'x-employee-id: F003' https://<site>/api/me` phải trả **401**.
- [ ] Cổng 5432/4000 không trả lời từ ngoài (`nmap` từ máy văn phòng).
- [ ] `deploy/sao-luu.sh` chạy tay một lần thành công; bản sao đã chép ra máy khác.
- [ ] Đã xoá/thay việc mẫu của prototype; người và đơn vị đúng thực tế.
- [ ] Phát tài khoản trong ngày; cuối ngày rà `dangNhapCuoi` (mục 3).
- [ ] Giám sát ngoài: UptimeRobot (hoặc tương đương) gọi `/api/health` mỗi 5 phút.
