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
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((store) => store.user);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),

    password: Yup.string()
      .required(t("validation.passwordRequired"))
      .min(6, t("validation.passwordMin")),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      toast.loading(t("loginForm.pleaseWait"), {
        id: "login",
      });
      const result = await dispatch(Login(values));
      toast.dismiss("login");
      if (Login.fulfilled.match(result)) {
        dispatch(VerifyToken(result.payload.token));
        dispatch(actions.closeAuthDialog());
        toast.success(t("loginForm.welcomeBack"), {
          duration: 1500,
        });
      } else {
        toast.error((result.payload as { message: string }).message, {
          duration: 1200,
        });
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FieldGroup className="pt-8">
        <Field className="!gap-3">
          <Label className="font-normal text-textMain !w-fit" htmlFor="email">
            {t("loginForm.usernameOrEmail")}
          </Label>
          <Input
            type="email"
            id="email"
            className="rounded-none py-2 px-5 h-auto"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </Field>
        <Field className="!gap-3">
          <Label
            className="font-normal text-textMain !w-fit"
            htmlFor="password"
          >
            {t("loginForm.password")}
          </Label>
          <Input
            type="password"
            id="password"
            className="rounded-none py-2 px-5 h-auto"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500">{formik.errors.password}</p>
          )}
        </Field>
        <Field className="flex-row items-center justify-between my-3 !gap-5 xl:!gap-20">
          <div className="flex items-center gap-2 !w-fit">
            <Checkbox
              id="remember"
              className="rounded-none size-[18px] data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white"
            />
            <Label
              htmlFor="remember"
              className="font-normal text-xs 2xl:text-sm text-textMain cursor-pointer"
            >
              {t("loginForm.rememberMe")}
            </Label>
          </div>

          <button
            type="button"
            onClick={() => dispatch(actions.setAuthMode("ForgotPassword"))}
            className="text-xs 2xl:text-sm text-red-500 hover:underline !w-fit shrink-0"
          >
            {t("loginForm.forgotPassword")}
          </button>
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={loading}
            className="py-3 px-7 h-auto rounded-none uppercase text-white font-semibold"
          >
            {t("loginForm.signIn")}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
