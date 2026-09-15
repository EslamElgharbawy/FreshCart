import { OrderCartItem } from "@/Types/order";

interface OrderCardProps {
  item: OrderCartItem;
}

export default function OrderCard({ item }: OrderCardProps) {
  return (
    <div className="flex gap-6 border-b border-gray-100 px-6 py-5 last:border-b-0">
      <img
        src={item.product.imageCover}
        alt={item.product.title}
        className="w-24 flex-shrink-0 rounded-lg bg-gray-100 object-cover"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div className="max-w-[500px]">
          <h3 className="text-sm font-semibold text-[#333]">
            {item.product.title}
          </h3>
          <p className="mt-0.5 text-sm text-gray-500">
            {" "}
            Quantity: {item.count}
          </p>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {/* {item.actions.map((action) => {
            const config = actionConfig[action];
            return (
              <button
                key={action}
                type="button"
                onClick={() => onAction?.(action, item)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${variantClass[config.variant]}`}
              >
                {config.label}
              </button>
            );
          })} */}
        </div>

        {/* {item.returnEligibleUntil && (
          <p className="mt-2 text-xs text-gray-400">
            Eligible for return until {item.returnEligibleUntil}
          </p>
        )} */}
      </div>

      <div className="flex-shrink-0 text-sm font-semibold text-[#333]">
        ${new Intl.NumberFormat("en-US").format(item.price)}
      </div>
    </div>
  );
}
