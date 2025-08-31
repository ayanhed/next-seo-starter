import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: "sm" | "md" | "lg" | "xl";
  container?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { className, spacing = "lg", container = true, children, ...props },
    ref
  ) => {
    const spacingClasses = {
      sm: "py-8",
      md: "py-12",
      lg: "py-10 lg:py-16",
      xl: "py-20",
    };

    return (
      <section
        ref={ref}
        className={cn(spacingClasses[spacing], "h-full", className)}
        {...props}
      >
        {container ? <>{children}</> : children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
