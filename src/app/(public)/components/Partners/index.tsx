"use client";

import { Container, Text, Group, Box } from "@mantine/core";
import Image from "next/image";
import classes from "./style.module.css";

// Placeholder for partner logos - replace with actual logos
const partners = [
  { name: "Company 1", logo: "/logo.png" },
  { name: "Company 2", logo: "/logo.png" },
  { name: "Company 3", logo: "/logo.png" },
  { name: "Company 4", logo: "/logo.png" },
  { name: "Company 5", logo: "/logo.png" },
  { name: "Company 6", logo: "/logo.png" },
  { name: "Company 7", logo: "/logo.png" },
  { name: "Company 8", logo: "/logo.png" },
];

export default function Partners() {
  return (
    <Box id="services" className={classes.wrapper}>
      <Container size="xl" py={{ base: 40, md: 60 }}>
        <Text ta="center" fw={600} size="lg" mb="xl" c="dimmed">
          Trusted by employees at:
        </Text>
        <Group justify="center" gap="xl" wrap="wrap">
          {partners.map((partner, index) => (
            <Box
              key={index}
              className={classes.logoWrapper}
              style={{
                opacity: 0.6,
                filter: "grayscale(100%)",
                transition: "all 0.3s ease",
              }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={40}
                className={classes.logo}
              />
            </Box>
          ))}
        </Group>
      </Container>
    </Box>
  );
}
