export default function DashboardSkeleton() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-8 w-48 bg-navy-elevated rounded-lg animate-pulse mb-2" />
        <div className="h-4 w-32 bg-navy-elevated rounded-lg animate-pulse" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="bg-navy-surface border border-navy-border rounded-xl p-5" key={i}>
            <div className="h-4 w-24 bg-navy-elevated rounded animate-pulse mb-3" />
            <div className="h-8 w-12 bg-navy-elevated rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
