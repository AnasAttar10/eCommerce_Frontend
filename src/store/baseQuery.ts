import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { RootState } from '.';
import.meta.env;
export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VERSION,
});

export const baseQueryWithToken = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VERSION,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const token = state.auth.token;
  return token
    ? baseQueryWithToken(args, api, extraOptions)
    : baseQuery(args, api, extraOptions);
};
