import { Section, Text } from "@/components/ui";

export default function Partners() {
  const partners = [
    "Google",
    "Microsoft",
    "Amazon",
    "Apple",
    "Meta",
    "Netflix",
    "Spotify",
    "Slack",
    "Zoom",
  ];

  return (
    <Section className="border-y border-border bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <Text size="sm" variant="muted" className="text-center mb-8">
          Trusted by leading companies
        </Text>

        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            >
              <div className="w-16 h-16 bg-border rounded-lg flex items-center justify-center">
                <Text size="xs" className="font-semibold text-center px-2">
                  {partner}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
