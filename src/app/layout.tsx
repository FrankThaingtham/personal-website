import type { Metadata } from "next";
import "./globals.css";
import ThemeControls from "@/components/ThemeControls";
import OnboardingGate from "@/components/OnboardingGate";
import ChatWidget from "@/components/ChatWidget";
import Script from "next/script";

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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZY5MCCCS4D"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZY5MCCCS4D');
          `}
        </Script>
      </head>

      <body
        style={{
          margin: 0,
          fontFamily:
            "var(--font-body, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif)",
          background: "var(--bg, #ffffff)",
          color: "var(--text, #111111)",

          // ✅ Sticky footer layout
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <OnboardingGate>
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              backgroundColor: "var(--bg)",
              borderBottom: "1px solid var(--border)",
              backdropFilter: "blur(8px)",
            }}
          >
            <nav
              className="nav"
              style={{
                maxWidth: 1000,
                margin: "0 auto",
                padding: "12px 24px",
              }}
            >
              <a href="/" className="logo">
                Frank.
              </a>

              <a href="/about">About</a>
              <a href="/projects">Projects</a>
              <a href="/research">Research</a>
              <a href="/reading">Reading</a>
              <a href="/blog">Blog</a>
              <a href="/contact">Contact</a>

              <div style={{ marginLeft: "auto" }}>
                <ThemeControls />
              </div>
            </nav>
          </header>

          <main
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              padding: "40px 24px",
              width: "100%",
              flex: 1,
            }}
          >
            {children}
          </main>

          <footer
            style={{
              borderTop: "1px solid var(--border)",
              marginTop: 60,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                maxWidth: 1000,
                margin: "0 auto",
                padding: "24px",
                fontSize: 14,
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <a href="mailto:frankthaingtham@gmail.com">Email</a>
                <a href="https://github.com/frankthaingtham" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/frankthaingtham/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>

              <div style={{ color: "var(--muted)" }}>
                © {new Date().getFullYear()} Frank Thaingtham
              </div>
            </div>
          </footer>

          {/* Chat Widget - appears on every page */}
          <ChatWidget />
        </OnboardingGate>
      </body>
    </html>
  );
}
