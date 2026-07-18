"use client";
import { actions } from "@/Features/AuthDialog.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { Review } from "@/Types/reviews";
import { useMemo } from "react";
import { FaStar } from "react-icons/fa";
import RatingStars from "../RatingStars/RatingStars";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useTranslation } from "react-i18next";

type RatingSummaryProps = {
  reviews: Review[];
};
export default function RatingSummary({ reviews }: RatingSummaryProps) {
  
  const { t } = useTranslation();
  const { token } = useAppSelector((store) => store.user);
  console.log("Redux Token:", token);
console.log("LocalStorage Token:", localStorage.getItem("token"));
  const dispatch = useAppDispatch();
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
      <div className="mb-10">
        {ratingStats.map((item) => (
          <div key={item.star} className="flex items-center gap-3 mb-4">
            <div className="flex mr-2">
              <RatingStars rating={item.star} size={14} color="text-textMain" />
            </div>

            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-textMain rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>

            <span className="w-5 xl:w-10 text-right text-textMain text-xs">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
      {token ? (
        <ReviewForm />
      ) : (
        <div className="rounded-md border border-[#ebebeb] p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">
            {t("reviewsSection.wantReview")}
          </h3>

          <p className="mb-5 text-[#777]">
            {t("reviewsSection.signInMessage")}
          </p>

          <button
            onClick={() => dispatch(actions.openAuthDialog("SignIn"))}
            className="inline-flex h-11 items-center justify-center bg-primary px-6 text-white transition hover:opacity-90"
          >
            {t("reviewsSection.signIn")}
          </button>
        </div>
      )}
    </>
  );
}
