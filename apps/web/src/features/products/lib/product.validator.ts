import type { Product } from "@/features/products/types/product.types";

export interface ValidationResult {
  valid: boolean;

  errors: string[];
}

export function validateProduct(product: Product): ValidationResult {
  const errors: string[] = [];

  if (!product.id) errors.push("Missing product id");

  if (!product.slug) errors.push("Missing slug");

  if (!product.title) errors.push("Missing title");

  if (!product.brandId) errors.push("Missing brand");

  if (!product.categoryId) errors.push("Missing category");

  if (!product.familyId) errors.push("Missing family");

  if (!product.partNumber) errors.push("Missing part number");

  if (product.images[0]) errors.push("Missing image");

  return {
    valid: errors.length === 0,
    errors,
  };
}
