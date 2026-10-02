import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import i18n from "@/i18n";
import { SlidersHorizontal, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useAppSelector } from "@/hooks/store.hooks";
export default function ShopFilter({
  CategoryActive,
  setCategoryActive,
  brandActive,
  setBrandActive,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  setAppliedMinPrice,
  setAppliedMaxPrice,
}: any) {
  const { products } = useAppSelector((store) => store.ProductSlice);
  const { categories } = useAppSelector((store) => store.categoriesSlice);
  const { vendors } = useAppSelector((store) => store.VendorsSlice);
  const { t } = useTranslation();
  const priceRanges = [
    { label: "$149 - $499", min: 149, max: 499 },
    { label: "$500 - $999", min: 500, max: 999 },
    { label: "$1,000 - $4,999", min: 1000, max: 4999 },
    { label: "$5,000 - $9,999", min: 5000, max: 9999 },
    { label: "$10,000 - $42,960", min: 10000, max: 42960 },
  ];
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="text-[#333] border-2 border-[#333] rounded-sm w-1/2 mb-5"
      >
        <Button variant="outline" className="h-10">
          <SlidersHorizontal className="text-[#333]" />
          {t("shop.filter")}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={i18n.language === "ar" ? "right" : "left"}
        className={`z-50 bg-white !w-full md:!w-[90%] lg:!w-[80%] xl:!w-[70%] !border-0
                 data-[state=open]:animate-in data-[state=closed]:animate-out 
                 ${i18n.language === "ar" ? " data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right" : " data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left"}
                  transition-all 
                  !duration-500 
                  ease-in-out`}
      >
        <SheetHeader className="flex flex-row justify-between items-center">
          <SheetTitle className="text-[#333] text-xl font-semibold">
            {t("shop.filterAndSort")}
          </SheetTitle>
          <SheetClose asChild>
            <Button
              variant="ghost"
              className="relative group-data-[state=closed]:opacity-0 group-data-[state=closed]:pointer-events-none transition-opacity duration-300"
            >
              <XIcon className="size-8 lg:size-9 xl:size-10 text-[#333] stroke-[1.5px]" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="2xl:col-span-3 px-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-[#333]">{t("shop.filter")} :</div>
            <button
              onClick={() => {
                setBrandActive("");
                setCategoryActive("");
                setMinPrice("");
                setMaxPrice("");
                setAppliedMinPrice("");
                setAppliedMaxPrice("");
              }}
              className="text-sm text-[#333]"
            >
              {t("shop.cleanAll")}
            </button>
          </div>

          <Accordion
            type="multiple"
            defaultValue={["AllCategories"]}
            className="max-w-lg "
          >
            <AccordionItem
              value="AllCategories"
              className="border-b-[1px] border-[#ecf0f4]"
            >
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
                      {t(`categories_menu.${category.slug}`)}

                      <span>{productCount}</span>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="Price"
              className="border-b-[1px] border-[#ecf0f4]"
            >
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
      </SheetContent>
    </Sheet>
  );
}
