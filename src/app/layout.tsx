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
            background: "var(--bg",
            opacity: 1,
            borderBottom: "1px solid var(--border, #eaeaea",
            }}>
          <nav className="nav"
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
            <a href="/" style={{ fontWeight: 800, textDecoration: "none", color: "inherit", marginRight: 6 }}>
              Home
            </a>

            <a href="/about" style={{ textDecoration: "none", color: "inherit" }}>About</a>
            <a href="/projects" style={{ textDecoration: "none", color: "inherit" }}>Projects</a>
            <a href="/research" style={{ textDecoration: "none", color: "inherit" }}>Research</a>
            <a href="/reading" style={{ textDecoration: "none", color: "inherit" }}>Reading</a>
            <a href="/blog" style={{ textDecoration: "none", color: "inherit" }}>Blog</a>
            <a href="/contact" style={{ textDecoration: "none", color: "inherit" }}>Contact</a>
            <ThemeControls/>
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