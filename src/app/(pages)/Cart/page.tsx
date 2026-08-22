"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import {
  GetLoggedUserCart,
  RemoveProductFromCart,
  UpdateCartProductQuantity,
} from "@/Features/Cart.slice";
import QuantityCounter from "@/components/QuantityCounter/QuantityCounter";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CartSheetItem from "@/components/CartSheetItem/CartSheetItem";

export default function Cart() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.CartSlice);

  const handleQuantityChange = async (productId: string, count: number) => {
    await dispatch(UpdateCartProductQuantity({ productId, count })).unwrap();
  };

  useEffect(() => {
    dispatch(GetLoggedUserCart());
  }, [dispatch]);
  const [activeStep, setActiveStep] = useState("cart");
  return (
    <>
      <section>
        <div className="pt-3 xl:pt-8">
          <Tabs
            defaultValue="cart"
            value={activeStep}
            onValueChange={setActiveStep}
            className=" flex-col"
          >
            <TabsList className="py-5 mx-auto sm:max-xl:flex-wrap gap-y-2 sm:max-md:max-w-[320px] md:max-lg:max-w-[330px] lg:max-xl:max-w-[350px]">
              <TabsTrigger
                className={`text-lg lg:text-xl font-bold text-[#666] data-[state=active]:bg-transparent ${activeStep === "cart" ? " data-[state=active]:text-primary" : "text-[#333]"} data-[state=active]:after:opacity-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none`}
                value="cart"
              >
                Shopping Cart
              </TabsTrigger>
              <ChevronRight
                size={24}
                className={`${activeStep === "checkout" || activeStep === "complete" ? "text-[#333]" : "text-[#999]"}  font-bold`}
              />

              <TabsTrigger
                className={`text-lg lg:text-xl font-bold text-[#666] data-[state=active]:bg-transparent ${activeStep === "checkout" ? "data-[state=active]:text-primary " : activeStep === "complete" ? "text-[#333]" : "text-[#666]"} data-[state=active]:text-primary data-[state=active]:after:opacity-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none`}
                value="checkout"
              >
                Checkout
              </TabsTrigger>
              <ChevronRight
                size={24}
                className={`${activeStep === "complete" ? "text-[#333]" : "text-[#999]"}  font-bold`}
              />

              <TabsTrigger
                className={`text-lg lg:text-xl font-bold text-[#666] data-[state=active]:bg-transparent ${activeStep === "checkout" ? " data-[state=active]:text-primary " : "text-[#666]"} data-[state=active]:text-primary data-[state=active]:after:opacity-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none`}
                value="complete"
              >
                Order Complete
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cart">
              <div className="pt-8 pb-12">
                <div className="xl:grid grid-cols-12">
                  <div className="col-span-full 2xl:col-span-8 px-5">
                    <Table className="sm:max-xl:hidden">
                      <TableHeader>
                        <TableRow className="grid grid-cols-[14.79%_24.36%_17.29%_25.77%_14.79%_3%]">
                          <TableHead className="font-semibold text-base p-0 text-[#333] ">
                            Product
                          </TableHead>
                          <TableHead className="font-semibold text-base p-0 text-[#333]"></TableHead>
                          <TableHead className="font-semibold text-base p-0 text-[#333]">
                            Price
                          </TableHead>
                          <TableHead className="font-semibold text-base p-0 text-[#333]">
                            Quantity
                          </TableHead>
                          <TableHead className="font-semibold text-base p-0 text-[#333] ">
                            Subtotal
                          </TableHead>
                          <TableHead className="font-semibold text-base p-0 text-[#333]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cart?.products?.map((product) => (
                          <TableRow
                            key={product._id}
                            className="grid grid-cols-[14.79%_24.36%_17.29%_25.77%_14.79%_3%] items-center"
                          >
                            <TableCell className="pr-5 py-5 pl-0 ">
                              <Link
                                href={`/ProductDetails/${product.product._id}`}
                              >
                                <Image
                                  src={product.product.imageCover}
                                  alt={product.product.title}
                                  width={100}
                                  height={100}
                                />
                              </Link>
                            </TableCell>
                            <TableCell className="min-w-0 font-medium pr-8 py-5 pl-0  h-auto">
                              <Link
                                href={`/ProductDetails/${product.product._id}`}
                                className="truncate hover:text-primary transition-all duration-300"
                              >
                                {product.product.title}
                              </Link>
                            </TableCell>
                            <TableCell className="text-base text-[#666] pr-5 py-5 pl-0  h-auto">
                              ${product.price}
                            </TableCell>
                            <TableCell className="pr-5 py-5 pl-0  h-auto">
                              <div className="relative flex 2xl:justify-center items-center text-sm gap-3 w-fit">
                                <QuantityCounter
                                  value={product.count}
                                  onChange={(count) => {
                                    handleQuantityChange(
                                      product.product._id,
                                      count,
                                    );
                                  }}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold text-base pr-5 py-5 pl-0  h-auto text-[#333]">
                              ${product.price * product.count}
                            </TableCell>
                            <TableCell className="p-0 w-fit">
                              <Button
                                variant="ghost"
                                onClick={async () => {
                                  const result = await dispatch(
                                    RemoveProductFromCart(product.product._id),
                                  );
                                  if (
                                    RemoveProductFromCart.fulfilled.match(
                                      result,
                                    )
                                  ) {
                                    toast.success(
                                      t("cart.itemRemovedFromCart"),
                                    );
                                  } else if (
                                    RemoveProductFromCart.rejected.match(result)
                                  ) {
                                    toast.error(
                                      result.payload ??
                                        t("cart.failedToRemoveProduct"),
                                    );
                                  }
                                }}
                                size="icon"
                                className="hover:text-primary transition-all duration-300 "
                              >
                                <Trash2 className="size-5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter></TableFooter>
                    </Table>
                  </div>
                  {cart?.products?.map((product) => (
                    <div
                      key={product._id}
                      className="xl:hidden border-b-[1px] border-[#ecf0f4] last:border-0 mb-5"
                    >
                      <CartSheetItem item={product} />
                    </div>
                  ))}
                  <div className="col-span-full 2xl:col-span-4"></div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="checkout">{/* Checkout */}</TabsContent>

            <TabsContent value="complete">{/* Order Complete */}</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
