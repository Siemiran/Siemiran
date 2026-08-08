"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ProductSortType } from "../sorting/sortProducts";

export function useProductSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const family = searchParams.get("family") || "all";
  const series = searchParams.get("series") || "all";
  const productType = searchParams.get("productType") || "all";

  const sort = (searchParams.get("sort") as ProductSortType) || "default";

  function updateParams(
    nextSearch: string,
    nextCategory: string,
    nextFamily: string,
    nextSeries: string,
    nextProductType: string,
    nextSort: ProductSortType,
    resetPage = true
  ) {
    const params = new URLSearchParams();

    if (nextSearch.trim()) {
      params.set("search", nextSearch);
    }

    if (nextCategory !== "all") {
      params.set("category", nextCategory);
    }

    if (nextFamily !== "all") {
      params.set("family", nextFamily);
    }

    if (nextSeries !== "all") {
      params.set("series", nextSeries);
    }

    if (nextProductType !== "all") {
      params.set("productType", nextProductType);
    }

    if (nextSort !== "default") {
      params.set("sort", nextSort);
    }

    if (!resetPage) {
      const currentPage = searchParams.get("page");

      if (currentPage && currentPage !== "1") {
        params.set("page", currentPage);
      }
    }

    const query = params.toString();

    router.replace(query ? `/products?${query}` : "/products", {
      scroll: false,
    });
  }

  function setSearch(value: string) {
    updateParams(value, category, family, series, productType, sort, true);
  }

  function setCategory(value: string) {
    updateParams(search, value, "all", "all", "all", sort, true);
  }

  function setFamily(value: string) {
    updateParams(search, category, value, "all", "all", sort, true);
  }

  function setSeries(value: string) {
    updateParams(search, category, family, value, "all", sort, true);
  }

  function setProductType(value: string) {
    updateParams(search, category, family, series, value, sort, true);
  }

  function setSort(value: ProductSortType) {
    updateParams(search, category, family, series, productType, value, true);
  }

  function clearFilters() {
    updateParams(search, "all", "all", "all", "all", "default", true);
  }

  return {
    search,
    setSearch,

    category,
    setCategory,

    family,
    setFamily,

    series,
    setSeries,

    productType,
    setProductType,

    sort,
    setSort,

    clearFilters,
  };
}
