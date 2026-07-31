import { products } from "@/features/products/data/products";
import type { Product } from "@/features/products/types/product.types";

export interface UseProductsResult {
  products: Product[];
  featured: Product[];
}

export function useProducts(): UseProductsResult {
  return {
    products,
    featured: products.filter((product) => product.featured),
  };
}
