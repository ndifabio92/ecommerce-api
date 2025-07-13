export interface PaginationParamsDto {
  limit: number;
  page: number;
  sort?: "asc" | "desc";
  query?: string;
  baseUrl: string;
}
