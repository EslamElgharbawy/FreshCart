import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/Features/user.slice";

export const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});
