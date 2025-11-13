"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui";
import { appConfig } from "@/config/app";
import useActiveHash from "@/hooks/useActiveHash";

const baseUrl = appConfig.app.baseUrl;

const navItems = [
  { label: "Features", href: `${baseUrl}#features` },
  { label: "Pricing", href: `${baseUrl}#pricing` },
  { label: "FAQ", href: `${baseUrl}#faq` },
];

const hashItems = navItems
  .filter((item) => item.href.startsWith("#"))
  .map((item) => item.href);

// Helper to check if nav item is active
function isNavItemActive(
  href: string,
  pathname: string,
  activeHash: string
): boolean {
  const isHashLink = href.startsWith("#");

  if (isHashLink) {
    return pathname === "/" && activeHash === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

// Mobile menu icon component
function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {isOpen ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  );
}

// Nav link component
function NavLink({
  item,
  isActive,
  onClick,
}: {
  item: { label: string; href: string };
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      className={`transition-colors ${
        isActive
          ? "text-primary font-medium"
          : "text-muted-foreground hover:text-foreground"
      }`}
      onClick={onClick}
    >
      {item.label}
    </Link>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const activeHash = useActiveHash(hashItems);

  return (
    <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">{appConfig.app.name}</Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={isNavItemActive(item.href, pathname, activeHash)}
              />
            ))}
          </div>

          <div className="hidden md:block">
            <Button as="link" href="/register" variant="primary">
              Get Started
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-foreground"
            aria-label="Toggle menu"
          >
            <MenuIcon isOpen={isOpen} />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={isNavItemActive(item.href, pathname, activeHash)}
                  onClick={() => setIsOpen(false)}
                />
              ))}
              <Button
                size="sm"
                as="link"
                href="/register"
                variant="primary"
                className="w-fit"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
