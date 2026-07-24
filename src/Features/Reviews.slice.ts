import { RootState } from "@/Store/Store";
import { AddReviewPayload, Review, ReviewState } from "@/Types/reviews";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  addReviewLoading: false,
  error: null,
};

export const getReviewsForProduct = createAsyncThunk<Review[], string>(
  "reviews/getReviewsForProduct",
  async (productId) => {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
    );
    return data.data;
  },
);

export const addReview = createAsyncThunk<
  Review,
  AddReviewPayload,
  { state: RootState; rejectValue: any }
>(
  "reviews/addReview",
  async ({ productId, review, rating }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
        { review, rating },
        {
          headers: { token },
        }
      );

      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status);
        console.log(error.response?.data);
        return thunkAPI.rejectWithValue(error.response?.data);
      }

      throw error;
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    // *Get Reviews For Product
    builder.addCase(getReviewsForProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getReviewsForProduct.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
    });
    builder.addCase(getReviewsForProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
    });

    // *Add Review
    builder.addCase(addReview.pending, (state) => {
      state.addReviewLoading = true;
      state.error = null;
    });
    builder.addCase(addReview.fulfilled, (state) => {
      state.addReviewLoading = false;
    });
    builder.addCase(addReview.rejected, (state, action) => {
      state.addReviewLoading = false;
      state.error = action.error.message ?? "Something went wrong";
    });
  },
});
export default reviewsSlice.reducer;
export const actions = reviewsSlice.actions;
