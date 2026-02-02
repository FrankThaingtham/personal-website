export default function HomePage() {
  return (
    <>
      <h1 style={{ fontSize: 44, margin: "0 0 10px" }}>Hi, I’m Frank.</h1>

      <p
        style={{
          fontSize: 18,
          lineHeight: 1.7,
          marginTop: 0,
          maxWidth: 760,
          color: "var(--muted)",
        }}
      >
        I’m building projects in analytics, finance, and software — and sharing what I learn along the way.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
        <a
          href="/about"
          style={{
            textDecoration: "none",
            border: "1px solid var(--border)",
            padding: "10px 14px",
            borderRadius: 12,
            color: "inherit",
            fontWeight: 600,
          }}
        >
          About Me
        </a>

        <a
          href="/projects"
          style={{
            textDecoration: "none",
            border: "1px solid var(--border)",
            padding: "10px 14px",
            borderRadius: 12,
            color: "inherit",
            fontWeight: 600,
          }}
        >
          View Projects
        </a>

        <a
          href="/contact"
          style={{
            textDecoration: "none",
            border: "1px solid var(--border)",
            padding: "10px 14px",
            borderRadius: 12,
            color: "inherit",
            fontWeight: 600,
          }}
        >
          Contact
        </a>
      </div>

      <section style={{ marginTop: 34 }}>
        <h2 style={{ marginBottom: 10 }}>Start here</h2>
        <ul style={{ lineHeight: 1.9, paddingLeft: 18, marginTop: 0 }}>
          <li>
            <a href="/about">About</a> — my background + resume links
          </li>
          <li>
            <a href="/projects">Projects</a> — things I’ve built
          </li>
          <li>
            <a href="/learn">Learn</a> — my current learning log
          </li>
          <li>
            <a href="/blog">Blog</a> — longer writing
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 34 }}>
        <h2 style={{ marginBottom: 10 }}>Now</h2>
        <ul style={{ lineHeight: 1.9, paddingLeft: 18, marginTop: 0, color: "var(--muted)" }}>
          <li>Building this website in Next.js + Cloudflare Pages</li>
          <li>Improving valuation skills (DCF + scenarios)</li>
          <li>Shipping portfolio-ready analytics projects</li>
        </ul>
      </section>
    </>
  );
}