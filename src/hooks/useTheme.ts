"use client";

import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { useCallback } from "react";

/**
 * Custom hook for theme management
 * Provides easy access to color scheme and toggle functionality
 */
export function useTheme() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = useCallback(() => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  }, [computedColorScheme, setColorScheme]);

  const isDark = computedColorScheme === "dark";
  const isLight = computedColorScheme === "light";

  return {
    colorScheme: computedColorScheme,
    setColorScheme,
    toggleColorScheme,
    isDark,
    isLight,
  };
}
