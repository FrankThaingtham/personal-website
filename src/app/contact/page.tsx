export default function ContactPage() {
  return (
    <>
      <h1 className="h1" style={{ fontSize: 40 }}>Contact</h1>

      <p className="p">
        Best way to reach me is email. I&apos;m also on LinkedIn, GitHub, and Instagram.
      </p>

      <div className="card" style={{ marginTop: 24, maxWidth: 560 }}>
        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 600, width: 80, fontSize: 14 }}>Email:</span>
            <a href="mailto:frankthaingtham@gmail.com">frankthaingtham@gmail.com</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 600, width: 80, fontSize: 14 }}>LinkedIn:</span>
            <a href="https://www.linkedin.com/in/frankthaingtham" target="_blank" rel="noreferrer">
              linkedin.com/in/frankthaingtham
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 600, width: 80, fontSize: 14 }}>GitHub:</span>
            <a href="https://github.com/frankthaingtham" target="_blank" rel="noreferrer">
              github.com/frankthaingtham
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 600, width: 80, fontSize: 14 }}>Instagram:</span>
            <a href="https://www.instagram.com/frankthaingthams" target="_blank" rel="noreferrer">
              @frankthaingthams
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
