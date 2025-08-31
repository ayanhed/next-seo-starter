"use client";

import { useState } from "react";
import {
  Alert,
  Animate,
  Badge,
  Button,
  CallToAction,
  Card,
  Checkbox,
  Container,
  Grid,
  Heading,
  HeroSection,
  Icon as IconWrapper,
  Input,
  Link as LinkComponent,
  Section,
  Select,
  Stack,
  StaggeredLayout,
  Text,
  Textarea,
  ThemeToggle,
} from "@/components/ui";
import Modal from "@/components/ui/Modal";
import JsonLd, { JsonLdScript } from "@/components/JsonLd";
import PushNotificationManager from "@/components/PushNotificationManager";
import ThemeColorMeta from "@/components/ThemeColorMeta";
import ThemeShowcase from "@/components/ThemeShowcase";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import TextType from "@/components/ui/TextType";

export default function AllComponentsDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectValue, setSelectValue] = useState<string | undefined>();

  const jsonldData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "All Components Demo",
    url: "https://example.com",
  } as const;

  return (
    <div className="w-full">
      {/* Page-level helpers */}
      <PushNotificationManager />
      <ThemeColorMeta />
      <JsonLd data={jsonldData} />

      <HeroSection
        title="All Components Demo"
        subtitle="A quick showcase of available UI primitives and helpers."
        className="pt-8"
      >
        <Stack
          direction="horizontal"
          justify="center"
          align="center"
          spacing="md"
        >
          <Button
            size="lg"
            variant="primary"
            icon={ArrowRight}
            iconPosition="right"
          >
            Primary CTA
          </Button>
          <ThemeToggle />
        </Stack>
      </HeroSection>

      <Section>
        <Container>
          <Stack spacing="xl">
            {/* Theme Showcase */}
            <Heading level={2}>Theme</Heading>
            <ThemeShowcase />

            {/* CallToAction */}
            <Heading level={2}>CallToAction</Heading>
            <Card>
              <CallToAction
                title="Ready to explore?"
                description="This is a compact callout showcasing the CTA component."
                buttonText="Learn more"
                buttonHref="#"
              />
            </Card>

            {/* Typography */}
            <Heading level={2}>Typography</Heading>
            <Card>
              <Stack>
                <Heading level={1}>Heading 1</Heading>
                <Heading level={2}>Heading 2</Heading>
                <Heading level={3}>Heading 3</Heading>
                <Text size="lg">Body Large</Text>
                <Text>Body Default</Text>
                <Text size="sm" variant="muted">
                  Muted small text
                </Text>
                <TextType
                  className="mt-2"
                  text={["Typing effect demo", "Supports multiple phrases"]}
                  typingSpeed={40}
                  deletingSpeed={20}
                  pauseDuration={1200}
                />
              </Stack>
            </Card>

            {/* Buttons, Badges, Links */}
            <Heading level={2}>Buttons, Badges, Links</Heading>
            <Card>
              <Stack>
                <Stack direction="horizontal" wrap>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="outline">Outline</Button>
                  <Button size="sm">Small</Button>
                  <Button size="lg" icon={ArrowRight} iconPosition="right">
                    With Icon
                  </Button>
                </Stack>
                <Stack direction="horizontal" wrap>
                  <Badge>Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                </Stack>
                <Stack direction="horizontal" wrap>
                  <LinkComponent href="#">Default link</LinkComponent>
                  <LinkComponent href="#" variant="underline">
                    Underline link
                  </LinkComponent>
                  <LinkComponent href="#" variant="muted">
                    Muted link
                  </LinkComponent>
                </Stack>
              </Stack>
            </Card>

            {/* Forms */}
            <Heading level={2}>Forms</Heading>
            <Card>
              <Grid cols={3} responsive gap="lg">
                <Input label="Name" placeholder="Ada Lovelace" />
                <Textarea
                  label="Message"
                  placeholder="Write something..."
                  rows={3}
                />
                <Select
                  label="Language"
                  value={selectValue}
                  onChange={(v) => setSelectValue(v)}
                  options={[
                    { value: "ts", label: "TypeScript" },
                    { value: "js", label: "JavaScript" },
                    { value: "go", label: "Go" },
                  ]}
                />
                <Checkbox
                  label="Accept terms"
                  checked={checkboxChecked}
                  onChange={setCheckboxChecked}
                />
              </Grid>
            </Card>

            {/* Feedback */}
            <Heading level={2}>Feedback</Heading>
            <Card>
              <Stack>
                <Alert title="Heads up" variant="info">
                  Informational alert
                </Alert>
                <Alert title="Success" variant="success">
                  Your changes have been saved
                </Alert>
                <Alert title="Warning" variant="warning">
                  Please double-check the form
                </Alert>
                <Alert title="Error" variant="error">
                  Something went wrong
                </Alert>
              </Stack>
            </Card>

            {/* Layout and Motion */}
            <Heading level={2}>Layout and Motion</Heading>
            <Card>
              <Stack spacing="md">
                <StaggeredLayout>
                  <Card className="bg-[var(--color-surface)]">
                    <Text>Staggered item 1</Text>
                  </Card>
                  <Card className="bg-[var(--color-surface)]">
                    <Text>Staggered item 2</Text>
                  </Card>
                  <Card className="bg-[var(--color-surface)]">
                    <Text>Staggered item 3</Text>
                  </Card>
                </StaggeredLayout>
                <Animate type="slideUp">
                  <Text>Animated content (slide up)</Text>
                </Animate>
              </Stack>
            </Card>

            {/* Icons */}
            <Card>
              <Heading level={2}>Icons</Heading>
              <Stack direction="horizontal" wrap>
                <IconWrapper icon={Star} className="text-yellow-400" />
                <IconWrapper icon={CheckCircle} className="text-green-500" />
                <IconWrapper icon={ArrowRight} />
              </Stack>
            </Card>

            {/* Modal */}
            <Heading level={2}>Modal</Heading>
            <Card>
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
              <Modal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                title="Demo Modal"
              >
                <Stack>
                  <Heading level={3}>Hello from Modal</Heading>
                  <Text>
                    This is a simple modal using Radix + framer-motion.
                  </Text>
                  <Button
                    variant="secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </Button>
                </Stack>
              </Modal>
            </Card>
          </Stack>
        </Container>
      </Section>

      {/* Alternate JSON-LD injection */}
      <JsonLdScript data={jsonldData} />
    </div>
  );
}
