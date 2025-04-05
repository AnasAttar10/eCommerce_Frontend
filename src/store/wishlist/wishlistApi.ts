import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from '@store/baseQuery';
import { IProduct } from '@types';

export interface IWishlist {
  productId: string;
}
export interface IGetLoggedUserWishList {
  status: string;
  results: number;
  data: IProduct[];
}
export interface ILikeToggle {
  isLiked: boolean;
  productId: string;
}

export const wishlistApi = createApi({
  reducerPath: 'wishlistapi',
  baseQuery: baseQueryWithToken,
  tagTypes: ['wishlist'],
  endpoints: (builder) => ({
    getWishlistItems: builder.query<IGetLoggedUserWishList, void>({
      query: () => `/wishlist`,
      providesTags: ['wishlist'],
    }),
    addToWishlist: builder.mutation({
      query: (productId: string) => ({
        url: `/wishlist`,
        method: 'post',
        body: { productId },
      }),
      invalidatesTags: ['wishlist'],
    }),
    removeFromWishlist: builder.mutation({
      query: (productId: string) => ({
        url: `/wishlist/${productId}`,
        method: 'delete',
      }),
      invalidatesTags: ['wishlist'],
    }),
  }),
});

export const {
  useGetWishlistItemsQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
