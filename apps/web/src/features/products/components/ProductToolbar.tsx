"use client";

import { useTranslations } from "next-intl";

import ProductSearch from "./ProductSearch";

interface ProductToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ProductToolbar({
  search,
  onSearchChange,
}: ProductToolbarProps) {
  const t = useTranslations("Products");

  return (
    <section className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full max-w-xl">
        <ProductSearch value={search} onChange={onSearchChange} />
      </div>

      <div className="text-sm text-slate-500">
        {t("toolbar")}
      </div>
    </section>
  );
}
