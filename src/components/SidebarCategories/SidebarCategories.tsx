import { getProducts } from "@/Features/Product.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import i18n from "@/i18n";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

type SidebarCategoriesProps = {
  setSelectedSubCategory: React.Dispatch<React.SetStateAction<string>>;
  setFilterLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SidebarCategories({
  setSelectedSubCategory,
  setFilterLoading,
}: SidebarCategoriesProps) {
  const {t} = useTranslation()
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((store) => store.ProductSlice);
  const electronicsProducts = products.filter(
    (product) => product.category.name === "Electronics",
  );
  const electronicsSubCategories = [
    ...new Map(
      electronicsProducts
        .flatMap((product) => product.subcategory)
        .map((sub) => [sub._id, sub]),
    ).values(),
  ];
  console.log(electronicsSubCategories);
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-center flex-col gap-4 bg-white py-5 px-8">
        <div>
          <h1 className="text-xl font-bold text-[#333] leading-6">
            {t("electronicsSidebar.title")}
          </h1>
        </div>
        <div className="flex flex-col gap-5 ">
          {electronicsSubCategories?.map((sub) => (
            <button
              key={sub._id}
              type="button"
              onClick={() => {
                setFilterLoading(true);
                setSelectedSubCategory(sub._id);

                setTimeout(() => {
                  setFilterLoading(false);
                }, 500);
              }}
              className="text-textMain text-start hover:text-primary transition-colors duration-300"
            >
              {t(`electronicsSidebar.${sub.slug}`)}
              
            </button>
          ))}
        </div>
        <button className="group mt-2">
          <h1
            className="text-sm font-semibold text-[#333] uppercase flex items-center gap-3 w-fit relative after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1
    after:h-[3px] after:w-0
    after:bg-[#333] after:transition-all after:duration-500 group-hover:after:w-full"
          >
            {t(`electronicsSidebar.browseAll`)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`size-4 ${i18n.language === "ar" ? "rotate-180" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </h1>
        </button>
      </div>
    </>
  );
}
