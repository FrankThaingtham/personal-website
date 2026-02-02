export default function HomePage() {
  return (
    <>
      <h1 className="h1">Hi, I’m Frank.</h1>

      <p className="p">
        I’m building projects in analytics, finance, and software — and sharing what I learn along the way.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
        <a className="btn" href="/about">About</a>
        <a className="btn" href="/projects">Projects</a>
        <a className="btn" href="/research">Research</a>
        <a className="btn" href="/reading">Reading</a>
        <a className="btn" href="/contact">Contact</a>
      </div>

      <section style={{ marginTop: 34 }}>
        <h2 className="h2">Start here</h2>
        <ul style={{ lineHeight: 1.9, paddingLeft: 18, marginTop: 0 }}>
          <li>
            <a href="/about">About</a> — my background + links
          </li>
          <li>
            <a href="/projects">Projects</a> — things I’ve built
          </li>
          <li>
            <a href="/research">Research</a> — valuations and notes (process-focused)
          </li>
          <li>
            <a href="/reading">Reading</a> — books + takeaways
          </li>
          <li>
            <a href="/blog">Blog</a> — longer writing
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 34 }}>
        <h2 className="h2">Now</h2>
        <ul style={{ lineHeight: 1.9, paddingLeft: 18, marginTop: 0, color: "var(--muted)" }}>
          <li>Building this website in Next.js + Cloudflare Pages</li>
          <li>Improving valuation skills (DCF + scenarios)</li>
          <li>Shipping portfolio-ready analytics projects</li>
        </ul>
      </section>
    </>
  );
}