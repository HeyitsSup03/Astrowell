"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatTime } from "@/lib/utils";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  DollarSign,
  MessageSquare,
  Phone,
  Sparkles,
  Star,
  Users,
  Video,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProviderDashboardPage() {
  const [isOnline, setIsOnline] = useState(true);

  const upcomingSessions = [
    {
      id: "sess-001",
      customerName: "Arjun Mehta",
      customerAvatar: "https://api.dicebear.com/7.x/personas/svg?seed=Arjun",
      mode: "video",
      time: "10:00 AM",
      topic: "Kundli Saturn Dasha prediction",
      estimatedFee: 900,
    },
    {
      id: "sess-002",
      customerName: "Pooja Sharma",
      customerAvatar: "https://api.dicebear.com/7.x/personas/svg?seed=Pooja",
      mode: "chat",
      time: "11:30 AM",
      topic: "Career progression query",
      estimatedFee: 600,
    },
    {
      id: "sess-003",
      customerName: "Vikram Malhotra",
      customerAvatar: "https://api.dicebear.com/7.x/personas/svg?seed=Vikram",
      mode: "call",
      time: "02:00 PM",
      topic: "Marriage Guna Milan review",
      estimatedFee: 750,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header & Status Toggle ────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            Pandit Raghavendra Joshi
          </h1>
          <p className="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">
            Vedic Astrologer • Rate: ₹30/min
          </p>
        </div>

        {/* Presence Toggle */}
        <Card className="p-2.5 flex items-center gap-3 w-fit">
          <Badge variant={isOnline ? "success" : "muted"} dot={isOnline}>
            {isOnline ? "Online & Receiving Calls" : "Offline / Busy"}
          </Badge>
          <Button
            size="sm"
            variant={isOnline ? "outline" : "accent"}
            onClick={() => setIsOnline((prev) => !prev)}
            className="text-xs"
          >
            {isOnline ? "Go Offline" : "Go Online Now"}
          </Button>
        </Card>
      </div>

      {/* ── Earnings Summary Cards ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-gradient-to-br from-primary to-primary-light text-white border-0 shadow-md space-y-2">
          <span className="text-xs text-white/80 font-medium">Today's Earnings</span>
          <h3 className="text-3xl font-extrabold text-accent font-display">
            {formatCurrency(4850)}
          </h3>
          <p className="text-[11px] text-white/70">12 sessions completed today</p>
        </Card>

        <Card className="p-5 space-y-2">
          <span className="text-xs text-text-muted dark:text-text-muted-dark block">This Month (August)</span>
          <h3 className="text-3xl font-extrabold text-text-primary dark:text-text-primary-dark font-display">
            {formatCurrency(64200)}
          </h3>
          <p className="text-[11px] text-success font-medium flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" /> +18% vs last month
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <span className="text-xs text-text-muted dark:text-text-muted-dark block">Pending Payout Batch</span>
          <h3 className="text-3xl font-extrabold text-accent font-display">
            {formatCurrency(12400)}
          </h3>
          <p className="text-[11px] text-text-muted dark:text-text-muted-dark">
            Next settlement: Friday, 15 Aug
          </p>
        </Card>
      </div>

      {/* ── Quick Performance Metrics ────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Star className="h-5 w-5 fill-current text-accent" />
          </div>
          <div>
            <span className="text-xs text-text-muted dark:text-text-muted-dark block">Rating</span>
            <span className="text-base font-bold text-text-primary dark:text-text-primary-dark">4.9 / 5.0</span>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary dark:text-primary-light flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-text-muted dark:text-text-muted-dark block">Total Clients</span>
            <span className="text-base font-bold text-text-primary dark:text-text-primary-dark">1,842</span>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-text-muted dark:text-text-muted-dark block">Active Mins</span>
            <span className="text-base font-bold text-text-primary dark:text-text-primary-dark">320 mins</span>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-text-muted dark:text-text-muted-dark block">Repeat Rate</span>
            <span className="text-base font-bold text-text-primary dark:text-text-primary-dark">74%</span>
          </div>
        </Card>
      </div>

      {/* ── Today's Upcoming Sessions ───────────────────────────── */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary dark:text-text-primary-dark flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" /> Today's Booked Sessions ({upcomingSessions.length})
          </h2>
          <Badge variant="primary">3 Sessions Remaining</Badge>
        </div>

        <div className="space-y-3">
          {upcomingSessions.map((sess) => (
            <div
              key={sess.id}
              className="p-4 rounded-xl bg-black/3 dark:bg-white/3 border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <Avatar src={sess.customerAvatar} name={sess.customerName} size="md" />
                <div>
                  <h3 className="font-bold text-sm text-text-primary dark:text-text-primary-dark">
                    {sess.customerName}
                  </h3>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark">
                    Topic: {sess.topic}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-between sm:justify-end">
                <div className="text-left sm:text-right text-xs">
                  <span className="font-bold text-text-primary dark:text-text-primary-dark block">
                    {sess.time}
                  </span>
                  <span className="text-text-muted dark:text-text-muted-dark uppercase text-[10px]">
                    {sess.mode} • Est. {formatCurrency(sess.estimatedFee)}
                  </span>
                </div>

                <Link href={`/chat/conv-001`}>
                  <Button size="sm" variant="accent" className="font-semibold text-xs">
                    Start Session
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
