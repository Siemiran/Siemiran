"use client";

import ProductComparisonView from "./ProductComparisonView";
import { useProductComparison } from "../hooks/useProductComparison";
import type { ProductListItemViewModel } from "../copy/product-copy.public-types";

interface ProductComparisonPageClientProps {
  readonly catalog: readonly ProductListItemViewModel[];
}

export default function ProductComparisonPageClient({
  catalog,
}: ProductComparisonPageClientProps) {
  const { products, removeProduct, clearProducts } = useProductComparison({
    catalog,
  });

  return (
    <main className="min-h-screen bg-white">
      <ProductComparisonView
        products={products}
        onRemove={removeProduct}
        onClear={clearProducts}
      />
    </main>
  );
}
