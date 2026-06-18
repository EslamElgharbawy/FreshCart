import { Product } from "@/Types/products";
import { Heart, Scale } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ProductCard({
  title,
  price,
  imageCover,
  images,
}: Product) {
  const { t } = useTranslation();
  return (
    <>
      <div className="group">
        <div className="relative">
          <a href="#" className="relative block overflow-hidden">
            <Image
              src={imageCover}
              width={100}
              height={100}
              alt={title}
              className="
        w-full h-full object-cover
        transition-opacity duration-500
        group-hover:opacity-0
      "
            />

            <Image
              src={images[1] || imageCover}
              width={100}
              height={100}
              alt={title}
              className="
        absolute inset-0
        w-full h-full object-cover
        opacity-0
        transition-opacity duration-500
        group-hover:opacity-100
      "
            />
          </a>

          <a
            href="#"
            className="
      absolute bottom-0 left-0 right-0
      bg-primary
      text-white text-center
      py-4
      opacity-0
      transition-all duration-300
      group-hover:opacity-80
      text-sm
      font-semibold
tracking-[-0.35px]
leading-4
    "
          >
            {t("products.quickView")}
          </a>
          <div className="flex justify-center items-center flex-col gap-2 absolute top-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white flex justify-center items-center border-[1px] text-[#999999] hover:bg-primary hover:border-transparent hover:text-white transition-colors duration-300 group"
            >
              <Heart size={20} className="" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white flex justify-center items-center border-[1px] text-[#999999] hover:bg-primary hover:border-transparent hover:text-white transition-colors duration-300 group"
            >
              <Scale size={22} strokeWidth={1.8} className="" />
            </a>
          </div>
        </div>
        <div className="mt-4 text-[#333] text-center relative">
          <a
            href="#"
            className="text-sm font-medium mb-1 px-5 line-clamp-1 hover:text-primary transition-colors duration-300"
          >
            {title}
          </a>
          <div className="relative">
            <span
              className="
              font-semibold
        transition-all duration-300
        group-hover:opacity-0
      "
            >
              ${price}
            </span>

            <a
              href="#"
              className="
        absolute inset-0
    flex items-center justify-center
    text-primary font-semibold uppercase
    translate-y-3 opacity-0
    transition-all duration-300
    group-hover:translate-y-0
    group-hover:opacity-100
    text-sm
    will-change-transform
      "
            >
              <span
                className="
      relative
      after:content-['']
      after:absolute
      after:left-1/2
      after:-translate-x-1/2
      after:-bottom-1
      after:h-[3px]
      after:w-0
      after:bg-primary
      after:transition-all
      after:duration-300
      hover:after:w-full
    "
              >
                {t("products.addToCart")}
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
