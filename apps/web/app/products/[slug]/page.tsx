import { createProductSchema } from "@/features/products/lib/product.schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createProductMetadata } from "@/features/products/lib/product.seo";

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-bold">{product.title}</h1>

        <p className="mt-4 text-slate-600">{product.shortDescription}</p>
      </main>
    </>
  );
}
