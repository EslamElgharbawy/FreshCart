export default function CartBadgeLoader({ language }: { language: string }) {
  return (
    <span
      className={`absolute -top-1 ${
        language === "EGY" ? "-left-1" : "-right-1"
      } w-[18px] h-[18px] bg-accent text-[#272b37] rounded-full flex justify-center items-center overflow-hidden`}
    >
      <span className="badge_loader" />
    </span>
  );
}
