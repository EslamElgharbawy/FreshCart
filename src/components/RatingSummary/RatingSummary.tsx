"use client";
import { actions } from "@/Features/AuthDialog.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { RatingSummaryProps } from "@/Types/reviews";
import { useMemo } from "react";
import RatingStars from "../RatingStars/RatingStars";
import { useTranslation } from "react-i18next";
import ReviewDialog from "../ReviewDialog/ReviewDialog";

export default function RatingSummary({
  reviews,
  openReviewDialog,
  setOpenReviewDialog,
  selectedReview,
}: RatingSummaryProps) {
  const { t } = useTranslation();
  const { token, user } = useAppSelector((store) => store.user);

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

  const handleReviewClick = () => {
    if (!token) {
      dispatch(actions.openAuthDialog("SignIn"));
      return;
    }

    setOpenReviewDialog(true);
  };

  const hasReviewed = reviews.some((review) => review.user._id === user?.id);

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
      {!hasReviewed ? (
        <div className="rounded-md border border-[#ebebeb] p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">
            {token
              ? t("reviewsSection.reviewThisProduct")
              : t("reviewsSection.wantReview")}
          </h3>

          <p className="mb-5 text-[#777]">
            {token
              ? t("reviewsSection.shareThoughts")
              : t("reviewsSection.signInMessage")}
          </p>

          <button
            onClick={handleReviewClick}
            className="inline-flex h-11 items-center justify-center bg-primary px-6 text-white transition-all duration-300 hover:bg-[#1d2128]"
          >
            {token
              ? t("reviewsSection.writeReview")
              : t("reviewsSection.signIn")}
          </button>
        </div>
      ) : (
        <div className="rounded-md border border-[#ebebeb] p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">
            ✅ {t("reviewsSection.reviewSubmitted")}{" "}
          </h3>

          <p className="text-[#777]">
            {t("reviewsSection.reviewSubmittedMessage")}
          </p>
        </div>
      )}

      <ReviewDialog
        open={openReviewDialog}
        onOpenChange={setOpenReviewDialog}
        initialReview={selectedReview ?? undefined}
      />
    </>
  );
}
