import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "danger"
  | "warning"
  | "accent"
  | "primary"
  | "secondary"
  | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean; // Show a pulsing dot before the text (for online status)
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-black/5 text-text-primary dark:bg-white/10 dark:text-text-primary-dark",
  success:
    "bg-success/10 text-success dark:bg-success/20 dark:text-green-300",
  danger:
    "bg-danger/10 text-danger dark:bg-danger/20 dark:text-red-300",
  warning:
    "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  accent:
    "bg-accent/10 text-accent dark:bg-accent/20",
  primary:
    "bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-purple-300",
  secondary:
    "bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-pink-300",
  muted:
    "bg-black/5 text-text-muted dark:bg-white/5 dark:text-text-muted-dark",
};

function Badge({ variant = "default", dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, type BadgeVariant };
