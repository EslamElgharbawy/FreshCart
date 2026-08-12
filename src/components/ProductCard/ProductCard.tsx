import { actions } from "@/Features/AuthDialog.slice";
import { AddProductToCart } from "@/Features/Cart.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { Product } from "@/Types/products";
import { Heart, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function ProductCard({
  title,
  price,
  imageCover,
  images,
  _id,
}: Product) {
  const { token } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (!token) {
      dispatch(actions.openAuthDialog("SignIn"));
      return;
    }
    if (!_id) return;

    try {
      await dispatch(AddProductToCart(_id)).unwrap();

      toast.success(t("cart.productAdded"));
    } catch (error: any) {
      toast.error(error.message || t("common.somethingWentWrong"));
    }
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="group">
        <div className="relative">
          <Link
            href={`/ProductDetails/${_id}`}
            className="relative block overflow-hidden"
          >
            <Image
              src={imageCover}
              width={100}
              height={100}
              alt={title}
              className="
        w-full h-full object-cover
        transition-opacity duration-500
        2xl:group-hover:opacity-0
      "
            />

            <Image
              src={images[1] || imageCover}
              width={100}
              height={100}
              alt={title}
              className="
              hidden 2xl:block
        absolute inset-0
        w-full h-full object-cover
        opacity-0
        transition-opacity duration-500
        group-hover:opacity-100
      "
            />
          </Link>

          <a
            href="#"
            className="
      absolute bottom-0 left-0 right-0
      bg-primary
      sm:max-2xl:opacity-80
      text-white text-center
      py-4
      2xl:opacity-0
      transition-all duration-300
      2xl:group-hover:opacity-80
      text-sm
      font-semibold
tracking-[-0.35px]
leading-4
    "
          >
            {t("products.quickView")}
          </a>
          <div className="flex justify-center items-center flex-col gap-2 absolute top-[10px] right-[10px] xl:top-4 xl:right-4 2xl:opacity-0 transition-all duration-300 2xl:group-hover:opacity-100">
            <a
              href="#"
              className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-white flex justify-center items-center border-[1px] text-[#999999] 2xl:hover:bg-primary 2xl:hover:border-transparent 2xl:hover:text-white transition-colors duration-300 group"
            >
              <Heart className="w-[18px] h-[18px] xl:w-[20px] xl:h-[20px]" />
            </a>
            <a
              href="#"
              className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-white flex justify-center items-center border-[1px] text-[#999999] 2xl:hover:bg-primary 2xl:hover:border-transparent 2xl:hover:text-white transition-colors duration-300 group"
            >
              <Scale
                strokeWidth={1.8}
                className="w-[20px] h-[20px] xl:w-[22px] xl:h-[22px]"
              />
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
        2xl:group-hover:opacity-0
        sm:max-2xl:mb-1
        sm:max-2xl:block
      "
            >
              ${price}
            </span>

            <button
              onClick={handleSubmit}
              className="
        2xl:absolute inset-0
    2xl:flex items-center justify-center 
    text-primary sm:max-2xl:opacity-80 font-semibold uppercase
    2xl:translate-y-3 2xl:opacity-0
    transition-all duration-300
    2xl:group-hover:translate-y-0
    2xl:group-hover:opacity-100
    text-xs 2xl:text-sm
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
      2xl:hover:after:w-full
    "
              >
                {t("products.addToCart")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
