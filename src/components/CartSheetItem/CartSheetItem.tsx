import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { CartProduct } from "@/Types/cart";
import Link from "next/link";
import {
  RemoveProductFromCart,
  UpdateCartProductQuantity,
} from "@/Features/Cart.slice";
import { useAppDispatch } from "@/hooks/store.hooks";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
interface CartSheetItemProps {
  item: CartProduct;
  onNavigate?: () => void;
}
export default function CartSheetItem({
  item,
  onNavigate,
}: CartSheetItemProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <>
      <div className="px-5 xl:px-8">
        <div className="flex justify-between gap-4 pb-5">
          {/* Left */}
          <div className="flex xl:gap-4">
            <Link
              onClick={onNavigate}
              href={`/ProductDetails/${item.product._id}`}
            >
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                width={90}
                height={90}
                className="object-cover max-w-[90px]"
              />
            </Link>

            <div className={`flex flex-col ${i18n.language === "ar" ? " pr-6" : " pl-6"} mt-2`}>
              <Link
                onClick={onNavigate}
                href={`/ProductDetails/${item.product._id}`}
                className="max-w-[220px] text-sm font-medium hover:text-primary transition-all duration-300"
              >
                {item.product.title}
              </Link>

              <p className="mt-2 text-xs text-muted-foreground text-[#7c818b]">
                {t("cart.vendor")}:{" "}
                <span className="text-[#1d2128]">
                  {item.product.brand.name}
                </span>
              </p>

              <span className="mt-3 text-sm font-semibold">
                ${new Intl.NumberFormat("en-US").format(item.price)}
              </span>

              {/* Quantity */}
              <div className="mt-4 flex items-center gap-4">
                <Button
                  variant="outline"
                  disabled={item.count === 1}
                  onClick={() => {
                    if (item.count === 1) return;
                    dispatch(
                      UpdateCartProductQuantity({
                        productId: item.product._id,
                        count: item.count - 1,
                      }),
                    );
                  }}
                  size="icon"
                  className="h-6 w-6 rounded-none text-lg bg-transparent text-[#7c818b] border-2 border-[#dadfe3] 2xl:hover:border-[#1d2128] 2xl:hover:text-[#1d2128] transition-all duration-300"
                >
                  -
                </Button>

                <span className="w-5 text-center text-base font-medium">
                  {item.count}
                </span>

                <Button
                  onClick={() => {
                    dispatch(
                      UpdateCartProductQuantity({
                        productId: item.product._id,
                        count: item.count + 1,
                      }),
                    );
                  }}
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 rounded-none text-lg bg-transparent text-[#7c818b] border-2 border-[#dadfe3] 2xl:hover:border-[#1d2128] 2xl:hover:text-[#1d2128] transition-all duration-300"
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* Delete */}
          <div className="flex flex-col justify-end ">
            <Button
              variant="ghost"
              onClick={async () => {
                const result = await dispatch(
                  RemoveProductFromCart(item.product._id),
                );
                if (RemoveProductFromCart.fulfilled.match(result)) {
                  toast.success(t("cart.itemRemovedFromCart"));
                } else if (RemoveProductFromCart.rejected.match(result)) {
                  toast.error(
                    result.payload ?? t("cart.failedToRemoveProduct"),
                  );
                }
              }}
              size="icon"
              className="self-center text-[#7c818b] hover:text-destructive"
            >
              <Trash2 className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
