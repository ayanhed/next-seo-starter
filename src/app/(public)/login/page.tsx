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
  Divider,
  Container,
  Title,
  Anchor,
  Group,
} from "@mantine/core";
import Link from "next/link";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAnonymousLoading, setIsAnonymousLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        setError(authError.message || "Failed to sign in");
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
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsAnonymousLoading(false);
    }
  };

  return (
    <Container size="xs" py={80}>
      <Stack gap="lg">
        <Stack gap="xs" align="center">
          <Title order={1}>Welcome back</Title>
          <Text c="dimmed" size="sm">
            Sign in to your account to continue
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

              <Button type="submit" fullWidth loading={isLoading}>
                Sign in
              </Button>

              <Divider label="or" labelPosition="center" />

              <Button
                variant="default"
                fullWidth
                onClick={handleAnonymousLogin}
                loading={isAnonymousLoading}
              >
                Continue as guest
              </Button>

              <Group justify="center" gap="xs">
                <Text size="sm" c="dimmed">
                  Don&apos;t have an account?
                </Text>
                <Anchor component={Link} href="/register" size="sm">
                  Sign up
                </Anchor>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
}
