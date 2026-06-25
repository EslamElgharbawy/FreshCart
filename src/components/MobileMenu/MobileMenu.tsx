"use client";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";
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

const sections = [
  { name: "home", path: "/" },
  { name: "shop", path: "/Shop" },
  { name: "vendors", path: "/Vendors" },
  { name: "deals", path: "/Deals" },
];

export function MobileMenu() {
  const [active, setactive] = useState("home");
  const { t } = useTranslation();
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
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Menu className="w-7 h-7 xl:w-8 xl:h-8" />
      </SheetTrigger>
      <SheetContent
        side={i18n.language === "ar" ? "right" : "left"}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="z-50 bg-[#222] !w-[80%] md:!w-[70%] lg:!w-[62%] xl:!w-[36%] !border-0"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
          <InputGroup className="max-w-xs !h-10 !rounded-sm border-[1px] border-[#333] ">
            <InputGroupAddon
              className={`${i18n.language === "ar" ? "!pe-4" : "!pr-4"}`}
            >
              <Search className="text-white" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder={t("Menu.search")}
              className=" placeholder:!text-[#999] text-sm focus:placeholder:opacity-0 placeholder:transition-opacity placeholder:duration-300 "
            />
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
                    onClick={() => setactive(item.name)}
                    className={`tap-item px-2 py-4 transition-all duration-300 text-border border-b-[1px] border-b-[#333] last:border-b-0 ${active === item.name ? "text-primary" : ""}`}
                  >
                    <Link href={item.path}>{t(`navbar.${item.name}`)}</Link>
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
