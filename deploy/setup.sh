#!/usr/bin/env bash
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ "$(id -u)" -ne 0 ]; then
  echo -e "${RED}This script must be run as root${NC}"
  exit 1
fi

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <domain> [email]"
  echo "  domain  — e.g. cms.osteosalix.com"
  echo "  email   — (optional) for Let's Encrypt notifications"
  exit 1
fi

DOMAIN="$1"
EMAIL="${2:-admin@$DOMAIN}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo -e "${GREEN}=== Setting up Osteosalix CMS on $DOMAIN ===${NC}"

echo -e "${YELLOW}[1/7] Installing system packages...${NC}"
apt-get update -qq
apt-get install -y -qq curl nginx certbot python3-certbot-nginx

echo -e "${YELLOW}[2/7] Installing Docker...${NC}"
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
fi

echo -e "${YELLOW}[3/7] Generating Strapi secrets...${NC}"
TEMPLATE_FILE="$SCRIPT_DIR/.env.production"
ENV_FILE="$SCRIPT_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
  cp "$TEMPLATE_FILE" "$ENV_FILE"
fi

if grep -q '^APP_KEYS=$' "$ENV_FILE"; then
  APP_KEYS="$(openssl rand -hex 16),$(openssl rand -hex 16),$(openssl rand -hex 16),$(openssl rand -hex 16)"
  API_TOKEN_SALT=$(openssl rand -base64 32)
  ADMIN_JWT_SECRET=$(openssl rand -base64 32)
  TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
  JWT_SECRET=$(openssl rand -base64 32)
  ENCRYPTION_KEY=$(openssl rand -base64 32)

  sed -i "s|^APP_KEYS=.*|APP_KEYS=$APP_KEYS|" "$ENV_FILE"
  sed -i "s|^API_TOKEN_SALT=.*|API_TOKEN_SALT=$API_TOKEN_SALT|" "$ENV_FILE"
  sed -i "s|^ADMIN_JWT_SECRET=.*|ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET|" "$ENV_FILE"
  sed -i "s|^TRANSFER_TOKEN_SALT=.*|TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT|" "$ENV_FILE"
  sed -i "s|^JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|" "$ENV_FILE"
  sed -i "s|^ENCRYPTION_KEY=.*|ENCRYPTION_KEY=$ENCRYPTION_KEY|" "$ENV_FILE"
  echo -e "${GREEN}  Secrets generated.${NC}"
else
  echo -e "${YELLOW}  Secrets already set, skipping.${NC}"
fi

# Enable seed for first run
sed -i 's|^SEED_PRODUCTION=.*|SEED_PRODUCTION=true|' "$ENV_FILE"
echo -e "${YELLOW}  Seed enabled for first run (SEED_PRODUCTION=true).${NC}"

echo -e "${YELLOW}[4/7] Configuring Nginx...${NC}"
cp "$SCRIPT_DIR/nginx.conf" /etc/nginx/sites-available/"$DOMAIN"
sed -i "s/DOMAIN_NAME/$DOMAIN/g" /etc/nginx/sites-available/"$DOMAIN"
ln -sf /etc/nginx/sites-available/"$DOMAIN" /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
echo -e "${GREEN}  Nginx configured.${NC}"

echo -e "${YELLOW}[5/7] Obtaining SSL certificate...${NC}"
mkdir -p /var/www/certbot/.well-known/acme-challenge
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" || {
  echo -e "${YELLOW}  Certbot failed (is DNS pointing to this server?). Will retry after build.${NC}"
}

echo -e "${YELLOW}[6/7] Building and starting containers...${NC}"
docker compose -f "$SCRIPT_DIR/docker-compose.prod.yml" build
docker compose -f "$SCRIPT_DIR/docker-compose.prod.yml" up -d

echo -e "${YELLOW}[7/7] Waiting for Strapi to be ready...${NC}"
for i in $(seq 1 60); do
  if curl -sf http://127.0.0.1:1337/_health >/dev/null 2>&1; then
    echo -e "${GREEN}  Strapi is ready!${NC}"
    break
  fi
  if [ "$i" -eq 60 ]; then
    echo -e "${RED}  Strapi did not start. Check logs: docker compose -f $SCRIPT_DIR/docker-compose.prod.yml logs${NC}"
  fi
  sleep 2
done

echo ""
echo -e "${GREEN}=== Setup complete ===${NC}"
echo -e "URL:  https://$DOMAIN/admin"
echo -e "Logs: docker compose -f $SCRIPT_DIR/docker-compose.prod.yml logs -f"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Create admin user: docker exec -it osteosalix-strapi npm run console -- user:create --email=admin@osteosalix.com --password=..."
echo -e "2. After seed completes, disable it for future restarts:"
echo -e "     sed -i 's/^SEED_PRODUCTION=.*/SEED_PRODUCTION=false/' $SCRIPT_DIR/.env"
echo -e "3. Upload images via admin panel"
echo -e "4. Configure webhook: Settings -> Webhooks -> URL: https://osteosalix.com/api/rebuild"
echo -e "5. If certbot failed, run: certbot --nginx -d $DOMAIN"
