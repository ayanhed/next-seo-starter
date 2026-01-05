---
description: "Prisma v7 ORM patterns, database schema conventions, and query best practices"
alwaysApply: true
---

# Database with Prisma

## Prisma Setup

This project uses **Prisma v7** as the ORM with **PostgreSQL**.

### Prisma Schema Location

Located in `prisma/schema.prisma`

### Prisma Client Singleton

Located in `src/lib/prisma.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**Always import from `@/lib/prisma`**:

```typescript
import { prisma } from "@/lib/prisma";

// ✅ Good
const user = await prisma.user.findUnique({ where: { id } });

// ❌ Bad - creates multiple instances
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
```

## Schema Conventions

### Current Schema (Better Auth)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model User {
  id            String    @id
  name          String
  email         String
  emailVerified Boolean
  image         String?
  createdAt     DateTime
  updatedAt     DateTime
  isAnonymous   Boolean?
  sessions      Session[]
  accounts      Account[]

  @@unique([email])
  @@map("user")
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String
  createdAt DateTime
  updatedAt DateTime
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@map("session")
  @@index([userId])
}

model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime
  updatedAt             DateTime

  @@map("account")
  @@index([userId])
}

model Verification {
  id         String    @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime?
  updatedAt  DateTime?

  @@map("verification")
  @@index([identifier])
}
```

### Field Conventions

- **camelCase for field names**: `emailVerified`, `createdAt`, `updatedAt`
- **Include timestamps**: Always add `createdAt` and `updatedAt`
- **Use `?` for optional fields**: `image String?`
- **Use `@default()` for defaults**: `@default(now())`, `@default(true)`
- **Use `@updatedAt` for auto-updated timestamps**: `updatedAt DateTime @updatedAt`
- **Use `@@map()` for table names**: Snake_case table names

### Relationships

```prisma
// One-to-Many
model User {
  id       String    @id
  posts    Post[]
  sessions Session[]
}

model Post {
  id     String @id
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Indexes and Constraints

```prisma
model User {
  id    String @id
  email String

  @@unique([email])
  @@index([email])
}

model Session {
  id     String @id
  userId String
  token  String

  @@unique([token])
  @@index([userId])
}
```

## Database Operations

### Create Operations

```typescript
// Create single record
const user = await prisma.user.create({
  data: {
    id: generateId(),
    email: "user@example.com",
    name: "John Doe",
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
});

// Create with relations
const session = await prisma.session.create({
  data: {
    id: generateId(),
    token: generateToken(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      connect: { id: userId },
    },
  },
});
```

### Read Operations

```typescript
// Find unique
const user = await prisma.user.findUnique({
  where: { id: userId },
});

// Find first
const user = await prisma.user.findFirst({
  where: { email: "user@example.com" },
});

// Find many with filters
const users = await prisma.user.findMany({
  where: {
    email: { contains: "@example.com" },
    createdAt: { gte: new Date("2024-01-01") },
  },
  orderBy: { createdAt: "desc" },
  take: 10,
  skip: 0,
});

// Find with relations
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    sessions: {
      where: { expiresAt: { gte: new Date() } },
    },
    accounts: true,
  },
});

// Select specific fields
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    name: true,
    email: true,
  },
});
```

### Update Operations

```typescript
// Update single record
const user = await prisma.user.update({
  where: { id: userId },
  data: {
    name: "New Name",
    updatedAt: new Date(),
  },
});

// Update many
const result = await prisma.user.updateMany({
  where: { emailVerified: false },
  data: { emailVerified: true },
});

