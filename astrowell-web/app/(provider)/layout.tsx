"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Calendar,
  Clock,
  FileCheck,
  Home,
  LogOut,
  Sparkles,
  UserCheck,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const providerNav = [
  { href: "/provider/dashboard", label: "Dashboard", icon: Home },
  { href: "/provider/availability", label: "Weekly Availability", icon: Clock },
  { href: "/provider/kyc", label: "KYC Verification", icon: FileCheck },
  { href: "/provider/courses/manage", label: "Course Batches", icon: Briefcase },
] as const;

export default function ProviderLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex flex-col lg:flex-row">
      {/* ── Desktop Provider Sidebar ────────────────────────────── */}
      <aside aria-label="Provider Sidebar Navigation" className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-surface dark:bg-surface-dark border-r border-black/5 dark:border-white/8 p-4">
        {/* Brand & Mode Indicator */}
        <div className="px-3 mb-6 space-y-1">
          <Logo href="/provider/dashboard" size="md" />
          <div className="pl-11">
            <Badge variant="accent" className="text-[9px] py-0 w-fit">
              Provider Portal
            </Badge>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {providerNav.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-primary-light font-semibold"
                    : "text-text-muted dark:text-text-muted-dark hover:bg-black/4 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-text-primary-dark"
                )}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & switch view */}
        <div className="pt-4 border-t border-black/5 dark:border-white/8 space-y-3">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" fullWidth className="text-xs gap-1.5">
              <LogOut className="h-3.5 w-3.5" /> Switch to Customer View
            </Button>
          </Link>

          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-text-muted dark:text-text-muted-dark">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* ── Main Workspace ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-surface/95 dark:bg-surface-dark/95 border-b border-black/5 dark:border-white/8 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo href="/provider/dashboard" size="sm" />
            <Badge variant="accent" className="text-[10px]">Provider</Badge>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button size="sm" variant="ghost" className="text-xs">Exit</Button>
            </Link>
          </div>
        </header>

        {/* Mobile Tab Nav Bar (< lg:) */}
        <nav aria-label="Mobile Navigation" className="lg:hidden bg-surface dark:bg-surface-dark border-b border-black/5 dark:border-white/8 flex overflow-x-auto p-2 gap-1">
          {providerNav.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap",
                  isActive
                    ? "bg-primary text-white dark:bg-primary-light"
                    : "text-text-muted dark:text-text-muted-dark"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Content Container */}
        <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
