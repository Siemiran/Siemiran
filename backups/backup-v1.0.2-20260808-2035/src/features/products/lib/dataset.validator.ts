import { validateProduct } from "./product.validator";

import type { ProductDataset } from "@/features/products/data/products.schema";

export function validateDataset(dataset: ProductDataset) {
  const errors: string[] = [];

  dataset.products.forEach((product) => {
    const result = validateProduct(product);

    if (!result.valid) {
      errors.push(
        `${product.partNumber || product.id}: ${result.errors.join(", ")}`
      );
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}