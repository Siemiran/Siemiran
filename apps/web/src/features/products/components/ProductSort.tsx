"use client";

import type { ProductSortType } from "../sorting/sortProducts";

interface Props {
  value: ProductSortType;
  onChange: (value: ProductSortType) => void;
}

export default function ProductSort({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-sm font-medium text-slate-700">
        Sort
      </label>

      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as ProductSortType)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition outline-none focus:border-cyan-600"
      >
        <option value="default">Default</option>

        <option value="name-asc">Name A → Z</option>

        <option value="name-desc">Name Z → A</option>

        <option value="featured">Featured</option>

        <option value="newest">Newest</option>

        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
