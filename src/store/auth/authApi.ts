import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@store/baseQuery';
import { TSignInRequest, TSignInResponse, TSignUpRequest } from '@types';
import { TForgotPasswordResponse } from '@validations/forgotPasswordSchema';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<void, TSignUpRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'post',
        body,
      }),
    }),
    signIn: builder.mutation<TSignInResponse, TSignInRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'post',
        body,
      }),
    }),
    forgotPassword: builder.mutation<
      TForgotPasswordResponse,
      { email: string }
    >({
      query: (body) => ({
        url: '/auth/forgotPassword',
        method: 'post',
        body,
      }),
    }),
    verifyCode: builder.mutation<void, { resetCode: string }>({
      query: (body) => ({
        url: '/auth/verifyResetCode',
        method: 'post',
        body,
      }),
    }),
    resetPassword: builder.mutation<
      TSignInResponse,
      { email: string; newPassword: string }
    >({
      query: (body) => ({
        url: '/auth/resetPassword',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} = authApi;
