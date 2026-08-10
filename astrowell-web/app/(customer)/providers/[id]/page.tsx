"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProviderProfileSkeleton } from "@/components/ui/skeleton";
import { getProviderById } from "@/lib/api/providers";
import { formatCurrency } from "@/lib/utils";
import type { Provider } from "@/types";
import {
  ArrowLeft,
  Award,
  Clock,
  Globe,
  MessageSquare,
  Phone,
  ShieldCheck,
  Star,
  ThumbsUp,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ProviderProfileContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const providerId = (params.id as string) || "prov-001";
  const preselectedMode = searchParams.get("mode");

  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getProviderById(providerId).then((data) => {
      setProvider(data);
      setIsLoading(false);
    });
  }, [providerId]);

  if (isLoading) {
    return <ProviderProfileSkeleton />;
  }

  if (!provider) {
    return (
      <div className="text-center py-16 space-y-4">
        <Card className="max-w-md mx-auto p-8 space-y-4">
          <h2 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">
            Provider Not Found
          </h2>
          <p className="text-xs text-text-muted dark:text-text-muted-dark">
            The requested expert profile could not be located.
          </p>
          <Link href="/dashboard">
            <Button variant="accent" size="sm">
              Back to Experts List
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const categoryLabels: Record<Provider["category"], string> = {
    astrologer: "Vedic Astrologer",
    yoga: "Yoga Instructor",
    dietitian: "Diet & Wellness Expert",
    tarot: "Tarot Reader",
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-28">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to List
        </button>

        <Badge variant={provider.isOnline ? "success" : "muted"} dot={provider.isOnline}>
          {provider.isOnline ? "Online & Ready" : "Currently Offline"}
        </Badge>
      </div>

      {/* ── Main Profile Header Card ──────────────────────────────── */}
      <Card className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          <Avatar
            src={provider.avatarUrl}
            name={provider.name}
            size="xl"
            isOnline={provider.isOnline}
            className="h-24 w-24 md:h-28 md:w-28 shadow-md"
          />

          <div className="flex-1 space-y-3 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
                  {provider.name}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-1 flex-wrap">
                  <Badge variant="primary">{categoryLabels[provider.category]}</Badge>
                  <span className="text-xs text-text-muted dark:text-text-muted-dark flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-success" /> Verified Expert
                  </span>
                </div>
              </div>

              <div className="text-center md:text-right bg-accent/10 dark:bg-accent/15 px-4 py-2 rounded-2xl border border-accent/20">
                <span className="text-xs text-text-muted dark:text-text-muted-dark block font-medium">
                  Consultation Rate
                </span>
                <span className="text-lg font-bold text-accent">
                  {formatCurrency(provider.ratePerMin)}
                  <span className="text-xs font-normal text-text-muted dark:text-text-muted-dark">/min</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/5 dark:border-white/8 text-center">
              <div className="p-2 rounded-xl bg-black/4 dark:bg-white/4">
                <span className="text-xs text-text-muted dark:text-text-muted-dark block">Rating</span>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                  <Star className="h-4 w-4 fill-current text-accent" />
                  {provider.rating.toFixed(1)}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-black/4 dark:bg-white/4">
                <span className="text-xs text-text-muted dark:text-text-muted-dark block">Experience</span>
                <span className="text-sm font-bold text-text-primary dark:text-text-primary-dark mt-0.5 block">
                  {provider.experienceYears} Years
                </span>
              </div>

              <div className="p-2 rounded-xl bg-black/4 dark:bg-white/4">
                <span className="text-xs text-text-muted dark:text-text-muted-dark block">Sessions</span>
                <span className="text-sm font-bold text-text-primary dark:text-text-primary-dark mt-0.5 block">
                  {provider.totalSessions.toLocaleString()}+
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-black/5 dark:border-white/8 text-xs text-text-muted dark:text-text-muted-dark">
          <Globe className="h-4 w-4 flex-shrink-0" />
          <span className="font-semibold text-text-primary dark:text-text-primary-dark">Languages:</span>
          <span>{provider.languages.join(", ")}</span>
        </div>
      </Card>

      {/* ── Biography & Specializations ──────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 space-y-4 p-6">
          <h2 className="text-base font-bold text-text-primary dark:text-text-primary-dark flex items-center gap-2">
            <Award className="h-4 w-4 text-accent" /> About Expert
          </h2>
          <p className="text-xs sm:text-sm text-text-muted dark:text-text-muted-dark leading-relaxed whitespace-pre-line">
            {provider.bio}
          </p>

          <div className="pt-4 border-t border-black/5 dark:border-white/8 space-y-2">
            <h3 className="text-xs font-semibold text-text-primary dark:text-text-primary-dark uppercase tracking-wider">
              Core Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              {provider.specializations.map((spec) => (
                <Badge key={spec} variant="default" className="text-xs px-3 py-1">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <h2 className="text-base font-bold text-text-primary dark:text-text-primary-dark flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" /> Hours & Status
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/4 dark:bg-white/4">
              <span className="text-text-muted dark:text-text-muted-dark">Status</span>
              <span className={`font-semibold ${provider.isOnline ? "text-success" : "text-text-muted"}`}>
                {provider.isOnline ? "Available for Chat/Call" : "Offline"}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/4 dark:bg-white/4">
              <span className="text-text-muted dark:text-text-muted-dark">Typical Wait</span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark">Under 2 mins</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/4 dark:bg-white/4">
              <span className="text-text-muted dark:text-text-muted-dark">Satisfaction</span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark">98% Positive</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-text-muted dark:text-text-muted-dark flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-success flex-shrink-0" />
            <span>Money-back guaranteed for initial 2 mins if dissatisfied.</span>
          </div>
        </Card>
      </div>

      {/* ── Client Reviews Section Preview ───────────────────────── */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary dark:text-text-primary-dark flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-accent" /> Client Reviews ({provider.reviewCount})
          </h2>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current text-accent" /> {provider.rating.toFixed(1)} / 5.0
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "Saurabh Sharma",
              date: "2 days ago",
              rating: 5,
              comment: "Extremely accurate Kundli prediction regarding my promotion. Highly recommended!",
            },
            {
              name: "Meenakshi K.",
              date: "1 week ago",
              rating: 5,
              comment: "Very calm and soft-spoken. Suggested practical remedies that actually worked.",
            },
          ].map((rev, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-black/4 dark:bg-white/4 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-text-primary dark:text-text-primary-dark">{rev.name}</span>
                <span className="text-[10px] text-text-muted dark:text-text-muted-dark">{rev.date}</span>
              </div>
              <div className="flex text-accent">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current text-accent" />
                ))}
              </div>
              <p className="text-text-muted dark:text-text-muted-dark">{rev.comment}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Sticky Bottom Action Bar ────────────────────────────── */}
      <div className="fixed bottom-16 lg:bottom-0 inset-x-0 z-30 bg-surface/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-black/5 dark:border-white/8 p-3 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="hidden sm:block">
            <span className="text-xs text-text-muted dark:text-text-muted-dark block">Billing Rate</span>
            <span className="text-sm font-bold text-accent">
              {formatCurrency(provider.ratePerMin)}/min
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link href={`/chat/conv-001`} className="flex-1 sm:flex-none">
              <Button
                variant={preselectedMode === "chat" ? "primary" : "outline"}
                fullWidth
                size="md"
                className="gap-1.5 text-xs sm:text-sm"
              >
                <MessageSquare className="h-4 w-4" />
                Chat
              </Button>
            </Link>

            <Link href={`/call/session-001`} className="flex-1 sm:flex-none">
              <Button
                variant={preselectedMode === "call" ? "primary" : "outline"}
                fullWidth
                size="md"
                className="gap-1.5 text-xs sm:text-sm"
              >
                <Phone className="h-4 w-4" />
                Call
              </Button>
            </Link>

            <Link href={`/call/session-001`} className="flex-1 sm:flex-none">
              <Button variant="accent" fullWidth size="md" className="gap-1.5 text-xs sm:text-sm font-semibold">
                <Video className="h-4 w-4" />
                Video Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProviderProfilePage() {
  return (
    <Suspense fallback={<ProviderProfileSkeleton />}>
      <ProviderProfileContent />
    </Suspense>
  );
}
