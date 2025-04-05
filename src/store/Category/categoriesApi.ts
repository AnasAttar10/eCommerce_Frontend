import { createApi } from '@reduxjs/toolkit/query/react';
import {
  TGetCategoryResponse,
  TGetCategoriesResponse,
  TGetSubCategoriesResponse,
} from '@types';
import { dynamicBaseQuery } from '@store/baseQuery';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['getCategories'],
  endpoints: (builder) => ({
    getCategories: builder.query<TGetCategoriesResponse, string>({
      query: (queryString) => `categories${queryString}`,
      providesTags: ['getCategories'],
    }),
    getSubcategoriesBasedOnCategory: builder.query<
      TGetSubCategoriesResponse,
      string
    >({
      query: (categoryId) => `categories/${categoryId}/subCategories`,
    }),
    getCategory: builder.query<TGetCategoryResponse, string>({
      query: (id) => `categories/${id}`,
    }),
    addCategory: builder.mutation<TGetCategoryResponse, FormData>({
      query: (body) => ({
        url: `categories`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['getCategories'],
    }),
    updateCategory: builder.mutation<
      TGetCategoryResponse,
      { data: FormData; id: string }
    >({
      query: ({ data, id }) => ({
        url: `categories/${id}`,
        method: 'put',
        body: data,
      }),
      invalidatesTags: ['getCategories'],
    }),
    removeCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['getCategories'],
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useGetSubcategoriesBasedOnCategoryQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,
} = categoriesApi;
