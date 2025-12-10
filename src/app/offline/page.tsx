import { Center, ThemeIcon, Stack, Title, Text, Box } from "@mantine/core";
import { Metadata } from "next";
import { WifiOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Offline",
  description: "You're offline",
};

export default function OfflinePage() {
  return (
    <Box>
      <Center mih="80vh" px="md">
        <Stack gap="lg" align="center" style={{ maxWidth: 420 }}>
          <ThemeIcon color="yellow" size={72} radius="xl" variant="light">
            <WifiOff size={32} />
          </ThemeIcon>

          <Title order={1} ta="center">
            You&apos;re Offline
          </Title>

          <Text size="lg" c="dimmed" ta="center">
            Check your internet connection and try again.
          </Text>
        </Stack>
      </Center>
    </Box>
  );
}
