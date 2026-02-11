export default function ContactPage() {
  return (
    <>
      <h1 className="h1" style={{ fontSize: 36 }}>Contact</h1>

      <p className="p">
        Best way to reach me is email. I’m also on LinkedIn, GitHub, and Instagram.
      </p>

      <div className="card" style={{ marginTop: 18, maxWidth: 760 }}>
        <p style={{ margin: "0 0 10px" }}>
          <strong>Email:</strong>{" "}
          <a href="mailto:frankthaingtham@gmail.com">frankthaingtham@gmail.com</a>
        </p>

        <p style={{ margin: "0 0 10px" }}>
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/frankthaingtham"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/frankthaingtham
          </a>
        </p>

        <p style={{ margin: "0 0 10px" }}>
          <strong>GitHub:</strong>{" "}
          <a
            href="https://github.com/frankthaingtham"
            target="_blank"
            rel="noreferrer"
          >
            github.com/frankthaingtham
          </a>
        </p>

        <p style={{ margin: "0 0 10px" }}>
          <strong>Instagram (main):</strong>{" "}
          <a
            href="https://www.instagram.com/frankthaingthams"
            target="_blank"
            rel="noreferrer"
          >
            @frankthaingthams
          </a>
        </p>

        <p style={{ margin: 0 }}>
          <strong>Instagram (spam):</strong>{" "}
          <a
            href="https://www.instagram.com/letmebefrankt"
            target="_blank"
            rel="noreferrer"
          >
            @letmefrankt
          </a>
        </p>
      </div>
    </>
  );
}