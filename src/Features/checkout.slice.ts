import { RootState } from "@/Store/Store";
import {
  CheckoutSessionResponse,
  OrderResponse,
  OrderState,
} from "@/Types/order";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: OrderState = {
  order: null,
  session: null,
  isLoading: false,
  error: null,
};
export const CreateCashOrder = createAsyncThunk<
  OrderResponse,
  {
    cartId: string;
    values: {
      details: string;
      phone: string;
      city: string;
      postalCode: string;
    };
  },
  { state: RootState }
>("cart/createCashOrder", async ({ cartId, values }, { getState }) => {
  const token = getState().user.token;
  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    {
      shippingAddress: values,
    },
    {
      headers: {
        token,
      },
    },
  );
  return data;
});

export const CheckoutSession = createAsyncThunk<
  CheckoutSessionResponse,
  {
    cartId: string;
    values: {
      details: string;
      phone: string;
      city: string;
    };
  },
  { state: RootState }
>("cart/checkoutSession", async ({ cartId, values }, { getState }) => {
  const token = getState().user.token;
  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${location.origin}`,
    {
      shippingAddress: values,
    },
    {
      headers: {
        token,
      },
    },
  );
  return data;
});

const checkOutSlice = createSlice({
  name: "checkOut",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateCashOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CreateCashOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    });
    builder.addCase(CreateCashOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "An error occurred";
    });

    builder.addCase(CheckoutSession.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CheckoutSession.fulfilled, (state, action) => {
      state.isLoading = false;
      state.session = action.payload;
    });
    builder.addCase(CheckoutSession.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "An error occurred";
    });
  },
});
export default checkOutSlice.reducer;
export const actions = checkOutSlice.actions;
