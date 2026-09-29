import Image from "next/image";
import promoCard3 from "@/assets/images/banner3.jpg";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function ElectronicPromoCard() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="relative h-[205px] xl:h-[400px] 2xl:h-[557px]">
        <Image
          src={promoCard3}
          alt="promoCard3"
          className="w-full h-full object-cover"
        ></Image>

        <div
          className={`absolute inset-0 ${i18n.language === "ar" ? "right-3 2xl:right-12 text-right" : "left-3 2xl:left-12 text-left"} bottom-4 md:bottom-3 xl:bottom-8 sm:max-2xl:top-5 2xl:bottom-14 w-[90%] 2xl:w-4/5  z-10 flex flex-col justify-between`}
        >
          <div>
            <h3 className="text-[10px] xl:text-sm 2xl:text-xl mb-1 xl:mb-2 xl:mt-1 xl:ms-1 uppercase font-semibold text-textMain leading-3 xl:leading-6">
              {t("deals.weekendSale")}
            </h3>
           <div className="sm:max-2xl:flex sm:max-2xl:justify-center sm:max-2xl:items-center">
             <h3
              className={`
    relative w-fit me-2 2xl:me-5
    text-xl xl:text-[46px] 2xl:text-7xl font-extrabold xl:font-bold text-primary
    xl:leading-8 2xl:leading-[52px] tracking-tighter xl:tracking-[-4px]
    2xl:mb-5
    2xl:after:content-['']
    2xl:after:absolute
    ${i18n.language === "ar" ? "2xl:after:-left-5" : "2xl:after:-right-5"}
    2xl:after:top-1/2
    2xl:after:-translate-y-1/2
    2xl:after:w-[1.5px]
    2xl:after:h-14
    2xl:after:bg-[#999999]
    2xl:after:opacity-55
    
  `}
            >
              D70
            </h3>
            <h3 className="xl:tracking-tighter sm:max-xl:tracking-[0.18px] mt-1 capitalize text-textMain leading-8 sm:max-xl:text-[7px] sm:max-xl:leading-[8px] xl:text-xs 2xl:text-base 2xl:leading-5">
              {t("deals.tradeInYourCurrent")}
              <br />
              <span className="text-lg xl:text-[27px] 2xl:text-[40px] tracking-[-1.125px] xl:leading-[33px] sm:max-2xl:leading-5 2xl:leading-[48px] 2xl:tracking-[-2.5px] font-bold text-[#333]">
                {t("deals.camera")}
              </span>
            </h3>
           </div>
          </div>
          <Link
            className="text-[#333] text-[10px] xl:text-base 2xl:text-lg font-semibold leading-none flex items-center gap-2 uppercase group"
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
