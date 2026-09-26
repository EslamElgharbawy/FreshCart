"use client";
import Image from "next/image";
import shopImg from "../../../assets/images/shop-banner.jpg";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function page() {
  return (
    <>
      <section className="pt-[151px] lg:pt-[169px] xl:pt-[239px] 2xl:pt-[110px]">
        <div className="relative h-[416px]">
          <Image
            src={shopImg}
            alt="shopImg"
            fill
            className="w-full h-full object-cover object-[36%_center]"
          />
          <div className="absolute inset-0 px-5 z-10">
            <div className="absolute mt-7 z-10 left-[8.8%] top-[50%] -translate-y-1/2 uppercase">
              <h3
                className="text-[66px] leading-[66px] font-bold mb-2 text-transparent"
                style={{ WebkitTextStroke: "1px white" }}
              >
                Fashion
              </h3>
              <h4 className="text-white text-[76px] leading-[76px] font-extrabold mb-8 tracking-[-0.75px]">
                Skiwears
              </h4>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 2xl:mx-10">
        <BreadCrumb category="" />
      </section>

      <section className="grid grid-cols-12">
        <div className="col-span-3">
          <Accordion type="multiple" defaultValue={["shipping"]} className="max-w-lg">
            <AccordionItem value="shipping">
              <AccordionTrigger>
                What are your shipping options?
              </AccordionTrigger>
              <AccordionContent>
                We offer standard (5-7 days), express (2-3 days), and overnight
                shipping. Free shipping on international orders.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                Returns accepted within 30 days. Items must be unused and in
                original packaging. Refunds processed within 5-7 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger>
                How can I contact customer support?
              </AccordionTrigger>
              <AccordionContent>
                Reach us via email, live chat, or phone. We respond within 24
                hours during business days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="col-span-9"></div>
      </section>
    </>
  );
}
