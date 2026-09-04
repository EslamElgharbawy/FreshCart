import { RootState } from "@/Store/Store";
import {
  AddToCartResponse,
  CartData,
  CartState,
  UpdateCartQuantityPayload,
} from "@/Types/cart";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: CartState = {
  cart: null,
  loading: false,
  updating: false,
  error: null,
  activeStep: "cart",
  stepInitialized: false,
};

// ^ Add Product to Cart
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

// ^ Get Logged User Cart
export const GetLoggedUserCart = createAsyncThunk<
  CartData,
  void,
  { state: RootState }
>("cart/GetLoggedUserCart", async (_, { getState }) => {
  const token = getState().user.token;
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

// ^ RemoveProductFromCart
export const RemoveProductFromCart = createAsyncThunk<
  AddToCartResponse,
  string,
  { state: RootState; rejectValue: string }
>(
  "cart/RemoveProductFromCart",
  async (productId, { getState, rejectWithValue }) => {
    const token = getState().user.token;
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        {
          headers: {
            token,
          },
        },
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// ^ UpdateCartProductQuantity
export const UpdateCartProductQuantity = createAsyncThunk<
  AddToCartResponse,
  UpdateCartQuantityPayload,
  { state: RootState; rejectValue: string }
>(
  "cart/UpdateCartProductQuantity",
  async ({ productId, count }, { getState, rejectWithValue }) => {
    const token = getState().user.token;
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        {
          count,
        },
        {
          headers: {
            token,
          },
        },
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// ^ Clear User Cart
export const ClearUserCart = createAsyncThunk<
  AddToCartResponse,
  void,
  { state: RootState }
>("cart/ClearUserCart", async (_, { getState }) => {
  const token = getState().user.token;
  const { data } = await axios.delete(
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
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setStepInitialized: (state, action) => {
      state.stepInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    // * Add Product to Cart
    builder.addCase(AddProductToCart.pending, (state) => {
      state.updating = true;
      state.error = null;
    });
    builder.addCase(AddProductToCart.fulfilled, (state, action) => {
      state.updating = false;
      state.cart = action.payload;
    });
    builder.addCase(AddProductToCart.rejected, (state, action) => {
      state.updating = false;
      state.error = action.error.message || "Something went wrong";
    });

    // * Get Logged User Cart
    builder.addCase(GetLoggedUserCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(GetLoggedUserCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(GetLoggedUserCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    // * Remove Product from Cart
    builder.addCase(RemoveProductFromCart.pending, (state) => {
      state.updating = true;
      state.error = null;
    });
    builder.addCase(RemoveProductFromCart.fulfilled, (state, action) => {
      state.updating = false;
      state.cart = action.payload.data;
    });
    builder.addCase(RemoveProductFromCart.rejected, (state, action) => {
      state.updating = false;
      state.error = action.error.message || "Something went wrong";
    });

    // * UpdateCartProductQuantity
    builder.addCase(UpdateCartProductQuantity.pending, (state) => {
      state.updating = true;
      state.error = null;
    });
    builder.addCase(UpdateCartProductQuantity.fulfilled, (state, action) => {
      state.updating = false;
      state.cart = action.payload.data;
    });
    builder.addCase(UpdateCartProductQuantity.rejected, (state, action) => {
      state.updating = false;
      state.error = action.error.message || "Something went wrong";
    });

    // * ClearUserCart
    builder.addCase(ClearUserCart.pending, (state) => {
      state.updating = true;
      state.error = null;
    });
    builder.addCase(ClearUserCart.fulfilled, (state, action) => {
      state.updating = false;
      state.cart = action.payload.data;
    });
    builder.addCase(ClearUserCart.rejected, (state, action) => {
      state.updating = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});
export const { setActiveStep, setStepInitialized } = CartSlice.actions;
export default CartSlice.reducer;
