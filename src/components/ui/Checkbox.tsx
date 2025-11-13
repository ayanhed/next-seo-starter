"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      checked = false,
      onChange,
      label,
      error,
      helperText,
      disabled = false,
      className,
      size = "md",
      indeterminate = false,
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const iconSizes = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    return (
      <div className={cn("flex items-start", className)}>
        <div className="flex items-center h-5">
          <CheckboxPrimitive.Root
            ref={ref}
            checked={checked}
            onCheckedChange={onChange}
            disabled={disabled}
            className={cn(
              "peer h-4 w-4 shrink-0 rounded-sm border border-border",
              "ring-offset-bg focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
              "data-[state=checked]:border-primary",
              sizeClasses[size]
            )}
            {...(indeterminate && { "data-state": "indeterminate" })}
          >
            <CheckboxPrimitive.Indicator
              className={cn("flex items-center justify-center text-current")}
            >
              <Check
                className={cn("text-white", iconSizes[size])}
                strokeWidth={3}
              />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        </div>

        {label && (
          <div className="ml-3 text-sm">
            <label
              className={cn(
                "font-medium",
                disabled ? "text-muted-foreground" : "text-foreground",
                !disabled && "cursor-pointer"
              )}
            >
              {label}
            </label>

            {error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            {helperText && !error && (
              <p className="mt-1 text-sm text-muted-foreground">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
