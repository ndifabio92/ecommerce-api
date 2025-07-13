export interface PaginationResult<T> {
  status: "success" | "error";
  payload: T[];
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevLink: string | null;
  nextLink: string | null;
}
