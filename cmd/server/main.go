package main

import (
	"context"
	"log/slog"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"rowetech/internal/config"
	"rowetech/internal/database"
	"rowetech/internal/handler"
	"rowetech/internal/middleware"
	"rowetech/internal/portutil"

	"github.com/labstack/echo/v4"
)

func main() {
	cfg := config.Load()

	ctx := context.Background()
	db, err := database.New(ctx, cfg.DatabaseURL)
	if err != nil {
		slog.Error("failed to connect to database", "error", err)
		os.Exit(1)
	}
	defer func() {
		if closeErr := db.Close(); closeErr != nil {
			slog.Error("failed to close database", "error", closeErr)
		}
	}()

	e := echo.New()
	e.HideBanner = true
	e.HidePort = true

	middleware.Setup(e, cfg)

	h := handler.New(cfg, db)
	h.RegisterRoutes(e)

	// Bind the configured port, falling back to the next free port when it's
	// already in use so `make dev` doesn't die on a stray process.
	addr, triedPorts := portutil.FindAvailable(":" + cfg.Port)
	if len(triedPorts) > 0 {
		slog.Warn("configured port in use, using next free port",
			"configured", cfg.Port, "tried", strings.Join(triedPorts, ","), "using", strings.TrimPrefix(addr, ":"))
	}
	port := strings.TrimPrefix(addr, ":")

	go func() {
		slog.Info("starting server", "port", port, "env", cfg.Env)
		slog.Info("access URL", "url", "http://localhost:"+port)
		if cfg.TailscaleHostname != "" {
			slog.Info("access URL", "url", "http://"+cfg.TailscaleHostname+":"+port, "via", "tailscale")
		}
		if err := e.Start(addr); err != nil {
			slog.Info("shutting down server")
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctx); err != nil {
		slog.Error("server shutdown error", "error", err)
	}

	slog.Info("server stopped")
}
