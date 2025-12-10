"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  Button,
  Text,
  Stack,
  Alert,
  TextInput,
  PasswordInput,
  Container,
  Title,
  Anchor,
  Group,
} from "@mantine/core";
import Link from "next/link";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: RegisterFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const { data, error: authError } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        setError(authError.message || "Failed to create account");
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="xs" py={80}>
      <Stack gap="lg">
        <Stack gap="xs" align="center">
          <Title order={1}>Create an account</Title>
          <Text c="dimmed" size="sm">
            Get started with your free account
          </Text>
        </Stack>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              {error && (
                <Alert color="red" title="Error">
                  {error}
                </Alert>
              )}

              <TextInput
                label="Name"
                placeholder="John Doe"
                required
                error={errors.name?.message}
                {...register("name")}
              />

              <TextInput
                label="Email"
                placeholder="your@email.com"
                type="email"
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

              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                required
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <Button type="submit" fullWidth loading={isLoading}>
                Create account
              </Button>

              <Group justify="center" gap="xs">
                <Text size="sm" c="dimmed">
                  Already have an account?
                </Text>
                <Anchor component={Link} href="/login" size="sm">
                  Sign in
                </Anchor>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
}
