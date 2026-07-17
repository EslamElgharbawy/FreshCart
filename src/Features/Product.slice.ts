import { Product, ProductState } from "@/Types/products";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: ProductState = {
  products: [],
  relatedProducts: [],
  productDetails: null,
  loading: false,
};

export const getProducts = createAsyncThunk(
  "Products/getProducts",
  async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products",
    );
    return data.data;
  },
);

export const getProductDetails = createAsyncThunk<Product, string>(
  "Products/getProductDetails",
  async (_id) => {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${_id}`,
    );
    return data.data;
  },
);
export const getRelatedProducts = createAsyncThunk<Product[], string>(
  "Products/getRelatedProducts",
  async (categoryId) => {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
    );
    return data.data;
  },
);
const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // *products
    builder.addCase(getProducts.pending, (prevState) => {
      prevState.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (prevState, action) => {
      prevState.loading = false;
      prevState.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (prevState) => {
      prevState.loading = false;
    });

    // *productsDetails
    builder.addCase(getProductDetails.pending, (prevState) => {
      prevState.loading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (prevState, action) => {
      prevState.loading = false;
      prevState.productDetails = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (prevState) => {
      prevState.loading = false;
    });

    // *RelatedProducts
    builder.addCase(getRelatedProducts.pending, (prevState) => {
      prevState.loading = true;
    });
    builder.addCase(getRelatedProducts.fulfilled, (prevState, action) => {
      prevState.loading = false;
      prevState.relatedProducts = action.payload;
    });
    builder.addCase(getRelatedProducts.rejected, (prevState) => {
      prevState.loading = false;
    });
  },
});
export default ProductSlice.reducer;
export const actions = ProductSlice.actions;
