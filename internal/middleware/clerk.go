package middleware

import (
	"context"
	"crypto/rsa"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"math/big"
	"net/http"
	"strings"
	"sync"
	"time"

	"rowetech/internal/config"
	"rowetech/internal/ctxkeys"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type jwksCache struct {
	mu        sync.Mutex
	keys      map[string]*rsa.PublicKey
	fetchedAt time.Time
	jwksURL   string
}

var clerkJWKS jwksCache

func RequireAdminAccess(cfg *config.Config) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if c.Request().URL.Path == "/admin/gallery" || c.Request().URL.Path == "/admin/images" {
				return c.Redirect(http.StatusFound, "/admin")
			}

			// Dev-only impersonation: under `-tags dev`, a loopback request with
			// a valid dev session cookie is treated as the named admin without
			// Clerk. Compiled out of production builds (see auth_dev_stub.go).
			if email, ok := devAdminBypass(c, cfg); ok {
				ctx := context.WithValue(c.Request().Context(), ctxkeys.User, email)
				c.SetRequest(c.Request().WithContext(ctx))
				return next(c)
			}

			if !cfg.HasClerk() {
				return next(c)
			}

			token, ok := SessionToken(c)
			if !ok {
				return c.Redirect(http.StatusFound, "/sign-in")
			}

			claims, err := VerifyClerkSessionToken(c.Request().Context(), cfg, token)
			if err != nil {
				slog.Warn("clerk session verification failed", "error", err)
				return c.Redirect(http.StatusFound, "/sign-in")
			}

			if len(cfg.AdminEmails) == 0 {
				return next(c)
			}

			userEmail, err := FetchClerkUserEmail(c.Request().Context(), cfg.ClerkSecretKey, claims.Subject)
			if err != nil {
				slog.Error("failed to fetch clerk user", "error", err)
				return c.Redirect(http.StatusFound, "/unauthorized")
			}

			if !cfg.IsAdminEmail(userEmail) {
				return c.Redirect(http.StatusFound, "/unauthorized")
			}

			return next(c)
		}
	}
}

// SessionToken extracts the session token from the request.
func SessionToken(c echo.Context) (string, bool) {
	authHeader := c.Request().Header.Get("Authorization")
	if strings.HasPrefix(authHeader, "Bearer ") {
		return strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer ")), true
	}
	if cookie, err := c.Cookie("__session"); err == nil && cookie.Value != "" {
		return cookie.Value, true
	}
	if cookie, err := c.Cookie("__clerk_db_jwt"); err == nil && cookie.Value != "" {
		return cookie.Value, true
	}
	return "", false
}

// VerifyClerkSessionToken verifies and parses a Clerk session JWT.
func VerifyClerkSessionToken(ctx context.Context, cfg *config.Config, token string) (*jwt.RegisteredClaims, error) {
	jwksURL := frontendAPIJWKSURL(cfg.ClerkPublishableKey)
	if jwksURL == "" {
		return nil, errors.New("could not determine JWKS URL from publishable key")
	}

	parser := jwt.NewParser(jwt.WithValidMethods([]string{"RS256"}))
	claims := &jwt.RegisteredClaims{}

	_, err := parser.ParseWithClaims(token, claims, func(t *jwt.Token) (interface{}, error) {
		kid, _ := t.Header["kid"].(string)
		return clerkPublicKey(ctx, jwksURL, kid)
	})
	if err != nil {
		return nil, err
	}

	if claims.Subject == "" {
		return nil, errors.New("missing subject")
	}

	return claims, nil
}

// frontendAPIJWKSURL extracts the JWKS URL from the publishable key.
func frontendAPIJWKSURL(pk string) string {
	if pk == "" {
		return ""
	}
	parts := strings.Split(pk, "_")
	if len(parts) < 3 {
		return ""
	}
	encoded := parts[2]
	decoded, err := base64.RawStdEncoding.DecodeString(encoded)
	if err != nil {
		return ""
	}
	domain := strings.TrimSuffix(string(decoded), "$")
	return "https://" + domain + "/.well-known/jwks.json"
}

