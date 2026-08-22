"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  MessageSquare,
  Wallet,
  User,
  Sparkles,
  Compass,
  ShoppingBag,
  GraduationCap,
  Grid,
  X,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/appointments", label: "Bookings", icon: Calendar },
  { href: "/chat", label: "Messages", icon: MessageSquare },
  { href: "/wallet", label: "Wallet", icon: Wallet },
] as const;

const mobileServices = [
  {
    href: "/kundli/generate",
    label: "Kundli Chart",
    desc: "Free Vedic Natal Chart & Dasha",
    icon: Sparkles,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    href: "/kundli/match",
    label: "Matchmaking",
    desc: "36 Guna Milan & Dosha Check",
    icon: Compass,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    href: "/shop",
    label: "Astro Shop",
    desc: "Certified Gemstones & Pooja Kits",
    icon: ShoppingBag,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    href: "/courses",
    label: "Vedic Courses",
    desc: "Live Video Batches & Certificates",
    icon: GraduationCap,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    href: "/profile",
    label: "My Account",
    desc: "Profile, Orders & Saved Kundlis",
    icon: User,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
] as const;

/** Mobile-only bottom navigation with Services Drawer (hidden at lg: and above) */
export function BottomNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isServiceActive =
    pathname.startsWith("/kundli") ||
    pathname.startsWith("/shop") ||
    pathname.startsWith("/courses");

  return (
    <>
      {/* ── MOBILE SLIDE-UP SERVICES DRAWER ─────────────────────── */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Drawer Container */}
          <div className="relative w-full bg-surface dark:bg-surface-dark rounded-t-3xl border-t border-black/10 dark:border-white/10 p-6 pb-20 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/8 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-text-primary dark:text-text-primary-dark">
                    Cosmic Services & Tools
                  </h3>
                  <p className="text-[11px] text-text-muted dark:text-text-muted-dark">
                    Explore Kundli, Shop, Courses & Vedic Remedies
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-3">
              {mobileServices.map(({ href, label, desc, icon: Icon, color }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={cn(
                      "flex items-center gap-3.5 p-3 rounded-2xl transition-all border",
                      isActive
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold"
                        : "bg-black/2 dark:bg-white/2 border-black/5 dark:border-white/8 text-text-primary dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{label}</div>
                      <div className="text-[11px] text-text-muted dark:text-text-muted-dark truncate">
                        {desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Footer Control: Theme Toggle */}
            <div className="pt-2 flex items-center justify-between border-t border-black/5 dark:border-white/8">
              <span className="text-xs font-medium text-text-muted">Appearance Mode</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE BOTTOM NAVBAR ────────────────────────────────── */}
      <nav
        aria-label="Mobile navigation"
        className={cn(
          "fixed bottom-0 inset-x-0 z-40 lg:hidden",
          "bg-surface/95 dark:bg-surface-dark/95 backdrop-blur-md",
          "border-t border-black/5 dark:border-white/8",
          "pb-safe",
          className
        )}
      >
        <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
          {/* Main 4 Quick Nav Items */}
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-xl",
                  "text-[11px] font-medium transition-all duration-150",
                  isActive
                    ? "text-primary dark:text-primary-light font-semibold"
                    : "text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-150",
                    isActive && "scale-110 text-primary dark:text-primary-light"
                  )}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
                <span>{label}</span>
              </Link>
            );
          })}

          {/* 5th Item: Services Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            aria-label="Services Menu"
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-xl cursor-pointer",
              "text-[11px] font-medium transition-all duration-150",
              isServiceActive || isDrawerOpen
                ? "text-amber-600 dark:text-amber-400 font-semibold"
                : "text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark"
            )}
          >
            <Grid
              className={cn(
                "h-5 w-5 transition-transform duration-150",
                (isServiceActive || isDrawerOpen) && "scale-110 text-amber-500"
              )}
              strokeWidth={isServiceActive || isDrawerOpen ? 2.5 : 1.75}
            />
            <span>Services</span>
          </button>
        </div>
      </nav>
    </>
  );
}
