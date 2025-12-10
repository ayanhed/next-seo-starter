"use client";

"use client";

import Link from "next/link";
import {
  Container,
  Group,
  Stack,
  Text,
  Anchor,
  Box,
  Divider,
  SimpleGrid,
  ActionIcon,
  TextInput,
  Button,
  rem,
} from "@mantine/core";
import { appConfig } from "@/config/app";
import { Github, Twitter, Linkedin, Mail, ArrowUp } from "lucide-react";
import { useState } from "react";

const footerLinks = {
  product: [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "License", href: "/license" },
  ],
};

const currentYear = new Date().getFullYear();

export default function Footer() {
  const social = appConfig.branding.social;
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <Box
      component="footer"
      style={{
        borderTop: `${rem(1)} solid var(--mantine-color-gray-3)`,
        marginTop: "auto",
        background: "var(--mantine-color-gray-0)",
      }}
    >
      <Container size="xl" py={{ base: rem(48), sm: rem(64) }}>
        <Stack gap={rem(48)}>
          {/* Main Footer Content */}
          <SimpleGrid
            cols={{ base: 1, xs: 2, sm: 2, md: 5 }}
            spacing={{ base: rem(32), sm: rem(40) }}
          >
            {/* Brand Section */}
            <Stack gap="md">
              <Box>
                <Text
                  fw={800}
                  size="xl"
                  c="var(--mantine-color-primary-6)"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {appConfig.app.name}
                </Text>
                <Text size="sm" c="dimmed" mt="xs" lh={1.6}>
                  {appConfig.app.description}
                </Text>
              </Box>

              {/* Social Links */}
              {(social?.github || social?.twitter || social?.linkedin) && (
                <Group gap="xs" mt="xs">
                  {social.github && (
                    <ActionIcon
                      component="a"
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      size="lg"
                      variant="subtle"
                      color="gray"
                      style={{
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Github size={20} />
                    </ActionIcon>
                  )}
                  {social.twitter && (
                    <ActionIcon
                      component="a"
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      size="lg"
                      variant="subtle"
                      color="gray"
                      style={{
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Twitter size={20} />
                    </ActionIcon>
                  )}
                  {social.linkedin && (
                    <ActionIcon
                      component="a"
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      size="lg"
                      variant="subtle"
                      color="gray"
                      style={{
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Linkedin size={20} />
                    </ActionIcon>
                  )}
                  <ActionIcon
                    component="a"
                    href="mailto:contact@example.com"
                    aria-label="Email"
                    size="lg"
                    variant="subtle"
                    color="gray"
                    style={{
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Mail size={20} />
                  </ActionIcon>
                </Group>
              )}
            </Stack>

            {/* Product Links */}
            <Stack gap="md">
              <Text fw={600} size="sm" tt="uppercase" c="dark" lh={1}>
                Product
              </Text>
              <Stack gap={rem(8)}>
                {footerLinks.product.map((link) => (
                  <Anchor
                    key={link.label}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c="dimmed"
                    underline="never"
                    style={{
                      transition: "color 0.2s ease",
                      fontWeight: 500,
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>

            {/* Company Links */}
            <Stack gap="md">
              <Text fw={600} size="sm" tt="uppercase" c="dark" lh={1}>
                Company
              </Text>
              <Stack gap={rem(8)}>
                {footerLinks.company.map((link) => (
                  <Anchor
                    key={link.label}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c="dimmed"
                    underline="never"
                    style={{
                      transition: "color 0.2s ease",
                      fontWeight: 500,
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>

            {/* Legal Links */}
            <Stack gap="md">
              <Text fw={600} size="sm" tt="uppercase" c="dark" lh={1}>
                Legal
              </Text>
              <Stack gap={rem(8)}>
                {footerLinks.legal.map((link) => (
                  <Anchor
                    key={link.label}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c="dimmed"
                    underline="never"
                    style={{
                      transition: "color 0.2s ease",
                      fontWeight: 500,
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>

            {/* Newsletter Section */}
            <Stack gap="md">
              <Text fw={600} size="sm" tt="uppercase" c="dark" lh={1}>
                Newsletter
              </Text>
              <Text size="sm" c="dimmed" lh={1.6}>
                Stay updated with our latest news and updates.
              </Text>
              <form onSubmit={handleNewsletterSubmit}>
                <Stack gap="sm">
                  <TextInput
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                    size="sm"
                  />
                  <Button type="submit" variant="gradient" fullWidth size="sm">
                    Subscribe
                  </Button>
                </Stack>
              </form>
            </Stack>
          </SimpleGrid>

          <Divider color="gray.2" />

          {/* Bottom Bar */}
          <Group justify="space-between" align="center" wrap="wrap" gap="md">
            <Group gap="xs" wrap="wrap">
              <Text size="sm" c="dimmed" fw={500}>
                © {currentYear} {appConfig.app.name}.
              </Text>
              <Text size="sm" c="dimmed">
                All rights reserved.
              </Text>
            </Group>

            <Group gap="lg" wrap="wrap">
              {appConfig.app.authors.length > 0 && (
                <Text size="sm" c="dimmed" fw={500}>
                  Built by{" "}
                  <Text
                    component="span"
                    c="var(--mantine-color-primary-6)"
                    inherit
                  >
                    {appConfig.app.authors.map((a) => a.name).join(", ")}
                  </Text>
                </Text>
              )}

              <ActionIcon
                onClick={scrollToTop}
                size="lg"
                variant="light"
                color="gray"
                aria-label="Scroll to top"
                style={{
                  transition: "all 0.2s ease",
                }}
              >
                <ArrowUp size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
