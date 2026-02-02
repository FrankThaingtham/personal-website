export default function AboutPage() {
  return (
    <>
      <h1 style={{ fontSize: 36, margin: "0 0 10px" }}>About</h1>

      <p style={{ lineHeight: 1.7, maxWidth: 760, color: "var(--muted)" }}>
        I’m Frank. I’m building skills in analytics, finance, and software engineering.
        This site is where I document what I’m learning and share projects as I ship them.
      </p>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ marginBottom: 10 }}>Quick snapshot</h2>
        <ul style={{ lineHeight: 1.9, paddingLeft: 18, marginTop: 0 }}>
          <li><strong>Focus:</strong> analyst-style projects + real-world learning</li>
          <li><strong>Tools:</strong> Python, SQL, Excel, JavaScript, Next.js</li>
          <li><strong>Interests:</strong> valuation, dashboards, automation, decision-making</li>
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ marginBottom: 10 }}>Links</h2>
        <ul style={{ lineHeight: 1.9, paddingLeft: 18, marginTop: 0 }}>
          <li><a href="#">Resume (add link)</a></li>
          <li><a href="#">LinkedIn (add link)</a></li>
          <li><a href="#">GitHub (add link)</a></li>
        </ul>
      </section>
    </>
  );
}