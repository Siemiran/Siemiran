import "server-only";

import type { ProductId } from "./product-copy.types";

export interface ReviewedProductTechnicalTokenOverride {
  readonly productId: ProductId;
  readonly tokens: readonly string[];
}

function defineOverride(
  productId: ProductId,
  tokens: readonly string[]
): ReviewedProductTechnicalTokenOverride {
  return Object.freeze({
    productId,
    tokens: Object.freeze([...tokens]),
  });
}

const reviewedProductTechnicalTokenOverrides = Object.freeze([
  defineOverride("siemens-s7-1200-cpu-211-1ae40", ["0-10 V DC"]),
  defineOverride("siemens-s7-1200-cpu-212-1ae40", ["0-10 V DC"]),
  defineOverride("siemens-s7-1200-cpu-214-1ag40", ["0-10 V DC"]),
  defineOverride("siemens-s7-1200-cpu-215-1ag40", ["0-10 V DC", "0-20 mA DC"]),
  defineOverride("siemens-s7-1200-cpu-217-1ag40", [
    "0-10 V DC",
    "0-20 mA DC",
    "RS-422/485",
  ]),
]);

/** Returns a detached, deeply frozen snapshot of the reviewed mapping. */
export function getReviewedProductTechnicalTokenOverrideEntries(): readonly ReviewedProductTechnicalTokenOverride[] {
  return Object.freeze(
    reviewedProductTechnicalTokenOverrides.map((entry) =>
      defineOverride(entry.productId, entry.tokens)
    )
  );
}
