import { setRequestLocale } from "next-intl/server";

import ProductComparisonPageClient from "@/features/products/components/ProductComparisonPageClient";
import { createProductListItemViewModels } from "@/features/products/copy/product-copy.public.server";
import { getProducts } from "@/features/products/repository/product.repository";

interface ProductComparePageProps {
  params: Promise<{ locale: "fa" | "en" }>;
}

export default async function ProductComparePage({
  params,
}: ProductComparePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const catalog = createProductListItemViewModels(getProducts(), locale);

  return <ProductComparisonPageClient catalog={catalog} />;
}
