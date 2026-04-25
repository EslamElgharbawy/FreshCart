"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleAlert } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

export default function Navbar() {
  return (
    <>
      <header>
        <div>
          <div className="py-2">
            <div className="top_bar flex justify-between items-center">
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

                  <p className="mt-1 text-[11px]">Find Wolmart Store</p>
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center gap-1 text-[#666666] hover:text-[#fe4407] transition-all duration-300"
                >
                  <CircleAlert width={16} height={16} />
                  <p className="mt-1 text-[11px]">Free Standard Shipping</p>
                </a>
              </div>
              <div className="top_bar_right flex justify-center items-center gap-6 border-e-2 border-[#CCCCCC80]">
                <div className="switchers flex justify-center items-center gap-5">
                  <div>
                    <HoverCard openDelay={100}>
                      <HoverCardTrigger className="text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer flex justify-center items-center gap-1">
                        USD
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

                      <HoverCardContent className="w-11 p-2 border-none outline-none ring-0 focus:outline-none focus:ring-0 flex justify-center">
                        <ul className="space-y-2">
                          <li className="rounded text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer">
                            EUR
                          </li>
                          <li className="rounded text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer">
                            USD
                          </li>
                        </ul>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <div>
                    <HoverCard openDelay={100}>
                      <HoverCardTrigger className="text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer flex justify-center items-center gap-1">
                        ENG
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

                      <HoverCardContent className="w-16 p-2 border-none outline-none ring-0 focus:outline-none focus:ring-0 flex justify-center">
                        <ul className="space-y-2">
                          <li className="flex justify-center items-center gap-2 rounded text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer">
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
                          <li className="flex justify-center items-center gap-2 rounded text-[11px] text-[#666666] hover:text-[#fe4407] transition-all duration-300 cursor-pointer">
                            <span>
                              <ReactCountryFlag
                                countryCode="FR"
                                svg
                                style={{
                                  width: "14px",
                                  height: "14px",
                                }}
                              />
                            </span>
                            FAR
                          </li>
                        </ul>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                <div className="auth">

                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </header>
    </>
  );
}
