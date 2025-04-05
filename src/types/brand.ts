import { TPaginationResult } from './ApiResponse';

export type TBrand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type TGetBrandsResponse = {
  results: number;
  paginationResult: TPaginationResult;
  data: TBrand[];
};

export type TGetBrandResponse = {
  results: number;
  paginationResult: TPaginationResult;
  data: TBrand;
};
