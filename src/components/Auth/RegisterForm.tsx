"use client";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import { Register } from "@/Features/user.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { actions } from "@/Features/AuthDialog.slice";

export default function () {
  const { loading } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: async (values) => {
      const result = await dispatch(Register(values));

      if (Register.fulfilled.match(result)) {
        dispatch(actions.setAuthMode("SignIn"));
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
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
            value={formik.values.name}
            onChange={formik.handleChange}
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
            value={formik.values.email}
            onChange={formik.handleChange}
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
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </Field>
        <Field className="!gap-3">
          <Label className="font-normal text-textMain" htmlFor="rePassword">
            RePassword
          </Label>
          <Input
            type="password"
            id="rePassword"
            className="rounded-none py-2 px-5 h-auto text-[#999]"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
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
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={loading}
            className="py-3 px-7 h-auto rounded-none uppercase text-white font-semibold"
          >
            {loading ? "Creating your account..." : "Sign Up"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
