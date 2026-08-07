"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useProductSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "all";

  function updateParams(nextSearch: string, nextCategory: string) {
    const params = new URLSearchParams();

    if (nextSearch.trim()) {
      params.set("search", nextSearch);
    }

    if (nextCategory && nextCategory !== "all") {
      params.set("category", nextCategory);
    }

    const query = params.toString();

    router.replace(query ? `/products?${query}` : "/products", {
      scroll: false,
    });
  }

  function setSearch(value: string) {
    updateParams(value, category);
  }

  function setCategory(value: string) {
    updateParams(search, value);
  }

  return {
    search,
    setSearch,

    category,
    setCategory,
  };
}
