import { TApiResponse } from './ApiResponse';

export type TCategory = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type TGetCategoriesResponse = TApiResponse<TCategory[]>;

export type TGetCategoryResponse = TApiResponse<TCategory>;
