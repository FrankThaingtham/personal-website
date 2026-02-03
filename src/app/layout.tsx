import type { Metadata } from "next";
import "./globals.css";
import ThemeControls from "@/components/ThemeControls";

export const metadata: Metadata = {
  title: "Frank Thaingtham",
  description: "Home, about, projects, learning, and writing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "var(--font-body, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif)",
          background: "var(--bg, #ffffff)",
          color: "var(--text, #111111)",
        }}
      >
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backgroundColor: "var(--bg)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <nav
            className="nav"
            style={{
              maxWidth: 980,
              margin: "0 auto",
              padding: "14px 18px",
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/"
              style={{
                fontWeight: 800,
                textDecoration: "none",
                color: "inherit",
                marginRight: 6,
              }}
            >
              Home
            </a>

            <a href="/about" style={{ textDecoration: "none", color: "inherit" }}>
              About
            </a>
            <a href="/projects" style={{ textDecoration: "none", color: "inherit" }}>
              Projects
            </a>
            <a href="/research" style={{ textDecoration: "none", color: "inherit" }}>
              Research
            </a>
            <a href="/reading" style={{ textDecoration: "none", color: "inherit" }}>
              Reading
            </a>
            <a href="/blog" style={{ textDecoration: "none", color: "inherit" }}>
              Blog
            </a>
            <a href="/contact" style={{ textDecoration: "none", color: "inherit" }}>
              Contact
            </a>

            <ThemeControls />
          </nav>
        </header>

        <main style={{ maxWidth: 980, margin: "0 auto", padding: "28px 18px" }}>
          {children}
        </main>

        <footer style={{ borderTop: "1px solid var(--border)", marginTop: 40 }}>
          <div
            style={{
              maxWidth: 980,
              margin: "0 auto",
              padding: "18px",
              fontSize: 14,
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="mailto:frankthaingtham@hotmail.com" style={{ textDecoration: "underline" }}>
                Email
              </a>
              <a
                href="https://github.com/frankthaingtham"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline" }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/frankthaingtham/"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline" }}
              >
                LinkedIn
              </a>
            </div>

            <div>
              © {new Date().getFullYear()} Frank — Built with Next.js + TypeScript + Cloudflare Pages.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}