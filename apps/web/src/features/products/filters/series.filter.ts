import type { ProductListItemViewModel } from "../copy/product-copy.public-types";

export function getSeries(
  items: readonly ProductListItemViewModel[],
  family?: string
): string[] {
  const source =
    family && family !== "all"
      ? items.filter((item) => item.product.familyId === family)
      : items;

  return Array.from(
    new Set(
      source
        .map((item) => item.product.seriesId)
        .filter((series): series is string => Boolean(series))
    )
  ).sort();
}

export function filterBySeries(
  items: ProductListItemViewModel[],
  series?: string
) {
  if (!series || series === "all") {
    return items;
  }

  return items.filter((item) => item.product.seriesId === series);
}
