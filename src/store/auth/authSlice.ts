import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';
export type TAuthSlice = {
  user: {
    _id: string;
    name: string;
    role: 'user' | 'admin';
    email: string;
  };
  token: string;
};
const { signIn, resetPassword } = authApi.endpoints;

const initialState = {
  user: {
    _id: '',
    name: '',
    email: '',
    role: 'user',
  },
  token: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Logout: (state) => {
      state.user._id = '';
      state.user.name = '';
      state.user.email = '';
      state.user.role = 'user';
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(signIn.matchFulfilled, (state, action) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
    });
    builder.addMatcher(resetPassword.matchFulfilled, (state, action) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
    });
  },
});
export const { Logout } = authSlice.actions;
export default authSlice.reducer;
