"use client";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import {
  getProductDetails,
  getRelatedProducts,
} from "@/Features/Product.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-image-gallery/styles/image-gallery.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard/ProductCard";
import RatingStars from "@/components/RatingStars/RatingStars";
import { getReviewsForProduct } from "@/Features/Reviews.slice";
import RatingSummary from "@/components/RatingSummary/RatingSummary";
import ReviewForm from "@/components/ReviewDialog/ReviewDialog";
import { actions } from "@/Features/AuthDialog.slice";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import ProductGallerySkeleton from "@/components/Skeletons/ProductGallerySkeleton";
import BreadcrumbSkeleton from "@/components/Skeletons/BreadcrumbSkeleton";
import ProductInfoSkeleton from "@/components/Skeletons/ProductInfoSkeleton";
import ReviewCardSkeleton from "@/components/Skeletons/ReviewCardSkeleton";
import RatingSummarySkeleton from "@/components/Skeletons/RatingSummarySkeleton";
import ProductCardSkeleton from "@/components/Skeletons/ProductCardSkeleton";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function page() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(1);
  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const {
    productDetails,
    relatedProducts,
    loading: productLoading,
  } = useAppSelector((store) => store.ProductSlice);
  const { reviews, loading: reviewsLoading } = useAppSelector(
    (store) => store.reviewsSlice,
  );

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
    dispatch(getReviewsForProduct(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    if (!productDetails?.category?._id) return;
    dispatch(getRelatedProducts(productDetails.category._id));
  }, [dispatch, productDetails?.category?._id]);

  return (
    <>
      <section>
        <div className="mx-4 2xl:mx-10">
          {productDetails ? (
            <BreadCrumb
              currentPage={productDetails.title}
              category={productDetails.category.slug}
              subCategory={productDetails.subcategory[0].slug}
            />
          ) : (
            <BreadcrumbSkeleton />
          )}

          <div>
            <section className="grid grid-cols-1 xl:grid-cols-2 pt-4 mb-8 xl:mb-10 xl:max-2xl:gap-4">
              <div className="img_gallery sm:max-2xl:mb-10 2xl:w-[90%] ">
                {productDetails?.images ? (
                  <div>
                    <Swiper
                      loop
                      dir="ltr"
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
                      dir="ltr"
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
                      styles={{
                        container: {
                          backgroundColor: "rgba(0,0,0,0.75)",
                        },
                      }}
                      controller={{
                        closeOnBackdropClick: true,
                      }}
                      plugins={[Zoom]}
                      zoom={{
                        maxZoomPixelRatio: 3,
                        scrollToZoom: true,
                      }}
                    />
                  </div>
                ) : (
                  <ProductGallerySkeleton />
                )}
              </div>

              {productDetails ? (
                <div>
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
                        {t("productDetails.category")} :{" "}
                        <span className="text-[#999]">
                          {productDetails?.category.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <h1 className="text-3xl font-bold text-[#333] mt-5">
                      <span>$</span>
                      {productDetails?.price}
                    </h1>
                  </div>
                  <div className="flex items-center capitalize text-xs text-[#999] mb-4 gap-2">
                    <RatingStars
                      rating={productDetails?.ratingsAverage ?? 0}
                      size={16}
                      color="text-[#ffb639]"
                    />

                    <p className="mt-[2px]">
                      {productDetails?.ratingsQuantity} {t("common.reviews")}
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
                      {productDetails?.quantity} {t("productDetails.inStock")}
                    </p>
                  </div>

                  <form>
                    <div className="flex sm:max-xl:flex-col 2xl:items-center gap-3 mb-5">
                      <div className="flex 2xl:justify-center items-center text-sm gap-3 w-fit relative">
                        <label
                          htmlFor="quantity"
                          className="capitalize leading-8 whitespace-nowrap"
                        >
                          {t("productDetails.quantity")} :
                        </label>
                        <Input
                          id="quantity"
                          type="text"
                          readOnly
                          value={counter}
                          step={1}
                          min={1}
                          className="text-textMain border-[1px] border-border rounded w-[140px] h-[44px] !py-0 !px-3"
                        />
                        <div
                          className={`absolute ${i18n.language === "en" ? "right-3 " : " left-3 "} top-1/2 -translate-y-1/2 flex justify-center items-center gap-2`}
                        >
                          <Button
                            onClick={() => {
                              if (counter > 1) {
                                setCounter(counter - 1);
                              }
                            }}
                            type="button"
                            className="!bg-[#eee] rounded-full text-[#777] !font-normal text-lg w-6 h-6 border-none"
                          >
                            -
                          </Button>
                          <Button
                            onClick={() => {
                              setCounter(counter + 1);
                            }}
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
                        {t("productDetails.addToCart")}
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
              ) : (
                <ProductInfoSkeleton />
              )}
            </section>
            <section className="mb-12">
              <Tabs defaultValue="Description" className="!block">
                <TabsList
                  variant="line"
                  className="flex-col xl:flex-row gap-6 2xl:gap-10 sm:max-xl:pb-8 sm:max-xl:border-b-[1px] sm:max-xl:border-[#ebebeb] sm:max-xl:w-full"
                >
                  <TabsTrigger
                    className="text-[#999] py-3 px-0 font-bold text-xl data-[state=active]:text-[#333]"
                    value="Description"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    className="text-[#999] py-3 px-0 font-bold text-xl data-[state=active]:text-[#333]"
                    value="CustomerReviews"
                  >
                    Customer Reviews ({productDetails?.ratingsQuantity})
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="Description"
                  className="mt-8 text-[#777] text-sm"
                >
                  {productLoading ? (
                    <div className="animate-pulse space-y-3 mb-10 max-w-xl">
                      <div className="h-4 rounded bg-gray-200" />
                      <div className="h-4 rounded bg-gray-200" />
                      <div className="h-4 rounded bg-gray-200" />
                    </div>
                  ) : (
                    <h1 className="max-w-xl leading-[26px] mb-14">
                      {productDetails?.description}
                    </h1>
                  )}

                  <div className="grid gap-5 xl:grid-cols-3">
                    <div>
                      <h3 className="text-[#333] font-semibold mb-1">
                        <span className="pr-3">1.</span>{" "}
                        {t("shippingInfo.freeShipping.title")}
                      </h3>
                      <p className="text-[#666] leading-normal ps-6 text-[13px]">
                        {t("shippingInfo.freeShipping.description")}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-[#333] font-semibold mb-1">
                        <span className="pr-3">2.</span>{" "}
                        {t("shippingInfo.easyReturns.title")}
                      </h3>
                      <p className="text-[#666] leading-normal ps-6 text-[13px]">
                        {t("shippingInfo.easyReturns.description")}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-[#333] font-semibold mb-1">
                        <span className="pr-3">3.</span>{" "}
                        {t("shippingInfo.specialFinancing.title")}
                      </h3>
                      <p className="text-[#666] leading-normal ps-6 text-[13px]">
                        {t("shippingInfo.specialFinancing.description")}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="CustomerReviews" className="mt-8">
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 xl:max-2xl:gap-12 2xl:gap-28">
                    <div className="xl:col-span-5 2xl:col-span-4">
                      {reviewsLoading ? (
                        <RatingSummarySkeleton />
                      ) : (
                        <>
                          <div className="flex items-center gap-5 xl:max-2xl:gap-4 mb-3">
                            <span className="text-primary text-6xl font-bold -tracking-wider">
                              {productDetails?.ratingsAverage.toFixed(1)}
                            </span>
                            <div>
                              <h3 className="mb-2 xl:max-2xl:mb-1">
                                {t("reviewsSection.averageRating")}
                              </h3>
                              <div className="flex items-center gap-3 xl:max-2xl:gap-2 text-[#aaa] text-xs whitespace-nowrap">
                                <span className="mb-[2px]">
                                  <RatingStars
                                    rating={productDetails?.ratingsAverage ?? 0}
                                    size={14}
                                    color="text-textMain"
                                  />
                                </span>
                                ({productDetails?.ratingsQuantity}{" "}
                                {t("common.reviews")})
                              </div>
                            </div>
                          </div>

                          <div>
                            <RatingSummary reviews={reviews} />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="xl:col-span-7 2xl:col-span-8">
                      <div>
                        {reviewsLoading ? (
                          <>
                            {[...Array(5)].map((_, index) => (
                              <ReviewCardSkeleton key={index} />
                            ))}
                          </>
                        ) : (
                          <>
                            {reviews.map((review) => (
                              <ReviewCard key={review._id} review={review} />
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </section>
            <section className="mb-5">
              <div className="flex items-center justify-between border-b border-[#eee] mb-4">
                <h2 className="py-4 text-xl font-bold text-[#333]">
                  Related Products
                </h2>

                <Link
                  href={`/shop?category=${productDetails?.category.slug}`}
                  className="flex items-center gap-2 text-[#333] 2xl:hover:text-primary transition-all duration-300 text-sm font-semibold"
                >
                  More Products
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right-icon lucide-arrow-right w-5 h-5 xl:w-6 xl:h-6"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {productLoading ? (
                <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-8 ">
                  {[...Array(5)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : relatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-8">
                  {relatedProducts
                    .filter((item) => item._id !== productDetails?._id)
                    .slice(0, 5)
                    .map((item) => (
                      <ProductCard key={item._id} {...item} />
                    ))}
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
