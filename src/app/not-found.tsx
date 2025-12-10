import { Button, Center, Stack } from "@mantine/core";
import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Text } from "@mantine/core";

export default function NotFound() {
  return (
    <Center mih="100vh" px="md">
      <Stack gap="md" align="center">
        <Text fw="semibold" size="lg">
          404
        </Text>
        <Text variant="muted">Page not found</Text>
        <Text variant="muted">
          The page you are looking for does not exist.
        </Text>
        <Button
          component={Link}
          href="/"
          variant="ghost"
          size="lg"
          leftSection={<ArrowLeft size={16} />}
        >
          Back to home
        </Button>
      </Stack>
    </Center>
  );
}
