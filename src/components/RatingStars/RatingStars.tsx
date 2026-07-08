import { FaStar, FaStarHalfAlt } from "react-icons/fa";

type props = {
  rating: number;
};
export default function RatingStars({ rating }: props) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return <FaStar key={star} className="text-textMain" />;
        }

        if (rating >= star - 0.5) {
          return <FaStarHalfAlt key={star} className="text-textMain" />;
        }

        return <FaStar key={star} className="text-[#00000033]" />;
      })}
    </div>
  );
}
