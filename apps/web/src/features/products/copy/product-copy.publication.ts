import "server-only";

import { products } from "../data/products";
import type { ProductId } from "./product-copy.types";
import { persianProductCopyDraftRegistry } from "./product-copy.registry";
import {
  lookupValidatedPersianProductCopy,
  validatePersianProductCopyForActivation,
  type ProductCopyActivationCapability,
  type PublishedPersianProductCopy,
} from "./product-copy.validator";

export type PersianProductCopyPublicationState = "disabled" | "enabled";

/** This committed state is intentionally disabled for Task BK. */
export const PERSIAN_PRODUCT_COPY_PUBLICATION_STATE: PersianProductCopyPublicationState =
  "disabled";

let activationCapability: ProductCopyActivationCapability | undefined;

function getActivationCapability(): ProductCopyActivationCapability {
  if (activationCapability) return activationCapability;

  const result = validatePersianProductCopyForActivation(
    persianProductCopyDraftRegistry,
    products
  );

  if (!result.valid) {
    throw new Error(
      `Persian Product-copy publication failed closed: ${result.overlayCount}/${result.canonicalCount} overlays; ${result.approvedCount} approved.`
    );
  }

  activationCapability = result.capability;
  return activationCapability;
}

export function getPublishedPersianProductCopy(
  productId: ProductId
): Readonly<PublishedPersianProductCopy> {
  if (PERSIAN_PRODUCT_COPY_PUBLICATION_STATE !== "enabled") {
    throw new Error("Persian Product-copy publication is disabled.");
  }

  return lookupValidatedPersianProductCopy(
    getActivationCapability(),
    productId
  );
}
