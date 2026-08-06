"use client";

import ProductCard from "./ProductCard";
import ProductToolbar from "./ProductToolbar";
import { useProductFilters } from "../hooks/useProductFilters";
import { useProductSearchParams } from "../hooks/useProductSearchParams";
import type { Product } from "../types/product.types";

interface Props {
  products: Product[];
}

export default function ProductsClient({ products }: Props) {
  const { search, setSearch } = useProductSearchParams();

  const { filteredProducts } = useProductFilters({
    products,
    search,
  });

  return (
    <>
      <ProductToolbar search={search} onSearchChange={setSearch} />

      <div className="mb-6 text-sm text-slate-500">
        {filteredProducts.length} products found
      </div>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}
