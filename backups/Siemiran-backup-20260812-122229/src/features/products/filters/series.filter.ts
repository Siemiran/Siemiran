import type { Product } from "../types/product.types";

export function getSeries(
  products: Product[],
  family?: string,
): string[] {
  const source =
    family && family !== "all"
      ? products.filter((p) => p.familyId === family)
      : products;

  return Array.from(
    new Set(
      source
        .map((p) => p.seriesId)
        .filter((series): series is string => Boolean(series)),
    ),
  ).sort();
}

export function filterBySeries(
  products: Product[],
  series?: string,
) {
  if (!series || series === "all") {
    return products;
  }

  return products.filter(
    (p) => p.seriesId === series,
  );
}