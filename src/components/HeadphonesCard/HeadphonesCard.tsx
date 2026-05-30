import Image from "next/image";
import promoCard1 from "@/assets/images/banner4.jpg";
import headPhone from "@/assets/images/banner4.png";
import i18n from "@/i18n";

export default function HeadphonesCard() {
  return (
    <div>
      <div className="relative h-[557px]">
        <Image
          src={promoCard1}
          alt="promoCard1"
          className="w-full h-full object-cover"
        ></Image>
        <div className="absolute w-[95%] bottom-14 left-1/2 transform -translate-x-1/2 z-10 text-center">
          <div className="">
            <h3 className="text-[50px] font-bold tracking-[-1.25px] text-[#333] mb-3 uppercase leading-[60px]">
              Best Seller
            </h3>
            <a
              href="#"
              className="text-[22px] mb-9 block capitalize text-[#333333b3] border-b-[1px] border-[#333333b3] w-fit mx-auto  hover:text-[#333] transition-colors duration-300"
            >
              Electric Headphone
            </a>
          </div>
          <div className="relative">
            <h3
              className="text-[150px] font-bold tracking-[-3.75px] text-transparent leading-[180px] mb-5 "
              style={{ WebkitTextStroke: "1px #2828284d" }}
            >
              70%
            </h3>
            <div className="absolute inset-0 left-1/2 transform  -translate-x-1/2  w-[70.4%]">
              <Image src={headPhone} alt="head phone"/>
            </div>
          </div>
          <a
            href=""
            className="text-[#333] text-lg font-semibold leading-none flex justify-center items-center gap-2 uppercase mt-[71px] group"
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
