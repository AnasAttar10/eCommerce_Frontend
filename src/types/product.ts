import { TApiResponse } from './ApiResponse';

export type TProduct = {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  quantity: number;
  sold?: number;
  price: number;
  priceAfterDiscount?: number;
  colors?: string[];
  imageCover: string;
  images?: string[];
  category: string;
  subcategories?: string[];
  brand?: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
};

export type TGetProductsResponse = TApiResponse<TProduct[]>;
export type TGetProductResponse = TApiResponse<
  Omit<TProduct, 'category'> & { category: { _id: string; name: string } }
>;
export type TAddProductRequest = Omit<TProduct, '_id'>;
export type TUpdateProductsRequest = Partial<TProduct>;
