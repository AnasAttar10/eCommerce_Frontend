import { createApi } from '@reduxjs/toolkit/query/react';
import { TCartItem, TCartResponse } from '@types';
import { baseQueryWithToken } from '@store/baseQuery';

export const cartApi = createApi({
  reducerPath: 'cartapi',
  baseQuery: baseQueryWithToken,
  tagTypes: ['cart'],
  endpoints: (builder) => ({
    getLoggedUserCart: builder.query<TCartResponse, void>({
      query: () => ({
        url: `/cart`,
        method: 'get',
      }),
      providesTags: ['cart'],
    }),
    syncCartAfterLogin: builder.mutation<
      TCartResponse,
      { cartItems: TCartItem[] }
    >({
      query: (cartItems) => ({
        url: `/cart/sync`,
        method: 'post',
        body: cartItems,
      }),
      invalidatesTags: ['cart'],
    }),
    addProductToCart: builder.mutation<
      TCartResponse,
      { productId: string; color: string | undefined; quantity?: number }
    >({
      query: (body) => ({
        url: `/cart`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['cart'],
    }),
    updateCartItemQuantity: builder.mutation<
      TCartResponse,
      { _id: string; quantity: number }
    >({
      query: ({ _id, quantity }) => ({
        url: `/cart/${_id}`,
        method: 'put',
        body: { quantity },
      }),
      invalidatesTags: ['cart'],
    }),
    removeSpecificCartItem: builder.mutation<TCartResponse, string>({
      query: (_id) => ({
        url: `/cart/${_id}`,
        method: 'delete',
      }),
      invalidatesTags: ['cart'],
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: `/cart`,
        method: 'delete',
      }),
      invalidatesTags: ['cart'],
    }),
    applyCoupon: builder.mutation<void, { coupon: string }>({
      query: (body) => ({
        url: `/cart/applyCoupon`,
        method: 'put',
        body,
      }),
    }),
  }),
});

export const {
  useGetLoggedUserCartQuery,
  useSyncCartAfterLoginMutation,
  useAddProductToCartMutation,
  useUpdateCartItemQuantityMutation,
  useRemoveSpecificCartItemMutation,
  useClearCartMutation,
  useApplyCouponMutation,
} = cartApi;
