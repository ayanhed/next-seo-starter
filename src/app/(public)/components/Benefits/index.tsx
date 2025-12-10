"use client";

import { Zap, Shield, TrendingUp, Users, Clock, Sparkles } from "lucide-react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Box,
  ThemeIcon,
  Stack,
} from "@mantine/core";
import classes from "./style.module.css";

const benefits = [
  {
    icon: Zap,
    title: "Frictionless DX",
    description:
      "HTTPS dev server, typed routes, and a clear layout for marketing, auth, and dashboard pages.",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Auth & data ready",
    description:
      "Better Auth + Prisma with session-aware middleware and PostgreSQL schema already in place.",
    color: "secondary",
  },
  {
    icon: TrendingUp,
    title: "Analytics optional",
    description:
      "PostHog instrumentation is wired up and proxied through /ingest—leave the key empty to disable.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Marketing + app scaffold",
    description:
      "Reusable Mantine marketing sections, auth flows, and a protected dashboard route group to extend.",
    color: "secondary",
  },
  {
    icon: Clock,
    title: "Offline-friendly",
    description:
      "Serwist-powered PWA with navigation preload and an offline fallback page ready for production.",
    color: "primary",
  },
  {
    icon: Sparkles,
    title: "SEO-first defaults",
    description:
      "One config keeps metadata, sitemap, robots.txt, manifest, and JSON-LD helpers perfectly in sync.",
    color: "secondary",
  },
];

export default function Benefits() {
  const items = benefits.map((benefit) => (
    <Box key={benefit.title} className={classes.bentoBox}>
      <Stack gap="md">
        <ThemeIcon size={50} radius="md" variant="light" color={benefit.color}>
          <benefit.icon size={28} />
        </ThemeIcon>
        <Title order={3} size="h4" fw={600}>
          {benefit.title}
        </Title>
        <Text c="dimmed" size="sm" lh={1.6}>
          {benefit.description}
        </Text>
      </Stack>
    </Box>
  ));

  return (
    <Container size="xl" py={{ base: 60, md: 100 }}>
      <Stack gap="xl" align="center">
        <Title className={classes.title} order={2} ta="center">
          Built to remove the boring parts
        </Title>
        <Text c="dimmed" size="lg" ta="center" maw={600}>
          Next SEO Starter gives you production defaults for marketing, auth, and the dashboard so
          you can focus on the product you&apos;re building.
        </Text>
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing="lg"
          className={classes.grid}
        >
          {items}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
