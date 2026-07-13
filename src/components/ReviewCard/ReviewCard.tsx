import { Review } from "@/Types/reviews";
import { FaStar } from "react-icons/fa";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.createdAt);
  dayjs.locale(i18n.language);
  const { t } = useTranslation();
  return (
    <div className="flex gap-5 py-8 border-b border-gray-200 last:border-0">
      <div className="w-[70px] h-[70px] rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-700 shrink-0">
        {review.user.name.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h4 className="text-lg font-bold text-[#333]">{review.user.name}</h4>

          <span className="text-[#999] text-xs">
            {dayjs(review.createdAt).format("MMMM D, YYYY")} {t("common.at")}{" "}
            {dayjs(review.createdAt).format("h:mm a")}
          </span>
        </div>

        <div className="flex items-center gap-[2.4px] mb-3">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={
                index < review.rating ? "text-[#ff9f0d]" : "text-[#00000029]"
              }
              size={12}
            />
          ))}
        </div>

        <p className="text-textMain leading-8 text-sm">{review.review}</p>
      </div>
    </div>
  );
}
