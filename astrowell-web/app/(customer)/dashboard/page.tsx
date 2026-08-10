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
      <Card className="bg-gradient-to-r from-primary via-primary-light to-primary text-white p-6 md:p-8 border-0 shadow-md">
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

      {/* ── Category Filter Tabs ────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-lg font-bold text-text-primary dark:text-text-primary-dark">
            Browse Experts
          </h2>
          <span className="text-xs text-text-muted dark:text-text-muted-dark">
            Showing {filteredProviders.length} of {providers.length} providers
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-primary text-white dark:bg-primary-light shadow-sm font-semibold"
                    : "bg-surface dark:bg-surface-dark border border-black/5 dark:border-white/8 text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Filter Controls Bar */}
        <Card className="p-3.5 flex flex-col md:flex-row items-center gap-3">
          <div className="w-full md:flex-1">
            <Input
              placeholder="Search by name, skill (e.g. Kundli, Hatha, PCOD, Dasha)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <Button
              size="sm"
              variant={onlineOnly ? "primary" : "outline"}
              onClick={() => setOnlineOnly((prev) => !prev)}
              className="text-xs gap-1.5 whitespace-nowrap"
            >
              <Zap className={`h-3.5 w-3.5 ${onlineOnly ? "text-accent" : ""}`} />
              {onlineOnly ? "Online Only" : "Show Offline Too"}
            </Button>

            <Button
              size="sm"
              variant={minRating === 4.8 ? "primary" : "outline"}
              onClick={() => setMinRating((prev) => (prev === 4.8 ? null : 4.8))}
              className="text-xs gap-1.5 whitespace-nowrap"
            >
              <Star className="h-3.5 w-3.5 fill-current text-accent" />
              4.8+ Top Rated
            </Button>

            {(selectedCategory !== "all" || searchQuery || onlineOnly || minRating !== null) && (
              <Button
                size="sm"
                variant="ghost"
                onClick={resetFilters}
                className="text-xs text-danger hover:text-danger hover:bg-danger/10"
                title="Reset all filters"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* ── Provider Cards Grid ─────────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProviderCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProviders.length === 0 ? (
        <Card className="text-center py-12 px-4 space-y-4">
          <div className="h-16 w-16 rounded-full bg-black/5 dark:bg-white/5 mx-auto flex items-center justify-center text-text-muted dark:text-text-muted-dark">
            <Filter className="h-8 w-8" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
              No experts match your criteria
            </h3>
            <p className="text-xs text-text-muted dark:text-text-muted-dark leading-relaxed">
              Try relaxing your filters or clearing your search term to see more available astrologers and wellness gurus.
            </p>
          </div>
          <Button variant="accent" size="sm" onClick={resetFilters}>
            Clear All Filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      )}
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
