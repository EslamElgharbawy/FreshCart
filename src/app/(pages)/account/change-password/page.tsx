"use client";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { updateUserPassword } from "@/Features/user.slice";
import { actions } from "@/Features/AuthDialog.slice";
import { passwordRegex } from "@/lib/utils";

export default function ChangePasswordPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoggedIn, loading } = useAppSelector((store) => store.user);

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .trim()
      .required(
        t("changePassword.currentPasswordRequired") ||
          t("validation.passwordRequired"),
      ),

    password: Yup.string()
      .trim()
      .required(t("validation.passwordRequired"))
      .matches(passwordRegex, t("validation.invalidPassword")),

    rePassword: Yup.string()
      .trim()
      .required(t("validation.confirmPasswordRequired"))
      .oneOf([Yup.ref("password")], t("validation.passwordsMustMatch")),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!isLoggedIn) {
        toast.error(t("changePassword.notLoggedIn"));
        dispatch(actions.openAuthDialog("SignIn"));
        return;
      }

      toast.loading(t("changePassword.updating"), {
        id: "updatePassword",
      });

      const result = await dispatch(updateUserPassword(values));

      if (updateUserPassword.fulfilled.match(result)) {
        toast.success(t("changePassword.updateSuccess"), {
          id: "updatePassword",
          duration: 2500,
        });
        resetForm();
      } else {
        const errorPayload = result.payload as any;
        const errorMessage =
          errorPayload?.errors?.msg ||
          errorPayload?.message ||
          t("changePassword.failed");

        toast.error(errorMessage, {
          id: "updatePassword",
          duration: 3000,
        });
      }
    },
  });

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#333]">
          {t("changePassword.title")}
        </h1>

        <p className="mt-1 text-sm text-[#666]">
          {t("changePassword.description")}
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="rounded-xl border border-gray-200 p-6 md:p-8"
      >
        <div className="space-y-5">
          {/* Current Password */}
          <div className="space-y-2">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-[#333]"
            >
              {t("changePassword.currentPassword")}
            </label>

            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("changePassword.enterCurrentPassword")}
              className="h-12 w-full border border-[#e5e7eb] px-4 text-sm outline-none transition focus:border-primary"
            />

            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {formik.errors.currentPassword}
                </p>
              )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#333]"
            >
              {t("changePassword.newPassword")}
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("changePassword.enterNewPassword")}
              className="h-12 w-full border border-[#e5e7eb] px-4 text-sm outline-none transition focus:border-primary"
            />

            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <label
              htmlFor="rePassword"
              className="text-sm font-medium text-[#333]"
            >
              {t("changePassword.confirmPassword")}
            </label>

            <input
              id="rePassword"
              name="rePassword"
              type="password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("changePassword.confirmNewPassword")}
              className="h-12 w-full border border-[#e5e7eb] px-4 text-sm outline-none transition focus:border-primary"
            />

            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="text-sm text-red-500">
                {formik.errors.rePassword}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading || formik.isSubmitting}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#ff4b12] px-7 py-3 text-sm font-semibold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {(loading || formik.isSubmitting) && (
              <Loader2 className="size-4 animate-spin" />
            )}
            <span>{t("changePassword.submit")}</span>
          </button>
        </div>
      </form>
    </section>
  );
}
