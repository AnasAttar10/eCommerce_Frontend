export type TPaginationResult = {
  currentPage: number;
  limit?: number;
  numOfPages: number;
  next?: number;
  prev?: number;
};
export type TApiResponse<T> = {
  result?: number;
  paginationResult?: TPaginationResult;
  data: T;
};
