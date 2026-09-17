import type { ProductId } from "../copy/product-copy.public-types";
import { MAX_COMPARISON_PRODUCTS } from "./comparison.utils";

const STORAGE_KEY = "siemiran:product-comparison";

export interface ComparisonStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface ComparisonStorageAdapter {
  read(validIds: ReadonlySet<ProductId>, maximum?: number): ProductId[];
  write(productIds: readonly ProductId[]): boolean;
}

function getCandidateId(value: unknown): ProductId | undefined {
  if (typeof value === "string") return value;

  if (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string"
  ) {
    return value.id;
  }

  return undefined;
}

export function migrateStoredComparisonIds(
  value: unknown,
  validIds: ReadonlySet<ProductId>,
  maximum = MAX_COMPARISON_PRODUCTS
): ProductId[] {
  if (!Array.isArray(value)) return [];

  const result: ProductId[] = [];
  const seen = new Set<ProductId>();

  for (const entry of value) {
    const id = getCandidateId(entry);

    if (!id || !validIds.has(id) || seen.has(id)) continue;

    seen.add(id);
    result.push(id);

    if (result.length >= maximum) break;
  }

  return result;
}

export function parseStoredComparisonIds(
  serialized: string | null,
  validIds: ReadonlySet<ProductId>,
  maximum = MAX_COMPARISON_PRODUCTS
): ProductId[] {
  if (!serialized) return [];

  try {
    return migrateStoredComparisonIds(
      JSON.parse(serialized) as unknown,
      validIds,
      maximum
    );
  } catch {
    return [];
  }
}

export function createComparisonStorageAdapter(
  getStorage: () => ComparisonStorageLike | null
): ComparisonStorageAdapter {
  let storage: ComparisonStorageLike | undefined;
  let unavailable = false;
  let initialReadComplete = false;

  function resolveStorage(): ComparisonStorageLike | undefined {
    if (unavailable) return undefined;
    if (storage) return storage;

    try {
      storage = getStorage() ?? undefined;
    } catch {
      unavailable = true;
      return undefined;
    }

    if (!storage) unavailable = true;
    return storage;
  }

  return {
    read(validIds, maximum = MAX_COMPARISON_PRODUCTS) {
      initialReadComplete = true;
      const resolvedStorage = resolveStorage();
      if (!resolvedStorage) return [];

      try {
        return parseStoredComparisonIds(
          resolvedStorage.getItem(STORAGE_KEY),
          validIds,
          maximum
        );
      } catch {
        unavailable = true;
        storage = undefined;
        return [];
      }
    },
    write(productIds) {
      if (!initialReadComplete) return false;

      const resolvedStorage = resolveStorage();
      if (!resolvedStorage) return false;

      try {
        resolvedStorage.setItem(STORAGE_KEY, JSON.stringify(productIds));
        return true;
      } catch {
        unavailable = true;
        storage = undefined;
        return false;
      }
    },
  };
}

export function createBrowserComparisonStorageAdapter(): ComparisonStorageAdapter {
  return createComparisonStorageAdapter(() =>
    typeof window === "undefined" ? null : window.localStorage
  );
}
