"use client";

import {
  Burger,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Anchor,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import classes from "./style.module.css";
import Link from "next/link";
import { appConfig } from "@/config/app";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    closeDrawer();
  };

  const navLinks = [
    { label: "Stack", href: "/#services" },
    { label: "Workflow", href: "/#how-it-works" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Paths", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <>
      <div className={classes.header}>
        <Group justify="space-between" h="100%">
          <Anchor
            component={Link}
            href="/"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Text size="xl" fw="bold">
              {appConfig.app.name}
            </Text>
          </Anchor>

          <Group h="100%" gap={0} visibleFrom="sm">
            {navLinks.map((link) => (
              <Anchor key={link.href} href={link.href} className={classes.link}>
                {link.label}
              </Anchor>
            ))}
          </Group>

          <Group visibleFrom="sm" gap="sm">
            <ThemeToggle />
            <Button onClick={() => router.push("/login")} variant="gradient">
              Open demo
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </div>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          {navLinks.map((link) => (
            <Anchor key={link.href} href={link.href} className={classes.link}>
              {link.label}
            </Anchor>
          ))}

          <Group justify="center" grow pb="xl" px="md" mt="xl" gap="md">
            <ThemeToggle />
            <Button
              onClick={() => router.push("/login")}
              variant="gradient"
              fullWidth
            >
              Open demo
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}
