"use client";
import EmptyState from "@/components/EmptyState/EmptyState";
import ProductCard from "@/components/ProductCard/ProductCard";
import WishlistCardSkeleton from "@/components/Skeletons/WishlistCardSkeleton";
import WishlistCard from "@/components/WishlistCard/WishlistCard";
import { GetLoggedUserWishlist } from "@/Features/WishList.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import useIsBusy from "@/hooks/useIsBusy.hooks";
import React, { useEffect } from "react";

export default function page() {
  const { wishlist, loading } = useAppSelector((store) => store.wishListSlice);
  const { authChecked } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetLoggedUserWishlist());
  }, [dispatch]);
  const isBusy = useIsBusy({
    authChecked,
    loading,
  });

  return (
    <>
      <section>
        <div className="pt-3 xl:pt-8">
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#333] text-center mt-6 sm:mt-8 xl:mt-10">
            Wishlist
          </h1>

          {isBusy ? (
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6 py-12 px-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <WishlistCardSkeleton key={index} />
              ))}
            </div>
          ) : wishlist.length === 0 ? (
            <EmptyState title="wish list is empty" />
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6 py-12 px-5">
              {wishlist.map((item) => (
                <WishlistCard key={item._id} product={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
