import React from "react";
import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react";
import Text from "./Text";
import Stack from "./Stack";
import { cn } from "../../lib/utils";

export interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  title?: string;
  onClose?: () => void;
  className?: string;
  showIcon?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = "default",
  title,
  onClose,
  className = "",
  showIcon,
}) => {
  const variants = {
    default: {
      container:
        "bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 border-[var(--color-primary)]/20",
      text: "text-[var(--color-foreground)]",
      icon: "text-[var(--color-primary)]",
      iconComponent: null,
    },
    success: {
      container:
        "bg-gradient-to-r from-[var(--color-success)]/10 to-[var(--color-success)]/5 border-[var(--color-success)]/20",
      text: "text-[var(--color-foreground)]",
      icon: "text-[var(--color-success)]",
      iconComponent: CheckCircle,
    },
    warning: {
      container:
        "bg-gradient-to-r from-[var(--color-warning)]/10 to-[var(--color-warning)]/5 border-[var(--color-warning)]/20",
      text: "text-[var(--color-foreground)]",
      icon: "text-[var(--color-warning)]",
      iconComponent: AlertCircle,
    },
    error: {
      container:
        "bg-gradient-to-r from-[var(--color-destructive)]/10 to-[var(--color-destructive)]/5 border-[var(--color-destructive)]/20",
      text: "text-[var(--color-foreground)]",
      icon: "text-[var(--color-destructive)]",
      iconComponent: XCircle,
    },
    info: {
      container:
        "bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 border-[var(--color-primary)]/20",
      text: "text-[var(--color-foreground)]",
      icon: "text-[var(--color-primary)]",
      iconComponent: Info,
    },
  };

  const currentVariant = variants[variant];
  const IconComponent = currentVariant.iconComponent;
  const shouldShowIcon =
    showIcon !== undefined ? showIcon : variant !== "default";

  return (
    <div
      className={`inline-flex items-start px-4 py-3 border rounded-lg w-full ${currentVariant.container} ${className}`}
    >
      <Stack
        direction="horizontal"
        spacing="sm"
        align="start"
        className="flex-1"
      >
        {shouldShowIcon && IconComponent && (
          <IconComponent className={`h-5 w-5 mt-0.5 ${currentVariant.icon}`} />
        )}
        <Stack spacing="xs" className="flex-1">
          {title && (
            <Text size="sm" weight="semibold" className={currentVariant.text}>
              {title}
            </Text>
          )}
          <Text as="div" size="sm" className={cn(currentVariant.text, "m-0")}>
            {children}
          </Text>
        </Stack>
      </Stack>
      {onClose && (
        <button
          onClick={onClose}
          className={`ml-2 p-1 rounded-md hover:bg-white/10 transition-colors ${currentVariant.icon}`}
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
