import { RootState } from "@/Store/Store";
import { AddToCartResponse, CartData, CartState } from "@/Types/cart";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const AddProductToCart = createAsyncThunk<
  CartData,
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
  return data.data;
});

export const GetLoggedUserCart = createAsyncThunk<
  CartData,
  void,
  { state: RootState }
>("cart/GetLoggedUserCart", async (_, { getState }) => {
   console.log("GetLoggedUserCart Called");

    const token = getState().user.token;
    console.log("Token:", token);
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v2/cart",
    {
      headers: {
        token,
      },
    },
  );
  return data.data;
});
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // * Add Product to Cart
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

    // * Get Logged User Cart
    builder.addCase(GetLoggedUserCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(GetLoggedUserCart.fulfilled, (state, action) => {
       console.log("Cart Loaded", action.payload);
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(GetLoggedUserCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});
export const actions = CartSlice.actions;
export default CartSlice.reducer;
