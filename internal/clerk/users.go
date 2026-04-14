package clerk

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// User represents a Clerk user from the API
type User struct {
	ID             string          `json:"id"`
	FirstName      string          `json:"first_name"`
	LastName       string          `json:"last_name"`
	Username       string          `json:"username"`
	ImageURL       string          `json:"image_url"`
	ProfileImageURL string         `json:"profile_image_url"`
	EmailAddresses []EmailAddress  `json:"email_addresses"`
	CreatedAt      int64           `json:"created_at"`
	LastSignInAt   *int64          `json:"last_sign_in_at"`
	PublicMetadata json.RawMessage `json:"public_metadata"`
}

// EmailAddress represents a Clerk email address
type EmailAddress struct {
	ID           string `json:"id"`
	EmailAddress string `json:"email_address"`
}

// UserResponse represents the API response for listing users
type UserResponse struct {
	Data       []User `json:"data"`
	TotalCount int    `json:"total_count"`
}

// GetFullName returns the user's full name
func (u *User) GetFullName() string {
	if u.FirstName == "" && u.LastName == "" {
		return u.Username
	}
	if u.FirstName == "" {
		return u.LastName
	}
	if u.LastName == "" {
		return u.FirstName
	}
	return u.FirstName + " " + u.LastName
}

// GetPrimaryEmail returns the user's primary email address
func (u *User) GetPrimaryEmail() string {
	if len(u.EmailAddresses) > 0 {
		return u.EmailAddresses[0].EmailAddress
	}
	return ""
}

// GetCreatedAtFormatted returns the formatted creation date
func (u *User) GetCreatedAtFormatted() string {
	if u.CreatedAt == 0 {
		return ""
	}
	t := time.UnixMilli(u.CreatedAt)
	return t.Format("Jan 2, 2006")
}

// GetLastSignInFormatted returns the formatted last sign in date
func (u *User) GetLastSignInFormatted() string {
	if u.LastSignInAt == nil || *u.LastSignInAt == 0 {
		return "Never"
	}
	t := time.UnixMilli(*u.LastSignInAt)
	return t.Format("Jan 2, 2006 3:04 PM")
}

// GetImageURL returns the best available image URL
func (u *User) GetImageURL() string {
	if u.ProfileImageURL != "" {
		return u.ProfileImageURL
	}
	return u.ImageURL
}

// Client handles Clerk API requests
type Client struct {
	secretKey  string
	httpClient *http.Client
}

// NewClient creates a new Clerk API client
func NewClient(secretKey string) *Client {
	return &Client{
		secretKey: secretKey,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// ListUsers fetches users from the Clerk API
func (c *Client) ListUsers(limit, offset int) ([]User, int, error) {
	if c.secretKey == "" {
		return nil, 0, fmt.Errorf("clerk secret key not configured")
	}

	url := fmt.Sprintf("https://api.clerk.com/v1/users?limit=%d&offset=%d&order_by=-created_at", limit, offset)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+c.secretKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to fetch users: %w", err)
	}
	defer func() {
		if closeErr := resp.Body.Close(); closeErr != nil {
			_ = closeErr
		}
	}()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, 0, fmt.Errorf("clerk API error (status %d): %s", resp.StatusCode, string(body))
	}

	var users []User
	if err := json.NewDecoder(resp.Body).Decode(&users); err != nil {
		return nil, 0, fmt.Errorf("failed to decode users: %w", err)
	}

	// Get total count from header
	totalCount := len(users)
	if tc := resp.Header.Get("X-Total-Count"); tc != "" {
		if _, err := fmt.Sscanf(tc, "%d", &totalCount); err != nil {
			totalCount = len(users)
		}
	}

	return users, totalCount, nil
}

// GetUser fetches a single user by ID
func (c *Client) GetUser(userID string) (*User, error) {
	if c.secretKey == "" {
		return nil, fmt.Errorf("clerk secret key not configured")
	}

	url := fmt.Sprintf("https://api.clerk.com/v1/users/%s", userID)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+c.secretKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch user: %w", err)
	}
	defer func() {
		if closeErr := resp.Body.Close(); closeErr != nil {
			_ = closeErr
		}
	}()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("clerk API error (status %d): %s", resp.StatusCode, string(body))
	}

	var user User
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, fmt.Errorf("failed to decode user: %w", err)
	}

	return &user, nil
}
