import { validateProduct } from "./product.validator";

import type { ProductDataset } from "@/features/products/data/products.schema";

export function validateDataset(dataset: ProductDataset) {
  const errors: string[] = [];

  const productIds = new Set<string>();
  const partNumbers = new Set<string>();

  dataset.products.forEach((product) => {
    const result = validateProduct(product);

    if (!result.valid) {
      errors.push(
        `${product.partNumber || product.id}: ${result.errors.join(", ")}`
      );
    }

    if (product.id) {
      if (productIds.has(product.id)) {
        errors.push(`Duplicate product id: ${product.id}`);
      } else {
        productIds.add(product.id);
      }
    }

    if (product.partNumber) {
      if (partNumbers.has(product.partNumber)) {
        errors.push(`Duplicate part number: ${product.partNumber}`);
      } else {
        partNumbers.add(product.partNumber);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
