export type AuthMode = "SignIn" | "SignUp";

export interface AuthDialogState {
  open: boolean;
  mode: AuthMode;
}