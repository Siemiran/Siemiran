import type { ProductListItemViewModel } from "../copy/product-copy.public-types";

const BIDI_FORMATTING_CONTROLS =
  /[\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/gu;

export function normalizeProductSearchValue(value: string): string {
  return value
    .replace(BIDI_FORMATTING_CONTROLS, "")
    .normalize("NFC")
    .toLocaleLowerCase();
}

export function matchesProductSearch(
  item: Readonly<ProductListItemViewModel>,
  query: string
): boolean {
  const normalizedQuery = normalizeProductSearchValue(query.trim());

  if (!normalizedQuery) return true;

  return [
    item.product.title,
    item.product.partNumber,
    item.copy.searchText,
  ].some((value) =>
    normalizeProductSearchValue(value).includes(normalizedQuery)
  );
}
