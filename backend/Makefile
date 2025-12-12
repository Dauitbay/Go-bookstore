# ============================================================
# VARIABLES
# ============================================================

ENV_FILE = .env
DOCKER_COMPOSE = docker compose
MIGRATE = migrate
DB_DSN = $(shell grep DATABASE_DSN $(ENV_FILE) | cut -d '=' -f2)

# ============================================================
# INTERNAL HELPERS
# ============================================================

# Check if Docker is running
check-docker:
	@docker info >/dev/null 2>&1 || (echo "❌ Docker is not running! Start Docker Desktop."; exit 1)
	@echo "✔ Docker is running"

# Wait until MySQL is ready
wait-db:
	@echo "⏳ Waiting for MySQL to be ready..."
	@until docker exec bookstore_db mysqladmin ping -h localhost --silent; do \
		sleep 1; \
	done
	@echo "✔ MySQL is ready"

# ============================================================
# MIGRATIONS
# ============================================================

migrate-up:
	@echo "▶ Running migrations UP..."
	@$(MIGRATE) -path migrate -database "mysql://$(DB_DSN)" up
	@echo "✔ Migrations completed"

migrate-down:
	@echo "▶ Running migrations DOWN..."
	@$(MIGRATE) -path migrate -database "mysql://$(DB_DSN)" down

# ============================================================
# DOCKER COMMANDS
# ============================================================

db-start: check-docker
	@echo "▶ Starting MySQL..."
	@$(DOCKER_COMPOSE) up -d db

db-stop:
	@echo "⏹ Stopping MySQL..."
	@$(DOCKER_COMPOSE) stop db

# ============================================================
# GO SERVER COMMANDS
# ============================================================

# Run without hot reload
dev:
	@echo "▶ Starting API server..."
	@go run ./cmd/main.go

# ============================================================
# GO HOT RELOAD (AIR)
# ============================================================

# Requires: `go install github.com/cosmtrek/air@latest`
air:
	@echo "▶ Starting Air (hot reload)..."
	@air

# Run full environment + hot reload
hot: check-docker db-start wait-db migrate-up air

# ============================================================
# FULL PROJECT START
# ============================================================

# Original start command (no hot reload)
start: check-docker db-start wait-db migrate-up dev
