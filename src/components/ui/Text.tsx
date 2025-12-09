import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?:
    | "default"
    | "muted"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "info";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
  className?: string;
  as?: "p" | "span" | "div";
}

const sizeClasses = {
  xs: "text-xs md:text-sm leading-relaxed", // Mobile optimized: xs -> sm on medium screens
  sm: "text-sm md:text-base leading-relaxed", // Mobile optimized: sm -> base on medium screens
  md: "text-base md:text-lg leading-relaxed", // Mobile optimized: base -> lg on medium screens
  lg: "text-lg md:text-xl leading-relaxed", // Mobile optimized: lg -> xl on medium screens
  xl: "text-xl md:text-2xl leading-relaxed", // Mobile optimized: xl -> 2xl on medium screens
  "2xl": "text-2xl md:text-3xl leading-relaxed", // Mobile optimized: 2xl -> 3xl on medium screens
};

const variantClasses = {
  default: "text-base-content",
  muted: "text-neutral-content",
  accent: "text-accent-content",
  light: "text-primary-content",
  success: "text-success-content",
  warning: "text-warning-content",
  error: "text-error-content",
  info: "text-info-content",
} as const;

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export default function Text({
  children,
  size = "md",
  variant = "default",
  weight = "normal",
  align,
  className,
  as: Component = "p",
}: TextProps) {
  return (
    <Component
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        weightClasses[weight],
        align && alignClasses[align],
        className
      )}
    >
      {children}
    </Component>
  );
}
