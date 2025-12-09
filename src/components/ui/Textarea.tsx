import React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="form-control w-full space-y-2">
        {label && <label className="label-text font-medium text-sm">{label}</label>}
        <textarea
          className={cn(
            "textarea textarea-bordered w-full resize-none",
            error && "textarea-error",
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

Textarea.displayName = "Textarea";

export default Textarea;
