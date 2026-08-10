"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BirthForm, type BirthFormValues } from "@/components/kundli/birth-form";
import { ChartWheel } from "@/components/kundli/chart-wheel";
import { getBirthProfiles, getKundliReport } from "@/lib/api/kundli";
import type { BirthProfile, KundliReport } from "@/types";
import { ArrowLeft, Compass, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function KundliGeneratePage() {
  const [savedProfiles, setSavedProfiles] = useState<BirthProfile[]>([]);
  const [report, setReport] = useState<KundliReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeProfileName, setActiveProfileName] = useState<string>("Arjun Mehta");

  useEffect(() => {
    getBirthProfiles().then(setSavedProfiles);
  }, []);

  const handleFormSubmit = async (values: BirthFormValues) => {
    setIsLoading(true);
    setActiveProfileName(values.name);

    // Call mock API for report generation with simulated calculation delay
    const data = await getKundliReport("bp-001");
    setReport(data);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        {report && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setReport(null)}
            className="text-xs gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Generate Another
          </Button>
        )}
      </div>

      {/* Main View Area */}
      {!report ? (
        <div className="space-y-6">
          {/* Intro Hero Card */}
          <Card className="bg-gradient-to-r from-primary via-primary-light to-secondary text-white p-6 md:p-8 border-0 shadow-md">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-accent text-xs font-medium backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Vedic Kundli Engine</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">
                Generate Your Vedic Birth Chart (Janma Kundli)
              </h1>
              <p className="text-xs md:text-sm text-white/80 max-w-xl leading-relaxed">
                Accurate planet placements, Ascendant (Lagna), Rashi, Nakshatra, Vimshottari Dasha timeline, and Manglik dosha analysis.
              </p>
            </div>
          </Card>

          {/* Birth Form Component */}
          <BirthForm
            title="Enter Birth Details"
            savedProfiles={savedProfiles}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            submitButtonText="Compute Kundli Chart"
          />
        </div>
      ) : (
        /* Result Screen with ChartWheel */
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <ChartWheel report={report} personName={activeProfileName} />
        </div>
      )}
    </div>
  );
}
