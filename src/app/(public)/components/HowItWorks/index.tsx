"use client";

import { UserPlus, Settings, Rocket } from "lucide-react";
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

const steps = [
  {
    icon: UserPlus,
    step: 1,
    title: "Clone & install",
    description: "Use the template or clone the repo, then run npm install to pull the full stack.",
  },
  {
    icon: Settings,
    step: 2,
    title: "Configure env & database",
    description: "Add .env.local (URLs, PostHog key if needed, DATABASE_URL) and run npm run db:push.",
  },
  {
    icon: Rocket,
    step: 3,
    title: "Run & ship",
    description: "Start with npm run dev (HTTPS), tweak marketing sections, then run npm run check to verify.",
  },
];

export default function HowItWorks() {
  const items = steps.map((step) => (
    <Box key={step.step} className={classes.stepBox}>
      <Stack gap="md" align="center" ta="center">
        <Box className={classes.iconWrapper}>
          <ThemeIcon size={80} radius="xl" variant="gradient">
            <step.icon size={40} />
          </ThemeIcon>
          <Box className={classes.stepNumber}>{step.step}</Box>
        </Box>
        <Title order={3} size="h4" fw={600}>
          {step.title}
        </Title>
        <Text c="dimmed" size="sm" lh={1.6} maw={280}>
          {step.description}
        </Text>
      </Stack>
    </Box>
  ));

  return (
    <Box id="how-it-works" className={classes.wrapper}>
      <Container size="xl" py={{ base: 60, md: 100 }}>
        <Stack gap="xl" align="center">
          <Title className={classes.title} order={2} ta="center">
            From clone to deploy in 3 steps
          </Title>
          <Text c="dimmed" size="lg" ta="center" maw={600}>
            Next SEO Starter is designed to feel ready on day one: install it, set env vars, and
            start building your product instead of wiring boilerplate.
          </Text>
          <SimpleGrid
            cols={{ base: 1, md: 3 }}
            spacing={{ base: "xl", md: "lg" }}
            className={classes.grid}
          >
            {items}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
