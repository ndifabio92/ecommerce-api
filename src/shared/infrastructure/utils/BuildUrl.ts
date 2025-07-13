export const BuildUrl = (
  pageNum: number | null,
  limit: number,
  sort: string | undefined,
  searchQuery: string | undefined,
  baseUrl: string
) => {
  if (!pageNum) return null;

  const queryParams = new URLSearchParams();
  queryParams.append("page", pageNum?.toString());
  queryParams.append("limit", limit?.toString());

  if (sort) queryParams.append("sort", sort);
  if (searchQuery) queryParams.append("query", searchQuery);

  return `${baseUrl}?${queryParams.toString()}`;
};
