type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

const projects: Project[] = [
  {
    title: "Portfolio Chatbot — AI Assistant with RAG",
    description:
      "Built an AI chatbot for my personal website that answers questions about my background, projects, and experience. Uses OpenAI's Assistants API with file search (RAG) to query a knowledge base of my resume, projects, and blog posts.",
    tags: [
      "OpenAI Assistants API",
      "RAG (Vector Store)",
      "Next.js API Routes",
      "TypeScript",
      "Supabase",
      "Edge Runtime",
    ],
    href: "https://github.com/FrankThaingtham/personal-website",
  },
  {
    title: "Website Onboarding + Supabase Analytics",
    description:
      "Implemented a 3-phase analytics system: onboarding modal to capture visitor intent, Supabase database with event tracking and conversion funnels, analytics dashboard with role segmentation.",
    tags: [
      "Supabase (Postgres)",
      "Next.js",
      "TypeScript",
      "Analytics Engineering",
      "Conversion Funnels",
      "SQL Views",
    ],
    href: "https://github.com/FrankThaingtham/personal-website",
  },
  {
    title: "FrankThaingtham.com — Personal Site + Blog CMS",
    description:
      "Built and deployed my personal website with a blog workflow. Includes a clean Next.js frontend, a Keystatic admin panel, and Cloudflare Pages hosting.",
    tags: [
      "Next.js",
      "TypeScript",
      "Keystatic",
      "Cloudflare Pages",
      "Google Analytics (GA4)",
    ],
    href: "https://github.com/FrankThaingtham/personal-website",
  },
  {
    title: "Financial / Valuation Analytics Dashboard",
    description:
      "Built an end-to-end analytics pipeline that turns annual financial statement inputs into cleaned Postgres tables, KPI SQL views, and a Power BI dashboard with DCF scenario outputs.",
    tags: ["Postgres", "SQL", "Power BI", "DCF", "Data Modeling", "Analytics"],
    href: "https://github.com/FrankThaingtham/financial-valuation-dashboard",
  },
  {
    title: "Industry Research + Valuation Consensus Engine",
    description:
      "Building a multi-agent research system that produces industry briefs, screens companies, and generates valuation memos (Bull/Base/Bear) with full traceability.",
    tags: [
      "AWS Lambda",
      "API Gateway",
      "S3",
      "DynamoDB",
      "Multi-Agent",
      "Claude API",
    ],
  },
  {
    title: "Triangle Sports Analytics Competition",
    description:
      "Built a statistical model to predict ACC men's basketball point spreads for the Triangle Sports Analytics Competition. Focused on building a repeatable pipeline: data prep → features → model → predictions.",
    tags: ["Python", "Pandas", "scikit-learn", "Jupyter", "Sports Analytics"],
    href: "https://github.com/FrankThaingtham/triangle-acc-spread-model/tree/main",
  },
  {
    title: "Job Tracker — Next.js App",
    description:
      "Bootstrapped a Next.js app as the foundation for a job search tracking tool.",
    tags: ["Next.js", "TypeScript", "App Router", "ESLint"],
    href: "https://github.com/FrankThaingtham/job-tracker",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <h1 className="h1" style={{ fontSize: 40 }}>Projects</h1>
      <p className="p">
        A few things I&apos;ve built. I&apos;ll keep adding projects as I ship them.
      </p>

      <div className="grid" style={{ marginTop: 28 }}>
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
                    fontSize: 17,
                    margin: 0,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {p.title}
                </a>
              ) : (
                <h2 style={{ fontSize: 17, margin: 0, fontWeight: 600 }}>
                  {p.title}
                </h2>
              )}

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {!p.href && (
                  <span className="tag" style={{ margin: 0 }}>WIP</span>
                )}
                {p.href && (
                  <a href={p.href} target="_blank" rel="noreferrer" className="btn" style={{ padding: "6px 12px", fontSize: 12 }}>
                    View →
                  </a>
                )}
              </div>
            </div>

            <p style={{ margin: "12px 0 14px", color: "var(--muted)", lineHeight: 1.65, fontSize: 14 }}>
              {p.description}
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
