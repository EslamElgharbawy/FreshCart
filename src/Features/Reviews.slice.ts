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
  { state: RootState }
>("reviews/addReview", async ({ reviewId, review, rating }, thunkAPI) => {
  const token = thunkAPI.getState().user.token;

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/products/${reviewId}/reviews`,
    { review, rating },
    {
      headers: { token },
    },
  );
  return data.data;
});
export const deleteReview = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("reviews/deleteReview", async (reviewId, thunkAPI) => {
  const token = thunkAPI.getState().user.token;

  await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
    {
      headers: {
        token,
      },
    },
  );

  return reviewId;
});
export const updateReview = createAsyncThunk<
  Review,
  AddReviewPayload,
  { state: RootState }
>("reviews/updateReview", async ({ reviewId, review, rating }, thunkAPI) => {
  const token = thunkAPI.getState().user.token;

  const { data } = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
    { review, rating },
    {
      headers: { token },
    },
  );
  return data.data;
});

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

    // *Update Review
    builder.addCase(updateReview.pending, (state) => {
      state.addReviewLoading = true;
      state.error = null;
    });
    builder.addCase(updateReview.fulfilled, (state, action) => {
      state.addReviewLoading = false;
      state.reviews = state.reviews.map((review) =>
        review._id === action.payload._id ? action.payload : review,
      );
    });
    builder.addCase(updateReview.rejected, (state, action) => {
      state.addReviewLoading = false;
      state.error = action.error.message ?? "Something went wrong";
    });

    // *Delete Review
    builder.addCase(deleteReview.pending, (state) => {
      state.addReviewLoading = true;
      state.error = null;
    });
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.addReviewLoading = false;
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload,
      );
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.addReviewLoading = false;
      state.error = action.error.message ?? "Something went wrong";
    });
  },
});
export default reviewsSlice.reducer;
export const actions = reviewsSlice.actions;
