type Item = {
  title: string;
  note: string;
  status: "Now" | "Next" | "Later";
};

const items: Item[] = [
  { title: "Next.js + Cloudflare Pages", note: "Building and deploying my personal site.", status: "Now" },
  { title: "Portfolio projects", note: "Shipping analyst-style projects (finance + data).", status: "Now" },
  { title: "Blog system (MDX)", note: "Add real blog posts with a clean structure.", status: "Next" },
  { title: "Research/valuation templates", note: "Standardize writeups and assumptions.", status: "Next" },
  { title: "Portfolio/performance page", note: "Process-focused, not just gains.", status: "Later" },
];

function StatusPill({ status }: { status: Item["status"] }) {
  return (
    <span
      style={{
        border: "1px solid var(--border)",
        borderRadius: 999,
        padding: "4px 10px",
        fontSize: 12,
        color: "var(--muted)",
      }}
    >
      {status}
    </span>
  );
}

export default function LearnPage() {
  return (
    <>
      <h1 style={{ fontSize: 36, margin: "0 0 10px" }}>Learn</h1>
      <p style={{ lineHeight: 1.7, maxWidth: 760, color: "var(--muted)" }}>
        A lightweight learning log — what I’m working on and what’s next.
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 22 }}>
        {items.map((it) => (
          <div
            key={it.title}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 18, margin: 0 }}>{it.title}</h2>
              <StatusPill status={it.status} />
            </div>

            <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.6 }}>
              {it.note}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}