"use client";

import { useEffect, useState } from "react";

type BgMode = "light" | "dark";
type TextColor =
  | "default"
  | "blue"
  | "green"
  | "red"
  | "purple"
  | "orange";

const TEXT_COLORS: Record<TextColor, string> = {
  default: "", // means "use default theme text"
  blue: "#3b82f6",
  green: "#22c55e",
  red: "#ef4444",
  purple: "#a855f7",
  orange: "#f97316",
};

function applyTheme(bg: BgMode, text: TextColor) {
  const root = document.documentElement;

  // background mode
  if (bg === "dark") {
    root.style.setProperty("--bg", "#0b0b0c");
    root.style.setProperty("--text", "#f3f3f3");
    root.style.setProperty("--muted", "#a9a9a9");
    root.style.setProperty("--border", "#2a2a2a");
    root.style.setProperty("--link", "#f3f3f3");
  } else {
    root.style.setProperty("--bg", "#ffffff");
    root.style.setProperty("--text", "#111111");
    root.style.setProperty("--muted", "#666666");
    root.style.setProperty("--border", "#eaeaea");
    root.style.setProperty("--link", "#111111");
  }

  // text override (optional)
  const override = TEXT_COLORS[text];
  if (override) {
    root.style.setProperty("--text", override);
    root.style.setProperty("--link", override);
  }
}

export default function ThemeControls() {
  const [bg, setBg] = useState<BgMode>("light");
  const [text, setText] = useState<TextColor>("default");

  // Load saved prefs on first render
  useEffect(() => {
    const savedBg = (localStorage.getItem("bgMode") as BgMode) || "light";
    const savedText = (localStorage.getItem("textColor") as TextColor) || "default";
    setBg(savedBg);
    setText(savedText);
    applyTheme(savedBg, savedText);
  }, []);

  // Apply + persist when changed
  useEffect(() => {
    localStorage.setItem("bgMode", bg);
    localStorage.setItem("textColor", text);
    applyTheme(bg, text);
  }, [bg, text]);

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", marginLeft: "auto" }}>
      <button
        type="button"
        className="btn"
        onClick={() => setBg((v) => (v === "light" ? "dark" : "light"))}
      >
        {bg === "light" ? "Dark" : "Light"}
      </button>

      <label style={{ fontSize: 14, color: "var(--muted)" }}>
        Text{" "}
        <select
          value={text}
          onChange={(e) => setText(e.target.value as TextColor)}
          style={{
            marginLeft: 6,
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "8px 10px",
            background: "var(--bg)",
            color: "var(--text)",
          }}
        >
          <option value="default">Default</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="purple">Purple</option>
          <option value="orange">Orange</option>
        </select>
      </label>
    </div>
  );
}