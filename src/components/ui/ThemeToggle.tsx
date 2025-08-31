"use client";

import { Moon, Sun, Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import Button from "./Button";
import { useEffect, useMemo, useState } from "react";

const THEME_ORDER = ["dark", "light"] as const;

export default function ThemeToggle({
  onChange,
}: {
  onChange?: (theme: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme, resolvedTheme } = useTheme();

  // Determine the effective current theme (including custom themes)
  const currentTheme = useMemo(() => {
    if (!mounted) return undefined;
    // If using system, fall back to resolvedTheme
    return theme === "system" ? resolvedTheme : theme;
  }, [theme, resolvedTheme, mounted]);

  const nextTheme = useMemo(() => {
    if (!currentTheme) return "dark";
    const index = THEME_ORDER.indexOf(
      currentTheme as (typeof THEME_ORDER)[number]
    );
    const nextIndex = index === -1 ? 0 : (index + 1) % THEME_ORDER.length;
    return THEME_ORDER[nextIndex];
  }, [currentTheme]);

  const handleToggle = () => {
    setTheme(nextTheme as string);
    onChange?.(nextTheme as string);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const Icon =
    currentTheme === "light"
      ? Sun
      : currentTheme === "terminal"
      ? Terminal
      : Moon;
  const aria = `Switch theme (next: ${nextTheme})`;

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="lg"
        aria-label={aria}
        onClick={handleToggle}
        icon={Icon}
      />
    </div>
  );
}
