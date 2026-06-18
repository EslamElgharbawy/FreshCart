"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  CircleAlert,
  Heart,
  Scale,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import logo from "../../assets/images/logo1.svg";
import ReactCountryFlag from "react-country-flag";
import { useRef, useState } from "react";
import { Currency } from "@/Types/currency";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import Link from "next/link";
import { lang } from "@/Types/Lang";
import { useAppSelector } from "@/hooks/store.hooks";

export default function Navbar() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [language, setLanguage] = useState<lang>("ENG");
  const [active, setactive] = useState("home");
  const { t } = useTranslation();

  const currencySymbol = {
    USD: "$",
    EUR: "€",
  };

  const { categories } = useAppSelector((store) => store.categoriesSlice);

  const sections = [
    { name: "home", path: "/" },
    { name: "shop", path: "/Shop" },
    { name: "vendors", path: "/Vendors" },
    { name: "deals", path: "/Deals" },
  ];
  return (
    <>
      <header>
        <div className="bg-background relative h-[110px]">
          {/* // ? top_bar */}
          <div className="top_bar flex justify-between items-center py-3 mx-5">
            <div className="top_bar_left flex justify-center items-center gap-6">
              <a
                href="#"
                className="flex justify-center items-center gap-1 text-[#666666] hover:text-[#fe4407] transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <p className="mt-1 text-[11px]"> {t("topbar.findStore")}</p>
              </a>
              <a
                href="#"
                className="flex justify-center items-center gap-1 text-[#666666] hover:text-[#fe4407] transition-all duration-300"
              >
                <CircleAlert width={16} height={16} />
                <p className="mt-1 text-[11px]"> {t("topbar.freeShipping")}</p>
              </a>
            </div>
            <div className="top_bar_right flex justify-center items-center gap-5">
              <div className="switchers flex justify-center items-center gap-5 border-e-2 border-[#CCCCCC80] pe-5">
                <div>
                  <HoverCard openDelay={100}>
                    <HoverCardTrigger className="text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer flex justify-center items-center gap-1">
                      {currency}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 26 26"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-3 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </HoverCardTrigger>

                    <HoverCardContent className="w-11 p-2 border-none outline-none ring-0 focus:outline-none focus:ring-0 flex justify-center bg-white">
                      <ul className="space-y-2">
                        <li
                          onClick={() => {
                            setCurrency("EUR");
                          }}
                          className="rounded text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer"
                        >
                          EUR
                        </li>
                        <li
                          onClick={() => {
                            setCurrency("USD");
                          }}
                          className="rounded text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer"
                        >
                          USD
                        </li>
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <div>
                  <HoverCard openDelay={100}>
                    <HoverCardTrigger className="text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer flex justify-center items-center gap-1">
                      <span>
                        <ReactCountryFlag
                          countryCode={language === "ENG" ? "GB" : "EG"}
                          svg
                          style={{
                            width: "14px",
                            height: "14px",
                          }}
                        />
                      </span>
                      {language}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 26 26"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-3 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </HoverCardTrigger>

                    <HoverCardContent className="w-16 p-2 border-none outline-none ring-0 focus:outline-none focus:ring-0 flex justify-center bg-white">
                      <ul className="space-y-2">
                        <li
                          onClick={() => {
                            changeLanguage("en");
                            setLanguage("ENG");
                          }}
                          className=" flex justify-center items-center gap-2 rounded text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer"
                        >
                          <span>
                            <ReactCountryFlag
                              countryCode="GB"
                              svg
                              style={{
                                width: "14px",
                                height: "14px",
                              }}
                            />
                          </span>
                          ENG
                        </li>
                        <li
                          onClick={() => {
                            setLanguage("EGY");
                            changeLanguage("ar");
                          }}
                          className="flexg flex justify-center items-center gap-2 rounded text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer"
                        >
                          <span>
                            <ReactCountryFlag
                              countryCode="EG"
                              svg
                              style={{
                                width: "14px",
                                height: "14px",
                              }}
                            />
                          </span>
                          EGY
                        </li>
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
              <div className="auth flex justify-center items-center gap-1 text-[#666666] text-[11px]">
                <a
                  href="/Login"
                  className="flex justify-center items-center gap-1 hover:text-[#fe4407] transition-all duration-300"
                >
                  <User width={20} height={20} />
                  {t("navbar.login")}
                </a>
                <span>/</span>
                <a
                  href="/SignUp"
                  className="hover:text-[#fe4407] transition-all duration-300"
                >
                  {t("navbar.signup")}
                </a>
              </div>
            </div>
          </div>

          {/* // ^ logo&taps */}
          <div className="logo&taps absolute top-[44px] left-0 right-0 z-50 mx-5">
            <div className="flex justify-center items-center">
              <div className="logo w-[20%] h-[140px] p-4 bg-primary flex justify-center items-center">
                <a href="#">
                  <Image src={logo} alt="logo" className="w-full h-full" />
                </a>
              </div>
              <div className="nav-taps w-[80%] bg-secondary">
                <div className="taps&cart text-white flex justify-between items-center px-10 py-2 border-b-[1px] border-[#EEEEEE12]">
                  <div className="left-side">
                    <ul className="flex items-center gap-12 text-[14px] font-semibold">
                      {sections.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setactive(item.name)}
                          className={`tap-item py-6 transition-all duration-300 ${active === item.name ? "text-primary" : "hover:text-primary"}`}
                        >
                          <Link href={item.path}>
                            {t(`navbar.${item.name}`)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="right-side flex justify-center items-center">
                    <div className="flex justify-center items-center gap-5">
                      <span className="hover:text-primary transition-all duration-300">
                        <a href="" className="h-full">
                          <Scale size={33} strokeWidth={1.5} />
                        </a>
                      </span>
                      <span className="relative hover:text-primary transition-all duration-300">
                        <span
                          className={`absolute -top-1  ${language === "EGY" ? "-left-2" : "-right-2"} w-[18px] h-[18px] bg-accent text-[#272b37] text-[11px] rounded-full flex justify-center items-center`}
                        >
                          0
                        </span>
                        <a href="">
                          <Heart size={27} />
                        </a>
                      </span>
                    </div>
                    <div className="w-[1px] h-10 bg-[#EEEEEE1A] mx-5"></div>
                    <a
                      href="#"
                      className="flex justify-center items-center gap-4 group  duration-300"
                    >
                      <span>
                        <p className="text-border text-[11px] font-medium group-hover:text-primary transition-all">
                          {t("navbar.cart")}
                        </p>
                        <span className="font-bold text-end block group-hover:text-primary transition-all">
                          <span id="Currency">{currencySymbol[currency]}</span>
                          0.00
                        </span>
                      </span>
                      <span className="relative mb-1 group-hover:text-primary transition-all">
                        <span
                          className={`absolute -top-1  ${language === "EGY" ? "-left-1" : "-right-1"} w-[18px] h-[18px] bg-accent text-[#272b37] text-[11px] rounded-full flex justify-center items-center`}
                        >
                          0
                        </span>
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
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="search&offers flex items-center h-[54.2px]">
                  <div className="flex items-center w-[70%] h-full">
                    <div className="flex items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-0 bg-transparent text-xs font-normal px-10 text-[#AAAAAA] w-[240px] flex justify-between"
                          >
                            <p
                              className={`flex-1 ${language === "EGY" ? "text-right" : "text-left"}`}
                            >
                              {t(`categories_menu.${selectedCategory}`)}
                            </p>
                            <ChevronDown />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="text-[#AAAAAA] bg-[#F8F8F8] ring-0 rounded-none relative -bottom-2 w-[240px] py-1 px-0"
                        >
                          <DropdownMenuGroup>
                            {categories?.map((item) => (
                              <DropdownMenuItem
                                key={item._id}
                                onClick={() => setSelectedCategory(item.slug)}
                                className={`text-xs focus:bg-transparent hover:!bg-textMain outline-none  hover:!text-white px-0 w-full ps-10 rounded-none
                                   ${language === "EGY" ? "justify-end pe-10" : "justify-start"}`}
                              >
                                {t(`categories_menu.${item.slug}`)}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="w-[1px] h-5 bg-[#EEEEEE1A]"></div>
                    <div className="search-input flex-grow">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder={t("navbar.search")}
                        className="bg-transparent 
                        text-[#AAAAAA] 
                        placeholder:text-[#AAAAAA] 
                        text-xs font-normal 
                        ps-10 
                        focus-visible:ring-0
                        focus-visible:outline-none
                        focus-visible:border-0"
                      />
                    </div>
                    <button
                      onClick={() => {
                        inputRef.current?.focus();
                      }}
                      className="text-[#AAAAAA] hover:text-primary transition-all duration-300 pe-10"
                    >
                      <Search strokeWidth={1.5} />
                    </button>
                    <div className="w-[1px] h-5 bg-[#EEEEEE1A]"></div>
                  </div>
                  <div className="w-[30%] flex justify-center items-center gap-10 text-white text-[14px] font-semibold">
                    <a
                      href="#"
                      className="flex justify-center items-center gap-2 hover:text-primary transition-all duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                        />
                      </svg>
                      {t("navbar.flashSale")}
                    </a>
                    <a
                      href="#"
                      className="flex justify-center items-center gap-2 hover:text-primary transition-all duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-badge-percent-icon lucide-badge-percent"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                        <path d="m15 9-6 6" />
                        <path d="M9 9h.01" />
                        <path d="M15 15h.01" />
                      </svg>
                      {t("navbar.offers")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
