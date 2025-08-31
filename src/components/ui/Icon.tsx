import { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps extends Omit<LucideProps, "size"> {
  icon: LucideIcon;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const sizeClasses = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
  "2xl": "w-10 h-10",
};

export default function Icon({
  icon: IconComponent,
  size = "md",
  className,
  ...props
}: IconProps) {
  return (
    <IconComponent className={cn(sizeClasses[size], className)} {...props} />
  );
}
