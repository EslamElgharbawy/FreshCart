import Image from "next/image";
import promoCard3 from "@/assets/images/banner3.jpg";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

export default function ElectronicPromoCard() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="relative h-[557px]">
        <Image
          src={promoCard3}
          alt="promoCard3"
          className="w-full h-full object-cover"
        ></Image>

        <div className={`absolute inset-0 ${i18n.language === "ar" ? "right-14 text-right" : "left-14 text-left"} bottom-14 w-4/5  z-10 flex flex-col justify-between`}>
          <div>
            <h3 className="text-xl mb-2 mt-1 ms-1 uppercase font-semibold text-textMain leading-6">
              {t("deals.weekendSale")}
            </h3>
            <h3
              className={`
    relative w-fit me-5
    text-7xl font-bold text-primary
    leading-[52px] tracking-[-4px]
    mb-5
    after:content-['']
    after:absolute
    ${i18n.language === "ar" ? "after:-left-5" : "after:right-5"}
    after:top-1/2
    after:-translate-y-1/2
    after:w-[1.5px]
    after:h-14
    after:bg-[#999999]
    after:opacity-55
    
  `}
            >
              D70
            </h3>
            <h3 className="tracking-tighter mt-1 capitalize text-textMain leading-8 ">
              {t("deals.tradeInYourCurrent")}
              <br />
              <span className=" text-[40px] tracking-[-2.5px] font-bold text-[#333]">
                {t("deals.camera")}
              </span>
            </h3>
          </div>
          <a
            className="text-[#333] text-lg font-semibold leading-none flex items-center gap-2 uppercase group"
            href="#"
          >
            {t("deals.shopNow")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`size-5 ${i18n.language === "ar" ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"} group-hover:transform   transition-transform duration-200`}
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
