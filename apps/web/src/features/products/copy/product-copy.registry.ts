import "server-only";

import type { PersianProductCopyOverlay } from "./product-copy.types";

/**
 * Draft and review entries remain declarations in an array so duplicate IDs
 * are observable by validation. This registry is intentionally empty until a
 * separately authorized Product-copy drafting task begins.
 */
export const persianProductCopyDraftRegistry =
  [] as const satisfies readonly PersianProductCopyOverlay[];
