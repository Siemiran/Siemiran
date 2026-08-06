"use client";

import ProductSearch from "./ProductSearch";

interface ProductToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ProductToolbar({
  search,
  onSearchChange,
}: ProductToolbarProps) {
  return (
    <section className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full max-w-xl">
        <ProductSearch value={search} onChange={onSearchChange} />
      </div>

      <div className="text-sm text-slate-500">
        Industrial Automation Products
      </div>
    </section>
  );
}
