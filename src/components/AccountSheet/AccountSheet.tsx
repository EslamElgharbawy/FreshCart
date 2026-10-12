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
import { Box, Heart, House, LockKeyhole, LogOut, MapPin, User, UserRound, XIcon } from "lucide-react";
import i18n from "@/i18n";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { usePathname, useSearchParams } from "next/navigation";
import { clearCartState } from "@/Features/Cart.slice";
import { clearWishlistState } from "@/Features/WishList.slice";
import { logout } from "@/Features/user.slice";
import { actions } from "@/Features/AuthDialog.slice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { clearOrdersState } from "@/Features/Order.slice";
import Link from "next/link";
export default function AccountSheet({ children }: { children: ReactNode }) {
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
    dispatch(clearOrdersState());
    if (isCheckout) {
      dispatch(actions.openAuthDialog("SignIn"));
    } else {
      toast.success(t("authDialog.logoutSuccess"));
    }
  };
  const { user } = useAppSelector((store) => store.user);
  const firstName = user?.name?.split(" ")[0];

  type AccountLink = {
    id: number;
    icon: ReactNode;
    title: string;
    href: string;
    dis?: string;
  };
  const Links: AccountLink[] = [
    {
    id: 1,
    icon: <UserRound className="size-5 text-[#333]" />,
    title: "Account Details",
    dis: "View and edit your profile details",
    href: "/account",
  },
  {
    id: 2,
    icon: <Box className="size-5 text-[#333]" />,
    title: "My Orders",
    dis: "Track and view your orders",
    href: "/allorders",
  },
  {
    id: 3,
    icon: <Heart className="size-5 text-[#333]" />,
    title: "My Wishlist",
    dis: "Your saved products",
    href: "/wishList",
  },
  {
    id: 4,
    icon: <MapPin className="size-5 text-[#333]" />,
    title: "My Addresses",
    dis: "Manage your saved addresses",
    href: "/account/addresses",
  },
  
  {
    id: 5,
    icon: <LockKeyhole className="size-5 text-[#333]" />,
    title: "Change Password",
    dis: "Update your account password",
    href: "/account/change-password",
  },
];
  return (
    <Sheet open={openSheetAccount} onOpenChange={setOpenSheetAccount}>
      <SheetTrigger asChild>{children}</SheetTrigger>

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
            {i18n.language === "ar"
              ? `${t("navbar.greeting")}، ${firstName}`
              : `${t("navbar.greeting")}, ${firstName}`}
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

          {Links.map((item) => (
            <div key={item.id}>
              <Link
                href={item.href}
                onClick={() => setOpenSheetAccount(false)}
                className="flex items-center gap-4 border-b-[1px] border-[#ecf0f4] pb-5 px-8"
              >
                <div>{item.icon}</div>
                <div className="group/account-link w-full">
                  <h2 className="font-semibold text-[#333] 2xl:group-hover/account-link:text-primary transition-colors duration-300">
                    {item.title}
                  </h2>
                  <p className="text-sm text-[#484848] 2xl:group-hover/account-link:text-primary transition-colors duration-300">
                    {item.dis}
                  </p>
                </div>
              </Link>
            </div>
          ))}

        <SheetFooter className="text-sm gap-0">
          <Button
            type="button"
            onClick={() => handleLogout()}
            className="text-base text-[#333] bg-transparent 2xl:hover:bg-transparent 2xl:hover:underline font-medium"
          >
            <LogOut
              className={`!w-5 !h-5 text-[#333] ${i18n.language === "ar" ? "-scale-x-100" : ""}`}
            />{" "}
            {t("authDialog.logout")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
