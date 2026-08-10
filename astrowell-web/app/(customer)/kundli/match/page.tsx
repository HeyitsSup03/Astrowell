"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BirthForm, type BirthFormValues } from "@/components/kundli/birth-form";
import { GunMilanScoreCard } from "@/components/kundli/gun-milan-score-card";
import { getBirthProfiles, getMatchResult } from "@/lib/api/kundli";
import type { BirthProfile, MatchResult } from "@/types";
import { ArrowLeft, Compass, Heart, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function KundliMatchPage() {
  const [savedProfiles, setSavedProfiles] = useState<BirthProfile[]>([]);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"step1" | "step2" | "result">("step1");

  const [personA, setPersonA] = useState<BirthFormValues>({
    label: "Self",
    name: "Arjun Mehta",
    gender: "male",
    dob: "1995-03-22",
    tob: "06:45",
    placeOfBirth: "Mumbai, Maharashtra, India",
  });

  const [personB, setPersonB] = useState<BirthFormValues>({
    label: "Partner",
    name: "Priya Mehta",
    gender: "female",
    dob: "1997-07-10",
    tob: "14:20",
    placeOfBirth: "Pune, Maharashtra, India",
  });

  useEffect(() => {
    getBirthProfiles().then(setSavedProfiles);
  }, []);

  const handleStep1Submit = (values: BirthFormValues) => {
    setPersonA(values);
    setStep("step2");
  };

  const handleStep2Submit = async (values: BirthFormValues) => {
    setPersonB(values);
    setIsLoading(true);

    // Call mock API for matchmaking computation
    const result = await getMatchResult("bp-001", "bp-002");
    setMatchResult(result);
    setIsLoading(false);
    setStep("result");
  };

  const handleReset = () => {
    setMatchResult(null);
    setStep("step1");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        {step === "result" && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="text-xs gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Check Another Match
          </Button>
        )}
      </div>

      {/* Hero Header */}
      <Card className="bg-gradient-to-r from-primary via-primary-light to-secondary text-white p-6 md:p-8 border-0 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-accent text-xs font-medium backdrop-blur-sm">
            <Heart className="h-3.5 w-3.5 fill-current text-accent" />
            <span>Ashtakoot Guna Milan Subsystem</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">
            Kundli Matchmaking & Compatibility
          </h1>
          <p className="text-xs md:text-sm text-white/80 max-w-xl leading-relaxed">
            36-Guna Ashtakoot calculation, Manglik dosha cancellation check, and Nadi dosha indicators for marriage compatibility.
          </p>
        </div>

        {/* Step Indicator */}
        {step !== "result" && (
          <div className="flex items-center gap-2 pt-6 border-t border-white/15 text-xs">
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                step === "step1" ? "bg-accent text-white font-bold" : "bg-white/10 text-white/70"
              }`}
            >
              <span>1. Your Details</span>
            </div>
            <span className="text-white/40">•</span>
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                step === "step2" ? "bg-accent text-white font-bold" : "bg-white/10 text-white/70"
              }`}
            >
              <span>2. Partner's Details</span>
            </div>
          </div>
        )}
      </Card>

      {/* Step 1: Person A Details */}
      {step === "step1" && (
        <div className="animate-in fade-in duration-200">
          <BirthForm
            title="Step 1: Your Birth Details"
            subtitle="Enter your birth information or select a saved profile"
            savedProfiles={savedProfiles}
            initialValues={personA}
            onSubmit={handleStep1Submit}
            submitButtonText="Proceed to Partner's Details →"
          />
        </div>
      )}

      {/* Step 2: Person B Details */}
      {step === "step2" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-text-muted dark:text-text-muted-dark">
              Matching for: <strong className="text-text-primary dark:text-text-primary-dark">{personA.name}</strong>
            </span>
            <button
              onClick={() => setStep("step1")}
              className="text-xs text-primary dark:text-primary-light font-semibold hover:underline"
            >
              Edit Step 1
            </button>
          </div>

          <BirthForm
            title="Step 2: Partner's Birth Details"
            subtitle="Enter partner's date, time & place of birth"
            savedProfiles={savedProfiles.filter((p) => p.name !== personA.name)}
            initialValues={personB}
            onSubmit={handleStep2Submit}
            isLoading={isLoading}
            submitButtonText="Calculate Guna Milan Compatibility"
          />
        </div>
      )}

      {/* Step 3: Match Result Reveal */}
      {step === "result" && matchResult && (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <GunMilanScoreCard
            result={matchResult}
            personAName={personA.name}
            personBName={personB.name}
          />
        </div>
      )}
    </div>
  );
}
