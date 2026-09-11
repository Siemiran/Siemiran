import "server-only";

import type { Product } from "../types/product.types";

/** Reviewed cross-Product exceptions belong here. No exception is currently needed. */
export const reviewedGlobalTechnicalTokens =
  [] as const satisfies readonly string[];

const RAW_TECHNICAL_CONTENT = /\p{Script=Latin}|[0-9\u0660-\u0669]/u;
const ASCII_DIGIT = /[0-9]/u;
const LONG_LOWERCASE_WORD = /\p{Ll}{4,}/u;
const UPPERCASE_TECHNICAL_TOKEN = /^[A-Z0-9]+(?:[ .,+/()%+-][A-Z0-9]+)*$/u;

function addToken(tokens: Set<string>, value: unknown): void {
  if (typeof value === "string" && value.length > 0) {
    tokens.add(value);
  }
}

export function containsRawTechnicalContent(value: string): boolean {
  return RAW_TECHNICAL_CONTENT.test(value);
}

function isAtomicTechnicalSpecificationValue(value: string): boolean {
  if (value.length > 80) return false;

  return (
    UPPERCASE_TECHNICAL_TOKEN.test(value) ||
    (ASCII_DIGIT.test(value) && !LONG_LOWERCASE_WORD.test(value))
  );
}

export function deriveAllowedTechnicalTokens(
  product: Readonly<Product>
): ReadonlySet<string> {
  const tokens = new Set<string>(reviewedGlobalTechnicalTokens);

  [
    product.id,
    product.slug,
    product.title,
    product.brandId,
    product.categoryId,
    product.familyId,
    product.seriesId,
    product.productTypeId,
    product.variantId,
    product.partNumber,
    product.manufacturerPartNumber,
    product.ean,
    product.replacementProduct,
    product.siemensUrl,
  ].forEach((value) => addToken(tokens, value));

  product.images.forEach((value) => addToken(tokens, value));
  product.tags?.forEach((value) => addToken(tokens, value));
  product.compatibility?.forEach((value) => addToken(tokens, value));
  product.accessories?.forEach((value) => addToken(tokens, value));
  product.relatedProducts?.forEach((value) => addToken(tokens, value));

  Object.values(product.specifications ?? {}).forEach((value) => {
    if (isAtomicTechnicalSpecificationValue(value)) {
      addToken(tokens, value);
    }
  });

  product.downloads.forEach((download) => {
    [download.id, download.size, download.file].forEach((value) =>
      addToken(tokens, value)
    );
  });

  return tokens;
}

export function isAllowedTechnicalToken(
  value: string,
  product: Readonly<Product>
): boolean {
  return deriveAllowedTechnicalTokens(product).has(value);
}
