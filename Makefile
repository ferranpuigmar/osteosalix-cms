YELLOW := \033[1;33m
GREEN := \033[0;32m
NC := \033[0m

db:
	docker compose up -d

db-stop:
	docker compose down

dev: db
	@echo "$(GREEN)Starting Strapi...$(NC)"
	npm run develop

build:
	npm run build

console:
	npm run console

logs:
	docker compose logs -f

reset-db:
	docker compose down -v
	docker compose up -d
	@echo "$(GREEN)Database reset. Next 'make dev' will auto-seed fixtures.$(NC)"
