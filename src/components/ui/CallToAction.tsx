import React from "react";
import Section from "./Section";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import Heading from "./Heading";
import Text from "./Text";

interface CallToActionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
}) => {
  return (
    <Section className="bg-surface/50 border border-border rounded-2xl p-6 space-y-4">
      <Heading level={4}>{title}</Heading>
      {description && <Text variant="muted">{description}</Text>}
      <Button icon={ArrowRight} iconPosition="right">
        <a href={buttonHref}>{buttonText}</a>
      </Button>
    </Section>
  );
};

export default CallToAction;
