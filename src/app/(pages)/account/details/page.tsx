"use client";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { updateUserData } from "@/Features/user.slice";
import { actions } from "@/Features/AuthDialog.slice";
import { phoneRegex } from "@/lib/utils";

export default function AccountDetailsPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user, isLoggedIn, loading } = useAppSelector((store) => store.user);

  const initialValues = useMemo(
    () => ({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    }),
    [user],
  );

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required(t("validation.nameRequired"))
      .min(3, t("validation.nameMin")),

    email: Yup.string()
      .trim()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),

    phone: Yup.string()
      .trim()
      .required(t("validation.phoneRequired"))
      .matches(phoneRegex, t("validation.invalidPhone")),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (!isLoggedIn) {
        toast.error(t("accountDetails.notLoggedIn"));
        dispatch(actions.openAuthDialog("SignIn"));
        return;
      }

      toast.loading(t("accountDetails.updating"), {
        id: "updateProfile",
      });

      const result = await dispatch(updateUserData(values));

      if (updateUserData.fulfilled.match(result)) {
        toast.success(t("accountDetails.updateSuccess"), {
          id: "updateProfile",
          duration: 2500,
        });
      } else {
        const errorPayload = result.payload as any;
        const errorMessage =
          errorPayload?.errors?.msg ||
          errorPayload?.message ||
          "Failed to update profile";

        toast.error(errorMessage, {
          id: "updateProfile",
          duration: 3000,
        });
      }
    },
  });

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#333]">
          {t("accountDetails.title")}
        </h1>

        <p className="mt-1 text-sm text-[#666]">
          {t("accountDetails.description")}
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="rounded-xl border border-gray-200 p-6 md:p-8"
        noValidate
      >
        <div className="grid gap-x-6 gap-y-5 grid-cols-1 xl:grid-cols-2 ">
          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[#333]"
            >
              {t("accountDetails.fullName")}
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("accountDetails.enterFullName")}
              className="h-12 w-full border border-[#e5e7eb] px-4 text-sm outline-none transition focus:border-primary"
            />

            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#333]"
            >
              {t("accountDetails.emailAddress")}
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("accountDetails.enterEmailAddress")}
              className="h-12 w-full border border-[#e5e7eb] px-4 text-sm outline-none transition focus:border-primary"
            />

            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-[#333]"
            >
              {t("accountDetails.phoneNumber")}
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("accountDetails.enterPhoneNumber")}
              className="h-12 w-full border border-[#e5e7eb] px-4 text-sm outline-none transition focus:border-primary"
            />

            {formik.touched.phone && formik.errors.phone && (
              <p className="text-sm text-red-500">{formik.errors.phone}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading || formik.isSubmitting}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#ff4b12] px-7 py-3 text-sm font-semibold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {(loading || formik.isSubmitting) && (
              <Loader2 className="size-4 animate-spin" />
            )}
            <span>{t("accountDetails.saveChanges")}</span>
          </button>
        </div>
      </form>
    </section>
  );
}
