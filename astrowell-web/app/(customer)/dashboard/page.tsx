"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProviderCardSkeleton } from "@/components/ui/skeleton";
import { ProviderCard } from "@/components/provider-card/provider-card";
import { getProviders } from "@/lib/api/providers";
import type { Provider } from "@/types";
import {
  Compass,
  Filter,
  HeartPulse,
  RotateCcw,
  Search,
  Sparkles,
  Star,
  Users,
  Utensils,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

type CategoryFilter = "all" | "astrologer" | "yoga" | "dietitian" | "tarot";

function CustomerDashboardContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as CategoryFilter) || "all";
  const initialQuery = searchParams.get("q") || "";

  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [minRating, setMinRating] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getProviders().then((data) => {
      setProviders(data);
      setIsLoading(false);
    });
  }, []);

  // Client-side filtering logic
  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      if (onlineOnly && !p.isOnline) {
        return false;
      }
      if (minRating !== null && p.rating < minRating) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBio = p.bio.toLowerCase().includes(q);
        const matchSpec = p.specializations.some((s) => s.toLowerCase().includes(q));
        const matchLang = p.languages.some((l) => l.toLowerCase().includes(q));
        if (!matchName && !matchBio && !matchSpec && !matchLang) {
          return false;
        }
      }
      return true;
    });
  }, [providers, selectedCategory, onlineOnly, minRating, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setOnlineOnly(false);
    setMinRating(null);
  };

  return (
    <div className="space-y-6">
      {/* ── Welcome Banner / Quick Actions ───────────────────────── */}
      <Card className="bg-gradient-to-r from-[#0B1E36] via-[#1B3B6F] to-[#214375] text-white p-6 md:p-8 border-0 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-accent text-xs font-medium backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Cosmic Discovery</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              Namaste, Arjun 👋
            </h1>
            <p className="text-xs md:text-sm text-white/80 max-w-xl leading-relaxed">
              Connect instantly with top astrologers, yoga teachers, and dietitians. Pay per minute directly from your wallet balance.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href="/kundli/generate">
              <Button size="sm" variant="accent" className="font-semibold shadow-sm">
                <Sparkles className="h-4 w-4 mr-1.5" />
                Free Kundli
              </Button>
            </Link>
            <Link href="/kundli/match">
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Compass className="h-4 w-4 mr-1.5" />
                Kundli Match
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* ── UNIFIED CELESTIAL EXPERTS MASTER CARD ─────────────────── */}
      <Card className="p-4 sm:p-6 md:p-8 space-y-6 rounded-3xl bg-surface dark:bg-surface-dark border border-black/8 dark:border-white/12 shadow-xl relative overflow-hidden">
        {/* Card Header & Counter Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-black/5 dark:border-white/8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="font-display font-bold text-xl text-text-primary dark:text-text-primary-dark">
                Browse Certified Experts
              </h2>
            </div>
            <p className="text-xs text-text-muted dark:text-text-muted-dark">
              Connect 1:1 live with verified Astrologers, Yoga Gurus & Dietitians
            </p>
          </div>

          <Badge variant="accent" className="bg-amber-400/10 text-amber-700 dark:text-amber-300 border-amber-400/30 text-xs font-bold px-3 py-1 shrink-0">
            Showing {filteredProviders.length} of {providers.length} Experts
          </Badge>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: "all", label: "All Experts", icon: Users },
            { id: "astrologer", label: "Astrologers", icon: Sparkles },
            { id: "yoga", label: "Yoga Gurus", icon: HeartPulse },
            { id: "dietitian", label: "Dietitians", icon: Utensils },
            { id: "tarot", label: "Tarot Readers", icon: Star },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-white dark:bg-primary-light shadow-sm font-semibold"
                    : "bg-black/2 dark:bg-white/3 border border-black/5 dark:border-white/8 text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Seamless Floating Search & Filter Bar (No inner container box) */}
        <div className="flex flex-col md:flex-row items-center gap-3 pt-1">
          {/* Pill Search Bar */}
          <div className="relative w-full md:flex-1">
            <input
              type="text"
              placeholder="Search by name, skill (e.g. Kundli, Hatha, PCOD, Dasha)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/3 dark:bg-white/5 border border-black/8 dark:border-white/12 rounded-full px-4 py-2.5 pl-10 text-xs sm:text-sm text-text-primary dark:text-text-primary-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 transition-all shadow-xs"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600 dark:text-amber-400 pointer-events-none" />
          </div>

          {/* Capsule Filter Chips */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setOnlineOnly((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                onlineOnly
                  ? "bg-amber-400/20 text-amber-700 dark:text-amber-300 border-amber-400/50 shadow-xs font-bold"
                  : "bg-black/3 dark:bg-white/5 border-black/8 dark:border-white/12 text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:border-black/20 dark:hover:border-white/20"
              }`}
            >
              <Zap className={`h-3.5 w-3.5 ${onlineOnly ? "text-amber-500" : ""}`} />
              <span>{onlineOnly ? "Online Only" : "Show Offline Too"}</span>
            </button>

            <button
              type="button"
              onClick={() => setMinRating((prev) => (prev === 4.8 ? null : 4.8))}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                minRating === 4.8
                  ? "bg-amber-400/20 text-amber-700 dark:text-amber-300 border-amber-400/50 shadow-xs font-bold"
                  : "bg-black/3 dark:bg-white/5 border-black/8 dark:border-white/12 text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:border-black/20 dark:hover:border-white/20"
              }`}
            >
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>4.8+ Top Rated</span>
            </button>

            {(selectedCategory !== "all" || searchQuery || onlineOnly || minRating !== null) && (
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Provider Cards Grid (Embedded Inside Master Card) */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProviderCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-4 rounded-2xl bg-black/2 dark:bg-white/2 border border-black/5 dark:border-white/8">
            <div className="h-14 w-14 rounded-full bg-black/5 dark:bg-white/5 mx-auto flex items-center justify-center text-text-muted dark:text-text-muted-dark">
              <Filter className="h-7 w-7" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
                No experts match your criteria
              </h3>
              <p className="text-xs text-text-muted dark:text-text-muted-dark leading-relaxed">
                Try relaxing your filters or clearing your search term to see more available astrologers and wellness gurus.
              </p>
            </div>
            <Button variant="accent" size="sm" onClick={resetFilters} className="cursor-pointer">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default function CustomerDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProviderCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <CustomerDashboardContent />
    </Suspense>
  );
}
