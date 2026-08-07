"use client";

import ProductCard from "./ProductCard";
import ProductToolbar from "./ProductToolbar";
import CategoryFilter from "./CategoryFilter";

import { useProductFilters } from "../hooks/useProductFilters";
import { useProductSearchParams } from "../hooks/useProductSearchParams";

import { getCategories } from "../filters/category.filter";

import type { Product } from "../types/product.types";

import FamilyFilter from "./FamilyFilter";

import { getFamilies } from "../filters/family.filter";

import SeriesFilter from "./SeriesFilter";

import { getSeries } from "../filters/series.filter";

interface Props {
  products: Product[];
}

export default function ProductsClient({ products }: Props) {
  const {
    search,
    setSearch,

    category,
    setCategory,

    family,
    setFamily,

    series,
    setSeries,
  } = useProductSearchParams();

  const { filteredProducts } = useProductFilters({
    products,
    search,
    category,
    family,
    series,
  });

  const categories = getCategories(products);
  const families = getFamilies(products, category);
  const seriesList = getSeries(products, family);
  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <ProductToolbar search={search} onSearchChange={setSearch} />

        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />
        <FamilyFilter families={families} value={family} onChange={setFamily} />
        <SeriesFilter series={seriesList} value={series} onChange={setSeries} />
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
