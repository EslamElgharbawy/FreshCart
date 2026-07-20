"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/store.hooks";
import { authChecked, VerifyToken } from "@/Features/user.slice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(VerifyToken(token));
    } else {
      dispatch(authChecked());
    }
  }, [dispatch]);

  return null;
}
