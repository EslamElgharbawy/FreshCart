import Image from "next/image";
import promoCard5 from "@/assets/images/banner5.jpg";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import Link from "next/link";
export default function ShoesPromoCard() {
  const {t} = useTranslation();
  return (
    <div>
      <div className="relative h-[205px] xl:h-[400px] 2xl:h-[557px]">
        <Image
          src={promoCard5}
          alt="promoCard5"
          className="w-full h-full object-cover"
        ></Image>
        <div className="absolute w-9/12 xl:w-[90%] flex justify-center items-center flex-col left-1/2 transform -translate-x-1/2 gap-28 md:gap-[120px] xl:gap-[180px] 2xl:gap-[300px] bottom-4 xl:bottom-8 2xl:bottom-14 z-10 uppercase">
          <div className="text-center flex flex-col gap-0">
            <h3 className="text-[18px] xl:text-[38px] xl:leading-[45px] 2xl:text-[50px] tracking-[-1.25px] font-bold text-white leading-5 2xl:leading-[60px] xl:mb-3 sm:max-2xl:-tracking-wide">
             {t("deals.upTo")}
            </h3>
            <div
              className=" text-[10px] xl:text-base 2xl:text-[22px] xl:mb-9 border-b-[1px] border-[#ffffff99] text-[#ffffff99] capitalize xl:leading-5 tracking-[-0.55px]"
            >
              {t("deals.ultimateSaleCollection")}
            </div>
          </div>
          <Link
            className="text-white text-[10px] xl:text-base 2xl:text-lg font-semibold leading-none flex justify-center items-center gap-2 group"
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
