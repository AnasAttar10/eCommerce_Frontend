import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from '@store/baseQuery';
import { TProduct } from '@types';

export interface IWishlist {
  productId: string;
}
export interface IGetLoggedUserWishList {
  status: string;
  results: number;
  data: TProduct[];
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
    syncWishlistAfterLogin: builder.mutation<IGetLoggedUserWishList, string[]>({
      query: (wishlistItems) => ({
        url: `/wishlist/sync`,
        method: 'post',
        body: wishlistItems,
      }),
      invalidatesTags: ['wishlist'],
    }),
    addToWishlist: builder.mutation<IGetLoggedUserWishList, string>({
      query: (productId: string) => ({
        url: `/wishlist`,
        method: 'post',
        body: { productId },
      }),
      invalidatesTags: ['wishlist'],
    }),
    removeFromWishlist: builder.mutation<IGetLoggedUserWishList, string>({
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
  useSyncWishlistAfterLoginMutation,
} = wishlistApi;
