import type { Product } from "@/features/products/types/product.types";

export function getProductBySlug(products: Product[], slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByBrand(products: Product[], brandId: string) {
  return products.filter((p) => p.brandId === brandId);
}

export function getProductsByCategory(products: Product[], categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getProductsByFamily(products: Product[], familyId: string) {
  return products.filter((p) => p.familyId === familyId);
}

export function searchProducts(products: Product[], keyword: string) {
  const query = keyword.toLowerCase();

  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.partNumber.toLowerCase().includes(query) ||
      product.slug.toLowerCase().includes(query)
  );
}
