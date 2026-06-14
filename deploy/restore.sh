#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/opt/backups/osteosalix-cms}"
COMPOSE_FILE="${COMPOSE_FILE:-/opt/osteosalix-cms/deploy/docker-compose.prod.yml}"

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <backup_date>"
  echo "Available backups:"
  ls -1 "$BACKUP_DIR" | sort
  exit 1
fi

DATE="$1"
DB_FILE="$BACKUP_DIR/db_$DATE.sql"
UPLOADS_FILE="$BACKUP_DIR/uploads_$DATE.tar.gz"

if [ ! -f "$DB_FILE" ]; then
  echo "Database backup not found: $DB_FILE"
  exit 1
fi

if [ ! -f "$UPLOADS_FILE" ]; then
  echo "Uploads backup not found: $UPLOADS_FILE"
  exit 1
fi

echo "[restore] Stopping Strapi..."
docker compose -f "$COMPOSE_FILE" stop strapi

echo "[restore] Restoring database..."
MYSQL_DATABASE=$(docker compose -f "$COMPOSE_FILE" exec -T mysql printenv MYSQL_DATABASE | tr -d '\r')
MYSQL_USER=$(docker compose -f "$COMPOSE_FILE" exec -T mysql printenv MYSQL_USER | tr -d '\r')
MYSQL_PASSWORD=$(docker compose -f "$COMPOSE_FILE" exec -T mysql printenv MYSQL_PASSWORD | tr -d '\r')

docker compose -f "$COMPOSE_FILE" exec -T mysql mysql \
  -u "$MYSQL_USER" \
  -p"$MYSQL_PASSWORD" \
  "$MYSQL_DATABASE" < "$DB_FILE"

echo "[restore] Restoring uploads..."
docker run --rm \
  -v osteosalix-cms_uploads_data:/data \
  -v "$BACKUP_DIR:/backup" \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/uploads_$DATE.tar.gz -C /data"

echo "[restore] Starting Strapi..."
docker compose -f "$COMPOSE_FILE" start strapi

echo "[restore] Done."
