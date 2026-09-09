import { Suspense } from "react";
import CartContent from "./CartContent";
import CartStepSync from "@/components/CartStepSync/CartStepSync";

export default function cart() {
  return (
    <>
      <Suspense>
        <CartStepSync />
        <CartContent />
      </Suspense>
    </>
  );
}
