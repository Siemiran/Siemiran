import type { Product } from "@/features/products/types/product.types";

export interface ProductDataset {
  version: string;

  brand: string;

  generatedAt: string;

  source: string;

  products: Product[];
}

export function validateDataset(dataset: ProductDataset): boolean {
  return (
    !!dataset.version &&
    !!dataset.brand &&
    Array.isArray(dataset.products)
  );
}
