"use client";

import ProductComparisonView from "./ProductComparisonView";

export default function ProductComparisonPageClient() {
  return (
    <main className="min-h-screen bg-white">
      <ProductComparisonView
        products={[]}
        onRemove={() => {}}
        onClear={() => {}}
      />
    </main>
  );
}
