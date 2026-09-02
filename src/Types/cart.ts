import { Product } from "./products";

export interface CartState {
  cart: CartData | null;
  loading: boolean;
  updating: boolean;
  error: string | null;
  activeStep: "cart" | "checkout" | "complete";
}

export interface CartProduct {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface AddToCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface UpdateCartQuantityPayload {
  productId: string;
  count: number;
}
