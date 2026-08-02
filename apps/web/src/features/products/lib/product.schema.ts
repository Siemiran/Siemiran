import type { Product } from "../types/product.types";

export function createProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    description: product.shortDescription,

    sku: product.partNumber,

    image: [product.image],

    brand: {
      "@type": "Brand",
      name: product.brandId,
    },

    category: product.categoryId,

    offers: {
      "@type": "Offer",

      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

      priceCurrency: "IRR",

      price: 0,
    },
  };
}
