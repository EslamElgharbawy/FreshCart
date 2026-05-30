import { ProductState } from "@/Types/products";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: ProductState = {
  products: null,
  productDetails: null,
  loading: false,
};

export const getProducts = createAsyncThunk(
  "Products/getProducts",
  async () => {
    const {data} = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products",
    );
    console.log(data.data);

    return data.data;
  },
);

const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (prevState) => {
      prevState.loading = true;
      console.log("not now",prevState);
      
    });
    builder.addCase(getProducts.fulfilled, (prevState, action) => {
      prevState.loading = false;
      prevState.products = action.payload;
      console.log("done",prevState);

    });
    builder.addCase(getProducts.rejected, (prevState) => {
      prevState.loading = false;
      console.log("rejected",prevState);


    });
  },
});
export default ProductSlice.reducer;
export const actions = ProductSlice.actions;
