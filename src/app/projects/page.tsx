type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string; // optional link (GitHub / live demo)
};

const projects: Project[] = [
  {
    title: "Project 1 (placeholder)",
    description: "One sentence about what this is and what you built/learned.",
    tags: ["Python", "SQL", "Dashboard"],
  },
  {
    title: "Project 2 (placeholder)",
    description: "One sentence about what problem it solves and your contribution.",
    tags: ["Finance", "DCF", "Modeling"],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <h1 style={{ fontSize: 36, margin: "0 0 10px" }}>Projects</h1>
      <p style={{ lineHeight: 1.7, maxWidth: 760, color: "var(--muted)" }}>
        A few things I’ve built. I’ll keep adding projects as I ship them.
      </p>

      <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
        {projects.map((p) => (
          <div
            key={p.title}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 18, margin: 0 }}>{p.title}</h2>
              {p.href ? (
                <a href={p.href} style={{ textDecoration: "none" }}>
                  View →
                </a>
              ) : null}
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