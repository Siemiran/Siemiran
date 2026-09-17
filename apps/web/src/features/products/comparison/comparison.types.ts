import type {
  ProductId,
  ProductListItemViewModel,
} from "../copy/product-copy.public-types";

export interface ProductComparisonState {
  productIds: readonly ProductId[];
  products: readonly ProductListItemViewModel[];
  maxProducts: number;
}

export interface ProductComparisonActions {
  addProduct: (productId: ProductId) => void;
  removeProduct: (productId: ProductId) => void;
  clearProducts: () => void;
  hasProduct: (productId: ProductId) => boolean;
}

export interface ProductComparison
  extends ProductComparisonState, ProductComparisonActions {}
