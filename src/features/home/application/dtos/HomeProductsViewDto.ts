export interface HomeProductsViewDto {
  products: any[];
  pagination: {
    page: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevLink: string | null;
    nextLink: string | null;
  };
  query: string;
  sort: string;
  limit: number;
} 