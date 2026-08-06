import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { CartProduct } from "@/Types/cart";
interface CartSheetItemProps {
  item: CartProduct;
}
export default function CartSheetItem({ item }: CartSheetItemProps) {
  return (
    <>
      <div className=" px-8">
        <div className="flex justify-between gap-4 border-b-[1px] mb-5 pb-5">
          {/* Left */}
          <div className="flex gap-4">
            <Image
              src={item.product.imageCover}
              alt={item.product.title}
              width={90}
              height={90}
              className="object-cover max-w-[90px]"
            />

            <div className="flex flex-col pl-6">
              <h3 className="max-w-[220px] text-base font-medium leading-6">
                {item.product.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Vendor:{" "}
                <span className="text-foreground">
                  {item.product.brand.name}
                </span>
              </p>

              <span className="mt-3 text-lg font-semibold">
                ${item.price.toFixed(2)}
              </span>

              {/* Quantity */}
              <div className="mt-4 flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-none"
                >
                  -
                </Button>

                <span className="w-5 text-center text-base font-medium">1</span>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-none"
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
              size="icon"
              className="self-center text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
