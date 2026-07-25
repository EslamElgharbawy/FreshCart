export interface ReviewState {
  reviews: Review[];
  loading: boolean;
  addReviewLoading: boolean;
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
  reviewId: string;
  review: string;
  rating: number;
}

export interface RatingSummaryProps {
  reviews: Review[];
  openReviewDialog: boolean;
  setOpenReviewDialog: React.Dispatch<React.SetStateAction<boolean>>;
  selectedReview: Review | null;
};

export interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialReview?: Review;
}
export interface ReviewCardProps {
  review: Review;
  onEdit: (review: Review) => void;
   onDelete: () => void;
}

