import { TApiResponse } from './ApiResponse';

export type TReview = {
  _id: string;
  title: string;
  ratings: number;
  user: { _id: string; name?: string };
  product: string;
};

export type TGetReviewsResponse = TApiResponse<TReview[]>;

export type TGetReviewResponse = TApiResponse<TReview>;

export type TAddReviewRequest = Omit<TReview, '_id' | 'user' | 'product'>;

export type TUpdateReviewRequest = Partial<TReview>;
