type ResearchItem = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  href?: string;
};

const research: ResearchItem[] = [
  {
    title: "Valuation template (placeholder)",
    date: "2026-02-02",
    summary: "DCF + scenarios + key drivers. (We'll turn this into a repeatable format.)",
    tags: ["DCF", "Scenarios", "Assumptions"],
  },
  {
    title: "Research note (placeholder)",
    date: "2026-02-02",
    summary: "Industry / business model notes and what I'm watching.",
    tags: ["Industry", "Moat", "Risks"],
  },
];

export default function ResearchPage() {
  return (
    <>
      <h1 className="h1" style={{ fontSize: 40 }}>Research</h1>
      <p className="p">
        Valuations, models, and research notes. This is for learning and showcasing my process.
      </p>

      <div className="grid" style={{ marginTop: 28 }}>
        {research.map((r) => (
          <div key={r.title} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
              <h2 style={{ fontSize: 17, margin: 0, fontWeight: 600 }}>
                {r.href ? <a href={r.href} style={{ textDecoration: "none" }}>{r.title}</a> : r.title}
              </h2>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{r.date}</span>
            </div>

            <p style={{ margin: "12px 0 14px", color: "var(--muted)", lineHeight: 1.65, fontSize: 14 }}>
              {r.summary}
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {r.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <p style={{ marginTop: 14, color: "var(--muted)", fontSize: 12 }}>
              Note: Personal research for learning — not investment advice.
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
