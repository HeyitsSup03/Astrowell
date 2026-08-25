"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import {
  Home,
  Calendar,
  MessageSquare,
  Wallet,
  User,
  Compass,
  ShoppingBag,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const mainNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/appointments", label: "Bookings", icon: Calendar },
  { href: "/chat", label: "Messages", icon: MessageSquare },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/profile", label: "Profile", icon: User },
] as const;

const quickNavItems = [
  { href: "/kundli/generate", label: "Kundli Chart", icon: Sparkles },
  { href: "/kundli/match", label: "Matchmaking", icon: Compass },
  { href: "/shop", label: "Astro Shop", icon: ShoppingBag },
  { href: "/courses", label: "Vedic Courses", icon: GraduationCap },
] as const;

/** Desktop-only persistent sidebar (visible at lg: and above) */
export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Desktop Navigation Sidebar"
      className={cn(
        "hidden lg:flex flex-col",
        "w-64 h-screen sticky top-0 flex-shrink-0",
        "bg-surface dark:bg-surface-dark",
        "border-r border-black/5 dark:border-white/8",
        "pt-6 pb-6 px-4",
        className
      )}
    >
      {/* Brand Header */}
      <div className="px-3 mb-8">
        <Logo href="/dashboard" size="md" subtitle="Cosmic Guidance" />
      </div>

      {/* Main Navigation */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-1">
        <div>
          <span className="text-[11px] font-semibold text-text-muted dark:text-text-muted-dark uppercase tracking-wider px-3 mb-2 block">
            Navigation
          </span>
          <nav className="space-y-1">
            {mainNavItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-primary-light font-semibold shadow-xs"
                      : "text-text-muted dark:text-text-muted-dark hover:bg-black/4 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-text-primary-dark"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4.5 w-4.5",
                      isActive ? "text-primary dark:text-primary-light" : "text-text-muted dark:text-text-muted-dark"
                    )}
                    strokeWidth={isActive ? 2.5 : 1.75}
                  />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Tools */}
        <div>
          <span className="text-[11px] font-semibold text-text-muted dark:text-text-muted-dark uppercase tracking-wider px-3 mb-2 block">
            Services
          </span>
          <nav className="space-y-1">
            {quickNavItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-text-muted dark:text-text-muted-dark hover:bg-black/4 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-text-primary-dark"
                  )}
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer controls */}
      <div className="pt-4 border-t border-black/5 dark:border-white/8 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="text-xs text-text-muted dark:text-text-muted-dark font-medium">
            Toggle Theme
          </span>
        </div>
      </div>
    </aside>
  );
}
