"use client";
import Image from "next/image";
import Link from "next/link";
import { XIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyCart from "../../assets/images/empty-bag.svg";
import CartBadgeLoader from "../Skeletons/CartBadgeLoader";
import CartSheetItem from "../CartSheetItem/CartSheetItem";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import i18n from "@/i18n";
import { Currency } from "@/Types/currency";
import { useRouter } from "next/navigation";
import { setActiveStep } from "@/Features/Cart.slice";

interface CartSheetProps {
  currency: Currency;
  language: string;
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartSheet({
  currency,
  language,
  openSheet,
  setOpenSheet,
}: CartSheetProps) {
  const { authChecked } = useAppSelector((store) => store.user);
  const { cart, loading } = useAppSelector((store) => store.CartSlice);
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currencySymbol = {
    USD: "$",
    EUR: "€",
  };
  const productsCount = cart?.products?.length ?? 0;
  const totalPrice = cart?.totalCartPrice ?? 0;

  const isBusy = !authChecked || loading;

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-center items-center gap-4 group duration-300 bg-transparent border-none"
        >
          <span>
            <p className="text-border text-[11px] font-medium group-hover:text-primary transition-all">
              {t("navbar.cart")}
            </p>

            <div className="font-bold text-end group-hover:text-primary transition-all text-base leading-5 flex items-center justify-end gap-1">
              <span id="Currency">{currencySymbol[currency]}</span>

              {isBusy ? (
                <Skeleton className="h-4 w-16 rounded-sm" />
              ) : (
                <span>{new Intl.NumberFormat("en-US").format(totalPrice)}</span>
              )}
            </div>
          </span>

          <span className="relative mb-1 group-hover:text-primary transition-all">
            {isBusy ? (
              <CartBadgeLoader language={language} />
            ) : (
              <span
                className={`absolute -top-1 ${
                  language === "EGY" ? "-left-1" : "-right-1"
                } w-[18px] h-[18px] bg-accent text-[#272b37] text-[11px] rounded-full flex justify-center items-center`}
              >
                {productsCount}
              </span>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1-.75 0Z"
              />
            </svg>
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side={i18n.language === "ar" ? "left" : "right"}
        className={`bg-white !max-w-[480px]
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          sm:max-lg:data-[side=right]:!w-[85%]
          ${
            i18n.language === "ar"
              ? "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left"
              : "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
          }
          !duration-300
          ease-in-out
          transition-all
        `}
        overlayClassName="bg-black/20"
      >
        <SheetHeader className="flex justify-center !px-5 !pt-5 !pb-7 z-20">
          <SheetTitle className="text-lg font-medium w-fit">
            {t("cart.shoppingCart")}{" "}
            <span>{productsCount ? `(${productsCount})` : ""}</span>
          </SheetTitle>

          <SheetClose asChild>
            <Button
              variant="ghost"
              className={`absolute top-3 xl:!w-[40px] xl:!h-[40px]
                group-data-[state=closed]:opacity-0
                group-data-[state=closed]:pointer-events-none
                transition-opacity duration-300
                sm:max-xl:mt-1
                ${i18n.language === "ar" ? "left-4" : "right-4"}
              `}
            >
              <XIcon className="size-7 text-black" />
            </Button>
          </SheetClose>
        </SheetHeader>

        {!productsCount ? (
          <div className="flex flex-col justify-center items-center flex-1 text-[#7c818b] relative -top-[70px]">
            <Image
              src={EmptyCart}
              alt="Empty Cart"
              width={100}
              height={100}
              className="w-[40%] opacity-25 mb-16"
            />

            {t("cart.emptyCart")}
          </div>
        ) : (
          <>
            <div className="overflow-y-auto">
              {cart?.products.map((item: any) => (
                <div
                  key={item._id}
                  className="border-b-[1px] border-[#ecf0f4] last:border-0 mb-5"
                >
                  <CartSheetItem
                    item={item}
                    onNavigate={() => setOpenSheet(false)}
                  />
                </div>
              ))}
            </div>

            <SheetFooter className="text-sm gap-0">
              <div className="flex justify-between items-center mb-3">
                <p>
                  {t("cart.subtotal")} (<span>{productsCount}</span>{" "}
                  {t("cart.items")})
                </p>

                <p>
                  {currencySymbol[currency]}
                  {new Intl.NumberFormat("en-US").format(totalPrice)}
                </p>
              </div>

              <Button
                type="button"
                onClick={() => {
                  setOpenSheet(false);
                  dispatch(setActiveStep("checkout"));
                  router.push("/Cart?step=checkout");
                }}
                className="text-sm !leading-[60px] text-white font-medium px-7 h-auto rounded-sm w-full"
              >
                {t("cart.checkout")}
              </Button>

              <Link
                href="/Cart"
                onClick={() => {
                  setOpenSheet(false);
                }}
                className="capitalize mx-auto font-medium mt-4 bg-transparent border-0 border-b border-b-current rounded-none px-0 h-auto w-fit justify-center"
              >
                {t("cart.viewCart")}
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
