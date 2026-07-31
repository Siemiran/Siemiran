import type { Product } from "@/features/products/types/product.types";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  return (
    <div className="flex border-t border-slate-100">
      <a
        href={product.documents?.datasheet ?? "#"}
        className="flex-1 py-3 text-center text-sm font-semibold transition hover:bg-slate-50"
      >
        Datasheet
      </a>

      <a
        href={`/products/${product.slug}`}
        className="flex-1 border-x border-slate-100 py-3 text-center text-sm font-semibold transition hover:bg-slate-50"
      >
        Details
      </a>

      <button
        type="button"
        className="flex-1 py-3 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50"
      >
        Inquiry
      </button>
    </div>
  );
}
