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
            Ready to Get Started?
          </Title>
          <Text size="lg" maw={600}>
            Join thousands of satisfied customers and transform your workflow
            today. Start your free trial, no credit card required.
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
              Get Started Now
            </Button>
            <Button
              size="lg"
              radius="md"
              variant="white"
              onClick={() => scrollToSection("how-it-works")}
            >
              Learn More
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
