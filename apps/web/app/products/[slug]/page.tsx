import { createProductSchema } from "@/features/products/lib/product.schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createProductMetadata } from "@/features/products/lib/product.seo";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import { createBreadcrumbSchema } from "@/features/products/lib/breadcrumb.schema";
import RelatedProducts from "@/features/products/components/RelatedProducts";
import ProductSpecifications from "@/features/products/components/ProductSpecifications";
import { getRelatedProducts } from "@/features/products/lib/product.recommendation";

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

        <h1 className="text-4xl font-bold">{product.title}</h1>

        <p className="mt-4 text-slate-600">{product.shortDescription}</p>
        <ProductSpecifications specifications={product.specifications} />
        <RelatedProducts products={relatedProducts} />
      </section>
    </>
  );
}
