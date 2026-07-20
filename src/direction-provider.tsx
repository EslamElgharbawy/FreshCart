"use client";

import { useEffect } from "react";
import i18n from "i18next";

export default function DirectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const setDirection = (lng: string) => {
      const lang = lng?.split("-")[0];
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    };

    setDirection(i18n.language);

    i18n.on("languageChanged", setDirection);

    return () => {
      i18n.off("languageChanged", setDirection);
    };
  }, []);

  return <>{children}</>;
}