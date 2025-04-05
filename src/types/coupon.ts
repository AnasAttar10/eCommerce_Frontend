import { TApiResponse } from './ApiResponse';

export type TCoupon = {
  _id: string;
  name: string;
  expire: Date;
  discount: number;
};

export type TGetCouponsResponse = TApiResponse<TCoupon[]>;
export type TGetCouponResponse = TApiResponse<TCoupon>;
export type TAddCouponRequest = Omit<TCoupon, '_id'>;
export type TUpdateCouponRequest = Partial<TCoupon>;
