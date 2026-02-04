type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

const projects: Project[] = [
  {
    title: "FrankThaingtham.com — Personal Site + Blog CMS",
    description:
      "Built and deployed my personal website with a blog workflow so I can publish posts from the web. Includes a clean Next.js frontend, a Keystatic admin panel, and Cloudflare Pages hosting + domain setup.",
    tags: ["Next.js", "TypeScript", "Keystatic", "Cloudflare Pages", "GitHub"],
    href: "https://github.com/FrankThaingtham/personal-website",
  },
  {
    title: "Triangle Sports Analytics Competition — ACC Point Spread Model",
    description:
      "Built a statistical model to predict ACC men’s basketball point spreads for the Triangle Sports Analytics Competition (Feb–Mar 2026). Focused on building a repeatable pipeline: data prep → features → model → predictions.",
    tags: ["Python", "Pandas", "scikit-learn", "Jupyter", "Sports Analytics"],
    href: "https://github.com/FrankThaingtham/triangle-acc-spread-model/tree/main",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <h1 className="h1" style={{ fontSize: 36 }}>
        Projects
      </h1>
      <p className="p">
        A few things I’ve built. I’ll keep adding projects as I ship them.
      </p>

      <div className="grid" style={{ marginTop: 22 }}>
        {projects.map((p) => (
          <div key={p.title} className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "baseline",
              }}
            >
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: 18,
                    margin: 0,
                    fontWeight: 700,
                    color: "var(--accent, #2563eb)",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  {p.title}
                </a>
              ) : (
                <h2
                  style={{
                    fontSize: 18,
                    margin: 0,
                    fontWeight: 700,
                    color: "var(--accent, #2563eb)",
                  }}
                >
                  {p.title}
                </h2>
              )}

              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--muted)", textDecoration: "none" }}
                >
                  View →
                </a>
              ) : null}
            </div>

            <p
              style={{
                margin: "10px 0 12px",
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              {p.description}
            </p>

            {/* Extra detail only for the website project */}
            {p.title.includes("FrankThaingtham.com") ? (
              <ul
                style={{
                  margin: "0 0 12px 18px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                <li>
                  <strong>Frontend:</strong> Next.js + TypeScript pages (about,
                  projects, reading, blog).
                </li>
                <li>
                  <strong>Blog workflow:</strong> Keystatic admin panel to
                  create/edit posts via GitHub.
                </li>
                <li>
                  <strong>Infra:</strong> Cloudflare Pages deploys + domain +
                  DNS + Access protection for /keystatic.
                </li>
              </ul>
            ) : null}

            {/* Extra detail only for the Triangle Sports Analytics project */}
            {p.title.includes("Triangle Sports Analytics Competition") ? (
              <ul
                style={{
                  margin: "0 0 12px 18px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                <li>
                  <strong>Data + tooling:</strong> Python + Pandas (CSV pipelines
                  across 2023–2026 seasons), Jupyter notebooks.
                </li>
                <li>
                  <strong>Modeling:</strong> scikit-learn regression experiments
                  (linear/regularized + tree/ensemble) with holdout evaluation.
                </li>
                <li>
                  <strong>Outputs:</strong> saved models (.joblib) + 2026
                  prediction CSVs (optionally with intervals / uncertainty).
                </li>
              </ul>
            ) : null}

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