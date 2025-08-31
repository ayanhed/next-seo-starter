import React from "react";
import Section from "./Section";
import Container from "./Container";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import Heading from "./Heading";
import Text from "./Text";

interface CallToActionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
  className,
}) => {
  return (
    <Section className={className}>
      <Container>
        <Heading level={4}>{title}</Heading>
        {description && <Text variant="muted">{description}</Text>}
        <Button icon={ArrowRight} iconPosition="right">
          <a href={buttonHref}>{buttonText}</a>
        </Button>
      </Container>
    </Section>
  );
};

export default CallToAction;
