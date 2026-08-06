import type { Product } from "@/features/products/types/product.types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateProduct(
  product: Product,
): ValidationResult {
  const errors: string[] = [];

  if (!product.id.trim()) {
    errors.push("Missing product id");
  }

  if (!product.slug.trim()) {
    errors.push("Missing slug");
  }

  if (!product.title.trim()) {
    errors.push("Missing title");
  }

  if (!product.brandId.trim()) {
    errors.push("Missing brand");
  }

  if (!product.categoryId.trim()) {
    errors.push("Missing category");
  }

  if (!product.familyId.trim()) {
    errors.push("Missing family");
  }

  if (!product.partNumber.trim()) {
    errors.push("Missing part number");
  }

  if (
    product.images.length === 0 ||
    !product.images[0].trim()
  ) {
    errors.push("Missing image");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}