import Image from "next/image";
import React from "react";
import promoCard2 from "@/assets/images/banner2.jpg";
import i18n from "@/i18n";

export default function FashionPromoCard() {
  return (
    <div>
      <div className="relative h-[557px]">
        <Image
          src={promoCard2}
          alt="promoCard2"
          className="w-full h-full object-cover"
        ></Image>
        <div className="absolute left-1/2 bottom-14 transform -translate-x-1/2 w-full flex flex-col gap-[333px]  text-center z-10 uppercase">
          <div>
            <h3 className="text-lg mb-2 text-accent font-semibold">
              Best Selling
            </h3>
            <h3 className="text-4xl mb-5 font-bold text-white tracking-[-0.9px]">
              Fashion Sale
            </h3>
          </div>
          <a
            className="text-white text-lg font-semibold leading-none flex justify-center items-center gap-2 group"
            href=""
          >
            Shop Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`size-5 ${i18n.language === "ar" ? "rotate-180" : ""}group-hover:transform group-hover:translate-x-3 transition-transform duration-200`}
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
