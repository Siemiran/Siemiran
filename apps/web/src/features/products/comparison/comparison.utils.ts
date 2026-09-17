import type { ProductId } from "../copy/product-copy.public-types";

export const MAX_COMPARISON_PRODUCTS = 4;

export function addComparisonProduct(
  productIds: readonly ProductId[],
  productId: ProductId,
  maxProducts = MAX_COMPARISON_PRODUCTS
): ProductId[] {
  if (productIds.includes(productId)) {
    return [...productIds];
  }

  if (productIds.length >= maxProducts) {
    return [...productIds];
  }

  return [...productIds, productId];
}

export function removeComparisonProduct(
  productIds: readonly ProductId[],
  productId: ProductId
): ProductId[] {
  return productIds.filter((id) => id !== productId);
}

export function hasComparisonProduct(
  productIds: readonly ProductId[],
  productId: ProductId
): boolean {
  return productIds.includes(productId);
}
