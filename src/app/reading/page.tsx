type Book = {
  title: string;
  author: string;
  status: "Reading" | "Next" | "Finished";
  note?: string;
  link?: string; // optional (Goodreads / Amazon / publisher)
};

const books: Book[] = [
   {
    title: "The Untethered Soul: The Journey Beyond Yourself",
    author: "Michael A. Singer",
    status: "Finished",
    note: "Mindfulness, awareness, and letting go.",
  },
  {
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    status: "Finished",
    note: "Self-sabotage → self-mastery; emotional growth.",
  },
  {
    title: "Attached: The New Science of Adult Attachment and How It Can Help You Find—and Keep—Love",
    author: "Amir Levine; Rachel Heller",
    status: "Finished",
    note: "Attachment styles + relationship patterns.",
  },
   {
    title: "The Little Book of Valuation",
    author: "Aswath Damodaran",
    status: "Reading",
    note: "Valuation frameworks + drivers.",
  },

  {
    title: "Crucial Conversations: Tools for Talking When Stakes Are High (Third Edition)",
    author: "Joseph Grenny; Kerry Patterson; Ron McMillan; Al Switzler; Emily Gregory",
    status: "Reading",
    note: "Communication under pressure; high-stakes conversations.",
  },
];

function StatusPill({ status }: { status: Book["status"] }) {
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

export default function ReadingPage() {
  return (
    <>
      <h1 className="h1" style={{ fontSize: 36 }}>Reading</h1>
      <p className="p">
        Books I’m reading (and notes that stick). I’ll keep this updated as I learn.
      </p>

      <div className="grid" style={{ marginTop: 22 }}>
        {books.map((b) => (
          <div key={`${b.title}-${b.author}`} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 18, margin: 0 }}>
                {b.link ? (
                  <a href={b.link} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
                    {b.title}
                  </a>
                ) : (
                  b.title
                )}
              </h2>
              <StatusPill status={b.status} />
            </div>

            <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>{b.author}</p>

            {b.note ? (
              <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.6 }}>
                {b.note}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}