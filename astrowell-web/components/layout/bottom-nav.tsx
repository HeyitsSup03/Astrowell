"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, MessageSquare, Wallet, User } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/appointments", label: "Bookings", icon: Calendar },
  { href: "/chat", label: "Messages", icon: MessageSquare },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/profile", label: "Profile", icon: User },
] as const;

/** Mobile-only bottom navigation (hidden at lg: and above) */
export function BottomNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
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
      </div>
    </nav>
  );
}
