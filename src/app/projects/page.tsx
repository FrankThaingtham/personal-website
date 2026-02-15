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
      "Built an AI chatbot for my personal website that answers questions about my background, projects, and experience. Uses OpenAI's Assistants API with file search (RAG) to query a knowledge base of my resume, projects, and blog posts. Adapts tone based on visitor type (recruiter vs casual).",
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
    title: "Website Onboarding + Supabase Analytics — Visitor Intelligence",
    description:
      "Implemented a 3-phase analytics system for my portfolio site: (1) onboarding modal to capture visitor intent, (2) Supabase database with event tracking and conversion funnels, (3) analytics dashboard with role segmentation and engagement metrics. Tracks everything from first visit through chat interactions.",
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
      "Built and deployed my personal website with a blog workflow so I can publish posts from the web. Includes a clean Next.js frontend, a Keystatic admin panel, and Cloudflare Pages hosting + domain setup.",
    tags: [
      "Next.js",
      "TypeScript",
      "Keystatic",
      "Cloudflare Pages",
      "GitHub",
      "Google Analytics (GA4)",
    ],
    href: "https://github.com/FrankThaingtham/personal-website",
  },
  {
    title: "Financial / Valuation Analytics Dashboard — SQL → Power BI",
    description:
      "Built an end-to-end analytics pipeline that turns annual financial statement inputs + valuation assumptions into cleaned Postgres tables, KPI SQL views, and a Power BI dashboard with comps + DCF scenario valuation outputs (Base/Bull/Bear).",
    tags: ["Postgres", "SQL", "Power BI", "DCF", "Data Modeling", "Analytics"],
    href: "https://github.com/FrankThaingtham/financial-valuation-dashboard",
  },
  {
    title: "Triangle Sports Analytics Competition — ACC Point Spread Model",
    description:
      "Built a statistical model to predict ACC men’s basketball point spreads for the Triangle Sports Analytics Competition (Feb–Mar 2026). Focused on building a repeatable pipeline: data prep → features → model → predictions.",
    tags: ["Python", "Pandas", "scikit-learn", "Jupyter", "Sports Analytics"],
    href: "https://github.com/FrankThaingtham/triangle-acc-spread-model/tree/main",
  },

  // ✅ Job Tracker (added, same format)
  {
    title: "Job Tracker — Next.js App",
    description:
      "Bootstrapped a Next.js app (create-next-app) as the foundation for a job search tracking tool.",
    tags: ["Next.js", "TypeScript", "App Router", "ESLint", "create-next-app"],
    href: "https://github.com/FrankThaingtham/job-tracker",
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

            {/* Extra detail only for the Portfolio Chatbot project */}
            {p.title.includes("Portfolio Chatbot") ? (
              <ul
                style={{
                  margin: "0 0 12px 18px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                <li>
                  <strong>AI Architecture:</strong> OpenAI Assistants API with
                  file_search tool, vector store with 6 knowledge base files
                  (about, projects, roles, FAQ, blog excerpts, voice examples).
                </li>
                <li>
                  <strong>Adaptive Voice:</strong> Two response modes
                  (recruiter: professional/concise, casual:
                  friendly/conversational) based on onboarding data.
                </li>
                <li>
                  <strong>Smart Features:</strong> Confidence scoring
                  (high/medium/low), next-action buttons (View Projects, Resume,
                  Contact), fallback to phone contact for low-confidence
                  responses.
                </li>
                <li>
                  <strong>Persistence:</strong> Chat sessions and message
                  history stored in Supabase, conversation context limited to
                  last 12 messages for cost efficiency.
                </li>
              </ul>
            ) : null}

            {/* Extra detail only for the Analytics project */}
            {p.title.includes("Website Onboarding + Supabase Analytics") ? (
              <ul
                style={{
                  margin: "0 0 12px 18px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                <li>
                  <strong>Onboarding Flow:</strong> Modal captures visitor role
                  (recruiter/collaborator/browsing), goal, and referral source.
                  Data persists to Supabase + localStorage for dual reliability.
                </li>
                <li>
                  <strong>Data Model:</strong> Postgres schema with visitors,
                  preferences, events, chat_sessions, and chat_messages tables.
                  Includes SQL views for conversion funnels and engagement
                  metrics.
                </li>
                <li>
                  <strong>Analytics Dashboard:</strong> Protected route
                  (/dashboard) showing 7-day metrics: visitor count, onboarding
                  completion rate, conversion funnels by role, chat engagement,
                  and event tracking.
                </li>
                <li>
                  <strong>Event Tracking:</strong> Captures
                  onboarding_completed, resume_clicked, contact_clicked,
                  chat_opened, chat_message_sent, and more. All timestamped with
                  visitor_id for cohort analysis.
                </li>
              </ul>
            ) : null}

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
                <li>
                  <strong>Analytics:</strong> Integrated Google Analytics (GA4)
                  to measure traffic and engagement.
                </li>
              </ul>
            ) : null}

            {/* Extra detail only for the Financial/Valuation Dashboard project */}
            {p.title.includes("Financial / Valuation Analytics Dashboard") ? (
              <ul
                style={{
                  margin: "0 0 12px 18px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                <li>
                  <strong>Data model:</strong> Postgres dim/fact tables + staging
                  loads for annual financials and scenario assumptions.
                </li>
                <li>
                  <strong>KPI layer:</strong> SQL views (e.g., YoY revenue growth,
                  FCF margin, latest-year comps) + basic data quality checks.
                </li>
                <li>
                  <strong>Valuation:</strong> 5-year DCF with Base/Bull/Bear
                  scenarios and intrinsic value per share written back to Postgres
                  for Power BI consumption.
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

            {/* ✅ Extra detail only for the Job Tracker project */}
            {p.title.includes("Job Tracker") ? (
              <ul
                style={{
                  margin: "0 0 12px 18px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                <li>
                  <strong>Foundation:</strong> Next.js project bootstrapped with
                  create-next-app; edit entrypoint via <code>app/page.tsx</code>.
                </li>
                <li>
                  <strong>Structure:</strong> App Router setup under{" "}
                  <code>src/app</code> with standard Next.js config files
                  (e.g., <code>next.config.ts</code>, <code>tsconfig.json</code>).
                </li>
                <li>
                  <strong>Dev workflow:</strong> Local dev server via{" "}
                  <code>npm run dev</code> with fast iteration and auto-reload.
                </li>
                <li>
                  <strong>Code quality:</strong> ESLint configured to enforce
                  consistent standards as the project grows.
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