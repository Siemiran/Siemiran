import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Breadcrumb from "@/components/navigation/Breadcrumb";
import ProductDescription from "@/features/products/components/ProductDescription";
import ProductDownloads from "@/features/products/components/ProductDownloads";
import ProductGallery from "@/features/products/components/ProductGallery";
import ProductHeader from "@/features/products/components/ProductHeader";
import ProductInquiryTrigger from "@/features/products/components/ProductInquiryTrigger";
import ProductRelations from "@/features/products/components/ProductRelations";
import ProductSpecifications from "@/features/products/components/ProductSpecifications";
import RelatedProducts from "@/features/products/components/RelatedProducts";
import { createBreadcrumbSchema } from "@/features/products/lib/breadcrumb.schema";
import { getProductRelations } from "@/features/products/lib/product.relations";
import { getRelatedProducts } from "@/features/products/lib/product.recommendation";
import { createProductSchema } from "@/features/products/lib/product.schema";
import { createProductMetadata } from "@/features/products/lib/product.seo";
import {
  getProductBySlug,
  getProducts,
} from "@/features/products/repository/product.repository";
import { routing } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return { robots: { index: false, follow: false } };
  }

  const product = getProductBySlug(slug);

  if (!product) {
    const t = await getTranslations({ locale, namespace: "Product" });
    return { title: t("notFound") };
  }

  return {
    ...createProductMetadata(product, locale),
    robots: { index: locale !== "en", follow: true },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Product");
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const localePrefix = locale === "en" ? "/en" : "";
  const schema = createProductSchema(product, locale);
  const breadcrumbSchema = createBreadcrumbSchema([
    { label: t("home"), href: `${localePrefix}/` },
    { label: t("products"), href: `${localePrefix}/products` },
    {
      label: product.familyId,
      href: `${localePrefix}/products?family=${product.familyId}`,
    },
    {
      label: product.title,
      href: `${localePrefix}/products/${product.slug}`,
    },
  ]);
  const products = getProducts();
  const relatedProducts = getRelatedProducts(product, products);
  const productRelations = getProductRelations(product, products);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Breadcrumb
          items={[
            { label: t("home"), href: "/" },
            { label: t("products"), href: "/products" },
            {
              label: product.familyId,
              href: `/products?family=${product.familyId}`,
              technical: true,
            },
            { label: product.title, technical: true },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} alt={product.title} />

          <div className="space-y-8">
            <ProductHeader product={product} />
            <ProductInquiryTrigger product={product} />
            <ProductSpecifications specifications={product.specifications} />
            <ProductDownloads downloads={product.downloads} />
          </div>
        </div>

        <ProductDescription description={product.description} />
        <ProductRelations
          compatibility={productRelations.compatibility}
          accessories={productRelations.accessories}
          replacementProduct={productRelations.replacementProduct}
        />
        <RelatedProducts products={relatedProducts} />
      </section>
    </>
  );
}
