type Post = {
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  href?: string; // later we’ll link to real posts
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
];

export default function BlogPage() {
  return (
    <>
      <h1 style={{ fontSize: 36, margin: "0 0 10px" }}>Blog</h1>
      <p style={{ lineHeight: 1.7, maxWidth: 760, color: "var(--muted)" }}>
        Longer writing and reflections. (Next step: real posts with MDX.)
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 22 }}>
        {posts.map((p) => (
          <div
            key={p.title}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 18, margin: 0 }}>
                {p.href ? <a href={p.href} style={{ textDecoration: "none" }}>{p.title}</a> : p.title}
              </h2>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>{p.date}</span>
            </div>

            <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.6 }}>
              {p.summary}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}