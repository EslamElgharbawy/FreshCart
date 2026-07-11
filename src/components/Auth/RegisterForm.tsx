import React from "react";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function () {
  return (
    <FieldGroup className="pt-8">
      <Field className="!gap-3">
        <Label className="font-normal text-textMain" htmlFor="name">
          Username
        </Label>
        <Input
          type="text"
          id="name"
          className="rounded-none py-2 px-5 h-auto text-[#999]"
          name="name"
        />
      </Field>
      <Field className="!gap-3">
        <Label className="font-normal text-textMain" htmlFor="email">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          className="rounded-none py-2 px-5 h-auto text-[#999]"
          name="email"
        />
      </Field>
      <Field className="!gap-3">
        <Label className="font-normal text-textMain" htmlFor="password">
          Password
        </Label>
        <Input
          type="password"
          id="password"
          className="rounded-none py-2 px-5 h-auto text-[#999]"
          name="password"
        />
      </Field>
      <Field className="!gap-3">
        <Label className="font-normal text-textMain" htmlFor="repassword">
          RePassword
        </Label>
        <Input
          type="password"
          id="repassword"
          className="rounded-none py-2 px-5 h-auto text-[#999]"
          name="repassword"
        />
      </Field>
      <Field className="!gap-3">
        <Label className="font-normal text-textMain" htmlFor="phone">
          Phone
        </Label>
        <Input
          type="tel"
          id="phone"
          className="rounded-none py-2 px-5 h-auto text-[#999]"
          name="phone"
        />
      </Field>

      <Field>
        <Button
          type="submit"
          className="py-3 px-7 h-auto rounded-none uppercase text-white font-semibold"
        >
          Sign UP
        </Button>
      </Field>
    </FieldGroup>
  );
}
