export default function ProductInfoSkeleton() {

  return (

    <div className="animate-pulse">

      {/* Title */}

      <div className="border-b border-gray-200 pb-6">

        <div className="h-8 w-3/4 bg-gray-200 rounded mb-5" />



        <div className="flex items-center gap-5">

          <div className="w-[100px] h-[56px] rounded border border-gray-200 bg-gray-200" />



          <div className="h-4 w-40 bg-gray-200 rounded" />

        </div>

      </div>



      {/* Price */}

      <div className="h-10 w-28 bg-gray-200 rounded mt-5 mb-4" />



      {/* Rating */}

      <div className="flex items-center gap-3 mb-5">

        <div className="h-4 w-20 bg-gray-200 rounded" />

        <div className="h-4 w-24 bg-gray-200 rounded" />

      </div>



      {/* Description */}

      <div className="border-b border-gray-200 pb-5 mb-5 space-y-3">

        <div className="h-3 bg-gray-200 rounded w-full" />

        <div className="h-3 bg-gray-200 rounded w-full" />

        <div className="h-3 bg-gray-200 rounded w-5/6" />

      </div>



      {/* Stock */}

      <div className="h-4 w-28 bg-gray-200 rounded mb-6" />



      {/* Quantity + Button */}

      <div className="flex sm:max-xl:flex-col gap-3 mb-6">

        <div className="w-[140px] h-[44px] rounded bg-gray-200" />



        <div className="xl:flex-1 h-[44px] rounded bg-gray-200" />

      </div>



      {/* Social Icons */}

      <div className="flex items-center gap-3">

        {Array.from({ length: 4 }).map((_, index) => (

          <div key={index} className="w-8 h-8 rounded-full bg-gray-200" />

        ))}



        <div className="h-5 w-px bg-gray-200 mx-2" />



        <div className="w-8 h-8 rounded-full bg-gray-200" />

        <div className="w-8 h-8 rounded-full bg-gray-200" />

      </div>

    </div>

  );

}