"use client";

import { useMemo } from "react";

import type { Product } from "../types/product.types";
import { filterByCategory } from "../filters/category.filter";
import { filterByFamily } from "../filters/family.filter";
import { filterBySeries } from "../filters/series.filter";
import { filterByProductType } from "../filters/productType.filter";
import { sortProducts, type ProductSortType } from "../sorting/sortProducts";

interface Props {
  products: Product[];
  search: string;
  category?: string;
  family?: string;
  series?: string;
  productType?: string;
  sort: ProductSortType;
}

export function useProductFilters({
  products,
  search,
  category,
  family,
  series,
  productType,
  sort,
}: Props) {
  const filteredProducts = useMemo(() => {
    let result = [...products];

    result = filterByCategory(result, category);
    result = filterByFamily(result, family);
    result = filterBySeries(result, series);
    result = filterByProductType(result, productType);

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
    result = sortProducts(result, sort);
    result = sortProducts(result, sort);

    return result;
  }, [products, search, category, family, series, productType, sort]);

  return {
    filteredProducts,
  };
}
