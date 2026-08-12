"use client";

import ProductComparisonTable from "./ProductComparisonTable";
import type { Product } from "@/features/products/types/product.types";

interface Props {
  products: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
}

export default function ProductComparisonView({
  products,
  onRemove,
  onClear,
}: Props) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Compare Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare selected products side by side.
          </p>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Clear comparison
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => onRemove(product.id)}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
          >
            {product.title} ×
          </button>
        ))}
      </div>

      <ProductComparisonTable products={products} />
    </section>
  );
}
