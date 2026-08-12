import type { Product } from "../types/product.types";

export interface ProductRelations {
  compatibility: Product[];
  accessories: Product[];
  replacementProduct?: Product;
}

export function getProductRelations(
  product: Product,
  products: Product[]
): ProductRelations {
  const productsById = new Map(products.map((item) => [item.id, item]));

  const compatibility = (product.compatibility ?? [])
    .map((id) => productsById.get(id))
    .filter((item): item is Product => Boolean(item));

  const accessories = (product.accessories ?? [])
    .map((id) => productsById.get(id))
    .filter((item): item is Product => Boolean(item));

  const replacementProduct = product.replacementProduct
    ? productsById.get(product.replacementProduct)
    : undefined;

  return {
    compatibility,
    accessories,
    replacementProduct,
  };
}
