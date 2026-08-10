import { ProviderCardSkeleton } from "@/components/ui/skeleton";

export default function CustomerLoading() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      <div className="h-40 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProviderCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
