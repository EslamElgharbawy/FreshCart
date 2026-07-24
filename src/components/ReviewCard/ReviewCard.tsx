import { Review } from "@/Types/reviews";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RatingStars from "../RatingStars/RatingStars";
import { useAppSelector } from "@/hooks/store.hooks";
interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  dayjs.locale(i18n.language);
  const { t } = useTranslation();
  const { user } = useAppSelector((store) => store.user);
  return (
    <div className="flex gap-5 py-8 border-b border-gray-200 last:border-0">
      <div className="w-[70px] h-[70px] rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-700 shrink-0">
        {review.user.name.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1">
        <div className="flex justify-between relative">
          <div className="flex justify-center flex-col 2xl:flex-row 2xl:items-center sm:max-2xl:mb-2 mb-1 gap-1 lg:gap-3">
            <h4 className="text-lg font-bold text-[#333]">
              {review.user.name}
            </h4>

            <span className="text-[#999] text-xs">
              {dayjs(review.createdAt).format("MMMM D, YYYY")} {t("common.at")}{" "}
              {dayjs(review.createdAt).format("h:mm a")}
            </span>
          </div>

          {user?.id === review.user._id && (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="px-1 bg-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="ring-0 min-w-0 w-auto border border-[#e5e7eb] "
                >
                  <DropdownMenuItem className="!gap-1 cursor-pointer transition-all duration-300 hover:!bg-gray-100">
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="!gap-1 cursor-pointer transition-all duration-300 hover:!bg-gray-100">
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <div className="flex items-center gap-[2.4px] mb-5 lg:mb-3">
          <RatingStars
            rating={review.rating}
            size={14}
            color="text-[#ffb639]"
          />
        </div>

        <p className="text-textMain leading-8 text-sm">{review.review}</p>
      </div>
    </div>
  );
}
