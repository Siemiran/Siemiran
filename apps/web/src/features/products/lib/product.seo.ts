import type { Metadata } from "next";
import type { Product } from "../types/product.types";

export function createProductMetadata(product: Product): Metadata {
  const title = `${product.title} | Siemiran`;

  const description = product.shortDescription;

  return {
    title,
    description,

    alternates: {
      canonical: `/products/${product.slug}`,
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: `/products/${product.slug}`,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 1200,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0]],
    },
  };
}
