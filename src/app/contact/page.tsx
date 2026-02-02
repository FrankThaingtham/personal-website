export default function ContactPage() {
  return (
    <>
      <h1 className="h1" style={{ fontSize: 36 }}>Contact</h1>

      <p className="p">
        Best way to reach me is email. I’m also on LinkedIn and GitHub.
      </p>

      <div className="card" style={{ marginTop: 18, maxWidth: 760 }}>
        <p style={{ margin: "0 0 10px" }}>
          <strong>Email:</strong>{" "}
          <a href="mailto:frank@example.com">frank@example.com</a>
        </p>

        <p style={{ margin: "0 0 10px" }}>
          <strong>LinkedIn:</strong>{" "}
          <a href="#" target="_blank" rel="noreferrer">
            add link
          </a>
        </p>

        <p style={{ margin: 0 }}>
          <strong>GitHub:</strong>{" "}
          <a href="#" target="_blank" rel="noreferrer">
            add link
          </a>
        </p>
      </div>
    </>
  );
}