import { getCategories } from "@/Features/Categoreis.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import CategoriesSkeleton from "../Skeletons/CategoriesSkeleton";
import Link from "next/link";

export default function MiniCategoryCard() {
    const {t} = useTranslation()
  const dispatch = useAppDispatch();

  const { categories, loading } = useAppSelector(
    (store) => store.categoriesSlice,
  );
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  
  return (
    <>
      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <>
          {categories?.slice(0, 8).map((item) => {
            return (
              <div key={item._id} className="flex justify-center items-center flex-col px-4 mb-5 group">
                <Link href="/shop">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] xl:w-[120] xl:h-[120] 2xl:w-[135px] 2xl:h-[135px] rounded-full object-cover overflow-hidden 2xl:group-hover:scale-105 2xl:group-hover:shadow-lg transition-all duration-300"
                  />
                </Link>
                <h3 className="text-sm xl:text-base font-bold text-[#333] mt-5 text-center hover:text-primary transition-colors duration-300">
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
