import type { ReactNode } from "react";
import { Section, Heading, Text, Button } from "@/components/ui";

type CTAButton = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "outline";
};

export interface FinalCTAProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: CTAButton | null;
  secondaryCta?: CTAButton | null;
  footnote?: string;
  className?: string;
  children?: ReactNode;
}

export default function FinalCTA({
  id = "cta",
  eyebrow = "Launch faster",
  title = "Ready to get started?",
  description = "Drop in your favorite authentication provider, connect your data, and ship.",
  primaryCta = { label: "Get Started Free" },
  secondaryCta = { label: "Chat with us", variant: "outline" },
  footnote = "Free trial available • Customize every section",
  className = "",
  children,
}: FinalCTAProps = {}) {
  return (
    <Section
      id={id}
      spacing="xl"
      className={`relative overflow-hidden ${className}`.trim()}
    >
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-2">
            {eyebrow && (
              <Text size="sm" variant="muted" className="uppercase tracking-wide">
                {eyebrow}
              </Text>
            )}
            <Heading level={2} className="text-3xl lg:text-5xl font-bold">
              {title}
            </Heading>
            {description && (
              <Text size="xl" variant="muted" className="max-w-2xl mx-auto">
                {description}
              </Text>
            )}
          </div>

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {primaryCta && (
                <Button
                  size="lg"
                  variant={primaryCta.variant ?? "primary"}
                  className="text-lg px-8 py-4"
                  as={primaryCta.href ? "a" : "button"}
                  href={primaryCta.href}
                  onClick={primaryCta.onClick}
                >
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  size="lg"
                  variant={secondaryCta.variant ?? "outline"}
                  className="text-lg px-8 py-4"
                  as={secondaryCta.href ? "a" : "button"}
                  href={secondaryCta.href}
                  onClick={secondaryCta.onClick}
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}

          {children}

          {footnote && (
            <div className="pt-4">
              <Text size="sm" variant="muted">
                {footnote}
              </Text>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
