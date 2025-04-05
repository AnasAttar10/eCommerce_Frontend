import { TAddress } from './address';
import { TApiResponse } from './ApiResponse';
import { TCartItem } from './cart';
import { TUser } from './user';

export type TOrder = {
  _id: string;
  user: TUser;
  cartItems: TCartItem[];
  taxPrice: number;
  shippingAddress: TAddress;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: 'card' | 'cash';
  isPaid: boolean;
  isDelivered: boolean;
  paidAt: Date;
  deliveredAt: Date;
};

export type TGetOrdersResponse = TApiResponse<TOrder[]>;

export type TGetOrderResponse = TApiResponse<TOrder>;
