"use client";
import { Section, Heading, Text, Button, Stack } from "@/components/ui";
import Image from "next/image";

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  socialProof?: {
    text: string;
    stats?: string;
  };
  className?: string;
}

export default function Hero({
  title = "Build Something Amazing",
  subtitle,
  description = "Create, collaborate, and scale your ideas with our powerful platform. Join thousands of users who trust us with their projects.",
  primaryCta = {
    text: "Get Started Free",
    href: "#",
  },
  secondaryCta = {
    text: "Learn More",
    href: "#",
  },
  backgroundImage,
  backgroundVideo,
  socialProof = {
    text: "Trusted by thousands of users worldwide",
    stats: "10k+ active users",
  },
  className = "",
}: HeroProps) {
  return (
    <Section
      spacing="xl"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Background Image or Video */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <Stack spacing="xl" align="center">
          {/* Title and Subtitle */}
          <Stack spacing="md" align="center">
            {subtitle && (
              <Text
                size="lg"
                variant="muted"
                className="uppercase tracking-wide"
              >
                {subtitle}
              </Text>
            )}
            <Heading
              level={1}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              {title}
            </Heading>
            <Text
              size="xl"
              variant="muted"
              className="max-w-3xl mx-auto leading-relaxed"
            >
              {description}
            </Text>
          </Stack>

          {/* CTAs */}
          <Stack
            direction="horizontal"
            spacing="md"
            align="center"
            justify="center"
            className="flex-col sm:flex-row"
          >
            {primaryCta.href ? (
              <Button
                size="lg"
                variant="primary"
                className="text-lg px-8 py-4 w-full sm:w-auto"
                as="a"
                href={primaryCta.href}
              >
                {primaryCta.text}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="primary"
                className="text-lg px-8 py-4 w-full sm:w-auto"
                onClick={primaryCta.onClick}
              >
                {primaryCta.text}
              </Button>
            )}

            {secondaryCta.href ? (
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 w-full sm:w-auto"
                as="a"
                href={secondaryCta.href}
              >
                {secondaryCta.text}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 w-full sm:w-auto"
                onClick={secondaryCta.onClick}
              >
                {secondaryCta.text}
              </Button>
            )}
          </Stack>

          {/* Social Proof */}
          {socialProof && (
            <Stack spacing="sm" align="center">
              <Text size="sm" variant="muted">
                {socialProof.text}
              </Text>
              {socialProof.stats && (
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5, 6].map((fileNumber) => (
                      <div
                        key={fileNumber}
                        className="w-8 h-8 rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-card)] flex items-center justify-center text-xs font-semibold"
                      >
                        {fileNumber}
                      </div>
                    ))}
                  </div>
                  <Text size="sm" variant="muted">
                    {socialProof.stats}
                  </Text>
                </div>
              )}
            </Stack>
          )}
        </Stack>
      </div>
    </Section>
  );
}
