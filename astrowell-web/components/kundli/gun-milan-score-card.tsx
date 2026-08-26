"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { MatchResult, MatchVerdict } from "@/types";
import { DoshaBadge } from "./dosha-badge";
import {
  Award,
  CheckCircle2,
  Compass,
  Download,
  Heart,
  Info,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

interface GunMilanScoreCardProps {
  result: MatchResult;
  personAName?: string;
  personBName?: string;
}

export function GunMilanScoreCard({
  result,
  personAName = "Arjun Mehta",
  personBName = "Priya Mehta",
}: GunMilanScoreCardProps) {
  const { gunMilan, doshaFlags, verdict } = result;

  const verdictStyles: Record<MatchVerdict, { bg: string; text: string; label: string }> = {
    Excellent: {
      bg: "bg-success/15 border-success text-success dark:bg-success/20 dark:text-green-300",
      text: "text-success",
      label: "Excellent Compatibility (30+ Gunas)",
    },
    Good: {
      bg: "bg-accent/15 border-accent text-amber-700 dark:bg-accent/20 dark:text-amber-300",
      text: "text-amber-600 dark:text-amber-400",
      label: "Good Compatibility (24 - 29 Gunas)",
    },
    Average: {
      bg: "bg-amber-100 border-amber-400 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      text: "text-amber-600",
      label: "Average Compatibility (18 - 23 Gunas)",
    },
    "Not Recommended": {
      bg: "bg-danger/15 border-danger text-danger dark:bg-danger/20 dark:text-red-300",
      text: "text-danger",
      label: "Not Recommended (< 18 Gunas)",
    },
  };

  const currentStyle = verdictStyles[verdict];

  return (
    <div className="space-y-6">
      {/* ── Main Compatibility Header Banner ───────────────────── */}
      <Card className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-[#0B1E36] via-[#1B3B6F] to-[#214375] text-white border-0 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-accent text-xs font-medium backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ashtakoot Kundli Matchmaking</span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-bold">
              {personAName} & {personBName}
            </h2>
            <p className="text-xs text-white/80 max-w-md">
              Evaluated across 8 kutas (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi)
            </p>
          </div>

          {/* Big Score Ring / Counter */}
          <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner min-w-[160px]">
            <span className="text-4xl md:text-5xl font-extrabold text-accent font-display">
              {gunMilan.totalScore}
              <span className="text-lg font-normal text-white/70">/36</span>
            </span>
            <span className="text-xs font-semibold text-white/90 mt-1 uppercase tracking-wider">
              Guna Milan Score
            </span>
          </div>
        </div>

        {/* Verdict Badge Bar */}
        <div className={`p-4 rounded-2xl border ${currentStyle.bg} flex items-center justify-between gap-4`}>
          <div className="flex items-center gap-3">
            <Heart className={`h-6 w-6 ${currentStyle.text}`} />
            <div>
              <span className="text-xs text-text-muted dark:text-text-muted-dark block">
                Overall Compatibility Verdict
              </span>
              <span className={`text-base font-bold ${currentStyle.text}`}>
                {verdict} — {currentStyle.label}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => alert("Simulated: Downloading full 12-page PDF Match Report...")}
            className="border-white/30 text-white hover:bg-white/10 hidden sm:inline-flex"
          >
            <Download className="h-4 w-4 mr-1.5" /> PDF Report
          </Button>
        </div>
      </Card>

      {/* ── 8 Kuta Detailed Breakdown ──────────────────────────── */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark flex items-center gap-2">
            <Compass className="h-4 w-4 text-accent" /> 8 Kuta Scores Breakdown
          </h3>
          <span className="text-xs text-text-muted dark:text-text-muted-dark">
            Min 18/36 required for traditional match
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gunMilan.kutas.map((kuta) => {
            const percentage = Math.round((kuta.score / kuta.maxScore) * 100);
            return (
              <div
                key={kuta.name}
                className="p-3.5 rounded-xl bg-black/3 dark:bg-white/3 border border-black/5 dark:border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-text-primary dark:text-text-primary-dark">
                    {kuta.name}
                  </span>
                  <span className="font-bold text-primary dark:text-primary-light">
                    {kuta.score} / {kuta.maxScore} pts
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percentage >= 70
                        ? "bg-success"
                        : percentage >= 40
                        ? "bg-accent"
                        : "bg-danger"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <p className="text-[11px] text-text-muted dark:text-text-muted-dark line-clamp-1">
                  {kuta.description}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── Dosha Flags Summary ────────────────────────────────── */}
      <Card className="p-6 space-y-4">
        <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-danger" /> Dosha Compatibility Flags
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DoshaBadge
            name="Nadi Dosha"
            isPresent={doshaFlags.nadiDosha}
            severity="severe"
            description={
              doshaFlags.nadiDosha
                ? "Nadi Dosha detected between both charts. Astrological remedy consultation recommended."
                : "No Nadi Dosha. Health & offspring factors are clear."
            }
          />

          <DoshaBadge
            name="Bhakoot Dosha"
            isPresent={doshaFlags.bhakootDosha}
            severity="severe"
            description={
              doshaFlags.bhakootDosha
                ? "Bhakoot placement requires remedy for financial harmony."
                : "Bhakoot points are clear (7/7 points scored)."
            }
          />

          <DoshaBadge
            name={`Manglik Status (${personAName})`}
            isPresent={doshaFlags.manglikA}
            severity="mild"
            description={
              doshaFlags.manglikA
                ? `${personAName} is Manglik.`
                : `${personAName} is Non-Manglik.`
            }
          />

          <DoshaBadge
            name={`Manglik Status (${personBName})`}
            isPresent={doshaFlags.manglikB}
            severity="mild"
            description={
              doshaFlags.manglikB
                ? `${personBName} is Manglik.`
                : `${personBName} is Non-Manglik.`
            }
          />
        </div>
      </Card>
    </div>
  );
}
