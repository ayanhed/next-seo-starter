import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark" | "outlined";
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "dark", children, size = "md", ...props }, ref) => {
    const variants = {
      default:
        "bg-[var(--color-card)] border border-[var(--color-border)] shadow-sm",
      dark: "bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl",
      outlined: "border border-[var(--color-border)] bg-transparent",
    } as const;

    const sizeClasses = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    } as const;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden",
          variants[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
