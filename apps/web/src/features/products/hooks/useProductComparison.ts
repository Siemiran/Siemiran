"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import type {
  ProductId,
  ProductListItemViewModel,
} from "../copy/product-copy.public-types";
import {
  createBrowserComparisonStorageAdapter,
  migrateStoredComparisonIds,
} from "../comparison/comparison-storage";

import {
  addComparisonProduct,
  hasComparisonProduct,
  removeComparisonProduct,
  MAX_COMPARISON_PRODUCTS,
} from "../comparison/comparison.utils";

const subscribeToHydration = () => () => undefined;
const getHydratedSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

interface UseProductComparisonOptions {
  readonly catalog: readonly ProductListItemViewModel[];
}

export function useProductComparison({ catalog }: UseProductComparisonOptions) {
  const catalogById = useMemo(
    () => new Map(catalog.map((item) => [item.product.id, item])),
    [catalog]
  );
  const validIds = useMemo(
    () => new Set<ProductId>(catalogById.keys()),
    [catalogById]
  );
  const [comparisonStorage] = useState(() =>
    createBrowserComparisonStorageAdapter()
  );
  const storageReadStarted = useRef(false);
  const [storageReadComplete, setStorageReadComplete] = useState(false);
  const [storedProductIds, setStoredProductIds] = useState<ProductId[]>([]);
  const productIds = useMemo(
    () => migrateStoredComparisonIds(storedProductIds, validIds),
    [storedProductIds, validIds]
  );
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydrationSnapshot
  );

  const addProduct = useCallback(
    (productId: ProductId) => {
      setStoredProductIds((currentIds) =>
        addComparisonProduct(
          migrateStoredComparisonIds(currentIds, validIds),
          productId,
          MAX_COMPARISON_PRODUCTS
        )
      );
    },
    [validIds]
  );

  const removeProduct = useCallback((productId: ProductId) => {
    setStoredProductIds((currentIds) =>
      removeComparisonProduct(currentIds, productId)
    );
  }, []);

  const clearProducts = useCallback(() => {
    setStoredProductIds([]);
  }, []);

  const hasProduct = useCallback(
    (productId: ProductId) =>
      hydrated && hasComparisonProduct(productIds, productId),
    [hydrated, productIds]
  );

  useEffect(() => {
    if (storageReadStarted.current) return;

    storageReadStarted.current = true;
    setStoredProductIds(comparisonStorage.read(validIds));
    setStorageReadComplete(true);
  }, [comparisonStorage, validIds]);

  useEffect(() => {
    if (!storageReadComplete) return;

    comparisonStorage.write(productIds);
  }, [comparisonStorage, productIds, storageReadComplete]);

  const products = (hydrated ? productIds : []).flatMap((id) => {
    const item = catalogById.get(id);
    return item ? [item] : [];
  });

  return {
    productIds,
    products,
    maxProducts: MAX_COMPARISON_PRODUCTS,
    addProduct,
    removeProduct,
    clearProducts,
    hasProduct,
  };
}
