export default function AboutPage() {
  return (
    <>
      <h1 className="h1">About</h1>

      <section style={{ marginTop: 24 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "clamp(140px, 20vw, 180px) 1fr",
            gap: 28,
            alignItems: "start",
          }}
        >
          <div
            style={{
              width: "clamp(140px, 20vw, 180px)",
              aspectRatio: "3 / 4",
              borderRadius: 16,
              border: "1px solid var(--border)",
              overflow: "hidden",
              background: "var(--card-bg)",
            }}
          >
            <img
              src="/headshot.webp"
              alt="Frank Thaingtham"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <div>
            <p className="p" style={{ marginBottom: 14 }}>
              My name is Roengrit Thaingtham, but I go by <span style={{ fontWeight: 600 }}>Frank</span>. I&apos;m graduating soon
              from the <span style={{ fontWeight: 600 }}>University of North Carolina at Chapel Hill</span> with a B.S. in{" "}
              <span style={{ fontWeight: 600 }}>Statistics &amp; Analytics</span>.
            </p>

            <p className="p" style={{ marginBottom: 14 }}>
              I was born and raised in <span style={{ fontWeight: 600 }}>Thailand</span>, and I moved to the{" "}
              <span style={{ fontWeight: 600 }}>U.S.</span> around age 12. That dual perspective shaped how I see people, markets,
              and technology — what feels &quot;normal&quot; in one place isn&apos;t always true somewhere else.
            </p>

            <p className="p" style={{ marginBottom: 0 }}>
              College challenged me in a way life never had before. I had to learn how to support myself financially, and I
              worked through some personal struggles along the way. I&apos;m not perfect — I&apos;ve made mistakes — but I&apos;m a{" "}
              <span style={{ fontWeight: 600 }}>learner</span>, and I care about getting better.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section>
        <h2 className="h2">What I&apos;m interested in</h2>

        <div className="card">
          <p className="p" style={{ margin: 0, maxWidth: "none" }}>
            I&apos;m most interested in the intersection of{" "}
            <span style={{ fontWeight: 600 }}>analysis</span>,{" "}
            <span style={{ fontWeight: 600 }}>technology</span>, and{" "}
            <span style={{ fontWeight: 600 }}>finance</span>.
            Coming from a low-income background where my parents didn&apos;t have much financial knowledge, learning personal
            finance was a turning point for me — it pulled me into finance and made me want to understand how money,
            incentives, and markets really work.
          </p>

          <p className="p" style={{ marginTop: 14, marginBottom: 0, maxWidth: "none" }}>
            Technology has also been a big part of my life. I grew up playing a lot of games, and over time I became more
            curious about what technology can enable — and how to build it. And because life is ultimately a series of
            decisions, I&apos;m drawn to analytics as a way to think more clearly, reduce bias, and make better bets over time.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <section>
        <h2 className="h2">Toolkit</h2>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          <div className="card">
            <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 15 }}>Development</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["React", "Next.js", "TypeScript", "JavaScript", "Python"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 15 }}>Finance / Math</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["DCF modeling", "Valuation", "Probability", "Time series", "Optimization"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 15 }}>Tools</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["SQL", "R", "Google Sheets", "Git/GitHub", "Cloudflare Pages"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section>
        <h2 className="h2">Outside of work</h2>

        <div className="card">
          <p className="p" style={{ marginTop: 0, marginBottom: 16 }}>
            Outside of projects, I like staying active, competing, and exploring new places — it keeps me disciplined and sharp.
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              "Gym",
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
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section>
        <h2 className="h2">Timeline</h2>

        <div className="card">
          <div style={{ display: "grid", gap: 16 }}>
            {[
              {
                when: "2026",
                title: "Graduating — UNC–Chapel Hill (B.S. Statistics & Analytics)",
                desc: "Coursework includes Probability, Time Series, Regression, Data Analysis, and applied analytics projects.",
              },
              {
                when: "2025",
                title: "Studied abroad — Yonsei University (Korea)",
                desc: "Lived and studied in Seoul, expanding my perspective on culture, markets, and technology.",
              },
              {
                when: "2025",
                title: "Technology Analyst Intern — Parexel",
                desc: "Worked on technology-focused projects and learned how large organizations operate.",
              },
              {
                when: "2024",
                title: "Returned to Thailand + ordained as a monk (10 days)",
                desc: "Went back to Thailand for the first time in 10 years. The experience strengthened my discipline and perspective.",
              },
              {
                when: "2023",
                title: "Registration Services Assistant",
                desc: "First college job — learned how to work in structured processes and handle details consistently.",
              },
              {
                when: "2023",
                title: "IT Support Technician",
                desc: "Started IT support work — troubleshooting, reliability, and learning to stay calm under pressure.",
              },
              {
                when: "2022",
                title: "Started at UNC–Chapel Hill",
                desc: "Found my fit in Statistics & Analytics — a path that matched how I think: structured, quantitative, and decision-focused.",
              },
              {
                when: "2022",
                title: "Graduated high school",
                desc: "Took the next step into college while continuing to work and support myself.",
              },
              {
                when: "2021",
                title: "Movie Theater Attendant",
                desc: "Fast-paced service work — teamwork, reliability, and showing up consistently.",
              },
              {
                when: "2021",
                title: "Sushi chef",
                desc: "Learned speed, precision, and standards — small details matter.",
              },
              {
                when: "2020",
                title: "Online Grocery Pickup",
                desc: "Started working during COVID — learned discipline, pace, and responsibility early.",
              },
              {
                when: "2015",
                title: "Moved to Burlington, North Carolina",
                desc: "Settled in NC around fifth grade and built my foundation there.",
              },
              {
                when: "2013",
                title: "Moved from Thailand to the United States",
                desc: "Immigrated and began adapting to a new environment and culture.",
              },
              {
                when: "2003",
                title: "Born in Chiang Rai, Thailand",
                desc: "My roots — still a major part of how I see the world.",
              },
            ].map((x) => (
              <div
                key={`${x.when}-${x.title}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: 16,
                  alignItems: "start",
                }}
              >
                <div style={{ color: "var(--muted)", fontWeight: 600, fontSize: 14 }}>{x.when}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{x.title}</div>
                  <div style={{ color: "var(--muted)", marginTop: 4, lineHeight: 1.6, fontSize: 14 }}>
                    {x.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
