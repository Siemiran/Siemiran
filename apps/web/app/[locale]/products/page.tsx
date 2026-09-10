import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import ProductsClient from "@/features/products/components/ProductsClient";
import { getProducts } from "@/features/products/repository/product.repository";

interface ProductsPageProps {
  params: Promise<{ locale: "fa" | "en" }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Products");
  const products = getProducts();

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <Suspense
        fallback={
          <div className="py-20 text-center text-slate-500">
            {t("loading")}
          </div>
        }
      >
        <ProductsClient products={products} />
      </Suspense>
    </main>
  );
}
