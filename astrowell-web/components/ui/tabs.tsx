"use client";

import { cn } from "@/lib/utils";
import { useState, ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  /** Visual style variant */
  variant?: "underline" | "pills";
}

function Tabs({ tabs, defaultTab, onChange, className, variant = "underline" }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  const handleSelect = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div
      role="tablist"
      className={cn(
        "flex",
        variant === "underline"
          ? "border-b border-black/8 dark:border-white/8 gap-0"
          : "gap-2 bg-black/5 dark:bg-white/5 rounded-xl p-1",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => handleSelect(tab.id)}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              variant === "underline"
                ? cn(
                    "px-4 py-2.5 -mb-px border-b-2",
                    isActive
                      ? "border-primary text-primary dark:border-primary-light dark:text-primary-light"
                      : "border-transparent text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark"
                  )
                : cn(
                    "px-4 py-1.5 rounded-lg flex-1 justify-center",
                    isActive
                      ? "bg-surface dark:bg-surface-dark text-primary dark:text-primary-light shadow-sm"
                      : "text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark"
                  )
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "text-xs font-semibold rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center",
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-primary-light"
                    : "bg-black/8 text-text-muted dark:bg-white/10 dark:text-text-muted-dark"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export { Tabs, type Tab, type TabsProps };
