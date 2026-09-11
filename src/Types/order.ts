export interface OrderState {
  order: OrderResponse | null;
  session : CheckoutSessionResponse | null;
  isLoading: boolean;
  error: string | null;
}

export interface OrderResponse {
  status: string;
  message: string;
  user: OrderUser;
  pricing: OrderPricing;
  data: OrderData;
}
export interface CheckoutSessionResponse {
  status: string;
  session: {
    url: string;
    success_url: string;
    cancel_url: string;
  };
}
export interface OrderUser {
  id: string;
  name: string;
  email: string;
}

export interface OrderPricing {
  cartPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
}

export interface OrderData {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: OrderDetailsUser;
  cartItems: OrderCartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

export interface OrderDetailsUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderCartItem {
  count: number;
  _id: string;
  product: OrderProduct;
  price: number;
}

export interface OrderProduct {
  subcategory: OrderSubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: OrderCategory;
  brand: OrderBrand;
  ratingsAverage: number;
  id: string;
}

export interface OrderSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface OrderCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface OrderBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export type OrderStatus = "in_transit" | "processing" | "delivered" | "cancelled";
export type ItemAction = "trackItem" | "buyAgain" | "startReturn" | "writeReview";

export interface OrderItem {
  id: string;
  name: string;
  imageUrl: string;
  variant: string;
  price: number;
  actions: ItemAction[];
  returnEligibleUntil?: string;
}

export interface OrderShippingInfo {
  message: string;
  subMessage: string;
  trackingUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  placedDate: string;
  total: number;
  status: OrderStatus;
  shipping?: OrderShippingInfo;
  items: OrderItem[];
  detailsUrl?: string;
  helpUrl?: string;
}