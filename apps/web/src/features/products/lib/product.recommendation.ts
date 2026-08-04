import type { Product } from "../types/product.types";

export function getRelatedProducts(
  current: Product,
  products: Product[],
  limit = 8
): Product[] {
  const scores = new Map<string, number>();

  for (const product of products) {
    if (product.id === current.id) continue;

    let score = 0;

    if (product.productTypeId === current.productTypeId) score += 100;
    if (product.seriesId === current.seriesId) score += 60;
    if (product.familyId === current.familyId) score += 40;
    if (product.categoryId === current.categoryId) score += 20;
    if (product.brandId === current.brandId) score += 10;

    if (score > 0) {
      scores.set(product.id, score);
    }
  }

  return products
    .filter((p) => scores.has(p.id))
    .sort((a, b) => scores.get(b.id)! - scores.get(a.id)!)
    .slice(0, limit);
}
