// components/OrdersList.tsx
import OrderCard, { type ItemAction, type OrderItem } from "@/components/OrderCard/OrderCard";

type OrderStatus = "in_transit" | "processing" | "delivered" | "cancelled";

interface OrderShippingInfo {
  message: string;
  subMessage: string;
  trackingUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  placedDate: string;
  total: number;
  status: OrderStatus;
  shipping?: OrderShippingInfo;
  items: OrderItem[];
  detailsUrl?: string;
  helpUrl?: string;
}

const statusConfig: Record<OrderStatus, { label: string; dotClass: string; textClass: string }> = {
  in_transit: { label: "In Transit", dotClass: "bg-blue-600", textClass: "text-blue-600" },
  processing: { label: "Processing", dotClass: "bg-amber-500", textClass: "text-amber-600" },
  delivered: { label: "Delivered", dotClass: "bg-green-600", textClass: "text-green-600" },
  cancelled: { label: "Cancelled", dotClass: "bg-red-500", textClass: "text-red-600" },
};

interface OrdersListProps {
  orders: Order[];
  onItemAction?: (action: ItemAction, item: OrderItem, order: Order) => void;
  emptyMessage?: string;
}

// ده الكومبوننت المشترك اللي يترندر جوه أي TabsContent بأي ليستة أوردرات
export default function OrdersList({
  orders,
  onItemAction,
  emptyMessage = "مفيش أوردرات هنا.",
}: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 px-6 py-16 text-center">
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {orders.map((order) => {
        const status = statusConfig[order.status];

        return (
          <div key={order.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Order header */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
              <div className="flex flex-wrap gap-x-8 gap-y-1 text-sm">
                <div>
                  <p className="text-gray-500">Order placed</p>
                  <p className="font-medium text-gray-900">{order.placedDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Order number</p>
                  <p className="font-medium text-gray-900">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                </div>
              </div>

              <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${status.textClass}`}>
                <span className={`h-2 w-2 rounded-full ${status.dotClass}`} />
                {status.label}
              </span>
            </div>

            {/* Shipping banner */}
            {order.shipping && (
              <div className="flex items-center justify-between gap-4 border-y border-gray-100 bg-gray-50 px-6 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18.75 18.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3.75 6.75h10.5v10.5m-10.5 0H2.25V6.75a1.5 1.5 0 011.5-1.5h6a1.5 1.5 0 011.5 1.5v10.5m4.5 0h1.5a1.5 1.5 0 001.5-1.5v-3.379a1.5 1.5 0 00-.44-1.06l-2.622-2.622a1.5 1.5 0 00-1.06-.44H14.25"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.shipping.message}</p>
                    <p className="text-xs text-gray-500">{order.shipping.subMessage}</p>
                  </div>
                </div>

                {order.shipping.trackingUrl && (
                  <a
                    href={order.shipping.trackingUrl}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Track
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Items */}
            <div>
              {order.items.map((item) => (
                <OrderCard
                  key={item.id}
                  item={item}
                  onAction={(action, clickedItem) => onItemAction?.(action, clickedItem, order)}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
              {order.detailsUrl ? (
                <a
                  href={order.detailsUrl}
                  className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:underline"
                >
                  View order details
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </a>
              ) : (
                <span />
              )}

              {order.helpUrl && (
                <a href={order.helpUrl} className="text-sm font-medium text-gray-500 hover:text-gray-900">
                  Need Help?
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}