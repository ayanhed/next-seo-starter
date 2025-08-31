import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-[var(--color-foreground)] font-medium text-sm">
            {label}
          </label>
        )}
        <input
          className={cn(
            "w-full px-4 py-3 rounded-lg transition-colors",
            "bg-[var(--color-input)] border border-[var(--color-border)]",
            "text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {helperText && !error && (
          <p className="text-[var(--color-muted-foreground)] text-sm">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
