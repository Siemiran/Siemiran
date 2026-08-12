"use client";

import ProductComparisonView from "./ProductComparisonView";
import { useProductComparison } from "../hooks/useProductComparison";

export default function ProductComparisonPageClient() {
  const { products, removeProduct, clearProducts } = useProductComparison();

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
