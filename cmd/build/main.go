// cmd/build/main.go - Static site generator
// Renders all Templ templates to static HTML files for Vercel deployment
package main

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"os"
	"path/filepath"

	"github.com/a-h/templ"

	"rowetech/internal/clerk"
	"rowetech/internal/config"
	"rowetech/internal/ctxkeys"
	"rowetech/internal/database/models"
	"rowetech/internal/sitecontent"
	"rowetech/templates/layouts"
	"rowetech/templates/pages"
)

func main() {
	outDir := "dist"
	if len(os.Args) > 1 {
		outDir = os.Args[1]
	}

	// Create output directory
	if err := os.MkdirAll(outDir, 0755); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to create output directory: %v\n", err)
		os.Exit(1)
	}

	// Load configuration from environment
	cfg := config.Load()

	// Set up context with site metadata and Clerk config
	ctx := context.Background()
	ctx = context.WithValue(ctx, ctxkeys.SiteConfig, cfg.Site)
	ctx = context.WithValue(ctx, ctxkeys.ClerkConfig, clerk.FromConfig(cfg))

	fmt.Printf("Clerk enabled: %v\n", cfg.HasClerk())

	// Stats for static build
	staticStats := layouts.AdminStats{
		UnreadContacts:  0,
		EditableContent: int64(sitecontent.TotalFieldCount()),
	}

	staticContent := sitecontent.Defaults()

	// Define pages to generate
	staticPages := []struct {
		path      string
		component templ.Component
	}{
		{"/index.html", pages.Home(staticContent)},
		{"/about/index.html", pages.About(staticContent)},
		{"/services/index.html", pages.Services(staticContent)},
		{"/capabilities/index.html", pages.Capabilities(staticContent)},
		{"/contact/index.html", pages.Contact(staticContent, false, "")},
		{"/terms/index.html", pages.Terms()},
		{"/privacy/index.html", pages.Privacy()},
		{"/sign-in/index.html", pages.SignIn()},
		{"/sign-up/index.html", pages.SignUp()},
		{"/admin/index.html", pages.AdminDashboard(staticStats, []models.ContactSubmission{})},
		{"/admin/content/index.html", pages.AdminContent(sitecontent.Definitions(), staticContent, staticStats)},
		{"/admin/contacts/index.html", pages.AdminContacts([]models.ContactSubmission{}, staticStats, "")},
		{"/admin/users/index.html", pages.AdminUsers([]clerk.User{}, 0, staticStats, cfg.HasClerk())},
		{"/admin/settings/index.html", pages.AdminSettings(map[string]string{
			"company_name":    "RoweTech Machine & Engineering",
			"tagline":         "",
			"company_phone":   "",
			"company_email":   "",
			"company_address": "",
			"business_hours":  "",
		}, staticStats)},
	}

	fmt.Printf("Building static site to %s/\n", outDir)

	for _, page := range staticPages {
		if err := renderPage(ctx, outDir, page.path, page.component); err != nil {
			fmt.Fprintf(os.Stderr, "Failed to render %s: %v\n", page.path, err)
			os.Exit(1)
		}
		fmt.Printf("  ✓ %s\n", page.path)
	}

	// Copy static assets
	if err := copyDir("static", filepath.Join(outDir, "static")); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to copy static assets: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("  ✓ /static/")

	fmt.Println("\nBuild complete!")
}

func renderPage(ctx context.Context, outDir, path string, component templ.Component) error {
	fullPath := filepath.Join(outDir, path)

	// Create directory if needed
	if err := os.MkdirAll(filepath.Dir(fullPath), 0755); err != nil {
		return err
	}

	// Create output file
	f, err := os.Create(fullPath)
	if err != nil {
		return err
	}
	defer func() {
		if closeErr := f.Close(); closeErr != nil {
			slog.Error("failed to close output file", "path", fullPath, "error", closeErr)
		}
	}()

	// Render template
	return component.Render(ctx, f)
}

func copyDir(src, dst string) error {
	return filepath.Walk(src, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Calculate destination path
		relPath, err := filepath.Rel(src, path)
		if err != nil {
			return err
		}
		dstPath := filepath.Join(dst, relPath)

		if info.IsDir() {
			return os.MkdirAll(dstPath, 0755)
		}

		// Copy file
		return copyFile(path, dstPath)
	})
}

func copyFile(src, dst string) error {
	srcFile, err := os.Open(src)
	if err != nil {
		return err
	}
	defer func() {
		if closeErr := srcFile.Close(); closeErr != nil {
			slog.Error("failed to close source file", "path", src, "error", closeErr)
		}
	}()

	dstFile, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer func() {
		if closeErr := dstFile.Close(); closeErr != nil {
			slog.Error("failed to close destination file", "path", dst, "error", closeErr)
		}
	}()

	_, err = io.Copy(dstFile, srcFile)
	return err
}
