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
    <Card hoverable className="flex flex-col justify-between h-full group overflow-hidden p-5 border-black/6 dark:border-white/8 hover:border-accent/30 dark:hover:border-accent/40 transition-all duration-300">
      <div className="space-y-3.5">
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
            <Link
              href={`/providers/${provider.id}`}
              className="font-semibold text-text-primary dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors block truncate text-base leading-snug"
            >
              {provider.name}
            </Link>

            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <Badge variant={categoryVariants[provider.category]}>
                {categoryLabels[provider.category]}
              </Badge>
              <Badge variant={provider.isOnline ? "success" : "muted"} dot={provider.isOnline}>
                {provider.isOnline ? "Online" : "Offline"}
              </Badge>
            </div>

            <div className="flex items-center gap-2 mt-2 text-xs text-text-muted dark:text-text-muted-dark">
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
        <p className="text-xs text-text-muted dark:text-text-muted-dark line-clamp-2 leading-relaxed">
          {provider.bio}
        </p>

        {/* Languages & Specializations */}
        <div className="flex flex-wrap gap-1">
          {provider.languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="text-[11px] px-2.5 py-0.5 rounded-md bg-black/4 dark:bg-white/5 text-text-muted dark:text-text-muted-dark font-medium"
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
      <div className="mt-5 pt-3.5 border-t border-black/5 dark:border-white/8 space-y-3">
        {/* Rate Display */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted dark:text-text-muted-dark uppercase tracking-wider font-medium">Session Rate</span>
          <span className="text-sm font-bold text-text-primary dark:text-text-primary-dark">
            {formatCurrency(provider.ratePerMin)}
            <span className="text-xs font-normal text-text-muted dark:text-text-muted-dark"> / min</span>
          </span>
        </div>

        {/* Action Button Bar */}
        <div className="flex items-center gap-2">
          <Link href={`/providers/${provider.id}?mode=chat`} className="flex-shrink-0">
            <Button
              size="sm"
              variant="outline"
              className="h-9 w-9 p-0 rounded-xl border-black/10 dark:border-white/10 hover:border-primary dark:hover:border-primary-light hover:bg-primary/5 transition-all"
              title="Start Chat Consultation"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </Link>

          <Link href={`/providers/${provider.id}?mode=call`} className="flex-shrink-0">
            <Button
              size="sm"
              variant="outline"
              className="h-9 w-9 p-0 rounded-xl border-black/10 dark:border-white/10 hover:border-primary dark:hover:border-primary-light hover:bg-primary/5 transition-all"
              title="Start Voice Call"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </Link>

          <Link href={`/providers/${provider.id}`} className="flex-1 min-w-0">
            <Button
              size="sm"
              variant="accent"
              className="w-full h-9 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Consult</span>
              <Video className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}


