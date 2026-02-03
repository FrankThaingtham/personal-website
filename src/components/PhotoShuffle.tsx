"use client";

import { useEffect, useMemo, useState } from "react";

type Photo = {
  src: string; // /public/photos/xx.webp
  alt: string;
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
  const count = Math.min(n, arr.length);
  return shuffle(arr).slice(0, count);
}

export default function PhotoShuffle() {
  const vault: Photo[] = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => {
        const n = String(i + 1).padStart(2, "0");
        return { src: `/photos/${n}.webp`, alt: `Photo ${i + 1}` };
      }),
    []
  );

  // ✅ Deterministic initial render (prevents hydration mismatch)
  const [tiles, setTiles] = useState<Photo[]>(() => vault.slice(0, 5));

  // lightbox state
  const [active, setActive] = useState<Photo | null>(null);

  // ✅ Randomize only after mount (client-only)
  useEffect(() => {
    setTiles(pickRandomN(vault, 5));
  }, [vault]);

  // close on ESC
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <>
      <section style={{ marginTop: 34 }}>
        {/* FULL-BLEED wrapper */}
        <div
          style={{
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
            padding: "0 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 18,
            }}
          >
            {tiles.map((p, idx) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setActive(p)}
                aria-label={`Open ${p.alt}`}
                title={p.alt}
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  cursor: "pointer",
                  flex: "0 0 auto",
                }}
              >
                <div
                  style={{
                    width: "clamp(200px, 15vw, 280px)",
                    aspectRatio: "1 / 1",
                    borderRadius: 18,
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.02)",

                    // alternate tilt left/right
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
              </button>
            ))}
          </div>

          <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
            <button type="button" className="btn" onClick={() => setTiles(pickRandomN(vault, 5))}>
              🔀 Shuffle
            </button>
          </div>
        </div>
      </section>

      {/* LIGHTBOX / MODAL */}
      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          onClick={() => setActive(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          {/* Stop click from closing when clicking the image area */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(960px, 92vw)",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.15)",
              overflow: "hidden",
              background: "rgba(15,15,15,0.9)",
              boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
            }}
          >
            <div style={{ background: "black", position: "relative" }}>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                title="Close"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "rgba(0,0,0,0.55)",
                  color: "white",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>

              <img
                src={active.src}
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}