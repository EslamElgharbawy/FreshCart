"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { SubmitEvent, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  addReview,
  getReviewsForProduct,
  updateReview,
} from "@/Features/Reviews.slice";
import toast from "react-hot-toast";
import { ReviewDialogProps } from "@/Types/reviews";
import { useTranslation } from "react-i18next";

export default function ReviewDialog({
  open,
  onOpenChange,
  initialReview,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const canSubmit = rating > 0 && review.trim().length > 0;
  const canEdit =
    rating != initialReview?.rating || review.trim() !== initialReview?.review;
  const { productDetails } = useAppSelector((store) => store.ProductSlice);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    if (initialReview) {
      setRating(initialReview.rating);
      setReview(initialReview.review);
    } else {
      setRating(0);
      setReview("");
    }
  }, [initialReview, open]);
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!canSubmit || !productDetails) return;

    try {
      if (initialReview) {
        await dispatch(
          updateReview({
            reviewId: initialReview._id,
            review,
            rating,
          }),
        ).unwrap();

        toast.success(t("reviewsSection.reviewUpdatedSuccess"));
      } else {
        await dispatch(
          addReview({
            reviewId: productDetails._id,
            review,
            rating,
          }),
        ).unwrap();

        toast.success(t("reviewsSection.reviewSubmittedSuccess"));
      }

      onOpenChange(false);

      setReview("");
      setRating(0);
      setHover(0);

      dispatch(getReviewsForProduct(productDetails._id));
    } catch (error) {
      console.log(error);

      toast.error(
        initialReview
          ? t("reviewsSection.reviewUpdatedError")
          : t("reviewsSection.reviewSubmittedError"),
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-[92%] lg:max-w-[650px] p-4 2xl:p-8 rounded-none ring-0"
      >
        <DialogHeader>
          <DialogTitle className="sm:max-xl:mt-8 text-2xl text-[#333] font-medium">
            {initialReview
              ? t("reviewsSection.editTitle")
              : t("reviewsSection.addTitle", {
                  title: productDetails?.title,
                })}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <p className="text-sm text-textMain mb-5">
            {t("reviewsSection.reviewDescription")}
          </p>

          <div className="space-y-5">
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#333] mb-3">
                {t("reviewsSection.yourRating")}{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={28}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className={`cursor-pointer transition-colors duration-300 ${
                      star <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-[#333]"
            >
              {t("reviewsSection.yourReview")}{" "}
              <span className="text-red-500">*</span>
            </label>

            <TextareaAutosize
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              minRows={6}
              placeholder={t("reviewsSection.reviewPlaceholder")}
              className="!mt-3 w-full rounded-none border-2 border-[#dadfe3]
             px-5 py-3 text-sm text-[#1d2128]
             placeholder:text-[#777]
             transition-all duration-300
             hover:border-[#1d2128]
             focus:border-[#1d2128]
             outline-none
             focus:placeholder:opacity-0
             resize-none"
            />

            <Button
              type="submit"
              disabled={initialReview ? !canEdit : !canSubmit}
              className="w-full bg-primary capitalize 2xl:hover:bg-[#1d2128] transition-all duration-300 rounded-none text-white py-6 h-[60px]"
            >
              {initialReview
                ? t("reviewsSection.updateReview")
                : t("reviewsSection.submitReview")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
