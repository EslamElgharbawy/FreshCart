import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function CartSheetItem() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 py-5 border-b">
        {/* Left */}
        <div className="flex gap-4">
          <Image
            src={""}
            alt={""}
            width={70}
            height={70}
            className="rounded-sm border object-cover"
          />

          <div className="flex flex-col">
            <h3 className="max-w-[220px] text-base font-medium leading-6">
              {}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Vendor: <span className="text-foreground">{}</span>
            </p>

            <span className="mt-3 text-lg font-semibold">${}</span>

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
        <Button
          variant="ghost"
          size="icon"
          className="self-center text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="size-5" />
        </Button>
      </div>
    </>
  );
}
