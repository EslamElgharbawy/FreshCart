"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import WishlistCard from "@/components/WishlistCard/WishlistCard";
import { GetLoggedUserWishlist } from "@/Features/WishList.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import React, { useEffect } from "react";

export default function page() {
  const { wishlist } = useAppSelector((store) => store.wishListSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetLoggedUserWishlist());
  }, [dispatch]);
  return (
    <>
      <section>
        <div className="pt-3 xl:pt-8">
          <h1 className="text-5xl font-bold text-[#333] text-center mt-10">
            Wishlist
          </h1>
          <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6 py-12 px-5">
            {wishlist.map((item) => (
              <WishlistCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
