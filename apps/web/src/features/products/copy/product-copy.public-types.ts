import type { Product } from "../types/product.types";

export type ProductId = Product["id"];

export type PublicProductCopyLanguage = "en" | "fa";
export type PublicProductCopyDirection = "ltr" | "rtl";

export type PublicProductCopySegmentDTO =
  | Readonly<{ kind: "text"; value: string }>
  | Readonly<{ kind: "technical"; value: string }>;

export type PublicProductCopyParagraphDTO =
  readonly PublicProductCopySegmentDTO[];

type PublicProductPrimitive = string | number | boolean | null | undefined;

type DeepReadonly<T> = T extends PublicProductPrimitive
  ? T
  : T extends readonly unknown[]
    ? { readonly [Index in keyof T]: DeepReadonly<T[Index]> }
    : T extends object
      ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
      : never;

export interface PublicProductCardCopyDTO {
  readonly language: PublicProductCopyLanguage;
  readonly direction: PublicProductCopyDirection;
  readonly shortDescription: PublicProductCopyParagraphDTO;
  readonly searchText: string;
}

export type PublicProductRecord = DeepReadonly<
  Omit<
    Product,
    "shortDescription" | "description" | "seoTitle" | "seoDescription"
  >
>;

export interface ProductListItemViewModel {
  readonly product: PublicProductRecord;
  readonly copy: PublicProductCardCopyDTO;
}

export type ProductInquiryIdentityDTO = Readonly<
  Pick<Product, "id" | "title" | "partNumber">
>;
