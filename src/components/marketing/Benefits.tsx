import type { ReactNode } from "react";
import { Section, Heading, Text, Card } from "@/components/ui";
import { Zap, Lock, Target, TrendingUp, Users, Globe } from "lucide-react";

export type BenefitItem = {
  icon?: ReactNode;
  title: string;
  description: string;
};

export interface BenefitsProps {
  id?: string;
  title?: string;
  description?: string;
  items?: BenefitItem[];
  className?: string;
  gridClassName?: string;
}

const defaultBenefits: BenefitItem[] = [
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Fast & Reliable",
    description:
      "Experience lightning-fast performance with 99.9% uptime guarantee.",
  },
  {
    icon: <Lock className="w-10 h-10" />,
    title: "Secure & Private",
    description:
      "Your data is protected with enterprise-grade security and privacy controls.",
  },
  {
    icon: <Target className="w-10 h-10" />,
    title: "Easy to Use",
    description:
      "Intuitive interface designed for both beginners and power users.",
  },
  {
    icon: <TrendingUp className="w-10 h-10" />,
    title: "Scalable Solution",
    description: "Grows with your business from startup to enterprise scale.",
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "24/7 Support",
    description:
      "Get help when you need it with our dedicated customer support team.",
  },
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Global Reach",
    description:
      "Connect with users worldwide with our international infrastructure.",
  },
];

export default function Benefits({
  id = "features",
  title = "Why Choose This Starter?",
  description = "Mix and match these cards with your own content, or override them entirely via props.",
  items = defaultBenefits,
  className = "",
  gridClassName = "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
}: BenefitsProps = {}) {
  return (
    <Section id={id} spacing="xl" className={className}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="text-3xl lg:text-4xl mb-4">
            {title}
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
            {description}
          </Text>
        </div>

        <div className={gridClassName}>
          {items.map((benefit, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4 text-[var(--color-primary)]">
                {benefit.icon}
              </div>
              <Heading level={3} className="text-xl mb-3">
                {benefit.title}
              </Heading>
              <Text variant="muted">{benefit.description}</Text>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
