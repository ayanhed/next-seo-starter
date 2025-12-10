"use client";

import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { Sun, Moon } from "lucide-react";
import classes from "./style.module.css";

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
      className={classes.toggle}
    >
      <Sun
        className={`${classes.icon} ${classes.light}`}
        size={20}
        strokeWidth={1.5}
      />
      <Moon
        className={`${classes.icon} ${classes.dark}`}
        size={20}
        strokeWidth={1.5}
      />
    </ActionIcon>
  );
}
