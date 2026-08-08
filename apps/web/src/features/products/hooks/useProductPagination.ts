"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useProductPagination() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawPage = searchParams.get("page");

  const page =
    rawPage && /^\d+$/.test(rawPage) ? Math.max(1, Number(rawPage)) : 1;

  function setPage(value: number) {
    const nextPage = Math.max(1, Math.floor(value));

    const params = new URLSearchParams(searchParams.toString());

    if (nextPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }

    const query = params.toString();

    router.replace(query ? `/products?${query}` : "/products", {
      scroll: false,
    });
  }

  return {
    page,
    setPage,
  };
}
