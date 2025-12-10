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
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content:
      "This platform has completely transformed how we work. The productivity gains are incredible, and our team loves using it every day.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Product Manager, InnovateCo",
    content:
      "Best investment we've made this year. The features are exactly what we needed, and the support team is outstanding.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, GrowthLab",
    content:
      "I was skeptical at first, but this exceeded all expectations. It's intuitive, powerful, and has saved us countless hours.",
    rating: 5,
    avatar: "ER",
  },
];

export default function Testimonials() {
  return (
    <Box id="testimonials" className={classes.wrapper}>
      <Container size="xl" py={{ base: 60, md: 100 }}>
        <Stack gap="xl" align="center">
          <Title className={classes.title} order={2} ta="center">
            Loved by people worldwide
          </Title>
          <Text c="dimmed" size="lg" ta="center" maw={700}>
            Place it next to pricing to help with conversions. People feel
            relieved to see other people happy with their purchase. The more
            testimonials, the better.
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
                radius="lg"
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
                    "{testimonial.content}"
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

