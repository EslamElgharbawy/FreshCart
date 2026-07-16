export default function RatingSummarySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-5 mb-6">
        {/* Average Rating */}
        <div className="h-16 w-20 rounded bg-gray-200" />

        <div className="flex-1">
          <div className="h-6 w-40 rounded bg-gray-200 mb-3" />

          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-4 h-4 rounded-full bg-gray-200" />
              ))}
            </div>

            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center gap-3 mb-4">
          <div className="flex gap-1 w-[90px]">
            {Array.from({ length: 5 }).map((_, star) => (
              <div key={star} className="w-4 h-4 rounded-full bg-gray-200" />
            ))}
          </div>

          <div className="flex-1 h-2 rounded-full bg-gray-200" />

          <div className="w-8 h-4 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
