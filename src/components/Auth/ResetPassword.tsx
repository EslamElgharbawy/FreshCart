import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { actions } from "@/Features/AuthDialog.slice";
import { ArrowLeft } from "lucide-react";
import { useAppDispatch } from "@/hooks/store.hooks";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { resetPassword, VerifyToken } from "@/Features/user.slice";
import { Label } from "../ui/label";
import { Field, FieldGroup } from "../ui/field";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export default function ResetPassword() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),
    newPassword: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(resetPassword(values));
      if (resetPassword.fulfilled.match(result)) {
        toast.success("Password reset successfully");
        dispatch(actions.setAuthMode("SignIn"));
      } else {
        toast.error((result.payload as { message: string }).message);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div className="text-center">
        <h2 className="text-[#333] py-3 uppercase font-bold text-xl">
          {t("resetPassword.resetPassword")}
        </h2>

        <p className="text-sm text-gray-500">
          {t("resetPassword.createNewPassword")}
        </p>
      </div>
      <FieldGroup className="mt-10 !gap-6">
        <Field className="!gap-3">
          <Label className="font-normal text-textMain" htmlFor="email">
            {t("resetPassword.emailAddress")}
          </Label>
          <Input
            type="email"
            id="email"
            className="rounded-none py-2 px-5 h-auto"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </Field>
        <Field className="!gap-3">
          <Label className="font-normal text-textMain" htmlFor="newPassword">
            {t("resetPassword.newPassword")}
          </Label>
          <Input
            type="password"
            id="newPassword"
            className="rounded-none py-2 px-5 h-auto"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.errors.newPassword && formik.touched.newPassword && (
            <p className="text-sm text-red-500">{formik.errors.newPassword}</p>
          )}
        </Field>

        <Field>
          <Button
            type="submit"
            className="w-full py-3 px-7 h-auto rounded-none uppercase text-white font-semibold"
          >
            {t("resetPassword.resetPassword")}
          </Button>
        </Field>
      </FieldGroup>

      <button
        type="button"
        onClick={() => dispatch(actions.setAuthMode("VerifyCode"))}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-all duration-300 mt-6"
      >
        <ArrowLeft className="size-4" />
        Back
      </button>
    </form>
  );
}
