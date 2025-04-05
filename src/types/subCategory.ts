import { TApiResponse } from './ApiResponse';

export type TSubCategory = {
  _id: string;
  name: string;
  slug?: string;
  category: string;
};

export type TGetSubCategoriesResponse = TApiResponse<TSubCategory[]>;

export type TGetSubCategoryResponse = TApiResponse<TSubCategory>;

export type TAddSubCategoryRequest = Omit<TSubCategory, '_id'>;

export type TUpdateSubCategoryRequest = Partial<TSubCategory>;
