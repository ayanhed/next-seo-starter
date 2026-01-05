"use client";

import { Star } from "lucide-react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Paper,
  Stack,
  Group,
  Avatar,
  Box,
} from "@mantine/core";
import classes from "./style.module.css";

const testimonials = [
  {
    name: "Alex Kim",
    role: "Indie hacker",
    content:
      "I cloned Next SEO Starter on Friday and had auth, marketing pages, and a Postgres-backed dashboard live before Monday. Zero time lost on boilerplate.",
    rating: 5,
    avatar: "AK",
  },
  {
    name: "Priya Desai",
    role: "Staff engineer",
    content:
      "Having metadata, sitemap, robots, and JSON-LD driven by one config is a lifesaver. The PWA offline page also made Lighthouse happy out of the box.",
    rating: 5,
    avatar: "PD",
  },
  {
    name: "Jordan Lee",
    role: "Designer & developer",
    content:
      "The Mantine theme tokens made it easy to drop in our brand colors and typography. I kept the sections, swapped copy, and shipped the marketing site the same day.",
    rating: 5,
    avatar: "JL",
  },
];

export default function Testimonials() {
  return (
    <Box id="testimonials" className={classes.wrapper}>
      <Container size="xl" py={{ base: 60, md: 100 }}>
        <Stack gap="xl" align="center">
          <Title className={classes.title} order={2} ta="center">
            Teams ship faster with this starter
          </Title>
          <Text c="dimmed" size="lg" ta="center" maw={700}>
            Real feedback from builders who wanted a launch-ready Next.js stack
            with SEO, auth, and PWA details already handled.
          </Text>
          <SimpleGrid
            cols={{ base: 1, md: 3 }}
            spacing="xl"
            className={classes.grid}
          >
            {testimonials.map((testimonial, index) => (
              <Paper
                key={index}
                className={classes.testimonialCard}
                shadow="md"
                p="xl"
                withBorder
              >
                <Stack gap="md">
                  <Group gap="xs">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill="var(--mantine-color-yellow-6)"
                        color="var(--mantine-color-yellow-6)"
                      />
                    ))}
                  </Group>
                  <Text size="sm" lh={1.7} c="dimmed">
                    &ldquo;{testimonial.content}&rdquo;
                  </Text>
                  <Group gap="sm" mt="auto">
                    <Avatar color="blue" radius="xl" size="md">
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Text size="sm" fw={600}>
                        {testimonial.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {testimonial.role}
                      </Text>
                    </Box>
                  </Group>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
