import { createApi } from '@reduxjs/toolkit/query/react';
import {
  TGetSubCategoryResponse,
  TGetSubCategoriesResponse,
  TAddSubCategoryRequest,
  TUpdateSubCategoryRequest,
} from '@types';
import { dynamicBaseQuery } from '@store/baseQuery';

export const subCategoriesApi = createApi({
  reducerPath: 'subCategoriesApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['getSubCategories'],
  endpoints: (builder) => ({
    getAllSubCategories: builder.query<TGetSubCategoriesResponse, string>({
      query: (queryString) => `/subCategories${queryString}`,
      providesTags: ['getSubCategories'],
    }),
    getSubCategories: builder.query<TGetSubCategoriesResponse, string>({
      query: (categoryId) => `categories/${categoryId}/subCategories`,
      providesTags: ['getSubCategories'],
    }),
    getSubCategory: builder.query<TGetSubCategoryResponse, string>({
      query: (id) => `subCategories/${id}`,
    }),
    addSubCategory: builder.mutation<
      TGetSubCategoryResponse,
      { data: TAddSubCategoryRequest; categoryId: string }
    >({
      query: ({ data: body, categoryId }) => ({
        url: `categories/${categoryId}/subCategories`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['getSubCategories'],
    }),
    updateSubCategory: builder.mutation<
      TGetSubCategoryResponse,
      { data: TUpdateSubCategoryRequest; subCategoryId: string }
    >({
      query: ({ data, subCategoryId }) => ({
        url: `subCategories/${subCategoryId}`,
        method: 'put',
        body: data,
      }),
      invalidatesTags: ['getSubCategories'],
    }),
    removeSubCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `subCategories/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['getSubCategories'],
    }),
  }),
});
export const {
  useGetAllSubCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubCategoryQuery,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useRemoveSubCategoryMutation,
} = subCategoriesApi;
