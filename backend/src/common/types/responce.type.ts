export interface Pagination {
  nextCursor: string | null;
  hasNextPage: boolean;
}

export interface ControllerResponse<T> {
  data?: T;
  message: string;
  pagination?: Pagination;
}
