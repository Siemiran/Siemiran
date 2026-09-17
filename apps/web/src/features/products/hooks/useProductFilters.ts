"use client";

import { useMemo } from "react";

import type { ProductListItemViewModel } from "../copy/product-copy.public-types";
import { filterByCategory } from "../filters/category.filter";
import { filterByFamily } from "../filters/family.filter";
import { filterBySeries } from "../filters/series.filter";
import { filterByProductType } from "../filters/productType.filter";
import { sortProducts, type ProductSortType } from "../sorting/sortProducts";
import { matchesProductSearch } from "../presentation/product.search";

interface Props {
  items: readonly ProductListItemViewModel[];
  search: string;
  category?: string;
  family?: string;
  series?: string;
  productType?: string;
  sort: ProductSortType;
}

export function useProductFilters({
  items,
  search,
  category,
  family,
  series,
  productType,
  sort,
}: Props) {
  const filteredProducts = useMemo(() => {
    let result = [...items];

    result = filterByCategory(result, category);
    result = filterByFamily(result, family);
    result = filterBySeries(result, series);
    result = filterByProductType(result, productType);

    if (search.trim()) {
      result = result.filter((item) => matchesProductSearch(item, search));
    }
    result = sortProducts(result, sort);

    return result;
  }, [items, search, category, family, series, productType, sort]);

  return {
    filteredProducts,
  };
}
