"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Check, CheckCircle2, DollarSign, Download } from "lucide-react";
import { useState } from "react";

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState([
    { id: "po-101", provider: "Pt. Raghavendra Joshi", earnings: 12400, sessions: 42, status: "pending" },
    { id: "po-102", provider: "Ananya Krishnamurthy", earnings: 9800, sessions: 35, status: "pending" },
    { id: "po-103", provider: "Yogacharya Suresh Iyer", earnings: 7400, sessions: 28, status: "settled" },
  ]);

  const handleSettle = (id: string) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "settled" } : p))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            Weekly Provider Payout Settlements
          </h1>
          <p className="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">
            Process earnings settlements for verified astrologers and gurus.
          </p>
        </div>

        <Button variant="accent" size="sm" onClick={() => alert("Exporting payout batch CSV...")}>
          <Download className="h-4 w-4 mr-1" /> Export Payout CSV
        </Button>
      </div>

      <div className="space-y-3">
        {payouts.map((po) => (
          <Card key={po.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-text-primary dark:text-text-primary-dark">
                  {po.provider}
                </h3>
                <Badge variant={po.status === "settled" ? "success" : "warning"}>
                  {po.status === "settled" ? "Settled" : "Pending Transfer"}
                </Badge>
              </div>
              <p className="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">
                {po.sessions} completed sessions • Batch #{po.id}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-base font-bold text-accent">
                {formatCurrency(po.earnings)}
              </span>

              {po.status === "pending" ? (
                <Button size="sm" variant="accent" onClick={() => handleSettle(po.id)}>
                  Settle Earnings
                </Button>
              ) : (
                <span className="text-xs text-success font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Paid
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
