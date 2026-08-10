"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Provider } from "@/types";
import { MessageSquare, Phone, Star, Video } from "lucide-react";
import Link from "next/link";

interface ProviderCardProps {
  provider: Provider;
  /** Display style: 'grid' card or 'list' compact row */
  layout?: "grid" | "list";
}

export function ProviderCard({ provider, layout = "grid" }: ProviderCardProps) {
  const categoryLabels: Record<Provider["category"], string> = {
    astrologer: "Vedic Astrologer",
    yoga: "Yoga Instructor",
    dietitian: "Diet & Wellness",
    tarot: "Tarot Reader",
  };

  const categoryVariants: Record<Provider["category"], "primary" | "secondary" | "accent" | "warning"> = {
    astrologer: "primary",
    yoga: "success" as any,
    dietitian: "secondary",
    tarot: "accent",
  };

  return (
    <Card hoverable className="flex flex-col justify-between h-full group overflow-hidden">
      <div>
        {/* Top Header: Avatar + Info */}
        <div className="flex items-start gap-3.5">
          <Link href={`/providers/${provider.id}`} className="relative flex-shrink-0">
            <Avatar
              src={provider.avatarUrl}
              name={provider.name}
              size="lg"
              isOnline={provider.isOnline}
            />
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <Link
                href={`/providers/${provider.id}`}
                className="font-semibold text-text-primary dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors truncate text-base"
              >
                {provider.name}
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Badge variant={categoryVariants[provider.category]}>
                {categoryLabels[provider.category]}
              </Badge>
              <Badge variant={provider.isOnline ? "success" : "muted"} dot={provider.isOnline}>
                {provider.isOnline ? "Online" : "Offline"}
              </Badge>
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs text-text-muted dark:text-text-muted-dark">
              <span className="flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
                <Star className="h-3.5 w-3.5 fill-current text-accent" />
                {provider.rating.toFixed(1)} ({provider.reviewCount})
              </span>
              <span>•</span>
              <span>{provider.experienceYears} yrs exp</span>
            </div>
          </div>
        </div>

        {/* Bio preview */}
        <p className="mt-3 text-xs text-text-muted dark:text-text-muted-dark line-clamp-2 leading-relaxed">
          {provider.bio}
        </p>

        {/* Languages & Specializations */}
        <div className="mt-3 flex flex-wrap gap-1">
          {provider.languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="text-[11px] px-2 py-0.5 rounded-md bg-black/4 dark:bg-white/5 text-text-muted dark:text-text-muted-dark"
            >
              {lang}
            </span>
          ))}
          {provider.languages.length > 3 && (
            <span className="text-[11px] px-1.5 py-0.5 text-text-muted dark:text-text-muted-dark">
              +{provider.languages.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer / Pricing & Actions */}
      <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/8 flex items-center justify-between gap-1.5 min-w-0">
        <div className="flex-shrink-0 min-w-0">
          <span className="text-[11px] text-text-muted dark:text-text-muted-dark block leading-none">Rate</span>
          <span className="text-xs sm:text-sm font-bold text-text-primary dark:text-text-primary-dark whitespace-nowrap">
            {formatCurrency(provider.ratePerMin)}
            <span className="text-[10px] font-normal text-text-muted dark:text-text-muted-dark">/min</span>
          </span>
        </div>

        <div className="flex items-center gap-1 flex-shrink min-w-0">
          <Link href={`/providers/${provider.id}?mode=chat`} className="flex-shrink-0">
            <Button size="sm" variant="outline" className="h-8 w-8 p-0 flex items-center justify-center" title="Start Chat">
              <MessageSquare className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Link href={`/providers/${provider.id}?mode=call`} className="flex-shrink-0">
            <Button size="sm" variant="outline" className="h-8 w-8 p-0 flex items-center justify-center" title="Start Voice Call">
              <Phone className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Link href={`/providers/${provider.id}`} className="flex-shrink-0">
            <Button size="sm" variant="accent" className="h-8 px-2.5 sm:px-3 text-xs font-semibold whitespace-nowrap">
              <Video className="h-3.5 w-3.5 mr-1 hidden xl:inline" />
              Consult
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
