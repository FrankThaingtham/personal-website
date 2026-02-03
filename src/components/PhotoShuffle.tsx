"use client";

import { useMemo, useState } from "react";

type Photo = {
  src: string;   // put images in /public/photos
  alt: string;
  href?: string; // optional: click goes somewhere (otherwise opens image)
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandomN<T>(arr: T[], n: number) {
  return shuffle(arr).slice(0, n);
}

export default function PhotoShuffle() {
  // ✅ “Photo vault” — add as many as you want here (10, 20, 50…)
  // Put the actual files in: /public/photos/ (example: /public/photos/01.jpg)
  const vault: Photo[] = useMemo(
    () => 
        Array.from({ length: 50 }, (_, i) => {
            const n = String(i + 1).padStart(2, "0"); // "01"..."50"
            return { src: `/photos/${n}.webp`, alt: `Photo ${i + 1}` };
        }),
    []
  );

  const [tiles, setTiles] = useState<Photo[]>(() => pickRandomN(vault, 5));

  return (
    <section style={{ marginTop: 34 }}>
      {/* FULL-BLEED wrapper (stretches edge-to-edge) */}
      <div
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          padding: "0 18px",
        }}
      >
        {/* 5 fixed square tiles spread across the whole viewport */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 18,
          }}
        >
          {tiles.map((p, idx) => {
            const clickable = p.href ?? p.src;

            return (
              <a
                key={p.src}
                href={clickable}
                target={p.href ? "_blank" : undefined}
                rel={p.href ? "noreferrer" : undefined}
                style={{ textDecoration: "none", flex: "0 0 auto" }}
                aria-label={`Open ${p.alt}`}
                title={p.alt}
              >
                <div
                  style={{
                    width: "clamp(200px, 15vw, 280px)",
                    aspectRatio: "1 / 1",
                    borderRadius: 18,
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.02)",

                    /* alternate tilt left/right */
                    transform: `rotate(${idx % 2 === 0 ? -2 : 2}deg)`,
                    transition: "transform 180ms ease, box-shadow 180ms ease",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  }}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      // fallback if image file missing
                      const img = e.currentTarget;
                      img.style.display = "none";
                      const parent = img.parentElement as HTMLDivElement | null;
                      if (parent) {
                        parent.style.display = "flex";
                        parent.style.alignItems = "center";
                        parent.style.justifyContent = "center";
                        parent.style.color = "var(--muted)";
                        parent.style.fontSize = "12px";
                        parent.style.padding = "10px";
                        parent.textContent = `Missing ${p.src} (add it to /public)`;
                      }
                    }}
                  />
                </div>
              </a>
            );
          })}
        </div>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
          <button type="button" className="btn" onClick={() => setTiles(pickRandomN(vault, 5))}>
            🔀 Shuffle
          </button>
        </div>
      </div>
    </section>
  );
}