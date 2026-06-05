import { getProducts } from "@/Features/Product.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { t } from "i18next";
import Image from "next/image";
import { useEffect, useTransition } from "react";

export default function ProductLittleCard() {
  const { products, loading } = useAppSelector((store) => {
    return store.ProductSlice;
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      {products?.slice(0, 4).map((product) => {
        return (
          <div
            key={product.id}
            className="flex justify-center items-center gap-5 px-2"
          >
            <div className="basis-2/5 mb-3">
              <a href="#">
                <Image
                  width={100}
                  height={100}
                  src={product.imageCover}
                  alt="Product Image"
                />
              </a>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <a
                href="#"
                className="text-sm text-[#333] font-medium leading-[18.2px] hover:text-primary transition-colors duration-300"
              >
                {product.title}
              </a>
              <div className="flex items-center gap-5">
                <div className="rating flex justify-center items-center gap-1 text-xs text-[#333] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fill-textMain stroke-textMain"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  {product.ratingsAverage}
                </div>
                <div className="reviews text-xs text-[#333] flex justify-center items-center gap-1">
                  {product.ratingsQuantity} {t("deals.reviews")}
                </div>
              </div>
              <div className="text-lg font-semibold text-[#333] leading-7 tracking-[-0.9px]">
                <span>$</span>
                {product.price}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
