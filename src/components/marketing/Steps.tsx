import { Card, Heading, Text, Section } from "@/components/ui";

type Step = {
  title: string;
  description: string;
  icon?: string;
};

export function Steps({ steps }: { steps: Step[] }) {
  return (
    <Section id="how-it-works" spacing="xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="text-3xl lg:text-4xl mb-4">
            Get Started in 3 Steps
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
            Quick. Simple. Powerful.
          </Text>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-8 max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 relative">
              {/* Step number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-lg font-bold relative z-10">
                  {index + 1}
                </div>
              </div>

              {/* Vertical connector line */}
              {index < steps.length - 1 && (
                <div
                  className="absolute left-[23px] top-12 w-0.5 bg-border z-0"
                  style={{ height: "calc(100% + 2rem)" }}
                />
              )}

              {/* Content */}
              <div className="flex-1">
                <Card className="p-4">
                  {step.icon && (
                    <div className="text-2xl mb-3">{step.icon}</div>
                  )}
                  <Heading level={3} className="text-lg mb-2">
                    {step.title}
                  </Heading>
                  <Text variant="muted" className="text-sm">
                    {step.description}
                  </Text>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block relative">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Step number */}
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 relative z-10">
                  {index + 1}
                </div>

                <Card className="p-6 h-full">
                  {step.icon && (
                    <div className="text-3xl mb-4">{step.icon}</div>
                  )}
                  <Heading level={3} className="text-xl mb-3">
                    {step.title}
                  </Heading>
                  <Text variant="muted">{step.description}</Text>
                </Card>
              </div>
            ))}
          </div>

          {/* Horizontal connector lines for desktop */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-border z-0">
            <div className="max-w-4xl mx-auto relative h-full">
              <div className="absolute left-[16.67%] right-[16.67%] h-full bg-border"></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
