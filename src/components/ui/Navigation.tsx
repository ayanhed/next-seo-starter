"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { appConfig } from "@/config/app";
import useActiveHash from "@/hooks/useActiveHash";

const baseUrl = appConfig.app.baseUrl;

const navItems = [
  { label: "Features", href: `/#features` },
  { label: "Pricing", href: `/#pricing` },
  { label: "FAQ", href: `/#faq` },
];

const hashItems = navItems
  .filter((item) => item.href.includes("#"))
  .map((item) => {
    const hashPart = item.href.split("#")[1];
    return hashPart ? `#${hashPart}` : "";
  })
  .filter(Boolean);

// Helper to check if nav item is active
function isNavItemActive(
  href: string,
  pathname: string,
  activeHash: string
): boolean {
  const isHashLink = href.includes("#");

  if (isHashLink) {
    const hash = `#${href.split("#")[1]}`;
    return pathname === "/" && activeHash === hash;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

// Nav link component
function NavLink({
  item,
  isActive,
}: {
  item: { label: string; href: string };
  isActive: boolean;
}) {
  return (
    <Link href={item.href} className={isActive ? "active" : ""}>
      {item.label}
    </Link>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const activeHash = useActiveHash(hashItems);

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  item={item}
                  isActive={isNavItemActive(item.href, pathname, activeHash)}
                />
              </li>
            ))}
            <li>
              <Link
                href="/register"
                className="btn btn-primary w-full justify-center"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          {appConfig.app.name}
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                item={item}
                isActive={isNavItemActive(item.href, pathname, activeHash)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/register" className="btn btn-primary hidden lg:flex">
          Get Started
        </Link>
      </div>
    </div>
  );
}
