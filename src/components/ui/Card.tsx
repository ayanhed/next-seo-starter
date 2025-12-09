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
      default: "bg-base-100 border border-base-200 shadow-sm",
      dark: "bg-base-200 border border-base-300",
      outlined: "border border-base-300 bg-transparent",
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
          "card rounded-2xl overflow-hidden",
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
