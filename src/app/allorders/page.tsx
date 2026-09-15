"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import OrdersList from "@/components/OrdersList/OrdersList";
import { getUserOrders } from "@/Features/Order.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
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
    <div className="pt-3 xl:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-[#333]">Your Orders</h1>
          <p className="mt-1 text-[#666]">Track, return, or buy items again</p>
        </header>

        <Tabs defaultValue="AllOrders" className="flex-col gap-8">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger
                className="data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none pb-1"
                value="AllOrders"
              >
                All Orders
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none pb-1"
                value="Paid"
              >
                Paid
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none pb-1"
                value="Cash"
              >
                Cash on Delivery
              </TabsTrigger>
            </TabsList>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#333] placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <TabsContent value="AllOrders">
            <OrdersList orders={allOrders} />
          </TabsContent>

          <TabsContent value="Paid">
            <OrdersList
              orders={paidOrders}
              emptyMessage="No paid orders yet."
            />
          </TabsContent>

          <TabsContent value="Cash">
            <OrdersList
              orders={cashOrders}
              emptyMessage="No cash on delivery orders yet."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
