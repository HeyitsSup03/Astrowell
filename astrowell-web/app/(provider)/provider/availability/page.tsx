"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Clock, Save, Sparkles } from "lucide-react";
import { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeBlocks = [
  { id: "morning", label: "Morning (08:00 - 12:00)" },
  { id: "afternoon", label: "Afternoon (12:00 - 17:00)" },
  { id: "evening", label: "Evening (17:00 - 21:00)" },
  { id: "night", label: "Late Night (21:00 - 00:00)" },
];

export function AvailabilityPage() {
  const [ratePerMin, setRatePerMin] = useState<number>(30);
  const [activeGrid, setActiveGrid] = useState<Record<string, boolean>>({
    "Monday-morning": true,
    "Monday-evening": true,
    "Tuesday-morning": true,
    "Tuesday-afternoon": true,
    "Wednesday-evening": true,
    "Thursday-morning": true,
    "Thursday-evening": true,
    "Friday-afternoon": true,
    "Friday-evening": true,
    "Saturday-morning": true,
    "Saturday-afternoon": true,
  });
  const [isSaved, setIsSaved] = useState(false);

  const toggleSlot = (key: string) => {
    setActiveGrid((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            Weekly Availability & Rates
          </h1>
          <p className="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">
            Configure your active hours and consultation pricing for client bookings.
          </p>
        </div>

        <Button variant="accent" onClick={handleSave} className="font-bold gap-1.5">
          {isSaved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {isSaved ? "Saved Successfully!" : "Save Availability"}
        </Button>
      </div>

      {/* ── Per-Minute Rate Setting ───────────────────────────── */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <h2 className="text-base font-bold text-text-primary dark:text-text-primary-dark">
            Consultation Rate Configuration
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <Input
            label="Rate Per Minute (INR)"
            type="number"
            value={ratePerMin}
            onChange={(e) => setRatePerMin(Number(e.target.value))}
            leftIcon={<span className="font-bold text-xs">₹</span>}
          />
          <div className="text-xs text-text-muted dark:text-text-muted-dark bg-black/4 dark:bg-white/4 p-3 rounded-xl">
            At <strong>₹{ratePerMin}/min</strong>, an average 20-min session earns you <strong>₹{ratePerMin * 20}</strong>.
          </div>
        </div>
      </Card>

      {/* ── Weekly Slot Grid ───────────────────────────────────── */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary dark:text-text-primary-dark flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" /> Weekly Schedule Grid
          </h2>
          <span className="text-xs text-text-muted dark:text-text-muted-dark">
            Click blocks to toggle available hours
          </span>
        </div>

        <div className="space-y-4 overflow-x-auto">
          {days.map((day) => (
            <div key={day} className="p-3.5 rounded-xl bg-black/3 dark:bg-white/3 border border-black/5 dark:border-white/5 space-y-2">
              <span className="text-xs font-bold text-text-primary dark:text-text-primary-dark block">
                {day}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeBlocks.map((block) => {
                  const key = `${day}-${block.id}`;
                  const isActive = !!activeGrid[key];
                  return (
                    <button
                      type="button"
                      key={block.id}
                      onClick={() => toggleSlot(key)}
                      className={`p-2.5 rounded-xl text-xs font-medium transition-all text-center border ${
                        isActive
                          ? "bg-primary text-white border-primary dark:bg-primary-light font-semibold"
                          : "border-black/10 dark:border-white/10 text-text-muted dark:text-text-muted-dark hover:border-primary"
                      }`}
                    >
                      {block.label.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default AvailabilityPage;
