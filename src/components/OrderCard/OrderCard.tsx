import { OrderCartItem } from "@/Types/order";
import { useTranslation } from "react-i18next";

interface OrderCardProps {
  item: OrderCartItem;
}

export default function OrderCard({ item }: OrderCardProps) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-4 lg:gap-6 border-b border-gray-100 px-4 lg:px-6 py-5 last:border-b-0">
      <img
        src={item.product.imageCover}
        alt={item.product.title}
        className="w-20 lg:w-24 flex-shrink-0 rounded-lg bg-gray-100 object-cover"
      />

      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="min-w-0 max-w-[500px]">
          <h3 className="truncate  text-sm font-semibold text-[#333]">
            {item.product.title}
          </h3>
          <p className="mt-0.5 text-sm text-gray-500">
            {t("orders.quantity")} {item.count}
          </p>
        </div>
      </div>

      <div className="flex-shrink-0 text-sm font-semibold text-[#333]">
        ${new Intl.NumberFormat("en-US").format(item.price)}
      </div>
    </div>
  );
}
