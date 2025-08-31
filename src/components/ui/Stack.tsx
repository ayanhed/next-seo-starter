import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StackProps {
  children: ReactNode;
  direction?: "vertical" | "horizontal";
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  className?: string;
  wrap?: boolean;
}

const gapClasses = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

export default function Stack({
  children,
  direction = "vertical",
  spacing = "md",
  align = "start",
  justify = "start",
  className,
  wrap = false,
}: StackProps) {
  const isHorizontal = direction === "horizontal";
  const gapClass = gapClasses[spacing];

  return (
    <div
      className={cn(
        "flex w-full",
        isHorizontal ? "flex-row" : "flex-col",
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        gapClass,
        className
      )}
    >
      {children}
    </div>
  );
}
