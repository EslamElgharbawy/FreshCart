import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
interface EmptyStateProps {
  title: string;
}

export default function EmptyState({ title }: EmptyStateProps) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-center gap-2 mb-5 px-5 py-4 font-semibold text-[#777]">
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
          className="lucide lucide-circle-alert-icon lucide-circle-alert"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        {t(title, { defaultValue: title })}
      </div>

      <div className="mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#aaa"
          className="size-20 block mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>

      <Button className="uppercase !px-7 !py-3 h-auto rounded-md bg-[#333] hover:bg-[#454545] transition-all duration-300 text-white font-semibold block mx-auto">
        {t("common.returnToShop")}
      </Button>
    </div>
  );
}
