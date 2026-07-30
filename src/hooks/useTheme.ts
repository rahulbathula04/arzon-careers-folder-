import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";
const KEY = "arzon-theme";

/**
 * Inline boot script - must run before paint to avoid a flash of the wrong
 * theme. Reads localStorage.arzon-theme, falls back to prefers-color-scheme,
 * and toggles the `dark` class on <html>.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var k='${KEY}';var s=localStorage.getItem(k);var m=s==='dark'||s==='light'?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var r=document.documentElement;if(m==='dark'){r.classList.add('dark');}else{r.classList.remove('dark');}r.style.colorScheme=m;}catch(e){}})();`;

export function getInitialTheme(): ThemeMode {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* noop */
    }
  }, [theme]);

  return {
    theme,
    setTheme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}
