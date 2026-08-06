"use client";

import { useMemo } from "react";
import type { Product } from "../types/product.types";

interface UseProductFiltersProps {
  products: Product[];
  search: string;
}

export function useProductFilters({
  products,
  search,
}: UseProductFiltersProps) {
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      return [
        product.title,
        product.partNumber,
        product.shortDescription,
        product.description,
        product.brandId,
        product.categoryId,
        product.familyId,
        product.seriesId ?? "",
        product.productTypeId ?? "",
        ...(product.tags ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [products, search]);

  return {
    filteredProducts,
  };
}
