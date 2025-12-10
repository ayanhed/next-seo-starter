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
    title: "Sign Up",
    description:
      "Create your account in less than 2 minutes. No credit card required to get started.",
  },
  {
    icon: Settings,
    step: 2,
    title: "Configure",
    description:
      "Set up your workspace and customize settings to match your workflow preferences.",
  },
  {
    icon: Rocket,
    step: 3,
    title: "Launch",
    description:
      "Start using the platform immediately. Our intuitive interface makes it easy to get started.",
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
            How it works?
          </Title>
          <Text c="dimmed" size="lg" ta="center" maw={600}>
            Explain how to get started with the product in 3 simple steps.
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
