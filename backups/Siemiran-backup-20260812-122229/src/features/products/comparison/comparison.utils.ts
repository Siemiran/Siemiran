import type { Product } from "../types/product.types";

export const MAX_COMPARISON_PRODUCTS = 4;

export function addComparisonProduct(
  products: Product[],
  product: Product,
  maxProducts = MAX_COMPARISON_PRODUCTS
): Product[] {
  if (products.some((item) => item.id === product.id)) {
    return products;
  }

  if (products.length >= maxProducts) {
    return products;
  }

  return [...products, product];
}

export function removeComparisonProduct(
  products: Product[],
  productId: string
): Product[] {
  return products.filter((product) => product.id !== productId);
}

export function hasComparisonProduct(
  products: Product[],
  productId: string
): boolean {
  return products.some((product) => product.id === productId);
}