// Upsert (update or create)
const user = await prisma.user.upsert({
  where: { email: "user@example.com" },
  update: { name: "Updated Name" },
  create: {
    id: generateId(),
    email: "user@example.com",
    name: "New User",
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
});
```

### Delete Operations

```typescript
// Delete single record
const user = await prisma.user.delete({
  where: { id: userId },
});

// Delete many
const result = await prisma.user.deleteMany({
  where: {
    emailVerified: false,
    createdAt: { lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  },
});
```

## Advanced Queries

### Aggregations

```typescript
// Count
const userCount = await prisma.user.count({
  where: { emailVerified: true },
});

// Aggregate
const stats = await prisma.session.aggregate({
  _count: { id: true },
  _max: { createdAt: true },
});

// Group by
const usersByAnonymous = await prisma.user.groupBy({
  by: ["isAnonymous"],
  _count: { id: true },
});
```

### Transactions

```typescript
// Sequential operations
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: {
      id: generateId(),
      email: "user@example.com",
      name: "User",
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const session = await tx.session.create({
    data: {
      id: generateId(),
      userId: user.id,
      token: generateToken(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return { user, session };
});
```

## Error Handling

### Prisma Error Types

```typescript
import { Prisma } from "@prisma/client";

try {
  const user = await prisma.user.create({
    data: {
      /* ... */
    },
  });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === "P2002") {
      throw new Error("User with this email already exists");
    }
    // Foreign key constraint violation
    if (error.code === "P2003") {
      throw new Error("Related record not found");
    }
    // Record not found
    if (error.code === "P2025") {
      throw new Error("Record not found");
    }
  }
  throw error;
}
```

### Common Error Codes

- `P2002`: Unique constraint violation
- `P2003`: Foreign key constraint violation
- `P2025`: Record not found
- `P2016`: Query interpretation error

## Migrations

### NPM Scripts

Defined in `package.json`:

```json
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset"
  }
}
```

### Development Workflow

```bash
# 1. Make schema changes in prisma/schema.prisma

# 2. Generate Prisma Client
npm run db:generate

# 3. Create and apply migration
npm run db:migrate -- --name add_user_role

# 4. View database with Prisma Studio
npm run db:studio
```

### Production Deployment

```bash
# Generate Prisma Client (done in build script)
prisma generate

# Apply migrations
prisma migrate deploy
```

## Performance Optimization

### Select Only Needed Fields

```typescript
// ✅ Good - select specific fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
});

// ❌ Bad - fetches all fields
const users = await prisma.user.findMany();
```

### Use Pagination

```typescript
// Cursor-based pagination (preferred)
const posts = await prisma.post.findMany({
  take: 20,
  cursor: lastPostId ? { id: lastPostId } : undefined,
  orderBy: { createdAt: "desc" },
});

// Offset-based pagination
const posts = await prisma.post.findMany({
  skip: page * pageSize,
  take: pageSize,
  orderBy: { createdAt: "desc" },
});
```

### Add Database Indexes

```prisma
model User {
  id    String @id
  email String

  @@index([email])  // Index frequently queried fields
}
```

## Type Safety

### Infer Types from Prisma

```typescript
import { Prisma } from "@prisma/client";

// Model type
type User = Prisma.UserGetPayload<{}>;

// With relations
type UserWithSessions = Prisma.UserGetPayload<{
  include: { sessions: true };
}>;

// With selected fields
type UserPreview = Prisma.UserGetPayload<{
  select: { id: true; name: true; email: true };
}>;

// Create input type
type UserCreateInput = Prisma.UserCreateInput;

// Update input type
type UserUpdateInput = Prisma.UserUpdateInput;
```

## Best Practices

1. **Always use the singleton** - Import from `@/lib/prisma`
2. **Add indexes for queries** - Index frequently filtered/sorted fields
3. **Use transactions** for related operations
4. **Handle errors gracefully** - Check for Prisma error codes
5. **Validate input** with Zod before database operations
6. **Use select/include** to optimize queries
7. **Implement pagination** for large result sets
8. **Use migrations** - Never modify the database manually
9. **Test with seed data** - Create `prisma/seed.ts` for development
10. **Better Auth manages auth tables** - Don't modify User/Session/Account manually
