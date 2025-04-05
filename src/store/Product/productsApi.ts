import { TGetProductResponse, TGetProductsResponse } from '@types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '@store/baseQuery';

export const productsApi = createApi({
  reducerPath: 'productsapi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['getProducts'],
  endpoints: (builder) => ({
    getProducts: builder.query<TGetProductsResponse, string>({
      query: (stringQuery = '') => `products${stringQuery}`,
      providesTags: ['getProducts'],
    }),
    getProduct: builder.query<TGetProductResponse, string>({
      query: (id) => `products/${id}`,
    }),
    addProduct: builder.mutation<TGetProductResponse, FormData>({
      query: (body) => ({
        url: `products`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['getProducts'],
    }),
    updateProduct: builder.mutation<
      TGetProductResponse,
      { data: FormData; id: string }
    >({
      query: ({ data, id }) => ({
        url: `products/${id}`,
        method: 'put',
        body: data,
      }),
      invalidatesTags: ['getProducts'],
    }),
    removeProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['getProducts'],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
} = productsApi;
