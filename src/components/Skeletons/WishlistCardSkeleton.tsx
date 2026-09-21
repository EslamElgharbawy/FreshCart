export default function WishlistCardSkeleton() {
  return (
    <div className="group animate-pulse">
      {/* Image Skeleton */}
      <div className="relative">
        <div className="w-full aspect-square bg-gray-200 rounded-sm" />

        {/* Quick View Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-300" />

        {/* Delete Button Skeleton */}
        <div className="absolute top-[10px] right-[10px] xl:top-4 xl:right-4">
          <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-gray-300" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mt-4 text-center">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-3" />

        {/* Price */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
      </div>
    </div>
  );
}