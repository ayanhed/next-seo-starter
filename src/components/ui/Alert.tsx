import React from "react";
import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react";
import Text from "./Text";
import Stack from "./Stack";
import { cn } from "../../lib/utils";

export interface AlertProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "success"
    | "warning"
    | "error"
    | "muted"
    | "accent"
    | "light"
    | "info";
  title?: string;
  onClose?: () => void;
  className?: string;
  showIcon?: boolean;
}

const alertVariants = {
  default: "alert",
  success: "alert alert-success",
  warning: "alert alert-warning",
  error: "alert alert-error",
  muted: "alert alert-neutral",
  accent: "alert alert-accent",
  light: "alert alert-primary",
  info: "alert alert-info",
} as const;

const alertIcons = {
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
  info: Info,
} as const;

const Alert: React.FC<AlertProps> = ({
  children,
  variant = "default",
  title,
  onClose,
  className = "",
  showIcon,
}) => {
  const IconComponent = alertIcons[variant as keyof typeof alertIcons];
  const shouldShowIcon =
    showIcon !== undefined ? showIcon : variant !== "default";

  return (
    <div className={cn("alert shadow-sm", alertVariants[variant], className)}>
      {shouldShowIcon && IconComponent && (
        <IconComponent className="h-5 w-5" aria-hidden />
      )}
      <Stack spacing="xs" className="flex-1">
        {title && (
          <Text size="sm" weight="semibold" className="m-0" variant={variant}>
            {title}
          </Text>
        )}
        <Text as="div" size="sm" className="m-0">
          {children}
        </Text>
      </Stack>
      {onClose && (
        <button
          onClick={onClose}
          className="btn btn-ghost btn-xs btn-square"
          aria-label="Close alert"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
