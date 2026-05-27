package database

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"path/filepath"

	"github.com/pressly/goose/v3"
	_ "modernc.org/sqlite"

	"rowetech/internal/database/sqlc"
	"rowetech/migrations"
)

type DB struct {
	Conn    *sql.DB
	Queries *sqlc.Queries
}

func New(ctx context.Context, databasePath string) (*DB, error) {
	// Ensure data directory exists
	dir := filepath.Dir(databasePath)
	if dir != "." && dir != "" {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return nil, fmt.Errorf("failed to create data directory: %w", err)
		}
	}

	conn, err := sql.Open("sqlite", databasePath+"?_foreign_keys=on&_journal_mode=WAL")
	if err != nil {
		return nil, fmt.Errorf("unable to open database: %w", err)
	}

	if err := conn.PingContext(ctx); err != nil {
		return nil, fmt.Errorf("unable to ping database: %w", err)
	}

	if err := runMigrations(conn); err != nil {
		return nil, fmt.Errorf("unable to run migrations: %w", err)
	}

	return &DB{
		Conn:    conn,
		Queries: sqlc.New(conn),
	}, nil
}

// runMigrations applies any pending goose migrations from the embedded
// filesystem, so a fresh or out-of-date database is brought up to schema on
// startup without a separate `make migrate` step.
func runMigrations(conn *sql.DB) error {
	goose.SetBaseFS(migrations.FS)
	defer goose.SetBaseFS(nil)

	if err := goose.SetDialect("sqlite3"); err != nil {
		return fmt.Errorf("failed to set goose dialect: %w", err)
	}

	if err := goose.Up(conn, "."); err != nil {
		return fmt.Errorf("failed to apply migrations: %w", err)
	}

	return nil
}

func (db *DB) Close() error {
	return db.Conn.Close()
}
