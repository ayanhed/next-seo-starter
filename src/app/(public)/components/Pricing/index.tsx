"use client";

import { Check } from "lucide-react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Paper,
  Button,
  List,
  ThemeIcon,
  Badge,
  Stack,
  Box,
} from "@mantine/core";
import classes from "./style.module.css";
import { useRouter } from "next/navigation";
type PlanAction = "demo" | "guide" | "stack";

type Plan = {
  name: string;
  priceLabel: string;
  priceNote: string;
  description: string;
  features: string[];
  popular: boolean;
  ctaLabel: string;
  action: PlanAction;
};

const plans: Plan[] = [
  {
    name: "Prototype quickly",
    priceLabel: "Free, MIT license",
    priceNote: "Clone the repo or use the template.",
    description: "Spin up a marketing page plus auth flows without touching boilerplate.",
    features: [
      "Next.js 15 + React 19 with Mantine theming and UI primitives",
      "Reusable hero, benefits, FAQ, and CTA sections you can restyle",
      "Auth routes powered by Better Auth client helpers",
      "Protected dashboard route group already wired",
      "HTTPS dev server plus lint/type check scripts",
    ],
    popular: false,
    ctaLabel: "Open the demo",
    action: "demo",
  },
  {
    name: "Launch SEO-first",
    priceLabel: "Production defaults included",
    priceNote: "Zero subscriptions—just best practices.",
    description: "Ship a polished experience with metadata, analytics, and offline handled.",
    features: [
      "One app config keeps metadata, OG tags, sitemap, robots, and manifest in sync",
      "JSON-LD helpers for structured data on landing pages",
      "Serwist service worker with offline fallback and navigation preload",
      "Optional PostHog analytics proxied through /ingest",
      "Marketing, auth, and dashboard route groups to keep things organized",
    ],
    popular: true,
    ctaLabel: "View setup steps",
    action: "guide",
  },
  {
    name: "Scale & extend",
    priceLabel: "Bring your own data",
    priceNote: "Swap services or extend Prisma easily.",
    description: "Keep the structure, upgrade the stack, and tailor it to your product.",
    features: [
      "Prisma schema ready to extend with npm run db:migrate",
      "Session-aware middleware protecting server-rendered dashboard pages",
      "Mantine theme tokens for brand colors, fonts, and radius",
      "PostgreSQL connection string driven by .env.local",
      "Deployment-friendly defaults for Vercel or Netlify",
    ],
    popular: false,
    ctaLabel: "Check the stack",
    action: "stack",
  },
];

export default function Pricing() {
  const router = useRouter();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAction = (action: PlanAction) => {
    if (action === "demo") {
      router.push("/login");
      return;
    }
    if (action === "guide") {
      scrollToSection("how-it-works");
      return;
    }
    scrollToSection("services");
  };

  return (
    <Box id="pricing" className={classes.wrapper}>
      <Container size="xl" py={{ base: 60, md: 100 }}>
        <Stack gap="xl" align="center">
          <Title className={classes.title} order={2} ta="center">
            Open source, zero lock-in
          </Title>
          <Text c="dimmed" size="lg" ta="center" maw={700}>
            Next SEO Starter is free to use and built for real launches. Choose how you want to
            start and follow the path that fits your workflow.
          </Text>
          <SimpleGrid
            cols={{ base: 1, md: 3 }}
            spacing="xl"
            className={classes.grid}
          >
            {plans.map((plan) => (
              <Paper
                key={plan.name}
                className={`${classes.pricingCard} ${
                  plan.popular ? classes.popular : ""
                }`}
                shadow="md"
                p="xl"
                radius="lg"
                withBorder
              >
                <Stack gap="lg">
                  {plan.popular && (
                    <Badge
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "primary", to: "secondary" }}
                      fullWidth
                    >
                      Most Popular
                    </Badge>
                  )}
                  <Stack gap="xs">
                    <Title order={3} size="h3" fw={700}>
                      {plan.name}
                    </Title>
                    <Text c="dimmed" size="sm">
                      {plan.description}
                    </Text>
                  </Stack>
                  <Box>
                    <Text size="36px" fw={700} lh={1}>
                      {plan.priceLabel}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {plan.priceNote}
                    </Text>
                  </Box>
                  <Button
                    fullWidth
                    size="lg"
                    variant={plan.popular ? "gradient" : "outline"}
                    radius="md"
                    onClick={() => handleAction(plan.action)}
                  >
                    {plan.ctaLabel}
                  </Button>
                  <List
                    spacing="sm"
                    size="sm"
                    icon={
                      <ThemeIcon color="primary" size={20} radius="xl">
                        <Check size={12} />
                      </ThemeIcon>
                    }
                  >
                    {plan.features.map((feature, index) => (
                      <List.Item key={index}>{feature}</List.Item>
                    ))}
                  </List>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
