import {
  createTheme,
  MantineColorsTuple,
  Button,
  Card,
  Paper,
  Input,
  TextInput,
  Textarea,
  Select,
  Badge,
  Anchor,
} from "@mantine/core";
import { appConfig } from "./app";

/**
 * Custom Mantine Theme Configuration
 *
 * This theme is integrated with the app config and provides:
 * - Custom color palette based on appConfig.theme.primary
 * - Comprehensive typography settings
 * - Consistent spacing, radius, and shadows
 * - Dark mode support
 * - Component default props
 *
 * To extend or customize:
 * 1. Modify the color palette arrays below
 * 2. Adjust typography, spacing, or other design tokens
 * 3. Add or modify component defaults in the components section
 * 4. Use the helper functions (getThemeColor, getPrimaryColor) in your components
 *
 * @example
 * ```tsx
 * import { theme, getPrimaryColor } from "@/config/theme";
 *
 * // Use in component
 * const primaryColor = getPrimaryColor(5); // Gets shade 5 of primary color
 * ```
 */

// Define custom color palette based on app config
// Color tuples follow Mantine's 10-shade system (0-9)
const primaryColor: MantineColorsTuple = [
  "#f5e6ff", // 0 - lightest
  "#e6ccff", // 1
  "#d4b3ff", // 2
  "#c299ff", // 3
  appConfig.theme.primary, // 4 - appConfig.theme.primary (main brand color)
  "#9c2eff", // 5 - default shade
  "#8b16ff", // 6
  "#7a00ff", // 7
  "#6900e6", // 8
  "#5800cc", // 9 - darkest
];

const secondaryColor: MantineColorsTuple = [
  "#e6f7ff", // 0 - lightest
  "#cce6ff", // 1
  "#b3d4ff", // 2
  "#99c2ff", // 3
  "#80b0ff", // 4
  "#669eff", // 5
  "#4d8cff", // 6
  "#337aff", // 7
  "#1a68ff", // 8
  "#0056ff", // 9 - darkest
];

// Create a comprehensive theme using Mantine best practices
export const theme = createTheme({
  // Primary color from app config
  primaryColor: "primary",
  // Different shades for light/dark modes for optimal contrast
  primaryShade: { light: 5, dark: 4 },
  colors: {
    primary: primaryColor,
    secondary: secondaryColor,
  },

  // Auto contrast for better accessibility (v7.4+)
  // Automatically adjusts text color based on background luminance
  autoContrast: true,
  luminanceThreshold: 0.3,

  // Typography
  fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
  fontFamilyMonospace: "var(--font-geist-mono), 'Courier New', monospace",

  headings: {
    fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: "2.5rem", lineHeight: "1.2" },
      h2: { fontSize: "2rem", lineHeight: "1.3" },
      h3: { fontSize: "1.75rem", lineHeight: "1.4" },
      h4: { fontSize: "1.5rem", lineHeight: "1.4" },
      h5: { fontSize: "1.25rem", lineHeight: "1.5" },
      h6: { fontSize: "1rem", lineHeight: "1.5" },
    },
  },

  // Spacing and sizing
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },

  // Border radius
  defaultRadius: "md",
  radius: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
  },

  // Shadows
  shadows: {
    xs: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px",
    md: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
    lg: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px",
    xl: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px",
  },

  // Breakpoints
  breakpoints: {
    xs: "36em", // 576px
    sm: "48em", // 768px
    md: "62em", // 992px
    lg: "75em", // 1200px
    xl: "88em", // 1408px
  },

  // Other defaults
  cursorType: "pointer",
  respectReducedMotion: true,

  // White and black colors for better contrast
  white: "#ffffff",
  black: "#000000",

  // Default gradient for buttons and other components
  defaultGradient: {
    from: "primary",
    to: "secondary",
    deg: 45,
  },

  // Focus ring styles
  focusRing: "auto",

  // Component defaults using the extend pattern (Mantine v7+ best practice)
  // This provides better type safety and allows for dynamic styles
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Card: Card.extend({
      defaultProps: {
        radius: "md",
        shadow: "sm",
      },
    }),
    Paper: Paper.extend({
      defaultProps: {
        radius: "xl",
        shadow: "sm",
      },
    }),
    Input: Input.extend({
      defaultProps: {
        radius: "lg",
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: "lg",
      },
    }),
    Textarea: Textarea.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Select: Select.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Badge: Badge.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Anchor: Anchor.extend({
      defaultProps: {
        underline: "hover",
      },
    }),
  },
});

// Theme configuration type for type safety
export type ThemeConfig = typeof theme;

// Helper function to get theme colors
export function getThemeColor(color: string, shade: number = 5): string {
  if (!theme.colors) {
    return "#000000";
  }
  const colorTuple = theme.colors[color as keyof typeof theme.colors] as
    | MantineColorsTuple
    | undefined;
  if (colorTuple) {
    return colorTuple[shade] || colorTuple[5] || "#000000";
  }
  return color;
}

// Helper function to get primary color
export function getPrimaryColor(shade: number = 5): string {
  return primaryColor[shade] || primaryColor[5];
}
