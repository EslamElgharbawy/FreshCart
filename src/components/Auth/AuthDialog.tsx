import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { actions } from "@/Features/AuthDialog.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { AuthMode } from "@/Types/auth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPassword from "./ForgotPassword";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import VerifyCode from "./VerifyCode";
import ResetPassword from "./ResetPassword";

export default function AuthDialog() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { open, mode } = useAppSelector((store) => store.AuthDialog);
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          dispatch(actions.closeAuthDialog());
        }
      }}
    >
      <DialogContent className="!max-w-[500px] sm:max-xl:!max-w-[330px] py-8 px-5 xl:px-12 ring-0 rounded-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>{t("authDialog.description")}</DialogDescription>
        </DialogHeader>
        <Tabs
          value={mode}
          onValueChange={(value) =>
            dispatch(actions.openAuthDialog(value as AuthMode))
          }
          className="flex-col"
        >
          {(mode === "SignIn" || mode === "SignUp") && (
            <TabsList variant="line" className="w-full">
              <TabsTrigger
                value="SignIn"
                className="text-[#333] py-3 uppercase font-bold text-base"
              >
                {t("authDialog.signIn")}
              </TabsTrigger>
              <TabsTrigger
                value="SignUp"
                className="text-[#333] py-3 uppercase font-bold text-base"
              >
                {t("authDialog.signUp")}
              </TabsTrigger>
            </TabsList>
          )}
          <AnimatePresence mode="wait">
            {mode === "SignIn" && (
              <motion.div
                key="signin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <LoginForm />
              </motion.div>
            )}
            {mode === "SignUp" && (
              <motion.div
                key="signup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <RegisterForm />
              </motion.div>
            )}
            {mode === "ForgotPassword" && (
              <motion.div
                key="forgotPassword"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <ForgotPassword />
              </motion.div>
            )}{" "}
            {mode === "VerifyCode" && (
              <motion.div
                key="verifyCode"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <VerifyCode />
              </motion.div>
            )}

            {mode === "ResetPassword" && (
              <motion.div
                key="ResetPassword"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <ResetPassword />
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
