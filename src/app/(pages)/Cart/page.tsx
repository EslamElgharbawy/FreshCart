"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
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
  UpdateCartProductQuantity,
} from "@/Features/Cart.slice";
import QuantityCounter from "@/components/QuantityCounter/QuantityCounter";


export default function Cart() {
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
        <div className="pt-8">
          <Tabs
            defaultValue="cart"
            value={activeStep}
            onValueChange={setActiveStep}
            className=" flex-col"
          >
            <TabsList className="py-5 mx-auto">
              <TabsTrigger
                className={`text-xl font-bold text-[#666] data-[state=active]:bg-transparent ${activeStep === "cart" ? " data-[state=active]:text-primary" : "text-[#333]"} data-[state=active]:after:opacity-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none`}
                value="cart"
              >
                Shopping Cart
              </TabsTrigger>
              <ChevronRight
                size={24}
                className={`${activeStep === "checkout" || activeStep === "complete" ? "text-[#333]" : "text-[#999]"}  font-bold`}
              />

              <TabsTrigger
                className={`text-xl font-bold text-[#666] data-[state=active]:bg-transparent ${activeStep === "checkout" ? "data-[state=active]:text-primary " : activeStep === "complete" ? "text-[#333]" : "text-[#666]"} data-[state=active]:text-primary data-[state=active]:after:opacity-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none`}
                value="checkout"
              >
                Checkout
              </TabsTrigger>
              <ChevronRight
                size={24}
                className={`${activeStep === "complete" ? "text-[#333]" : "text-[#999]"}  font-bold`}
              />

              <TabsTrigger
                className={`text-xl font-bold text-[#666] data-[state=active]:bg-transparent ${activeStep === "checkout" ? " data-[state=active]:text-primary " : "text-[#666]"} data-[state=active]:text-primary data-[state=active]:after:opacity-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none`}
                value="complete"
              >
                Order Complete
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cart">
              <div className="pt-8 pb-12">
                <div className="grid grid-cols-12">
                  <div className="col-span-8 px-5">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold text-base w-[14.79%]">
                            Product
                          </TableHead>
                          <TableHead className="font-semibold text-base w-[17.29%]">
                            Price
                          </TableHead>
                          <TableHead className="font-semibold text-base w-[17.29%]">
                            Quantity
                          </TableHead>
                          <TableHead className="font-semibold text-base w-[14.79%]">
                            Subtotal
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cart?.products?.map((product) => (
                          <TableRow key={product._id}>
                            <TableCell className="font-medium">
                              <div>
                                {product.product.title}
                              </div>
                            </TableCell>
                            <TableCell>${product.price}</TableCell>
                            <TableCell>
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
                            <TableCell className="font-semibold text-base">
                              ${product.price * product.count}
                            </TableCell>
                          </TableRow>
                        ))}
                       
                      </TableBody>
                      <TableFooter></TableFooter>
                    </Table>
                  </div>
                  <div className="col-span-4"></div>
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
