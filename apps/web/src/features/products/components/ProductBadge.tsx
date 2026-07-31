import type { Product } from "@/features/products/types/product.types";

interface ProductBadgeProps {
  product: Product;
}

export default function ProductBadge({ product }: ProductBadgeProps) {
  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2">
      <span className="rounded-md bg-cyan-600 px-3 py-1 text-xs font-semibold text-white">
        {product.familyId}
      </span>

      {product.lifecycle === "legacy" && (
        <span className="rounded-md bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
          Legacy
        </span>
      )}

      {product.lifecycle === "discontinued" && (
        <span className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white">
          Discontinued
        </span>
      )}

      {product.featured && (
        <span className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
          Featured
        </span>
      )}
    </div>
  );
}
