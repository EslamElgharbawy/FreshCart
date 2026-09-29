import Image from "next/image";
import React from "react";
import promoCard2 from "@/assets/images/banner2.jpg";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function FashionPromoCard() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="relative h-[205px] xl:h-[400px] 2xl:h-[557px]">
        <Image
          src={promoCard2}
          alt="promoCard2"
          className="w-full h-full object-cover"
        ></Image>
        <div className="absolute left-1/2 bottom-4 xl:bottom-8 2xl:bottom-14 transform -translate-x-1/2 w-full flex flex-col gap-4 xl:gap-[250px] 2xl:gap-[333px]  text-center z-10 uppercase">
          <div>
            <h3 className="text-[10px] xl:text-sm xl:leading-4 2xl:text-lg xl:mb-2 text-accent font-semibold">
              {t("deals.bestSelling")}
            </h3>
            <h3 className="text-base xl:text-[28px] xl:leading-8 2xl:text-4xl 2xl:mb-5 font-bold text-white tracking-tight xl:tracking-[-0.9px]">
              {t("deals.fashionSale")}
            </h3>
          </div>
          <Link
            className="text-white text-[10px] xl:text-base  2xl:text-lg sm:max-xl:tracking-wide font-semibold leading-none flex justify-center items-center gap-2 group"
            href="/shop"
          >
            {t("deals.shopNow")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`size-5 sm:max-xl:hidden ${i18n.language === "ar" ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"} group-hover:transform   transition-transform duration-200`}
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
