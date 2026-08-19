#!/bin/sh
# sao-luu.sh — chạy 01:00 mỗi đêm (cron), giữ 30 ngày: pg_dump + kho tệp uploads.
# Nhớ chép bản sao RA KHỎI máy chủ (rsync/rclone) — sao lưu cùng đĩa không phải sao lưu.
set -e
NGAY=$(date +%F)
DIR=${BACKUP_DIR:-/opt/ftms/backup}
mkdir -p "$DIR"
docker compose exec -T db pg_dump -U forever forever | gzip > "$DIR/ftms-$NGAY.sql.gz"
docker run --rm -v ftms_uploads:/up -v "$DIR":/out alpine tar czf "/out/uploads-$NGAY.tar.gz" -C /up .
find "$DIR" -name 'ftms-*.sql.gz' -mtime +30 -delete
find "$DIR" -name 'uploads-*.tar.gz' -mtime +30 -delete
echo "sao lưu xong: $DIR/ftms-$NGAY.sql.gz"
