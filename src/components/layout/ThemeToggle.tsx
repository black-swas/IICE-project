"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { t } from "@/lib/i18n";
import { THEME_QUERY, applyTheme, nextTheme, readTheme, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  window.addEventListener("iice-theme", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("iice-theme", onChange);
    window.removeEventListener("storage", onChange);
  };
}

const ICONS = { system: Monitor, light: Sun, dark: Moon } as const;

/** System, light or dark, cycled by one button, remembered in localStorage (FR-GLOBAL-8). */
export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "system");

  // While following the system, an operating-system switch changes the page too.
  useEffect(() => {
    if (theme !== "system") return;
    const query = window.matchMedia(THEME_QUERY);
    const follow = () => applyTheme("system");
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, [theme]);

  const next = nextTheme(theme);
  const Icon = ICONS[theme];
  return (
    <button
      type="button"
      data-action="toggle-theme"
      className="util-button"
      aria-label={t("theme.toggle", { current: t(`theme.${theme}`), next: t(`theme.${next}`) })}
      onClick={() => applyTheme(next)}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}
