---
description: "Next.js 15 App Router project structure, route groups, and file organization conventions"
alwaysApply: true
---

# Project Architecture

## Next.js App Router Structure

This project uses **Next.js 15 with the App Router** (`src/app/` directory).

### Route Groups

- **(public)** - Public-facing pages (landing, login, register)

  - Layout includes navigation and footer
  - Example: `src/app/(public)/page.tsx`, `src/app/(public)/login/page.tsx`

- **(main)** - Authenticated pages (dashboard, user-specific content)
  - Requires authentication
  - Example: `src/app/(main)/dashboard/page.tsx`

### Key Directories

```
src/
├── app/              # Next.js App Router
│   ├── (public)/     # Public route group
│   ├── (main)/       # Protected route group
│   ├── api/          # API routes
│   ├── layout.tsx    # Root layout
│   └── providers.tsx # Client providers (Mantine, etc.)
├── components/       # Shared/reusable components
├── config/           # App configuration
│   ├── app.ts        # Single source of truth for app metadata
│   └── theme.ts      # Mantine theme configuration
├── lib/              # Utility libraries
│   ├── auth.ts       # Better Auth server instance
│   ├── auth-client.ts # Better Auth client instance
│   ├── prisma.ts     # Prisma client
│   └── db.ts         # Database utilities
└── hooks/            # Custom React hooks
```

## File Naming Conventions

- **Components**: Use PascalCase folder names with `index.tsx` and `style.module.css`
  - Example: `Hero/index.tsx`, `Hero/style.module.css`
- **Routes**: Use Next.js conventions (`page.tsx`, `layout.tsx`, `route.ts`)

- **Config files**: Use camelCase (e.g., `app.ts`, `theme.ts`)

- **Utilities**: Use kebab-case (e.g., `auth-client.ts`)

## Component Organization

### Page Components (in route groups)

Place page-specific components in a `components/` folder within the route group:

```
src/app/(public)/
├── components/
│   ├── Hero/
│   ├── Benefits/
│   └── Pricing/
└── page.tsx
```

### Shared Components

Place reusable components in `src/components/`:

```typescript
// Example: src/components/ThemeToggle.tsx
"use client";

import { ActionIcon } from "@mantine/core";
// ... component code
```

## Client vs Server Components

- **Default to Server Components** unless you need:
  - Client-side state (`useState`, `useReducer`)
  - Event handlers (`onClick`, `onChange`)
  - Browser APIs (`window`, `localStorage`)
  - Custom hooks that use client-side features
- **Add `"use client"` directive** at the top when needed

- **Prefer server components** for:
  - Static content
  - Data fetching
  - SEO-critical content

## Configuration

- **Single source of truth**: `src/config/app.ts`

  - App name, description, keywords
  - Base URL, locale, authors
  - Branding (OG image, social links)
  - Theme colors

- **Always import config** instead of hardcoding values:
  ```typescript
  import { appConfig, getCanonicalUrl } from "@/config/app";
  ```

## Environment Variables

- Define in `.env.example` and `.env.local`
- Prefix client-side vars with `NEXT_PUBLIC_`
- Key variables:
  - `NEXT_PUBLIC_SITE_URL` - Without trailing slash
  - `NEXT_PUBLIC_APP_NAME`
  - `NEXT_PUBLIC_APP_DESCRIPTION`
  - `DATABASE_URL`
  - `BETTER_AUTH_SECRET`

## Path Aliases

Use TypeScript path aliases defined in `tsconfig.json`:

```typescript
import { appConfig } from "@/config/app";
import { ThemeToggle } from "@/components/ThemeToggle";
import { auth } from "@/lib/auth";
```

Never use relative imports for files outside the current directory.
