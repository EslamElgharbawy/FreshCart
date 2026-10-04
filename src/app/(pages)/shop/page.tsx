import ShopContent from "@/components/ShopContent/ShopContent";
import { Suspense } from "react";

export default function page() {
  return (
    <>
    <Suspense >
      <ShopContent />
    </Suspense>
      
    </>
  );
}
