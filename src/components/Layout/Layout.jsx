"use client";
import "../../i18n";
import Navbar from "../Navbar/Navbar";
import Footer1 from "../Footer1/Footer1";
import Footer2 from "../Footer2/Footer2";
import { usePathname } from "next/navigation";
import AuthDialog from "../Auth/AuthDialog";

export default function Layout({ children }) {
  const pathname = usePathname()
    const isHome = pathname === "/";
  return (
    <>
      <div className="min-h-screen flex-col flex">
        <Navbar />
        <AuthDialog />
        <main className={`flex-1 ${isHome ? "" : "mt-[152px] lg:mt-[169px] xl:mt-[240px] 2xl:mt-[185px]"}`}>{children}</main>
        <Footer1 />
        <Footer2 />
      </div> 
    </>
  );
}
