"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useRef, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  /** Max width class — defaults to max-w-md */
  maxWidth?: string;
  /** Hide the default close button */
  hideClose?: boolean;
}

function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md", hideClose }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      className={cn(
        "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4",
        "bg-black/50 backdrop-blur-sm",
        "animate-in fade-in duration-200"
      )}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={cn(
          "relative w-full rounded-2xl",
          "bg-surface dark:bg-surface-dark",
          "shadow-xl border border-black/5 dark:border-white/8",
          "animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200",
          maxWidth
        )}
      >
        {/* Header */}
        {(title || !hideClose) && (
          <div className="flex items-center justify-between p-5 border-b border-black/5 dark:border-white/8">
            {title && (
              <h2
                id="modal-title"
                className="text-base font-semibold text-text-primary dark:text-text-primary-dark font-body"
              >
                {title}
              </h2>
            )}
            {!hideClose && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                className={cn(
                  "ml-auto p-1.5 rounded-lg",
                  "text-text-muted hover:text-text-primary dark:text-text-muted-dark dark:hover:text-text-primary-dark",
                  "hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                )}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export { Modal, type ModalProps };
