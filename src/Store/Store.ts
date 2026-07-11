import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/Features/user.slice";
import ProductSlice from "@/Features/Product.slice";
import VendorsSlice from "@/Features/Vendors.slice";
import categoriesSlice from "@/Features/Categoreis.slice";
import reviewsSlice from "@/Features/Reviews.slice";
import AuthDialog from "@/Features/AuthDialog.slice";
export const Store = configureStore({
  reducer: {
    user: userReducer,
    ProductSlice,
    VendorsSlice,
    categoriesSlice,
    reviewsSlice,
    AuthDialog,
  },
});
type AppStore = typeof Store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
