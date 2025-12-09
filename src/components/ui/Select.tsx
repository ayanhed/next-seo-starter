"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  helperText,
  disabled = false,
  className,
  size = "md",
}: SelectProps) {
  const sizeClasses = {
    sm: "select-sm",
    md: "select-md",
    lg: "select-lg",
  } as const;

  return (
    <div className={cn("form-control w-full space-y-2", className)}>
      {label && <label className="label-text font-medium text-sm">{label}</label>}

      <select
        className={cn(
          "select select-bordered w-full",
          sizeClasses[size],
          error && "select-error"
        )}
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-error text-sm">{error}</p>}

      {helperText && !error && (
        <p className="text-base-content/70 text-sm">{helperText}</p>
      )}
    </div>
  );
}
