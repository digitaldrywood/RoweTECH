SHELL := /bin/bash

.PHONY: dev build build-static test test-dev lint generate css css-watch migrate migrate-down migrate-status migrate-create setup setup-ci clean run help templ-update

BINARY_NAME=rowetech
MIGRATIONS_DIR=migrations
DIST_DIR=dist

# Hot-reload dev server. Air builds with `-tags dev` (see .air.toml), which
# compiles in the loopback-only auth bypass at /auth/dev/login so admin pages
# can be tested without Clerk. See CLAUDE.md "Dev-Only Auth Bypass".
dev:
	@if [ -f tmp/air-combined.log ]; then \
		mv tmp/air-combined.log tmp/air-combined-$$(date +%Y%m%d-%H%M%S).log; \
	fi
	@ls -t tmp/air-combined-*.log 2>/dev/null | tail -n +6 | xargs rm -f 2>/dev/null || true
	@air 2>&1 | tee tmp/air-combined.log

# Production build. Intentionally OMITS `-tags dev`, so the dev auth bypass is
# compiled out entirely (the !dev stub is used instead).
build: generate css
	go build -o $(BINARY_NAME) ./cmd/server

# Build static site for Vercel deployment
build-static: generate css
	@echo "Building static site..."
	@mkdir -p $(DIST_DIR)
	go run ./cmd/build $(DIST_DIR)
	@echo "Static site built to $(DIST_DIR)/"

test:
	go test -v -race ./...

# Run the dev-tagged tests too (auth bypass loopback gating lives behind -tags dev).
test-dev:
	go test -race -tags dev ./...

lint:
	golangci-lint run
	go tool templ fmt templates/

generate:
	go tool templ generate
	go tool sqlc generate -f sqlc/sqlc.yaml

css:
	npx @tailwindcss/cli -i static/css/input.css -o static/css/output.css --minify

css-watch:
	npx @tailwindcss/cli -i static/css/input.css -o static/css/output.css --watch

migrate:
	go tool goose -dir $(MIGRATIONS_DIR) sqlite3 "$$DATABASE_URL" up

migrate-down:
	go tool goose -dir $(MIGRATIONS_DIR) sqlite3 "$$DATABASE_URL" down

migrate-status:
	go tool goose -dir $(MIGRATIONS_DIR) sqlite3 "$$DATABASE_URL" status

migrate-create:
ifndef NAME
	$(error NAME is required. Usage: make migrate-create NAME=create_users)
endif
	go tool goose -dir $(MIGRATIONS_DIR) create $(NAME) sql

# Tool dependencies (templ, sqlc, goose) are pinned via the `tool` directive in
# go.mod and invoked through `go tool <name>` everywhere, so the generator
# version always matches the runtime version. Only air and golangci-lint still
# need a global install since they are not in go.mod.
setup:
	go install github.com/air-verse/air@latest
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	npm install

# CI/CD setup (minimal - for Vercel). templ/sqlc come from `go tool`.
setup-ci:
	npm install

# Bump the templ runtime and its tool pin together so the generator version
# always matches the runtime version. Avoids the drift that breaks builds.
templ-update:
	go get -u github.com/a-h/templ@latest
	go get -tool github.com/a-h/templ/cmd/templ@latest
	go mod tidy

clean:
	rm -f $(BINARY_NAME)
	rm -rf tmp/
	rm -rf $(DIST_DIR)/
	rm -f static/css/output.css

run: build
	./$(BINARY_NAME)

help:
	@echo "Available targets:"
	@echo "  dev            - Run with Air hot reload"
	@echo "  build          - Build the binary"
	@echo "  build-static   - Build static site for Vercel"
	@echo "  test           - Run tests"
	@echo "  test-dev       - Run tests including -tags dev (auth bypass)"
	@echo "  lint           - Run golangci-lint and templ fmt"
	@echo "  generate       - Generate templ and sqlc code"
	@echo "  css            - Build Tailwind CSS"
	@echo "  css-watch      - Watch and rebuild Tailwind CSS"
	@echo "  migrate        - Run database migrations"
	@echo "  migrate-down   - Rollback last migration"
	@echo "  migrate-status - Show migration status"
	@echo "  migrate-create - Create new migration (NAME=xxx)"
	@echo "  setup          - Install development tools (air, golangci-lint)"
	@echo "  setup-ci       - Install CI tools (Vercel)"
	@echo "  templ-update   - Bump templ runtime + tool pin together"
	@echo "  clean          - Remove build artifacts"
	@echo "  run            - Build and run the server"
