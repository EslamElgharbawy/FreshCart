import { getCategories } from "@/Features/Categoreis.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import CategoriesSkeleton from "../Skeletons/CategoriesSkeleton";

export default function MiniCategoryCard() {
    const {t} = useTranslation()
  const dispatch = useAppDispatch();

  const { categories, loading } = useAppSelector(
    (store) => store.categoriesSlice,
  );
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  console.log(categories);
  
  return (
    <>
      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <>
          {categories?.slice(0, 8).map((item) => {
            return (
              <div key={item._id} className="flex justify-center items-center flex-col px-4 mb-5 group">
                <a href="#">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-[135px] h-[135px] rounded-full object-cover overflow-hidden group-hover:scale-105 group-hover:shadow-lg transition-all duration-300"
                  />
                </a>
                <h3 className="font-bold text-[#333] mt-5 text-center hover:text-primary transition-colors duration-300">
                  <a href="#">{t(`categories_menu.${item.slug}`)}</a>
                </h3>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
