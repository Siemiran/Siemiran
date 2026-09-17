"use client";

import { useTranslations } from "next-intl";

import ProductCard from "./ProductCard";
import ProductToolbar from "./ProductToolbar";
import CategoryFilter from "./CategoryFilter";

import { useProductFilters } from "../hooks/useProductFilters";
import { useProductSearchParams } from "../hooks/useProductSearchParams";

import { getCategories } from "../filters/category.filter";

import type { ProductListItemViewModel } from "../copy/product-copy.public-types";

import FamilyFilter from "./FamilyFilter";

import { getFamilies } from "../filters/family.filter";

import SeriesFilter from "./SeriesFilter";

import { getSeries } from "../filters/series.filter";
import ProductTypeFilter from "./ProductTypeFilter";

import { getProductTypes } from "../filters/productType.filter";

import ActiveFilters from "./ActiveFilters";
import ClearFiltersButton from "./ClearFiltersButton";

import ProductSort from "./ProductSort";

import ProductPagination from "./ProductPagination";
import { paginateProducts } from "../pagination/paginateProducts";
import { useProductPagination } from "../hooks/useProductPagination";

import ProductComparisonBar from "./ProductComparisonBar";
import { useProductComparison } from "../hooks/useProductComparison";
interface Props {
  items: readonly ProductListItemViewModel[];
}

export default function ProductsClient({ items }: Props) {
  const t = useTranslations("Products");
  const {
    search,
    setSearch,

    category,
    setCategory,

    family,
    setFamily,

    series,
    setSeries,

    productType,
    setProductType,

    clearFilters,

    sort,
    setSort,
  } = useProductSearchParams();

  const { filteredProducts } = useProductFilters({
    items,
    search,
    category,
    family,
    series,
    productType,
    sort,
  });

  const categories = getCategories(items);
  const families = getFamilies(items, category);
  const seriesList = getSeries(items, family);
  const productTypes = getProductTypes(items, series);
  const { page, setPage } = useProductPagination();

  const {
    items: paginatedProducts,
    currentPage,
    totalPages,
  } = paginateProducts(filteredProducts, page, 12);

  const {
    products: comparisonProducts,
    maxProducts,
    addProduct,
    removeProduct,
    clearProducts,
    hasProduct,
  } = useProductComparison({ catalog: items });

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <ProductToolbar search={search} onSearchChange={setSearch} />
        <ProductSort value={sort} onChange={setSort} />
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <ActiveFilters
            category={category}
            family={family}
            series={series}
            productType={productType}
            onClearCategory={() => setCategory("all")}
            onClearFamily={() => setFamily("all")}
            onClearSeries={() => setSeries("all")}
            onClearProductType={() => setProductType("all")}
          />

          <ClearFiltersButton onClick={clearFilters} />
        </div>

        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />
        <FamilyFilter families={families} value={family} onChange={setFamily} />
        <SeriesFilter series={seriesList} value={series} onChange={setSeries} />
        <ProductTypeFilter
          productTypes={productTypes}
          value={productType}
          onChange={setProductType}
        />
      </div>

      <div className="mb-6 text-sm text-slate-500">
        {t("found", { count: filteredProducts.length })}
      </div>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {paginatedProducts.map((item) => (
          <ProductCard
            key={item.product.id}
            item={item}
            comparisonSelected={hasProduct(item.product.id)}
            comparisonDisabled={
              comparisonProducts.length >= maxProducts &&
              !hasProduct(item.product.id)
            }
            onAddToComparison={addProduct}
            onRemoveFromComparison={removeProduct}
          />
        ))}
      </section>

      <ProductComparisonBar
        products={comparisonProducts}
        maxProducts={maxProducts}
        onRemove={removeProduct}
        onClear={clearProducts}
      />
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
