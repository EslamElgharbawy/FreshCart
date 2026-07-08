"use client";
import { Review } from "@/Types/reviews";
import { useMemo } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

type RatingSummaryProps = {
  reviews: Review[];
};
export default function RatingSummary({ reviews }: RatingSummaryProps) {
  const ratingStats = useMemo(() => {
    const totalReviews = reviews.length;

    return [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((review) => review.rating === star).length;

      return {
        star,
        count,
        percentage: totalReviews ? Math.round((count / totalReviews) * 100) : 0,
      };
    });
  }, [reviews]);

  return (
    <>
      {ratingStats.map((item) => (
        <div key={item.star} className="flex items-center gap-3 mb-4">
          <div className="flex mr-2">
            {[1, 2, 3, 4, 5].map((star) =>
              star <= item.star ? (
                <FaStar key={star} className="text-textMain" />
              ) : (
                <FaStar key={star} className="text-[#00000033]" />
              ),
            )}
          </div>

          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-textMain rounded-full"
              style={{ width: `${item.percentage}%` }}
            />
          </div>

          <span className="w-5 xl:w-10 text-right text-textMain text-xs">{item.percentage}%</span>
        </div>
      ))}
    </>
  );
}
