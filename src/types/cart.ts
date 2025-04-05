import { TProduct } from './product';

export type TCartItem = {
  _id: string;
  product: TProduct;
  quantity: number;
  color: string;
  price: number;
};
export type TCart = {
  _id: string;
  cartItems: TCartItem[];
  totalCartPrice: number;
  totalPriceAfterDiscount?: number;
  user: string;
};
export type TCartResponse = {
  status: string;
  message: string;
  numOfCartItems: number;
  data: TCart;
};
