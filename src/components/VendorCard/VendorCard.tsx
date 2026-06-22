import { getProducts } from "@/Features/Product.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import Image from "next/image";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import BrandCardSkeleton from "../Skeletons/BrandCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
export default function VendorCard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((store) => store.ProductSlice);

  const brandsMap = new Map();

  products?.forEach((product) => {
    const brandId = product.brand._id;

    if (!brandsMap.has(brandId)) {
      brandsMap.set(brandId, {
        ...product.brand,
        products: [],
      });
    }

    brandsMap.get(brandId).products.push(product);
  });

  const brands = Array.from(brandsMap.values())
    .sort((a, b) => b.products.length - a.products.length)
    .slice(0, 5);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <BrandCardSkeleton />
      ) : (
        <>
          <div className="2xl:hidden">
            <Swiper
              spaceBetween={10}
              breakpoints={{
                0: { slidesPerView: 1 },
                600: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="vendor_pagination !pb-9 bg-transparent"
            >
              {brands.map((brand) => {
                const vendorProducts = brand.products.slice(0, 3);
                return (
                  <SwiperSlide key={brand._id} className="xl:!w-[250px] xl:!mr-3">
                    <div key={brand._id} className="flex flex-col xl:gap-5">
                      <div className="my-5 flex items-center justify-center gap-5">
                        <Image
                          src={brand.image}
                          width={100}
                          height={100}
                          alt="Vendor"
                        />
                        <div className="w-full">
                          <a
                            href="#"
                            className=" font-bold text-[#333] leading-5 tracking-[-0.375px] hover:text-primary transition-colors duration-300"
                          >
                            {brand.name}
                          </a>
                          <p className="text-[#777] text-sm mt-1">
                            ({brand.products.length} {t("vendors.products")})
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="grid grid-cols-3 gap-2 w-full">
                          {vendorProducts[0] && (
                            <div className="col-span-2 row-span-2 border-2 border-transparent hover:border-primary hover:border-solid transition-all duration-300 ">
                              <Image
                                src={vendorProducts[0].imageCover}
                                width={100}
                                height={100}
                                alt={vendorProducts[0].title}
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          )}

                          {vendorProducts[1] && (
                            <div className="col-span-1 border-2 border-transparent hover:border-primary hover:border-solid transition-all duration-300 ">
                              <Image
                                src={vendorProducts[1].imageCover}
                                width={100}
                                height={100}
                                alt={vendorProducts[1].title}
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          )}

                          {vendorProducts[2] && (
                            <div className="col-span-1 border-2 border-transparent hover:border-primary hover:border-solid transition-all duration-300 ">
                              <Image
                                src={vendorProducts[2].imageCover}
                                width={100}
                                height={100}
                                alt={vendorProducts[2].title}
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {brands.map((brand) => {
            const vendorProducts = brand.products.slice(0, 3);
            return (
              <div
                key={brand._id}
                className="flex flex-col gap-5 sm:max-2xl:hidden"
              >
                <div className="my-5 flex items-center justify-center gap-5">
                  <Image
                    src={brand.image}
                    width={100}
                    height={100}
                    alt="Vendor"
                  />
                  <div className="w-full">
                    <a
                      href="#"
                      className=" font-bold text-[#333] leading-5 tracking-[-0.375px] hover:text-primary transition-colors duration-300"
                    >
                      {brand.name}
                    </a>
                    <p className="text-[#777] text-sm mt-1">
                      ({brand.products.length} {t("vendors.products")})
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className=" grid grid-cols-3 gap-2">
                    {vendorProducts[0] && (
                      <div className="col-span-2 row-span-2 border-2 border-transparent hover:border-primary hover:border-solid transition-all duration-300 ">
                        <Image
                          src={vendorProducts[0].imageCover}
                          width={100}
                          height={100}
                          alt={vendorProducts[0].title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    {vendorProducts[1] && (
                      <div className="col-span-1 border-2 border-transparent hover:border-primary hover:border-solid transition-all duration-300 ">
                        <Image
                          src={vendorProducts[1].imageCover}
                          width={100}
                          height={100}
                          alt={vendorProducts[1].title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    {vendorProducts[2] && (
                      <div className="col-span-1 border-2 border-transparent hover:border-primary hover:border-solid transition-all duration-300 ">
                        <Image
                          src={vendorProducts[2].imageCover}
                          width={100}
                          height={100}
                          alt={vendorProducts[2].title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
