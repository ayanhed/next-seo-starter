import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: "sm" | "md" | "lg" | "xl";
  className?: string;
  responsive?: boolean;
}

const gapClasses = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const responsiveCols = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-1 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-1 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-6",
  12: "grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
};

const fixedCols = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

export default function Grid({
  children,
  cols = 3,
  gap = "md",
  className,
  responsive = true,
}: GridProps) {
  const colsClasses = responsive ? responsiveCols[cols] : fixedCols[cols];

  return (
    <div className={cn("grid w-full", colsClasses, gapClasses[gap], className)}>
      {children}
    </div>
  );
}
