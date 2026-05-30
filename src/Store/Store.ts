import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/Features/user.slice";
import ProductSlice from "@/Features/Product.slice";
export const Store = configureStore({
  reducer: {
    user: userReducer,
    ProductSlice,
  },
});
type AppStore = typeof Store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];


