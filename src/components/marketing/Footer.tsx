import Link from "next/link";
import { Text } from "@/components/ui";
import { appConfig } from "@/config/app";

export default function Footer() {
  const footerSections = [
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

  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              {appConfig.app.name}
            </Link>

            <Text variant="muted" className="max-w-md">
              {appConfig.app.description}
            </Text>
          </div>

          {/* Links sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <Text className="font-semibold">{section.title}</Text>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <Text size="sm" variant="muted">
                © {new Date().getFullYear()} {appConfig.app.name}. All rights
                reserved.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
