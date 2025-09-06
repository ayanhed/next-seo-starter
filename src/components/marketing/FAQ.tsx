"use client";

import { useState } from "react";
import { Section, Heading, Text, Card } from "@/components/ui";

type QA = { q: string; a: string };

export function FAQ({ items }: { items: QA[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFAQs = [
    {
      q: "How does this platform work?",
      a: "Our platform provides a simple and intuitive way to manage your workflow. Sign up, configure your settings, and start using our powerful features right away.",
    },
    {
      q: "Is my data secure?",
      a: "Absolutely! We use enterprise-grade security measures including encryption, secure servers, and regular security audits to protect your data and privacy.",
    },
    {
      q: "Do I need to create an account?",
      a: "Yes, creating an account is required to access our platform features. However, our signup process is quick and straightforward.",
    },
    {
      q: "What features are included?",
      a: "Our platform includes core functionality, advanced analytics, team collaboration tools, API access, and 24/7 customer support depending on your plan.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.",
    },
    {
      q: "Do you offer customer support?",
      a: "Yes! We provide comprehensive customer support through email, chat, and phone. Premium users get priority support with faster response times.",
    },
    {
      q: "How do I report issues?",
      a: "You can report issues through our support portal, email, or in-app feedback system. We review all reports and respond within 24 hours.",
    },
    {
      q: "Can I integrate with other tools?",
      a: "Yes, we offer API access and integrations with popular third-party tools. Check our documentation for a complete list of available integrations.",
    },
  ];

  const faqItems = items.length > 0 ? items : defaultFAQs;

  return (
    <Section id="faq" spacing="xl">
      <Card className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="text-3xl lg:text-4xl mb-4">
            Frequently Asked Questions
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
            Find answers to common questions about our platform and services
          </Text>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[var(--color-bg)] transition-colors"
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
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-4 h-0.5 bg-[var(--color-foreground)] absolute"></div>
                    <div
                      className={`w-0.5 h-4 bg-[var(--color-foreground)] absolute transition-opacity ${
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
