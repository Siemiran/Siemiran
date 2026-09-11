import "server-only";

import type { Product } from "../types/product.types";
import type {
  ProductCopyParagraph,
  ResolvedProductCopy,
} from "./product-copy.types";
import {
  getPublishedPersianProductCopy,
  PERSIAN_PRODUCT_COPY_PUBLICATION_STATE,
} from "./product-copy.publication";

import type { AppLocale } from "@/i18n/routing";

const PERSIAN_BRAND = "زیمیران";
const ENGLISH_BRAND = "SIEMIRAN";
const issuedResolvedCopies = new WeakSet<object>();

interface ResolvedProductCopyContent {
  readonly locale: AppLocale;
  readonly source: "canonical-en" | "approved-fa";
  readonly shortDescription: ProductCopyParagraph;
  readonly description: readonly ProductCopyParagraph[];
  readonly seoTitle: ProductCopyParagraph;
  readonly seoDescription: ProductCopyParagraph;
}

function paragraph(value: string): ProductCopyParagraph {
  return [{ kind: "text", value }];
}

function cloneFrozenParagraph(
  value: ProductCopyParagraph
): ProductCopyParagraph {
  return Object.freeze(value.map((segment) => Object.freeze({ ...segment })));
}

function issueResolvedProductCopy(
  content: ResolvedProductCopyContent
): ResolvedProductCopy {
  const copy = Object.freeze({
    locale: content.locale,
    source: content.source,
    shortDescription: cloneFrozenParagraph(content.shortDescription),
    description: Object.freeze(content.description.map(cloneFrozenParagraph)),
    seoTitle: cloneFrozenParagraph(content.seoTitle),
    seoDescription: cloneFrozenParagraph(content.seoDescription),
  });

  issuedResolvedCopies.add(copy);
  return copy as unknown as ResolvedProductCopy;
}

export function assertResolverIssuedProductCopy(
  value: unknown
): asserts value is ResolvedProductCopy {
  if (
    typeof value !== "object" ||
    value === null ||
    !issuedResolvedCopies.has(value)
  ) {
    throw new Error(
      "Resolved Product copy was not issued by the trusted resolver."
    );
  }
}

function resolveCanonicalEnglishCopy(
  product: Readonly<Product>,
  locale: AppLocale
): ResolvedProductCopy {
  return issueResolvedProductCopy({
    locale,
    source: "canonical-en",
    shortDescription: paragraph(product.shortDescription),
    description: product.description ? [paragraph(product.description)] : [],
    seoTitle: [
      { kind: "technical", value: product.title },
      { kind: "text", value: ` | ${ENGLISH_BRAND}` },
    ],
    seoDescription: paragraph(product.shortDescription),
  });
}

export function resolveProductCopy(
  product: Readonly<Product>,
  locale: AppLocale
): ResolvedProductCopy {
  if (
    locale === "en" ||
    PERSIAN_PRODUCT_COPY_PUBLICATION_STATE === "disabled"
  ) {
    return resolveCanonicalEnglishCopy(product, locale);
  }

  const overlay = getPublishedPersianProductCopy(product.id);
  const shortDescription = cloneFrozenParagraph(overlay.shortDescription);

  return issueResolvedProductCopy({
    locale,
    source: "approved-fa",
    shortDescription,
    description: overlay.description,
    seoTitle: [
      { kind: "technical", value: product.title },
      { kind: "text", value: ` | ${PERSIAN_BRAND}` },
    ],
    seoDescription: shortDescription,
  });
}
