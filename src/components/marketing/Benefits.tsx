import { Section, Heading, Text, Card } from "@/components/ui";

export default function Benefits() {
  const benefits = [
    {
      icon: "⚡",
      title: "Fast & Reliable",
      description:
        "Experience lightning-fast performance with 99.9% uptime guarantee.",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description:
        "Your data is protected with enterprise-grade security and privacy controls.",
    },
    {
      icon: "🎯",
      title: "Easy to Use",
      description:
        "Intuitive interface designed for both beginners and power users.",
    },
    {
      icon: "📈",
      title: "Scalable Solution",
      description: "Grows with your business from startup to enterprise scale.",
    },
    {
      icon: "🤝",
      title: "24/7 Support",
      description:
        "Get help when you need it with our dedicated customer support team.",
    },
    {
      icon: "🌍",
      title: "Global Reach",
      description:
        "Connect with users worldwide with our international infrastructure.",
    },
  ];

  return (
    <Section id="features" spacing="xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="text-3xl lg:text-4xl mb-4">
            Why Choose Our Platform?
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
            Discover the features that make us the best choice for your needs.
          </Text>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
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
