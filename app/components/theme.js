"use client";

import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_KEY } from "../theme-script";

const readTheme = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light";

/** The current theme, kept in sync with the `dark` class on <html> (set before paint by themeScript). */
export function useTheme() {
  const [theme, setThemeState] = useState("light");

  useEffect(() => {
    setThemeState(readTheme());
    const observer = new MutationObserver(() => setThemeState(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Follow the system setting until the visitor picks one
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (e) => {
      let saved = null;
      try {
        saved = localStorage.getItem(THEME_KEY);
      } catch {}
      if (!saved) document.documentElement.classList.toggle("dark", e.matches);
    };
    media.addEventListener("change", onSystemChange);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", onSystemChange);
    };
  }, []);

  const setTheme = useCallback((next) => {
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  }, []);

  return [theme, setTheme];
}

export function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="grid size-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-ink/[0.06] hover:text-ink"
    >
      {/* Both icons render; CSS picks one, so the server and client markup always match */}
      <Moon className="size-[18px] dark:hidden" aria-hidden />
      <Sun className="hidden size-[18px] dark:block" aria-hidden />
    </button>
  );
}
