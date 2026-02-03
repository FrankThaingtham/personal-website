type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

const projects: Project[] = [
  {
    title: "Triangle Sports Analytics Competition — ACC Point Spread Model",
    description: "Built a statistical model to predict ACC men’s basketball point spreads for the Triangle Sports Analytics Competition (Feb–Mar 2026). Focused on building a repeatable pipeline: data prep → features → model → predictions.",
    tags: ["Python", "Pandas", "Sports Analytics", "Modeling", "Prediction"],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <h1 className="h1" style={{ fontSize: 36 }}>Projects</h1>
      <p className="p">A few things I’ve built. I’ll keep adding projects as I ship them.</p>

      <div className="grid" style={{ marginTop: 22 }}>
        {projects.map((p) => (
          <div key={p.title} className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <h2 style={{ fontSize: 18, margin: 0 }}>{p.title}</h2>
              {p.href ? <a href={p.href}>View →</a> : null}
            </div>

            <p style={{ margin: "10px 0 12px", color: "var(--muted)", lineHeight: 1.6 }}>
              {p.description}
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.tags.map((t) => (
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
          </div>
        ))}
      </div>
    </>
  );
}