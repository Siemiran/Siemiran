import type { ProductListItemViewModel } from "../copy/product-copy.public-types";

export function getFamilies(
  items: readonly ProductListItemViewModel[],
  category?: string
) {
  const source =
    category && category !== "all"
      ? items.filter((item) => item.product.categoryId === category)
      : items;

  return Array.from(
    new Set(source.map((item) => item.product.familyId))
  ).sort();
}

export function filterByFamily(
  items: ProductListItemViewModel[],
  family?: string
) {
  if (!family || family === "all") {
    return items;
  }

  return items.filter((item) => item.product.familyId === family);
}
