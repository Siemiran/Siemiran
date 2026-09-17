import "server-only";

import type { AppLocale } from "@/i18n/routing";

import { assertResolverIssuedProductCopy } from "../copy/product-copy.resolver";
import { serializeProductCopyParagraph } from "../copy/product-copy.serializer";
import type { ResolvedProductCopy } from "../copy/product-copy.types";
import type { Product } from "../types/product.types";

const DEFAULT_SITE_URL = "https://siemiran.com";

function toAbsoluteUrl(path: string, siteUrl: string): string {
  return path.startsWith("http")
    ? path
    : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createProductSchema(
  product: Product,
  copy: Readonly<ResolvedProductCopy>,
  locale: AppLocale,
  siteUrl = DEFAULT_SITE_URL
) {
  assertResolverIssuedProductCopy(copy);

  const hasVerifiedImage = !product.images[0].includes("placeholder");
  const localePrefix = locale === "en" ? "/en" : "";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: serializeProductCopyParagraph(copy.seoDescription),
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
