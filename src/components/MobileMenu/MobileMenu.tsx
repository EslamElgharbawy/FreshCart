"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, XIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/store.hooks";
import {
  Music,
  Shirt,
  BookOpen,
  House,
  Smartphone,
  Laptop,
  HeartPulse,
  Baby,
  ShoppingCart,
} from "lucide-react";
import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import i18n from "@/i18n";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Product } from "@/Types/products";
import Image from "next/image";
import { motion } from "framer-motion";
import HighlightText from "../HighlightText/HighlightText";

const sections = [
  { name: "home", path: "/" },
  { name: "shop", path: "/shop" },
  { name: "cartTap", path: "/cart" },
  { name: "wishList", path: "/wishList" },
];
type MobileMenuProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filteredProducts: Product[];
};

export function MobileMenu({
  search,
  setSearch,
  filteredProducts,
}: MobileMenuProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { categories } = useAppSelector((store) => store.categoriesSlice);

  const categoryIcons: Record<string, React.ElementType> = {
    music: Music,
    "men's-fashion": Shirt,
    "women's-fashion": Shirt,
    supermarket: ShoppingCart,
    "baby-and-toys": Baby,
    home: House,
    books: BookOpen,
    "beauty-and-health": HeartPulse,
    mobiles: Smartphone,
    electronics: Laptop,
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger
        asChild
        className="cursor-pointer"
        onClick={() => {
          setIsSheetOpen(true);
        }}
      >
        <Menu className="w-7 h-7 xl:w-8 xl:h-8" />
      </SheetTrigger>
      <SheetContent
        side={i18n.language === "ar" ? "right" : "left"}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={`z-50 bg-[#222] !w-[80%] md:!w-[70%] lg:!w-[62%] xl:!w-[36%] !border-0
           data-[state=open]:animate-in data-[state=closed]:animate-out 
           ${i18n.language === "ar" ? " data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right" : " data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left"}
            transition-all 
            !duration-500 
            ease-in-out`}
        overlayClassName="bg-black/80"
      >
        <SheetClose asChild>
          <Button
            variant="ghost"
            className={`absolute top-3 xl:!w-[40px] xl:!h-[40px]
                group-data-[state=closed]:opacity-0 
                group-data-[state=closed]:pointer-events-none
                transition-opacity duration-300  
                ${i18n.language === "ar" ? "right-[340px] md:top-5 md:right-[380px] lg:right-[420px] xl:right-[750px]" : "left-[330px] md:top-5 md:left-[380px] lg:left-[420px] xl:left-[750px]"}`}
          >
            <XIcon className="size-8 lg:size-9 xl:size-10 text-white stroke-[1.5px]" />
          </Button>
        </SheetClose>
        <SheetHeader>
          <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
          <InputGroup className="max-w-xs !h-10 !rounded-sm border-[1px] border-[#333] relative">
            <InputGroupAddon
              className={`${i18n.language === "ar" ? "!pe-4" : "!pr-4"}`}
            >
              <button
                onClick={() => {
                  if (search.trim()) {
                    setSearch("");
                  } else {
                    inputRef.current?.focus();
                  }
                }}
                className="text-white hover:text-primary transition-all duration-300 "
              >
                {search.trim() ? (
                  <X strokeWidth={1.5} />
                ) : (
                  <Search strokeWidth={1.5} />
                )}
              </button>
            </InputGroupAddon>
            <InputGroupInput
              ref={inputRef}
              placeholder={t("Menu.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" placeholder:!text-[#999] text-sm text-[#999] focus:placeholder:opacity-0 placeholder:transition-opacity placeholder:duration-300 "
            />
            {search.trim() && filteredProducts.length > 0 && (
              <div className="absolute top-full right-0 left-0 h-[300px] bg-white mt-1 rounded-sm z-20 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <Link
                    href={`/ProductDetails/${product._id}`}
                    key={product._id}
                    onClick={() => {
                      (setSearch(""), setIsSheetOpen(false));
                    }}
                    className="flex items-center gap-3 mx-5 py-5 cursor-pointer border-b border-[#ebebeb]"
                  >
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="object-contain"
                    />

                    <div>
                      <h3 className="text-sm  text-[#333] line-clamp-2">
                        <HighlightText text={product.title} search={search} />
                      </h3>

                      <span className="text-base text-[#333]">
                        ${product.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </InputGroup>
        </SheetHeader>

        <Tabs defaultValue="Pages" className="w-full block">
          <TabsList variant="line" className="w-full px-4 mb-4">
            <TabsTrigger
              value="Pages"
              className="uppercase text-white p-2 text-sm font-semibold"
            >
              {t("Menu.pages")}
            </TabsTrigger>
            <TabsTrigger
              value="Categories"
              className="uppercase text-white p-2 text-sm font-semibold"
            >
              {t("Menu.categories")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Pages">
            <div
              className={`left-side ${i18n.language === "ar" ? " text-end " : " text-start"}`}
            >
              <ul className="flex flex-col text-[14px] px-4">
                {sections.map((item) => (
                  <li
                    key={item.name}
                    className={`tap-item px-2 py-4 transition-all duration-300 text-border border-b-[1px] border-b-[#333] last:border-b-0 ${pathname === item.path ? "text-primary" : ""}`}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {" "}
                      {t(`navbar.${item.name}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="Categories">
            <div className="flex flex-col px-4">
              {categories?.map((item) => {
                const Icon = categoryIcons[item.slug];
                return (
                  <a
                    href=""
                    key={item._id}
                    className={`flex gap-3 text-border focus:bg-transparent outline-none px-2 py-4 w-full rounded-none border-b-[1px] border-b-[#333] last:border-b-0 ${i18n.language === "ar" ? " flex-row-reverse " : ""}`}
                  >
                    {Icon && <Icon size={20} />}
                    <span>{t(`categories_menu.${item.slug}`)}</span>
                  </a>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
