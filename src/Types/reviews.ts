export interface ReviewState {
  reviews: Review[];
  loading: boolean;
  addReviewLoading:boolean
  error: string | null;
}
export interface ReviewUser {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  rating: number;
  review: string;
  product: string;
  user: ReviewUser;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface ReviewsResponse {
  results: number;
  metadata: ReviewsMetadata;
  data: Review[];
}

export interface AddReviewPayload {
  productId: string;
  review: string;
  rating: number;
}