import type { Product } from "../types/product.types";

import type { AppLocale } from "@/i18n/routing";

const DEFAULT_SITE_URL = "https://siemiran.com";

function toAbsoluteUrl(path: string, siteUrl: string): string {
  return path.startsWith("http")
    ? path
    : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createProductSchema(
  product: Product,
  locale: AppLocale,
  siteUrl = DEFAULT_SITE_URL,
) {
  const hasVerifiedImage = !product.images[0].includes("placeholder");
  const localePrefix = locale === "en" ? "/en" : "";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    sku: product.partNumber,
    mpn: product.manufacturerPartNumber ?? product.partNumber,
    url: `${siteUrl}${localePrefix}/products/${product.slug}`,
    ...(hasVerifiedImage
      ? {
          image: [toAbsoluteUrl(product.images[0], siteUrl)],
        }
      : {}),
    brand: {
      "@type": "Brand",
      name: product.brandId === "siemens" ? "Siemens" : product.brandId,
    },
    category: product.categoryId,
  };
}
