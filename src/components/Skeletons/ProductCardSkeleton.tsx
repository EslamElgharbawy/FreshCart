export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative">
        {/* Image */}
        <div className="aspect-square w-full rounded bg-gray-200" />
      </div>

      <div className="mt-4 text-center">
        {/* Title */}
        <div className="space-y-2 px-5 mb-3">
          <div className="h-4 w-full rounded bg-gray-200" />
        </div>

        {/* Price */}
        <div className="h-5 w-20 mx-auto rounded bg-gray-200" />
      </div>
    </div>
  );
}