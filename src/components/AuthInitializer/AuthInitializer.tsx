"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/store.hooks";
import { login } from "@/Features/user.slice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);

  return null;
}
