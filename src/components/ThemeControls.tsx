"use client";

import { useEffect, useState } from "react";

type BgMode = "light" | "dark";
type AccentColor = "default" | "blue" | "green" | "red" | "purple" | "orange";

const ACCENT_COLORS: Record<AccentColor, string> = {
  default: "", // no override
  blue: "#3b82f6",
  green: "#22c55e",
  red: "#ef4444",
  purple: "#a855f7",
  orange: "#f97316",
};

const DOT_COLORS: Record<AccentColor, string> = {
  default: "transparent",
  blue: "#3b82f6",
  green: "#22c55e",
  red: "#ef4444",
  purple: "#a855f7",
  orange: "#f97316",
};

function applyTheme(bg: BgMode, accent: AccentColor) {
  const root = document.documentElement;

  // Base theme colors (READABILITY COLORS)
  if (bg === "dark") {
    root.style.setProperty("--bg", "#0b0b0c");
    root.style.setProperty("--text", "#f3f3f3");
    root.style.setProperty("--bodyText", "#e8e8e8");
    root.style.setProperty("--muted", "#a9a9a9");
    root.style.setProperty("--border", "#2a2a2a");
  } else {
    root.style.setProperty("--bg", "#f7f7f8");
    root.style.setProperty("--text", "#111111");
    root.style.setProperty("--bodyText", "#111111");
    root.style.setProperty("--muted", "#666666");
    root.style.setProperty("--border", "#eaeaea");
  }

  // Accent (only for headings/links where you choose to use it)
  const accentValue = ACCENT_COLORS[accent] || "var(--text)";
  root.style.setProperty("--accent", accent === "default" ? "var(--text)" : accentValue);

  // Link color defaults to accent (nav, etc.)
  root.style.setProperty("--link", "var(--accent)");
}

export default function ThemeControls() {
  const [bg, setBg] = useState<BgMode>("dark");
  const [accent, setAccent] = useState<AccentColor>("default");

  useEffect(() => {
    const savedBg = (localStorage.getItem("bgMode") as BgMode) || "dark";
    const savedAccent = (localStorage.getItem("accentColor") as AccentColor) || "default";
    setBg(savedBg);
    setAccent(savedAccent);
    applyTheme(savedBg, savedAccent);
  }, []);

  useEffect(() => {
    localStorage.setItem("bgMode", bg);
    localStorage.setItem("accentColor", accent);
    applyTheme(bg, accent);
  }, [bg, accent]);

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", marginLeft: "auto" }}>
      <button
        type="button"
        className="btn"
        onClick={() => setBg((v) => (v === "light" ? "dark" : "light"))}
      >
        {bg === "light" ? "🌙" : "☀️"}
      </button>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 14, color: "var(--muted)" }}>Text</span>

        {(Object.keys(DOT_COLORS) as AccentColor[]).map((c) => {
          const isSelected = accent === c;

          return (
            <button
              key={c}
              type="button"
              onClick={() => setAccent(c)}
              aria-label={`Accent color: ${c}`}
              title={c === "default" ? "Default" : c}
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                border: isSelected ? "2px solid var(--text)" : "1px solid var(--border)",
                background: c === "default" ? "var(--bg)" : DOT_COLORS[c],
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                cursor: "pointer",
              }}
            >
              {c === "default" ? (
                <span style={{ width: 8, height: 8, borderRadius: 999, border: "1px solid var(--border)" }} />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}