"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { setActiveStep, setStepInitialized } from "@/Features/Cart.slice";
import { useAppDispatch } from "@/hooks/store.hooks";

export default function CartStepSync() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const step = searchParams.get("step");

    if (step === "checkout" || step === "complete") {
      dispatch(setActiveStep(step));
    } else {
      dispatch(setActiveStep("cart"));
    }
    dispatch(setStepInitialized(true));
  }, [searchParams, dispatch]);

  return null;
}
