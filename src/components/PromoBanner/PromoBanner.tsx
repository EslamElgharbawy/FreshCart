import Image from "next/image";
import MainBanner from "@/assets/images/banner1.jpg";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function PromoBanner() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="relative h-[210px] xl:h-[400px] 2xl:h-[557px]">
        <Image
          src={MainBanner}
          alt="Promo Banner"
          className={`w-full h-full object-cover xl:object-[65%_center] 2xl:object-[55%_center] ${
                  i18n.language === "ar" ? "scale-x-[-1]" : ""
                }`}
        ></Image>
        <div
          className={`absolute top-1/2 -translate-y-1/2 z-30 uppercase
    ${
      i18n.language === "ar"
        ? "left-[6.8%] text-left"
        : "right-[6.8%] text-right"
    }`}
        >
          <h3 className="text-[10px] xl:text-sm xl:leading-4 sm:max-xl:leading-none 2xl:text-lg font-semibold mb-1 lg:mb-2 2xl:mb-4 text-textMain">
            {t("deals.dealsAndPromotion")}
          </h3>
          <h3
            className="text-[26px] xl:text-[40px] sm:max-2xl:leading-none 2xl:text-6xl font-extrabold mb-1 text-transparent"
            style={{ WebkitTextStroke: "1px #28282899" }}
          >
            {t("deals.trending")}
          </h3>
          <h3 className="text-[26px] xl:text-[40px] sm:max-2xl:leading-none 2xl:text-6xl font-bold mb-1 lg:mb-2 text-[#333]">
            {t("deals.collection")}
          </h3>
          <h3 className="text-[20px] xl:text-[28px] xl:leading-8 2xl:text-4xl font-bold mb-5 2xl:mb-9 text-primary sm:max-2xl:leading-6">
            <sup className="text-[10px] xl:text-sm 2xl:leading-4 2xl:text-lg font-normal text-[#666] mr-1">
              {t("deals.from")}
            </sup>{" "}
            $159
          </h3>
          <Link
            className={`text-[10px] xl:text-sm  2xl:text-[14px] py-2 px-3 xl:py-3 xl:px-6 2xl:py-4 2xl:px-8 xl:leading-[14px] sm:max-2xl:leading-[10px] text-white bg-[#333] rounded-[4px] font-semibold flex items-center gap-2 w-fit ms-auto group  transition-colors duration-300 hover:bg-[#454545]
                   `}
            href="/shop"
          >
            {t("deals.shopNow")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`size-5 sm:max-xl:hidden ${i18n.language === "ar" ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"} group-hover:transform  transition-transform duration-300`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
