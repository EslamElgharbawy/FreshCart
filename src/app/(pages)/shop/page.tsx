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
  const isBusy = useIsBusy({ authChecked, loading });
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

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getVendors());
  }, []);
  return (
    <>
      <section className="pt-[151px] lg:pt-[169px] xl:pt-[239px] 2xl:pt-[110px]">
        <div className="relative h-[150px] 2xl:h-[416px]">
          <Image
            src={shopImg}
            alt="shopImg"
            className="w-full h-full object-cover object-[30%_center] xl:object-[36%_center]"
          />
          <div className="absolute inset-0 px-5 z-10">
            <div className="absolute mt-7 z-10 left-[6.3%] xl:left-[8.8%] top-[50%] -translate-y-1/2 uppercase">
              <h3
                className="text-[25px] leading-[25px] xl:text-[66px] xl:leading-[66px] font-bold mb-2 text-transparent"
                style={{ WebkitTextStroke: "1px white" }}
              >
                Fashion
              </h3>
              <h4 className="text-white text-[27px] xl:text-[76px] leading-[27px] xl:leading-[76px] font-extrabold mb-8 tracking-[-0.75px]">
                Skiwears
              </h4>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-5 max-xl:py-2">
        <BreadCrumb
          shopPage
          currentPage={
            categories?.find((category) => category._id === CategoryActive)
              ?.name
          }
          brand={vendors
            ?.find((brand) => brand._id === brandActive)
            ?.name.toLowerCase()}
        />
      </section>

      <section className="pb-12">
        <div className="grid 2xl:grid-cols-12">
          <div className="2xl:col-span-3 px-4">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold">{t("shop.filter")} :</div>
              <button
                onClick={() => {
                  (setBrandActive(""),
                    setCategoryActive(""),
                    setMinPrice(""),
                    setMaxPrice(""),
                    setAppliedMinPrice(""),
                    setAppliedMaxPrice(""));
                }}
                className="text-sm text-[#333]"
              >
                {t("shop.cleanAll")}
              </button>
            </div>

            <Accordion
              type="multiple"
              defaultValue={["shipping"]}
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
                          setCategoryActive(category._id);
                        }}
                        key={category._id}
                        className={`flex justify-between items-center py-2 text-sm transition-colors duration-300 cursor-pointer ${CategoryActive === category._id ? "text-primary" : "text-[#333] hover:text-primary"}`}
                      >
                        {category.name}

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
                        className="flex cursor-pointer items-center justify-between py-2 text-sm text-[#333] transition-colors duration-300 hover:text-primary"
                        onClick={() => {
                          setMinPrice(range.min.toString());
                          setMaxPrice(range.max.toString());

                          setAppliedMinPrice(range.min.toString());
                          setAppliedMaxPrice(range.max.toString());
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
                              setBrandActive(brand._id);
                            }}
                            className={`text-sm transition-colors duration-300 cursor-pointer ${brandActive === brand._id ? "text-primary" : "text-[#333] hover:text-primary"}`}
                          >
                            {brand.name}
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
          <div className="2xl:col-span-9 px-4">
            {isBusy ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="loaderProducts"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 2xl:grid-cols-4 gap-5">
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
