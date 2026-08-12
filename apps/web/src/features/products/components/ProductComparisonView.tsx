"use client";

import Link from "next/link";

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
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-7xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <span className="text-2xl" aria-hidden="true">
              ⇄
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Compare Products
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            No products have been selected for comparison yet. Select products
            from the products page to compare them side by side.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to Products
          </Link>
        </div>
      </section>
    );
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
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
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
            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
            aria-label={`Remove ${product.title} from comparison`}
          >
            {product.title} ×
          </button>
        ))}
      </div>

      <ProductComparisonTable products={products} />
    </section>
  );
}
