"use client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "@/config/theme";
import "../../instrumentation-client";

/**
 * Root Providers Component
 *
 * Wraps the app with Mantine theme provider and notifications.
 * The theme supports both light and dark color schemes.
 * Users can toggle between schemes using the ThemeToggle component.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  );
}
