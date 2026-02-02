type Book = {
  title: string;
  author: string;
  status: "Reading" | "Next" | "Finished";
  note?: string;
  link?: string; // optional (Goodreads / Amazon / publisher)
};

const books: Book[] = [
  {
    title: "What Color Is Your Parachute?",
    author: "Richard N. Bolles",
    status: "Reading",
    note: "Career clarity + job-search strategy.",
  },
  {
    title: "One Up On Wall Street",
    author: "Peter Lynch",
    status: "Next",
    note: "How to think about finding great companies.",
  },
  {
    title: "The Little Book of Valuation",
    author: "Aswath Damodaran",
    status: "Finished",
    note: "Valuation frameworks + drivers.",
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