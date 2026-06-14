#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/opt/backups/osteosalix-cms}"
COMPOSE_FILE="${COMPOSE_FILE:-/opt/osteosalix-cms/deploy/docker-compose.prod.yml}"
DATE=$(date +%Y%m%d_%H%M%S)
KEEP_DAYS="${KEEP_DAYS:-7}"

mkdir -p "$BACKUP_DIR"

echo "[backup] Creating backup $DATE..."

# MySQL dump
MYSQL_DATABASE=$(docker compose -f "$COMPOSE_FILE" exec -T mysql printenv MYSQL_DATABASE | tr -d '\r')
MYSQL_USER=$(docker compose -f "$COMPOSE_FILE" exec -T mysql printenv MYSQL_USER | tr -d '\r')
MYSQL_PASSWORD=$(docker compose -f "$COMPOSE_FILE" exec -T mysql printenv MYSQL_PASSWORD | tr -d '\r')

docker compose -f "$COMPOSE_FILE" exec -T mysql mysqldump \
  -u "$MYSQL_USER" \
  -p"$MYSQL_PASSWORD" \
  "$MYSQL_DATABASE" > "$BACKUP_DIR/db_$DATE.sql"

# Uploads
docker run --rm \
  -v osteosalix-cms_uploads_data:/data \
  -v "$BACKUP_DIR:/backup" \
  alpine tar czf "/backup/uploads_$DATE.tar.gz" -C /data .

# Cleanup old backups
find "$BACKUP_DIR" -name 'db_*.sql' -mtime +$KEEP_DAYS -delete
find "$BACKUP_DIR" -name 'uploads_*.tar.gz' -mtime +$KEEP_DAYS -delete

echo "[backup] Done: $BACKUP_DIR/db_$DATE.sql"
echo "[backup] Done: $BACKUP_DIR/uploads_$DATE.tar.gz"
