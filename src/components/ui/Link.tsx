import React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "button" | "underline" | "muted";
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "text-foreground hover:text-primary",
      button:
        "bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out hover:brightness-105 inline-flex items-center gap-2",
      muted: "text-muted-foreground hover:text-foreground",
      underline: "hover:text-primary font-medium underline",
    } as const;

    return (
      <NextLink
        ref={ref}
        className={cn(
          "transition-all duration-300 ease-in-out",
          variants[variant]
        )}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
