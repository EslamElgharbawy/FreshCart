"use client";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "../ui/skeleton";
import { CartData } from "@/Types/cart";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Accordion, AccordionItem } from "../ui/accordion";
import { motion, AnimatePresence } from "framer-motion";

interface CartTotalsProps {
  cart: CartData | null;
  isBusy: boolean;
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
}

const paymentMethods = [
  {
    id: "Cash",
    label: "Cash on delivery",
    description: "Pay with cash upon delivery.",
  },
  {
    id: "stripe",
    label: "Online Payment (Stripe)",
    description: "Pay securely via Stripe using your credit or debit card.",
  },
];

export default function OrderReviewCard({
  cart,
  isBusy,
  paymentMethod,
  onPaymentMethodChange,
}: CartTotalsProps) {
  const { t } = useTranslation();
  return (
    <div className="w-full rounded-lg border border-[#eee] bg-white max-xl:p-5 p-8">
      <h2 className="text-xl font-bold uppercase tracking-[-0.2px] text-[#333] mb-3">
        Your order
      </h2>
      {isBusy ? (
        <>
          <div className="flex items-center justify-between border-b border-[#eee] py-5">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="flex items-center justify-between border-b border-[#eee] py-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </>
      ) : (
        cart?.products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between border-b border-[#eee] py-5"
          >
            <p className="text-sm text-[#666]">
              {product.product.title} × {product.count}
            </p>

            <p className="text-sm text-[#666] ps-5">
              ${new Intl.NumberFormat("en-US").format(product.price)}
            </p>
          </div>
        ))
      )}

      <div className="flex items-center justify-between py-5">
        <span className="text-base font-semibold tracking-[-0.4px] text-[#333]">
          {t("cart.total")}
        </span>

        <span className="text-base font-semibold text-[#333]">
          {isBusy ? (
            <Skeleton className="h-5 w-24" />
          ) : (
            `$${new Intl.NumberFormat("en-US").format(
              cart?.totalCartPrice ?? 0,
            )}`
          )}
        </span>
      </div>

      <h4 className="text-base font-semibold text-[#333] mb-6 pt-6 border-t border-[#eee]">
        Payment Methods
      </h4>

      <RadioGroup
        value={paymentMethod}
        onValueChange={onPaymentMethodChange}
        className="space-y-2"
      >
        {paymentMethods.map((method) => (
          <Accordion
            key={method.id}
            type="single"
            collapsible
            value={paymentMethod === method.id ? method.id : ""}
            className="w-full"
          >
            <AccordionItem value={method.id} className="border-none">
              <div className="flex items-center gap-3">
                <RadioGroupItem value={method.id} id={method.id} />
                <button
                  type="button"
                  onClick={() => onPaymentMethodChange(method.id)}
                  className="text-sm font-medium text-[#333]"
                >
                  {method.label}
                </button>
              </div>

              <AnimatePresence initial={false}>
                {paymentMethod === method.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: {
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                      },
                      opacity: {
                        duration: 0.2,
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pl-8 pt-2 text-xs xl:text-sm leading-relaxed text-[#666]">
                      {method.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionItem>
          </Accordion>
        ))}
      </RadioGroup>

      <Button
        type="submit"
        className="mt-5 h-11 lg:h-12  w-full rounded-md bg-[#333] text-xs lg:text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#444]"
      >
        {paymentMethod === "Cash" ? "place order" : "Proceed to stripe"}
      </Button>
    </div>
  );
}
