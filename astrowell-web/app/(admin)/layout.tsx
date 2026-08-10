"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CheckSquare,
  DollarSign,
  LogOut,
  Shield,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const adminNav = [
  { href: "/admin/providers/approve", label: "Provider Approvals", icon: CheckSquare },
  { href: "/admin/analytics", label: "Platform Analytics", icon: BarChart3 },
  { href: "/admin/payouts", label: "Payout Settlements", icon: DollarSign },
  { href: "/admin/moderation", label: "Content Moderation", icon: ShieldAlert },
] as const;

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex flex-col md:flex-row">
      {/* ── Admin Sidebar (Desktop-First Sidebar Only) ────────────── */}
      <aside aria-label="Admin Navigation Sidebar" className="w-full md:w-64 md:h-screen md:sticky top-0 flex-shrink-0 bg-surface dark:bg-surface-dark border-r border-black/5 dark:border-white/8 p-4 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Admin Header */}
          <Link href="/admin/analytics" className="flex items-center gap-2.5 px-3 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-secondary via-primary to-primary flex items-center justify-center text-accent shadow-xs">
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-primary dark:text-primary-light">
                Astrowell
              </span>
              <Badge variant="danger" className="text-[9px] py-0 w-fit">
                Admin Console
              </Badge>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-1">
            {adminNav.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-pink-300 font-semibold"
                      : "text-text-muted dark:text-text-muted-dark hover:bg-black/4 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-text-primary-dark"
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer controls */}
        <div className="pt-4 border-t border-black/5 dark:border-white/8 space-y-3">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" fullWidth className="text-xs gap-1.5">
              <LogOut className="h-3.5 w-3.5" /> Exit Admin Console
            </Button>
          </Link>

          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-text-muted dark:text-text-muted-dark">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
