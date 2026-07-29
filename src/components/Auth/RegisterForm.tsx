"use client";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import { Register } from "@/Features/user.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { actions } from "@/Features/AuthDialog.slice";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { passwordRegex, phoneRegex } from "@/lib/utils";
export default function () {
  const { t } = useTranslation();
  const { loading } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t("validation.nameRequired"))
      .min(3, t("validation.nameMin")),

    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),

    password: Yup.string()
      .required(t("validation.passwordRequired"))
      .matches(passwordRegex, t("validation.invalidPassword")),

    rePassword: Yup.string()
      .required(t("validation.confirmPasswordRequired"))
      .oneOf([Yup.ref("password")], t("validation.passwordsMustMatch")),

    phone: Yup.string()
      .required(t("validation.phoneRequired"))
      .matches(phoneRegex, t("validation.invalidPhone")),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      toast.loading(t("registerForm.creatingAccount"), {
        id: "register",
      });

      const result = await dispatch(Register(values));

      toast.dismiss("register");

      if (Register.fulfilled.match(result)) {
        dispatch(actions.setAuthMode("SignIn"));

        toast.success(t("registerForm.accountCreated"), {
          id: "register",
          duration: 1500,
        });
      } else {
        toast.error((result.payload as { message: string }).message, {
          duration: 1500,
        });
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FieldGroup className="pt-8">
        <Field className="!gap-3">
          <Label className="font-normal text-textMain !w-fit" htmlFor="name">
            {t("registerForm.username")}
          </Label>
          <Input
            type="text"
            id="name"
            className="rounded-none py-2 px-5 h-auto text-[#999]"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
          )}
        </Field>
        <Field className="!gap-3">
          <Label className="font-normal text-textMain !w-fit" htmlFor="email">
            {t("registerForm.email")}
          </Label>
          <Input
            type="email"
            id="email"
            className="rounded-none py-2 px-5 h-auto text-[#999]"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
          )}
        </Field>
        <Field className="!gap-3">
          <Label
            className="font-normal text-textMain !w-fit"
            htmlFor="password"
          >
            {t("registerForm.password")}
          </Label>
          <Input
            type="password"
            id="password"
            className="rounded-none py-2 px-5 h-auto text-[#999]"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.password}
            </p>
          )}
        </Field>
        <Field className="!gap-3">
          <Label
            className="font-normal text-textMain !w-fit"
            htmlFor="rePassword"
          >
            {t("registerForm.rePassword")}
          </Label>
          <Input
            type="password"
            id="rePassword"
            className="rounded-none py-2 px-5 h-auto text-[#999]"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.rePassword}
            </p>
          )}
        </Field>
        <Field className="!gap-3">
          <Label className="font-normal text-textMain !w-fit" htmlFor="phone">
            {t("registerForm.phone")}
          </Label>
          <Input
            type="tel"
            id="phone"
            className="rounded-none py-2 px-5 h-auto text-[#999]"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
          )}
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={loading}
            className="py-3 px-7 h-auto rounded-none uppercase text-white font-semibold"
          >
            {loading
              ? t("registerForm.creatingAccount")
              : t("registerForm.signUp")}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
