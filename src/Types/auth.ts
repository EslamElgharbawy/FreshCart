export type AuthMode = "SignIn" | "SignUp" | "ForgotPassword" | "VerifyCode" | "ResetPassword";

export interface AuthDialogState {
  open: boolean;
  mode: AuthMode;
}