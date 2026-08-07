"use client";

import { useMemo } from "react";

import type { Product } from "../types/product.types";
import { filterByCategory } from "../filters/category.filter";
import { filterByFamily } from "../filters/family.filter";
import { filterBySeries } from "../filters/series.filter";

interface Props {
  products: Product[];
  search: string;
  category?: string;
  family?: string;
  series?: string;
}

export function useProductFilters({
  products,
  search,
  category,
  family,
  series,
}: Props) {
  const filteredProducts = useMemo(() => {
    let result = [...products];

    result = filterByCategory(result, category);
    result = filterByFamily(result, family);
    result = filterBySeries(result, series);

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
  }, [products, search, category, family, series]);

  return {
    filteredProducts,
  };
}
