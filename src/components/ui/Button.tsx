import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
  as?: "button" | "a";
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
    const baseClasses = cn(
      "inline-flex items-center cursor-pointer justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
      "focus:ring-ring focus:ring-offset-bg",
      fullWidth && "w-full"
    );

    const variants = {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-surface text-foreground border border-border",
      ghost:
        "text-muted-foreground hover:text-foreground hover:bg-surface focus:bg-surface",
      outline: "border border-border text-foreground hover:bg-surface",
    } as const;

    const isIconOnly = Icon && !children;

    const sizes = isIconOnly
      ? {
          sm: `p-1 sm:p-1.5 ${pill ? "rounded-full" : "rounded-md"}`,
          md: `p-1.5 sm:p-2 ${pill ? "rounded-full" : "rounded-lg"}`,
          lg: `p-2 sm:p-2.5 ${pill ? "rounded-full" : "rounded-lg"}`,
        }
      : {
          sm: `px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm ${
            pill ? "rounded-full" : "rounded-md"
          }`,
          md: `px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base ${
            pill ? "rounded-full" : "rounded-lg"
          }`,
          lg: `px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg ${
            pill ? "rounded-full" : "rounded-lg"
          }`,
        };

    const iconSizes = {
      sm: "h-3 w-3 sm:h-4 sm:w-4",
      md: "h-4 w-4 sm:h-5 sm:w-5",
      lg: "h-5 w-5 sm:h-6 sm:w-6",
    };

    const classes = cn(baseClasses, variants[variant], sizes[size], className);

    if (as === "a") {
      return (
        <a
          href={href}
          target={target}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {Icon && iconPosition === "left" && (
            <Icon className={`${children ? "mr-2" : ""} ${iconSizes[size]}`} />
          )}
          {children}
          {Icon && iconPosition === "right" && (
            <Icon className={`${children ? "ml-2" : ""} ${iconSizes[size]}`} />
          )}
        </a>
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
