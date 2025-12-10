"use client";

import { FAQItem } from "@/lib/jsonld";
import { Accordion, Container, Grid, Image, Title } from "@mantine/core";
import classes from "./style.module.css";

type FAQEntry = FAQItem & { highlights?: string[] };

export const faqItems: FAQEntry[] = [
  {
    question: "How do I update SEO metadata and social tags?",
    answer:
      "Edit src/config/app.ts. That single config feeds layouts, sitemap, robots.txt, manifest, and the JSON-LD helper so every metadata surface stays in sync.",
    highlights: ["src/config/app.ts"],
  },
  {
    question: "Do I need Postgres and Better Auth to use this?",
    answer:
      "The auth flows use Better Auth with Prisma and PostgreSQL out of the box. You can still use the marketing pages without a database, or swap the provider by updating the Prisma schema and env variables.",
  },
  {
    question: "How do I disable analytics?",
    answer:
      "PostHog only initializes when NEXT_PUBLIC_POSTHOG_KEY is set. Leave it empty and the instrumentation stays off; remove the proxy route in next.config.ts if you don't need it.",
    highlights: ["NEXT_PUBLIC_POSTHOG_KEY", "next.config.ts"],
  },
  {
    question: "Is PWA/offline support available in development?",
    answer:
      "The Serwist service worker is injected on next build. In production it precaches the offline page and enables navigation preload; during dev you can skip it and still build confidently.",
    highlights: ["next build"],
  },
];

const renderAnswer = (item: FAQEntry) => {
  if (!item.highlights?.length) return item.answer;

  return item.highlights.reduce<Array<string | JSX.Element>>(
    (parts, token) =>
      parts.flatMap((part, index) => {
        if (typeof part !== "string") return part;

        const split = part.split(token);
        return split.flatMap((chunk, splitIndex) => {
          const elements: Array<string | JSX.Element> = [];
          if (chunk) elements.push(chunk);
          if (splitIndex < split.length - 1) {
            elements.push(
              <code key={`${token}-${index}-${splitIndex}`}>{token}</code>
            );
          }
          return elements;
        });
      }),
    [item.answer]
  );
};

export default function FAQ() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src="/images/faq.svg"
              alt="Frequently Asked Questions"
              width={500}
              height={500}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              variant="separated"
            >
              {faqItems.map((item) => (
                <Accordion.Item
                  key={item.question}
                  className={classes.item}
                  value={item.question}
                >
                  <Accordion.Control>{item.question}</Accordion.Control>
                  <Accordion.Panel>{renderAnswer(item)}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
