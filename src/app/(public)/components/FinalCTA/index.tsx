"use client";

import { ArrowRight } from "lucide-react";
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Box,
  Group,
} from "@mantine/core";
import classes from "./style.module.css";
import { useRouter } from "next/navigation";

export default function FinalCTA() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box className={classes.wrapper}>
      <Container size="xl" py={{ base: 80, md: 120 }}>
        <Stack gap="xl" align="center" ta="center">
          <Title className={classes.title} order={2}>
            Ready to ship with Next SEO Starter?
          </Title>
          <Text size="lg" maw={600}>
            Start from a production-grade Next.js foundation with SEO defaults, auth, analytics, and
            a PWA already in place. Clone it, customize it, and launch faster.
          </Text>
          <Group gap="md" mt="xl">
            <Button
              size="lg"
              radius="md"
              variant="white"
              gradient={{ from: "primary", to: "secondary" }}
              rightSection={<ArrowRight size={18} />}
              onClick={() => router.push("/login")}
            >
              Open the demo
            </Button>
            <Button
              size="lg"
              radius="md"
              variant="white"
              onClick={() => scrollToSection("how-it-works")}
            >
              View setup steps
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
