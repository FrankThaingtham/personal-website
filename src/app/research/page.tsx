type ResearchItem = {
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  href?: string; // later: link to full writeup page
};

const research: ResearchItem[] = [
  {
    title: "Valuation template (placeholder)",
    date: "2026-02-02",
    summary: "DCF + scenarios + key drivers. (We’ll turn this into a repeatable format.)",
    tags: ["DCF", "Scenarios", "Assumptions"],
  },
  {
    title: "Research note (placeholder)",
    date: "2026-02-02",
    summary: "Industry / business model notes and what I’m watching.",
    tags: ["Industry", "Moat", "Risks"],
  },
];

export default function ResearchPage() {
  return (
    <>
      <h1 className="h1" style={{ fontSize: 36 }}>Research</h1>
      <p className="p">
        Valuations, models, and research notes. This is for learning and showcasing my process.
      </p>

      <div className="grid" style={{ marginTop: 22 }}>
        {research.map((r) => (
          <div key={r.title} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 18, margin: 0 }}>
                {r.href ? <a href={r.href} style={{ textDecoration: "none" }}>{r.title}</a> : r.title}
              </h2>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>{r.date}</span>
            </div>

            <p style={{ margin: "10px 0 12px", color: "var(--muted)", lineHeight: 1.6 }}>
              {r.summary}
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {r.tags.map((t) => (
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

            <p style={{ marginTop: 12, color: "var(--muted)", fontSize: 12 }}>
              Note: Personal research for learning — not investment advice.
            </p>
          </div>
        ))}
      </div>
    </>
  );
}