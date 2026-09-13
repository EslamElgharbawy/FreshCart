import { UserOrdersResponse, UserOrdersState } from "@/Types/order";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: UserOrdersState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const getUserOrders = createAsyncThunk<UserOrdersResponse, string>(
  "order/getUserOrders",
  async (userId) => {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    );
    return data;
  },
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserOrders.rejected, (state) => {
      state.error = "Failed to fetch orders";
      state.isLoading = false;
    });
  },
});
export default orderSlice.reducer;
export const actions = orderSlice.actions;
