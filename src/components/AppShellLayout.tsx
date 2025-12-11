"use client";

import { AppShell, rem } from "@mantine/core";
import Navigation from "../app/(public)/components/Navigation";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell header={{ height: 68 }}>
      <AppShell.Header>
        <Navigation />
      </AppShell.Header>
      <AppShell.Main pt={`calc(${rem(68)})`}>{children}</AppShell.Main>
    </AppShell>
  );
}
