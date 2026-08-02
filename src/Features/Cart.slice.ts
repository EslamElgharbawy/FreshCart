import { RootState } from "@/Store/Store";
import { AddToCartResponse, CartState } from "@/Types/cart";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const AddProductToCart = createAsyncThunk<
  AddToCartResponse,
  string,
  { state: RootState }
>("cart/AddProductToCart", async (productId, { getState }) => {
  const token = getState().user.token;
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v2/cart",
    {
      productId,
    },
    {
      headers: {
        token,
      },
    },
  );
  return data;
});
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddProductToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(AddProductToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(AddProductToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});
export const actions = CartSlice.actions;
export default CartSlice.reducer;
