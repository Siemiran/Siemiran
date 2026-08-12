"use client";

import { useCallback, useEffect, useState } from "react";

import type { Product } from "../types/product.types";

import {
  addComparisonProduct,
  hasComparisonProduct,
  removeComparisonProduct,
  MAX_COMPARISON_PRODUCTS,
} from "../comparison/comparison.utils";

const STORAGE_KEY = "siemiran:product-comparison";

function getStoredProducts(): Product[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed) ? (parsed as Product[]) : [];
  } catch {
    return [];
  }
}

export function useProductComparison() {
  const [products, setProducts] = useState<Product[]>(getStoredProducts);

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

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  return {
    products,
    maxProducts: MAX_COMPARISON_PRODUCTS,
    addProduct,
    removeProduct,
    clearProducts,
    hasProduct,
  };
}
