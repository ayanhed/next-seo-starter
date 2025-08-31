"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check, ChevronUp } from "lucide-react";
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
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2 px-3",
    lg: "text-lg py-2.5 px-4",
  };

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
          {label}
        </label>
      )}

      <SelectPrimitive.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          className={cn(
            "w-full text-left rounded-md",
            "bg-[var(--color-input)] border border-[var(--color-border)]",
            "text-[var(--color-foreground)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-between",
            sizeClasses[size]
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 text-[var(--color-muted-foreground)]" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-[var(--color-border)]",
              "bg-[var(--color-surface)] shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
              "data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
              "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
              "data-[side=top]:slide-in-from-bottom-2"
            )}
          >
            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
              <ChevronUp className="h-4 w-4" />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm px-3 py-2 text-sm",
                    "outline-none focus:bg-[var(--color-surface)] focus:text-[var(--color-foreground)]",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    "data-[highlighted]:bg-[var(--color-surface)] data-[highlighted]:text-[var(--color-foreground)]",
                    "hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)] transition-colors"
                  )}
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="h-4 w-4 text-[var(--color-primary)]" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
              <ChevronDown className="h-4 w-4" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {helperText && !error && (
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
          {helperText}
        </p>
      )}
    </div>
  );
}
