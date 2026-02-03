type Post = {
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  href?: string;
};

const posts: Post[] = [
  {
    title: "First post (placeholder)",
    date: "2026-02-02",
    summary: "What I’m building and how I’m thinking about this site.",
  },
  {
    title: "Learning log: Week 1 (placeholder)",
    date: "2026-02-02",
    summary: "What I learned this week and what I’m doing next.",
  },
  // Add more later...
];

function yearFromDate(date: string) {
  // date is YYYY-MM-DD
  return date.slice(0, 4);
}

export default function BlogPage() {
  // 1) sort newest -> oldest
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  // 2) group by year
  const grouped: Record<string, Post[]> = {};
  for (const p of sorted) {
    const y = yearFromDate(p.date);
    if (!grouped[y]) grouped[y] = [];
    grouped[y].push(p);
  }

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a)); // newest year first

  return (
    <>
      <h1 className="h1" style={{ fontSize: 36 }}>
        Blog
      </h1>
      <p className="p">Longer writing and reflections. (Next step: real posts with MDX.)</p>

      <div style={{ marginTop: 22, display: "grid", gap: 14 }}>
        {years.map((year) => (
          <div key={year} className="card">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "110px 1fr",
                gap: 14,
                alignItems: "start",
              }}
            >
              {/* Far-left: year */}
              <div style={{ color: "var(--muted)", fontWeight: 800, fontSize: 14 }}>
                {year}
              </div>

              {/* Right: all posts for that year */}
              <div style={{ display: "grid", gap: 12 }}>
                {grouped[year].map((p) => (
                  <div
                    key={`${p.date}-${p.title}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "110px 1fr",
                      gap: 14,
                      alignItems: "start",
                    }}
                  >
                    {/* Left inside year group: date */}
                    <div style={{ color: "var(--muted)", fontSize: 12, fontWeight: 700 }}>
                      {p.date}
                    </div>

                    {/* Right: title + summary */}
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.2 }}>
                        {p.href ? (
                          <a
                            href={p.href}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            {p.title}
                          </a>
                        ) : (
                          p.title
                        )}
                      </div>

                      <div style={{ marginTop: 6, color: "var(--muted)", lineHeight: 1.6 }}>
                        {p.summary}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}