import { Metadata } from "next";
import { Section, Container, Heading, Text, Stack } from "@/components/ui";
import { WifiOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Offline",
  description: "You're offline",
};

export default function OfflinePage() {
  return (
    <Section
      spacing="lg"
      className="min-h-screen flex items-center justify-center text-center"
    >
      <Container>
        <Stack spacing="lg" className="text-center max-w-md mx-auto">
          <div className="flex justify-center mb-4 w-full">
            <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center">
              <WifiOff className="w-8 h-8 text-warning" />
            </div>
          </div>

          <Heading level={1} className="mb-4 w-full">
            You&apos;re Offline
          </Heading>

          <Text size="lg" variant="muted" align="center" className="w-full">
            Check your internet connection and try again.
          </Text>
        </Stack>
      </Container>
    </Section>
  );
}
