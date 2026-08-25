"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
  isScrolled?: boolean;
  iconClassName?: string;
}

function ThemeToggle({ className, isScrolled, iconClassName }: ThemeToggleProps) {
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

  // When isScrolled is explicitly passed as false (e.g. top of transparent hero landing page), use white.
  // For all other pages and scrolled state, use vibrant high-contrast colors (indigo/amber).
  const isTransparentTop = isScrolled === false;

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={cn(
        "p-1.5 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer focus-visible:outline-none",
        className
      )}
    >
      {theme === "dark" ? (
        <Sun className={cn("h-4 w-4 text-amber-400 transition-transform hover:rotate-45", iconClassName)} />
      ) : (
        <Moon
          className={cn(
            "h-4 w-4 transition-transform hover:-rotate-12",
            iconClassName
              ? iconClassName
              : isTransparentTop
              ? "text-white/90 hover:text-white"
              : "text-indigo-600 dark:text-indigo-300"
          )}
        />
      )}
    </button>
  );
}

export { ThemeToggle };
