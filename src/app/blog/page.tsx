import { getAllPosts } from "@/lib/posts";

function yearFromDate(date: string) {
  return date.slice(0, 4);
}

function monthDay(date: string) {
  return date.slice(5); // YYYY-MM-DD -> MM-DD
}

export default function BlogPage() {
  const posts = getAllPosts(); // [{ slug, title, date, summary }...]

  // group by year
  const grouped: Record<string, typeof posts> = {};
  for (const p of posts) {
    const y = yearFromDate(p.date);
    (grouped[y] ||= []).push(p);
  }

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <>
      <h1 className="h1" style={{ fontSize: 36 }}>
        Blog
      </h1>
      <p className="p">Writing, learning logs, and thoughts.</p>

      {posts.length === 0 ? (
        <div className="card" style={{ marginTop: 18 }}>
          <p className="p" style={{ margin: 0 }}>
            No posts yet. Create one in{" "}
            <a href="/keystatic" style={{ color: "var(--accent)" }}>
              Keystatic
            </a>
            .
          </p>
        </div>
      ) : (
        <div style={{ marginTop: 22, display: "grid", gap: 22 }}>
          {years.map((year) => (
            <section key={year} className="card">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr",
                  gap: 18,
                  alignItems: "start",
                }}
              >
                {/* Far-left: year */}
                <div style={{ color: "var(--muted)", fontWeight: 900, fontSize: 14 }}>
                  {year}
                </div>

                {/* Right: posts for that year */}
                <div style={{ display: "grid" }}>
                  {grouped[year].map((p, idx) => (
                    <div
                      key={p.slug}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "70px 1fr",
                        gap: 16,
                        padding: idx === 0 ? 0 : "14px 0 0",
                        marginTop: idx === 0 ? 0 : 14,
                        borderTop: idx === 0 ? "none" : "1px solid var(--border)",
                        alignItems: "start",
                      }}
                    >
                      {/* Date within year group */}
                      <div style={{ color: "var(--muted)", fontSize: 12, fontWeight: 800 }}>
                        {monthDay(p.date)}
                      </div>

                      {/* Title + summary */}
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.2 }}>
                          <a
                            href={`/blog/${p.slug}`}
                            style={{
                              color: "var(--accent)", // ✅ accent color
                              textDecoration: "underline",
                              textUnderlineOffset: 3,
                              textDecorationThickness: "from-font",
                            }}
                          >
                            {p.title}
                          </a>
                        </div>

                        <div style={{ marginTop: 6, color: "var(--muted)", lineHeight: 1.6 }}>
                          {p.summary}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}