import { Suspense } from "react";
import CartContent from "./CartContent";
import CartStepSync from "@/components/CartStepSync/CartStepSync";

export default function Cart() {
  return (
    <>
      <Suspense>
        <CartStepSync />
        <CartContent />
      </Suspense>
    </>
  );
}
