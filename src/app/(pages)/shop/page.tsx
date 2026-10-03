"use client";
import Image from "next/image";
import shopImg from "../../../assets/images/shop-banner.jpg";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { useEffect, useState } from "react";
import { getProducts } from "@/Features/Product.slice";
import { getCategories } from "@/Features/Categoreis.slice";
import { getVendors } from "@/Features/Vendors.slice";
import { useTranslation } from "react-i18next";
import useIsBusy from "@/hooks/useIsBusy.hooks";
import ShopFilter from "@/components/ShopFilter/ShopFilter";
import { useRouter, useSearchParams } from "next/navigation";
import BreadcrumbSkeleton from "@/components/Skeletons/BreadcrumbSkeleton";
export default function page() {
  const [CategoryActive, setCategoryActive] = useState("");
  const [brandActive, setBrandActive] = useState("");
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((store) => store.ProductSlice);
  const { categories } = useAppSelector((store) => store.categoriesSlice);
  const { vendors } = useAppSelector((store) => store.VendorsSlice);
  const { authChecked } = useAppSelector((store) => store.user);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMinPrice, setAppliedMinPrice] = useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState("");
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isBusy = useIsBusy({ authChecked, loading });

  const categoryFromUrl = searchParams.get("category") || "";
  const brandFromUrl = searchParams.get("brand") || "";
  const minFromUrl = searchParams.get("minPrice") || "";
  const maxFromUrl = searchParams.get("maxPrice") || "";

  const priceRanges = [
    { label: "$149 - $499", min: 149, max: 499 },
    { label: "$500 - $999", min: 500, max: 999 },
    { label: "$1,000 - $4,999", min: 1000, max: 4999 },
    { label: "$5,000 - $9,999", min: 5000, max: 9999 },
    { label: "$10,000 - $42,960", min: 10000, max: 42960 },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      product.category._id === CategoryActive || !CategoryActive;

    const matchesBrand = product.brand._id === brandActive || !brandActive;

    const matchesMinPrice =
      product.price >= Number(appliedMinPrice) || !appliedMinPrice;

    const matchesMaxPrice =
      product.price <= Number(appliedMaxPrice) || !appliedMaxPrice;

    return (
      matchesCategory && matchesBrand && matchesMinPrice && matchesMaxPrice
    );
  });

  const updateFiltersInUrl = (
    categoryId: string,
    brandId: string,
    min: string,
    max: string,
  ) => {
    const params = new URLSearchParams();

    if (categoryId) {
      const category = categories?.find(
        (category) => category._id === categoryId,
      );

      if (category) {
        params.set("category", category.slug);
      }
    }

    if (brandId) {
      const brand = vendors?.find((brand) => brand._id === brandId);

      if (brand) {
        params.set("brand", brand.slug);
      }
    }

    if (min) {
      params.set("minPrice", min);
    }

    if (max) {
      params.set("maxPrice", max);
    }

    const query = params.toString();

    router.replace(query ? `/shop?${query}` : "/shop", {
      scroll: false,
    });
  };
  const handleApplyFilters = (
    category: string,
    brand: string,
    min: string,
    max: string,
  ) => {
    setCategoryActive(category);
    setBrandActive(brand);

    setAppliedMinPrice(min);
    setAppliedMaxPrice(max);

    updateFiltersInUrl(category, brand, min, max);
  };
  const handleCleanAll = () => {
    setCategoryActive("");
    setBrandActive("");

    setMinPrice("");
    setMaxPrice("");

    setAppliedMinPrice("");
    setAppliedMaxPrice("");

    router.replace("/shop", {
      scroll: false,
    });
  };
  useEffect(() => {
    const category = categories?.find(
      (category) => category.slug === categoryFromUrl,
    );

    const brand = vendors?.find((brand) => brand.slug === brandFromUrl);

    setCategoryActive(category?._id || "");
    setBrandActive(brand?._id || "");

    setMinPrice(minFromUrl);
    setMaxPrice(maxFromUrl);

    setAppliedMinPrice(minFromUrl);
    setAppliedMaxPrice(maxFromUrl);
  }, [
    categories,
    vendors,
    categoryFromUrl,
    brandFromUrl,
    minFromUrl,
    maxFromUrl,
  ]);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getVendors());
  }, []);
  return (
    <>
      <section className="pt-[151px] lg:pt-[169px] xl:pt-[239px] 2xl:pt-[110px]">
        <div className="relative h-[150px] xl:h-[300px] 2xl:h-[416px]">
          <Image
            src={shopImg}
            alt="shopImg"
            className="w-full h-full object-cover object-[30%_center] xl:object-[36%_center]"
          />
          <div className="absolute inset-0 px-5 z-10">
            <div className="absolute mt-7 z-10 left-[6.3%] xl:left-[8.8%] top-[50%] -translate-y-1/2 uppercase">
              <h3
                className="text-[30px] leading-[30px] xl:text-[45px] xl:leading-[45px] 2xl:text-[66px] 2xl:leading-[66px] font-bold mb-2 text-transparent"
                style={{ WebkitTextStroke: "1px white" }}
              >
                Fashion
              </h3>
              <h4 className="text-white text-[32px] leading-[32px] xl:text-[47px] xl:leading-[47px] 2xl:text-[76px] 2xl:leading-[76px] font-extrabold mb-8 tracking-[-0.75px]">
                Skiwears
              </h4>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-5 max-xl:py-2">
        {isBusy ? (
          <BreadcrumbSkeleton />
        ) : (
          <BreadCrumb
            shopPage
            currentPage={categories
              ?.find((category) => category._id === CategoryActive)
              ?.slug.toLowerCase()}
            brand={vendors
              ?.find((brand) => brand._id === brandActive)
              ?.slug.toLowerCase()}
          />
        )}
      </section>

      <section className="pb-12">
        <div className="2xl:grid 2xl:grid-cols-12">
          {/* Desktop Filter */}
          <div className="max-2xl:hidden 2xl:col-span-3 px-4">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold">{t("shop.filter")} :</div>
              <button
                onClick={() => {
                  handleCleanAll();
                }}
                className="text-sm text-[#333] hover:text-primary transition-colors duration-300"
              >
                {t("shop.cleanAll")}
              </button>
            </div>

            <Accordion
              type="multiple"
              defaultValue={["AllCategories"]}
              className="max-w-lg "
            >
              <AccordionItem value="AllCategories">
                <AccordionTrigger>{t("shop.allCategories")}</AccordionTrigger>
                <AccordionContent>
                  {categories?.map((category) => {
                    const productCount = products.filter(
                      (product) => product.category._id === category._id,
                    ).length;
                    if (productCount === 0) return null;
                    return (
                      <div
                        onClick={() => {
                          const categoryId =
                            CategoryActive === category._id ? "" : category._id;

                          setCategoryActive(categoryId);

                          updateFiltersInUrl(
                            categoryId,
                            brandActive,
                            appliedMinPrice,
                            appliedMaxPrice,
                          );
                        }}
                        key={category._id}
                        className={`flex justify-between items-center py-2 text-sm transition-colors duration-300 cursor-pointer ${CategoryActive === category._id ? "text-primary" : "text-[#333] hover:text-primary"}`}
                      >
                        {t(`categories_menu.${category.slug}`)}

                        <span>{productCount}</span>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="Price">
                <AccordionTrigger>{t("shop.price")}</AccordionTrigger>
                <AccordionContent>
                  <div>
                    {priceRanges.map((range) => (
                      <div
                        key={range.label}
                        className={`flex cursor-pointer items-center justify-between py-2 text-sm text-[#333] transition-colors duration-300 hover:text-primary ${minPrice === range.min.toString() && maxPrice === range.max.toString() ? "text-primary" : ""}`}
                        onClick={() => {
                          const min = range.min.toString();
                          const max = range.max.toString();
                          const isActive = minPrice === min && maxPrice === max;

                          if (isActive) {
                            setMinPrice("");
                            setMaxPrice("");

                            setAppliedMinPrice("");
                            setAppliedMaxPrice("");

                            updateFiltersInUrl(
                              CategoryActive,
                              brandActive,
                              "",
                              "",
                            );
                          } else {
                            setMinPrice(min);
                            setMaxPrice(max);

                            setAppliedMinPrice(min);
                            setAppliedMaxPrice(max);

                            updateFiltersInUrl(
                              CategoryActive,
                              brandActive,
                              min,
                              max,
                            );
                          }
                        }}
                      >
                        <span>{range.label}</span>

                        <span>
                          {
                            products.filter(
                              (product) =>
                                product.price >= range.min &&
                                product.price <= range.max,
                            ).length
                          }
                        </span>
                      </div>
                    ))}

                    <div className="mt-4 flex items-center gap-2">
                      <input
                        type="number"
                        placeholder={t("shop.min")}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="hide-arrows h-9 w-[78px] rounded border border-[#ddd] py-1 px-2 text-sm outline-none placeholder:text-[#999] focus:border-primary bg-transparent"
                      />

                      <span className="text-[#999] text-xl">−</span>

                      <input
                        type="number"
                        placeholder={t("shop.max")}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="hide-arrows h-9 w-[78px] rounded border border-[#ddd] py-1 px-2 text-sm outline-none placeholder:text-[#999] focus:border-primary bg-transparent"
                      />

                      <button
                        type="button"
                        className="h-9 rounded bg-[#fe4407] px-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#e83d05]"
                        onClick={() => {
                          setAppliedMinPrice(minPrice);
                          setAppliedMaxPrice(maxPrice);
                          updateFiltersInUrl(
                            CategoryActive,
                            brandActive,
                            minPrice,
                            maxPrice,
                          );
                        }}
                      >
                        {t("shop.go")}
                      </button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="Brand">
                <AccordionTrigger>{t("shop.brand")}</AccordionTrigger>
                <AccordionContent>
                  {vendors?.map((brand) => {
                    const brandProducts = products.filter(
                      (product) => product.brand._id === brand._id,
                    );
                    const productCount = brandProducts.length;
                    if (productCount === 0) return null;
                    return (
                      <div
                        key={brand._id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex justify-center items-center gap-3 py-2 ">
                          <Image
                            src={brand.image}
                            alt={brand.name}
                            width={50}
                            height={50}
                          />
                          <div
                            onClick={() => {
                              const brandId =
                                brandActive === brand._id ? "" : brand._id;

                              setBrandActive(brandId);

                              updateFiltersInUrl(
                                CategoryActive,
                                brandId,
                                appliedMinPrice,
                                appliedMaxPrice,
                              );
                            }}
                            className={`text-sm transition-colors duration-300 cursor-pointer ${brandActive === brand._id ? "text-primary" : "text-[#333] hover:text-primary"}`}
                          >
                            {t(`vendors.${brand.slug}`)}
                          </div>
                        </div>
                        <span>{productCount}</span>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {/* Mobile Filter */}
          <div className="grid 2xl:grid-cols-12 2xl:hidden">
            <div className="px-4">
              <ShopFilter
                categories={categories}
                products={products}
                vendors={vendors}
                CategoryActive={CategoryActive}
                setCategoryActive={setCategoryActive}
                brandActive={brandActive}
                setBrandActive={setBrandActive}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                setAppliedMinPrice={setAppliedMinPrice}
                setAppliedMaxPrice={setAppliedMaxPrice}
                onApplyFilters={handleApplyFilters}
                onCleanAll={handleCleanAll}
              />
            </div>
          </div>

          <div className="2xl:col-span-9 px-4">
            {isBusy ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="loaderProducts"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 xl:grid-cols-4 max-xl:gap-8 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-1 items-center justify-center">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {t("shop.noProductsFound")}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {t("shop.noProductsDescription")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
