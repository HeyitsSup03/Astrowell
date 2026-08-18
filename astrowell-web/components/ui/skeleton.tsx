import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-black/5 dark:bg-white/10",
        className
      )}
      {...props}
    />
  );
}

function ProviderCardSkeleton() {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/8 bg-surface dark:bg-surface-dark p-5 flex flex-col justify-between h-full gap-4">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Skeleton className="h-14 w-14 rounded-full flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center gap-2 mt-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
        <Skeleton className="h-9 w-full rounded-xl" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
      </div>

      <div className="pt-3 border-t border-black/5 dark:border-white/8 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-xl flex-shrink-0" />
          <Skeleton className="h-9 w-9 rounded-xl flex-shrink-0" />
          <Skeleton className="h-9 flex-1 rounded-xl" />
        </div>
      </div>
    </div>
  );
}


function ProviderProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto p-4 md:p-6">
      <div className="rounded-2xl border border-black/5 dark:border-white/8 bg-surface dark:bg-surface-dark p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="flex-1 flex flex-col items-center md:items-start gap-3 w-full">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-black/5 dark:border-white/8 bg-surface dark:bg-surface-dark p-6 flex flex-col gap-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}

export { Skeleton, ProviderCardSkeleton, ProviderProfileSkeleton };
