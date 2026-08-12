import type { Product } from "../types/product.types";

export interface ProductComparisonState {
  products: Product[];
  maxProducts: number;
}

export interface ProductComparisonActions {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearProducts: () => void;
  hasProduct: (productId: string) => boolean;
}

export interface ProductComparison
  extends ProductComparisonState, ProductComparisonActions {}
