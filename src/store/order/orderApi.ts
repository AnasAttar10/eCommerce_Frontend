import { createApi } from '@reduxjs/toolkit/query/react';
import { TGetOrderResponse, TGetOrdersResponse } from '../../types/order';
import { dynamicBaseQuery } from '@store/baseQuery';
import { TAddress } from '@types';
type CheckoutSessionResponse = {
  status: string;
  session: {
    id: string;
    client_secret: string | null;
    url?: string;
  };
};
export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['getOrders'],
  endpoints: (builder) => ({
    getAllOrders: builder.query<TGetOrdersResponse, string>({
      query: (queryString) => `/orders/admin${queryString}`,
      providesTags: ['getOrders'],
    }),
    getUserOrders: builder.query<TGetOrdersResponse, string>({
      query: (queryString) => `/orders${queryString}`,
      providesTags: ['getOrders'],
    }),
    getOrder: builder.query<TGetOrderResponse, string>({
      query: (id) => `/orders/${id}`,
    }),
    addCashOrder: builder.mutation<
      TGetOrderResponse,
      { cartId: string; shippingAddress: TAddress }
    >({
      query: ({ cartId, shippingAddress }) => ({
        url: `/orders/${cartId}`,
        method: 'post',
        body: { shippingAddress },
      }),
      invalidatesTags: ['getOrders'],
    }),
    addCheckoutSession: builder.mutation<
      CheckoutSessionResponse,
      { cartId: string; shippingAddress: TAddress }
    >({
      query: ({ cartId, shippingAddress }) => {
        return {
          url: `/orders/checkout-session/${cartId}`,
          method: 'post',
          body: { shippingAddress },
        };
      },
      invalidatesTags: ['getOrders'],
    }),
    updateOrderToPaid: builder.mutation<TGetOrderResponse, string>({
      query: (id) => ({
        url: `/orders/${id}/pay`,
        method: 'put',
      }),
      invalidatesTags: ['getOrders'],
    }),
    updateOrderToDelivered: builder.mutation<TGetOrderResponse, string>({
      query: (id) => ({
        url: `/orders/${id}/deliver`,
        method: 'put',
      }),
      invalidatesTags: ['getOrders'],
    }),
    removeOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['getOrders'],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
  useGetOrderQuery,
  useAddCashOrderMutation,
  useAddCheckoutSessionMutation,
  useUpdateOrderToDeliveredMutation,
  useUpdateOrderToPaidMutation,
  useRemoveOrderMutation,
} = orderApi;
