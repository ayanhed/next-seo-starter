---
description: "React Hook Form with Zod validation patterns, form handling, and error display"
alwaysApply: true
---

# Forms and Validation

## Form Handling Stack

This project uses:

- **React Hook Form** for form state management
- **Zod** for schema validation
- **@hookform/resolvers/zod** for integration
- **Mantine form components** for UI

## Standard Form Pattern

### Complete Form Example

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput, PasswordInput, Button, Stack, Alert } from "@mantine/core";

// 1. Define Zod schema
const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

// 2. Infer TypeScript type from schema
type FormData = z.infer<typeof formSchema>;

export default function MyForm() {
  // 3. Initialize form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // 4. Define submit handler
  const onSubmit = async (data: FormData) => {
    try {
      // Handle form submission
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 5. Render form
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Name"
          placeholder="Your name"
          required
          error={errors.name?.message}
          {...register("name")}
        />

        <TextInput
          label="Email"
          placeholder="your@email.com"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" fullWidth loading={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
```

## Zod Schema Patterns

### Common Validation Rules

```typescript
import { z } from "zod";

const schema = z.object({
  // Required string
  name: z.string().min(1, "Name is required"),

  // Email validation
  email: z.email("Invalid email address"),

  // Password with minimum length
  password: z.string().min(8, "Password must be at least 8 characters"),

  // Optional field
  bio: z.string().optional(),

  // Number with range
  age: z.number().min(18, "Must be 18+").max(120, "Invalid age"),

  // Boolean
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),

  // Enum
  role: z.enum(["user", "admin"], {
    errorMap: () => ({ message: "Invalid role" }),
  }),

  // URL validation
  website: z.string().url("Invalid URL"),

  // Custom validation
  username: z
    .string()
    .min(3, "At least 3 characters")
    .max(20, "Max 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
});
```

### Complex Schemas

```typescript
// Nested objects
const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string().regex(/^\d{5}$/, "Must be 5 digits"),
});

const userSchema = z.object({
  name: z.string(),
  address: addressSchema,
});

// Arrays
const tagsSchema = z.object({
  tags: z.array(z.string()).min(1, "At least one tag required"),
});

// Conditional validation
const conditionalSchema = z
  .object({
    hasAddress: z.boolean(),
    address: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.hasAddress) {
        return data.address && data.address.length > 0;
      }
      return true;
    },
    {
      message: "Address is required when checkbox is checked",
      path: ["address"],
    }
  );
```

## Form Components

### Text Input

```typescript
<TextInput
  label="Email"
  placeholder="your@email.com"
  description="We'll never share your email"
  required
  error={errors.email?.message}
  {...register("email")}
/>
```

### Password Input

```typescript
<PasswordInput
  label="Password"
  placeholder="Enter password"
  required
  error={errors.password?.message}
  {...register("password")}
/>
```

### Textarea

```typescript
<Textarea
  label="Description"
  placeholder="Enter description"
  rows={4}
  error={errors.description?.message}
  {...register("description")}
/>
```

### Select

```typescript
<Select
  label="Role"
  placeholder="Select role"
  data={["user", "admin"]}
  error={errors.role?.message}
  {...register("role")}
/>
```

### Checkbox

```typescript
<Checkbox
  label="Accept terms and conditions"
  error={errors.acceptTerms?.message}
  {...register("acceptTerms")}
/>
```

## Loading States

Track submission state with `isSubmitting`:

```typescript
const {
  formState: { isSubmitting },
} = useForm<FormData>();

// Or use local state
const [isLoading, setIsLoading] = useState(false);

const onSubmit = async (data: FormData) => {
  setIsLoading(true);
  try {
    // Submit logic
  } finally {
    setIsLoading(false);
  }
};

// In button
<Button type="submit" loading={isSubmitting || isLoading}>
  Submit
</Button>;
```

## Error Handling

### Field-Level Errors

Display validation errors next to inputs:

```typescript
<TextInput error={errors.email?.message} {...register("email")} />
```

### Global Error Messages

Display general errors with Alert:

```typescript
const [error, setError] = useState("");

const onSubmit = async (data: FormData) => {
  setError("");
  try {
    // Submit logic
  } catch (err) {
    setError("An unexpected error occurred");
  }
};

// In JSX
{
  error && (
    <Alert color="red" title="Error">
      {error}
    </Alert>
  );
}
```

### Success Messages

Use Mantine notifications for success:

```typescript
import { notifications } from "@mantine/notifications";

const onSubmit = async (data: FormData) => {
  try {
    // Submit logic
    notifications.show({
      title: "Success",
      message: "Form submitted successfully",
      color: "green",
    });
  } catch (err) {
    notifications.show({
      title: "Error",
      message: "Failed to submit form",
      color: "red",
    });
  }
};
```

## Form Layout Patterns

### Vertical Stack (Default)

```typescript
<Stack gap="md">
  <TextInput {...} />
  <TextInput {...} />
  <Button type="submit">Submit</Button>
</Stack>
```

### Two-Column Layout

```typescript
<Grid>
  <Grid.Col span={{ base: 12, md: 6 }}>
    <TextInput label="First Name" {...register("firstName")} />
  </Grid.Col>
  <Grid.Col span={{ base: 12, md: 6 }}>
    <TextInput label="Last Name" {...register("lastName")} />
  </Grid.Col>
</Grid>
```

### Form with Sections

```typescript
<Stack gap="xl">
  <div>
    <Title order={3} mb="md">
      Personal Information
    </Title>
    <Stack gap="md">
      <TextInput label="Name" {...register("name")} />
      <TextInput label="Email" {...register("email")} />
    </Stack>
  </div>

  <div>
    <Title order={3} mb="md">
      Account Settings
    </Title>
    <Stack gap="md">
      <PasswordInput label="Password" {...register("password")} />
      <Checkbox label="Newsletter" {...register("newsletter")} />
    </Stack>
  </div>

  <Button type="submit">Save Changes</Button>
</Stack>
```

## Best Practices

1. **Always validate on both client and server** - Client validation is UX, server validation is security
2. **Use Zod for type safety** - Infer types with `z.infer<typeof schema>`
3. **Show loading states** - Use `loading` prop on submit buttons
4. **Clear errors on retry** - Reset error state before new submission
5. **Provide helpful error messages** - Be specific about what's wrong
6. **Disable submit while loading** - Prevent double submissions
7. **Use required prop** - Shows asterisk on required fields
8. **Add descriptions** - Help users understand what's expected
