export interface Brand {
  id: string;
  name: string;
  slug: string;
  country?: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface Family {
  id: string;
  title: string;
  slug: string;

  brandId: string;
  categoryId: string;
}

export interface Series {
  id: string;
  title: string;
  slug: string;

  familyId: string;
}

export interface ProductType {
  id: string;
  title: string;
  slug: string;

  seriesId: string;
}

/**
 * Optional subdivision inside a Product Type.
 *
 * Examples:
 *
 * CPU
 * ├── Standard
 * ├── Compact
 * ├── Technology
 * ├── Fail-Safe
 * └── SIPLUS
 *
 * Or:
 *
 * Signal Module
 * └── Digital Input
 *     └── 24 V DC
 */
export interface ProductVariant {
  id: string;
  title: string;
  slug: string;

  productTypeId: string;

  /**
   * Optional parent variant.
   *
   * Allows deeper taxonomy when required.
   *
   * Example:
   *
   * Signal Module
   * └── Digital Input
   *     └── 24 V DC
   */
  parentVariantId?: string;
}

/**
 * Reference used by products and relations.
 *
 * Variant is intentionally optional so existing products
 * remain compatible while the catalog is being migrated.
 */
export interface ProductReference {
  brandId: string;

  categoryId: string;

  familyId: string;

  seriesId?: string;

  productTypeId?: string;

  variantId?: string;
}
