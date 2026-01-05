---
description: "Better Auth v1.3+ authentication patterns, session management, and security best practices"
alwaysApply: true
---

# Authentication with Better Auth

## Better Auth Setup

This project uses **Better Auth v1.3+** for authentication.

### Server Configuration

Located in `src/lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { anonymous } from "better-auth/plugins";
import { prisma } from "./prisma";
import { appConfig } from "@/config/app";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  advanced: {
    cookiePrefix: appConfig.app.name,
  },
  plugins: [nextCookies(), anonymous()],
});
```

### Client Configuration

Located in `src/lib/auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";
import { anonymousClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [nextCookies(), anonymousClient()],
});
```

### API Route Handler

Located in `src/app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

## Authentication Patterns

### Sign Up

```typescript
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: { email: string; password: string; name: string }) => {
    setIsLoading(true);
    setError("");

    try {
      const { data: result, error: authError } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (authError) {
        setError(authError.message || "Failed to create account");
        return;
      }

      if (result) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Form JSX
  );
}
```

### Sign In

```typescript
const onSubmit = async (data: { email: string; password: string }) => {
  setIsLoading(true);
  setError("");

  try {
    const { data: result, error: authError } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      setError(authError.message || "Failed to sign in");
      return;
    }

    if (result) {
      router.push("/dashboard");
      router.refresh();
    }
  } catch {
    setError("An unexpected error occurred");
  } finally {
    setIsLoading(false);
  }
};
```

### Anonymous Sign In

Better Auth supports anonymous users with the `anonymous()` plugin:

```typescript
const handleAnonymousLogin = async () => {
  setIsAnonymousLoading(true);
  setError("");

  try {
    const { data, error: authError } = await authClient.signIn.anonymous();

    if (authError) {
      setError(authError.message || "Failed to sign in");
      return;
    }

    if (data) {
      router.push("/dashboard");
      router.refresh();
    }
  } catch {
    setError("An unexpected error occurred");
  } finally {
    setIsAnonymousLoading(false);
  }
};
```

### Sign Out

```typescript
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
}
```

## Session Management

### Server-Side Session Check

```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      {/* Protected content */}
    </div>
  );
}
```

### Client-Side Session Hook

```typescript
"use client";

import { authClient } from "@/lib/auth-client";

// Usage in component
export function UserProfile() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return <div>Hello, {session.user.name}</div>;
}
```

## Middleware Protection

Located in `src/middleware.ts`:

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if route requires authentication
  if (pathname.startsWith("/dashboard")) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname === "/login" || pathname === "/register") {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
```

## Error Handling

### Better Auth Error Pattern

Better Auth returns `{ data, error }` objects:

```typescript
const { data, error } = await authClient.signIn.email({
  email: formData.email,
  password: formData.password,
});

// Always check error first
if (error) {
  // Handle auth error
  setError(error.message || "Authentication failed");
  return;
}

// Then handle success
if (data) {
  // Proceed with authenticated state
}
```

### Error Display

```typescript
import { Alert } from "@mantine/core";

export function LoginForm() {
  const [error, setError] = useState("");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md">
        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        {/* Form fields */}
      </Stack>
    </form>
  );
}
```

## User Data Access

### Accessing User Information

```typescript
// Server component
const session = await auth.api.getSession({ headers: await headers() });
const user = session?.user;

// Client component
const { data: session } = authClient.useSession();
const user = session?.user;

// Available user properties
user?.id; // User ID
user?.name; // Display name
user?.email; // Email address
user?.image; // Profile image URL
```

## Security Best Practices

### Environment Variables

Required in `.env.local`:

```bash
# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/db"

# App
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Cookie Configuration

Better Auth uses secure cookies:

- **HttpOnly**: Prevents JavaScript access
- **SameSite**: CSRF protection
- **Secure**: HTTPS only in production
- **Custom prefix**: Set via `advanced.cookiePrefix`

### Password Requirements

Implement in Zod schema:

```typescript
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number");
```

## Route Organization

### Public Routes (Unauthenticated)

- `/` - Landing page
- `/login` - Sign in page
- `/register` - Sign up page

Located in `src/app/(public)/`

### Protected Routes (Authenticated)

- `/dashboard` - User dashboard
- `/dashboard/*` - Dashboard sub-pages

Located in `src/app/(main)/`

## Anonymous User Handling

Check if user is anonymous:

```typescript
const { data: session } = authClient.useSession();

if (session?.user?.isAnonymous) {
  // Anonymous user
  return <Banner>Sign up to save your progress</Banner>;
}
```

## Common Patterns

### Protected Component Wrapper

```typescript
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
```

### Conditional UI Based on Auth State

```typescript
export function Navigation() {
  const { data: session } = authClient.useSession();

  return (
    <nav>
      {session ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <SignOutButton />
        </>
      ) : (
        <>
          <Link href="/login">Sign In</Link>
          <Link href="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
```
