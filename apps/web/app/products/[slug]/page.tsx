import { createProductSchema } from "@/features/products/lib/product.schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createProductMetadata } from "@/features/products/lib/product.seo";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import { createBreadcrumbSchema } from "@/features/products/lib/breadcrumb.schema";
import RelatedProducts from "@/features/products/components/RelatedProducts";
import ProductSpecifications from "@/features/products/components/ProductSpecifications";
import { getRelatedProducts } from "@/features/products/lib/product.recommendation";
import ProductGallery from "@/features/products/components/ProductGallery";
import ProductDownloads from "@/features/products/components/ProductDownloads";
import ProductHeader from "@/features/products/components/ProductHeader";
import ProductDescription from "@/features/products/components/ProductDescription";
import ProductRelations from "@/features/products/components/ProductRelations";
import { getProductRelations } from "@/features/products/lib/product.relations";
import ProductInquiryTrigger from "@/features/products/components/ProductInquiryTrigger";

import {
  getProductBySlug,
  getProducts,
} from "@/features/products/repository/product.repository";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return createProductMetadata(product);
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }
  const schema = createProductSchema(product);
  const breadcrumb = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: product.familyId,
      href: `/products?family=${product.familyId}`,
    },
    {
      label: product.title,
      href: `/products/${product.slug}`,
    },
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumb);
  const relatedProducts = getRelatedProducts(product, getProducts());
  const productRelations = getProductRelations(product, getProducts());
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            {
              label: product.familyId,
              href: `/products?family=${product.familyId}`,
            },
            {
              label: product.title,
            },
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
