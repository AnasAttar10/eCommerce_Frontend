import { createApi } from '@reduxjs/toolkit/query/react';
import { TAddress } from '@types';
import { baseQueryWithToken } from '@store/baseQuery';
import { TAddressResponse } from '@types';

export const addressApi = createApi({
  reducerPath: 'addressapi',
  baseQuery: baseQueryWithToken,
  tagTypes: ['address'],
  endpoints: (builder) => ({
    getLoggedUserAddresses: builder.query<TAddressResponse, void>({
      query: () => ({
        url: `/address`,
        method: 'get',
      }),
      providesTags: ['address'],
    }),
    addAddress: builder.mutation<TAddressResponse, TAddress>({
      query: (body) => ({
        url: `/address`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['address'],
    }),
    removeAddress: builder.mutation<TAddressResponse, string>({
      query: (_id) => ({
        url: `/address/${_id}`,
        method: 'delete',
      }),
      invalidatesTags: ['address'],
    }),
  }),
});

export const {
  useGetLoggedUserAddressesQuery,
  useAddAddressMutation,
  useRemoveAddressMutation,
} = addressApi;
