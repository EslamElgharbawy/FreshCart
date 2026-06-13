export default function BrandCardSkeleton() {
  return (
    <>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 w-[300px] animate-pulse"
          >
            {/* Brand Header */}
            <div className="my-5 flex items-center justify-center gap-5">
              <div className="w-[100px] h-[100px] bg-gray-200 rounded-md shrink-0" />

              <div className="w-full">
                <div className="h-5 bg-gray-200 rounded w-32 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-20" />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-3 gap-2">
              {/* Large Product */}
              <div className="col-span-2 row-span-2 bg-gray-200 rounded-md h-[220px]" />

              {/* Small Product */}
              <div className="bg-gray-200 rounded-md h-[105px]" />

              {/* Small Product */}
              <div className="bg-gray-200 rounded-md h-[105px]" />
            </div>
          </div>
        ))}
    </>
  );
}
