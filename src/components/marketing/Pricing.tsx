import { Section, Heading, Text, Button, Badge } from "@/components/ui";

type CTAButton = {
  label: string;
  href?: string;
  target?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
};

export type PricingPlan = {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features?: string[];
  badge?: string;
  popular?: boolean;
  cta?: CTAButton;
};

export interface PricingProps {
  id?: string;
  title?: string;
  description?: string;
  note?: string;
  plans?: PricingPlan[];
  className?: string;
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for experiments and hobby projects.",
    features: [
      "Unlimited previews",
      "Starter analytics",
      "Community support",
      "Up to 5 projects",
    ],
    cta: { label: "Get Started" },
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Unlock collaboration and advanced controls.",
    features: [
      "Everything in Starter",
      "Priority support",
      "API + webhooks",
      "Unlimited projects",
      "Team roles",
    ],
    badge: "Most Popular",
    popular: true,
    cta: { label: "Start Free Trial" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Bring your own requirements and security checklist.",
    features: [
      "Dedicated manager",
      "Custom contracts",
      "SOC 2 toolkit",
      "SLA & training",
      "Onboarding support",
    ],
    cta: { label: "Contact Sales" },
  },
];

export default function Pricing({
  id = "pricing",
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that fits your needs. Every tier is optional, so feel free to remove or rename them.",
  note = "Start free and upgrade as you grow.",
  plans = defaultPlans,
  className = "bg-surface/30",
}: PricingProps = {}) {
  if (plans.length === 0) {
    return null;
  }

  return (
    <Section id={id} spacing="xl" className={className}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="text-3xl lg:text-4xl mb-4">
            {title}
          </Heading>
          {description && (
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto mb-8">
              {description}
            </Text>
          )}
          {note && (
            <Text size="sm" variant="muted">
              {note}
            </Text>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-surface rounded-2xl p-8 border transition-all hover:shadow-xl ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    {plan.badge ?? "Most Popular"}
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <Heading level={3} className="text-2xl mb-2">
                  {plan.name}
                </Heading>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                {plan.description && (
                  <Text variant="muted" className="text-sm">
                    {plan.description}
                  </Text>
                )}
              </div>

              {plan.features?.length ? (
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={`${plan.name}-${feature}-${featureIndex}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <Text size="sm">{feature}</Text>
                    </div>
                  ))}
                </div>
              ) : null}

              {plan.cta && (
                <Button
                  variant={
                    plan.cta.variant ?? (plan.popular ? "primary" : "outline")
                  }
                  className="w-full"
                  size="lg"
                  as={plan.cta.href ? "link" : "button"}
                  href={plan.cta.href}
                  target={plan.cta.target}
                >
                  {plan.cta.label}
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Text size="sm" variant="muted">
            All plans include the shared UI primitives from this starter. Add or
            remove tiers as needed.
          </Text>
        </div>
      </div>
    </Section>
  );
}
