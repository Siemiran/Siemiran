import type { Product } from "../types/product.types";

export function getProductTypes(
  products: Product[],
  series?: string
): string[] {
  const source =
    series && series !== "all"
      ? products.filter((p) => p.seriesId === series)
      : products;

  return Array.from(
    new Set(
      source
        .map((p) => p.productTypeId)
        .filter((item): item is string => Boolean(item))
    )
  ).sort();
}

export function filterByProductType(products: Product[], productType?: string) {
  if (!productType || productType === "all") {
    return products;
  }

  return products.filter((p) => p.productTypeId === productType);
}
