"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Trash2 } from "lucide-react";
import { useEffect } from "react";
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
  ClearUserCart,
  GetLoggedUserCart,
  RemoveProductFromCart,
  setActiveStep,
  UpdateCartProductQuantity,
} from "@/Features/Cart.slice";
import QuantityCounter from "@/components/QuantityCounter/QuantityCounter";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CartSheetItem from "@/components/CartSheetItem/CartSheetItem";
import CartItemSkeleton from "@/components/Skeletons/CartItemSkeleton";
import CartSheetItemSkeleton from "@/components/Skeletons/CartSheetItemSkeleton";
import CartTotals from "@/components/CartTotals/CartTotals";
import i18n from "@/i18n";
import { Field, FieldGroup } from "@/components/ui/field";
import { useFormik } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import OrderReviewCard from "@/components/OrderReviewCard/OrderReviewCard";
import { useRouter } from "next/navigation";

export default function CartContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart, loading, activeStep, stepInitialized } = useAppSelector(
    (store) => store.CartSlice,
  );
  const { token, authChecked } = useAppSelector((store) => store.user);
  const dir = i18n.dir();

  const handleQuantityChange = async (productId: string, count: number) => {
    await dispatch(UpdateCartProductQuantity({ productId, count })).unwrap();
  };

  useEffect(() => {
    if (authChecked && token) {
      dispatch(GetLoggedUserCart());
    }
  }, [dispatch, token, authChecked]);

  const isBusy = !authChecked || loading;
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeStep]);

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  if (!stepInitialized) {
    return null;
  }
  return (
    <>
      <section>
        <div className="pt-3 xl:pt-8">
          <Tabs
            dir={dir}
            value={activeStep}
            onValueChange={(newStep) => {
              dispatch(setActiveStep(newStep));
              router.push(
                newStep === "cart" ? "/Cart" : `/Cart?step=${newStep}`,
              );
            }}
            className="flex-col gap-8"
          >
            <TabsList className="py-5 mx-auto max-xl:flex-wrap gap-y-2 sm:max-md:max-w-[320px] md:max-lg:max-w-[330px] lg:max-xl:max-w-[350px]">
              <TabsTrigger
                className={`text-lg lg:text-xl font-bold text-[#666] data-[state=active]:bg-transparent ${activeStep === "cart" ? " data-[state=active]:text-primary" : "text-[#333]"} data-[state=active]:after:opacity-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none`}
                value="cart"
              >
                {t("cart.shoppingCart")}
              </TabsTrigger>
              <ChevronRight
                size={24}
                className={`${activeStep === "checkout" || activeStep === "complete" ? "text-[#333]" : "text-[#999]"}  font-bold rtl:rotate-180`}
              />

              <TabsTrigger
                className={`text-lg lg:text-xl font-bold text-[#666] data-[state=active]:bg-transparent ${activeStep === "checkout" ? "data-[state=active]:text-primary " : activeStep === "complete" ? "text-[#333]" : "text-[#666]"} data-[state=active]:text-primary data-[state=active]:after:opacity-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none`}
                value="checkout"
              >
                {t("cart.checkout")}
              </TabsTrigger>
              <ChevronRight
                size={24}
                className={`${activeStep === "complete" ? "text-[#333]" : "text-[#999]"}  font-bold rtl:rotate-180`}
              />

              <TabsTrigger
                className={`text-lg lg:text-xl font-bold text-[#666] data-[state=active]:bg-transparent ${activeStep === "checkout" ? " data-[state=active]:text-primary " : "text-[#666]"} data-[state=active]:text-primary data-[state=active]:after:opacity-0 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none`}
                value="complete"
              >
                {t("cart.orderComplete")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cart">
              {isBusy || (cart?.products?.length ?? 0) > 0 ? (
                <div className="pt-3 xl:pt-8 pb-12">
                  <div className="xl:grid grid-cols-12">
                    <div className="col-span-full 2xl:col-span-8 px-5">
                      <Table className="max-xl:hidden xl:max-2xl:mb-10">
                        <TableHeader>
                          <TableRow className="grid grid-cols-[39.15%_17.29%_25.77%_14.79%_3%]">
                            <TableHead className="font-semibold text-base p-0 text-[#333] ">
                              {t("cart.product")}
                            </TableHead>
                            <TableHead className="font-semibold text-base p-0 text-[#333]">
                              {t("cart.price")}
                            </TableHead>
                            <TableHead className="font-semibold text-base p-0 text-[#333]">
                              {t("cart.quantity")}
                            </TableHead>
                            <TableHead className="font-semibold text-base p-0 text-[#333] ">
                              {t("cart.subtotal")}
                            </TableHead>
                            <TableHead className="font-semibold text-base p-0 text-[#333]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {isBusy ? (
                            <CartItemSkeleton />
                          ) : (
                            cart?.products?.map((product) => (
                              <TableRow
                                key={product._id}
                                className="grid grid-cols-[39.15%_17.29%_25.77%_14.79%_3%] items-center"
                              >
                                <TableCell className="pr-8 py-5 pl-0 min-w-0">
                                  <div className="flex items-center gap-5 min-w-0">
                                    <Link
                                      href={`/ProductDetails/${product.product._id}`}
                                      className="shrink-0"
                                    >
                                      <Image
                                        src={product.product.imageCover}
                                        alt={product.product.title}
                                        width={125}
                                        height={125}
                                      />
                                    </Link>

                                    <Link
                                      href={`/ProductDetails/${product.product._id}`}
                                      className="font-medium flex-1 truncate hover:text-primary transition-all duration-300"
                                    >
                                      {product.product.title}
                                    </Link>
                                  </div>
                                </TableCell>

                                <TableCell className="text-base text-[#666] pr-5 py-5 pl-0 ">
                                  ${product.price}
                                </TableCell>
                                <TableCell className="pr-5 py-5 pl-0 ">
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
                                <TableCell className="font-semibold text-base pr-5 py-5 pl-0  text-[#333]">
                                  ${product.price * product.count}
                                </TableCell>
                                <TableCell className="p-0 w-fit">
                                  <Button
                                    variant="ghost"
                                    onClick={async () => {
                                      const result = await dispatch(
                                        RemoveProductFromCart(
                                          product.product._id,
                                        ),
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
                                        RemoveProductFromCart.rejected.match(
                                          result,
                                        )
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
                            ))
                          )}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={5} className="p-0">
                              <div className="flex justify-between items-center my-5">
                                <div>
                                  <Button className="uppercase !px-7 !py-3 h-auto rounded-md bg-[#333] hover:bg-[#454545] transition-all duration-300 text-white font-semibold">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className={`size-5 ${dir === "rtl" ? "rotate-180" : ""}`}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                      />
                                    </svg>
                                    {t("cart.continueShopping")}
                                  </Button>
                                </div>
                                <div>
                                  <Button
                                    onClick={async () => {
                                      try {
                                        await dispatch(
                                          ClearUserCart(),
                                        ).unwrap();
                                        toast.success(t("cart.cartCleared"));
                                      } catch {
                                        toast.error(t("cart.cartCleared"));
                                      }
                                    }}
                                    className="uppercase font-semibold mr-2 bg-transparent rounded-md text-[#333] !px-7 !py-3 h-auto border-[1px] border-[#ccc] hover:bg-[#e1e1e1] hover:border-[#e1e1e1] transition-all duration-300"
                                  >
                                    {t("cart.clearCart")}
                                  </Button>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </div>

                    <div className="col-span-full 2xl:col-span-4 px-5">
                      <div className="max-xl:hidden">
                        <CartTotals cart={cart} isBusy={isBusy} />
                      </div>
                    </div>
                  </div>

                  {/* // &mobile */}
                  <div className="xl:hidden px-4">
                    <div className="mb-10">
                      {isBusy ? (
                        <CartSheetItemSkeleton />
                      ) : (
                        cart?.products?.map((product) => (
                          <div
                            key={product._id}
                            className="border-b-[1px] border-[#ecf0f4] last:border-0 mb-5"
                          >
                            <CartSheetItem item={product} />
                          </div>
                        ))
                      )}
                      <div className="flex flex-col items-center my-5 gap-3">
                        <Button className="uppercase w-full !px-7 !py-3 h-auto rounded-md bg-[#333] hover:bg-[#454545] transition-all duration-300 text-white font-semibold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                            />
                          </svg>
                          {t("cart.continueShopping")}
                        </Button>
                        <Button
                          onClick={async () => {
                            try {
                              await dispatch(ClearUserCart()).unwrap();
                              toast.success("Cart cleared");
                            } catch {
                              toast.error("Failed to clear cart");
                            }
                          }}
                          className="uppercase font-semibold mr-2 bg-transparent rounded-md text-[#333] !px-7 !py-3 h-auto border-[1px] border-[#ccc] hover:bg-[#e1e1e1] hover:border-[#e1e1e1] transition-all duration-300"
                        >
                          {t("cart.clearCart")}
                        </Button>
                      </div>
                    </div>

                    <CartTotals cart={cart} isBusy={isBusy} />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center gap-2 mb-5 px-5 py-4 font-semibold text-[#777]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-alert-icon lucide-circle-alert"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    Your cart is currently empty.
                  </div>

                  <div className="mb-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#aaa"
                      className="size-20 block mx-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </div>

                  <Button className="uppercase !px-7 !py-3 h-auto rounded-md bg-[#333] hover:bg-[#454545] transition-all duration-300 text-white font-semibold block mx-auto">
                    Return to shop{" "}
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="checkout">
              <div className="pt-3 xl:pt-8 pb-12">
                <div className="xl:grid grid-cols-12">
                  <div className="col-span-full 2xl:col-span-7 px-5">
                    <form onSubmit={formik.handleSubmit}>
                      <FieldGroup className="gap-7">
                        <Field>
                          <Label
                            className="font-normal text-textMain !w-fit"
                            htmlFor="details"
                          >
                            Street address
                          </Label>
                          <Input
                            type="text"
                            id="details"
                            className="rounded-none py-2 px-5 h-auto text-sm"
                            name="details"
                            value={formik.values.details}
                            onChange={formik.handleChange}
                          />
                          {/* {formik.touched.details && formik.errors.details && (
                            <p className="text-sm text-red-500">
                              {formik.errors.details}
                            </p>
                          )} */}
                        </Field>
                        <Field className="!gap-2">
                          <Label
                            className="font-normal text-textMain !w-fit"
                            htmlFor="phone"
                          >
                            {t("registerForm.phone")}
                          </Label>
                          <Input
                            type="tel"
                            id="phone"
                            className="rounded-none py-2 px-5 h-auto text-sm"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                          />
                          {/* {formik.touched.password &&
                            formik.errors.password && (
                              <p className="text-sm text-red-500">
                                {formik.errors.password}
                              </p>
                            )} */}
                        </Field>
                        <Field className="!gap-2">
                          <Label
                            className="font-normal text-textMain !w-fit"
                            htmlFor="city"
                          >
                            Town / City
                          </Label>
                          <Input
                            type="text"
                            id="city"
                            className="rounded-none py-2 px-5 h-auto text-sm"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                          />
                          {/* {formik.touched.password &&
                            formik.errors.password && (
                              <p className="text-sm text-red-500">
                                {formik.errors.password}
                              </p>
                            )} */}
                        </Field>
                        <Field className="!gap-2">
                          <Label
                            className="font-normal text-textMain !w-fit"
                            htmlFor="postalCode"
                          >
                            Postcode
                          </Label>
                          <Input
                            type="number"
                            id="postalCode"
                            className="rounded-none py-2 px-5 h-auto text-sm"
                            name="postalCode"
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}
                          />
                          {/* {formik.touched.password &&
                            formik.errors.password && (
                              <p className="text-sm text-red-500">
                                {formik.errors.password}
                              </p>
                            )} */}
                        </Field>
                      </FieldGroup>
                    </form>
                  </div>
                  <div className="col-span-full 2xl:col-span-5 px-5 max-2xl:mt-10">
                    <OrderReviewCard cart={cart} isBusy={isBusy} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="complete">{/* Order Complete */}</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
