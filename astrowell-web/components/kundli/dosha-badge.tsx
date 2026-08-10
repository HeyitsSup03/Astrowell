"use client";

import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Info, ShieldAlert, ShieldCheck } from "lucide-react";

interface DoshaBadgeProps {
  name: string;
  isPresent: boolean;
  description?: string;
  severity?: "mild" | "severe" | "none";
}

export function DoshaBadge({
  name,
  isPresent,
  description,
  severity = "severe",
}: DoshaBadgeProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-black/4 dark:bg-white/4 border border-black/5 dark:border-white/8">
      <div className="mt-0.5">
        {isPresent ? (
          <ShieldAlert
            className={`h-5 w-5 ${
              severity === "severe" ? "text-danger" : "text-amber-500"
            }`}
          />
        ) : (
          <ShieldCheck className="h-5 w-5 text-success" />
        )}
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-xs text-text-primary dark:text-text-primary-dark">
            {name}
          </span>
          <Badge variant={isPresent ? (severity === "severe" ? "danger" : "warning") : "success"}>
            {isPresent ? (severity === "severe" ? "Dosha Present" : "Mild Impact") : "No Dosha / Clear"}
          </Badge>
        </div>

        {description && (
          <p className="text-[11px] text-text-muted dark:text-text-muted-dark leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
