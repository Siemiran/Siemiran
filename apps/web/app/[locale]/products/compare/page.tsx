import { setRequestLocale } from "next-intl/server";

import ProductComparisonPageClient from "@/features/products/components/ProductComparisonPageClient";

interface ProductComparePageProps {
  params: Promise<{ locale: "fa" | "en" }>;
}

export default async function ProductComparePage({
  params,
}: ProductComparePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductComparisonPageClient />;
}
