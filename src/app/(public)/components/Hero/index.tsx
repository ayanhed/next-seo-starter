"use client";

import { Users, ArrowRight } from "lucide-react";
import {
  Button,
  Container,
  Group,
  Text,
  Title,
  Badge,
  Box,
  Stack,
  Grid,
} from "@mantine/core";
import classes from "./style.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Container size="xl" py={{ base: 60, md: 100 }}>
      <Grid gutter="xl" align="center">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="lg">
            {/* Social Proof */}
            <Group gap="xs">
              <Badge
                leftSection={<Users size={14} />}
                variant="light"
                color="primary"
                size="lg"
              >
                Next.js 15 + React 19 ready
              </Badge>
            </Group>

            {/* Title */}
            <Title className={classes.title} order={1}>
              Ship SEO-first apps faster with{" "}
              <span className={classes.highlight}>Next SEO Starter</span>
            </Title>

            {/* Description */}
            <Text c="dimmed" size="lg" className={classes.description}>
              A batteries-included Next.js 15 template with Mantine UI, Better
              Auth + Prisma, SEO metadata helpers, PWA/offline support, and
              optional PostHog analytics. Skip boilerplate and start shipping a
              polished marketing site, auth flow, and dashboard on day one.
            </Text>

            {/* CTAs */}
            <Group mt="xl" gap="md">
              <Button
                size="lg"
                radius="md"
                variant="gradient"
                rightSection={<ArrowRight size={18} />}
                onClick={() => router.push("/login")}
              >
                Open the demo
              </Button>
              <Button
                size="lg"
                radius="md"
                variant="outline"
                onClick={() => scrollToSection("services")}
              >
                See the stack
              </Button>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box className={classes.imageWrapper}>
            <Image
              src="/images/hero.svg"
              alt="Product screenshot"
              width={600}
              height={400}
              className={classes.image}
              priority
            />
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
