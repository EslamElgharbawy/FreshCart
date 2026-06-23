"use client";
import "../../i18n";
import Navbar from "../Navbar/Navbar";
import Footer1 from "../Footer1/Footer1";
import Footer2 from "../Footer2/Footer2";

export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen flex-col flex bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer1 />
        <Footer2 />
      </div>
    </>
  );
}
