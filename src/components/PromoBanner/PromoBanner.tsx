import Image from "next/image";
import MainBanner from "@/assets/images/banner1.jpg";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

export default function PromoBanner() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="relative h-[557px]">
        <Image
          src={MainBanner}
          alt="Promo Banner"
          className={`w-full h-full object-cover object-[55%_center] ${
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
          <h3 className="text-lg font-semibold mb-4 text-textMain">
            {t("deals.dealsAndPromotion")}
          </h3>
          <h3
            className="text-6xl font-bold mb-1 text-transparent"
            style={{ WebkitTextStroke: "1px #28282899" }}
          >
            {t("deals.trending")}
          </h3>
          <h3 className="text-6xl font-bold mb-2 text-[#333]">
            {t("deals.collection")}
          </h3>
          <h3 className="text-4xl font-bold mb-9 text-primary">
            <sup className="text-lg font-normal text-[#666] mr-1">
              {t("deals.from")}
            </sup>{" "}
            $159
          </h3>
          <a
            className={`text-[14px] py-4 px-8 text-white bg-[#333] rounded-[4px] font-semibold flex items-center gap-2 w-fit ms-auto group  transition-colors duration-300 hover:bg-[#454545]
                   `}
            href="#"
          >
            {t("deals.shopNow")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`size-5 ${i18n.language === "ar" ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"} group-hover:transform  transition-transform duration-300`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
