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
  Grid,
  Heading,
  HeroSection,
  Icon,
  Input,
  Link as UiLink,
  Modal,
  Section,
  Select,
  Stack,
  Text,
  Textarea,
} from "@/components/ui";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Mail,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";

const planOptions = [
  { value: "starter", label: "Starter" },
  { value: "growth", label: "Growth" },
  { value: "enterprise", label: "Enterprise" },
];

const alertShowcase = [
  {
    variant: "success" as const,
    title: "Success state",
    message: "Everything worked exactly as expected.",
  },
  {
    variant: "warning" as const,
    title: "Heads up",
    message: "You have a few tasks that need attention.",
  },
  {
    variant: "error" as const,
    title: "Something failed",
    message: "There was a problem while processing your request.",
  },
  {
    variant: "info" as const,
    title: "Did you know?",
    message: "All components share the same semantic token system.",
  },
];

const badgeShowcase = [
  { label: "Default", variant: "default" as const },
  { label: "Primary", variant: "primary" as const },
  { label: "Secondary", variant: "secondary" as const },
  { label: "Success", variant: "success" as const },
  { label: "Warning", variant: "warning" as const },
  { label: "Destructive", variant: "destructive" as const },
];

export default function UiShowcasePage() {
  const [selectedPlan, setSelectedPlan] = useState(planOptions[0].value);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);

  return (
    <div className="space-y-16 pb-20">
      <HeroSection
        title="UI Components Playground"
        subtitle="Preview each building block in isolation. Everything below is composed with the primitives that live in src/components/ui."
        className="container mx-auto px-4"
      >
        <Stack
          direction="horizontal"
          wrap
          spacing="sm"
          justify="center"
          className="w-full"
        >
          <Button icon={Sparkles} size="lg">
            Primary action
          </Button>
          <Button
            variant="ghost"
            icon={ArrowRight}
            iconPosition="right"
            size="lg"
          >
            Browse code
          </Button>
        </Stack>
        <Stack
          direction="horizontal"
          wrap
          spacing="sm"
          justify="center"
          className="w-full"
        >
          <Badge variant="success" size="sm">
            Accessible
          </Badge>
          <Badge variant="warning" size="sm">
            Theme ready
          </Badge>
          <Badge variant="secondary" size="sm">
            Composable
          </Badge>
        </Stack>
      </HeroSection>

      <Section className="container mx-auto px-4">
        <Stack spacing="sm">
          <Heading level={2} className="mb-0">
            Buttons & Badges
          </Heading>
          <Text variant="muted">
            Combine states, icons, pill styles, and full-width actions for any
            CTA scenario.
          </Text>
        </Stack>

        <Grid cols={2} gap="lg" className="mt-8">
          <Card className="space-y-6">
            <Heading level={4}>Buttons</Heading>
            <Stack spacing="md">
              <Stack direction="horizontal" spacing="sm" wrap>
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </Stack>
              <Stack direction="horizontal" spacing="sm" wrap>
                <Button icon={Mail}>With icon</Button>
                <Button icon={ArrowRight} iconPosition="right">
                  Trailing icon
                </Button>
                <Button pill variant="primary">
                  Pill button
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Star}
                  aria-label="Favorite"
                />
              </Stack>
              <Button fullWidth size="lg">
                Full width action
              </Button>
            </Stack>
          </Card>

          <Card className="space-y-6">
            <Heading level={4} className="mb-0">
              Badges
            </Heading>
            <Stack spacing="sm">
              <Text variant="muted">
                Use badges to highlight statuses or filters.
              </Text>
              <Stack direction="horizontal" spacing="sm" wrap>
                {badgeShowcase.map((badge) => (
                  <Badge key={badge.label} variant={badge.variant}>
                    {badge.label}
                  </Badge>
                ))}
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Section>

      <Section className="container mx-auto px-4">
        <Stack spacing="sm">
          <Heading level={2} className="mb-0">
            Form Elements
          </Heading>
          <Text variant="muted">
            Inputs, selects, and checkboxes share spacing, focus rings, and
            helper text styles.
          </Text>
        </Stack>

        <Grid cols={2} gap="lg" className="mt-8">
          <Card className="space-y-6">
            <Stack spacing="md">
              <Input
                label="Email"
                placeholder="you@example.com"
                helperText="We will never spam you."
              />
              <Input
                label="Website"
                placeholder="https://"
                error="This URL looks invalid."
              />
              <Select
                label="Plan"
                value={selectedPlan}
                onChange={(value) => setSelectedPlan(value)}
                options={planOptions}
                helperText="Switch between Starter, Growth, or Enterprise."
              />
            </Stack>
          </Card>

          <Card className="space-y-6">
            <Stack spacing="md">
              <Textarea
                label="Project brief"
                rows={4}
                placeholder="Tell us more about what you are building..."
                helperText="Max 500 characters."
              />
              <Checkbox
                label="Send me product updates"
                checked={newsletterOptIn}
                onChange={(checked) => setNewsletterOptIn(Boolean(checked))}
                helperText="No weekly spam — only launches and important fixes."
              />
            </Stack>
          </Card>
        </Grid>
      </Section>

      <Section className="container mx-auto px-4">
        <Stack spacing="sm">
          <Heading level={2}>Feedback & Overlays</Heading>
          <Text variant="muted">
            Alerts, modals, and CTA blocks reuse the same colors, typography,
            and spacing scale.
          </Text>
        </Stack>

        <Grid cols={2} gap="lg" className="mt-8">
          <Card className="space-y-4">
            <Stack spacing="sm">
              {alertShowcase.map((alert) => (
                <Alert
                  key={alert.variant}
                  variant={alert.variant}
                  title={alert.title}
                >
                  {alert.message}
                </Alert>
              ))}
            </Stack>
          </Card>

          <Card className="space-y-6">
            <Stack spacing="md">
              <Button icon={ArrowRight} onClick={() => setIsModalOpen(true)}>
                Open modal preview
              </Button>
              <Animate type="slideUp">
                <CallToAction
                  title="Ready to build?"
                  description="Drop the CTA anywhere — it inherits the surrounding Section spacing."
                  buttonText="Start a free trial"
                  buttonHref="#"
                />
              </Animate>
            </Stack>
          </Card>
        </Grid>

        <Modal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          title="UI Modal"
        >
          <Stack spacing="sm" className="text-center">
            <Heading level={4}>Layered modal experience</Heading>
            <Text variant="muted">
              Animations rely on framer-motion and Radix Dialog under the hood.
            </Text>
            <Stack direction="horizontal" spacing="sm" wrap justify="center">
              <Button onClick={() => setIsModalOpen(false)} icon={BadgeCheck}>
                Got it
              </Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Maybe later
              </Button>
            </Stack>
          </Stack>
        </Modal>
      </Section>

      <Section className="container mx-auto px-4">
        <Stack spacing="sm">
          <Heading level={2}>Layout, Typography & Icons</Heading>
          <Text variant="muted">
            Stack, Grid, Heading, Text, Link, Icon, and Animate combine to
            create rich layouts.
          </Text>
        </Stack>

        <Grid cols={2} gap="lg" className="mt-8">
          <Animate type="slideUp">
            <Card className="space-y-4">
              <Heading level={1}>Heading 1</Heading>
              <Heading level={2}>Heading 2</Heading>
              <Heading level={3}>Heading 3</Heading>
              <Heading level={4}>Heading 4</Heading>
              <Heading level={5}>Heading 5</Heading>
              <Heading level={6}>Heading 6</Heading>
              <Heading level={1} lead={1}>
                Lead 1
              </Heading>
              <Heading level={2} lead={2}>
                Lead 2
              </Heading>
              <Heading level={3} lead={3}>
                Lead 3
              </Heading>
            </Card>
          </Animate>
          <Animate type="slideUp">
            <Card className="space-y-4">
              <Text size="2xl">Text 2xl</Text>
              <Text size="xl">Text xl</Text>
              <Text size="lg">Text lg</Text>
              <Text size="md">Text md</Text>
              <Text size="sm">Text sm</Text>
              <Text size="xs">Text xs</Text>
            </Card>
          </Animate>
        </Grid>

        <Grid cols={2} gap="lg" className="mt-8">
          <Animate type="slideUp">
            <Card className="space-y-4">
              <Stack spacing="md" wrap>
                <Icon icon={BadgeCheck} size="2xl" />
                <Icon icon={Star} size="xl" />
                <Icon icon={BellRing} size="lg" />
                <Icon icon={Shield} size="md" />
                <Icon icon={Sparkles} size="sm" />
              </Stack>
            </Card>
          </Animate>
          <Animate type="slideUp">
            <Card className="space-y-4">
              <Stack spacing="sm">
                <UiLink href="#">Default link</UiLink>
                <UiLink href="#" variant="muted">
                  Muted link
                </UiLink>
                <UiLink href="#" variant="button">
                  External link
                </UiLink>
                <UiLink href="#" variant="underline">
                  Underlined link
                </UiLink>
              </Stack>
            </Card>
          </Animate>
        </Grid>
      </Section>
    </div>
  );
}
