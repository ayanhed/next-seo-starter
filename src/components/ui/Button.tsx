import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
  as?: "button" | "link";
  href?: string;
  target?: string;
  pill?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      children,
      as = "button",
      href,
      target,
      pill = false,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const isIconOnly = Icon && !children;

    const baseClasses = cn(
      "btn inline-flex items-center gap-2 font-semibold",
      fullWidth && "btn-block",
      pill && "rounded-full",
      isIconOnly && "btn-square",
      className
    );

    const variants = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      outline: "btn-outline",
    } as const;

    const sizes = {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    } as const;

    const iconSizes = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };

    const classes = cn(baseClasses, variants[variant], sizes[size]);

    if (as === "link") {
      return (
        <Link
          href={href || "/"}
          target={target}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {Icon && iconPosition === "left" && (
            <Icon className={`${children ? "mr-2" : ""} ${iconSizes[size]}`} />
          )}
          {children}
          {Icon && iconPosition === "right" && (
            <Icon className={`${children ? "ml-2" : ""} ${iconSizes[size]}`} />
          )}
        </Link>
      );
    }

    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {Icon && iconPosition === "left" && (
          <Icon className={`${children ? "mr-2" : ""} ${iconSizes[size]}`} />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon className={`${children ? "ml-2" : ""} ${iconSizes[size]}`} />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
