import { createApi } from '@reduxjs/toolkit/query/react';
import {
  TGetCouponsResponse,
  TGetCouponResponse,
  TAddCouponRequest,
  TUpdateCouponRequest,
} from '@types';
import { baseQueryWithToken } from '@store/baseQuery';

export const couponApi = createApi({
  reducerPath: 'couponApi',
  baseQuery: baseQueryWithToken,
  tagTypes: ['getCoupons'],
  endpoints: (builder) => ({
    getCoupons: builder.query<TGetCouponsResponse, string>({
      query: (queryString) => ({
        url: `/coupons${queryString}`,
        method: 'get',
      }),
      providesTags: ['getCoupons'],
    }),
    getCoupon: builder.query<TGetCouponResponse, string>({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: 'get',
      }),
    }),
    addCoupon: builder.mutation<TGetCouponResponse, TAddCouponRequest>({
      query: (body) => ({
        url: `coupons`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['getCoupons'],
    }),
    updateCoupon: builder.mutation<
      TGetCouponResponse,
      { data: TUpdateCouponRequest; id: string }
    >({
      query: ({ data, id }) => ({
        url: `coupons/${id}`,
        method: 'put',
        body: data,
      }),
      invalidatesTags: ['getCoupons'],
    }),
    removeCoupon: builder.mutation<void, string>({
      query: (id) => ({
        url: `coupons/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['getCoupons'],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useGetCouponQuery,
  useAddCouponMutation,
  useUpdateCouponMutation,
  useRemoveCouponMutation,
} = couponApi;
