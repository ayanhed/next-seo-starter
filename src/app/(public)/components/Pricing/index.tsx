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
const plans = [
  {
    name: "Starter",
    price: 100,
    description: "Perfect for individuals getting started",
    features: [
      "Feature 1 goes here",
      "Feature 2 goes here",
      "Feature 3 goes here",
      "Feature 4 goes here",
      "Feature 5 goes here",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: 200,
    description: "Most popular choice for growing teams",
    features: [
      "Everything in Starter plus",
      "Advanced Feature 1",
      "Advanced Feature 2",
      "Advanced Feature 3",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Advanced",
    price: 300,
    description: "For large teams and enterprises",
    features: [
      "Everything in Pro plus",
      "Enterprise Feature 1",
      "Enterprise Feature 2",
      "Enterprise Feature 3",
      "Dedicated Support",
    ],
    popular: false,
  },
];

export default function Pricing() {
  const router = useRouter();

  return (
    <Box id="pricing" className={classes.wrapper}>
      <Container size="xl" py={{ base: 60, md: 100 }}>
        <Stack gap="xl" align="center">
          <Title className={classes.title} order={2} ta="center">
            Pricing - Why to buy/How it helps
          </Title>
          <Text c="dimmed" size="lg" ta="center" maw={700}>
            Help users choose by showcasing difference in plans. Don&apos;t hide
            anything. Add CTAs to all plans. Highlight the middle plan, guide
            users.
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
                      ${plan.price}
                      <Text component="span" size="md" fw={400} c="dimmed">
                        /month
                      </Text>
                    </Text>
                  </Box>
                  <Button
                    fullWidth
                    size="lg"
                    variant={plan.popular ? "gradient" : "outline"}
                    radius="md"
                    onClick={() => router.push("/login")}
                  >
                    Get Started
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
