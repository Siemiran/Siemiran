"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useProductSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const family = searchParams.get("family") || "all";
  const series = searchParams.get("series") || "all";

  function updateParams(
    nextSearch: string,
    nextCategory: string,
    nextFamily: string,
    nextSeries: string
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

    const query = params.toString();

    router.replace(query ? `/products?${query}` : "/products", {
      scroll: false,
    });
  }

  function setSearch(value: string) {
    updateParams(value, category, family, series);
  }

  function setCategory(value: string) {
    updateParams(search, value, "all", "all");
  }

  function setFamily(value: string) {
    updateParams(search, category, value, "all");
  }

  function setSeries(value: string) {
    updateParams(search, category, family, value);
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
  };
}
