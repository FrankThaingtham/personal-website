export default function AboutPage() {
  return (
    <>
      <h1 className="h1">About</h1>

      {/* 1) Narrative Intro (Story) */}
      <section style={{ marginTop: 18 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "clamp(120px, 18vw, 170px) 1fr",
            gap: 18,
            alignItems: "start",
          }}
        >
          {/* Headshot (small, left) */}
          <div
            style={{
              width: "clamp(120px, 18vw, 170px)",
              height: "clamp(190px, 26vw, 260px)",
              borderRadius: 18,
              border: "1px solid var(--border)",
              overflow: "hidden",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            {/* Put your headshot here: /public/headshot.webp (or .jpg) */}
            <img
              src="/headshot.webp"
              alt="Frank Thaingtham"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Story (right) */}
          <div>
            <p className="p" style={{ marginBottom: 12 }}>
              I’m driven by one question: <span style={{ fontWeight: 700 }}>why do some ideas win?</span> Whether it’s a
              company, a product, or a market move, I like tracing outcomes back to incentives, systems, and
              fundamentals.
            </p>

            <p className="p" style={{ marginBottom: 12 }}>
              I have a dual perspective between the <span style={{ fontWeight: 700 }}>U.S. and Thailand</span>, and that
              shapes how I think about global markets and technology — different consumer behaviors, different
              constraints, and different opportunities. It keeps me grounded: what looks “obvious” in one place isn’t
              always obvious in another.
            </p>

            <p className="p">
              This site is where I document what I’m learning and building — from valuation notes and market research
              to software projects — with the goal of becoming sharper at both analysis and execution.
            </p>
          </div>
        </div>
      </section>
      {/* 2) The Intersection (Niche) */}
      <section style={{ marginTop: 26 }}>
        <h2 className="h2">My niche</h2>

        <div className="card">
          <p className="p" style={{ margin: 0 }}>
            I’m most interested in the intersection of <span style={{ fontWeight: 700 }}>quantitative finance</span> and{" "}
            <span style={{ fontWeight: 700 }}>software engineering</span>. I don’t just want to code for the sake of coding —
            I want to build tools and systems that solve real problems: valuation workflows, research pipelines, decision
            dashboards, and optimization-style questions.
          </p>

          <p className="p" style={{ marginTop: 12, marginBottom: 0 }}>
            That means I care about both sides: <span style={{ fontWeight: 700 }}>clear reasoning</span> (assumptions,
            constraints, tradeoffs) and <span style={{ fontWeight: 700 }}>clean execution</span> (repeatable code, good
            interfaces, and fast iteration).
          </p>
        </div>
      </section>

      {/* 3) Tech & Finance Stack (Toolkit) */}
      <section style={{ marginTop: 26 }}>
        <h2 className="h2">Toolkit</h2>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
          }}
        >
          {/* Development */}
          <div className="card">
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Development</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["React", "Next.js", "TypeScript", "JavaScript", "Python"].map((t) => (
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

          {/* Finance / Math */}
          <div className="card">
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Finance / Math</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["DCF modeling", "Valuation", "Probability", "Time series (AR(1))", "Optimization intuition"].map((t) => (
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

          {/* Tools */}
          <div className="card">
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Tools</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["SQL", "R", "Google Sheets (advanced)", "Git/GitHub", "Cloudflare Pages"].map((t) => (
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
        </div>
      </section>

      {/* 4) Personal Interests (Human Factor) */}
      <section style={{ marginTop: 26 }}>
        <h2 className="h2">Outside of work</h2>

        <div className="card">
          <p className="p" style={{ marginTop: 0, marginBottom: 14 }}>
            Outside of projects, I like staying active, competing, and exploring new places — it keeps me disciplined and
            sharp.
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              "Gym",
              "Running",
              "Hiking",
              "Soccer",
              "Basketball",
              "Tennis",
              "Poker",
              "Reading",
              "Politics",
              "Traveling",
              "Exploring",
              "Socializing",
            ].map((t) => (
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
      </section>

      {/* 5) Timeline / Milestones */}
      <section style={{ marginTop: 26 }}>
        <h2 className="h2">Timeline</h2>

        <div className="card">
          <div style={{ display: "grid", gap: 14 }}>
            {[
              {
                when: "Now",
                title: "Building projects at the finance × software intersection",
                desc: "Documenting research, shipping portfolio work, and improving my valuation + engineering craft.",
              },
              {
                when: "2025",
                title: "Studied abroad in Korea",
                desc: "Gained a broader global perspective and sharpened my curiosity around markets and technology.",
              },
              {
                when: "Education",
                title: "B.S. in Statistics & Analytics (UNC)",
                desc: "Focused on quantitative thinking, probability, and data-driven decision making.",
              },
            ].map((x) => (
              <div
                key={x.when}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: 14,
                  alignItems: "start",
                }}
              >
                <div style={{ color: "var(--muted)", fontWeight: 700 }}>{x.when}</div>
                <div>
                  <div style={{ fontWeight: 800 }}>{x.title}</div>
                  <div style={{ color: "var(--muted)", marginTop: 4, lineHeight: 1.6 }}>{x.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}