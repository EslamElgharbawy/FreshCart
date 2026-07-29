import { ArrowLeft } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../../components/ui/button";
import { useAppDispatch } from "@/hooks/store.hooks";
import { actions } from "@/Features/AuthDialog.slice";
import { Label } from "../ui/label";
import { useFormik } from "formik";
import { forgotPassword } from "@/Features/user.slice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
    .required(t("validation.emailRequired")),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(forgotPassword(values));
      if (forgotPassword.fulfilled.match(result)) {
        toast.success(result.payload.message);
        dispatch(actions.setAuthMode("VerifyCode"));
      } else {
        toast.error((result.payload as { message: string }).message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full space-y-5">
      <div className="text-center">
        <h2 className="text-[#333] py-3 uppercase font-bold text-xl">
          {t("forgotPassword.title")}
        </h2>

        <p className="text-sm text-textMain">
          {t("forgotPassword.description")}
        </p>
      </div>

      <div className="space-y-3 !mt-10">
        <Label htmlFor="email" className="font-normal text-textMain">
          {t("forgotPassword.email")}
        </Label>

        <Input
          id="email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="rounded-none py-2 px-5 h-auto text-sm"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500">{formik.errors.email}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full py-3 px-7 h-auto rounded-none uppercase text-white font-semibold"
      >
        {t("forgotPassword.sendCode")}
      </Button>

      <button
        type="button"
        onClick={() => dispatch(actions.setAuthMode("SignIn"))}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("forgotPassword.back")}
      </button>
    </form>
  );
}
