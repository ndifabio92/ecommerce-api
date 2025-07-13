export const Pagination = (totalCount: number, limit: number, page: number) => {
  const totalPages = Math.ceil(totalCount / limit);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;
  const prevPage = hasPrevPage ? page - 1 : null;
  const nextPage = hasNextPage ? page + 1 : null;

  return {
    totalPages,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  };
};
