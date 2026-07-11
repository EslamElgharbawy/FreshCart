import { AuthDialogState, AuthMode } from "@/Types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: AuthDialogState = {
  open: false,
  mode: "SignIn",
};
export const AuthDialogSlice = createSlice({
  name: "authDialog",
  initialState,
  reducers: {
    openAuthDialog: (state, action: PayloadAction<AuthMode>) => {
      state.open = true;
      state.mode = action.payload;
    },

    closeAuthDialog: (state) => {
      state.open = false;
    },
  },
});
export const actions = AuthDialogSlice.actions;
export default AuthDialogSlice.reducer;
