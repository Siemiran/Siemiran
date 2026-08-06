"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useProductSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";

  function setSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`/products?${params.toString()}`, {
      scroll: false,
    });
  }

  return {
    search,
    setSearch,
  };
}
