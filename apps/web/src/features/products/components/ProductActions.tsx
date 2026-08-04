import Link from "next/link";

import type { Product } from "@/features/products/types/product.types";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({
  product,
}: ProductActionsProps) {
  const datasheet = product.documents?.datasheet?.trim();

  return (
    <div className="flex border-t border-slate-100">
      {datasheet ? (
        <a
          href={datasheet}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 text-center text-sm font-semibold transition hover:bg-slate-50"
        >
          Datasheet
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="flex-1 cursor-not-allowed py-3 text-center text-sm font-semibold text-slate-400"
        >
          Datasheet
        </span>
      )}

      <Link
        href={`/products/${product.slug}`}
        className="flex-1 border-x border-slate-100 py-3 text-center text-sm font-semibold transition hover:bg-slate-50"
      >
        Details
      </Link>

      <button
        type="button"
        className="flex-1 py-3 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50"
      >
        Inquiry
      </button>
    </div>
  );
}
