import PhotoShuffle from "@/components/PhotoShuffle";
import TrackableLink from "@/components/TrackableLink";

export default function HomePage() {
  return (
    <>
      <h1 className="h1">Hi, I&apos;m Frank.</h1>

      <p className="p">
        I&apos;m learning and building things I genuinely find interesting. I love analytics, finance, technology, and
        software — but most of all, I love learning. I share what I&apos;m building, what I&apos;m learning, and what I&apos;m thinking
        about along the way. If you want to connect, feel free to <a href="/contact">reach out</a>.
      </p>

      <PhotoShuffle />

      <section style={{ marginTop: 40 }}>
        <h2 className="h2">Start here</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 16,
            alignItems: "start",
          }}
        >
          <div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 2.2 }}>
              <li>
                <a href="/about">About</a> <span style={{ color: "var(--muted)" }}>— background + links</span>
              </li>
              <li>
                <a href="/projects">Projects</a> <span style={{ color: "var(--muted)" }}>— things I&apos;ve built</span>
              </li>
              <li>
                <a href="/research">Research</a> <span style={{ color: "var(--muted)" }}>— valuations + notes</span>
              </li>
              <li>
                <a href="/reading">Reading</a> <span style={{ color: "var(--muted)" }}>— books + takeaways</span>
              </li>
              <li>
                <a href="/blog">Blog</a> <span style={{ color: "var(--muted)" }}>— longer writing</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 18 }}>
              Quick links 
            </div>
            <div style={{ color: "var(--muted)", marginBottom: 14, fontSize: 14 }}>Analytics + finance + software.</div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
              <TrackableLink href="/Frank-Thaingtham-Resume.pdf" eventName="resume_clicked" className="btn">
                Resume
              </TrackableLink>
              <a href="https://github.com/frankthaingtham" target="_blank" rel="noreferrer" className="btn">
                GitHub →
              </a>
              <a href="https://www.linkedin.com/in/frankthaingtham" target="_blank" rel="noreferrer" className="btn">
                LinkedIn →
              </a>
            </div>

            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              <span style={{ fontWeight: 600, color: "var(--text)" }}>Now:</span> shipping this site + building portfolio projects.
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section>
        <h2 className="h2">Featured Work</h2>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <div className="card">
            <h3 className="h3">DCF Valuation Writeup</h3>
            <p style={{ margin: "0 0 14px", color: "var(--muted)", lineHeight: 1.65, fontSize: 14 }}>
              Built a scenario-based valuation model to understand what growth and margins the market is pricing in.
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              {["DCF", "Excel", "Finance Research"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <a href="/research" className="btn" style={{ padding: "8px 14px", fontSize: 13 }}>
              View writeup →
            </a>
          </div>

          <div className="card">
            <h3 className="h3">Personal Website</h3>
            <p style={{ margin: "0 0 14px", color: "var(--muted)", lineHeight: 1.65, fontSize: 14 }}>
              Designed and shipped a fast, themeable portfolio site with a photo vault and interactive UI components.
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              {["Next.js", "TypeScript", "Cloudflare Pages"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <a href="/projects" className="btn" style={{ padding: "8px 14px", fontSize: 13 }}>
              View project →
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section>
        <h2 className="h2">Now</h2>

        <div className="card" style={{ lineHeight: 2 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <div>
              <span style={{ color: "var(--muted)", fontSize: 14 }}>Current focus:</span>{' '}
              <span>Learning Next.js + TypeScript and shipping portfolio-ready projects.</span>
            </div>
            <div>
              <span style={{ color: "var(--muted)", fontSize: 14 }}>Current read:</span>{' '}
              <span>The Little Book of Valuation by Aswath Damodaran.</span>
            </div>
            <div>
              <span style={{ color: "var(--muted)", fontSize: 14 }}>Current location:</span>{' '}
              <span>Based in North Carolina (UNC area).</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section>
        <h2 className="h2">Recent Writing</h2>

        <div className="card">
          <a href="/blog" style={{ fontWeight: 600, fontSize: 16 }}>
            Breakup, optimization, and regret →
          </a>
          <p style={{ color: "var(--muted)", marginTop: 8, lineHeight: 1.7, fontSize: 14 }}>
            I&apos;ve always tried to optimize everything; decisions, routes, even what to say. It feels like the safest way
            to move through life. But after my breakup, I&apos;m starting to wonder if always chasing the most logical answer
            is making me miss the messy part of life that I actually need to feel and learn from.
          </p>
          <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 10 }}>
            Blog · Feb 4, 2026
          </div>
        </div>
      </section>
    </>
  );
}
