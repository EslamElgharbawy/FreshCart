import { RootState } from "@/Store/Store";
import { WishlistResponse, WishlistState } from "@/Types/wishList";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: WishlistState = {
  wishlist: [],
  loading: false,
  error: null,
};

export const AddProductToWishlist = createAsyncThunk<
  WishlistResponse,
  string,
  { state: RootState }
>("wishList/AddProductToWishlist", async (productId, { getState }) => {
  const token = getState().user.token;
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    { productId },
    {
      headers: {
        token,
      },
    },
  );
  return data;
});
export const RemoveProductFromWishlist = createAsyncThunk<
  WishlistResponse,
  string,
  { state: RootState }
>("wishList/RemoveProductFromWishlist", async (productId, { getState }) => {
  const token = getState().user.token;
  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      headers: {
        token,
      },
    },
  );
  return data;
});
export const GetLoggedUserWishlist = createAsyncThunk<
  WishlistResponse,
  void,
  { state: RootState }
>("wishList/GetLoggedUserWishlist", async (_, { getState }) => {
  const token = getState().user.token;
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: {
        token,
      },
    },
  );
  return data;
});

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //* Add Product
    builder
      .addCase(AddProductToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddProductToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data;

      })
      .addCase(AddProductToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });

    //* Remove Product
    builder
      .addCase(RemoveProductFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RemoveProductFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data;

      })
      .addCase(RemoveProductFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });

    //* Get Wishlist
    builder
      .addCase(GetLoggedUserWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetLoggedUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data;
      })
      .addCase(GetLoggedUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});
export default wishListSlice.reducer;
export const actions = wishListSlice.actions;
