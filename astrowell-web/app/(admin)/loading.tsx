export default function AdminLoading() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      <div className="h-20 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
