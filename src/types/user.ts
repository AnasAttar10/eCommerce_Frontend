import { TAddress } from './address';

export type TUser = {
  _id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  profileImg: string;
  password: string;
  passwordChangedAt: Date;
  passwordResetCode?: string;
  passwordResetExpires?: number;
  passwordResetVerified?: boolean;
  role: 'user' | 'manager' | 'admin';
  active: boolean;
  wishlist: string[];
  addresses: TAddress[];
};

export type TGetUserResponse = {
  data: TUser;
};
export type TChangeMyPasswordResponse = {
  data: TUser;
  token: string;
};
export type TUpdateMeRequest = {
  name: string;
  email: string;
  phone?: string;
};
export type TChangeMyPasswordRequest = {
  password: string;
  currentPassword: string;
  passwordConfirm: string;
};

/// auth

export type TSignUpRequest = {
  name: string;
  confirmPassword: string;
  email: string;
  password: string;
};
export type TSignInRequest = {
  email: string;
  password: string;
};
export type TSignInResponse = {
  token: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  };
};
