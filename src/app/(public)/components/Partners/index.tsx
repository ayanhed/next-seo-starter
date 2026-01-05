"use client";

import { Container, Text, Group, Box, Paper } from "@mantine/core";

// Placeholder for partner logos - replace with actual logos
export default function Partners() {
  const partners = [
    "Next.js 16",
    "React 19",
    "Mantine v8",
    "Better Auth",
    "PostgreSQL",
    "Prisma v7",
    "TypeScript",
    "Zod v4",
    "Serwist",
    "PostHog",
  ];

  return (
    <Box id="services">
      <Container size="xl" py={{ base: 40, md: 60 }}>
        <Text ta="center" fw={600} size="lg" mb="xl" c="dimmed">
          Our tech stack includes:
        </Text>
        <Group justify="center" gap="sm" wrap="wrap">
          {[...Array(10)].fill(0).map((_, index) => (
            <Paper key={index} p="md" withBorder>
              <Text size="sm">{partners[index]}</Text>
            </Paper>
          ))}
        </Group>
      </Container>
    </Box>
  );
}
