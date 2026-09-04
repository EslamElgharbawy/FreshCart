import { Suspense } from "react";
import CartContent from "./CartContent";

export default function Cart() {
  return (
    <>
      <Suspense>
        <CartContent />
      </Suspense>
    </>
  );
}
