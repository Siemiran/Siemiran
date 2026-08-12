import type { Product } from "../types/product.types";

export function getFamilies(products: Product[], category?: string) {
  const source =
    category && category !== "all"
      ? products.filter((p) => p.categoryId === category)
      : products;

  return Array.from(new Set(source.map((p) => p.familyId))).sort();
}

export function filterByFamily(products: Product[], family?: string) {
  if (!family || family === "all") {
    return products;
  }

  return products.filter((p) => p.familyId === family);
}
