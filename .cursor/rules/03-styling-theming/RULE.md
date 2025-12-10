---
description: "CSS Modules, Mantine theming, color scheme handling, and styling conventions"
alwaysApply: true
---

# Styling and Theming

## CSS Modules

Use CSS Modules for component-specific styles.

### File Convention

Each component with custom styles should have a `style.module.css` file:

```
ComponentName/
├── index.tsx
└── style.module.css
```

### Import and Usage

```typescript
import classes from "./style.module.css";

export default function Component() {
  return <div className={classes.wrapper}>{/* ... */}</div>;
}
```

### Multiple Classes

```typescript
// Combining classes
<div className={`${classes.icon} ${classes.light}`}>

// Conditional classes
<div className={`${classes.base} ${isActive ? classes.active : ''}`}>
```

## Mantine Theme System

### Theme Configuration

Theme is centralized in `src/config/theme.ts`:

```typescript
import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "primary",
  // ... other theme config
});
```

### Importing Theme

```typescript
import { theme } from "@/config/theme";

<MantineProvider theme={theme}>
```

### Using Theme Colors

Mantine provides semantic color props:

```typescript
// Text colors
<Text c="dimmed">Secondary text</Text>
<Text c="primary">Primary text</Text>

// Background colors
<Card bg="dark">

// Button colors
<Button color="primary">
```

## Color Scheme (Dark/Light Mode)

### Theme Toggle Component

```typescript
"use client";

import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";

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
    >
      <Sun className={classes.light} />
      <Moon className={classes.dark} />
    </ActionIcon>
  );
}
```

### CSS Module Color Scheme

Use Mantine's CSS variables in CSS Modules:

```css
.wrapper {
  background: var(--mantine-color-body);
  color: var(--mantine-color-text);
}

.light {
  display: var(--mantine-color-scheme-light);
}

.dark {
  display: var(--mantine-color-scheme-dark);
}
```

### Root Layout Setup

```typescript
import { ColorSchemeScript } from "@mantine/core";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Global Styles

Global styles live in `src/app/globals.css`:

```css
:root {
  --font-geist-mono: "Geist Mono", monospace;
  --font-inter: "Inter", sans-serif;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
```

## Responsive Design

### Breakpoints

Mantine provides default breakpoints:

- `xs`: 576px
- `sm`: 768px
- `md`: 992px
- `lg`: 1200px
- `xl`: 1408px

### Responsive Props

```typescript
// Padding
<Container py={{ base: 40, md: 80, lg: 120 }}>

// Grid spans
<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>

// Font sizes
<Title order={{ base: 3, md: 2, lg: 1 }}>

// Gap/spacing
<Stack gap={{ base: "md", md: "lg", lg: "xl" }}>
```

### Media Queries in CSS Modules

```css
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

@media (min-width: 1200px) {
  .container {
    padding: 3rem;
  }
}
```

## Typography

### Font Loading

Fonts are loaded in `src/app/layout.tsx` using `next/font`:

```typescript
import { Geist_Mono, Inter } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// In body tag
<body className={`${geistMono.variable} ${inter.variable}`}>
```

### Text Components

```typescript
// Headings
<Title order={1}>Main Heading</Title>
<Title order={2}>Section Heading</Title>
<Title order={3}>Subsection Heading</Title>

// Body text
<Text>Default text</Text>
<Text size="sm">Small text</Text>
<Text size="lg">Large text</Text>
<Text c="dimmed">Secondary text</Text>
<Text fw={700}>Bold text</Text>
```

## Spacing

Use Mantine's spacing scale:

```typescript
// Padding
<Box p="xs">     // Extra small
<Box p="sm">     // Small
<Box p="md">     // Medium (default)
<Box p="lg">     // Large
<Box p="xl">     // Extra large

// Margin
<Box m="md">
<Box mt="lg">    // Margin top
<Box mb="xl">    // Margin bottom
<Box mx="auto">  // Horizontal centering

// Gap (for Stack/Group)
<Stack gap="md">
<Group gap="xs">
```

## Animations and Transitions

Keep animations subtle and performant:

```css
.button {
  transition: all 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.fadeIn {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

## Best Practices

1. **Prefer Mantine props over custom CSS** when possible
2. **Use CSS Modules for custom styles** to avoid global conflicts
3. **Use semantic color names** (primary, dimmed) instead of hardcoded colors
4. **Always support dark mode** - test both color schemes
5. **Mobile-first approach** - start with mobile styles, add desktop enhancements
6. **Use Mantine's spacing scale** for consistency
7. **Avoid inline styles** unless absolutely necessary
8. **Keep animations performant** - use `transform` and `opacity`
