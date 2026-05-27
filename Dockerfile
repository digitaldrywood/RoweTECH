# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM golang:1.26-alpine AS builder

# Node is needed only to build the Tailwind CSS bundle.
RUN apk add --no-cache nodejs npm

WORKDIR /app

# Go module cache layer.
COPY go.mod go.sum ./
RUN go mod download

# Node deps for Tailwind (cached separately from source).
COPY package.json package-lock.json* ./
RUN npm install

# Application source.
COPY . .

# Generate templ + sqlc via the versions pinned in go.mod's `tool` directive
# (go tool), build the minified CSS, then compile a static binary.
# CGO_ENABLED=0 is safe because modernc.org/sqlite is pure Go.
RUN go tool templ generate \
    && go tool sqlc generate -f sqlc/sqlc.yaml \
    && npx @tailwindcss/cli -i static/css/input.css -o static/css/output.css --minify \
    && CGO_ENABLED=0 go build -ldflags="-s -w" -o /app/server ./cmd/server

# ---- Runtime stage ----
FROM alpine:3.21

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

# Binary + static assets. Goose migrations are embedded in the binary
# (migrations/embed.go), so they are not copied here.
COPY --from=builder /app/server ./server
COPY --from=builder /app/static ./static

# SQLite database lives here. Mount a persistent Dokploy volume at /app/data
# so data survives redeploys (DATABASE_URL points inside it). The app creates
# the directory on boot if missing.
VOLUME ["/app/data"]

ENV PORT=3000 \
    ENV=production \
    DATABASE_URL=/app/data/rowetech.db

EXPOSE 3000

CMD ["./server"]
