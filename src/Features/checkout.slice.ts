import { RootState } from "@/Store/Store";
import { OrderData } from "@/Types/order";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};
const CreateCashOrder = createAsyncThunk<
  OrderData,
  string,
  { state: RootState }
>("cart/createCashOrder", async (cartId, { getState }) => {
  const token = getState().user.token;
  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    //     {
    //     values
    // },
    {
      headers: {
        token,
      },
    },
  );
  return data;
});

// export const AddProductToCart = createAsyncThunk<
//   CartData,
//   string,
//   { state: RootState }
// >("cart/AddProductToCart", async (productId, { getState }) => {
//   const token = getState().user.token;
//   const { data } = await axios.post(
//     "https://ecommerce.routemisr.com/api/v2/cart",
//     {
//       productId,
//     },
//     {
//       headers: {
//         token,
//       },
//     },
//   );
//   return data.data;
// });

const checkOutSlice = createSlice({
  name: "checkOut",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateCashOrder.pending, (state, action) => {
      // Handle pending case
    });
    builder.addCase(CreateCashOrder.fulfilled, (state, action) => {
      // Handle fulfilled case
    });
    builder.addCase(CreateCashOrder.rejected, (state, action) => {
      // Handle rejected case
    });
  },
});
export default checkOutSlice.reducer;
export const actions = checkOutSlice.actions;
