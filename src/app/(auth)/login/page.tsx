"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Card, Button, Heading, Text, Stack, Alert } from "@/components/ui";
import Link from "next/link";
import { appConfig } from "@/config/app";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error: authError } = await authClient.signIn.anonymous();

      if (authError) {
        setError(authError.message || "Failed to sign in");
        return;
      }

      if (data) {
        console.log("data", data);
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
    <div className="w-full max-w-md">
      <Card className="p-8">
        <div className="text-center mb-6">
          <Heading level={2} className="mb-2">
            Sign In
          </Heading>
          <Text>Welcome back to {appConfig.app.name}</Text>
        </div>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Stack>
        </form>

        <div className="mt-6 text-center">
          <Text size="sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
