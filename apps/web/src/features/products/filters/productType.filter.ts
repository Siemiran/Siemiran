import type { ProductListItemViewModel } from "../copy/product-copy.public-types";

export function getProductTypes(
  items: readonly ProductListItemViewModel[],
  series?: string
): string[] {
  const source =
    series && series !== "all"
      ? items.filter((item) => item.product.seriesId === series)
      : items;

  return Array.from(
    new Set(
      source
        .map((item) => item.product.productTypeId)
        .filter((item): item is string => Boolean(item))
    )
  ).sort();
}

export function filterByProductType(
  items: ProductListItemViewModel[],
  productType?: string
) {
  if (!productType || productType === "all") {
    return items;
  }

  return items.filter((item) => item.product.productTypeId === productType);
}
