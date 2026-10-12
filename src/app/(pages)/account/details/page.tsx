"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AccountDetailsPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const fields = [
    {
      name: "name",
      label: t("accountDetails.fullName"),
      type: "text",
      placeholder: t("accountDetails.enterFullName"),
    },
    {
      name: "email",
      label: t("accountDetails.emailAddress"),
      type: "email",
      placeholder: t("accountDetails.enterEmailAddress"),
    },
    {
      name: "phone",
      label: t("accountDetails.phoneNumber"),
      type: "tel",
      placeholder: t("accountDetails.enterPhoneNumber"),
    },
  ] as const;

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#333]">{t("accountDetails.title")}</h1>

        <p className="mt-1 text-sm text-[#666]">
          {t("accountDetails.description")}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // هنربط API تحديث بيانات المستخدم بعدين
        }}
        className="rounded-xl border border-gray-200 p-6 md:p-8"
      >
        <div className="grid gap-x-6 gap-y-5 grid-cols-1 xl:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>

              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="h-12 w-full border border-[#e5e7eb] px-4 text-sm outline-none transition focus:border-primary "
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-[#ff4b12] px-7 py-3 text-sm font-semibold text-white transition hover:bg-primary"
          >
            {t("accountDetails.saveChanges")}
          </button>
        </div>
      </form>
    </section>
  );
}
