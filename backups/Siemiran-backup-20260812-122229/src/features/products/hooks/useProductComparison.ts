"use client";

import { useCallback, useState } from "react";

import type { Product } from "../types/product.types";

import {
  addComparisonProduct,
  hasComparisonProduct,
  removeComparisonProduct,
  MAX_COMPARISON_PRODUCTS,
} from "../comparison/comparison.utils";

export function useProductComparison() {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = useCallback((product: Product) => {
    setProducts((currentProducts) =>
      addComparisonProduct(currentProducts, product, MAX_COMPARISON_PRODUCTS)
    );
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setProducts((currentProducts) =>
      removeComparisonProduct(currentProducts, productId)
    );
  }, []);

  const clearProducts = useCallback(() => {
    setProducts([]);
  }, []);

  const hasProduct = useCallback(
    (productId: string) => hasComparisonProduct(products, productId),
    [products]
  );

  return {
    products,
    maxProducts: MAX_COMPARISON_PRODUCTS,
    addProduct,
    removeProduct,
    clearProducts,
    hasProduct,
  };
}
