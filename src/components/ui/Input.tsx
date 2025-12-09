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
      <div className="form-control w-full space-y-2">
        {label && <label className="label-text font-medium text-sm">{label}</label>}
        <input
          className={cn(
            "input input-bordered w-full",
            error && "input-error",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-error text-sm">{error}</p>}
        {helperText && !error && (
          <p className="text-base-content/70 text-sm">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
