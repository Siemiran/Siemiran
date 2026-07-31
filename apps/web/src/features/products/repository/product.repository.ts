import { products } from "../data/products";
import type { Product } from "../types/product.types";

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByBrand(brandId: string): Product[] {
  return products.filter((p) => p.brandId === brandId);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getProductsByFamily(familyId: string): Product[] {
  return products.filter((p) => p.familyId === familyId);
}

export function getProductsBySeries(seriesId: string): Product[] {
  return products.filter((p) => p.seriesId === seriesId);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();

  return products.filter((product) =>
    [
      product.title,
      product.partNumber,
      product.shortDescription,
      product.brandId,
      product.familyId,
      product.seriesId ?? "",
    ]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getInStockProducts(): Product[] {
  return products.filter((p) => p.inStock);
}
