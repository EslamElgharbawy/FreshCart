"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import OrdersList from "@/components/OrdersList/OrdersList";
import { getUserOrders } from "@/Features/Order.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { useTranslation } from "react-i18next";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { user } = useAppSelector((store) => store.user);
  const { orders } = useAppSelector((store) => store.orderSlice);
  const searchedOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return orders;

    return orders.filter((order) => {
      const matchesItem = order.cartItems.some((item) =>
        item.product.title.toLowerCase().includes(query),
      );
      return matchesItem;
    });
  }, [orders, search]);

  const allOrders = searchedOrders;
  const paidOrders = useMemo(
    () => searchedOrders.filter((order) => order.isPaid),
    [searchedOrders],
  );
  const cashOrders = useMemo(
    () => searchedOrders.filter((order) => !order.isPaid),
    [searchedOrders],
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserOrders(user.id));
    }
  }, [user?.id, dispatch]);
  return (
    <div className="pt-5 xl:py-12">
      <div className="container mx-auto px-3 md:px-4">
        {/* Header */}
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl font-semibold text-[#333] lg:text-3xl">
            {t("orders.title")}
          </h1>
          <p className="mt-1 text-sm text-[#666] lg:text-base">
            {t("orders.description")}
          </p>
        </header>

        <Tabs
          defaultValue="AllOrders"
          className="flex-col gap-8"
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <div className="flex flex-col items-start gap-4 xl:flex-row xl:items-center xl:justify-between">
            <TabsList className="w-full overflow-x-auto xl:w-auto">
              <TabsTrigger
                className="pb-1 data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none"
                value="AllOrders"
              >
                {t("orders.all")}
              </TabsTrigger>

              <TabsTrigger
                className="pb-1 data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none"
                value="Paid"
              >
                 {t("orders.paid")}
              </TabsTrigger>

              <TabsTrigger
                className="pb-1 data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none"
                value="Cash"
              >
                {t("orders.cashOnDelivery")}
              </TabsTrigger>
            </TabsList>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("orders.search")}
              className="max-xl:w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#333] placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <TabsContent value="AllOrders">
            <OrdersList orders={allOrders} emptyMessage={t("orders.empty")}/>
          </TabsContent>

          <TabsContent value="Paid">
            <OrdersList
              orders={paidOrders}
              emptyMessage={t("orders.emptyPaid")}
            />
          </TabsContent>

          <TabsContent value="Cash">
            <OrdersList
              orders={cashOrders}
              emptyMessage={t("orders.emptyCash")}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
