import Image from "next/image";
import promoCard1 from "@/assets/images/banner4.jpg";
import headPhone from "@/assets/images/banner4.png";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function HeadphonesCard() {
  const {t} = useTranslation();
  return (
    <div>
      <div className="relative h-[205px] xl:h-[400px] 2xl:h-[557px]">
        <Image
          src={promoCard1}
          alt="promoCard1"
          className="w-full h-full object-cover"
        ></Image>
        <div className="absolute w-[95%] bottom-4 2xl:bottom-14 left-1/2 transform -translate-x-1/2 z-10 text-center">
          <div >
            <h3 className="text-[18px] xl:text-[30px] 2xl:text-[50px] font-bold tracking-tight xl:tracking-[-1.25px] text-[#333] xl:mb-3 uppercase leading-5  xl:leading-9 2xl:leading-[60px]">
              {t("deals.bestSeller")}
            </h3>
            <div
              className="text-[10px] xl:text-[20px] 2xl:text-[22px] mb-5 xl:mb-9 block capitalize text-[#333333b3] border-b-[1px] border-[#333333b3] w-fit mx-auto "
            >
              {t("deals.electricHeadphone")}
            </div>
          </div>
          <div className="relative">
            <h3
              className="text-[55px] xl:text-[100px] 2xl:text-[150px] font-bold tracking-[-3.75px] text-transparent leading-[66px] xl:leading-[120px] 2xl:leading-[180px] sm:max-xl:mb-7 mb-5 "
              style={{ WebkitTextStroke: "1px #2828284d" }}
            >
              70%
            </h3>
            <div className={`absolute inset-0 ${i18n.language === "ar" ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"} transform w-[90px]  xl:w-[70.4%]`}>
              <Image src={headPhone} alt="head phone"/>
            </div>
          </div>
          <Link
            href="/shop"
            className="text-[#333] text-[10px] xl:text-lg font-semibold leading-none flex justify-center items-center gap-2 uppercase sm:max-xl:-tracking-tight xl:mt-[71px] group"
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
