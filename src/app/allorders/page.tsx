"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// export default function page() {
//   return (
//     <>
//       <section>
//         <div className="pt-3 xl:py-12">
//           <div className="container mx-auto px-4">
//             <div className="mb-8">
//               <h1 className="text-2xl font-semibold text-[#333]">Your Orders</h1>
//               <p className="text-textMain">Track, return, or buy items again</p>
//             </div>
//             <div className=" ">
//               <Tabs defaultValue="overview" className="flex-col gap-8">
//                 <div className="flex justify-between items-center">
//                   <TabsList>
//                     <TabsTrigger className="data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none pb-1" value="overview">Overview</TabsTrigger>
//                     <TabsTrigger className="data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none pb-1" value="analytics">Analytics</TabsTrigger>
//                     <TabsTrigger className="data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none pb-1" value="reports">Reports</TabsTrigger>
//                     <TabsTrigger className="data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none pb-1" value="settings">Settings</TabsTrigger>
//                   </TabsList>
//                   <Field orientation="horizontal" className="w-fit">
//                     <Input type="search" placeholder="Search..." />
//                     <Button>Search</Button>
//                   </Field>
//                 </div>
//                 <TabsContent value="overview">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Overview</CardTitle>
//                       <CardDescription>
//                         View your key metrics and recent project activity. Track
//                         progress across all your active projects.
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="text-sm text-muted-foreground">
//                       You have 12 active projects and 3 pending tasks.
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value="analytics">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Analytics</CardTitle>
//                       <CardDescription>
//                         Track performance and user engagement metrics. Monitor
//                         trends and identify growth opportunities.
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="text-sm text-muted-foreground">
//                       Page views are up 25% compared to last month.
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value="reports">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Reports</CardTitle>
//                       <CardDescription>
//                         Generate and download your detailed reports. Export data
//                         in multiple formats for analysis.
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="text-sm text-muted-foreground">
//                       You have 5 reports ready and available to export.
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value="settings">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Settings</CardTitle>
//                       <CardDescription>
//                         Manage your account preferences and options. Customize
//                         your experience to fit your needs.
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="text-sm text-muted-foreground">
//                       Configure notifications, security, and themes.
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
// app/orders/page.tsx
// app/orders/page.tsx

// app/orders/page.tsx

import type { ItemAction, OrderItem } from "@/components/OrderCard/OrderCard";
import { useMemo, useState } from "react";
import { Order } from "@/Types/order";
import OrdersList from "@/components/OrdersList/OrdersList";

type OrderTabKey = "all" | "in_progress" | "delivered";

function matchesTab(order: Order, tab: OrderTabKey): boolean {
  if (tab === "all") return true;
  if (tab === "in_progress") return order.status === "in_transit" || order.status === "processing";
  if (tab === "delivered") return order.status === "delivered";
  return true;
}

// شيلها واستبدلها بالداتا الحقيقية بتاعتك
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "WEB-9847562",
    placedDate: "Dec 12, 2024",
    total: 127.97,
    status: "in_transit",
    shipping: {
      message: "Arriving Dec 18-20",
      subMessage: "Your package is on its way",
      trackingUrl: "#",
    },
    detailsUrl: "#",
    helpUrl: "#",
    items: [
      {
        id: "1-1",
        name: "Oversized Cotton Hoodie",
        variant: "Black · L",
        price: 49.99,
        imageUrl: "https://placehold.co/160x160/e5e7eb/9ca3af?text=Hoodie",
        actions: ["trackItem"],
      },
      {
        id: "1-2",
        name: "High-Rise Straight Jeans",
        variant: "Medium Blue · 32",
        price: 59.99,
        imageUrl: "https://placehold.co/160x160/e5e7eb/9ca3af?text=Jeans",
        actions: ["trackItem"],
      },
      {
        id: "1-3",
        name: "Basic Crew Neck Tee",
        variant: "White · M",
        price: 17.99,
        imageUrl: "https://placehold.co/160x160/e5e7eb/9ca3af?text=Tee",
        actions: ["trackItem"],
      },
    ],
  },
  {
    id: "2",
    orderNumber: "WEB-9841203",
    placedDate: "Dec 5, 2024",
    total: 89.98,
    status: "delivered",
    detailsUrl: "#",
    helpUrl: "#",
    items: [
      {
        id: "2-1",
        name: "Leather Crossbody Bag",
        variant: "Burgundy · One Size",
        price: 69.99,
        imageUrl: "https://placehold.co/160x160/e5e7eb/9ca3af?text=Bag",
        actions: ["buyAgain", "startReturn", "writeReview"],
        returnEligibleUntil: "Jan 10, 2025",
      },
    ],
  },
];

interface OrdersPageProps {
  orders?: Order[];
}

export default function OrdersPage({ orders = mockOrders }: OrdersPageProps) {
  const [search, setSearch] = useState("");

  // فيلتر البحث بيتطبق قبل التقسيم على التابات
  const searchedOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return orders;

    return orders.filter((order) => {
      const matchesOrderNumber = order.orderNumber.toLowerCase().includes(query);
      const matchesItem = order.items.some((item) => item.name.toLowerCase().includes(query));
      return matchesOrderNumber || matchesItem;
    });
  }, [orders, search]);

  // كل تاب ليه ليستة مفلترة خاصة بيه، مبنية على searchedOrders
  const allOrders = searchedOrders;
  const inProgressOrders = useMemo(
    () => searchedOrders.filter((order) => matchesTab(order, "in_progress")),
    [searchedOrders]
  );
  const deliveredOrders = useMemo(
    () => searchedOrders.filter((order) => matchesTab(order, "delivered")),
    [searchedOrders]
  );

  function handleItemAction(action: ItemAction, item: OrderItem, order: Order) {
    // وصل هنا اللوجيك الحقيقي بتاعك (navigation, API call, modal..)
    console.log(action, item.id, order.id);
  }

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
                value="InProgress"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none pb-1"
                value="Delivered"
              >
                Delivered
              </TabsTrigger>
            </TabsList>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full max-w-xs rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* كل TabsContent بقى ليستة مختلفة فعليًا، مش نفس الحاجة */}
          <TabsContent value="AllOrders">
            <OrdersList orders={allOrders} onItemAction={handleItemAction} />
          </TabsContent>

          <TabsContent value="InProgress">
            <OrdersList
              orders={inProgressOrders}
              onItemAction={handleItemAction}
              emptyMessage="مفيش أوردرات تحت التنفيذ دلوقتي."
            />
          </TabsContent>

          <TabsContent value="Delivered">
            <OrdersList
              orders={deliveredOrders}
              onItemAction={handleItemAction}
              emptyMessage="لسه مفيش أوردرات وصلت."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}