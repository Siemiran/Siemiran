import type { ProductListItemViewModel } from "../copy/product-copy.public-types";

export function filterByCategory(
  items: ProductListItemViewModel[],
  category?: string
) {
  if (!category || category === "all") {
    return items;
  }

  return items.filter((item) => item.product.categoryId === category);
}

export function getCategories(items: readonly ProductListItemViewModel[]) {
  return Array.from(
    new Set(items.map((item) => item.product.categoryId))
  ).sort();
}
