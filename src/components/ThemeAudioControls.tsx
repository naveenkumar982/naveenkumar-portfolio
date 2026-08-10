import { useState, useEffect } from "react";
import { sound } from "../utils/audio";

const themes = [
  { id: "default", name: "Gold", color: "#c9a84c" },
  { id: "cyan", name: "Cyan", color: "#5ce0d6" },
  { id: "violet", name: "Violet", color: "#9d7af7" },
  { id: "emerald", name: "Emerald", color: "#4ade80" },
];

export function ThemeAudioControls() {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio_theme") || "default";
    setCurrentTheme(savedTheme);
    if (savedTheme !== "default") {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    sound.playClick();
    if (themeId === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", themeId);
    }
    localStorage.setItem("portfolio_theme", themeId);
  };

  const handleAudioToggle = () => {
    const enabled = sound.toggleSound();
    setAudioEnabled(enabled);
  };

  return (
    <div className="flex items-center gap-3 bg-surface-dim/80 backdrop-blur-md border border-border px-3 py-1.5 rounded-full shadow-lg">
      {/* Theme color dots */}
      <div className="flex items-center gap-1.5 border-r border-border pr-3">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => handleThemeChange(t.id)}
            title={`Switch to ${t.name} accent`}
            aria-label={`Theme ${t.name}`}
            className={`w-3.5 h-3.5 rounded-full transition-transform duration-200 ${
              currentTheme === t.id
                ? "scale-125 ring-2 ring-primary ring-offset-2 ring-offset-surface"
                : "opacity-60 hover:opacity-100 hover:scale-110"
            }`}
            style={{ backgroundColor: t.color }}
          />
        ))}
      </div>

      {/* Audio toggle button */}
      <button
        onClick={handleAudioToggle}
        title={audioEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
        aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
        className={`text-xs px-2 py-0.5 rounded text-label transition-colors flex items-center gap-1.5 ${
          audioEnabled
            ? "text-accent bg-accent/10 border border-accent/30"
            : "text-muted hover:text-primary"
        }`}
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {audioEnabled ? (
            <>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </>
          ) : (
            <>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          )}
        </svg>
        <span className="hidden sm:inline text-[9px]">{audioEnabled ? "SFX ON" : "SFX"}</span>
      </button>
    </div>
  );
}
