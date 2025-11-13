import React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "underline" | "muted" | "light";
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "text-foreground hover:text-primary",
      muted: "text-muted-foreground hover:text-foreground",
      light: "text-primary-foreground hover:text-primary-light",
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
