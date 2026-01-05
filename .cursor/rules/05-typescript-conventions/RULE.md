---
description: "TypeScript best practices, type safety patterns, and naming conventions"
alwaysApply: true
---

# TypeScript Conventions

## Type Safety Rules

1. **Always use TypeScript** - No `.js` or `.jsx` files
2. **Enable strict mode** - All strict TypeScript settings are enabled
3. **No `any` types** - Use `unknown` if type is truly unknown
4. **Define explicit return types** for exported functions
5. **Use type inference** for local variables

## Interface vs Type

### Use Interface for:

```typescript
// Object shapes
interface UserProps {
  name: string;
  email: string;
}

// Component props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

// When you need declaration merging
interface Window {
  customProperty: string;
}
```

### Use Type for:

```typescript
// Unions
type Status = "idle" | "loading" | "success" | "error";

// Intersections
type UserWithRole = User & { role: Role };

// Utility types
type PartialUser = Partial<User>;

// Function types
type Handler = (event: Event) => void;
```

## Naming Conventions

### Types and Interfaces

```typescript
// PascalCase for types and interfaces
interface User {}
type UserRole = "admin" | "user";

// Suffix with "Props" for component props
interface ButtonProps {}
interface CardProps {}

// Suffix with "Data" for API response types
interface UserData {}
interface PostData {}
```

### Variables and Functions

```typescript
// camelCase for variables and functions
const userName = "John";
const getUserData = () => {};

// PascalCase for components
function UserCard() {}
const UserProfile = () => {};

// UPPER_CASE for constants
const MAX_RETRIES = 3;
const API_BASE_URL = "https://api.example.com";
```

## Component Props

### Define Props Interface

```typescript
interface ComponentNameProps {
  title: string;
  description?: string; // Optional prop
  onClick: () => void;
  children?: React.ReactNode;
}

export default function ComponentName({
  title,
  description,
  onClick,
  children,
}: ComponentNameProps) {
  return <div>{/* ... */}</div>;
}
```

### Destructuring Props

**Do:**

```typescript
function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

**Don't:**

```typescript
function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

## React Types

### Common React Types

```typescript
// Children
children: React.ReactNode;

// Event handlers
onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

// Refs
ref: React.RefObject<HTMLDivElement>;

// Style
style: React.CSSProperties;

// HTML attributes
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
```

### Generic Components

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <>{items.map(renderItem)}</>;
}
```

## Async/Promise Types

### Async Functions

```typescript
// Explicit return type
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// With error handling
async function fetchUserSafe(
  id: string
): Promise<{ data?: User; error?: Error }> {
  try {
    const user = await fetchUser(id);
    return { data: user };
  } catch (error) {
    return { error: error as Error };
  }
}
```

## Type Guards

```typescript
// User-defined type guard
function isError(value: unknown): value is Error {
  return value instanceof Error;
}

// Usage
if (isError(error)) {
  console.log(error.message); // TypeScript knows it's an Error
}

// Null/undefined checks
function processValue(value: string | null | undefined) {
  if (!value) return; // Type guard

  // TypeScript knows value is string here
  console.log(value.toUpperCase());
}
```

## Utility Types

```typescript
// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Pick specific properties
type UserPreview = Pick<User, "id" | "name" | "avatar">;

// Omit specific properties
type UserWithoutPassword = Omit<User, "password">;

// Extract from union
type Status = "idle" | "loading" | "success" | "error";
type LoadingStatus = Extract<Status, "loading" | "success" | "error">;

// Exclude from union
type NonIdleStatus = Exclude<Status, "idle">;

// Return type of function
const getUser = () => ({ id: 1, name: "John" });
type User = ReturnType<typeof getUser>;

// Parameters of function
function createUser(name: string, email: string) {}
type CreateUserParams = Parameters<typeof createUser>;
```

## Zod Integration

Use Zod to generate TypeScript types:

```typescript
import { z } from "zod";

// Define schema (Zod v4 syntax)
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  age: z.number().optional(),
});

// Infer TypeScript type
type User = z.infer<typeof userSchema>;

// Use in function
function processUser(user: User) {
  // TypeScript knows the shape
}
```

## API Response Types

```typescript
// Generic API response
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Usage
type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;

// Error response
interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Combined response type
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };
```

## Next.js Specific Types

```typescript
import type { Metadata, Viewport } from "next";

// Metadata
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
};

// Viewport
export const viewport: Viewport = {
  themeColor: "#000000",
};

// Page props (Next.js 15+ async params)
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  // ...
}

// Layout props
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Route handler
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: "response" });
}
```

## Type Assertions

**Avoid `as` assertions when possible:**

```typescript
// Bad - loses type safety
const user = data as User;

// Good - use type guard
if (isUser(data)) {
  const user = data; // TypeScript infers User
}

// Good - use zod validation
const user = userSchema.parse(data);
```

**When `as` is acceptable:**

```typescript
// DOM elements
const input = document.querySelector("input") as HTMLInputElement;

// Known type narrowing
const error = err as Error;

// Const assertions
const config = {
  endpoint: "/api",
  method: "POST",
} as const; // Makes properties readonly
```

## Error Handling Types

```typescript
// Better Auth patterns
try {
  const { data, error } = await authClient.signIn.email({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    // Handle error - Better Auth returns error object
    setError(error.message || "Failed to sign in");
    return;
  }

  if (data) {
    // Handle success
  }
} catch (err) {
  // Catch unexpected errors
  const message = err instanceof Error ? err.message : "Unknown error";
  setError(message);
}
```

## Best Practices

1. **Infer types from Zod schemas** - Single source of truth
2. **Use discriminated unions** for state management
3. **Avoid type assertions (`as`)** unless necessary
4. **Use `unknown` over `any`** for truly unknown types
5. **Leverage utility types** - Don't recreate what exists
6. **Export types with components** when they're reusable
7. **Use `const` assertions** for literal types
8. **Prefer interfaces for objects** - Better error messages
9. **Use type guards** for runtime type checking
10. **Keep types close to usage** - Co-locate when possible
