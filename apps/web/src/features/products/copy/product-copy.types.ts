import type { Product } from "../types/product.types";

import type { AppLocale } from "@/i18n/routing";

export type ProductId = Product["id"];

export type ProductCopySegment =
  | { readonly kind: "text"; readonly value: string }
  | { readonly kind: "technical"; readonly value: string };

export type ProductCopyParagraph = readonly ProductCopySegment[];

export type ProductCopyReview =
  | {
      readonly decision: "pending" | "rejected";
      readonly note?: string;
    }
  | {
      readonly decision: "approved";
      readonly reviewerId: string;
      readonly reviewedAt: string;
      readonly reviewedContentHash: string;
      readonly evidenceRef: string;
      readonly note?: string;
    };

export interface PersianProductCopyOverlay {
  readonly productId: ProductId;
  readonly shortDescription: ProductCopyParagraph;
  readonly description: readonly ProductCopyParagraph[];
  readonly provenance: "human" | "ai-assisted" | "machine-draft";
  readonly linguisticReview: ProductCopyReview;
  readonly technicalReview: ProductCopyReview;
}

declare const resolvedProductCopyTypeBrand: unique symbol;

export interface ResolvedProductCopy {
  readonly [resolvedProductCopyTypeBrand]: true;
  readonly locale: AppLocale;
  readonly source: "canonical-en" | "approved-fa";
  readonly shortDescription: ProductCopyParagraph;
  readonly description: readonly ProductCopyParagraph[];
  readonly seoTitle: ProductCopyParagraph;
  readonly seoDescription: ProductCopyParagraph;
}
