import { Section, Heading, Text, Button, Badge } from "@/components/ui";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for getting started",
      features: [
        "Basic features included",
        "Community support",
        "Standard response time",
        "Up to 5 projects",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For growing teams and projects",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "Team collaboration",
        "API access",
        "Custom integrations",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Advanced security",
        "Dedicated support",
        "Custom deployment",
        "White-label options",
        "SLA guarantee",
        "Training & onboarding",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <Section id="pricing" spacing="xl" className="bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="text-3xl lg:text-4xl mb-4">
            Simple, Transparent Pricing
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto mb-8">
            Choose the plan that fits your needs. All plans include our core
            features with no hidden fees.
          </Text>
          <Text size="sm" variant="muted">
            Start free and upgrade as you grow.
          </Text>
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
                    Most Popular
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
                  <span className="text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                <Text variant="muted" className="text-sm">
                  {plan.description}
                </Text>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <Text size="sm">{feature}</Text>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? "primary" : "outline"}
                className="w-full"
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Text size="sm" variant="muted">
            All plans include our core features. Upgrade or downgrade anytime.
          </Text>
        </div>
      </div>
    </Section>
  );
}
