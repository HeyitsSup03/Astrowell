"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Package, Sparkles, Truck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ShopOrdersPage() {
  const searchParams = useSearchParams();
  const isNewOrder = searchParams.get("success") === "true";

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark py-10 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Success Banner if redirected from checkout */}
        {isNewOrder && (
          <Card className="p-6 bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-transparent border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 shrink-0" />
            <div className="space-y-1">
              <h2 className="font-display font-bold text-xl text-text-primary dark:text-text-primary-dark">
                Sacred Order Confirmed & Consecration Initiated!
              </h2>
              <p className="text-xs sm:text-sm text-text-muted dark:text-text-muted-dark">
                Order ID <span className="font-bold text-text-primary dark:text-text-primary-dark">#AST-89421</span> has been placed. Our Vedic Pandits will conduct the consecration ritual before dispatch.
              </p>
            </div>
          </Card>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-text-primary dark:text-text-primary-dark">
              Your Orders & Consecrations
            </h1>
            <p className="text-xs sm:text-sm text-text-muted dark:text-text-muted-dark mt-1">
              Track delivery status and download lab authenticity certificates.
            </p>
          </div>

          <Link href="/shop">
            <Button size="sm" className="bg-accent hover:bg-amber-500 text-primary font-bold rounded-full text-xs px-4">
              Explore Shop
            </Button>
          </Link>
        </div>

        {/* Order Cards List */}
        <div className="space-y-4">
          <Card className="p-5 sm:p-6 bg-surface dark:bg-surface-dark border-black/5 dark:border-white/8 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
            {/* Top Order Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 dark:border-white/8 pb-4">
              <div>
                <span className="text-xs font-bold text-text-primary dark:text-text-primary-dark">
                  Order #AST-89421
                </span>
                <div className="text-[11px] text-text-muted dark:text-text-muted-dark mt-0.5">
                  Placed on Aug 18, 2026 • Total: ₹14,799
                </div>
              </div>

              <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Vedic Consecration in Progress
              </Badge>
            </div>

            {/* Order Progress Tracker */}
            <div className="grid grid-cols-4 gap-2 pt-1 text-center text-xs font-medium text-text-muted dark:text-text-muted-dark">
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Order Placed</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-amber-600 dark:text-amber-400 font-semibold">Energizing Ritual</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-black/10 dark:bg-white/10" />
                <span>Dispatched</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-black/10 dark:bg-white/10" />
                <span>Delivered</span>
              </div>
            </div>

            {/* Items List */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-black/5 overflow-hidden shrink-0 relative">
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80"
                    alt="Pukhraj Gemstone"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-text-primary dark:text-text-primary-dark">
                    Natural Yellow Sapphire (Pukhraj) 5.25 Carat
                  </h4>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">
                    Lab Certificate: #GL-889342 • Qty: 1
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button size="sm" variant="outline" className="text-xs rounded-full border-black/10 dark:border-white/10 flex-1 sm:flex-initial">
                  Download Certificate
                </Button>
                <Button size="sm" className="bg-primary text-white text-xs rounded-full flex-1 sm:flex-initial">
                  Track Delivery
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
