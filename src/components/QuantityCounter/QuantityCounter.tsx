import React, { useState } from "react";
import { Input } from "../ui/input";
import i18n from "@/i18n";
import { Button } from "../ui/button";

export interface QuantityCounterProps {
  value: number;
  onChange: (value: number) => void;
}
export default function ({ value, onChange }: QuantityCounterProps) {
  return (
    <>
      <Input
        id="quantity"
        type="text"
        readOnly
        value={value}
        step={1}
        min={1}
        className="text-textMain border-[1px] border-border rounded w-[140px] h-[44px] !py-0 !px-3"
      />
      <div
        className={`absolute ${i18n.language === "en" ? "right-3 " : " left-3 "} top-1/2 -translate-y-1/2 flex justify-center items-center gap-2`}
      >
        <Button
          onClick={() => {
            if (value > 1) {
              onChange(value - 1);
            }
          }}
          type="button"
          className="!bg-[#eee] rounded-full text-[#777] !font-normal text-lg w-6 h-6 border-none"
        >
          -
        </Button>
        <Button
          onClick={() => {
            onChange(value + 1);
          }}
          type="button"
          className="!bg-[#eee] rounded-full text-[#777] !font-normal text-lg w-6 h-6 border-none"
        >
          +
        </Button>
      </div>
    </>
  );
}
