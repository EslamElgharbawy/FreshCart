"use client";
import { Store } from "@/Store/Store";
import React from "react";
import { Provider } from "react-redux";
import AuthInitializer from "../AuthInitializer/AuthInitializer";
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={Store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}
