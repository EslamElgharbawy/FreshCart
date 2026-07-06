"use client";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { getProductDetails } from "@/Features/Product.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  faFacebookF,
  faXTwitter,
  faPinterestP,
  faWhatsapp,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heart, Scale } from "lucide-react";

export default function page() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const dispatch = useAppDispatch();
  const { productDetails, loading } = useAppSelector(
    (store) => store.ProductSlice,
  );

  const { id } = useParams();

  const socialIcons = [
    {
      id: 1,
      icon: faFacebookF,
      className: "hover:bg-[#1b4f9b] hover:border-[#1b4f9b]",
    },
    {
      id: 2,
      icon: faXTwitter,
      className: "hover:bg-[#00adef] hover:border-[#00adef]",
    },
    {
      id: 3,
      icon: faPinterestP,
      className: "hover:bg-[#f96a02] hover:border-[#f96a02]",
    },
    {
      id: 4,
      icon: faWhatsapp,
      className: "hover:bg-[#3c8a38] hover:border-[#3c8a38]",
    },
    {
      id: 5,
      icon: faLinkedinIn,
      className: "hover:bg-[#0073b2] hover:border-[#0073b2]",
    },
  ];

  useEffect(() => {
    dispatch(getProductDetails(id as string));
  }, [dispatch]);
  return (
    <>
      <section>
        <div className="mx-10">
          {productDetails && (
            <BreadCrumb
              currentPage={productDetails.title}
              category={productDetails.category.slug}
              subCategory={productDetails.subcategory[0].slug}
            />
          )}

          <div>
            <div className="grid grid-cols-1 xl:grid-cols-2 pt-4">
              <div className="img_gallery w-[90%]">
                <div>
                  <Swiper
                    loop
                    speed={800}
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    modules={[FreeMode, Thumbs]}
                    className="mySwiper2"
                  >
                    {productDetails?.images.map((image, i) => (
                      <SwiperSlide key={image}>
                        <img
                          src={image}
                          alt={productDetails.title}
                          className="w-full h-full object-contain cursor-pointer"
                          onClick={() => {
                            setIndex(i);
                            setOpen(true);
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode
                    watchSlidesProgress
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {productDetails?.images.map((image) => (
                      <SwiperSlide key={image}>
                        <img
                          src={image}
                          alt={productDetails.title}
                          className="w-full h-full object-cover cursor-pointer"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    index={index}
                    slides={productDetails?.images.map((image) => ({
                      src: image,
                    }))}
                  />
                </div>
              </div>
              <div >
                <div className="title_header border-b-[1px] border-[#eee] pb-6">
                  <h1 className="text-2xl font-semibold leading-normal mb-3 text-[#333] -tracking-[0.6px]">
                    {productDetails?.title}
                  </h1>
                  <div className="flex items-center gap-5">
                    <div className="border-[1px] rounded-md overflow-hidden border-[#eee]">
                      {productDetails?.brand.image && (
                        <Link href="">
                          <Image
                            src={productDetails.brand.image}
                            alt={productDetails.brand.name}
                            width={100}
                            height={100}
                            className="h-14 w-auto"
                          />
                        </Link>
                      )}
                    </div>
                    <div className="text-[#666] text-sm leading-6">
                      Categories :{" "}
                      <Link
                        href={``}
                        className="text-[#999] hover:text-primary transition-all duration-300"
                      >
                        {productDetails?.category.name}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h1 className="text-3xl font-bold text-[#333] mt-5">
                    <span>$</span>
                    {productDetails?.price}
                  </h1>
                </div>
                <div className="flex items-center gap-1 capitalize text-xs text-[#999] mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 fill-yellow-400 text-yellow-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <p>
                    {productDetails?.ratingsAverage} ({" "}
                    {productDetails?.ratingsQuantity} Reviews )
                  </p>
                </div>
                <div className="mb-4">
                  <p className="border-b-[1px] border-[#eee] leading-loosep pb-4 text-sm text-[#777]">
                    {productDetails?.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <p className="text-sm text-[#777]">
                    {productDetails?.quantity} in stock
                  </p>
                </div>

                <form>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex justify-center items-center text-sm gap-3 relative">
                      <label
                        htmlFor="quantity"
                        className="capitalize leading-8 whitespace-nowrap"
                      >
                        quantity :
                      </label>
                      <Input
                        id="quantity"
                        type="text"
                        readOnly
                        value={1}
                        step={1}
                        min={1}
                        className="text-textMain border-[1px] border-border rounded w-[140px] h-[44px] !py-0 !px-3"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex justify-center items-center gap-2">
                        <Button
                          type="button"
                          className="!bg-[#eee] rounded-full text-[#777] !font-normal text-lg w-6 h-6 border-none"
                        >
                          -
                        </Button>
                        <Button
                          type="button"
                          className="!bg-[#eee] rounded-full text-[#777] !font-normal text-lg w-6 h-6 border-none"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="flex-1 bg-primary text-white text-sm leading-[44px] !font-semibold !px-3 !h-auto rounded-sm uppercase"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-[22px] mb-[2px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                      Add to Cart
                    </Button>
                  </div>
                </form>

                <div className="flex items-center my-1">
                  <div className="flex items-center gap-2 ">
                    {socialIcons.map((item) => (
                      <button
                        key={item.id}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-textMain transition-all duration-300 hover:text-white ${item.className}`}
                      >
                        <FontAwesomeIcon icon={item.icon} size="sm" />
                      </button>
                    ))}
                  </div>
                  <div className="h-[18px] w-px bg-[#e1e1e1] ms-5 me-3" />
                  <div className="flex items-center text-[#333] h-full">
                    <button className="hover:text-primary transition-all duration-300 py-3 px-2">
                      <Heart strokeWidth={1.5} size={22} />
                    </button>
                    <button className="hover:text-primary transition-all duration-300 py-3 px-2">
                      <Scale strokeWidth={1.5} size={22} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
