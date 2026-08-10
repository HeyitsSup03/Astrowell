"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
  isScrolled?: boolean;
}

function ThemeToggle({ className, isScrolled = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("astrowell-theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    applyTheme(initial);
    setTheme(initial);
  }, []);

  function applyTheme(t: "light" | "dark") {
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("astrowell-theme", t);
  }

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  }

  if (!mounted) {
    return <div className={cn("h-8 w-8 rounded-full", className)} />;
  }

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={cn(
        "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
        isScrolled
          ? "text-text-primary dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/10"
          : "text-white/80 hover:text-white hover:bg-white/10",
        className
      )}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon
          className={cn(
            "h-4 w-4 transition-transform hover:-rotate-12",
            isScrolled ? "text-text-primary dark:text-text-primary-dark" : "text-white/90"
          )}
        />
      )}
    </button>
  );
}

export { ThemeToggle };
