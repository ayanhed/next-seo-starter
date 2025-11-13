"use client";

import { useState } from "react";
import { Section, Heading, Text, Card } from "@/components/ui";

type QA = { q: string; a: string };

export interface FAQProps {
  items?: QA[];
  id?: string;
  title?: string;
  description?: string;
  defaultOpenIndex?: number | null;
  className?: string;
}

const defaultFAQs: QA[] = [
  {
    q: "How does this starter work?",
    a: "Each section ships with sensible defaults so you can keep the copy or replace it with your own data through props.",
  },
  {
    q: "Can I customize the design?",
    a: "Absolutely. Update the props, tweak the Tailwind classes, or replace the UI primitives with your component library.",
  },
  {
    q: "Is my data secure?",
    a: "The starter does not ship with a backend, so you decide how and where to store sensitive information when you integrate it.",
  },
  {
    q: "Do I need to keep every section?",
    a: "Nope. Remove the ones you do not need or swap them for your own components. Everything is opt-in.",
  },
];

export default function FAQ({
  items = [],
  id = "faq",
  title = "Frequently Asked Questions",
  description = "Answer the common questions your audience might ask before they convert.",
  defaultOpenIndex = 0,
  className = "",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const faqItems = items.length > 0 ? items : defaultFAQs;

  return (
    <Section id={id} spacing="xl" className={className}>
      <Card className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="text-3xl lg:text-4xl mb-4">
            {title}
          </Heading>
          {description && (
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              {description}
            </Text>
          )}
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={`${item.q}-${index}`}
              className="bg-surface rounded-lg border border-border overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-bg transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <Heading level={4} className="text-lg">
                  {item.q}
                </Heading>
                <div
                  className={`transform transition-transform ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  <div className="w-6 h-6 flex items-center justify-center relative">
                    <div className="w-4 h-0.5 bg-foreground absolute"></div>
                    <div
                      className={`w-0.5 h-4 bg-foreground absolute transition-opacity ${
                        openIndex === index ? "opacity-0" : "opacity-100"
                      }`}
                    ></div>
                  </div>
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4">
                  <Text variant="muted" className="leading-relaxed">
                    {item.a}
                  </Text>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
