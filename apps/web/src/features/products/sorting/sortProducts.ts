import type { ProductListItemViewModel } from "../copy/product-copy.public-types";

export type ProductSortType =
  "default" | "name-asc" | "name-desc" | "featured" | "newest" | "oldest";

export function sortProducts(
  items: ProductListItemViewModel[],
  sort: ProductSortType
): ProductListItemViewModel[] {
  const result = [...items];

  switch (sort) {
    case "name-asc":
      return result.sort((a, b) =>
        a.product.title.localeCompare(b.product.title)
      );

    case "name-desc":
      return result.sort((a, b) =>
        b.product.title.localeCompare(a.product.title)
      );

    case "featured":
      return result.sort(
        (a, b) => Number(b.product.featured) - Number(a.product.featured)
      );

    case "newest":
      return result.sort((a, b) => b.product.id.localeCompare(a.product.id));

    case "oldest":
      return result.sort((a, b) => a.product.id.localeCompare(b.product.id));

    default:
      return result;
  }
}
