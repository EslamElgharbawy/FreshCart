import Image from "next/image";
import promoCard5 from "@/assets/images/banner5.jpg";
import i18n from "@/i18n";
export default function ShoesPromoCard() {
  return (
    <div>
      <div className="relative h-[557px]">
        <Image
          src={promoCard5}
          alt="promoCard5"
          className="w-full h-full object-cover"
        ></Image>
        <div className="absolute w-9/12 flex justify-center items-center flex-col left-1/2 transform -translate-x-1/2 gap-[320px] bottom-14 z-10 uppercase">
          <div>
            <h3 className="text-[50px] tracking-[-1.25px] font-bold text-white leading-[60px] mb-3">
              Up To 50%
            </h3>
            <a
              className="text-[22px] mb-9 border-b-[1px] border-[#ffffff99] text-[#ffffff99] capitalize leading-5 tracking-[-0.55px] hover:text-white transition-colors duration-300"
              href="#"
            >
              Ultimate Sale Collection
            </a>
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
              className={`size-5 ${i18n.language === "ar" ? "rotate-180" : ""}group-hover:transform group-hover:translate-x-2 transition-transform duration-200`}
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
