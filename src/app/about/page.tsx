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
              My name is Roengrit Thaingtham, but I go by <span style={{ fontWeight: 700 }}>Frank</span>. I’m graduating soon
              from the <span style={{ fontWeight: 700 }}>University of North Carolina at Chapel Hill</span> with a B.S. in{" "}
              <span style={{ fontWeight: 700 }}>Statistics & Analytics</span>.
            </p>

            <p className="p" style={{ marginBottom: 12 }}>
              I was born and raised in <span style={{ fontWeight: 700 }}>Thailand</span>, and I moved to the{" "}
              <span style={{ fontWeight: 700 }}>U.S.</span> around age 12. That dual perspective shaped how I see people, markets,
              and technology — what feels “normal” in one place isn’t always true somewhere else.
            </p>

            <p className="p" style={{ marginBottom: 12 }}>
              College challenged me in a way life never had before. I had to learn how to support myself financially, and I
              worked through some personal struggles along the way. I’m not perfect — I’ve made mistakes — but I’m a{" "}
              <span style={{ fontWeight: 700 }}>learner</span>, and I care about getting better.
            </p>

          </div>
        </div>
      </section>
      {/* 2) The Intersection (Niche) */}
      <section style={{ marginTop: 26 }}>
        <h2 className="h2">What I’m interested in</h2>

        <div className="card">
          <p className="p" style={{ margin: 0, maxWidth: "none" }}>
            I’m most interested in the intersection of{" "}
            <span style={{ fontWeight: 700 }}>analysis</span>,{" "}
            <span style={{ fontWeight: 700 }}>technology</span>, and{" "}
            <span style={{ fontWeight: 700 }}>finance</span>.
            Coming from a low-income background where my parents didn’t have much financial knowledge, learning personal
            finance was a turning point for me — it pulled me into finance and made me want to understand how money,
            incentives, and markets really work.
          </p>

          <p className="p" style={{ marginTop: 12, marginBottom: 0, maxWidth: "none" }}>
            Technology has also been a big part of my life. I grew up playing a lot of games, and over time I became more
            curious about what technology can enable — and how to build it. And because life is ultimately a series of
            decisions, I’m drawn to analytics as a way to think more clearly, reduce bias, and make better bets over time.
          </p>

          <p className="p" style={{ marginTop: 12, marginBottom: 0, maxWidth: "none" }}>
            I don’t know exactly where the wind will blow, but I do know this: I’ll keep adapting, learning, and not giving
            up.
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
                when: "2026",
                title: "Graduating — UNC–Chapel Hill (B.S. Statistics & Analytics)",
                desc: "Coursework includes Probability, Time Series, Regression, Data Analysis, and applied analytics projects. Building projects across analytics, finance, and software while preparing for analyst roles.",
              },
              {
                when: "2025",
                title: "Studied abroad — Yonsei University (Korea)",
                desc: "Lived and studied in Seoul, which expanded my perspective on culture, markets, and how technology shapes everyday life.",
              },
              {
                when: "2025",
                title: "Technology Analyst Intern — Parexel",
                desc: "Worked on technology-focused projects and learned how large organizations operate and deliver.",
              },
              {
                when: "2024",
                title: "Returned to Thailand + ordained as a monk (10 days)",
                desc: "Went back to Thailand for the first time in 10 years. The experience strengthened my discipline, reflection, and perspective on what matters.",
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
                desc: "Entered college exploring business and computer science, but early setbacks pushed me to re-evaluate. I found my fit in Statistics & Analytics — a path that matched how I think: structured, quantitative, and decision-focused.",
              },
              {
                when: "2022",
                title: "Graduated high school",
                desc: "Took the next step into college while continuing to work and support myself.",
              },
              {
                when: "2022",
                title: "State Farm Insurance Agent Office",
                desc: "Customer-facing work that improved communication, responsibility, and day-to-day professionalism.",
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
                title: "Moved from Thailand to the United States (Miami, FL)",
                desc: "Immigrated and began adapting to a new environment and culture — a turning point in how I view opportunity.",
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
                  gridTemplateColumns: "110px 1fr",
                  gap: 14,
                  alignItems: "start",
                }}
              >
                <div style={{ color: "var(--muted)", fontWeight: 700 }}>{x.when}</div>
                <div>
                  <div style={{ fontWeight: 800 }}>{x.title}</div>
                  <div style={{ color: "var(--muted)", marginTop: 4, lineHeight: 1.6 }}>
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