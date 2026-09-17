export interface PaginatedProducts<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export function paginateProducts<T>(
  items: readonly T[],
  page: number,
  pageSize: number
): PaginatedProducts<T> {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = items.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  const currentPage = Math.min(Math.max(1, page), totalPages);

  const startIndex = (currentPage - 1) * safePageSize;

  const endIndex = startIndex + safePageSize;

  return {
    items: items.slice(startIndex, endIndex),
    currentPage,
    totalPages,
    totalItems,
    pageSize: safePageSize,
  };
}
