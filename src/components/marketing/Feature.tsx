import { Card, Heading, Text } from "@/components/ui";

type FeatureProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export function Feature({ title, description, icon }: FeatureProps) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        {icon && <div aria-hidden="true">{icon}</div>}
        <div>
          <Heading level={4}>{title}</Heading>
          <Text variant="muted">{description}</Text>
        </div>
      </div>
    </Card>
  );
}
