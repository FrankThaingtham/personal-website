export default function AboutPage() {
  return (
    <>
      <h1 className="h1" style={{ fontSize: 36 }}>About</h1>

      <p className="p">
        I’m Frank. I’m building skills in analytics, finance, and software engineering.
        This site is where I document what I’m learning and share projects as I ship them.
      </p>

      <section style={{ marginTop: 26 }}>
        <h2 className="h2">Quick snapshot</h2>

        <div className="card" style={{ maxWidth: 760 }}>
          <ul style={{ lineHeight: 1.9, paddingLeft: 18, margin: 0 }}>
            <li><strong>Focus:</strong> analyst-style projects + real-world learning</li>
            <li><strong>Tools:</strong> Python, SQL, Excel, JavaScript, Next.js</li>
            <li><strong>Interests:</strong> valuation, dashboards, automation, decision-making</li>
          </ul>
        </div>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2 className="h2">Links</h2>

        <div className="card" style={{ maxWidth: 760 }}>
          <ul style={{ lineHeight: 1.9, paddingLeft: 18, margin: 0 }}>
            <li><a href="#">Resume (add link)</a></li>
            <li><a href="#">LinkedIn (add link)</a></li>
            <li><a href="#">GitHub (add link)</a></li>
          </ul>
        </div>
      </section>
    </>
  );
}