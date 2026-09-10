import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";
import type { Product } from "../types/product.types";

export function createProductMetadata(
  product: Product,
  locale: AppLocale,
): Metadata {
  const title = `${product.title} | Siemiran`;

  const description = product.shortDescription;
  const localePrefix = locale === "en" ? "/en" : "";
  const pathname = `${localePrefix}/products/${product.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: pathname,
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: pathname,
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
