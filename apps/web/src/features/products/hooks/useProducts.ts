import {
  getFeaturedProducts,
  getProducts,
} from "@/features/products/repository/product.repository";

import type { Product } from "@/features/products/types/product.types";

export interface UseProductsResult {
  products: Product[];
  featured: Product[];
}

export function useProducts(): UseProductsResult {
  return {
    products: getProducts(),
    featured: getFeaturedProducts(),
  };
}