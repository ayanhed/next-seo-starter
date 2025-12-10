"use client";

import { AppShell, rem } from "@mantine/core";
import Navigation from "../app/(public)/components/Navigation";
import { useHeadroom } from "@mantine/hooks";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pinned = useHeadroom({ fixedAt: 120 });
  return (
    <AppShell header={{ height: 68, collapsed: !pinned, offset: false }}>
      <AppShell.Header>
        <Navigation />
      </AppShell.Header>
      <AppShell.Main pt={`calc(${rem(68)})`}>{children}</AppShell.Main>
    </AppShell>
  );
}
