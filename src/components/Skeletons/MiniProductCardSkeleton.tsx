export default function MiniProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-5 px-2 animate-pulse">
          {/* Image */}
          <div className="w-[100px] h-[100px] bg-gray-200 rounded-md shrink-0" />

          <div className="flex-1">
            {/* Title */}
            <div className="h-4 bg-gray-200 rounded w-[60%] mb-3" />

            {/* Rating + Reviews */}
            <div className="flex gap-4 mb-3">
              <div className="h-3 bg-gray-200 rounded w-10" />
              <div className="h-3 bg-gray-200 rounded w-16" />
            </div>

            {/* Price */}
            <div className="h-5 bg-gray-200 rounded w-14" />
          </div>
        </div>
      ))}
    </div>
  );
}