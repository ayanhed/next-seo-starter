import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  lead?: 1 | 2 | 3;
  animate?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { className, level = 2, as, children, lead, animate = false, ...props },
    ref
  ) => {
    const Component =
      as || (`h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6");

    const sizes = {
      1: "text-3xl md:text-5xl lg:text-6xl font-bold",
      2: "text-2xl md:text-4xl lg:text-5xl font-bold",
      3: "text-xl md:text-3xl lg:text-4xl font-semibold",
      4: "text-lg md:text-2xl lg:text-3xl font-semibold",
      5: "text-base md:text-xl lg:text-2xl font-medium",
      6: "text-md md:text-md lg:text-lg font-medium",
    };

    const leadClasses = {
      1: "text-5xl md:text-6xl lg:text-9xl",
      2: "text-4xl md:text-5xl lg:text-8xl",
      3: "text-3xl md:text-4xl lg:text-7xl",
    };

    return React.createElement(
      Component,
      {
        ref,
        className: cn(
          "text-foreground mb-1",
          sizes[level],
          lead && leadClasses[lead],
          className
        ),
        ...props,
      },
      children
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
