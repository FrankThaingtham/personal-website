import PhotoShuffle from "@/components/PhotoShuffle";

export default function HomePage() {
  return (
    <>
      <h1 className="h1">Hi, I’m Frank.</h1>

      <p className="p">
        I’m learning and building things I genuinely find interesting. I love analytics, finance, technology, and software — but most of all, I love learning. I share what I’m building, what I’m learning, and what I’m thinking about along the way. If you want to connect, feel free to{" "}
        <a href="/contact">reach out</a>.
      </p>

      <PhotoShuffle />

      <section style={{ marginTop: 34 }}>
        <h2 className="h2">Start here</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 18,
            alignItems: "start",
          }}
        >
          {/* Left: your existing list */}
          <ul style={{ lineHeight: 1.9, paddingLeft: 18, marginTop: 0 }}>
            <li>
              <a href="/about">About</a>{" "}
              <span style={{ color: "var(--muted)" }}>— my background + links</span>
            </li>
            <li>
              <a href="/projects">Projects</a>{" "}
              <span style={{ color: "var(--muted)" }}>— things I’ve built</span>
            </li>
            <li>
              <a href="/research">Research</a>{" "}
              <span style={{ color: "var(--muted)" }}>— valuations and notes</span>
            </li>
            <li>
              <a href="/reading">Reading</a>{" "}
              <span style={{ color: "var(--muted)" }}>— books + takeaways</span>
            </li>
            <li>
              <a href="/blog">Blog</a>{" "}
              <span style={{ color: "var(--muted)" }}>— longer writing</span>
            </li>
          </ul>

          {/* Right: quick card */}
          <div className="card" style={{ lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Quick links</div>
            <div style={{ color: "var(--muted)", marginBottom: 12 }}>
              Analytics + finance + software. I build and write in public.
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
              <a href="/resume.pdf" style={{ fontWeight: 700 }}>
                Resume →
              </a>
              <a href="https://github.com/frankthaingtham" target="_blank" rel="noreferrer" style={{ fontWeight: 700 }}>
                GitHub →
              </a>
              <a href="https://www.linkedin.com/in/frankthaingtham" target="_blank" rel="noreferrer" style={{ fontWeight: 700 }}>
                LinkedIn →
              </a>
            </div>

            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              <span style={{ fontWeight: 700, color: "inherit" }}>Now:</span> shipping this site + building portfolio projects.
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 34 }}>
        <h2 className="h2">Featured Work</h2>

        <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          {/* Featured item #1 */}
          <div className="card">
            <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>DCF Valuation Writeup</h3>
            <p style={{ margin: "0 0 12px", color: "var(--muted)", lineHeight: 1.6 }}>
              Built a scenario-based valuation model to understand what growth and margins the market is pricing in.
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              {["DCF", "Excel", "Finance Research"].map((t) => (
                <span
                  key={t}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 999,
                    padding: "4px 10px",
                    fontSize: 12,
                    color: "var(--muted)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <a href="/research" style={{ fontWeight: 600 }}>
              View writeup →
            </a>
          </div>

          {/* Featured item #2 */}
          <div className="card">
            <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>Personal Website (Next.js + Cloudflare)</h3>
            <p style={{ margin: "0 0 12px", color: "var(--muted)", lineHeight: 1.6 }}>
              Designed and shipped a fast, themeable portfolio site with a photo vault + interactive UI components.
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              {["Next.js", "TypeScript", "Cloudflare Pages"].map((t) => (
                <span
                  key={t}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 999,
                    padding: "4px 10px",
                    fontSize: 12,
                    color: "var(--muted)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <a href="/projects" style={{ fontWeight: 600 }}>
              View project →
            </a>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 34 }}>
        <h2 className="h2">Now</h2>

        <div className="card" style={{ lineHeight: 1.8 }}>
          <div>
            <span style={{ color: "var(--muted)" }}>Current focus:</span>{" "}
            <span>Learning Next.js + TypeScript and shipping portfolio-ready projects.</span>
          </div>

          <div>
            <span style={{ color: "var(--muted)" }}>Current read:</span>{" "}
            <span>The Little Book of Valuation by Aswath Damodaran.</span>
          </div>

          <div>
            <span style={{ color: "var(--muted)" }}>Current location:</span>{" "}
            <span>Based in North Carolina (UNC area).</span>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 34 }}>
        <h2 className="h2">Recent Writing / Logs</h2>

        <div className="grid" style={{ gap: 12 }}>
          <div className="card">
            <a href="/research" style={{ fontWeight: 700 }}>
              How I think about DCF assumptions (and what can go wrong) →
            </a>
            <div style={{ color: "var(--muted)", marginTop: 6, lineHeight: 1.6 }}>
              A simple framework for growth, margins, and discount rates—plus the failure modes I watch for.
            </div>
            <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 8 }}>
              Research • Feb 2026
            </div>
          </div>

          <div className="card">
            <a href="/projects" style={{ fontWeight: 700 }}>
              Building this site on Cloudflare Pages (what I learned) →
            </a>
            <div style={{ color: "var(--muted)", marginTop: 6, lineHeight: 1.6 }}>
              A quick build log: layout, theme controls, image vault, and deployment gotchas.
            </div>
            <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 8 }}>
              Build Log • Feb 2026
            </div>
          </div>

          <div className="card">
            <a href="/blog" style={{ fontWeight: 700 }}>
              Learning in public without losing focus →
            </a>
            <div style={{ color: "var(--muted)", marginTop: 6, lineHeight: 1.6 }}>
              How I document progress, choose projects, and keep momentum week to week.
            </div>
            <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 8 }}>
              Blog • Feb 2026
            </div>
          </div>
        </div>
      </section>
    </>
  );
}