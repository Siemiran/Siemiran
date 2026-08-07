"use client";

import { useMemo } from "react";

import type { Product } from "../types/product.types";
import { filterByCategory } from "../filters/category.filter";

interface Props {
  products: Product[];
  search: string;
  category?: string;
}

export function useProductFilters({ products, search, category }: Props) {
  const filteredProducts = useMemo(() => {
    let result = [...products];

    result = filterByCategory(result, category);

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter((product) => {
        return (
          product.title.toLowerCase().includes(q) ||
          product.partNumber.toLowerCase().includes(q) ||
          product.shortDescription.toLowerCase().includes(q)
        );
      });
    }

    return result;
  }, [products, search, category]);

  return {
    filteredProducts,
  };
}
