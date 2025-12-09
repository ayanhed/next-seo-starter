"use client";

import React, { useEffect, useRef } from "react";
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

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
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
    forwardedRef
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const sizeClasses = {
      sm: "checkbox-sm",
      md: "",
      lg: "checkbox-lg",
    } as const;

    return (
      <label className={cn("flex items-start gap-3", className)}>
        <input
          ref={(node) => {
            innerRef.current = node;
            if (typeof forwardedRef === "function") {
              forwardedRef(node);
            } else if (forwardedRef) {
              (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current =
                node;
            }
          }}
          type="checkbox"
          className={cn(
            "checkbox mt-1",
            sizeClasses[size],
            error && "checkbox-error"
          )}
          checked={checked}
          onChange={(event) => onChange?.(event.target.checked)}
          disabled={disabled}
        />

        {(label || error || helperText) && (
          <div className="text-sm">
            {label && (
              <span
                className={cn(
                  "font-medium",
                  disabled ? "text-base-content/60" : "text-base-content"
                )}
              >
                {label}
              </span>
            )}

            {error && <p className="mt-1 text-error text-sm">{error}</p>}

            {helperText && !error && (
              <p className="mt-1 text-base-content/70 text-sm">{helperText}</p>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
