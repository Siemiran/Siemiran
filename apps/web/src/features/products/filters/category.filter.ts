import type { Product } from "../types/product.types";

export function filterByCategory(
  products: Product[],
  category?: string,
) {
  if (!category || category === "all") {
    return products;
  }

  return products.filter(
    (product) => product.categoryId === category,
  );
}

export function getCategories(products: Product[]) {
  return Array.from(
    new Set(products.map((p) => p.categoryId)),
  ).sort();
}