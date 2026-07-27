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

export default function ResetPassword() {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
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
          Reset Password
        </h2>

        <p className="text-sm text-gray-500">
          Create a new password for your account.
        </p>
      </div>
      <FieldGroup className="mt-10 !gap-6">
        <Field className="!gap-3">
          <Label className="font-normal text-textMain" htmlFor="email">
            Email Address
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
        </Field>
        <Field className="!gap-3">
          <Label className="font-normal text-textMain" htmlFor="newPassword">
            New Password
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
        </Field>

        <Field>
          <Button
            type="submit"
            className="w-full py-3 px-7 h-auto rounded-none uppercase text-white font-semibold"
          >
            Reset Password
          </Button>
        </Field>
      </FieldGroup>
      {/* <div className="space-y-3 !mt-10">
        <Label htmlFor="email" className="font-normal text-textMain">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="rounded-none py-2 px-5 h-auto"
        />
      </div>
      <div className="space-y-3 !mt-10">
        <Label htmlFor="newPassword" className="font-normal text-textMain">
          New Password
        </Label>
        <Input
          id="newPassword"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="rounded-none py-2 px-5 h-auto"
        />
      </div> */}

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
