"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// ── Base Input ──────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className, id, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const isPassword = type === "password";

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary dark:text-text-primary-dark"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-muted-dark">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "w-full rounded-xl border bg-surface dark:bg-surface-dark",
              "px-3.5 py-2.5 text-sm text-text-primary dark:text-text-primary-dark",
              "placeholder:text-text-muted dark:placeholder:text-text-muted-dark",
              "border-black/10 dark:border-white/10",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-light/50 focus:border-primary dark:focus:border-primary-light",
              "transition-all duration-150",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              leftIcon && "pl-10",
              (isPassword) && "pr-11",
              error && "border-danger focus:ring-danger/50 focus:border-danger",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs text-danger" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-text-muted dark:text-text-muted-dark">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// ── Textarea ────────────────────────────────────────────────

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary dark:text-text-primary-dark"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border bg-surface dark:bg-surface-dark",
            "px-3.5 py-2.5 text-sm text-text-primary dark:text-text-primary-dark",
            "placeholder:text-text-muted dark:placeholder:text-text-muted-dark",
            "border-black/10 dark:border-white/10",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-light/50 focus:border-primary",
            "transition-all duration-150 resize-none",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-danger",
            className
          )}
          rows={4}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-text-muted dark:text-text-muted-dark">{hint}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea, type InputProps };
