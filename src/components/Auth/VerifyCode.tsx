"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { actions } from "@/Features/AuthDialog.slice";
import { VerifyResetCode } from "@/Features/user.slice";
import { useAppDispatch } from "@/hooks/store.hooks";
import { useFormik } from "formik";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function VerifyCode() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },

    onSubmit: async (values) => {
      const result = await dispatch(VerifyResetCode(values));

      if (VerifyResetCode.fulfilled.match(result)) {
        toast.success(result.payload.status);
        dispatch(actions.setAuthMode("ResetPassword"));
      } else {
        toast.error((result.payload as { message: string }).message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full space-y-6">
      <div className="text-center">
        <h2 className="text-[#333] py-3 uppercase font-bold text-xl">Verify Code</h2>

        <p className="text-sm text-gray-500">
          Enter the 6-digit verification code sent to your email.
        </p>
      </div>

      <div className="flex flex-col items-center !mt-10">
        <InputOTP
          maxLength={6}
          value={formik.values.resetCode}
          onChange={(value) => formik.setFieldValue("resetCode", value)}
          className="!w-full"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button
        type="submit"
        className="w-full py-3 px-7 h-auto rounded-none uppercase text-white font-semibold"
      >
        Verify Code
      </Button>
      <button
        type="button"
        onClick={() => dispatch(actions.setAuthMode("ForgotPassword"))}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
    </form>
  );
}
