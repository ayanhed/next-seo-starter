import { Section, Heading, Text, Button } from "@/components/ui";

export default function FinalCTA() {
  return (
    <Section spacing="xl" className="relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <Heading level={2} className="text-3xl lg:text-5xl font-bold">
              Ready to Get Started?
            </Heading>
            <Text size="xl" variant="muted" className="max-w-2xl mx-auto">
              Join thousands of users who are already using our platform to
              build amazing projects and achieve their goals.
            </Text>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="primary" className="text-lg px-8 py-4">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div>

          <div className="pt-8">
            <Text size="sm" variant="muted">
              Free trial available • Join thousands of users
            </Text>
          </div>
        </div>
      </div>
    </Section>
  );
}
