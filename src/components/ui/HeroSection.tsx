import React from "react";
import Section from "./Section";
import Heading from "./Heading";
import Text from "./Text";
import Stack from "./Stack";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <Section spacing="lg" className={`text-center ${className}`}>
      <Heading level={1}>{title}</Heading>
      {subtitle && (
        <Text variant="muted" align="center" className="max-w-3xl mx-auto">
          {subtitle}
        </Text>
      )}
      <Stack spacing="lg">{children}</Stack>
    </Section>
  );
};

export default HeroSection;
