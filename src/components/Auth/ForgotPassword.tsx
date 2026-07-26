import { ArrowLeft } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../../components/ui/button";
import { useAppDispatch } from "@/hooks/store.hooks";
import { actions } from "@/Features/AuthDialog.slice";
import { Label } from "../ui/label";
import { useFormik } from "formik";
import { forgotPassword } from "@/Features/user.slice";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
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
    <form onSubmit={formik.handleSubmit} className="w-full space-y-6">
      <div className="text-center">
        <h2 className="text-[#333] py-3 uppercase font-bold text-xl">
          Forgot Password
        </h2>

        <p className="text-sm text-textMain">
          Enter your email address and we'll send you a verification code to
          reset your password.
        </p>
      </div>

      <div className="space-y-3 !mt-10">
        <Label htmlFor="email" className="font-normal text-textMain">
          Email Address
        </Label>

        <Input
          id="email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="rounded-none py-2 px-5 h-auto"
        />
      </div>

      <Button
        type="submit"
        className="w-full py-3 px-7 h-auto rounded-none uppercase text-white font-semibold"
      >
        Send Code
      </Button>

      <button
        type="button"
        onClick={() => dispatch(actions.setAuthMode("SignIn"))}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
    </form>
  );
}
