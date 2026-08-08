import type { Product } from "../types/product.types";

export interface PaginatedProducts {
  items: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export function paginateProducts(
  products: Product[],
  page: number,
  pageSize: number
): PaginatedProducts {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = products.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  const currentPage = Math.min(Math.max(1, page), totalPages);

  const startIndex = (currentPage - 1) * safePageSize;

  const endIndex = startIndex + safePageSize;

  return {
    items: products.slice(startIndex, endIndex),
    currentPage,
    totalPages,
    totalItems,
    pageSize: safePageSize,
  };
}
