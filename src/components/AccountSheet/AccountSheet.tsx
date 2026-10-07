"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartSheetItem from "../CartSheetItem/CartSheetItem";
import { LogOut, User, XIcon } from "lucide-react";
import i18n from "@/i18n";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { usePathname, useSearchParams } from "next/navigation";
import { clearCartState } from "@/Features/Cart.slice";
import { clearWishlistState } from "@/Features/WishList.slice";
import { logout } from "@/Features/user.slice";
import { actions } from "@/Features/AuthDialog.slice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
export default function AccountSheet() {
  const { user } = useAppSelector((store) => store.user);
  const { t, i18n } = useTranslation();
  const [openSheetAccount, setOpenSheetAccount] = useState(false);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleLogout = () => {
    const isCheckout =
      pathname === "/cart" && searchParams.get("step") === "checkout";

    dispatch(logout());

    setOpenSheetAccount(false);
    dispatch(clearCartState());
    dispatch(clearWishlistState());
    if (isCheckout) {
      dispatch(actions.openAuthDialog("SignIn"));
    } else {
      toast.success(t("authDialog.logoutSuccess"));
    }
  };
  const firstName = user?.name?.split(" ")[0];
  return (
    <Sheet open={openSheetAccount} onOpenChange={setOpenSheetAccount}>
      <SheetTrigger asChild>
        <div className="auth flex justify-center items-center gap-1 text-[#666666] text-[11px]">
          <button className="flex justify-center items-center gap-1 hover:text-[#fe4407] transition-all duration-300">
            <User width={20} height={20} />
            {i18n.language === "ar"
              ? `${t("navbar.greeting")}، ${firstName}`
              : `${t("navbar.greeting")}, ${firstName}`}
          </button>
        </div>
      </SheetTrigger>

      <SheetContent
        side={i18n.language === "ar" ? "left" : "right"}
        className={`bg-white !max-w-[480px]
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          sm:max-lg:data-[side=right]:!w-[85%]
          sm:max-lg:data-[side=left]:!w-[85%]
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
            <span>{/* {productsCount ? `(${productsCount})` : ""} */}</span>
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

        {/* {!productsCount ? (
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
                          <> */}
        {/* <div className="overflow-y-auto">
          {cart?.products.map((item: any) => (
            <div
              key={item._id}
              className="border-b-[1px] border-[#ecf0f4] last:border-0 mb-5"
            >
              <CartSheetItem
                item={item}
                onNavigate={() => setOpenSheetCart(false)}
              />
            </div>
          ))}
        </div> */}
        <SheetFooter className="text-sm gap-0">
          <Button
            type="button"
            onClick={() => handleLogout()}
            className="text-base bg-transparent hover:bg-transparent hover:underline font-normal"
          >
            <LogOut className="!w-5 !h-5" /> Log out
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
