import { createApi } from '@reduxjs/toolkit/query/react';
import { TGetBrandsResponse, TGetBrandResponse } from '@types';
import { dynamicBaseQuery } from '@store/baseQuery';

export const brandsApi = createApi({
  reducerPath: 'brandsApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['getBrands'],
  endpoints: (builder) => ({
    getBrands: builder.query<TGetBrandsResponse, string>({
      query: (queryString) => `brands${queryString}`,
      providesTags: ['getBrands'],
    }),
    getBrand: builder.query<TGetBrandResponse, string>({
      query: (id) => `brands/${id}`,
    }),
    addBrand: builder.mutation<TGetBrandResponse, FormData>({
      query: (body) => ({
        url: `brands`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['getBrands'],
    }),
    updateBrand: builder.mutation<
      TGetBrandResponse,
      { data: FormData; id: string }
    >({
      query: ({ data, id }) => ({
        url: `brands/${id}`,
        method: 'put',
        body: data,
      }),
      invalidatesTags: ['getBrands'],
    }),
    removeBrand: builder.mutation<void, string>({
      query: (id) => ({
        url: `brands/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['getBrands'],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useRemoveBrandMutation,
} = brandsApi;
