import type { Metadata } from "next";
import "./globals.css";

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
        <header style={{ borderBottom: "1px solid var(--border, #eaeaea)" }}>
          <nav
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
            <a href="/learn" style={{ textDecoration: "none", color: "inherit" }}>
              Learn
            </a>
            <a href="/blog" style={{ textDecoration: "none", color: "inherit" }}>
              Blog
            </a>
            <a href="/contact" style={{ textDecoration: "none", color: "inherit" }}>
              Contact
            </a>
          </nav>
        </header>

        <main style={{ maxWidth: 980, margin: "0 auto", padding: "28px 18px" }}>
          {children}
        </main>

        <footer style={{ borderTop: "1px solid var(--border, #eaeaea)", marginTop: 40 }}>
          <div
            style={{
              maxWidth: 980,
              margin: "0 auto",
              padding: "18px",
              fontSize: 14,
              color: "var(--muted, #666666)",
            }}
          >
            © {new Date().getFullYear()} Frank Thaingtham
          </div>
        </footer>
      </body>
    </html>
  );
}