"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import img1 from "../assets/images/intro-banner1.jpg";
import img2 from "../assets/images/intro-banner2.jpg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import PromoBanner from "@/components/PromoBanner/PromoBanner";
import HeadphonesCard from "@/components/HeadphonesCard/HeadphonesCard";
import FashionPromoCard from "@/components/FashionPromoCard/FashionPromoCard";
import ElectronicPromoCard from "@/components/ElectronicPromoCard/ElectronicPromoCard";
import ShoesPromoCard from "@/components/ShoesPromoCard/ShoesPromoCard";
import VendorCard from "@/components/VendorCard/VendorCard";
import MiniCategoryCard from "@/components/MiniCategoryCard/MiniCategoryCard";
import MiniProductCard from "@/components/MiniProductCard/MiniProductCard";
import ProductCard from "@/components/ProductCard/ProductCard";
import SidebarCategories from "@/components/SidebarCategories/SidebarCategories";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { getProducts } from "@/Features/Product.slice";
import LoaderProducts from "@/components/LoaderProducts/LoaderProducts";

export default function Home() {
  const dispatch = useAppDispatch();
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [filterLoading, setFilterLoading] = useState(false);
  const { t } = useTranslation();

  const features_data = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="47"
          height="47"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-truck-icon lucide-truck"
        >
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M15 18H9" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="17" cy="18" r="2" />
          <circle cx="7" cy="18" r="2" />
        </svg>
      ),
      title: t("features.freeShipping.title"),
      description: t("features.freeShipping.desc"),
    },
    {
      id: 2,
      icon: (
        <svg
          width={47}
          height={47}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
      ),
      title: t("features.securePayment.title"),
      description: t("features.securePayment.desc"),
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="47"
          height="47"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-wallet-icon lucide-wallet"
        >
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
        </svg>
      ),
      title: t("features.moneyBack.title"),
      description: t("features.moneyBack.desc"),
    },
    {
      id: 4,
      icon: (
        <svg
          width={47}
          height={47}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      ),
      title: t("features.customerSupport.title"),
      description: t("features.customerSupport.desc"),
    },
  ];

  const { products, productDetails, loading } = useAppSelector(
    (store) => store.ProductSlice,
  );

  const electronicsProducts = products.filter(
    (product) => product.category.name === "Electronics",
  );

  const filteredProducts =
    selectedSubCategory === ""
      ? electronicsProducts
      : electronicsProducts.filter((product) =>
          product.subcategory.some((sub) => sub._id === selectedSubCategory),
        );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <section id="hero">
        <Swiper
          dir="ltr"
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          speed={1000}
          onSlideChangeTransitionEnd={(swiper) =>
            setActiveSlide(swiper.realIndex)
          }
          className="Swiper_hero !h-[689px]"
        >
          {/* //* Slide 1 */}
          <SwiperSlide className="relative">
            <motion.div
              key={`slide1-${activeSlide}`}
              initial="hidden"
              animate={activeSlide === 0 ? "show" : "hidden"}
              variants={{
                hidden: {},
                show: {},
              }}
              className="w-full h-full"
            >
              <Image
                src={img1}
                alt="Image 1"
                className={`w-full h-full object-cover object-[40%_center] ${
                  i18n.language === "ar" ? "scale-x-[-1]" : ""
                }`}
              />

              <div
                className={`absolute top-[50%] mt-[23px] z-10 uppercase transform -translate-y-1/2 ${
                  i18n.language === "en"
                    ? "left-[9.3%] text-left"
                    : "right-[5.35%] text-right"
                }`}
              >
                <motion.h3
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`text-[110px] font-extrabold text-transparent leading-none ${i18n.language === "en" ? "mb-3" : "mb-5"}`}
                  style={{ WebkitTextStroke: "1px white" }}
                >
                  {t("hero.running")}
                </motion.h3>

                <motion.h3
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`text-[100px] font-extrabold tracking-[2.5px] text-white leading-none ${i18n.language === "en" ? "mb-2" : "mb-5"}`}
                >
                  {t("hero.nikeShoes")}
                </motion.h3>

                <div
                  className={`leading-none ${
                    i18n.language === "ar" ? "me-[327px]" : "ms-[327px]"
                  }`}
                >
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="relative text-[46px] font-extrabold text-accent"
                  >
                    <sup
                      className={`text-2xl text-border font-normal tracking-wide ${
                        i18n.language === "ar" ? "ms-4" : "me-4"
                      }`}
                    >
                      {t("hero.startingAt")}
                    </sup>
                    $159
                  </motion.p>
                </div>

                <motion.a
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 1, delay: 0.8 }}
                  href=""
                  className={`text-[14px] py-4 px-8 text-white bg-[#333] rounded-[4px] font-semibold flex items-center gap-2 w-fit transition-colors duration-300 hover:bg-[#454545]
                   ${i18n.language === "ar" ? "flex-row-reverse ms-auto" : ""}`}
                >
                  {t("hero.shopCollection")}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`size-5 ${
                      i18n.language === "ar" ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </SwiperSlide>

          {/* //* Slide 2 */}
          <SwiperSlide className="">
            <motion.div
              key={`slide2-${activeSlide}`}
              initial="hidden"
              animate={activeSlide === 1 ? "show" : "hidden"}
              variants={{
                hidden: {},
                show: {},
              }}
              className="w-full h-full"
            >
              <Image
                src={img2}
                alt="Image 2"
                className={`w-full h-full object-cover object-[60%_center]${i18n.language === "ar" ? " scale-x-[-1]" : ""}`}
              />
              <div
                className={`absolute top-[50%] ${i18n.language === "en" ? "right-[5.35%]" : "left-[5.35%]"} mt-[23px] ${i18n.language === "ar" ? "text-left" : "text-right"} z-10 uppercase transform -translate-y-1/2 `}
              >
                {i18n.language === "ar" ? (
                  <>
                    <motion.h3
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`text-[110px] inline-block font-extrabold text-transparent leading-none mb-3 ${i18n.language === "ar" ? "me-4" : "ms-4"} w-fit`}
                      style={{ WebkitTextStroke: "1px white" }}
                    >
                      {t("hero.fashion")}
                    </motion.h3>
                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="relative inline-block text-[46px] font-extrabold text-accent -tracking-[1.25px]"
                    >
                      <sub
                        className={`text-2xl text-border font-normal tracking-wide ${i18n.language === "ar" ? "ms-3" : "me-3"}`}
                      >
                        {t("hero.from")}
                      </sub>
                      $120
                    </motion.p>
                  </>
                ) : (
                  <>
                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="relative inline-block text-[46px] font-extrabold text-accent -tracking-[1.25px]"
                    >
                      <sub
                        className={`text-2xl text-border font-normal tracking-wide ${i18n.language === "ar" ? "me-3" : "ms-3"}`}
                      >
                        {t("hero.from")}
                      </sub>
                      $120
                    </motion.p>
                    <motion.h3
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="text-[110px] inline-block font-extrabold text-transparent leading-none mb-3 ms-4 w-fit"
                      style={{ WebkitTextStroke: "1px white" }}
                    >
                      {t("hero.fashion")}
                    </motion.h3>
                  </>
                )}

                <motion.h3
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-[94px] font-extrabold tracking-[2.5px] text-[#fff] leading-none mb-12 w-fit"
                >
                  {t("hero.sportswear")}
                </motion.h3>

                <motion.a
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 1, delay: 0.8 }}
                  href=""
                  className="text-[14px] py-4 px-8 text-white bg-[#333] rounded-[4px] font-semibold flex items-center gap-2 w-fit transition-colors duration-300 hover:bg-[#454545]"
                >
                  {t("hero.shopCollection")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section id="Features">
        <div className="py-8 mx-5 ">
          <div className="flex justify-center items-center py-6 w-full bg-white">
            {features_data.map((feature) => (
              <div
                key={feature.id}
                className={`flex justify-center items-center gap-5 p-[10px] w-[368.25px] 
                relative after:absolute ${i18n.language === "ar" ? "after:left-0" : "after:right-0"}  after:h-14 after:w-[0.5px] after:bg-border last:after:hidden`}
              >
                <div className="flex justify-center items-center p-4 rounded-full bg-[#8CD42F1A] text-secondary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-6 tracking-normal mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="DealsSection">
        <div className="mt-[70px] mb-[50px] mx-5">
          <div className="grid grid-cols-12 gap-5">
            <div className="promo-grid col-span-9 grid grid-cols-3 gap-5 mb-8">
              <div className="col-span-2">
                <PromoBanner />
              </div>
              <div className="col-span-1">
                <HeadphonesCard />
              </div>
              <FashionPromoCard />
              <ElectronicPromoCard />
              <ShoesPromoCard />
            </div>
            <div className="col-span-3">
              <div>
                <div className="bg-secondary py-6 text-center">
                  <h2 className="text-2xl text-[#FFFFFFB3]">
                    {t("deals.topDailyDeals")}
                  </h2>
                </div>
                <div className="bg-white">
                  <div className="p-5">
                    <div className="flex flex-col gap-5">
                      <MiniProductCard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vendors">
        <div className=" mx-5">
          <div className="mb-5">
            <h2 className="capitalize text-2xl font-bold leading-7 text-[#333]">
              {t("vendors.topWeeklyVendors")}
            </h2>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
              <VendorCard />
            </div>
          </div>
        </div>
      </section>

      <section id="categories">
        <div className="mx-5 mt-20">
          <div className="mb-8">
            <h2 className="capitalize text-2xl font-bold leading-7 text-[#333]">
              {t("categories_menu.shopByCategories")}
            </h2>
          </div>
          <div>
            <div className="grid grid-cols-3 md:grid-cols-8 items-center">
              <MiniCategoryCard />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mt-9 mx-5 p-2">
          <div className="grid md:grid-cols-12 gap-5 ">
            <div className="col-span-3">
              <SidebarCategories
                setSelectedSubCategory={setSelectedSubCategory}
                setFilterLoading={setFilterLoading}
              />
            </div>
            <div className="col-span-9 relative">
                {filterLoading && <LoaderProducts />}
              <div
                className={`grid md:grid-cols-4 gap-5 ${filterLoading ? "opacity-30" : ""} `}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
