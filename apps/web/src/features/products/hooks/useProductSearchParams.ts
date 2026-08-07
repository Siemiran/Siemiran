"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useProductSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const family = searchParams.get("family") || "all";
  const series = searchParams.get("series") || "all";
  const productType = searchParams.get("productType") || "all";

  function updateParams(
    nextSearch: string,
    nextCategory: string,
    nextFamily: string,
    nextSeries: string,
    nextProductType: string
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

    const query = params.toString();

    router.replace(query ? `/products?${query}` : "/products", {
      scroll: false,
    });
  }

  function setSearch(value: string) {
    updateParams(value, category, family, series, productType);
  }

  function setCategory(value: string) {
    updateParams(search, value, "all", "all", "all");
  }

  function setFamily(value: string) {
    updateParams(search, category, value, "all", "all");
  }

  function setSeries(value: string) {
    updateParams(search, category, family, value, "all");
  }

  function setProductType(value: string) {
    updateParams(search, category, family, series, value);
  }
  function clearFilters() {
    updateParams(search, "all", "all", "all", "all");
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

    clearFilters,
  };
}
