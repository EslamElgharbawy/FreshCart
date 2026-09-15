import OrderCard from "@/components/OrderCard/OrderCard";
import { UserOrdersResponse } from "@/Types/order";
import EmptyOrders from "../EmptyState/EmptyState";

interface OrdersListProps {
  orders: UserOrdersResponse;
  emptyMessage?: string;
}

export default function OrdersList({
  orders,
  emptyMessage = "No orders yet.",
}: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <EmptyOrders
        title={emptyMessage}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {orders.map((order) => {
        return (
          <div
            key={order.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            {/* Order header */}
            <div className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm lg:gap-x-8 lg:gap-y-1">
                <div>
                  <p className="text-gray-500">Order placed</p>
                  <p className="font-medium text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Order number</p>
                  <p className="font-medium text-gray-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-medium text-gray-900">
                    $
                    {new Intl.NumberFormat("en-US").format(
                      order.totalOrderPrice,
                    )}
                  </p>
                </div>
              </div>

              {order.isPaid ? (
                <span
                  className={
                    "inline-flex w-fit items-center gap-1.5 text-sm font-medium text-green-600"
                  }
                >
                  <span className={"h-2 w-2 rounded-full bg-green-600"} />
                  Paid
                </span>
              ) : (
                <span
                  className={
                    "inline-flex w-fit items-center gap-1.5 text-sm font-medium text-amber-600"
                  }
                >
                  <span className={"h-2 w-2 rounded-full bg-amber-600"} />
                  Cash on Delivery
                </span>
              )}
            </div>

            {/* Shipping banner */}
            {order.shippingAddress && (
              <div className="border-y border-gray-100 bg-gray-50 px-4 py-4 lg:px-6">
                <div className="flex items-start lg:items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.6}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18.75 18.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3.75 6.75h10.5v10.5m-10.5 0H2.25V6.75a1.5 1.5 0 011.5-1.5h6a1.5 1.5 0 011.5 1.5v10.5m4.5 0h1.5a1.5 1.5 0 001.5-1.5v-3.379a1.5 1.5 0 00-.44-1.06l-2.622-2.622a1.5 1.5 0 00-1.06-.44H14.25"
                      />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="break-words text-sm font-medium text-gray-900">
                      {order.shippingAddress?.city}
                    </p>
                    <p className="break-words text-xs text-gray-500">
                      {order.shippingAddress?.details}
                    </p>
                    <p className="break-words text-xs text-gray-500">
                      {order.shippingAddress?.phone}
                    </p>
                    <p className="break-words text-xs text-gray-500">
                      {order.shippingAddress?.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Items */}
            <div>
              {order.cartItems.map((item) => (
                <OrderCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
