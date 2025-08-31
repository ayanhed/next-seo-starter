"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { appConfig } from "@/config/app";

const themeColors = {
  dark: appConfig.theme.background,
  light: "#fafafa",
};

export default function ThemeColorMeta() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const current = theme === "system" ? resolvedTheme : theme;
    const color =
      themeColors[current as keyof typeof themeColors] ||
      appConfig.theme.background;
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
  }, [theme, resolvedTheme]);

  return null;
}
