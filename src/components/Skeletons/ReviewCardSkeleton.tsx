export default function ReviewCardSkeleton() {
  return (
    <div className="flex gap-5 py-8 border-b border-gray-200 last:border-0 animate-pulse">
      {/* Avatar */}
      <div className="w-[70px] h-[70px] rounded-full bg-gray-200 shrink-0" />

      <div className="flex-1">
        {/* Name + Date */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3 mb-3">
          <div className="h-6 w-36 rounded bg-gray-200" />

          <div className="h-4 w-40 rounded bg-gray-200" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full bg-gray-200"
            />
          ))}
        </div>

        {/* Review */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}