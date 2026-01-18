// cmd/build/main.go - Static site generator
// Renders all Templ templates to static HTML files for Vercel deployment
package main

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/a-h/templ"

	"rowetech/internal/clerk"
	"rowetech/internal/config"
	"rowetech/internal/ctxkeys"
	"rowetech/internal/database/models"
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

	// Define pages to generate
	staticPages := []struct {
		path      string
		component templ.Component
	}{
		{"/index.html", pages.Home()},
		{"/about/index.html", pages.About()},
		{"/services/index.html", pages.Services()},
		{"/capabilities/index.html", pages.Capabilities()},
		{"/contact/index.html", pages.Contact(false, "")},
		{"/gallery/index.html", pages.Gallery([]models.GalleryItem{}, []string{})},
		{"/sign-in/index.html", pages.SignIn()},
		{"/sign-up/index.html", pages.SignUp()},
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
	defer f.Close()

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
	defer srcFile.Close()

	dstFile, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer dstFile.Close()

	_, err = io.Copy(dstFile, srcFile)
	return err
}
