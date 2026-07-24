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
import { SubmitEvent, useState } from "react";
import { FaStar } from "react-icons/fa";
import { addReview, getReviewsForProduct } from "@/Features/Reviews.slice";
import toast from "react-hot-toast";
import axios from "axios";

type ReviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export default function ReviewDialog({
  open,
  onOpenChange,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const canSubmit = rating > 0 && review.trim().length > 0;
  const { productDetails } = useAppSelector((store) => store.ProductSlice);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!canSubmit || !productDetails) return;

    try {
      await dispatch(
        addReview({
          productId: productDetails._id,
          review,
          rating,
        }),
      ).unwrap();

      toast.success("Review submitted successfully.");

      setReview("");
      setRating(0);
      setHover(0);

      dispatch(getReviewsForProduct(productDetails._id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);
      }

      console.log(error);
      toast.error("Failed to submit review.");
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
            Be the first to review "{productDetails?.title}"
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <p className="text-sm text-textMain mb-5">
            Please complete all the fields below to tell us about your
            experience with this product.
          </p>

          <div className="space-y-5">
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#333] mb-3">
                Your Rating <span className="text-red-500">*</span>
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
              Your Review <span className="text-red-500">*</span>
            </label>

            <TextareaAutosize
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              minRows={6}
              placeholder="Write Your Review Here..."
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
              disabled={!canSubmit}
              className="w-full bg-primary capitalize 2xl:hover:bg-[#1d2128] transition-all duration-300 rounded-none text-white py-6 h-[60px]"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
