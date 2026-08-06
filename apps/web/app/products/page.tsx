import { Suspense } from "react";

import ProductsClient from "@/features/products/components/ProductsClient";
import { getProducts } from "@/features/products/repository/product.repository";

export default function ProductsPage() {
  const products = getProducts();

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <Suspense
        fallback={
          <div className="py-20 text-center text-slate-500">
            Loading products...
          </div>
        }
      >
        <ProductsClient products={products} />
      </Suspense>
    </main>
  );
}
