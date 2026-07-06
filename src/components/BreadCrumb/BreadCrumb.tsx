"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type BreadcrumbProps = {
  currentPage?: string;
  category?: string;
  subCategory?: string;
};
export default function BreadCrumb({
  currentPage,
  category,
  subCategory,
}: BreadcrumbProps) {
  const { t } = useTranslation();
  return (
    <>
      <section className="py-3 2xl:py-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
          <Link
            href="/"
            className="text-[#333] opacity-70 hover:opacity-100 transition-all duration-300"
          >
            {t("breadcrumb.home")}
          </Link>

          {category && (
            <div className="flex items-center gap-2">
              <ChevronRight size={14} className="text-[#bbb] shrink-0" />

              <Link
                href="/Shop"
                className="text-[#333] opacity-70 hover:opacity-100 transition-all duration-300"
              >
                {t(`categories_menu.${category}`)}
              </Link>
            </div>
          )}

          {subCategory && (
            <div className="flex items-center gap-2">
              <ChevronRight size={14} className="text-[#bbb] shrink-0" />

              <Link
                href="/Shop"
                className="text-[#333] opacity-70 hover:opacity-100 transition-all duration-300"
              >
                {t(`subcategory.${subCategory}`)}
              </Link>
            </div>
          )}

          {currentPage && (
            <div className="flex items-center gap-2 min-w-0">
              <ChevronRight size={14} className="text-[#bbb] shrink-0" />

              <span className="font-medium text-[#333] truncate max-w-[120px] sm:max-w-[180px] md:max-w-none">
                {currentPage}
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
