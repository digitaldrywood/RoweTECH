package notify

import (
	"context"
	"crypto/tls"
	"fmt"
	"net"
	"net/smtp"
	"strings"
	"time"

	"rowetech/internal/config"
)

type Mailer struct {
	cfg *config.Config
}

func NewMailer(cfg *config.Config) *Mailer {
	return &Mailer{cfg: cfg}
}

func (m *Mailer) Enabled() bool {
	return m != nil && m.cfg != nil && m.cfg.SMTP.Enabled() && len(m.cfg.ContactNotifyTo) > 0
}

type ContactNotification struct {
	Name          string
	Company       string
	Email         string
	Phone         string
	ProjectType   string
	Message       string
	NewsletterOpt bool
	SiteURL       string
}

func (m *Mailer) SendContactNotification(ctx context.Context, msg ContactNotification) error {
	if !m.Enabled() {
		return nil
	}

	subject := fmt.Sprintf("New website inquiry from %s", msg.Name)
	body := buildContactBody(msg)
	message := buildMessage(m.cfg.SMTP.From, m.cfg.ContactNotifyTo, msg.Email, subject, body)

	return sendSMTP(ctx, m.cfg.SMTP, m.cfg.ContactNotifyTo, message)
}

func buildContactBody(msg ContactNotification) string {
	lines := []string{
		"A new contact form submission was received.",
		"",
		"Name: " + fallback(msg.Name),
		"Company: " + fallback(msg.Company),
		"Email: " + fallback(msg.Email),
		"Phone: " + fallback(msg.Phone),
		"Project Type: " + fallback(msg.ProjectType),
		"Newsletter Opt-In: " + yesNo(msg.NewsletterOpt),
	}
	if msg.SiteURL != "" {
		lines = append(lines, "Website: "+msg.SiteURL)
	}
	lines = append(lines, "", "Message:", msg.Message)
	return strings.Join(lines, "\r\n")
}

func buildMessage(from string, to []string, replyTo, subject, body string) []byte {
	headers := []string{
		"From: " + from,
		"To: " + strings.Join(to, ", "),
		"Subject: " + subject,
		"Date: " + time.Now().Format(time.RFC1123Z),
		"MIME-Version: 1.0",
		"Content-Type: text/plain; charset=UTF-8",
	}
	if replyTo != "" {
		headers = append(headers, "Reply-To: "+replyTo)
	}
	headers = append(headers, "", body)
	return []byte(strings.Join(headers, "\r\n"))
}

func sendSMTP(ctx context.Context, smtpCfg config.SMTPConfig, to []string, message []byte) error {
	address := net.JoinHostPort(smtpCfg.Host, smtpCfg.Port)
	useImplicitTLS := smtpCfg.Port == "465"

	var auth smtp.Auth
	if smtpCfg.Username != "" && smtpCfg.Password != "" {
		auth = smtp.PlainAuth("", smtpCfg.Username, smtpCfg.Password, smtpCfg.Host)
	}

	if useImplicitTLS {
		conn, err := tls.DialWithDialer(&net.Dialer{Timeout: 10 * time.Second}, "tcp", address, &tls.Config{
			ServerName: smtpCfg.Host,
			MinVersion: tls.VersionTLS12,
		})
		if err != nil {
			return err
		}
		defer conn.Close()

		client, err := smtp.NewClient(conn, smtpCfg.Host)
		if err != nil {
			return err
		}
		defer client.Quit()

		return sendWithClient(client, auth, smtpCfg, to, message)
	}

	dialer := &net.Dialer{Timeout: 10 * time.Second}
	conn, err := dialer.DialContext(ctx, "tcp", address)
	if err != nil {
		return err
	}
	defer conn.Close()

	client, err := smtp.NewClient(conn, smtpCfg.Host)
	if err != nil {
		return err
	}
	defer client.Quit()

	if ok, _ := client.Extension("STARTTLS"); ok {
		if err := client.StartTLS(&tls.Config{
			ServerName: smtpCfg.Host,
			MinVersion: tls.VersionTLS12,
		}); err != nil {
			return err
		}
	}

	return sendWithClient(client, auth, smtpCfg, to, message)
}

func sendWithClient(client *smtp.Client, auth smtp.Auth, smtpCfg config.SMTPConfig, to []string, message []byte) error {
	if auth != nil {
		if ok, _ := client.Extension("AUTH"); ok {
			if err := client.Auth(auth); err != nil {
				return err
			}
		}
	}

	if err := client.Mail(smtpCfg.From); err != nil {
		return err
	}
	for _, recipient := range to {
		if err := client.Rcpt(recipient); err != nil {
			return err
		}
	}

	writer, err := client.Data()
	if err != nil {
		return err
	}
	if _, err := writer.Write(message); err != nil {
		_ = writer.Close()
		return err
	}
	return writer.Close()
}

func fallback(value string) string {
	if strings.TrimSpace(value) == "" {
		return "-"
	}
	return value
}

func yesNo(value bool) string {
	if value {
		return "Yes"
	}
	return "No"
}
