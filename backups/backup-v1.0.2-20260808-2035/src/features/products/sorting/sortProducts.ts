import type { Product } from "../types/product.types";

export type ProductSortType =
  "default" | "name-asc" | "name-desc" | "featured" | "newest" | "oldest";

export function sortProducts(
  products: Product[],
  sort: ProductSortType
): Product[] {
  const result = [...products];

  switch (sort) {
    case "name-asc":
      return result.sort((a, b) => a.title.localeCompare(b.title));

    case "name-desc":
      return result.sort((a, b) => b.title.localeCompare(a.title));

    case "featured":
      return result.sort((a, b) => Number(b.featured) - Number(a.featured));

    case "newest":
      return result.sort((a, b) => b.id.localeCompare(a.id));

    case "oldest":
      return result.sort((a, b) => a.id.localeCompare(b.id));

    default:
      return result;
  }
}
