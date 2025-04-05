import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from '@store/baseQuery';
import {
  TChangeMyPasswordRequest,
  TChangeMyPasswordResponse,
  TGetUserResponse,
  TUpdateMeRequest,
} from '@types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithToken,
  tagTypes: ['user'],
  endpoints: (builders) => ({
    getMe: builders.query<TGetUserResponse, void>({
      query: () => 'users/getMe',
      providesTags: ['user'],
    }),
    updateMe: builders.mutation<TGetUserResponse, TUpdateMeRequest>({
      query: (body) => ({
        url: 'users/updateMe',
        method: 'put',
        body,
      }),
      invalidatesTags: ['user'],
    }),
    changeMyPassword: builders.mutation<
      TChangeMyPasswordResponse,
      TChangeMyPasswordRequest
    >({
      query: (body) => ({
        url: 'users/changeMyPassword',
        method: 'put',
        body,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});
export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useChangeMyPasswordMutation,
} = userApi;
