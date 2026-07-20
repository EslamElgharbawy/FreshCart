"use client";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import { useFormik } from "formik";
import { Login, VerifyToken } from "@/Features/user.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { actions } from "@/Features/AuthDialog.slice";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((store) => store.user);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const result = await dispatch(Login(values));
      if (Login.fulfilled.match(result)) {
        dispatch(VerifyToken(result.payload.token));
        dispatch(actions.closeAuthDialog());
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FieldGroup className="pt-8">
        <Field className="!gap-3">
          <Label className="font-normal text-textMain" htmlFor="email">
            Username or email address
          </Label>
          <Input
            type="email"
            id="email"
            className="rounded-none py-2 px-5 h-auto"
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
            className="rounded-none py-2 px-5 h-auto"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </Field>
        <Field className="flex-row items-center justify-between my-3 !gap-5 xl:!gap-20">
          <div className="flex items-center gap-2 !w-fit">
            <Checkbox
              id="remember"
              className="rounded-none size-[18px] data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white"
            />
            <Label
              htmlFor="remember"
              className="font-normal text-xs text-textMain cursor-pointer"
            >
              Remember me
            </Label>
          </div>

          <button
            type="button"
            className="text-xs text-red-500 hover:underline !w-fit shrink-0"
          >
            Forgot Password?
          </button>
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={loading}
            className="py-3 px-7 h-auto rounded-none uppercase text-white font-semibold"
          >
            Sign In
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
