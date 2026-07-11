import React from "react";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";

export default function LoginForm() {
  return (
    <FieldGroup className="pt-8 ">
      <Field className="!gap-3">
        <Label className="font-normal text-textMain" htmlFor="email">
          Username or email address
        </Label>
        <Input
          id="email"
          className="rounded-none py-2 px-5 h-auto"
          name="email"
        />
      </Field>
      <Field className="!gap-3">
        <Label className="font-normal text-textMain" htmlFor="password">
          Password
        </Label>
        <Input
          id="password"
          className="rounded-none py-2 px-5 h-auto"
          name="password"
        />
      </Field>
      <Field className="flex-row items-center justify-between my-3 !gap-20">
        <div className="flex items-center gap-2 !w-fit">
          <Checkbox id="remember" className="rounded-none size-[18px] data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white"/>
          <Label
            htmlFor="remember"
            className="font-normal text-sm text-textMain cursor-pointer"
          >
            Remember me
          </Label>
        </div>

        <button type="button" className="text-sm text-red-500 hover:underline !w-fit shrink-0">
          Forgot Password?
        </button>
      </Field>

      <Field>
        <Button
          type="submit"
          className="py-3 px-7 h-auto rounded-none uppercase text-white font-semibold"
        >
          Sign In
        </Button>
      </Field>
    </FieldGroup>
  );
}