func clerkPublicKey(ctx context.Context, jwksURL, kid string) (*rsa.PublicKey, error) {
	if kid == "" {
		return nil, errors.New("missing key id")
	}

	clerkJWKS.mu.Lock()
	defer clerkJWKS.mu.Unlock()

	// Check cache (also invalidate if URL changed)
	if clerkJWKS.keys != nil && clerkJWKS.jwksURL == jwksURL && time.Since(clerkJWKS.fetchedAt) < 12*time.Hour {
		if key, ok := clerkJWKS.keys[kid]; ok {
			return key, nil
		}
	}

	keys, err := fetchClerkJWKS(ctx, jwksURL)
	if err != nil {
		return nil, err
	}
	clerkJWKS.keys = keys
	clerkJWKS.fetchedAt = time.Now()
	clerkJWKS.jwksURL = jwksURL

	key, ok := keys[kid]
	if !ok {
		return nil, fmt.Errorf("clerk jwk not found for kid %s", kid)
	}
	return key, nil
}

type clerkJWK struct {
	Kid string `json:"kid"`
	Kty string `json:"kty"`
	Alg string `json:"alg"`
	Use string `json:"use"`
	N   string `json:"n"`
	E   string `json:"e"`
}

type clerkJWKSResponse struct {
	Keys []clerkJWK `json:"keys"`
}

func fetchClerkJWKS(ctx context.Context, jwksURL string) (map[string]*rsa.PublicKey, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, jwksURL, nil)
	if err != nil {
		return nil, err
	}
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := resp.Body.Close(); closeErr != nil {
			_ = closeErr
		}
	}()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("clerk jwks fetch failed: %s", resp.Status)
	}

	var jwks clerkJWKSResponse
	if err := json.NewDecoder(resp.Body).Decode(&jwks); err != nil {
		return nil, err
	}

	keys := make(map[string]*rsa.PublicKey, len(jwks.Keys))
	for _, jwk := range jwks.Keys {
		if jwk.Kty != "RSA" || jwk.N == "" || jwk.E == "" || jwk.Kid == "" {
			continue
		}
		pub, err := jwkToPublicKey(jwk.N, jwk.E)
		if err != nil {
			continue
		}
		keys[jwk.Kid] = pub
	}
	if len(keys) == 0 {
		return nil, errors.New("no valid clerk jwk keys found")
	}
	return keys, nil
}

func jwkToPublicKey(n, e string) (*rsa.PublicKey, error) {
	nb, err := base64.RawURLEncoding.DecodeString(n)
	if err != nil {
		return nil, err
	}
	eb, err := base64.RawURLEncoding.DecodeString(e)
	if err != nil {
		return nil, err
	}
	eInt := 0
	for _, b := range eb {
		eInt = eInt<<8 + int(b)
	}
	if eInt == 0 {
		return nil, errors.New("invalid exponent")
	}
	return &rsa.PublicKey{
		N: new(big.Int).SetBytes(nb),
		E: eInt,
	}, nil
}

type clerkUserResponse struct {
	ID                    string `json:"id"`
	PrimaryEmailAddressID string `json:"primary_email_address_id"`
	EmailAddresses        []struct {
		ID           string `json:"id"`
		EmailAddress string `json:"email_address"`
	} `json:"email_addresses"`
}

// FetchClerkUserEmail gets the email address for a Clerk user by ID.
func FetchClerkUserEmail(ctx context.Context, secretKey, userID string) (string, error) {
	if secretKey == "" || userID == "" {
		return "", errors.New("missing clerk credentials")
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, fmt.Sprintf("https://api.clerk.com/v1/users/%s", userID), nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+secretKey)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer func() {
		if closeErr := resp.Body.Close(); closeErr != nil {
			_ = closeErr
		}
	}()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return "", fmt.Errorf("clerk user fetch failed: %s", resp.Status)
	}

	var user clerkUserResponse
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return "", err
	}

	for _, addr := range user.EmailAddresses {
		if addr.ID == user.PrimaryEmailAddressID {
			return addr.EmailAddress, nil
		}
	}
	if len(user.EmailAddresses) > 0 {
		return user.EmailAddresses[0].EmailAddress, nil
	}
	return "", errors.New("no email address found")
}
