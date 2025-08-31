import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "default" | "muted" | "accent" | "success" | "warning" | "error";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
  className?: string;
  as?: "p" | "span" | "div";
}

const sizeClasses = {
  xs: "text-xs md:text-sm mb-0 font-mono uppercase", // Mobile optimized: xs -> sm on medium screens
  sm: "text-sm md:text-base mb-1 leading-relaxed", // Mobile optimized: sm -> base on medium screens
  md: "text-base md:text-lg mb-2 leading-relaxed", // Mobile optimized: base -> lg on medium screens
  lg: "text-lg md:text-xl mb-4 leading-relaxed", // Mobile optimized: lg -> xl on medium screens
  xl: "text-xl md:text-2xl mb-4 leading-relaxed", // Mobile optimized: xl -> 2xl on medium screens
  "2xl": "text-2xl md:text-3xl mb-4 leading-relaxed", // Mobile optimized: 2xl -> 3xl on medium screens
};

const variantClasses = {
  default: "text-[var(--color-foreground)]",
  muted: "text-[var(--color-muted-foreground)]",
  accent: "text-[var(--color-primary)]",
  success: "text-[var(--color-success)]",
  warning: "text-[var(--color-warning)]",
  error: "text-[var(--color-destructive)]",
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
