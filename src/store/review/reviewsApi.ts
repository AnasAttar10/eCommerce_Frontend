import { createApi } from '@reduxjs/toolkit/query/react';
import {
  TGetReviewsResponse,
  TGetReviewResponse,
  TAddReviewRequest,
  TUpdateReviewRequest,
} from '@types';
import { dynamicBaseQuery } from '@store/baseQuery';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['getProductReviews'],
  endpoints: (builder) => ({
    getProductReviews: builder.query<
      TGetReviewsResponse,
      { productId: string; queryString: string }
    >({
      query: ({ productId, queryString }) =>
        `products/${productId}/reviews${queryString}`,
      providesTags: ['getProductReviews'],
    }),
    getReview: builder.query<TGetReviewResponse, string>({
      query: (id) => `reviews/${id}`,
    }),
    addReview: builder.mutation<
      TGetReviewResponse,
      { body: TAddReviewRequest; productId: string }
    >({
      query: ({ body, productId }) => ({
        url: `products/${productId}/reviews`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['getProductReviews'],
    }),
    updateReview: builder.mutation<
      TGetReviewResponse,
      { data: TUpdateReviewRequest; id: string }
    >({
      query: ({ data, id }) => ({
        url: `reviews/${id}`,
        method: 'put',
        body: data,
      }),
      invalidatesTags: ['getProductReviews'],
    }),
    removeReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `reviews/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['getProductReviews'],
    }),
  }),
});

export const {
  useGetProductReviewsQuery,
  useGetReviewQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useRemoveReviewMutation,
} = reviewsApi;
