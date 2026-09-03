"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartData } from "@/Types/cart";
import { Skeleton } from "../ui/skeleton";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useRouter } from "next/navigation";
interface CartTotalsProps {
  cart: CartData | null;
  isBusy: boolean;
}
export default function CartTotals({ cart, isBusy }: CartTotalsProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const dir = i18n.dir();
  return (
    <div className="w-full rounded-lg border border-[#eee] bg-white p-8">
      <h2 className="text-xl font-bold uppercase tracking-[-0.2px] text-[#333]">
        {t("cart.cartTotals")}
      </h2>

      {isBusy ? (
        <>
          <div className="flex items-center justify-between border-b border-[#eee] py-5">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="flex items-center justify-between border-b border-[#eee] py-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </>
      ) : (
        cart?.products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between border-b border-[#eee] py-5"
          >
            <div className="text-sm font-medium text-[#666]">
              {product.product.title} × {product.count}
            </div>

            <p className="text-sm font-medium text-[#666] ps-5">
              ${new Intl.NumberFormat("en-US").format(product.price)}
            </p>
          </div>
        ))
      )}

      <div className="flex items-center justify-between pt-5">
        <span className="text-base font-semibold tracking-[-0.4px] text-[#333]">
          {t("cart.total")}
        </span>

        <span className="text-base font-semibold text-[#333]">
          {isBusy ? (
            <Skeleton className="h-5 w-24" />
          ) : (
            `$${new Intl.NumberFormat("en-US").format(
              cart?.totalCartPrice ?? 0,
            )}`
          )}
        </span>
      </div>

      <Button
        type="button"
        onClick={() => router.push("/Cart?step=checkout")}
        className="mt-5 h-11 lg:h-12  w-full rounded-md bg-[#333] text-xs lg:text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#444]"
      >
        {t("cart.proceedToCheckout")}
        <ArrowRight
          className={`size-4 ${dir === "rtl" ? "rotate-180 mr-2" : "ml-2"}`}
        />
      </Button>
    </div>
  );
}
