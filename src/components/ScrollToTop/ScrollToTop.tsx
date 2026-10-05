"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setIsVisible(scrollTop > 200);

      if (documentHeight > 0) {
        setScrollProgress((scrollTop / documentHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full
        bg-[#333] text-white flex items-center justify-center
        transition-all duration-300
        ${
          isVisible
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-4"
        }`}
    >
      {/* Progress Ring */}
      <svg
        className="absolute -inset-[4px] w-[48px] h-[48px] -rotate-90"
        viewBox="0 0 72 72"
      >
        
        <circle
          cx="36"
          cy="36"
          r="34"
          fill="transparent"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 34}
          strokeDashoffset={
            2 * Math.PI * 34 -
            (scrollProgress / 100) * (2 * Math.PI * 34)
          }
          className="transition-all duration-100"
        />
      </svg>

      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  );
}