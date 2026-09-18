export default function OrdersListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white"
        >
          {/* Order Header */}
          <div className="flex flex-col gap-4 px-4 py-4 xl:flex-row xl:items-center xl:justify-between xl:px-6">
            <div className="flex flex-wrap gap-x-6 gap-y-3 lg:gap-x-8 xl:gap-y-1">
              {/* Date */}
              <div className="space-y-2">
                <div className="h-3 w-16 rounded bg-gray-200" />
                <div className="h-4 w-24 rounded bg-gray-200" />
              </div>

              {/* Order Number */}
              <div className="space-y-2">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-4 w-32 rounded bg-gray-200" />
              </div>

              {/* Total */}
              <div className="space-y-2">
                <div className="h-3 w-14 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
            </div>

            {/* Payment Status */}
            <div className="h-5 w-28 rounded bg-gray-200" />
          </div>

          {/* Shipping Banner */}
          <div className="border-y border-gray-100 bg-gray-50 px-4 py-4 xl:px-6">
            <div className="flex items-start gap-3 xl:items-center">
              <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

              <div className="flex flex-1 flex-col gap-2">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-3 w-48 max-w-full rounded bg-gray-200" />
                <div className="h-3 w-32 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex gap-4 border-b border-gray-100 px-4 py-5 last:border-b-0 lg:gap-6 lg:px-6">
              {/* Image */}
              <div className="h-20 w-20 shrink-0 rounded-lg bg-gray-200 lg:h-24 lg:w-24" />

              {/* Product Info */}
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-full max-w-[300px] rounded bg-gray-200" />
                  <div className="h-3 w-20 rounded bg-gray-200" />
                </div>
              </div>

              {/* Price */}
              <div className="h-4 w-16 shrink-0 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
