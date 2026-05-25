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
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { t } = useTranslation();

  return (
    <section>
      <Swiper
        dir="ltr"
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation,Pagination]}
        speed={1000}
        onSlideChangeTransitionEnd={(swiper) =>
          setActiveSlide(swiper.realIndex)
        }
        className="Swiper_hero !h-[689px]"
      >
        {/* Slide 1 */}
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
  );
}
