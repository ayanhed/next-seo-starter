"use client";

import { useEffect, useState, useCallback, memo } from "react";
import {
  Card,
  Heading,
  Text,
  Badge,
  Button,
  Stack,
  Grid,
} from "@/components/ui";
import { Copy, Check } from "lucide-react";

interface ThemeColors {
  [key: string]: string;
}

const colorVariables = [
  // Brand & Primary
  "color-brand",
  "color-primary",
  "color-primary-foreground",

  // Backgrounds & Surfaces
  "color-bg",
  "color-surface",
  "color-card",
  "color-input",

  // Foregrounds & Text
  "color-foreground",
  "color-muted-foreground",

  // Borders & Rings
  "color-border",
  "color-ring",

  // Status
  "color-success",
  "color-warning",
  "color-destructive",
];

interface ColorPickerProps {
  color: string;
  name: string;
  onColorChange: (name: string, color: string) => void;
}

const ColorPicker = memo(({ color, name, onColorChange }: ColorPickerProps) => (
  <Card size="sm">
    <input
      type="color"
      value={color}
      onChange={(e) => onColorChange(name, e.target.value)}
      className="w-6 h-6 rounded border border-[var(--color-border)] cursor-pointer transition-transform hover:scale-110 flex-shrink-0 bg-transparent"
      title={`Pick color for ${name}`}
    />
    <Stack direction="vertical" spacing="xs">
      <Text size="xs" className="font-mono truncate">
        {name}
      </Text>
      <Text size="xs" variant="muted" className="font-mono truncate">
        {color}
      </Text>
    </Stack>
  </Card>
));

ColorPicker.displayName = "ColorPicker";

export default function ThemeShowcase() {
  const [currentTheme, setCurrentTheme] = useState<string>("dark");
  const [currentColors, setCurrentColors] = useState<ThemeColors>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateThemeColors = () => {
      // Get the current theme from the document
      const htmlElement = document.documentElement;
      const currentThemeValue =
        htmlElement.getAttribute("data-theme") || "dark";
      setCurrentTheme(currentThemeValue);

      const colors: ThemeColors = {};

      // Read all color variables from the current theme
      colorVariables.forEach((variable) => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue(`--${variable}`)
          .trim();
        if (value) {
          colors[variable] = value;
        }
      });

      setCurrentColors(colors);
    };

    // Initial load
    updateThemeColors();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          updateThemeColors();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const updateColor = useCallback((variable: string, color: string) => {
    // Update the CSS variable in real-time
    document.documentElement.style.setProperty(`--${variable}`, color);

    // Update local state
    setCurrentColors((prev) => ({
      ...prev,
      [variable]: color,
    }));
  }, []);

  const copyToClipboard = async () => {
    const cssVariables = Object.entries(currentColors)
      .map(([variable, color]) => `  --${variable}: ${color};`)
      .join("\n");

    const cssOutput = `[data-theme="custom"] {\n${cssVariables}\n}`;

    try {
      await navigator.clipboard.writeText(cssOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <Card className="w-full">
      <Stack spacing="sm">
        <Button onClick={copyToClipboard} variant="outline" size="sm">
          {copied ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
        <Grid cols={4} gap="sm">
          {Object.entries(currentColors).map(([variable, color]) => (
            <ColorPicker
              key={variable}
              name={variable}
              color={color}
              onColorChange={updateColor}
            />
          ))}
        </Grid>
      </Stack>
    </Card>
  );
}
