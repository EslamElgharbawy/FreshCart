"use client";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { label: "Shopping Cart", href: "/Cart" },
  { label: "Checkout", href: "/checkout" },
  { label: "Order Complete", href: "/order-complete" },
];

export default function cart() {
  const pathname = usePathname();

  const currentIndex = steps.findIndex((step) => step.href === pathname);
  return (
    <>
      <section>
        <div className="pt-8 flex justify-center">
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  className="text-xl font-bold text-foreground"
                >
                  Shopping Cart
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  className="text-xl font-bold text-[#fe4407]"
                >
                  Checkout
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl font-bold text-muted-foreground">
                  Order Complete
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
          <Tabs defaultValue="cart">
            <TabsList>
              <TabsTrigger className="text-xl font-bold" value="cart">
                Shopping Cart
              </TabsTrigger>
              <TabsTrigger className="text-xl font-bold" value="checkout">
                Checkout
              </TabsTrigger>
              <TabsTrigger className="text-xl font-bold" value="complete">
                Order Complete
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cart">{/* Cart */}</TabsContent>

            <TabsContent value="checkout">{/* Checkout */}</TabsContent>

            <TabsContent value="complete">{/* Order Complete */}</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
