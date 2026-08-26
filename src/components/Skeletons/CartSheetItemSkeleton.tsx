import { Skeleton } from "@/components/ui/skeleton";

export default function CartSheetItemSkeleton() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="border-b-[1px] border-[#ecf0f4] last:border-0 mb-5"
        >
          <div className="px-5 xl:px-8">
            <div className="flex justify-between gap-4 pb-5">
              {/* Left */}
              <div className="flex gap-4">
                {/* Image */}
                <Skeleton className="w-[90px] h-[90px] rounded-md shrink-0" />

                {/* Content */}
                <div className="flex flex-col mt-2 pl-6">
                  {/* Title */}
                  <Skeleton className="h-4 w-[180px] mb-3" />

                  {/* Vendor */}
                  <Skeleton className="h-3 w-[100px] mb-3" />

                  {/* Price */}
                  <Skeleton className="h-4 w-16 mb-4" />

                  {/* Quantity */}
                  <Skeleton className="h-6 w-[76px]" />
                </div>
              </div>

              {/* Delete */}
              <Skeleton className="h-5 w-5 rounded-sm self-end" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}