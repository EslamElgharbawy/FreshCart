// components/OrderCard.tsx

export type ItemAction = "trackItem" | "buyAgain" | "startReturn" | "writeReview";

export interface OrderItem {
  id: string;
  name: string;
  imageUrl: string;
  variant: string; // "Black · L"
  price: number;
  actions: ItemAction[];
  returnEligibleUntil?: string;
}

const actionConfig: Record<ItemAction, { label: string; variant: "default" | "outline" | "ghost" }> = {
  trackItem: { label: "Track Item", variant: "default" },
  buyAgain: { label: "Buy Again", variant: "outline" },
  startReturn: { label: "Start Return", variant: "outline" },
  writeReview: { label: "Write Review", variant: "ghost" },
};

const variantClass: Record<"default" | "outline" | "ghost", string> = {
  default: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  outline: "border border-gray-200 text-gray-900 hover:bg-gray-50",
  ghost: "text-gray-700 hover:bg-gray-50",
};

interface OrderCardProps {
  item: OrderItem;
  onAction?: (action: ItemAction, item: OrderItem) => void;
}

// الكارد ده بس بيعرض المنتج الواحد: صورة + اسم + variant + أزرار + سعر
export default function OrderCard({ item, onAction }: OrderCardProps) {
  return (
    <div className="flex gap-4 border-b border-gray-100 px-6 py-5 last:border-b-0">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-20 w-20 flex-shrink-0 rounded-lg bg-gray-100 object-cover"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
          <p className="mt-0.5 text-sm text-gray-500">{item.variant}</p>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {item.actions.map((action) => {
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
          })}
        </div>

        {item.returnEligibleUntil && (
          <p className="mt-2 text-xs text-gray-400">
            Eligible for return until {item.returnEligibleUntil}
          </p>
        )}
      </div>

      <div className="flex-shrink-0 text-sm font-semibold text-gray-900">
        ${item.price.toFixed(2)}
      </div>
    </div>
  );
}