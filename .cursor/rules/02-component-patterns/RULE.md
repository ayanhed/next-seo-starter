---
description: "React component patterns, Mantine UI usage, and component structure conventions"
alwaysApply: true
---

# Component Patterns

## Component Structure

### Standard Component Pattern

Use this structure for all components:

```typescript
"use client"; // Only if needed

import { Box, Stack, Text } from "@mantine/core";
import classes from "./style.module.css";

interface ComponentNameProps {
  // Props definition
}

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Component logic

  return (
    // JSX
  );
}
```

### Folder Structure

Each component gets its own folder:

```
ComponentName/
├── index.tsx          # Component code
└── style.module.css   # CSS Module styles
```

## Mantine UI Components

This project uses **Mantine v8** as the UI library.

### Core Components

Import from `@mantine/core`:

```typescript
import {
  Button,
  Container,
  Stack,
  Group,
  Text,
  Title,
  Card,
  Grid,
  Box,
  Badge,
  Anchor,
  Alert,
  Divider,
} from "@mantine/core";
```

### Common Patterns

#### Layout Components

```typescript
// Container for max-width content
<Container size="xl" py={{ base: 60, md: 100 }}>
  {/* Content */}
</Container>

// Stack for vertical spacing
<Stack gap="lg">
  <Title order={1}>Title</Title>
  <Text>Description</Text>
</Stack>

// Group for horizontal spacing
<Group gap="md">
  <Button>Action</Button>
  <Button variant="outline">Secondary</Button>
</Group>

// Grid for responsive layouts
<Grid gutter="xl" align="center">
  <Grid.Col span={{ base: 12, md: 6 }}>
    {/* Content */}
  </Grid.Col>
</Grid>
```

#### Responsive Props

Use responsive object syntax for mobile-first design:

```typescript
<Container py={{ base: 40, md: 80, lg: 120 }}>
<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
<Title order={{ base: 3, md: 2, lg: 1 }}>
```

#### Button Variants

```typescript
// Primary action (gradient using theme default)
<Button variant="gradient" rightSection={<Icon />}>
  Primary Action
</Button>

// Secondary action
<Button variant="outline">
  Secondary Action
</Button>

// Tertiary action
<Button variant="default">
  Default Action
</Button>
```

### Icons

Use **lucide-react** for icons:

```typescript
import { ArrowRight, Users, Check } from "lucide-react";

<Button rightSection={<ArrowRight size={18} />}>Continue</Button>;
```

**Icon sizing convention:**

- Inline text: `size={16}`
- Buttons: `size={18}`
- Badges: `size={14}`
- Large UI elements: `size={20}` or `size={24}`

## Client Components

### Use `"use client"` when you need:

1. **State management**

```typescript
"use client";
const [isOpen, setIsOpen] = useState(false);
```

2. **Event handlers**

```typescript
"use client";
const handleClick = () => {
  /* ... */
};
```

3. **Router hooks**

```typescript
"use client";
import { useRouter } from "next/navigation";
const router = useRouter();
```

4. **Browser APIs**

```typescript
"use client";
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
```

5. **Mantine hooks**

```typescript
"use client";
import { useMantineColorScheme } from "@mantine/core";
```

## Server Components (Default)

Keep components as server components when possible:

```typescript
// No "use client" directive
export default function StaticSection() {
  return (
    <Container>
      <Title>Static Content</Title>
      <Text>This renders on the server</Text>
    </Container>
  );
}
```

## Image Handling

Use Next.js Image component:

```typescript
import Image from "next/image";

<Image
  src="/images/hero.svg"
  alt="Descriptive alt text"
  width={600}
  height={400}
  priority // For above-the-fold images
/>;
```

## Link Handling

Use Next.js Link for internal navigation:

```typescript
import Link from "next/link";
import { Anchor, Button } from "@mantine/core";

// Mantine Anchor with Next.js Link
<Anchor component={Link} href="/register">
  Sign up
</Anchor>;

// Mantine Button with router
const router = useRouter();
<Button onClick={() => router.push("/login")}>Login</Button>;
```

## Component Composition

### Page Components

Page components should compose smaller sections:

```typescript
// src/app/(public)/page.tsx
export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
```

### Section Components

Sections should be self-contained with their own styling:

```typescript
// src/app/(public)/components/Hero/index.tsx
export default function Hero() {
  return (
    <Container size="xl" py={{ base: 60, md: 100 }}>
      {/* Hero content */}
    </Container>
  );
}
```

## Card Pattern

Use Mantine Card with consistent styling:

```typescript
<Card shadow="sm" padding="xl" radius="md" withBorder>
  <Stack gap="md">
    {/* Card content */}
  </Stack>
</Card>
```

## Notifications

Use Mantine notifications for user feedback:

```typescript
import { notifications } from "@mantine/notifications";

notifications.show({
  title: "Success",
  message: "Action completed successfully",
  color: "green",
});
```

## Accessibility

- Always provide `aria-label` for icon-only buttons
- Use semantic HTML elements
- Ensure proper heading hierarchy (`order={1}`, `order={2}`, etc.)
- Provide alt text for images
- Use Mantine's built-in accessibility features

```typescript
<ActionIcon aria-label="Toggle theme" size="lg">
  <Sun size={20} />
</ActionIcon>
```

## Performance

- Use `priority` prop for above-the-fold images
- Lazy load heavy components when possible
- Keep client components small and focused
- Extract static content to server components
