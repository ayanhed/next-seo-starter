import type { ReactNode } from "react";
import { Text, Link } from "@/components/ui";
import { appConfig } from "@/config/app";

type FooterLink = { label: string; href: string };

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type FooterBranding = {
  name?: string;
  description?: string;
  href?: string;
  logo?: ReactNode;
};

export interface FooterProps {
  sections?: FooterSection[];
  branding?: FooterBranding;
  note?: string;
  className?: string;
}

const defaultSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR", href: "/gdpr" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Report Issue", href: "/report" },
      { label: "Documentation", href: "/docs" },
    ],
  },
];

const fallbackBranding: FooterBranding = {
  name: appConfig.app.name,
  description: appConfig.app.description,
  href: "/",
};

export default function Footer({
  sections = defaultSections,
  branding,
  note,
  className = "",
}: FooterProps = {}) {
  const resolvedBranding = {
    ...fallbackBranding,
    ...branding,
  };

  const resolvedNote =
    note ??
    `© ${new Date().getFullYear()} ${
      resolvedBranding.name ?? appConfig.app.name
    }. All rights reserved.`;

  const brandContent =
    resolvedBranding.logo ??
    resolvedBranding.name ??
    appConfig.app.name ??
    "Brand";

  return (
    <footer
      className={`bg-base-200 border-t border-base-300 mt-20 ${className}`.trim()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Text className="flex items-center space-x-2">
              <Link
                variant="default"
                href="/"
                className="flex items-center space-x-2"
              >
                {brandContent}
              </Link>
            </Text>

            {resolvedBranding.description && (
              <Text className="max-w-md">
                {resolvedBranding.description}
              </Text>
            )}
          </div>

          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <Text className="font-semibold">
                {section.title}
              </Text>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.href}`}>
                    <Link variant="default" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-base-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text size="sm">
              {resolvedNote}
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
