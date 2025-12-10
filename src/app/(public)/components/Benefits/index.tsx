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
    title: "Lightning Fast",
    description:
      "Experience blazing-fast performance that keeps your workflow smooth and efficient.",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security with 99.9% uptime guarantee. Your data is always protected.",
    color: "secondary",
  },
  {
    icon: TrendingUp,
    title: "Scale Easily",
    description:
      "Grow your business without limits. Our platform scales with you effortlessly.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work seamlessly with your team. Real-time collaboration tools built for productivity.",
    color: "secondary",
  },
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Automate repetitive tasks and focus on what matters. Save hours every week.",
    color: "primary",
  },
  {
    icon: Sparkles,
    title: "Innovation First",
    description:
      "Cutting-edge features and regular updates. Stay ahead with the latest technology.",
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
          Benefits
        </Title>
        <Text c="dimmed" size="lg" ta="center" maw={600}>
          Focus on how it helps users instead of what features it has. We prefer
          bento boxes for these sections.
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
