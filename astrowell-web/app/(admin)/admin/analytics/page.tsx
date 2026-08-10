"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  Clock,
  DollarSign,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const kpis = [
    {
      label: "Bookings Today",
      value: "142",
      change: "+24%",
      isPositive: true,
      icon: Calendar,
      sub: "Chat, Call & Video combined",
    },
    {
      label: "Gross Platform Revenue",
      value: formatCurrency(124500),
      change: "+31%",
      isPositive: true,
      icon: DollarSign,
      sub: "Commission cut: 20% (₹24,900)",
    },
    {
      label: "Active Providers Online",
      value: "38 Experts",
      change: "Normal",
      isPositive: true,
      icon: Zap,
      sub: "24 Astrologers, 8 Yoga, 6 Dietitians",
    },
    {
      label: "Avg. Session Duration",
      value: "18.5 Mins",
      change: "+2.1 min",
      isPositive: true,
      icon: Clock,
      sub: "Highest duration: Video mode",
    },
  ];

  const categoryShare = [
    { category: "Vedic Astrology", percent: 55, revenue: 68475, color: "bg-primary" },
    { category: "Kundli Matchmaking", percent: 20, revenue: 24900, color: "bg-accent" },
    { category: "Yoga & Meditation", percent: 15, revenue: 18675, color: "bg-emerald-500" },
    { category: "Diet & Wellness", percent: 10, revenue: 12450, color: "bg-secondary" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            Platform Operations & Analytics
          </h1>
          <p className="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">
            Real-time insights across customer consultations, gross revenue, and provider activity.
          </p>
        </div>

        <Badge variant="accent">Live Platform Metrics</Badge>
      </div>

      {/* ── KPI Stat Cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted dark:text-text-muted-dark font-medium">
                  {kpi.label}
                </span>
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary dark:text-primary-light flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-2xl font-bold font-display text-text-primary dark:text-text-primary-dark">
                  {kpi.value}
                </h3>
                <span className="text-xs font-bold text-success flex items-center">
                  <ArrowUpRight className="h-3.5 w-3.5" /> {kpi.change}
                </span>
              </div>

              <p className="text-[11px] text-text-muted dark:text-text-muted-dark">
                {kpi.sub}
              </p>
            </Card>
          );
        })}
      </div>

      {/* ── Revenue by Category Bar Distribution ───────────────── */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary dark:text-text-primary-dark flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-accent" /> Revenue Distribution by Service Category
          </h2>
          <span className="text-xs text-text-muted dark:text-text-muted-dark">
            Today's Gross Total: {formatCurrency(124500)}
          </span>
        </div>

        <div className="space-y-4">
          {categoryShare.map((item) => (
            <div key={item.category} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-text-primary dark:text-text-primary-dark">
                  {item.category} ({item.percent}%)
                </span>
                <span className="font-bold text-accent">
                  {formatCurrency(item.revenue)}
                </span>
              </div>

              <div className="h-3 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Platform Summary Ledger ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-3">
          <h3 className="font-bold text-sm text-text-primary dark:text-text-primary-dark flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" /> Session Mode Split
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/3 dark:bg-white/3">
              <span>Text Chat Sessions</span>
              <span className="font-bold text-text-primary dark:text-text-primary-dark">48% (68 sessions)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/3 dark:bg-white/3">
              <span>Voice Call Sessions</span>
              <span className="font-bold text-text-primary dark:text-text-primary-dark">32% (45 sessions)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/3 dark:bg-white/3">
              <span>HD Video Sessions</span>
              <span className="font-bold text-text-primary dark:text-text-primary-dark">20% (29 sessions)</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-3">
          <h3 className="font-bold text-sm text-text-primary dark:text-text-primary-dark flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" /> Customer Satisfaction Index
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/3 dark:bg-white/3">
              <span>Average Star Rating</span>
              <span className="font-bold text-accent">4.86 / 5.0 ⭐</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/3 dark:bg-white/3">
              <span>Customer Repeat Rate</span>
              <span className="font-bold text-success">68.2%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/3 dark:bg-white/3">
              <span>Refund Request Rate</span>
              <span className="font-bold text-text-muted dark:text-text-muted-dark">1.2% (Low)</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
