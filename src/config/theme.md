# Theme Configuration Guide

This document explains how to use and customize the Mantine theme in this application.

## Overview

The theme is configured in `src/config/theme.ts` and is integrated with the app configuration (`src/config/app.ts`). It provides a comprehensive design system with support for light and dark modes.

## Key Features

- **Custom Color Palette**: Primary color derived from `appConfig.theme.primary`
- **Typography**: Consistent font families and heading styles
- **Spacing & Sizing**: Standardized spacing scale
- **Dark Mode**: Full support for light and dark color schemes
- **Component Defaults**: Pre-configured defaults for common components

## Using the Theme

### In Components

```tsx
import { Button } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";

function MyComponent() {
  const theme = useMantineTheme();

  return (
    <Button
      color="primary" // Uses the custom primary color
      radius="md" // Uses theme default radius
    >
      Click me
    </Button>
  );
}
```

### Using Theme Colors

```tsx
import { getPrimaryColor, getThemeColor } from "@/config/theme";

// Get primary color at specific shade (0-9)
const primaryShade5 = getPrimaryColor(5);

// Get any theme color
const blueShade3 = getThemeColor("blue", 3);
```

### Theme Toggle

Add the theme toggle component to your navigation or header:

```tsx
import { ThemeToggle } from "@/components/ThemeToggle";

function Navigation() {
  return (
    <nav>
      {/* ... other nav items ... */}
      <ThemeToggle />
    </nav>
  );
}
```

### Using the Theme Hook

```tsx
import { useTheme } from "@/hooks/useTheme";

function MyComponent() {
  const { isDark, toggleColorScheme, colorScheme } = useTheme();

  return (
    <div>
      <p>Current scheme: {colorScheme}</p>
      <button onClick={toggleColorScheme}>
        Toggle to {isDark ? "light" : "dark"} mode
      </button>
    </div>
  );
}
```

## Customizing the Theme

### 1. Modify Colors

Edit the color tuples in `src/config/theme.ts`:

```tsx
const primaryColor: MantineColorsTuple = [
  "#f5e6ff", // Shade 0 (lightest)
  // ... other shades ...
  "#ad46ff", // Shade 4 (main color from appConfig)
  // ... other shades ...
  "#5800cc", // Shade 9 (darkest)
];
```

### 2. Adjust Typography

Modify the `headings` or `fontFamily` properties:

```tsx
headings: {
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  fontWeight: "700",
  sizes: {
    h1: { fontSize: "2.5rem", lineHeight: "1.2" },
    // ... customize other heading sizes
  },
}
```

### 3. Change Spacing or Radius

Update the spacing or radius scales:

```tsx
spacing: {
  xs: "0.5rem",
  sm: "0.75rem",
  // ... add custom sizes
},
```

### 4. Component Defaults

Modify default props for components:

```tsx
components: {
  Button: {
    defaultProps: {
      radius: "md",
      // ... other defaults
    },
  },
  // ... other components
}
```

## CSS Variables

Mantine provides CSS variables that automatically adapt to light/dark mode:

- `var(--mantine-color-body)` - Background color
- `var(--mantine-color-text)` - Text color
- `var(--mantine-color-primary-5)` - Primary color shade 5
- `var(--mantine-spacing-md)` - Medium spacing
- `var(--mantine-radius-md)` - Medium border radius

Use these in your CSS modules:

```css
.myComponent {
  background-color: var(--mantine-color-body);
  color: var(--mantine-color-text);
  padding: var(--mantine-spacing-md);
  border-radius: var(--mantine-radius-md);
}
```

## Dark Mode

The theme automatically handles dark mode. Use the `light-dark()` function in CSS:

```css
.myElement {
  background-color: light-dark(
    var(--mantine-color-gray-0),
    /* Light mode */ var(--mantine-color-dark-6) /* Dark mode */
  );
}
```

## Integration with App Config

The theme integrates with `appConfig.theme`:

- `appConfig.theme.primary` → Primary color palette
- `appConfig.theme.background` → Used in viewport theme color

To change the primary color, update `appConfig.theme.primary` in `src/config/app.ts`.

## Best Practices

1. **Use theme colors**: Always use theme colors instead of hardcoded hex values
2. **Leverage CSS variables**: Use Mantine CSS variables in CSS modules
3. **Component defaults**: Set component defaults in theme rather than repeating props
4. **Consistent spacing**: Use theme spacing scale instead of arbitrary values
5. **Dark mode**: Always test both light and dark modes
