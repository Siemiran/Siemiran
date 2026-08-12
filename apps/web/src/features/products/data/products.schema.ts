import type { Product } from "@/features/products/types/product.types";

export interface ProductDataset {
  version: string;
  brand: string;
  generatedAt: string;
  source: string;
  products: Product[];
}
