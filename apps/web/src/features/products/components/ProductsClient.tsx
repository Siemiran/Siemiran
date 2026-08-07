"use client";

import ProductCard from "./ProductCard";
import ProductToolbar from "./ProductToolbar";
import CategoryFilter from "./CategoryFilter";

import { useProductFilters } from "../hooks/useProductFilters";
import { useProductSearchParams } from "../hooks/useProductSearchParams";

import { getCategories } from "../filters/category.filter";

import type { Product } from "../types/product.types";

interface Props {
  products: Product[];
}

export default function ProductsClient({ products }: Props) {
  const { search, setSearch, category, setCategory } = useProductSearchParams();

  const { filteredProducts } = useProductFilters({
    products,
    search,
    category,
  });

  const categories = getCategories(products);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <ProductToolbar search={search} onSearchChange={setSearch} />

        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />
      </div>

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
