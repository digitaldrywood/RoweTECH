package clerk

import (
	"context"

	"rowetech/internal/config"
	"rowetech/internal/ctxkeys"
)

type Config struct {
	PublishableKey string
	Enabled        bool
}

func FromConfig(cfg *config.Config) Config {
	return Config{
		PublishableKey: cfg.ClerkPublishableKey,
		Enabled:        cfg.HasClerk(),
	}
}

func FromCtx(ctx context.Context) Config {
	if cfg, ok := ctx.Value(ctxkeys.ClerkConfig).(Config); ok {
		return cfg
	}
	return Config{}
}

func PublishableKeyFromCtx(ctx context.Context) string {
	return FromCtx(ctx).PublishableKey
}

func EnabledFromCtx(ctx context.Context) bool {
	return FromCtx(ctx).Enabled
}
