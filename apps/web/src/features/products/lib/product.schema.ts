import type { Product } from "../types/product.types";

const DEFAULT_SITE_URL = "https://siemiran.com";

function toAbsoluteUrl(path: string, siteUrl: string): string {
  return path.startsWith("http")
    ? path
    : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createProductSchema(
  product: Product,
  siteUrl = DEFAULT_SITE_URL
) {
  const hasVerifiedImage = !product.images[0].includes("placeholder");

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    sku: product.partNumber,
    mpn: product.manufacturerPartNumber ?? product.partNumber,
    url: `${siteUrl}/products/${product.slug}`,
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
