"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <button
      className="flex items-center gap-3 bg-navy-elevated border border-navy-border rounded-lg px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:border-navy-hover transition-colors"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span suppressHydrationWarning>{resolvedTheme === "dark" ? "🌙" : "☀️"}</span>
      <span suppressHydrationWarning>{resolvedTheme === "dark" ? "Dark Mode" : "Light Mode"}</span>
    </button>
  );
}
