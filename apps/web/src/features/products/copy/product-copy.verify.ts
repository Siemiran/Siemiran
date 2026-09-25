import { Children, isValidElement, type ReactNode } from "react";

import { products } from "../data/products";
import {
  createComparisonStorageAdapter,
  migrateStoredComparisonIds,
  parseStoredComparisonIds,
} from "../comparison/comparison-storage";
import {
  addComparisonProduct,
  removeComparisonProduct,
} from "../comparison/comparison.utils";
import { getRelatedProducts } from "../lib/product.recommendation";
import { createProductSchema } from "../lib/product.schema";
import { createProductMetadata } from "../lib/product.seo";
import {
  matchesProductSearch,
  normalizeProductSearchValue,
} from "../presentation/product.search";
import { getFeaturedProducts } from "../repository/product.repository";
import type { Product } from "../types/product.types";
import { ProductCopyBlock, ProductCopyInline } from "./ProductCopyText";
import {
  PublicProductCopyBlock,
  PublicProductCopyInline,
} from "./PublicProductCopyText";
import {
  createProductListItemViewModel,
  createProductListItemViewModels,
  createPublicProductCardCopyDTO,
  createSanitizedProductBoundary,
} from "./product-copy.public.server";
import {
  getPublishedPersianProductCopy,
  PERSIAN_PRODUCT_COPY_PUBLICATION_STATE,
} from "./product-copy.publication";
import { persianProductCopyDraftRegistry } from "./product-copy.registry";
import { resolveProductCopy } from "./product-copy.resolver";
import { getReviewedProductTechnicalTokenOverrideEntries } from "./product-copy.technical-token-overrides";
import {
  normalizeProductCopySearchValue,
  serializeProductCopyParagraph,
  serializeProductCopyParagraphForSearch,
  serializeResolvedProductCopy,
} from "./product-copy.serializer";
import type {
  PersianProductCopyOverlay,
  ProductCopyReview,
  ProductId,
  ResolvedProductCopy,
} from "./product-copy.types";
import {
  EXPECTED_LIFECYCLE_OMISSION_IDS,
  createProductCopyContentHash,
  lookupValidatedPersianProductCopy,
  validatePersianProductCopyDrafts,
  validatePersianProductCopyForActivation,
  type ProductCopyActivationCapability,
} from "./product-copy.validator";
import {
  createProductTechnicalTokenOverrideResolver,
  deriveAllowedTechnicalTokens,
  reviewedGlobalTechnicalTokens,
} from "./technical-token-policy";

type MutableSegment = {
  kind: "text" | "technical";
  value: string;
};

interface MutableOverlay {
  productId: ProductId;
  shortDescription: MutableSegment[];
  description: MutableSegment[][];
  provenance: "human" | "ai-assisted" | "machine-draft";
  linguisticReview: ProductCopyReview;
  technicalReview: ProductCopyReview;
}

type ValidationResult = ReturnType<typeof validatePersianProductCopyDrafts>;

type RequiredKeysOf<Value> = {
  [Key in keyof Value]-?: Pick<Value, Key> extends Required<Pick<Value, Key>>
    ? Key
    : never;
}[keyof Value];

type OptionalKeysOf<Value> = Exclude<keyof Value, RequiredKeysOf<Value>>;

type TypesEqual<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends <
    Value,
  >() => Value extends Right ? 1 : 2
    ? (<Value>() => Value extends Right ? 1 : 2) extends <
        Value,
      >() => Value extends Left ? 1 : 2
      ? true
      : false
    : false;

type AssertType<Condition extends true> = Condition;

type ExpectedRequiredProductKey =
  | "id"
  | "slug"
  | "title"
  | "shortDescription"
  | "brandId"
  | "categoryId"
  | "familyId"
  | "partNumber"
  | "images"
  | "downloads";

type ExpectedOptionalProductKey =
  | "description"
  | "seriesId"
  | "productTypeId"
  | "variantId"
  | "manufacturerPartNumber"
  | "ean"
  | "specifications"
  | "compatibility"
  | "accessories"
  | "relatedProducts"
  | "replacementProduct"
  | "tags"
  | "lifecycle"
  | "inStock"
  | "featured"
  | "seoTitle"
  | "seoDescription"
  | "siemensUrl";

const requiredProductKeyTypeIsExhaustive: AssertType<
  TypesEqual<RequiredKeysOf<Product>, ExpectedRequiredProductKey>
> = true;
const optionalProductKeyTypeIsExhaustive: AssertType<
  TypesEqual<OptionalKeysOf<Product>, ExpectedOptionalProductKey>
> = true;

void requiredProductKeyTypeIsExhaustive;
void optionalProductKeyTypeIsExhaustive;

const PERSIAN_TEXT = "متن فارسی";
const PERSIAN_DESCRIPTION = "توضیح فارسی";
const product = products[0];
const secondProduct = products[1];
const pendingReview = { decision: "pending" } as const;

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertThrows(
  action: () => unknown,
  expectedMessage: string,
  fixtureName: string
): void {
  try {
    action();
  } catch (error) {
    assert(
      error instanceof Error && error.message.includes(expectedMessage),
      `${fixtureName} threw an unexpected error.`
    );
    return;
  }

  throw new Error(`${fixtureName} must throw.`);
}

function issueCodes(result: { readonly issues: readonly { code: string }[] }) {
  return [...new Set(result.issues.map((issue) => issue.code))];
}

function assertIssues(
  result: {
    readonly valid: boolean;
    readonly issues: readonly { code: string }[];
  },
  expectedCodes: readonly string[],
  fixtureName: string
): void {
  assert(!result.valid, `${fixtureName} must fail.`);
  const actualCodes = issueCodes(result).sort();
  const exactExpectedCodes = [...new Set(expectedCodes)].sort();
  assert(
    JSON.stringify(actualCodes) === JSON.stringify(exactExpectedCodes),
    `${fixtureName} must report exactly ${exactExpectedCodes.join(", ")}; received ${actualCodes.join(", ")}.`
  );
}

function fixture(
  shortDescription: MutableSegment[] = [{ kind: "text", value: PERSIAN_TEXT }],
  fixtureProduct: Readonly<Product> = product
): MutableOverlay {
  return {
    productId: fixtureProduct.id,
    shortDescription,
    description: [[{ kind: "text", value: PERSIAN_DESCRIPTION }]],
    provenance: "human",
    linguisticReview: pendingReview,
    technicalReview: pendingReview,
  };
}

function approvedReview(
  hash: string,
  reviewedAt = "2026-09-10T00:00:00Z"
): Extract<ProductCopyReview, { decision: "approved" }> {
  return {
    decision: "approved",
    reviewerId: "fixture-reviewer",
    reviewedAt,
    reviewedContentHash: hash,
    evidenceRef: "fixture://review",
  };
}

function approvedFixture(fixtureProduct: Readonly<Product>): MutableOverlay {
  const entry = fixture(undefined, fixtureProduct);
  const hash = createProductCopyContentHash(entry);
  entry.linguisticReview = approvedReview(hash);
  entry.technicalReview = approvedReview(hash);
  return entry;
}

function validateFixture(
  entry: unknown,
  canonicalProducts: readonly Readonly<Product>[] = products
): ValidationResult {
  return validatePersianProductCopyDrafts([entry], canonicalProducts);
}

function assertDraftIssues(
  fixtureName: string,
  entry: unknown,
  expectedCodes: readonly string[],
  canonicalProducts: readonly Readonly<Product>[] = products
): ValidationResult {
  const result = validateFixture(entry, canonicalProducts);
  assertIssues(result, expectedCodes, fixtureName);
  return result;
}

function assertDraftIncludesIssues(
  fixtureName: string,
  entry: unknown,
  expectedCodes: readonly string[],
  canonicalProducts: readonly Readonly<Product>[] = products
): ValidationResult {
  const result = validateFixture(entry, canonicalProducts);
  assert(!result.valid, `${fixtureName} must fail.`);
  const actualCodes = issueCodes(result);
  expectedCodes.forEach((code) =>
    assert(
      actualCodes.includes(code),
      `${fixtureName} must report ${code}; received ${actualCodes.join(", ")}.`
    )
  );
  return result;
}

const draftCases: Record<string, ValidationResult> = {};
draftCases.emptyRegistry = validatePersianProductCopyDrafts([], products);
assert(draftCases.emptyRegistry.valid, "Empty draft registry must pass.");

const duplicateEntry = fixture();
draftCases.duplicateId = validatePersianProductCopyDrafts(
  [duplicateEntry, duplicateEntry],
  products
);
assertIssues(
  draftCases.duplicateId,
  ["duplicate-product-id"],
  "Duplicate-ID fixture"
);

draftCases.emptyParagraph = assertDraftIssues(
  "Empty-paragraph fixture",
  fixture([]),
  ["empty-required-field"]
);
draftCases.emptySegment = assertDraftIssues(
  "Empty-segment fixture",
  fixture([{ kind: "text", value: "" }]),
  ["empty-segment", "missing-persian-prose"]
);

[
  ["malformedNullSegment", [null]],
  ["malformedUndefinedSegment", [undefined]],
  ["malformedStringSegment", ["text"]],
  ["malformedEmptyObjectSegment", [{}]],
  ["malformedMissingKindSegment", [{ value: PERSIAN_TEXT }]],
  ["malformedMissingValueSegment", [{ kind: "text" }]],
  ["malformedNonStringValueSegment", [{ kind: "text", value: 123 }]],
  ["malformedInvalidKindSegment", [{ kind: "markup", value: PERSIAN_TEXT }]],
].forEach(([name, shortDescription]) => {
  draftCases[name as string] = assertDraftIssues(
    `${name as string} fixture`,
    { ...fixture(), shortDescription },
    ["invalid-segment"]
  );
});

draftCases.malformedLongDescriptionSegment = assertDraftIssues(
  "Malformed-long-description-segment fixture",
  {
    ...fixture(),
    description: [[{ kind: "text", value: PERSIAN_DESCRIPTION }, null]],
  },
  ["invalid-segment"]
);
draftCases.incorrectBrand = assertDraftIssues(
  "Incorrect-brand fixture",
  fixture([{ kind: "text", value: "متن سیمیران" }]),
  ["incorrect-brand"]
);
draftCases.arabicYeh = assertDraftIssues(
  "Arabic-Yeh fixture",
  fixture([{ kind: "text", value: "متن ي" }]),
  ["non-persian-letter-form"]
);
draftCases.arabicKaf = assertDraftIssues(
  "Arabic-Kaf fixture",
  fixture([{ kind: "text", value: "متن ك" }]),
  ["non-persian-letter-form"]
);
draftCases.tatweel = assertDraftIssues(
  "Tatweel fixture",
  fixture([{ kind: "text", value: "متنـ فارسی" }]),
  ["forbidden-control"]
);
draftCases.bom = assertDraftIssues(
  "BOM fixture",
  fixture([{ kind: "text", value: "متن﻿ فارسی" }]),
  ["invalid-whitespace", "forbidden-control", "invalid-paragraph-whitespace"]
);
draftCases.zwj = assertDraftIssues(
  "ZWJ fixture",
  fixture([{ kind: "text", value: "متن‍ فارسی" }]),
  ["forbidden-control"]
);
draftCases.bidiOverride = assertDraftIssues(
  "Bidi-override fixture",
  fixture([{ kind: "text", value: "متن‮ فارسی" }]),
  ["forbidden-control"]
);
draftCases.bidiEmbedding = assertDraftIssues(
  "Bidi-embedding fixture",
  fixture([{ kind: "text", value: "متن‪ فارسی" }]),
  ["forbidden-control"]
);
draftCases.invalidZwnj = assertDraftIssues(
  "Invalid-ZWNJ fixture",
  fixture([{ kind: "text", value: "‌متن فارسی" }]),
  ["invalid-zwnj"]
);
draftCases.rawTechnicalContent = assertDraftIssues(
  "Raw-technical-content fixture",
  fixture([{ kind: "text", value: "متن PLC 123" }]),
  ["raw-technical-content"]
);

draftCases.persianDigits = validateFixture(
  fixture([{ kind: "text", value: "متن فارسی ۰۱۲۳۴۵۶۷۸۹" }])
);
assert(
  draftCases.persianDigits.valid,
  "Persian digits in Persian prose must pass."
);
draftCases.persianPunctuation = validateFixture(
  fixture([{ kind: "text", value: "متن فارسی، درست است." }])
);
assert(draftCases.persianPunctuation.valid, "Persian punctuation must pass.");
draftCases.nonAsciiLatin = assertDraftIssues(
  "Non-ASCII-Latin fixture",
  fixture([{ kind: "text", value: "متن فارسی é" }]),
  ["raw-technical-content"]
);

const separatedSegments = fixture([
  { kind: "text", value: "متن آزمایش‌شده " },
  { kind: "technical", value: product.partNumber },
]);
draftCases.exactTechnicalToken = validateFixture(separatedSegments);
assert(
  draftCases.exactTechnicalToken.valid,
  "Exact canonical technical token must pass."
);
draftCases.unknownTechnicalToken = assertDraftIssues(
  "Unknown-token fixture",
  fixture([
    { kind: "text", value: "متن فارسی " },
    { kind: "technical", value: "INVENTED-123" },
  ]),
  ["unapproved-technical-token"]
);
draftCases.alteredCaseToken = assertDraftIssues(
  "Altered-case-token fixture",
  fixture([
    { kind: "text", value: "متن فارسی " },
    { kind: "technical", value: product.title.toLowerCase() },
  ]),
  ["unapproved-technical-token"]
);
draftCases.alteredPunctuationToken = assertDraftIssues(
  "Altered-punctuation-token fixture",
  fixture([
    { kind: "text", value: "متن فارسی " },
    { kind: "technical", value: product.partNumber.replace("-", "/") },
  ]),
  ["unapproved-technical-token"]
);
draftCases.substringToken = assertDraftIssues(
  "Substring-token fixture",
  fixture([
    { kind: "text", value: "متن فارسی " },
    { kind: "technical", value: product.partNumber.slice(0, -1) },
  ]),
  ["unapproved-technical-token"]
);
draftCases.crossProductToken = assertDraftIssues(
  "Cross-Product-token fixture",
  fixture([
    { kind: "text", value: "متن فارسی " },
    { kind: "technical", value: secondProduct.partNumber },
  ]),
  ["unapproved-technical-token"]
);

draftCases.fuzzyTechnicalToken = assertDraftIssues(
  "Fuzzy-token fixture",
  fixture([
    { kind: "text", value: "متن فارسی " },
    { kind: "technical", value: `${product.partNumber}~` },
  ]),
  ["unapproved-technical-token"]
);

const exactAssociatedToken = "ABC-123 / X+Y (Z)";
const exactAssociatedTokenProduct: Product = {
  ...product,
  partNumber: exactAssociatedToken,
};
draftCases.exactAssociatedToken = validateFixture(
  fixture(
    [
      { kind: "text", value: "متن فارسی " },
      { kind: "technical", value: exactAssociatedToken },
    ],
    exactAssociatedTokenProduct
  ),
  [exactAssociatedTokenProduct]
);
assert(
  draftCases.exactAssociatedToken.valid,
  "An exact Product-associated token must preserve digits, symbols, slash, hyphen, spacing, and case."
);
draftCases.alteredSpacingToken = assertDraftIssues(
  "Altered-spacing-token fixture",
  fixture(
    [
      { kind: "text", value: "متن فارسی " },
      { kind: "technical", value: exactAssociatedToken.replace(" / ", "/") },
    ],
    exactAssociatedTokenProduct
  ),
  ["unapproved-technical-token"],
  [exactAssociatedTokenProduct]
);

const composedToken = "CAFÉ-123";
const normalizedTokenProduct: Product = {
  ...product,
  partNumber: composedToken,
};
draftCases.exactNormalizedToken = validateFixture(
  fixture(
    [
      { kind: "text", value: "متن فارسی " },
      { kind: "technical", value: composedToken },
    ],
    normalizedTokenProduct
  ),
  [normalizedTokenProduct]
);
assert(
  draftCases.exactNormalizedToken.valid,
  "An exact NFC Product-associated token must pass."
);
draftCases.normalizedMismatchToken = assertDraftIssues(
  "Normalization-mismatch-token fixture",
  fixture(
    [
      { kind: "text", value: "متن فارسی " },
      { kind: "technical", value: composedToken.normalize("NFD") },
    ],
    normalizedTokenProduct
  ),
  ["non-normalized-copy", "unapproved-technical-token"],
  [normalizedTokenProduct]
);

const fakeSeoDescription = "CANONICAL SEO DESCRIPTION MUST NOT BE TECHNICAL";
const fakeSeoProduct: Product = {
  ...product,
  seoTitle: "CANONICAL SEO TITLE MUST NOT WIN",
  seoDescription: fakeSeoDescription,
};
draftCases.seoTitleAsTechnical = assertDraftIssues(
  "SEO-title-as-technical fixture",
  fixture(
    [
      { kind: "text", value: "متن فارسی " },
      { kind: "technical", value: fakeSeoProduct.seoTitle ?? "" },
    ],
    fakeSeoProduct
  ),
  ["unapproved-technical-token"],
  [fakeSeoProduct]
);
draftCases.seoDescriptionAsTechnical = assertDraftIssues(
  "SEO-description-as-technical fixture",
  fixture(
    [
      { kind: "text", value: "متن فارسی " },
      { kind: "technical", value: fakeSeoDescription },
    ],
    fakeSeoProduct
  ),
  ["unapproved-technical-token"],
  [fakeSeoProduct]
);
draftCases.canonicalShortDescriptionAsTechnical = assertDraftIssues(
  "Canonical-short-description-as-technical fixture",
  fixture([
    { kind: "text", value: "متن فارسی " },
    { kind: "technical", value: product.shortDescription },
  ]),
  ["unapproved-technical-token"]
);
assert(
  product.description !== undefined,
  "Canonical fixture Product must expose a long description."
);
draftCases.canonicalLongDescriptionAsTechnical = assertDraftIssues(
  "Canonical-long-description-as-technical fixture",
  fixture([
    { kind: "text", value: "متن فارسی " },
    { kind: "technical", value: product.description },
  ]),
  ["unapproved-technical-token"]
);

const atomicSpecificationValue = product.specifications?.["Work Memory"];
assert(
  atomicSpecificationValue !== undefined,
  "Canonical fixture Product must expose Work Memory."
);
draftCases.atomicSpecificationValue = validateFixture(
  fixture([
    { kind: "text", value: "متن فارسی " },
    { kind: "technical", value: atomicSpecificationValue },
  ])
);
assert(
  draftCases.atomicSpecificationValue.valid,
  "Canonical atomic engineering values must remain available."
);

const expectedBatch01TechnicalTokenOverrides = [
  {
    productId: "siemens-s7-1200-cpu-211-1ae40",
    tokens: ["0-10 V DC"],
  },
  {
    productId: "siemens-s7-1200-cpu-212-1ae40",
    tokens: ["0-10 V DC"],
  },
  {
    productId: "siemens-s7-1200-cpu-214-1ag40",
    tokens: ["0-10 V DC"],
  },
  {
    productId: "siemens-s7-1200-cpu-215-1ag40",
    tokens: ["0-10 V DC", "0-20 mA DC"],
  },
  {
    productId: "siemens-s7-1200-cpu-217-1ag40",
    tokens: ["0-10 V DC", "0-20 mA DC", "RS-422/485", "PROFINET"],
  },
] as const;

const expectedBatch02TechnicalTokenOverrides = [
  {
    productId: "siemens-s7-300-cpu-315f-2dp-6es7315-6ff04-0ab0",
    tokens: ["MPI", "PROFIBUS DP"],
  },
  {
    productId: "siemens-s7-300-cpu-315f-2pn-dp-6es7315-2fj14-0ab0",
    tokens: ["MPI/DP", "PROFINET"],
  },
  {
    productId: "siemens-s7-300-cpu-317f-2dp-6es7317-6ff04-0ab0",
    tokens: ["MPI/DP", "PROFIBUS DP"],
  },
  {
    productId: "siemens-s7-300-cpu-317f-2pn-dp-6es7317-2fk14-0ab0",
    tokens: ["MPI/DP", "PROFINET"],
  },
  {
    productId: "siemens-s7-300-cpu-319f-3pn-dp-3fl01-0ab0",
    tokens: ["MPI/DP", "PROFIBUS DP", "PROFINET"],
  },
] as const;
const expectedBatch03ProductIds = [
  "siemens-s7-300-sm321-di-16-24vdc-1bh02-0aa0",
  "siemens-s7-300-sm321-di-16-24vdc-1bh10-0aa0",
  "siemens-s7-300-sm321-di-32-24vdc-1bl00-0aa0",
  "siemens-s7-300-sm321-di-64-24vdc-1bp00-0aa0",
  "siemens-s7-300-sm321-di-16-48-125vdc-1ch20-0aa0",
] as const satisfies readonly ProductId[];
const expectedBatch03ProductIdSet = new Set<ProductId>(
  expectedBatch03ProductIds
);
const expectedCombinedTechnicalTokenOverrides = [
  ...expectedBatch01TechnicalTokenOverrides,
  ...expectedBatch02TechnicalTokenOverrides,
] as const;

const reviewedTechnicalTokenOverrides =
  getReviewedProductTechnicalTokenOverrideEntries();
const batch01TechnicalTokenOverrides = Object.freeze(
  reviewedTechnicalTokenOverrides.slice(
    0,
    expectedBatch01TechnicalTokenOverrides.length
  )
);
const batch02TechnicalTokenOverrides = Object.freeze(
  reviewedTechnicalTokenOverrides.slice(
    expectedBatch01TechnicalTokenOverrides.length
  )
);
const batch03TechnicalTokenOverrides = Object.freeze(
  reviewedTechnicalTokenOverrides.filter((entry) =>
    expectedBatch03ProductIdSet.has(entry.productId)
  )
);
const protectedOverrideSnapshotBeforeMutation = JSON.stringify(
  reviewedTechnicalTokenOverrides
);
const protectedSnapshotMutationAttempts = [
  Reflect.set(
    reviewedTechnicalTokenOverrides as unknown as Record<string, unknown>,
    "0",
    { productId: "mutated", tokens: ["MUTATED"] }
  ),
  Reflect.set(
    batch01TechnicalTokenOverrides[0] as unknown as Record<string, unknown>,
    "productId",
    "mutated"
  ),
  Reflect.set(
    batch01TechnicalTokenOverrides[0].tokens as unknown as Record<
      string,
      unknown
    >,
    "0",
    "MUTATED"
  ),
];
const secondReviewedTechnicalTokenOverrideSnapshot =
  getReviewedProductTechnicalTokenOverrideEntries();
const uniqueBatch01TechnicalTokenOverrides = new Set(
  batch01TechnicalTokenOverrides.flatMap((entry) => entry.tokens)
);
const uniqueBatch02TechnicalTokenOverrides = new Set(
  batch02TechnicalTokenOverrides.flatMap((entry) => entry.tokens)
);
const uniqueCombinedTechnicalTokenOverrides = new Set(
  reviewedTechnicalTokenOverrides.flatMap((entry) => entry.tokens)
);

assert(
  JSON.stringify(batch01TechnicalTokenOverrides) ===
    JSON.stringify(expectedBatch01TechnicalTokenOverrides),
  "Batch 01 technical-token overrides must match the exact reviewed mapping."
);
assert(
  batch01TechnicalTokenOverrides.length === 5 &&
    batch01TechnicalTokenOverrides.reduce(
      (count, entry) => count + entry.tokens.length,
      0
    ) === 9 &&
    uniqueBatch01TechnicalTokenOverrides.size === 4,
  "Batch 01 technical-token override mapping must contain exactly five Product IDs, nine assignments, and four unique strings."
);
assert(
  JSON.stringify(batch02TechnicalTokenOverrides) ===
    JSON.stringify(expectedBatch02TechnicalTokenOverrides),
  "Batch 02 technical-token overrides must match the exact reviewed mapping."
);
assert(
  batch02TechnicalTokenOverrides.length === 5 &&
    batch02TechnicalTokenOverrides.reduce(
      (count, entry) => count + entry.tokens.length,
      0
    ) === 11 &&
    uniqueBatch02TechnicalTokenOverrides.size === 4,
  "Batch 02 technical-token override mapping must contain exactly five Product IDs, eleven assignments, and four unique strings."
);
assert(
  batch03TechnicalTokenOverrides.length === 0,
  "Batch 03 must add no Product-level technical-token override entries."
);
assert(
  JSON.stringify(reviewedTechnicalTokenOverrides) ===
      JSON.stringify(expectedCombinedTechnicalTokenOverrides) &&
    reviewedTechnicalTokenOverrides.length === 10 &&
    reviewedTechnicalTokenOverrides.reduce(
      (count, entry) => count + entry.tokens.length,
      0
    ) === 20 &&
    uniqueCombinedTechnicalTokenOverrides.size === 7,
  "Combined technical-token overrides must contain exactly ten Product IDs, twenty assignments, and seven unique strings."
);
assert(
  Object.isFrozen(reviewedTechnicalTokenOverrides) &&
    reviewedTechnicalTokenOverrides.every(
      (entry) => Object.isFrozen(entry) && Object.isFrozen(entry.tokens)
    ) &&
    reviewedTechnicalTokenOverrides !==
      secondReviewedTechnicalTokenOverrideSnapshot &&
    reviewedTechnicalTokenOverrides.every(
      (entry, index) =>
        entry !== secondReviewedTechnicalTokenOverrideSnapshot[index] &&
        entry.tokens !==
          secondReviewedTechnicalTokenOverrideSnapshot[index]?.tokens
    ) &&
    protectedSnapshotMutationAttempts.every((result) => !result) &&
    JSON.stringify(reviewedTechnicalTokenOverrides) ===
      protectedOverrideSnapshotBeforeMutation &&
    JSON.stringify(secondReviewedTechnicalTokenOverrideSnapshot) ===
      protectedOverrideSnapshotBeforeMutation,
  "Combined technical-token override mutation attempts must fail without changing source or later reads."
);
assert(
  reviewedGlobalTechnicalTokens.length === 0,
  "The global technical-token allowlist must remain empty."
);

const expectedBatch02CanonicalProducts = [
  {
    productId: "siemens-s7-300-cpu-315f-2dp-6es7315-6ff04-0ab0",
    title: "SIMATIC S7-300 CPU 315F-2 DP",
    partNumber: "6ES7315-6FF04-0AB0",
    canonicalDescription:
      "SIMATIC S7-300 CPU 315F-2 DP fail-safe central processing unit with 384 KB work memory, MPI and PROFIBUS DP interfaces and second DP master/slave interface.",
    workMemory: "384 KB",
    interfaces: "MPI, PROFIBUS DP",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7315-6FF04-0AB0",
  },
  {
    productId: "siemens-s7-300-cpu-315f-2pn-dp-6es7315-2fj14-0ab0",
    title: "SIMATIC S7-300 CPU 315F-2 PN/DP",
    partNumber: "6ES7315-2FJ14-0AB0",
    canonicalDescription:
      "SIMATIC S7-300 CPU 315F-2 PN/DP fail-safe central processing unit with 512 KB work memory, MPI/DP and Ethernet PROFINET interface with 2-port switch.",
    workMemory: "512 KB",
    interfaces: "MPI/DP, PROFINET",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/br/Catalog/Product?SiepCountryCode=BR&mlfb=6ES7315-2FJ14-0AB0",
  },
  {
    productId: "siemens-s7-300-cpu-317f-2dp-6es7317-6ff04-0ab0",
    title: "SIMATIC S7-300 CPU 317F-2 DP",
    partNumber: "6ES7317-6FF04-0AB0",
    canonicalDescription:
      "SIMATIC S7-300 CPU 317F-2 DP fail-safe central processing unit with 1.5 MB work memory, MPI/DP and second PROFIBUS DP master/slave interface.",
    workMemory: "1.5 MB",
    interfaces: "MPI/DP, PROFIBUS DP",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7317-6FF04-0AB0",
  },
  {
    productId: "siemens-s7-300-cpu-317f-2pn-dp-6es7317-2fk14-0ab0",
    title: "SIMATIC S7-300 CPU 317F-2 PN/DP",
    partNumber: "6ES7317-2FK14-0AB0",
    canonicalDescription:
      "SIMATIC S7-300 CPU 317F-2 PN/DP fail-safe central processing unit with 1.5 MB work memory, MPI/DP and Ethernet PROFINET interface with 2-port switch.",
    workMemory: "1.5 MB",
    interfaces: "MPI/DP, PROFINET",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7317-2FK14-0AB0",
  },
  {
    productId: "siemens-s7-300-cpu-319f-3pn-dp-3fl01-0ab0",
    title: "SIMATIC S7-300 CPU 319F-3 PN/DP",
    partNumber: "6ES7318-3FL01-0AB0",
    canonicalDescription:
      "SIMATIC S7-300 CPU 319F-3 PN/DP fail-safe central processing unit with 2.5 MB work memory, MPI/DP, DP master/slave and Ethernet PROFINET interfaces.",
    workMemory: "2.5 MB",
    interfaces: "MPI/DP, PROFIBUS DP, PROFINET",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/inosatavtomatica/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7318-3FL01-0AB0",
  },
] as const;

const expectedBatch03CanonicalProducts = [
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-1bh02-0aa0",
    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC",
    partNumber: "6ES7321-1BH02-0AA0",
    canonicalDescription:
      "SIMATIC S7-300 digital input SM 321, isolated, 16 digital inputs, 24 V DC, 1 x 20-pole.",
    digitalInputs: "16",
    inputVoltage: "24 V DC",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7321-1BH02-0AA0",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-1bh10-0aa0",
    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC HF",
    partNumber: "6ES7321-1BH10-0AA0",
    canonicalDescription:
      "SIMATIC S7-300 digital input SM 321, isolated, 16 digital inputs, 24 V DC, 1 x 20-pole.",
    digitalInputs: "16",
    inputVoltage: "24 V DC",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/pt/Catalog/Product/?mlfb=6ES7321-1BH10-0AA0",
  },
  {
    productId: "siemens-s7-300-sm321-di-32-24vdc-1bl00-0aa0",
    title: "SIMATIC S7-300 SM 321 32 DI 24 V DC",
    partNumber: "6ES7321-1BL00-0AA0",
    canonicalDescription:
      "SIMATIC S7-300 digital input SM 321, isolated, 32 digital inputs, 24 V DC, 1 x 40-pole.",
    digitalInputs: "32",
    inputVoltage: "24 V DC",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7321-1BL00-0AA0",
  },
  {
    productId: "siemens-s7-300-sm321-di-64-24vdc-1bp00-0aa0",
    title: "SIMATIC S7-300 SM 321 64 DI 24 V DC",
    partNumber: "6ES7321-1BP00-0AA0",
    canonicalDescription:
      "SIMATIC S7-300 digital input SM 321, isolated in groups of 16, 64 digital inputs, 24 V DC, 3 ms input delay, with sinking/sourcing terminal blocks.",
    digitalInputs: "64",
    inputVoltage: "24 V DC",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7321-1BP00-0AA0",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-48-125vdc-1ch20-0aa0",
    title: "SIMATIC S7-300 SM 321 16 DI 48-125 V DC",
    partNumber: "6ES7321-1CH20-0AA0",
    canonicalDescription:
      "SIMATIC S7-300 digital input SM 321, isolated, 16 digital inputs, 48-125 V DC, 1 x 20-pole.",
    digitalInputs: "16",
    inputVoltage: "48-125 V DC",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7321-1CH20-0AA0",
  },
] as const;

const batch01Products = expectedBatch01TechnicalTokenOverrides.map(
  (expectedEntry) => {
    const matchedProduct = products.find(
      (candidate) => candidate.id === expectedEntry.productId
    );
    assert(
      matchedProduct !== undefined,
      `Batch 01 Product must remain canonical: ${expectedEntry.productId}`
    );
    return matchedProduct;
  }
);
const batch01ProductsById = new Map(
  batch01Products.map((candidate) => [candidate.id, candidate])
);
const batch01ProductionResolver = createProductTechnicalTokenOverrideResolver(
  batch01TechnicalTokenOverrides,
  products
);
const batch02Products = expectedBatch02CanonicalProducts.map((expectedEntry) => {
  const matchedProduct = products.find(
    (candidate) => candidate.id === expectedEntry.productId
  );
  assert(
    matchedProduct !== undefined,
    `Batch 02 Product must remain canonical: ${expectedEntry.productId}`
  );
  assert(
    matchedProduct.title === expectedEntry.title &&
      matchedProduct.partNumber === expectedEntry.partNumber &&
      matchedProduct.shortDescription === expectedEntry.canonicalDescription &&
      matchedProduct.description === expectedEntry.canonicalDescription &&
      matchedProduct.specifications?.["Work Memory"] ===
        expectedEntry.workMemory &&
      matchedProduct.specifications?.Interfaces === expectedEntry.interfaces &&
      matchedProduct.siemensUrl === expectedEntry.siemensUrl,
    `Batch 02 canonical Product binding must remain exact: ${expectedEntry.productId}`
  );
  return matchedProduct;
});
const batch02ProductsById = new Map(
  batch02Products.map((candidate) => [candidate.id, candidate])
);
const batch02ProductionResolver = createProductTechnicalTokenOverrideResolver(
  batch02TechnicalTokenOverrides,
  products
);
const batch03Products = expectedBatch03CanonicalProducts.map((expectedEntry) => {
  const matchedProduct = products.find(
    (candidate) => candidate.id === expectedEntry.productId
  );
  assert(
    matchedProduct !== undefined,
    `Batch 03 Product must remain canonical: ${expectedEntry.productId}`
  );
  assert(
    matchedProduct.title === expectedEntry.title &&
      matchedProduct.partNumber === expectedEntry.partNumber &&
      matchedProduct.shortDescription === expectedEntry.canonicalDescription &&
      matchedProduct.description === expectedEntry.canonicalDescription &&
      matchedProduct.brandId === "siemens" &&
      matchedProduct.categoryId === "PLC" &&
      matchedProduct.familyId === "S7-300" &&
      matchedProduct.seriesId === "S7-300" &&
      matchedProduct.productTypeId === "Signal Module" &&
      matchedProduct.variantId === "digital-input" &&
      matchedProduct.lifecycle === "legacy" &&
      matchedProduct.specifications?.["Digital Inputs"] ===
        expectedEntry.digitalInputs &&
      matchedProduct.specifications?.["Input Voltage"] ===
        expectedEntry.inputVoltage &&
      matchedProduct.siemensUrl === expectedEntry.siemensUrl,
    `Batch 03 canonical Product binding must remain exact: ${expectedEntry.productId}`
  );
  return matchedProduct;
});
const batch03ProductionResolver = createProductTechnicalTokenOverrideResolver(
  batch03TechnicalTokenOverrides,
  products
);
const combinedProductionResolver = createProductTechnicalTokenOverrideResolver(
  reviewedTechnicalTokenOverrides,
  products
);

assert(
  batch01ProductionResolver.valid &&
    batch01ProductionResolver.entryCount === 5 &&
    batch01ProductionResolver.tokenCount === 9 &&
    JSON.stringify(batch01ProductionResolver.entries) ===
      JSON.stringify(expectedBatch01TechnicalTokenOverrides),
  `Batch 01 production technical-token resolver must validate: ${batch01ProductionResolver.issues
    .map((issue) => issue.code)
    .join(", ")}`
);
assert(
  Object.isFrozen(batch01ProductionResolver) &&
    Object.isFrozen(batch01ProductionResolver.entries) &&
    Object.isFrozen(batch01ProductionResolver.issues) &&
    batch01ProductionResolver.entries.every(
      (entry) => Object.isFrozen(entry) && Object.isFrozen(entry.tokens)
    ),
  "The production resolver snapshot and every returned nested value must be frozen."
);
assert(
  batch02ProductionResolver.valid &&
    batch02ProductionResolver.entryCount === 5 &&
    batch02ProductionResolver.tokenCount === 11 &&
    JSON.stringify(batch02ProductionResolver.entries) ===
      JSON.stringify(expectedBatch02TechnicalTokenOverrides),
  `Batch 02 production technical-token resolver must validate: ${batch02ProductionResolver.issues
    .map((issue) => issue.code)
    .join(", ")}`
);
assert(
  batch03ProductionResolver.valid &&
    batch03ProductionResolver.entryCount === 0 &&
    batch03ProductionResolver.tokenCount === 0 &&
    batch03ProductionResolver.issues.length === 0 &&
    JSON.stringify(batch03ProductionResolver.entries) === "[]",
  `Batch 03 production technical-token resolver must remain empty and valid: ${batch03ProductionResolver.issues
    .map((issue) => issue.code)
    .join(", ")}`
);
assert(
  combinedProductionResolver.valid &&
    combinedProductionResolver.entryCount === 10 &&
    combinedProductionResolver.tokenCount === 20 &&
    JSON.stringify(combinedProductionResolver.entries) ===
      JSON.stringify(expectedCombinedTechnicalTokenOverrides),
  `Combined production technical-token resolver must validate: ${combinedProductionResolver.issues
    .map((issue) => issue.code)
    .join(", ")}`
);

const mutableResolverSource: { productId: string; tokens: string[] }[] =
  expectedBatch01TechnicalTokenOverrides.map((entry) => ({
    productId: entry.productId,
    tokens: [...entry.tokens],
  }));
const detachedResolver = createProductTechnicalTokenOverrideResolver(
  mutableResolverSource,
  products
);
const detached1211Tokens = detachedResolver.getTokensForProduct(
  "siemens-s7-1200-cpu-211-1ae40"
);
const detached1212Tokens = detachedResolver.getTokensForProduct(
  "siemens-s7-1200-cpu-212-1ae40"
);
mutableResolverSource[0].productId = "mutated";
mutableResolverSource[0].tokens[0] = "MUTATED";
const returnedTokenMutationAttempt = Reflect.set(
  detached1211Tokens as unknown as Record<string, unknown>,
  "0",
  "MUTATED"
);
const returnedEntryMutationAttempt = Reflect.set(
  detachedResolver.entries[0] as unknown as Record<string, unknown>,
  "productId",
  "mutated"
);
const later1211Tokens = detachedResolver.getTokensForProduct(
  "siemens-s7-1200-cpu-211-1ae40"
);
const later1212Tokens = detachedResolver.getTokensForProduct(
  "siemens-s7-1200-cpu-212-1ae40"
);
assert(
  !returnedTokenMutationAttempt &&
    !returnedEntryMutationAttempt &&
    Object.isFrozen(detached1211Tokens) &&
    Object.isFrozen(later1211Tokens) &&
    detached1211Tokens !== later1211Tokens &&
    detached1211Tokens !== detachedResolver.entries[0]?.tokens &&
    JSON.stringify(later1211Tokens) === JSON.stringify(["0-10 V DC"]) &&
    JSON.stringify(detached1212Tokens) === JSON.stringify(later1212Tokens) &&
    JSON.stringify(later1212Tokens) === JSON.stringify(["0-10 V DC"]),
  "Resolver snapshots must detach source and returned references while preserving later and cross-Product reads."
);
const unknownOverrideTokens = batch01ProductionResolver.getTokensForProduct(
  "not-a-canonical-product"
);
assert(
  Object.isFrozen(unknownOverrideTokens) && unknownOverrideTokens.length === 0,
  "An unknown Product ID must receive no override authorization."
);

function overrideFixture(
  fixtureProduct: Readonly<Product>,
  token: string
): MutableOverlay {
  return fixture(
    [
      { kind: "text", value: `${PERSIAN_TEXT} ` },
      { kind: "technical", value: token },
    ],
    fixtureProduct
  );
}

const approvedOverrideResults: ValidationResult[] = [];
batch01TechnicalTokenOverrides.forEach((entry) => {
  const fixtureProduct = batch01ProductsById.get(entry.productId);
  assert(
    fixtureProduct !== undefined,
    `Override Product must exist: ${entry.productId}`
  );

  entry.tokens.forEach((token) => {
    const result = validateFixture(
      overrideFixture(fixtureProduct, token),
      products
    );
    assert(
      result.valid,
      `Approved override must pass only for its mapped Product: ${entry.productId} / ${token}`
    );
    approvedOverrideResults.push(result);
    draftCases[`approvedOverride:${entry.productId}:${token}`] = result;
  });
});
assert(
  approvedOverrideResults.length === 9 &&
    approvedOverrideResults.every((result) => result.valid),
  "All nine approved assignments must pass through Product-copy validation."
);

const approvedBatch02OverrideResults: ValidationResult[] = [];
batch02TechnicalTokenOverrides.forEach((entry) => {
  const fixtureProduct = batch02ProductsById.get(entry.productId);
  assert(
    fixtureProduct !== undefined,
    `Batch 02 override Product must exist: ${entry.productId}`
  );

  entry.tokens.forEach((token) => {
    const result = validateFixture(
      overrideFixture(fixtureProduct, token),
      products
    );
    assert(
      result.valid,
      `Batch 02 approved override must pass only for its mapped Product: ${entry.productId} / ${token}`
    );
    approvedBatch02OverrideResults.push(result);
    draftCases[`approvedBatch02Override:${entry.productId}:${token}`] = result;
  });
});
assert(
  approvedBatch02OverrideResults.length === 11 &&
    approvedBatch02OverrideResults.every((result) => result.valid),
  "All eleven Batch 02 approved assignments must pass through Product-copy validation."
);

const batch02OverrideTokensByProduct = new Map(
  batch02TechnicalTokenOverrides.map((entry) => [entry.productId, entry.tokens])
);
const batch02IsolationCases = batch02TechnicalTokenOverrides.flatMap((entry) =>
  entry.tokens.flatMap((token) =>
    batch02Products
      .filter(
        (candidate) =>
          candidate.id !== entry.productId &&
          !batch02OverrideTokensByProduct.get(candidate.id)?.includes(token)
      )
      .map((candidate) => ({ product: candidate, token }))
  )
);
const batch02IsolationResults = batch02IsolationCases.map(
  ({ product: fixtureProduct, token }) =>
    assertDraftIncludesIssues(
      `Batch 02 Product-level isolation ${fixtureProduct.id} / ${token}`,
      overrideFixture(fixtureProduct, token),
      ["unapproved-technical-token"],
      products
    )
);
assert(
  batch02IsolationResults.length > 0 &&
    batch02IsolationResults.every((result) => !result.valid),
  "Batch 02 technical-token assignments must remain strictly isolated to their mapped Products."
);

const unauthorizedBatch02StandaloneTokens = [
  "DP",
  "Ethernet",
  "master/slave",
] as const;
const unauthorizedBatch02StandaloneResults = batch02Products.flatMap(
  (fixtureProduct) =>
    unauthorizedBatch02StandaloneTokens.map((token) =>
      assertDraftIncludesIssues(
        `Batch 02 unauthorized standalone token ${fixtureProduct.id} / ${token}`,
        overrideFixture(fixtureProduct, token),
        ["unapproved-technical-token"],
        products
      )
    )
);
assert(
  unauthorizedBatch02StandaloneResults.every((result) => !result.valid),
  "Batch 02 must not authorize standalone DP, Ethernet, or master/slave."
);

batch02Products.forEach((fixtureProduct) => {
  const expectedProduct = expectedBatch02CanonicalProducts.find(
    (candidate) => candidate.productId === fixtureProduct.id
  );
  assert(
    expectedProduct !== undefined,
    `Batch 02 canonical expectation must exist: ${fixtureProduct.id}`
  );
  const canonicalDerivedTokens = [
    expectedProduct.title,
    "CPU",
    expectedProduct.workMemory,
    "24 V DC",
  ] as const;
  const reviewedOverrides =
    batch02ProductionResolver.getTokensForProduct(fixtureProduct.id);
  canonicalDerivedTokens.forEach((token) => {
    assert(
      !reviewedOverrides.includes(token) &&
        deriveAllowedTechnicalTokens(fixtureProduct).has(token) &&
        validateFixture(
          overrideFixture(fixtureProduct, token),
          products
        ).valid,
      `Batch 02 canonical-derived token must remain valid without an override: ${fixtureProduct.id} / ${token}`
    );
  });
});

batch03Products.forEach((fixtureProduct) => {
  const expectedProduct = expectedBatch03CanonicalProducts.find(
    (candidate) => candidate.productId === fixtureProduct.id
  );
  assert(
    expectedProduct !== undefined,
    `Batch 03 canonical expectation must exist: ${fixtureProduct.id}`
  );
  const canonicalDerivedTokens = [
    expectedProduct.title,
    expectedProduct.digitalInputs,
    expectedProduct.inputVoltage,
  ] as const;
  canonicalDerivedTokens.forEach((token) => {
    assert(
      batch03ProductionResolver.getTokensForProduct(fixtureProduct.id)
        .length === 0 &&
        deriveAllowedTechnicalTokens(fixtureProduct).has(token) &&
        validateFixture(overrideFixture(fixtureProduct, token), products).valid,
      `Batch 03 canonical-derived token must remain valid without an override: ${fixtureProduct.id} / ${token}`
    );
  });
});

const cpu1211 = batch01ProductsById.get("siemens-s7-1200-cpu-211-1ae40");
const cpu1215 = batch01ProductsById.get("siemens-s7-1200-cpu-215-1ag40");
const cpu1217 = batch01ProductsById.get("siemens-s7-1200-cpu-217-1ag40");
assert(cpu1211 !== undefined, "CPU 1211C must remain canonical.");
assert(cpu1215 !== undefined, "CPU 1215C must remain canonical.");
assert(cpu1217 !== undefined, "CPU 1217C must remain canonical.");

const expectedStandaloneProfinetProductIds = [
  "siemens-s7-1200-cpu-211-1ae40",
  "siemens-s7-1200-cpu-212-1ae40",
  "siemens-s7-1200-cpu-214-1ag40",
  "siemens-s7-1200-cpu-215-1ag40",
] as const;
const derivedTokenExpectations = [
  ...expectedStandaloneProfinetProductIds.map((productId) => ({
    productId,
    token: "PROFINET",
  })),
  {
    productId: "siemens-s7-1200-cpu-217-1ag40",
    token: "PROFINET, RS-422/485",
  },
] as const;
const derivedTokenResults = derivedTokenExpectations.map(
  ({ productId, token }) => {
    const fixtureProduct = batch01ProductsById.get(productId);
    assert(
      fixtureProduct !== undefined,
      `Derived-token Product must remain canonical: ${productId}`
    );
    assert(
      deriveAllowedTechnicalTokens(fixtureProduct).has(token),
      `Derived token must remain available for ${productId}: ${token}`
    );
    const result = validateFixture(
      overrideFixture(fixtureProduct, token),
      products
    );
    assert(
      result.valid,
      `Derived token must pass Product-copy validation for ${productId}: ${token}`
    );
    return result;
  }
);
batch01Products.forEach((fixtureProduct) => {
  const titleResult = validateFixture(
    overrideFixture(fixtureProduct, fixtureProduct.title),
    products
  );
  assert(
    titleResult.valid,
    `Canonical title derivation must remain valid for ${fixtureProduct.id}.`
  );
});
assert(
  deriveAllowedTechnicalTokens(cpu1217).has("PROFINET") &&
    batch01ProductionResolver
      .getTokensForProduct(cpu1217.id)
      .includes("PROFINET"),
  "CPU 1217C production authorization must include its exact standalone PROFINET override."
);
const cpu1217StandaloneProfinetResult = validateFixture(
  overrideFixture(cpu1217, "PROFINET"),
  products
);
assert(
  batch01ProductionResolver
    .getTokensForProduct(cpu1217.id)
    .includes("PROFINET") && cpu1217StandaloneProfinetResult.valid,
  "CPU 1217C standalone PROFINET must pass only through its exact Product override."
);
const cpu1217Rs422485OverrideResult = validateFixture(
  overrideFixture(cpu1217, "RS-422/485"),
  products
);
assert(
  batch01ProductionResolver
    .getTokensForProduct(cpu1217.id)
    .includes("RS-422/485") && cpu1217Rs422485OverrideResult.valid,
  "CPU 1217C RS-422/485 must remain accepted through its exact Product override."
);
assert(
  cpu1217.specifications?.Interfaces === "PROFINET, RS-422/485",
  "CPU 1217C must retain the complete combined canonical interface value."
);
const cpu1217StandaloneProfinetEvidence = "2 PROFINET ports.";
assert(
  cpu1217.shortDescription.includes(cpu1217StandaloneProfinetEvidence) &&
    cpu1217.description === cpu1217.shortDescription,
  "CPU 1217C standalone PROFINET override evidence must remain in its own identical canonical short and long descriptions."
);

const customCpu1217CombinedInterfaceOnly = {
  ...cpu1217,
  id: "custom-cpu-1217-combined-interface-only",
  shortDescription: cpu1217.shortDescription.replace(
    ` ${cpu1217StandaloneProfinetEvidence}`,
    ""
  ),
  description: cpu1217.description.replace(
    ` ${cpu1217StandaloneProfinetEvidence}`,
    ""
  ),
} as Readonly<Product>;
const customCpu1217WithoutStandaloneProfinet = {
  ...customCpu1217CombinedInterfaceOnly,
  id: "custom-cpu-1217-without-profinet-evidence",
  specifications: {
    ...customCpu1217CombinedInterfaceOnly.specifications,
    Interfaces: "RS-422/485",
  },
} as Readonly<Product>;
const customCpu1217StandaloneProfinetResolver =
  createProductTechnicalTokenOverrideResolver(
    [
      {
        productId: customCpu1217WithoutStandaloneProfinet.id,
        tokens: ["PROFINET"],
      },
    ],
    [...products, customCpu1217WithoutStandaloneProfinet]
  );
assert(
  !customCpu1217StandaloneProfinetResolver.valid &&
    customCpu1217StandaloneProfinetResolver.entries.length === 0 &&
    !deriveAllowedTechnicalTokens(customCpu1217CombinedInterfaceOnly).has(
      "PROFINET"
    ) &&
    deriveAllowedTechnicalTokens(customCpu1217CombinedInterfaceOnly).has(
      "PROFINET, RS-422/485"
    ) &&
    issueCodes(customCpu1217StandaloneProfinetResolver).includes(
      "invalid-override-evidence"
    ),
  "A CPU 1217C-like Product with only combined-interface evidence must not authorize standalone PROFINET."
);

const unrelatedS7300Product = products.find(
  (candidate) =>
    candidate.familyId === "S7-300" &&
    !deriveAllowedTechnicalTokens(candidate).has("0-10 V DC") &&
    !deriveAllowedTechnicalTokens(candidate).has("PROFINET")
);
assert(
  unrelatedS7300Product !== undefined,
  "An unrelated S7-300 isolation Product must exist."
);
const overrideIsolationCases = [
  {
    name: "0-10 V DC unrelated Product",
    product: unrelatedS7300Product,
    token: "0-10 V DC",
  },
  {
    name: "PROFINET unrelated Product",
    product: unrelatedS7300Product,
    token: "PROFINET",
  },
  ...batch01Products
    .filter(
      (candidate) =>
        candidate.id !== "siemens-s7-1200-cpu-215-1ag40" &&
        candidate.id !== "siemens-s7-1200-cpu-217-1ag40"
    )
    .map((candidate) => ({
      name: `0-20 mA DC ${candidate.id}`,
      product: candidate,
      token: "0-20 mA DC",
    })),
  ...batch01Products
    .filter((candidate) => candidate.id !== "siemens-s7-1200-cpu-217-1ag40")
    .map((candidate) => ({
      name: `RS-422/485 ${candidate.id}`,
      product: candidate,
      token: "RS-422/485",
    })),
];
const overrideIsolationResults = overrideIsolationCases.map(
  ({ name, product: fixtureProduct, token }) =>
    assertDraftIncludesIssues(
      `Override isolation ${name} fixture`,
      overrideFixture(fixtureProduct, token),
      ["unapproved-technical-token"],
      products
    )
);
draftCases.batchOverrideRejectedForUnrelatedProduct =
  overrideIsolationResults[0];
const unknownProduct = {
  ...cpu1211,
  id: "not-a-canonical-product",
} as Readonly<Product>;
const unknownProductOverrideResult = assertDraftIncludesIssues(
  "Unknown Product override fixture",
  overrideFixture(unknownProduct, "0-10 V DC"),
  ["unknown-product-id", "unapproved-technical-token"],
  products
);

interface OverrideConfigurationFailureFixture {
  readonly name: string;
  readonly configuration: unknown;
  readonly expectedCodes: readonly string[];
}

function runOverrideConfigurationFailureFixture({
  name,
  configuration,
  expectedCodes,
}: OverrideConfigurationFailureFixture) {
  const resolver = createProductTechnicalTokenOverrideResolver(
    configuration,
    products
  );
  const actualCodes = issueCodes(resolver);
  assert(!resolver.valid, `${name} configuration must fail.`);
  expectedCodes.forEach((code) =>
    assert(
      actualCodes.includes(code),
      `${name} configuration must report ${code}; received ${actualCodes.join(", ")}.`
    )
  );
  assert(
    resolver.entries.length === 0 &&
      Object.isFrozen(resolver) &&
      Object.isFrozen(resolver.entries) &&
      Object.isFrozen(resolver.issues) &&
      resolver.issues.every(Object.isFrozen) &&
      resolver.diagnostic !== undefined,
    `${name} configuration must expose only frozen diagnostics and zero authorization.`
  );
  assertThrows(
    () => resolver.getTokensForProduct("siemens-s7-1200-cpu-211-1ae40"),
    resolver.diagnostic,
    `${name} fail-closed resolver`
  );
  return resolver;
}

const valid1211Override = {
  productId: cpu1211.id,
  tokens: ["0-10 V DC"],
};
const invalidUnrelatedConfiguration = [
  valid1211Override,
  { productId: cpu1215.id, tokens: ["10 is ok"] },
];
const sparseOverrideConfiguration: unknown[] = [];
sparseOverrideConfiguration.length = 1;
const sparseTokenConfiguration = [
  { productId: cpu1211.id, tokens: [] as unknown[] },
];
sparseTokenConfiguration[0].tokens.length = 1;
const overrideConfigurationFailureFixtures = [
  {
    name: "unknown Product ID",
    configuration: [
      { productId: "not-a-canonical-product", tokens: ["0-10 V DC"] },
    ],
    expectedCodes: ["unknown-override-product-id"],
  },
  {
    name: "duplicate Product ID",
    configuration: [valid1211Override, valid1211Override],
    expectedCodes: ["duplicate-override-product-id"],
  },
  {
    name: "duplicate token assignment",
    configuration: [
      { productId: cpu1211.id, tokens: ["0-10 V DC", "0-10 V DC"] },
    ],
    expectedCodes: ["duplicate-override-token"],
  },
  {
    name: "malformed root shape",
    configuration: { entries: [valid1211Override] },
    expectedCodes: ["invalid-override-root"],
  },
  {
    name: "malformed entry shape",
    configuration: [null],
    expectedCodes: ["invalid-override-entry"],
  },
  {
    name: "sparse entry shape",
    configuration: sparseOverrideConfiguration,
    expectedCodes: ["invalid-override-entry"],
  },
  {
    name: "missing required field",
    configuration: [{ productId: cpu1211.id }],
    expectedCodes: ["missing-override-field", "invalid-override-tokens"],
  },
  {
    name: "extra unsupported field",
    configuration: [{ ...valid1211Override, unsupported: true }],
    expectedCodes: ["unsupported-override-field"],
  },
  {
    name: "invalid Product-ID type",
    configuration: [{ productId: 1211, tokens: ["0-10 V DC"] }],
    expectedCodes: ["invalid-override-product-id"],
  },
  {
    name: "invalid Product-ID value",
    configuration: [{ productId: " CPU 1211 ", tokens: ["0-10 V DC"] }],
    expectedCodes: ["invalid-override-product-id"],
  },
  {
    name: "invalid token type",
    configuration: [{ productId: cpu1211.id, tokens: [10] }],
    expectedCodes: ["invalid-override-token"],
  },
  {
    name: "sparse token shape",
    configuration: sparseTokenConfiguration,
    expectedCodes: ["invalid-override-token"],
  },
  {
    name: "invalid token value",
    configuration: [{ productId: cpu1211.id, tokens: ["10 is ok"] }],
    expectedCodes: ["invalid-override-token"],
  },
  {
    name: "missing canonical evidence",
    configuration: [{ productId: cpu1211.id, tokens: ["0-30 V DC"] }],
    expectedCodes: ["invalid-override-evidence"],
  },
  {
    name: "cross-Product-only evidence",
    configuration: [{ productId: cpu1211.id, tokens: ["0-20 mA DC"] }],
    expectedCodes: ["invalid-override-evidence"],
  },
  {
    name: "invalid unrelated entry blocks valid Product",
    configuration: invalidUnrelatedConfiguration,
    expectedCodes: ["invalid-override-token"],
  },
] satisfies readonly OverrideConfigurationFailureFixture[];
const overrideConfigurationFailureResults =
  overrideConfigurationFailureFixtures.map(
    runOverrideConfigurationFailureFixture
  );
const repeatedInvalidUnrelatedResolver =
  createProductTechnicalTokenOverrideResolver(
    invalidUnrelatedConfiguration,
    products
  );
assert(
  overrideConfigurationFailureResults.every(
    (resolver) => !resolver.valid && resolver.entries.length === 0
  ) &&
    repeatedInvalidUnrelatedResolver.diagnostic ===
      overrideConfigurationFailureResults.at(-1)?.diagnostic,
  "Every configuration failure must authorize zero tokens with deterministic diagnostics."
);

const cpu1211Description = cpu1211.description;
assert(
  cpu1211Description !== undefined,
  "CPU 1211C must retain a canonical description."
);
const productionNegativeCases = [
  { name: "leading whitespace", token: " 0-10 V DC", product: cpu1211 },
  { name: "trailing whitespace", token: "0-10 V DC ", product: cpu1211 },
  { name: "repeated spacing", token: "0-10 V  DC", product: cpu1211 },
  { name: "tab", token: "0-10\tV DC", product: cpu1211 },
  { name: "LF", token: "0-10\nV DC", product: cpu1211 },
  { name: "CR", token: "0-10\rV DC", product: cpu1211 },
  { name: "NBSP", token: "0-10\u00a0V DC", product: cpu1211 },
  { name: "C0 control", token: "0-10\u0001 V DC", product: cpu1211 },
  { name: "C1 control", token: "0-10\u0085 V DC", product: cpu1211 },
  { name: "bidi control", token: "0-10\u202e V DC", product: cpu1211 },
  { name: "zero-width", token: "0-10\u200b V DC", product: cpu1211 },
  {
    name: "non-NFC",
    token: "CAFÉ-123".normalize("NFD"),
    product: cpu1211,
  },
  { name: "alternate hyphen", token: "0–10 V DC", product: cpu1211 },
  { name: "alternate minus", token: "0−10 V DC", product: cpu1211 },
  { name: "alternate slash", token: "RS-422∕485", product: cpu1217 },
  { name: "alternate decimal", token: "0,10 V DC", product: cpu1211 },
  { name: "case change", token: "0-10 v dc", product: cpu1211 },
  { name: "mixed-unit case change", token: "0-20 MA DC", product: cpu1215 },
  {
    name: "empty token",
    token: "",
    product: cpu1211,
    expectedCodes: ["empty-segment"],
  },
  { name: "excessive length", token: "A".repeat(81), product: cpu1211 },
  { name: "partial range", token: "0-10 V", product: cpu1211 },
  { name: "concatenated token", token: "0-10VDC", product: cpu1211 },
  { name: "embedded identifier", token: "X0-10 V DCY", product: cpu1211 },
  { name: "prepended text", token: "X 0-10 V DC", product: cpu1211 },
  { name: "appended text", token: "0-10 V DC EXTRA", product: cpu1211 },
  {
    name: "valid token plus punctuation",
    token: "0-10 V DC.",
    product: cpu1211,
  },
  {
    name: "arbitrary lowercase prose",
    token: "arbitrary lowercase prose",
    product: cpu1211,
  },
  { name: "short lowercase prose", token: "10 is ok", product: cpu1211 },
  {
    name: "complete description",
    token: cpu1211Description,
    product: cpu1211,
  },
  { name: "protected I/O fragment", token: "I/O", product: cpu1211 },
  { name: "protected SIMATIC fragment", token: "SIMATIC", product: cpu1211 },
  { name: "protected Siemens fragment", token: "Siemens", product: cpu1211 },
  { name: "protected model fragment", token: "1211C", product: cpu1211 },
  {
    name: "protected variant fragment",
    token: "DC/DC/DC",
    product: cpu1211,
  },
  { name: "cross-Product token", token: "0-20 mA DC", product: cpu1211 },
] as const;
const productionNegativeResults = productionNegativeCases.map(
  ({ name, token, product: fixtureProduct, ...expectation }) =>
    assertDraftIncludesIssues(
      `Production token negative ${name} fixture`,
      overrideFixture(fixtureProduct, token),
      "expectedCodes" in expectation
        ? expectation.expectedCodes
        : ["unapproved-technical-token"],
      products
    )
);
assert(
  productionNegativeResults.every((result) => !result.valid),
  "Every production-path negative token fixture must execute and fail."
);

const reviewBase = fixture();
const reviewHash = createProductCopyContentHash(reviewBase);
const currentReview = approvedReview(reviewHash);
const staleReview = approvedReview(`${reviewHash}-stale`);

draftCases.staleLinguisticHash = assertDraftIssues(
  "Stale-linguistic-hash fixture",
  {
    ...reviewBase,
    linguisticReview: staleReview,
    technicalReview: currentReview,
  },
  ["stale-approval-hash"]
);
draftCases.staleTechnicalHash = assertDraftIssues(
  "Stale-technical-hash fixture",
  {
    ...reviewBase,
    linguisticReview: currentReview,
    technicalReview: staleReview,
  },
  ["stale-approval-hash"]
);
draftCases.missingReviewer = assertDraftIssues(
  "Missing-reviewer fixture",
  {
    ...reviewBase,
    linguisticReview: { ...currentReview, reviewerId: "" },
    technicalReview: currentReview,
  },
  ["missing-reviewer"]
);
draftCases.missingEvidence = assertDraftIssues(
  "Missing-evidence fixture",
  {
    ...reviewBase,
    linguisticReview: currentReview,
    technicalReview: { ...currentReview, evidenceRef: "" },
  },
  ["missing-evidence"]
);
const { reviewedAt: omittedReviewedAt, ...reviewWithoutTimestamp } =
  currentReview;
void omittedReviewedAt;
draftCases.missingTimestamp = assertDraftIssues(
  "Missing-timestamp fixture",
  {
    ...reviewBase,
    linguisticReview: currentReview,
    technicalReview: reviewWithoutTimestamp,
  },
  ["invalid-review-date"]
);
const {
  reviewedContentHash: omittedReviewedContentHash,
  ...reviewWithoutContentHash
} = currentReview;
void omittedReviewedContentHash;
draftCases.missingContentHash = assertDraftIssues(
  "Missing-content-hash fixture",
  {
    ...reviewBase,
    linguisticReview: reviewWithoutContentHash,
    technicalReview: currentReview,
  },
  ["stale-approval-hash"]
);

function timestampFixture(timestamp: string): MutableOverlay {
  return {
    ...reviewBase,
    linguisticReview: approvedReview(reviewHash, timestamp),
    technicalReview: currentReview,
  };
}

[
  "not-a-date",
  "2026-00-01T00:00:00Z",
  "2026-01-00T00:00:00Z",
  "2026-02-30T00:00:00Z",
  "2026-02-29T00:00:00Z",
  "2026-04-31T00:00:00Z",
  "2026-13-01T00:00:00Z",
  "2026-01-01T24:00:00Z",
  "2026-01-01T00:60:00Z",
  "2026-01-01T00:00:60Z",
  "2026-01-01T00:00:00+03:30",
  "2026-01-01T00:00:00",
  "2026-01-01T00:00:00z",
].forEach((timestamp) => {
  draftCases[`invalidTimestamp:${timestamp}`] = assertDraftIssues(
    `Invalid-timestamp fixture ${timestamp}`,
    timestampFixture(timestamp),
    ["invalid-review-date"]
  );
});

["2024-02-29T23:59:59Z", "2025-02-28T00:00:00.123Z"].forEach((timestamp) => {
  const result = validateFixture(timestampFixture(timestamp));
  assert(result.valid, `Valid UTC timestamp ${timestamp} must pass.`);
  draftCases[`validTimestamp:${timestamp}`] = result;
});

const allApprovedEntries = products.map(approvedFixture);
const fullActivation = validatePersianProductCopyForActivation(
  allApprovedEntries,
  products
);
assert(fullActivation.valid, "Complete current dual approval must activate.");

const originalEntry = allApprovedEntries[0];
const publishedBeforeMutation = lookupValidatedPersianProductCopy(
  fullActivation.capability,
  originalEntry.productId
);
const approvedValue = publishedBeforeMutation.shortDescription[0]?.value;

assert(
  publishedBeforeMutation !== (originalEntry as unknown),
  "Publication snapshot must not retain the original entry."
);
assert(
  publishedBeforeMutation.shortDescription !== originalEntry.shortDescription,
  "Publication snapshot must clone short-description paragraphs."
);
assert(
  publishedBeforeMutation.shortDescription[0] !==
    originalEntry.shortDescription[0],
  "Publication snapshot must clone segments."
);
assert(
  publishedBeforeMutation.description !== originalEntry.description &&
    publishedBeforeMutation.description[0] !== originalEntry.description[0] &&
    publishedBeforeMutation.description[0]?.[0] !==
      originalEntry.description[0]?.[0],
  "Publication snapshot must clone description arrays, paragraphs, and segments."
);
assert(
  !("linguisticReview" in publishedBeforeMutation) &&
    !("technicalReview" in publishedBeforeMutation),
  "Publication snapshot must not expose review metadata."
);
assert(
  Object.isFrozen(publishedBeforeMutation) &&
    Object.isFrozen(publishedBeforeMutation.shortDescription) &&
    Object.isFrozen(publishedBeforeMutation.shortDescription[0]) &&
    Object.isFrozen(publishedBeforeMutation.description) &&
    Object.isFrozen(publishedBeforeMutation.description[0]) &&
    Object.isFrozen(publishedBeforeMutation.description[0]?.[0]),
  "Publication snapshot must be deeply frozen."
);

assert(
  !Reflect.set(
    publishedBeforeMutation.shortDescription[0] as object,
    "value",
    "tampered"
  ),
  "Frozen publication segments must reject mutation."
);
assert(
  publishedBeforeMutation.shortDescription[0]?.value === approvedValue,
  "Rejected snapshot mutation must not change published content."
);
assertThrows(
  () =>
    (publishedBeforeMutation.description as unknown as unknown[]).push(
      "tampered"
    ),
  "not extensible",
  "Frozen publication array mutation"
);

originalEntry.shortDescription[0].value = "متن دستکاری‌شده";
const publishedAfterMutation = lookupValidatedPersianProductCopy(
  fullActivation.capability,
  originalEntry.productId
);
assert(
  publishedAfterMutation.shortDescription[0]?.value === approvedValue,
  "Original registry mutation must not affect an issued snapshot."
);
const mutatedOriginalResult = validatePersianProductCopyForActivation(
  allApprovedEntries,
  products
);
assertIssues(
  mutatedOriginalResult,
  ["stale-approval-hash", "not-fully-approved"],
  "Mutated-original revalidation"
);
assert(
  mutatedOriginalResult.issues.filter(
    (issue) =>
      issue.code === "stale-approval-hash" &&
      issue.productId === originalEntry.productId
  ).length === 2,
  "A content mutation must invalidate both linguistic and technical approvals."
);
assert(
  lookupValidatedPersianProductCopy(
    fullActivation.capability,
    originalEntry.productId
  ).shortDescription[0]?.value === approvedValue,
  "Previously issued capability must remain isolated after revalidation."
);

assertThrows(
  () =>
    lookupValidatedPersianProductCopy(
      {} as ProductCopyActivationCapability,
      product.id
    ),
  "not authentic",
  "Forged activation capability"
);

const oneApprovalEntries = products.map(approvedFixture);
oneApprovalEntries[0].technicalReview = pendingReview;
const oneApprovalResult = validatePersianProductCopyForActivation(
  oneApprovalEntries,
  products
);
assertIssues(
  oneApprovalResult,
  ["not-fully-approved"],
  "Only-one-current-approval fixture"
);
assert(
  oneApprovalResult.approvedCount === 381,
  "Only-one-current-approval fixture must report 381 approvals."
);
assert(
  !("capability" in oneApprovalResult),
  "Incomplete approval must not issue a capability."
);

const rejectedEntries = products.map(approvedFixture);
rejectedEntries[0].technicalReview = {
  decision: "rejected",
  note: "fixture rejection",
};
const rejectedResult = validatePersianProductCopyForActivation(
  rejectedEntries,
  products
);
assertIssues(
  rejectedResult,
  ["not-fully-approved"],
  "Rejected-approval fixture"
);

const duplicateEntries = products.map(approvedFixture);
duplicateEntries[duplicateEntries.length - 1] = duplicateEntries[0];
const duplicateActivationResult = validatePersianProductCopyForActivation(
  duplicateEntries,
  products
);
assertIssues(
  duplicateActivationResult,
  ["duplicate-product-id", "missing-overlay-id"],
  "Duplicate-activation fixture"
);

const unknownIdEntries = products.map(approvedFixture);
unknownIdEntries[unknownIdEntries.length - 1].productId =
  "not-a-canonical-product";
const unknownIdActivationResult = validatePersianProductCopyForActivation(
  unknownIdEntries,
  products
);
assertIssues(
  unknownIdActivationResult,
  [
    "unknown-product-id",
    "stale-approval-hash",
    "not-fully-approved",
    "missing-overlay-id",
    "extra-overlay-id",
  ],
  "Unknown-ID activation fixture"
);

const incompleteCoverageResult = validatePersianProductCopyForActivation(
  products.slice(0, -1).map(approvedFixture),
  products
);
assertIssues(
  incompleteCoverageResult,
  ["overlay-count", "missing-overlay-id"],
  "Incomplete-coverage fixture"
);
assert(
  !("capability" in incompleteCoverageResult),
  "Incomplete coverage must not issue a capability."
);

const emptyActivation = validatePersianProductCopyForActivation([], products);
assertIssues(
  emptyActivation,
  ["overlay-count", "missing-overlay-id"],
  "Empty full-activation fixture"
);
assert(
  emptyActivation.overlayCount === 0 &&
    emptyActivation.canonicalCount === 382 &&
    emptyActivation.missingIds.length === 382 &&
    !("capability" in emptyActivation),
  "Empty full activation must be exactly 0/382 with no capability."
);

assertThrows(
  () => getPublishedPersianProductCopy(product.id),
  "publication is disabled",
  "Disabled publication getter"
);

const canonicalSnapshot = JSON.stringify(product);
const resolvedEnglish = resolveProductCopy(fakeSeoProduct, "en");
const resolvedDisabledPersian = resolveProductCopy(fakeSeoProduct, "fa");
const serializedEnglish = serializeResolvedProductCopy(resolvedEnglish);

assert(
  resolvedEnglish.source === "canonical-en" &&
    resolvedDisabledPersian.source === "canonical-en",
  "EN and disabled FA must resolve canonical English copy."
);
assert(
  resolvedDisabledPersian.shortDescription[0]?.value ===
    product.shortDescription,
  "Disabled FA must preserve canonical English descriptions."
);
assert(
  [resolvedEnglish, resolvedDisabledPersian].every(
    (copy) =>
      !JSON.stringify(copy).includes(fakeSeoProduct.seoTitle ?? "") &&
      !JSON.stringify(copy).includes(fakeSeoProduct.seoDescription ?? "")
  ),
  "Canonical SEO overrides must not appear in resolved copy."
);
assert(
  resolvedEnglish.seoTitle[0]?.kind === "technical" &&
    resolvedEnglish.seoTitle[0].value === product.title &&
    resolvedEnglish.seoTitle[1]?.value === " | SIEMIRAN" &&
    resolvedEnglish.seoDescription[0]?.value === product.shortDescription,
  "English SEO copy must be derived from canonical title and short copy."
);
assert(
  resolvedDisabledPersian.seoTitle[0]?.kind === "technical" &&
    resolvedDisabledPersian.seoTitle[0].value === product.title &&
    resolvedDisabledPersian.seoDescription[0]?.value ===
      resolvedDisabledPersian.shortDescription[0]?.value,
  "Disabled FA SEO copy must remain derived from canonical title and its resolved short copy."
);
assert(
  Object.isFrozen(resolvedEnglish) &&
    Object.isFrozen(resolvedEnglish.seoTitle) &&
    Object.isFrozen(resolvedEnglish.seoTitle[0]),
  "Resolver-issued copy must be deeply frozen."
);
assert(
  !Reflect.set(resolvedEnglish.seoTitle[0] as object, "value", "tampered") &&
    resolvedEnglish.seoTitle[0]?.value === product.title,
  "Resolver-issued copy must reject runtime mutation."
);

const forgedResolvedCopy = {
  locale: "fa",
  source: "approved-fa",
  shortDescription: [{ kind: "text", value: PERSIAN_TEXT }],
  description: [[{ kind: "text", value: PERSIAN_DESCRIPTION }]],
  seoTitle: [{ kind: "text", value: PERSIAN_TEXT }],
  seoDescription: [{ kind: "text", value: PERSIAN_TEXT }],
} as unknown as ResolvedProductCopy;
assertThrows(
  () =>
    ProductCopyInline({
      copy: forgedResolvedCopy,
      field: "shortDescription",
    }),
  "not issued",
  "Forged approved-fa resolved copy"
);

function containsTechnicalBdi(node: ReactNode): boolean {
  if (!isValidElement(node)) return false;
  const props = node.props as {
    readonly children?: ReactNode;
    readonly dir?: string;
    readonly lang?: string;
  };

  if (node.type === "bdi" && props.dir === "ltr" && props.lang === "en") {
    return true;
  }

  return Children.toArray(props.children).some(containsTechnicalBdi);
}

const renderedEnglishSeo = ProductCopyInline({
  copy: resolvedEnglish,
  field: "seoTitle",
});
assert(renderedEnglishSeo !== null, "Canonical SEO title must render.");
const renderedEnglishSeoProps = renderedEnglishSeo.props as {
  readonly dir?: string;
  readonly lang?: string;
};
assert(
  renderedEnglishSeoProps.lang === "en" &&
    renderedEnglishSeoProps.dir === "ltr" &&
    containsTechnicalBdi(renderedEnglishSeo),
  "Canonical renderer output must be English LTR with isolated technical text."
);

assertThrows(
  () => createPublicProductCardCopyDTO(forgedResolvedCopy),
  "not issued",
  "Forged public DTO source"
);

const publicEnglish = createPublicProductCardCopyDTO(resolvedEnglish);
const publicDisabledPersian = createPublicProductCardCopyDTO(
  resolvedDisabledPersian
);
const publicRoundTrip = JSON.parse(JSON.stringify(publicEnglish)) as unknown;
const forbiddenPublicFields = [
  "locale",
  "source",
  "provenance",
  "reviewerId",
  "evidenceRef",
  "reviewedContentHash",
  "registry",
  "publication",
  "capability",
];

assert(
  publicEnglish.language === "en" &&
    publicEnglish.direction === "ltr" &&
    publicDisabledPersian.language === "en" &&
    publicDisabledPersian.direction === "ltr",
  "EN and disabled FA public DTOs must be English LTR."
);
assert(
  JSON.stringify(publicRoundTrip) === JSON.stringify(publicEnglish),
  "Public DTO must survive a JSON serialization round trip."
);
assert(
  forbiddenPublicFields.every(
    (field) => !JSON.stringify(publicEnglish).includes(`"${field}"`)
  ),
  "Public DTO must exclude all private trust and review fields."
);
assert(
  publicEnglish.shortDescription !== resolvedEnglish.shortDescription &&
    publicEnglish.shortDescription[0] !== resolvedEnglish.shortDescription[0],
  "Public DTO segments must be detached from the trusted resolved object."
);

function renderPublicInlineFixture(input: unknown): ReactNode {
  return PublicProductCopyInline(
    input as Parameters<typeof PublicProductCopyInline>[0]
  );
}

function renderPublicBlockFixture(input: unknown): ReactNode {
  return PublicProductCopyBlock(
    input as Parameters<typeof PublicProductCopyBlock>[0]
  );
}

function assertReturnsInertNull(
  fixtureName: string,
  render: () => ReactNode
): void {
  let output: ReactNode;

  try {
    output = render();
  } catch (error) {
    throw new Error(`${fixtureName} must not throw.`, { cause: error });
  }

  assert(output === null, `${fixtureName} must return null.`);
}

const validPublicParagraph = [{ kind: "text", value: "Valid copy" }] as const;
const malformedInlineFixtures: ReadonlyArray<
  readonly [string, Record<string, unknown>]
> = [
  [
    "Null public paragraph",
    { language: "en", direction: "ltr", paragraph: null },
  ],
  [
    "Undefined public paragraph",
    { language: "en", direction: "ltr", paragraph: undefined },
  ],
  [
    "Empty public paragraph",
    { language: "en", direction: "ltr", paragraph: [] },
  ],
  [
    "Null public segment",
    { language: "en", direction: "ltr", paragraph: [null] },
  ],
  [
    "String public segment",
    { language: "en", direction: "ltr", paragraph: ["text"] },
  ],
  [
    "Empty public segment object",
    { language: "en", direction: "ltr", paragraph: [{}] },
  ],
  [
    "Missing public segment kind",
    { language: "en", direction: "ltr", paragraph: [{ value: "copy" }] },
  ],
  [
    "Invalid public segment kind",
    {
      language: "en",
      direction: "ltr",
      paragraph: [{ kind: "markup", value: "copy" }],
    },
  ],
  [
    "Missing public segment value",
    { language: "en", direction: "ltr", paragraph: [{ kind: "text" }] },
  ],
  [
    "Non-string public segment value",
    {
      language: "en",
      direction: "ltr",
      paragraph: [{ kind: "text", value: 123 }],
    },
  ],
  [
    "Empty public segment value",
    {
      language: "en",
      direction: "ltr",
      paragraph: [{ kind: "text", value: "" }],
    },
  ],
  [
    "Invalid public inline language",
    { language: "de", direction: "ltr", paragraph: validPublicParagraph },
  ],
  [
    "Invalid public inline direction",
    { language: "en", direction: "auto", paragraph: validPublicParagraph },
  ],
  [
    "Mismatched public inline language and direction",
    { language: "en", direction: "rtl", paragraph: validPublicParagraph },
  ],
];

for (const [fixtureName, props] of malformedInlineFixtures) {
  assertReturnsInertNull(fixtureName, () => renderPublicInlineFixture(props));
}

const malformedBlockFixtures: ReadonlyArray<
  readonly [string, Record<string, unknown>]
> = [
  [
    "Null public paragraphs",
    { language: "en", direction: "ltr", paragraphs: null },
  ],
  [
    "Undefined public paragraphs",
    { language: "en", direction: "ltr", paragraphs: undefined },
  ],
  [
    "Empty public paragraphs",
    { language: "en", direction: "ltr", paragraphs: [] },
  ],
  [
    "Malformed paragraph among valid public paragraphs",
    {
      language: "en",
      direction: "ltr",
      paragraphs: [validPublicParagraph, [null]],
    },
  ],
  [
    "Invalid public block language",
    { language: "de", direction: "ltr", paragraphs: [validPublicParagraph] },
  ],
  [
    "Invalid public block direction",
    { language: "en", direction: "auto", paragraphs: [validPublicParagraph] },
  ],
  [
    "Mismatched public block language and direction",
    { language: "fa", direction: "ltr", paragraphs: [validPublicParagraph] },
  ],
];

for (const [fixtureName, props] of malformedBlockFixtures) {
  assertReturnsInertNull(fixtureName, () => renderPublicBlockFixture(props));
}

const publicInline = PublicProductCopyInline({
  language: publicEnglish.language,
  direction: publicEnglish.direction,
  paragraph: publicEnglish.shortDescription,
});
const publicTechnicalInline = PublicProductCopyInline({
  language: "fa",
  direction: "rtl",
  paragraph: [
    { kind: "text", value: PERSIAN_TEXT },
    { kind: "technical", value: product.partNumber },
  ],
});
const publicBlock = PublicProductCopyBlock({
  language: publicEnglish.language,
  direction: publicEnglish.direction,
  paragraphs: [publicEnglish.shortDescription],
});
const trustedBlock = ProductCopyBlock({
  copy: resolvedEnglish,
  field: "description",
});

assert(
  publicInline !== null &&
    publicInline.type === "span" &&
    publicInline.type !== "div" &&
    publicInline.type !== "p",
  "Public inline renderer must not own block or paragraph markup."
);
assert(
  publicBlock !== null && publicBlock.type === "div",
  "Public block renderer must own its block markup."
);
assert(
  trustedBlock !== null && trustedBlock.type === "div",
  "Trusted block renderer must own its block markup."
);

function hasNestedParagraph(node: ReactNode, insideParagraph = false): boolean {
  if (!isValidElement(node)) return false;

  const isParagraph = node.type === "p";
  if (insideParagraph && isParagraph) return true;

  const props = node.props as { readonly children?: ReactNode };
  return Children.toArray(props.children).some((child) =>
    hasNestedParagraph(child, insideParagraph || isParagraph)
  );
}

function containsUnsafeHtmlProp(node: ReactNode): boolean {
  if (!isValidElement(node)) return false;

  const props = node.props as {
    readonly children?: ReactNode;
    readonly dangerouslySetInnerHTML?: unknown;
  };
  return (
    props.dangerouslySetInnerHTML !== undefined ||
    Children.toArray(props.children).some(containsUnsafeHtmlProp)
  );
}

assert(
  !hasNestedParagraph(publicInline) &&
    !hasNestedParagraph(publicBlock) &&
    !hasNestedParagraph(trustedBlock),
  "Product-copy renderers must not create nested paragraphs."
);
assert(
  containsTechnicalBdi(renderedEnglishSeo) &&
    containsTechnicalBdi(publicTechnicalInline) &&
    !containsUnsafeHtmlProp(publicInline) &&
    !containsUnsafeHtmlProp(publicBlock) &&
    !containsUnsafeHtmlProp(trustedBlock),
  "Renderers must isolate technical segments without unsafe HTML."
);

const nestedCanonicalProduct: Product = {
  ...product,
  images: [...product.images],
  downloads: [
    {
      id: "verification-download",
      title: "Verification download",
      type: "manual",
      language: "en",
      size: "1 KB",
      file: "/verification.pdf",
    },
  ],
  specifications: { Voltage: "24 V DC" },
  tags: ["verification-tag"],
  compatibility: [secondProduct.id],
  accessories: [secondProduct.id],
  relatedProducts: [secondProduct.id],
};
const nestedCanonicalSnapshot = JSON.stringify(nestedCanonicalProduct);

const requiredProductKeys = [
  "id",
  "slug",
  "title",
  "shortDescription",
  "brandId",
  "categoryId",
  "familyId",
  "partNumber",
  "images",
  "downloads",
] as const;

const optionalProductKeys = [
  "description",
  "seriesId",
  "productTypeId",
  "variantId",
  "manufacturerPartNumber",
  "ean",
  "specifications",
  "compatibility",
  "accessories",
  "relatedProducts",
  "replacementProduct",
  "tags",
  "lifecycle",
  "inStock",
  "featured",
  "seoTitle",
  "seoDescription",
  "siemensUrl",
] as const;

const requiredFixtureKeysAreExhaustive: AssertType<
  TypesEqual<(typeof requiredProductKeys)[number], RequiredKeysOf<Product>>
> = true;
const optionalFixtureKeysAreExhaustive: AssertType<
  TypesEqual<(typeof optionalProductKeys)[number], OptionalKeysOf<Product>>
> = true;

void requiredFixtureKeysAreExhaustive;
void optionalFixtureKeysAreExhaustive;

function productDataDescriptor(
  value: unknown,
  enumerable = true
): PropertyDescriptor {
  return {
    configurable: true,
    enumerable,
    value,
    writable: true,
  };
}

function createTopLevelProductFixture(
  entries: readonly (readonly [PropertyKey, PropertyDescriptor])[] = [],
  prototype: object | null = Object.prototype,
  omittedKeys: readonly (keyof Product)[] = []
): Product {
  const descriptors = Object.getOwnPropertyDescriptors(product);

  for (const key of omittedKeys) {
    Reflect.deleteProperty(descriptors, key);
  }

  for (const [key, descriptor] of entries) {
    Object.defineProperty(descriptors, key, {
      configurable: true,
      enumerable: true,
      value: descriptor,
      writable: true,
    });
  }

  return Object.create(prototype, descriptors) as Product;
}

let unknownTopLevelGetterCalls = 0;
const unknownTopLevelGetterProduct = createTopLevelProductFixture([
  [
    "unexpectedPresentationField",
    {
      configurable: true,
      enumerable: true,
      get() {
        unknownTopLevelGetterCalls += 1;
        return "must-not-be-published";
      },
    },
  ],
]);
assertThrows(
  () => createProductListItemViewModel(unknownTopLevelGetterProduct, "en"),
  "Unsupported public Product",
  "Unknown enumerable top-level getter"
);
assert(
  unknownTopLevelGetterCalls === 0,
  "An unknown top-level Product getter must never be invoked."
);

let allowedTopLevelGetterCalls = 0;
const allowedTopLevelGetterProduct = createTopLevelProductFixture([
  [
    "title",
    {
      configurable: true,
      enumerable: true,
      get() {
        allowedTopLevelGetterCalls += 1;
        return "must-not-be-published";
      },
    },
  ],
]);
assertThrows(
  () => createProductListItemViewModel(allowedTopLevelGetterProduct, "en"),
  "Unsupported public Product",
  "Allowed-key top-level getter"
);
assert(
  allowedTopLevelGetterCalls === 0,
  "An allowed-key top-level Product getter must never be invoked."
);

let omittedTopLevelGetterCalls = 0;
const omittedTopLevelGetterProduct = createTopLevelProductFixture([
  [
    "shortDescription",
    {
      configurable: true,
      enumerable: true,
      get() {
        omittedTopLevelGetterCalls += 1;
        return "must-not-be-published";
      },
    },
  ],
]);
assertThrows(
  () => createProductListItemViewModel(omittedTopLevelGetterProduct, "en"),
  "Unsupported public Product",
  "Forbidden-copy top-level getter"
);
assert(
  omittedTopLevelGetterCalls === 0,
  "A forbidden-copy top-level Product getter must never be invoked."
);

let topLevelSetterCalls = 0;
const setterOnlyTopLevelProduct = createTopLevelProductFixture([
  [
    "title",
    {
      configurable: true,
      enumerable: true,
      set(value: string) {
        void value;
        topLevelSetterCalls += 1;
      },
    },
  ],
]);
assertThrows(
  () => createProductListItemViewModel(setterOnlyTopLevelProduct, "en"),
  "Unsupported public Product",
  "Setter-only top-level property"
);
assert(
  topLevelSetterCalls === 0,
  "A top-level Product setter must never be invoked."
);

class UnsupportedProductPrototype {}

let rejectedPrototypeTrapCalls = 0;
let rejectedPrototypeOwnKeysCalls = 0;
const rejectedPrototypeProxy = new Proxy(product, {
  getPrototypeOf() {
    rejectedPrototypeTrapCalls += 1;
    return null;
  },
  ownKeys(target) {
    rejectedPrototypeOwnKeysCalls += 1;
    return Reflect.ownKeys(target);
  },
});
assertThrows(
  () => createProductListItemViewModel(rejectedPrototypeProxy, "en"),
  "Unsupported public Product",
  "Rejected prototype before own-key enumeration"
);
assert(
  rejectedPrototypeTrapCalls === 1 && rejectedPrototypeOwnKeysCalls === 0,
  "An invalid prototype must be rejected before own-key enumeration."
);

assertThrows(
  () =>
    createProductListItemViewModel(
      createTopLevelProductFixture([], UnsupportedProductPrototype.prototype),
      "en"
    ),
  "Unsupported public Product",
  "Custom Product prototype"
);
assertThrows(
  () =>
    createProductListItemViewModel(
      createTopLevelProductFixture([], null),
      "en"
    ),
  "Unsupported public Product",
  "Null Product prototype"
);
for (const [fixtureName, malformedProduct] of [
  ["null", null],
  ["array", []],
  ["primitive", "not-a-product"],
] as const) {
  assertThrows(
    () =>
      createProductListItemViewModel(
        malformedProduct as unknown as Product,
        "en"
      ),
    "Unsupported public Product",
    `Top-level Product ${fixtureName}`
  );
}

const invalidRequiredProductValues: Readonly<
  Record<RequiredKeysOf<Product>, unknown>
> = {
  id: 1,
  slug: false,
  title: [],
  shortDescription: {},
  brandId: 1,
  categoryId: false,
  familyId: [],
  partNumber: {},
  images: [],
  downloads: "not-downloads",
};

for (const key of requiredProductKeys) {
  assertThrows(
    () =>
      createProductListItemViewModel(
        createTopLevelProductFixture([], Object.prototype, [key]),
        "en"
      ),
    `Product.${key}`,
    `Missing required Product.${key}`
  );
  assertThrows(
    () =>
      createProductListItemViewModel(
        createTopLevelProductFixture([[key, productDataDescriptor(undefined)]]),
        "en"
      ),
    `Product.${key}`,
    `Undefined required Product.${key}`
  );
  assertThrows(
    () =>
      createProductListItemViewModel(
        createTopLevelProductFixture([
          [key, productDataDescriptor(invalidRequiredProductValues[key])],
        ]),
        "en"
      ),
    `Product.${key}`,
    `Invalid required Product.${key}`
  );
}

const validOptionalProductValues: {
  readonly [Key in OptionalKeysOf<Product>]-?: Exclude<Product[Key], undefined>;
} = {
  description: "Optional description",
  seriesId: "optional-series",
  productTypeId: "optional-product-type",
  variantId: "optional-variant",
  manufacturerPartNumber: "optional-manufacturer-part-number",
  ean: "optional-ean",
  specifications: { Voltage: "24 V DC" },
  compatibility: [secondProduct.id],
  accessories: [secondProduct.id],
  relatedProducts: [secondProduct.id],
  replacementProduct: secondProduct.id,
  tags: ["optional-tag"],
  lifecycle: "active",
  inStock: true,
  featured: false,
  seoTitle: "Optional SEO title",
  seoDescription: "Optional SEO description",
  siemensUrl: "https://example.com/product",
};

const invalidOptionalProductValues: Readonly<
  Record<OptionalKeysOf<Product>, unknown>
> = {
  description: 1,
  seriesId: false,
  productTypeId: [],
  variantId: {},
  manufacturerPartNumber: 1,
  ean: false,
  specifications: { Voltage: 24 },
  compatibility: [secondProduct.id, 1],
  accessories: [secondProduct.id, false],
  relatedProducts: [secondProduct.id, {}],
  replacementProduct: 1,
  tags: ["optional-tag", false],
  lifecycle: "retired",
  inStock: "true",
  featured: 1,
  seoTitle: false,
  seoDescription: [],
  siemensUrl: {},
};

const optionalAbsentProduct = createTopLevelProductFixture(
  [],
  Object.prototype,
  optionalProductKeys
);
createProductListItemViewModel(optionalAbsentProduct, "en");

for (const key of optionalProductKeys) {
  const undefinedOptionalItem = createProductListItemViewModel(
    createTopLevelProductFixture([[key, productDataDescriptor(undefined)]]),
    "en"
  );

  if (key !== "description" && key !== "seoTitle" && key !== "seoDescription") {
    assert(
      Object.prototype.hasOwnProperty.call(
        undefinedOptionalItem.product,
        key
      ) && undefinedOptionalItem.product[key] === undefined,
      `Optional Product.${key} must preserve an explicit undefined value.`
    );
  }

  assertThrows(
    () =>
      createProductListItemViewModel(
        createTopLevelProductFixture([
          [key, productDataDescriptor(invalidOptionalProductValues[key])],
        ]),
        "en"
      ),
    `Product.${key}`,
    `Invalid optional Product.${key}`
  );
}

const allOptionalValuesProduct = createTopLevelProductFixture(
  optionalProductKeys.map(
    (key) =>
      [key, productDataDescriptor(validOptionalProductValues[key])] as const
  )
);
const allOptionalValuesItem = createProductListItemViewModel(
  allOptionalValuesProduct,
  "en"
);
const allOptionalValuesBoundary = createSanitizedProductBoundary(
  allOptionalValuesProduct
);
assert(
  optionalProductKeys.every((key) => {
    if (
      key === "description" ||
      key === "seoTitle" ||
      key === "seoDescription"
    ) {
      return !(key in allOptionalValuesItem.product);
    }

    return (
      JSON.stringify(allOptionalValuesItem.product[key]) ===
      JSON.stringify(validOptionalProductValues[key])
    );
  }),
  "Every optional Product field must accept its valid declared runtime shape."
);
assert(
  allOptionalValuesBoundary.trustedProduct.shortDescription ===
    allOptionalValuesProduct.shortDescription &&
    allOptionalValuesBoundary.trustedProduct.description ===
      validOptionalProductValues.description &&
    allOptionalValuesBoundary.trustedProduct.seoTitle ===
      validOptionalProductValues.seoTitle &&
    allOptionalValuesBoundary.trustedProduct.seoDescription ===
      validOptionalProductValues.seoDescription &&
    !("shortDescription" in allOptionalValuesBoundary.publicProduct) &&
    !("description" in allOptionalValuesBoundary.publicProduct) &&
    !("seoTitle" in allOptionalValuesBoundary.publicProduct) &&
    !("seoDescription" in allOptionalValuesBoundary.publicProduct),
  "The trusted snapshot must retain canonical copy while the public record omits it."
);

const validDownload = nestedCanonicalProduct.downloads[0];
for (const [fixtureName, invalidDownload] of [
  [
    "missing id",
    {
      title: validDownload.title,
      type: validDownload.type,
      language: validDownload.language,
      size: validDownload.size,
      file: validDownload.file,
    },
  ],
  ["undefined id", { ...validDownload, id: undefined }],
  ["numeric title", { ...validDownload, title: 1 }],
  ["invalid type union", { ...validDownload, type: "archive" }],
  ["numeric language", { ...validDownload, language: 1 }],
  ["numeric size", { ...validDownload, size: 1 }],
  ["numeric file", { ...validDownload, file: 1 }],
  ["extra key", { ...validDownload, unexpected: "value" }],
] as const) {
  assertThrows(
    () =>
      createProductListItemViewModel(
        createTopLevelProductFixture([
          ["downloads", productDataDescriptor([invalidDownload])],
        ]),
        "en"
      ),
    "Product.downloads",
    `Invalid Product download ${fixtureName}`
  );
}

for (const [fixtureName, descriptor] of [
  [
    "non-enumerable function",
    {
      configurable: true,
      enumerable: false,
      value: () => undefined,
      writable: true,
    },
  ],
  [
    "non-enumerable primitive",
    {
      configurable: true,
      enumerable: false,
      value: "hidden",
      writable: true,
    },
  ],
] as const) {
  assertThrows(
    () =>
      createProductListItemViewModel(
        createTopLevelProductFixture([["siemensUrl", descriptor]]),
        "en"
      ),
    "Unsupported public Product",
    `Top-level Product ${fixtureName}`
  );
}

assertThrows(
  () =>
    createProductListItemViewModel(
      createTopLevelProductFixture([
        [
          Symbol("unexpected-product-key"),
          {
            configurable: true,
            enumerable: true,
            value: "hidden",
            writable: true,
          },
        ],
      ]),
      "en"
    ),
  "Unsupported public Product",
  "Symbol-keyed top-level Product property"
);
assertThrows(
  () =>
    createProductListItemViewModel(
      createTopLevelProductFixture([
        [
          "unexpectedPresentationField",
          {
            configurable: true,
            enumerable: true,
            value: "must-not-be-published",
            writable: true,
          },
        ],
      ]),
      "en"
    ),
  "Unsupported public Product",
  "Unknown enumerable top-level Product property"
);
assertThrows(
  () =>
    createProductListItemViewModel(
      createTopLevelProductFixture([
        [
          "images",
          {
            configurable: true,
            enumerable: true,
            value: () => undefined,
            writable: true,
          },
        ],
      ]),
      "en"
    ),
  "Unsupported public Product",
  "Unsupported value on a known allowed Product key"
);

const prototypePollutionMarker = "__task_bo_fix_b_polluted__";
for (const sensitiveKey of ["__proto__", "constructor", "prototype"] as const) {
  assertThrows(
    () =>
      createProductListItemViewModel(
        createTopLevelProductFixture([
          [
            sensitiveKey,
            {
              configurable: true,
              enumerable: true,
              value: { [prototypePollutionMarker]: true },
              writable: true,
            },
          ],
        ]),
        "en"
      ),
    "Unsupported public Product",
    `Prototype-sensitive Product key ${sensitiveKey}`
  );
}
assert(
  !(prototypePollutionMarker in Object.prototype),
  "Prototype-sensitive Product keys must not modify Object.prototype."
);

let prematureValueTraversalAttempts = 0;
let lateDescriptorGetterCalls = 0;
const prematureValueTraversalProbe = new Proxy(
  {},
  {
    getPrototypeOf() {
      prematureValueTraversalAttempts += 1;
      return Object.prototype;
    },
  }
);
const descriptorOrderProduct = createTopLevelProductFixture([
  [
    "id",
    {
      configurable: true,
      enumerable: true,
      value: prematureValueTraversalProbe,
      writable: true,
    },
  ],
  [
    "title",
    {
      configurable: true,
      enumerable: true,
      get() {
        lateDescriptorGetterCalls += 1;
        return "must-not-be-read";
      },
    },
  ],
]);
assertThrows(
  () => createProductListItemViewModel(descriptorOrderProduct, "en"),
  "Unsupported public Product",
  "Product descriptor validation order"
);
assert(
  prematureValueTraversalAttempts === 0 && lateDescriptorGetterCalls === 0,
  "All top-level descriptors must be validated before any value is traversed."
);

const proxyDivergentCopy = "PROXY-DIVERGED-AFTER-DESCRIPTOR-VALIDATION";
const proxySnapshotTarget: Product = {
  ...nestedCanonicalProduct,
  images: [...nestedCanonicalProduct.images],
  downloads: nestedCanonicalProduct.downloads.map((download) => ({
    ...download,
  })),
  specifications: { ...nestedCanonicalProduct.specifications },
  tags: [...(nestedCanonicalProduct.tags ?? [])],
  compatibility: [...(nestedCanonicalProduct.compatibility ?? [])],
  accessories: [...(nestedCanonicalProduct.accessories ?? [])],
  relatedProducts: [...(nestedCanonicalProduct.relatedProducts ?? [])],
};
const proxyExpectedKeys = Reflect.ownKeys(proxySnapshotTarget);
const proxyDescriptorCalls = new Map<PropertyKey, number>();
let proxyGetPrototypeCalls = 0;
let proxyOwnKeysCalls = 0;
let proxyGetCalls = 0;
const descriptorDivergenceProxy = new Proxy(proxySnapshotTarget, {
  getPrototypeOf(target) {
    proxyGetPrototypeCalls += 1;
    return Reflect.getPrototypeOf(target);
  },
  ownKeys(target) {
    proxyOwnKeysCalls += 1;
    return Reflect.ownKeys(target);
  },
  getOwnPropertyDescriptor(target, key) {
    const callCount = (proxyDescriptorCalls.get(key) ?? 0) + 1;
    proxyDescriptorCalls.set(key, callCount);
    const descriptor = Reflect.getOwnPropertyDescriptor(target, key);

    if (key === "shortDescription" && callCount > 1 && descriptor) {
      return { ...descriptor, value: proxyDivergentCopy };
    }

    return descriptor;
  },
  get() {
    proxyGetCalls += 1;
    return proxyDivergentCopy;
  },
});
const proxySnapshotItem = createProductListItemViewModel(
  descriptorDivergenceProxy,
  "en"
);
const proxyFactoryDescriptorCounts = new Map(proxyDescriptorCalls);
const secondShortDescriptionDescriptor = Object.getOwnPropertyDescriptor(
  descriptorDivergenceProxy,
  "shortDescription"
);
const proxySnapshotSerialization = JSON.stringify(proxySnapshotItem);
assert(
  proxyGetPrototypeCalls === 1 &&
    proxyOwnKeysCalls === 1 &&
    proxyGetCalls === 0 &&
    proxyExpectedKeys.every(
      (key) => proxyFactoryDescriptorCounts.get(key) === 1
    ) &&
    proxyFactoryDescriptorCounts.size === proxyExpectedKeys.length,
  "A descriptor-valid Proxy must be captured exactly once without later get-trap access."
);
assert(
  secondShortDescriptionDescriptor?.value === proxyDivergentCopy &&
    proxyDescriptorCalls.get("shortDescription") === 2 &&
    proxySnapshotItem.copy.shortDescription[0]?.value ===
      proxySnapshotTarget.shortDescription &&
    !proxySnapshotItem.copy.searchText.includes(proxyDivergentCopy) &&
    !proxySnapshotSerialization.includes(proxyDivergentCopy),
  "Resolver and public serialization must use only the first trusted descriptor snapshot."
);
const proxySnapshotBeforeSourceMutation = JSON.stringify(proxySnapshotItem);
proxySnapshotTarget.shortDescription = "mutated after snapshot";
proxySnapshotTarget.images[0] = "mutated-after-snapshot.png";
proxySnapshotTarget.downloads[0].title = "mutated after snapshot";
assert(
  JSON.stringify(proxySnapshotItem) === proxySnapshotBeforeSourceMutation &&
    Object.isFrozen(proxySnapshotItem.product) &&
    Object.isFrozen(proxySnapshotItem.product.images) &&
    Object.isFrozen(proxySnapshotItem.product.downloads) &&
    Object.isFrozen(proxySnapshotItem.product.downloads[0]),
  "Trusted resolution and public output must remain detached from later source mutation."
);

const nestedProductBoundary = createSanitizedProductBoundary(
  nestedCanonicalProduct
);
const nestedPublicRecord = nestedProductBoundary.publicProduct;
const nestedTrustedProduct = nestedProductBoundary.trustedProduct;
const forbiddenPublicProductKeys = new Set<PropertyKey>([
  "shortDescription",
  "description",
  "seoTitle",
  "seoDescription",
]);
assert(
  JSON.stringify(Reflect.ownKeys(nestedPublicRecord)) ===
    JSON.stringify(
      Reflect.ownKeys(nestedCanonicalProduct).filter(
        (key) => !forbiddenPublicProductKeys.has(key)
      )
    ) && Object.getPrototypeOf(nestedPublicRecord) === Object.prototype,
  "A valid public Product must retain every allowed own key on a fresh ordinary record."
);

function assertDetachedAndFrozenPublicGraph(
  publicValue: unknown,
  canonicalValue: unknown,
  path: string
): void {
  if (typeof publicValue !== "object" || publicValue === null) return;

  assert(Object.isFrozen(publicValue), `${path} must be frozen.`);
  assert(publicValue !== canonicalValue, `${path} must be detached.`);

  if (Array.isArray(publicValue)) {
    assert(
      Array.isArray(canonicalValue),
      `${path} must preserve its array shape.`
    );
    publicValue.forEach((entry, index) =>
      assertDetachedAndFrozenPublicGraph(
        entry,
        canonicalValue[index],
        `${path}[${index}]`
      )
    );
    return;
  }

  assert(
    typeof canonicalValue === "object" && canonicalValue !== null,
    `${path} must preserve its record shape.`
  );
  for (const key of Object.keys(publicValue)) {
    assertDetachedAndFrozenPublicGraph(
      (publicValue as Record<string, unknown>)[key],
      (canonicalValue as Record<string, unknown>)[key],
      `${path}.${key}`
    );
  }
}

assertDetachedAndFrozenPublicGraph(
  nestedPublicRecord,
  nestedCanonicalProduct,
  "PublicProductRecord"
);
assertDetachedAndFrozenPublicGraph(
  nestedTrustedProduct,
  nestedCanonicalProduct,
  "TrustedProductSnapshot"
);
assert(
  nestedPublicRecord !== nestedCanonicalProduct &&
    nestedPublicRecord.images !== nestedCanonicalProduct.images &&
    nestedPublicRecord.downloads !== nestedCanonicalProduct.downloads &&
    nestedPublicRecord.downloads[0] !== nestedCanonicalProduct.downloads[0] &&
    nestedPublicRecord.specifications !==
      nestedCanonicalProduct.specifications &&
    nestedPublicRecord.tags !== nestedCanonicalProduct.tags &&
    nestedPublicRecord.compatibility !== nestedCanonicalProduct.compatibility &&
    nestedPublicRecord.accessories !== nestedCanonicalProduct.accessories &&
    nestedPublicRecord.relatedProducts !==
      nestedCanonicalProduct.relatedProducts,
  "Every public Product nested collection and contained record must be detached."
);
assert(
  nestedTrustedProduct !== nestedCanonicalProduct &&
    nestedTrustedProduct !== nestedPublicRecord &&
    nestedTrustedProduct.images !== nestedCanonicalProduct.images &&
    nestedTrustedProduct.images !== nestedPublicRecord.images &&
    nestedTrustedProduct.downloads !== nestedCanonicalProduct.downloads &&
    nestedTrustedProduct.downloads !== nestedPublicRecord.downloads &&
    nestedTrustedProduct.downloads[0] !== nestedCanonicalProduct.downloads[0] &&
    nestedTrustedProduct.downloads[0] !== nestedPublicRecord.downloads[0] &&
    nestedTrustedProduct.specifications !==
      nestedCanonicalProduct.specifications &&
    nestedTrustedProduct.specifications !== nestedPublicRecord.specifications &&
    nestedTrustedProduct.tags !== nestedCanonicalProduct.tags &&
    nestedTrustedProduct.tags !== nestedPublicRecord.tags &&
    nestedTrustedProduct.compatibility !==
      nestedCanonicalProduct.compatibility &&
    nestedTrustedProduct.compatibility !== nestedPublicRecord.compatibility &&
    nestedTrustedProduct.accessories !== nestedCanonicalProduct.accessories &&
    nestedTrustedProduct.accessories !== nestedPublicRecord.accessories &&
    nestedTrustedProduct.relatedProducts !==
      nestedCanonicalProduct.relatedProducts &&
    nestedTrustedProduct.relatedProducts !== nestedPublicRecord.relatedProducts,
  "Trusted and public Product graphs must be independently cloned from canonical data."
);
assert(
  !Object.isFrozen(nestedCanonicalProduct) &&
    !Object.isFrozen(nestedCanonicalProduct.images) &&
    !Object.isFrozen(nestedCanonicalProduct.downloads) &&
    !Object.isFrozen(nestedCanonicalProduct.downloads[0]) &&
    !Object.isFrozen(nestedCanonicalProduct.specifications) &&
    !Object.isFrozen(nestedCanonicalProduct.tags) &&
    !Object.isFrozen(nestedCanonicalProduct.compatibility) &&
    !Object.isFrozen(nestedCanonicalProduct.accessories) &&
    !Object.isFrozen(nestedCanonicalProduct.relatedProducts) &&
    JSON.stringify(nestedCanonicalProduct) === nestedCanonicalSnapshot,
  "Creating a public Product record must not freeze or mutate its canonical Product."
);
assert(
  !Reflect.set(nestedPublicRecord.images as object, "0", "tampered") &&
    !Reflect.set(
      nestedPublicRecord.downloads[0] as object,
      "title",
      "tampered"
    ) &&
    !Reflect.set(
      nestedPublicRecord.specifications as object,
      "Voltage",
      "tampered"
    ) &&
    JSON.stringify(nestedCanonicalProduct) === nestedCanonicalSnapshot,
  "Attempted public Product mutation must not affect canonical Product data."
);
assert(
  JSON.stringify(JSON.parse(JSON.stringify(nestedPublicRecord)) as unknown) ===
    JSON.stringify(nestedPublicRecord),
  "A deeply detached public Product record must survive its serializable round trip."
);

const cyclicSpecificationValue: Record<string, unknown> = {};
cyclicSpecificationValue.self = cyclicSpecificationValue;

for (const [fixtureName, unsupportedValue] of [
  ["function", () => undefined],
  ["symbol", Symbol("unsupported")],
  ["class instance", new Date(0)],
  ["Map", new Map()],
  ["Set", new Set()],
  ["NaN", Number.NaN],
  ["positive infinity", Number.POSITIVE_INFINITY],
  ["negative infinity", Number.NEGATIVE_INFINITY],
  ["BigInt", BigInt(1)],
  ["cycle", cyclicSpecificationValue],
] as const) {
  assertThrows(
    () =>
      createProductListItemViewModel(
        {
          ...nestedCanonicalProduct,
          specifications: {
            unsupported: unsupportedValue,
          } as unknown as Record<string, string>,
        },
        "en"
      ),
    "Unsupported public Product",
    `Public Product ${fixtureName}`
  );
}

const canonicalCatalogSnapshot = JSON.stringify(products);
const englishListItems = createProductListItemViewModels(products, "en");
const disabledPersianListItems = createProductListItemViewModels(
  products,
  "fa"
);
const activePersianOverlayCount = disabledPersianListItems.filter(
  (item) => item.copy.language === "fa"
).length;
assert(
  englishListItems.length === 382 &&
    disabledPersianListItems.length === 382 &&
    activePersianOverlayCount === 0 &&
    englishListItems.every((item) => item.copy.shortDescription.length > 0) &&
    disabledPersianListItems.every(
      (item) => item.copy.language === "en" && item.copy.direction === "ltr"
    ),
  "All 382 EN and disabled FA list items must have mandatory resolved copy."
);
assert(
  JSON.stringify(products) === canonicalCatalogSnapshot &&
    products.every(
      (canonicalProduct, index) =>
        englishListItems[index].product !== canonicalProduct
    ),
  "All 382 Products must convert without mutating or aliasing canonical records."
);
function assertCanonicalGraphUnfrozen(value: unknown, path: string): void {
  if (typeof value !== "object" || value === null) return;

  assert(!Object.isFrozen(value), `${path} must remain unfrozen.`);

  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);

    assert(
      descriptor !== undefined && "value" in descriptor,
      `${path} must remain an ordinary data graph.`
    );
    assertCanonicalGraphUnfrozen(descriptor.value, `${path}.${String(key)}`);
  }
}
products.forEach((canonicalProduct, index) =>
  assertCanonicalGraphUnfrozen(canonicalProduct, `CanonicalProduct[${index}]`)
);
products.forEach((canonicalProduct, index) => {
  assert(
    JSON.stringify(Reflect.ownKeys(englishListItems[index].product)) ===
      JSON.stringify(
        Reflect.ownKeys(canonicalProduct).filter(
          (key) => !forbiddenPublicProductKeys.has(key)
        )
      ),
    `PublicProductRecord[${index}] must retain every allowed Product key.`
  );
});
englishListItems.forEach((item, index) =>
  assertDetachedAndFrozenPublicGraph(
    item.product,
    products[index],
    `PublicProductRecord[${index}]`
  )
);
assert(
  englishListItems.every(
    (item) =>
      !("shortDescription" in item.product) &&
      !("description" in item.product) &&
      !("seoTitle" in item.product) &&
      !("seoDescription" in item.product)
  ),
  "Public Product records must exclude canonical copy and SEO override fields."
);

const featuredItems = createProductListItemViewModels(
  getFeaturedProducts(),
  "fa"
);
const relatedItems = createProductListItemViewModels(
  getRelatedProducts(product, products),
  "fa"
);
assert(
  featuredItems.every((item) => item.copy.shortDescription.length > 0) &&
    relatedItems.every((item) => item.copy.shortDescription.length > 0),
  "Featured and related card inputs must carry mandatory public copy."
);

const searchQueries = [
  ...new Set(
    products.flatMap((candidate) => [
      candidate.title,
      candidate.partNumber,
      candidate.shortDescription.split(/\s+/u)[0] ?? "",
    ])
  ),
  "no-such-product-copy-query",
  "",
];
for (const query of searchQueries) {
  const normalizedQuery = query.trim().toLowerCase();
  const legacyIds = products
    .filter(
      (candidate) =>
        !normalizedQuery ||
        candidate.title.toLowerCase().includes(normalizedQuery) ||
        candidate.partNumber.toLowerCase().includes(normalizedQuery) ||
        candidate.shortDescription.toLowerCase().includes(normalizedQuery)
    )
    .map((candidate) => candidate.id);
  const integratedIds = englishListItems
    .filter((item) => matchesProductSearch(item, query))
    .map((item) => item.product.id);

  assert(
    JSON.stringify(integratedIds) === JSON.stringify(legacyIds),
    `Disabled-publication search parity failed for ${query}.`
  );
}
const exactPartNumber = englishListItems[0].product.partNumber;
const cleanPartNumberResult = englishListItems
  .filter((item) => matchesProductSearch(item, exactPartNumber))
  .map((item) => item.product.id);
const bidiFormattingControls = [
  "\u061c",
  "\u200e",
  "\u200f",
  "\u202a",
  "\u202b",
  "\u202c",
  "\u202d",
  "\u202e",
  "\u2066",
  "\u2067",
  "\u2068",
  "\u2069",
] as const;

for (const control of bidiFormattingControls) {
  const controlledResult = englishListItems
    .filter((item) =>
      matchesProductSearch(item, `${control}${exactPartNumber}${control}`)
    )
    .map((item) => item.product.id);

  assert(
    JSON.stringify(controlledResult) === JSON.stringify(cleanPartNumberResult),
    `Bidi control U+${control.codePointAt(0)?.toString(16).toUpperCase()} must be search-neutral.`
  );
}
assert(
  JSON.stringify(
    englishListItems
      .filter((item) =>
        matchesProductSearch(item, `\u202e${exactPartNumber}\u202c`)
      )
      .map((item) => item.product.id)
  ) === JSON.stringify(cleanPartNumberResult),
  "The U+202E/U+202C bidi override pair must be search-neutral."
);
assert(
  normalizeProductSearchValue(`a\u200cb`) === `a\u200cb`,
  "Search normalization must preserve meaningful Persian ZWNJ."
);

const comparisonValidIds = new Set(products.slice(0, 6).map(({ id }) => id));
const legacyComparison = [
  products[0],
  products[1],
  products[0],
  { id: "stale-product" },
  products[2],
  products[3],
  products[4],
];
const expectedComparisonIds = products.slice(0, 4).map(({ id }) => id);
assert(
  JSON.stringify(
    migrateStoredComparisonIds(legacyComparison, comparisonValidIds)
  ) === JSON.stringify(expectedComparisonIds),
  "Legacy comparison Products must migrate to ordered, unique, valid IDs capped at four."
);
assert(
  JSON.stringify(
    parseStoredComparisonIds(
      JSON.stringify(expectedComparisonIds),
      comparisonValidIds
    )
  ) === JSON.stringify(expectedComparisonIds) &&
    parseStoredComparisonIds("not-json", comparisonValidIds).length === 0 &&
    migrateStoredComparisonIds({}, comparisonValidIds).length === 0,
  "Comparison storage must accept ID arrays and reject malformed non-arrays."
);
let propertyGetterAttempts = 0;
const propertyGetterFailure = createComparisonStorageAdapter(() => {
  propertyGetterAttempts += 1;
  throw new Error("SecurityError");
});
assert(
  propertyGetterFailure.read(comparisonValidIds).length === 0 &&
    !propertyGetterFailure.write(expectedComparisonIds) &&
    propertyGetterFailure.read(comparisonValidIds).length === 0 &&
    propertyGetterAttempts === 1,
  "A throwing localStorage property getter must be contained and disabled."
);

let unavailableStorageAttempts = 0;
const unavailableStorage = createComparisonStorageAdapter(() => {
  unavailableStorageAttempts += 1;
  return null;
});
assert(
  unavailableStorage.read(comparisonValidIds).length === 0 &&
    !unavailableStorage.write(expectedComparisonIds) &&
    unavailableStorageAttempts === 1,
  "Null storage must initialize empty and remain unavailable."
);

let getItemAttempts = 0;
const getItemFailure = createComparisonStorageAdapter(() => ({
  getItem() {
    getItemAttempts += 1;
    throw new Error("SecurityError");
  },
  setItem() {
    throw new Error("setItem must not run after a read failure");
  },
}));
assert(
  getItemFailure.read(comparisonValidIds).length === 0 &&
    getItemFailure.read(comparisonValidIds).length === 0 &&
    !getItemFailure.write(expectedComparisonIds) &&
    getItemAttempts === 1,
  "A throwing getItem must be contained without repeated exception loops."
);

const malformedStorage = createComparisonStorageAdapter(() => ({
  getItem: () => "not-json",
  setItem: () => undefined,
}));
assert(
  malformedStorage.read(comparisonValidIds).length === 0,
  "Malformed comparison JSON must initialize an empty selection."
);

let prematureWrites = 0;
const noPrematureWriteStorage = createComparisonStorageAdapter(() => ({
  getItem: () => JSON.stringify(legacyComparison),
  setItem: () => {
    prematureWrites += 1;
  },
}));
assert(
  !noPrematureWriteStorage.write(expectedComparisonIds) &&
    prematureWrites === 0 &&
    JSON.stringify(noPrematureWriteStorage.read(comparisonValidIds)) ===
      JSON.stringify(expectedComparisonIds),
  "Comparison storage must read and migrate the legacy value before writing."
);

let setItemAttempts = 0;
const setItemFailure = createComparisonStorageAdapter(() => ({
  getItem: () => JSON.stringify(expectedComparisonIds),
  setItem() {
    setItemAttempts += 1;
    throw new Error("QuotaExceededError");
  },
}));
let inMemoryIds = setItemFailure.read(comparisonValidIds);
assert(
  JSON.stringify(inMemoryIds) === JSON.stringify(expectedComparisonIds) &&
    !setItemFailure.write(inMemoryIds) &&
    setItemAttempts === 1,
  "A write failure after a successful read must be contained."
);
inMemoryIds = removeComparisonProduct(inMemoryIds, expectedComparisonIds[0]);
inMemoryIds = addComparisonProduct(inMemoryIds, products[4].id);
assert(
  inMemoryIds.includes(products[4].id) &&
    !inMemoryIds.includes(expectedComparisonIds[0]) &&
    !setItemFailure.write(inMemoryIds) &&
    setItemAttempts === 1,
  "In-memory add and remove must survive disabled storage."
);
inMemoryIds = [];
assert(
  inMemoryIds.length === 0 &&
    !setItemFailure.write(inMemoryIds) &&
    setItemAttempts === 1,
  "In-memory clear must survive disabled storage."
);

let storedIdsOnly = "";
const workingStorage = createComparisonStorageAdapter(() => ({
  getItem: () => JSON.stringify(expectedComparisonIds),
  setItem: (_key, value) => {
    storedIdsOnly = value;
  },
}));
assert(
  JSON.stringify(workingStorage.read(comparisonValidIds)) ===
    JSON.stringify(expectedComparisonIds) &&
    workingStorage.write(expectedComparisonIds) &&
    storedIdsOnly === JSON.stringify(expectedComparisonIds),
  "Available comparison storage must read and persist IDs only."
);

const rehydratedEnglish = expectedComparisonIds.map((id) =>
  englishListItems.find((item) => item.product.id === id)!
);
const rehydratedPersian = expectedComparisonIds.map((id) =>
  disabledPersianListItems.find((item) => item.product.id === id)!
);
assert(
  rehydratedEnglish.every(
    (item, index) => item.product.id === rehydratedPersian[index].product.id
  ) && rehydratedPersian.every((item) => item.copy.language === "en"),
  "Locale switching must preserve IDs while rehydrating current-locale copy."
);

const productMetadata = createProductMetadata(fakeSeoProduct, "fa");
const metadataOpenGraph = productMetadata.openGraph as {
  readonly title?: string;
  readonly description?: string;
};
const metadataTwitter = productMetadata.twitter as {
  readonly title?: string;
  readonly description?: string;
};
const productSchema = createProductSchema(
  fakeSeoProduct,
  resolvedDisabledPersian,
  "fa"
);
const serializedDisabledPersian = serializeResolvedProductCopy(
  resolvedDisabledPersian
);
assert(
  productMetadata.title === serializedDisabledPersian.seoTitle &&
    metadataOpenGraph.title === serializedDisabledPersian.seoTitle &&
    metadataTwitter.title === serializedDisabledPersian.seoTitle &&
    String(productMetadata.title).endsWith("SIEMIRAN"),
  "Metadata, OpenGraph, and Twitter titles must use the resolved SIEMIRAN title."
);
assert(
  productMetadata.description === serializedDisabledPersian.seoDescription &&
    metadataOpenGraph.description ===
      serializedDisabledPersian.seoDescription &&
    metadataTwitter.description === serializedDisabledPersian.seoDescription &&
    productSchema.description === serializedDisabledPersian.seoDescription,
  "Metadata, social metadata, and Product JSON-LD must share resolved SEO description."
);
assert(
  !JSON.stringify(productMetadata).includes(fakeSeoProduct.seoTitle ?? "") &&
    !JSON.stringify(productMetadata).includes(
      fakeSeoProduct.seoDescription ?? ""
    ) &&
    !JSON.stringify(productSchema).includes(
      fakeSeoProduct.seoDescription ?? ""
    ),
  "Canonical SEO overrides must not reach metadata or Product JSON-LD."
);

const singleListItem = createProductListItemViewModel(product, "fa");
assert(
  singleListItem.copy.language === "en" &&
    singleListItem.product.id === product.id,
  "Single-item factory must preserve canonical identity with disabled English copy."
);

const isolatedTechnicalText = serializeProductCopyParagraph(
  separatedSegments.shortDescription
);
const searchableTechnicalText = serializeProductCopyParagraphForSearch(
  separatedSegments.shortDescription
);
assert(
  isolatedTechnicalText.includes(`\u2066${product.partNumber}\u2069`),
  "Display serialization must isolate technical segments with LRI/PDI."
);
assert(
  !/[\u2066-\u2069]/u.test(searchableTechnicalText) &&
    normalizeProductCopySearchValue(isolatedTechnicalText) ===
      normalizeProductCopySearchValue(searchableTechnicalText),
  "Search serialization must omit infrastructure isolation controls."
);
assert(
  serializedEnglish.seoTitle.includes(`\u2066${product.title}\u2069`),
  "Resolved serialization must isolate the canonical technical title."
);
assert(
  JSON.stringify(product) === canonicalSnapshot,
  "Resolution must not mutate the canonical Product."
);

const hashFixture = fixture([
  { kind: "text", value: "الف" },
  { kind: "text", value: "ب" },
]);
const baseHash = createProductCopyContentHash(hashFixture);
assert(
  baseHash === createProductCopyContentHash(hashFixture),
  "Content hash must be deterministic."
);
assert(
  baseHash !==
    createProductCopyContentHash({
      ...hashFixture,
      productId: secondProduct.id,
    }),
  "Content hash must bind Product ID."
);
assert(
  baseHash !==
    createProductCopyContentHash({
      ...hashFixture,
      shortDescription: [{ kind: "text", value: "الفب" }],
    }),
  "Content hash must bind segment boundaries."
);
assert(
  baseHash !==
    createProductCopyContentHash({
      ...hashFixture,
      shortDescription: [...hashFixture.shortDescription].reverse(),
    }),
  "Content hash must bind segment order."
);
assert(
  baseHash !==
    createProductCopyContentHash({
      ...hashFixture,
      shortDescription: [
        { kind: "technical", value: "الف" },
        { kind: "text", value: "ب" },
      ],
    }),
  "Content hash must bind segment kind."
);
assert(
  baseHash !==
    createProductCopyContentHash({
      ...hashFixture,
      description: [
        [{ kind: "text", value: "الف" }],
        [{ kind: "text", value: "ب" }],
      ],
    }),
  "Content hash must bind paragraph boundaries."
);
const reviewMetadataChanged = {
  ...hashFixture,
  linguisticReview: { decision: "rejected", note: "changed" } as const,
  technicalReview: { decision: "pending", note: "changed" } as const,
};
assert(
  baseHash === createProductCopyContentHash(reviewMetadataChanged),
  "Content hash must exclude review metadata."
);

const lifecycleOmissionIds = products
  .filter((item) => item.lifecycle === undefined)
  .map((item) => item.id)
  .sort();
const expectedLifecycleOmissionIds = [
  ...EXPECTED_LIFECYCLE_OMISSION_IDS,
].sort();
const s7300Count = products.filter((item) => item.familyId === "S7-300").length;
const s71200Count = products.filter(
  (item) => item.familyId === "S7-1200"
).length;
const faProductSlugs = products.map((item) => item.slug);
const enProductSlugs = products.map((item) => item.slug);
const faProductSlugSet = new Set(faProductSlugs);
const enProductSlugSet = new Set(enProductSlugs);
const localizedSlugDifferences = [
  ...faProductSlugs.filter((slug) => !enProductSlugSet.has(slug)),
  ...enProductSlugs.filter((slug) => !faProductSlugSet.has(slug)),
];
const expectedBatch01DraftProducts = [
  {
    productId: "siemens-s7-1200-cpu-211-1ae40",
    slug: "6es7211-1ae40-0xb0",
    title: "SIMATIC S7-1200 CPU 1211C DC/DC/DC",
    partNumber: "6ES7211-1AE40-0XB0",
    canonicalDescription:
      "SIMATIC S7-1200 compact CPU 1211C DC/DC/DC. Onboard I/O: 6 digital inputs and 4 digital outputs. 2 analog inputs 0-10 V DC.",
    lifecycle: "active",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7211-1AE40-0XB0",
  },
  {
    productId: "siemens-s7-1200-cpu-212-1ae40",
    slug: "6es7212-1ae40-0xb0",
    title: "SIMATIC S7-1200 CPU 1212C DC/DC/DC",
    partNumber: "6ES7212-1AE40-0XB0",
    canonicalDescription:
      "SIMATIC S7-1200 compact CPU 1212C DC/DC/DC. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC.",
    lifecycle: "active",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1AE40-0XB0",
  },
  {
    productId: "siemens-s7-1200-cpu-214-1ag40",
    slug: "6es7214-1ag40-0xb0",
    title: "SIMATIC S7-1200 CPU 1214C DC/DC/DC",
    partNumber: "6ES7214-1AG40-0XB0",
    canonicalDescription:
      "SIMATIC S7-1200 compact CPU 1214C DC/DC/DC. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC.",
    lifecycle: "active",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1AG40-0XB0",
  },
  {
    productId: "siemens-s7-1200-cpu-215-1ag40",
    slug: "6es7215-1ag40-0xb0",
    title: "SIMATIC S7-1200 CPU 1215C DC/DC/DC",
    partNumber: "6ES7215-1AG40-0XB0",
    canonicalDescription:
      "SIMATIC S7-1200 compact CPU 1215C DC/DC/DC. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports.",
    lifecycle: "active",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7215-1AG40-0XB0",
  },
  {
    productId: "siemens-s7-1200-cpu-217-1ag40",
    slug: "6es7217-1ag40-0xb0",
    title: "SIMATIC S7-1200 CPU 1217C DC/DC/DC",
    partNumber: "6ES7217-1AG40-0XB0",
    canonicalDescription:
      "SIMATIC S7-1200 compact CPU 1217C DC/DC/DC. Onboard I/O: 10 digital inputs and 6 digital outputs, plus 4 RS-422/485 inputs and 4 RS-422/485 outputs for technology functions. 2 analog inputs 0-10 V DC and 2 analog outputs 0-20 mA DC. 2 PROFINET ports.",
    lifecycle: "active",
    siemensUrl:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7217-1AG40-0XB0",
  },
] as const;
const BATCH_01_LINGUISTIC_REVIEWED_AT = "2026-09-21T19:26:31Z";
const BATCH_01_TECHNICAL_REVIEWED_AT = "2026-09-21T19:27:19Z";
const BATCH_01_LINGUISTIC_NOTE =
  "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.";
const BATCH_01_TECHNICAL_NOTE =
  "Verified Product identity, MLFB, lifecycle, I/O quantities, electrical ranges, interfaces, port counts, technical tokens, and canonical Siemens source; approved without content changes.";
const expectedBatch01ReviewMetadata = [
  {
    productId: "siemens-s7-1200-cpu-211-1ae40",
    reviewedContentHash:
      "sha256:9f4eb09fec28f71baef3c0ed074486afec042c0a20d779da51fc4a90d518e8f3",
    evidenceRef:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7211-1AE40-0XB0",
  },
  {
    productId: "siemens-s7-1200-cpu-212-1ae40",
    reviewedContentHash:
      "sha256:467e4c69ff60f302f22acc31bdb3521dfb9335d5171cc5131ba3514f5f6c11fb",
    evidenceRef:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1AE40-0XB0",
  },
  {
    productId: "siemens-s7-1200-cpu-214-1ag40",
    reviewedContentHash:
      "sha256:5175b7456d490551af2627bc05aaa26c752555e565205a50fa29751b43b8e3ac",
    evidenceRef:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1AG40-0XB0",
  },
  {
    productId: "siemens-s7-1200-cpu-215-1ag40",
    reviewedContentHash:
      "sha256:fa672b497d742bcc06e87ecb71b1128ad92c7771e968e0889c0954fb88ebe305",
    evidenceRef:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7215-1AG40-0XB0",
  },
  {
    productId: "siemens-s7-1200-cpu-217-1ag40",
    reviewedContentHash:
      "sha256:8d231e613502f35684728b238068d1e59aa1f67d17048dc7914a2469c38197c3",
    evidenceRef:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7217-1AG40-0XB0",
  },
] as const;
const expectedCpu1217DraftSegments = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-1200 CPU 1217C DC/DC/DC",
  },
  { kind: "text", value: "، یک " },
  { kind: "technical", value: "CPU" },
  {
    kind: "text",
    value: " کامپکت با ورودی‌ها و خروجی‌های داخلی شامل ",
  },
  { kind: "technical", value: "10" },
  { kind: "text", value: " ورودی دیجیتال و " },
  { kind: "technical", value: "6" },
  {
    kind: "text",
    value: " خروجی دیجیتال است. برای توابع فناوری نیز چهار ورودی ",
  },
  { kind: "technical", value: "RS-422/485" },
  { kind: "text", value: " و چهار خروجی " },
  { kind: "technical", value: "RS-422/485" },
  { kind: "text", value: " دارد. همچنین دارای " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " ورودی آنالوگ " },
  { kind: "technical", value: "0-10 V DC" },
  { kind: "text", value: " و " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " خروجی آنالوگ " },
  { kind: "technical", value: "0-20 mA DC" },
  { kind: "text", value: " است و " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " پورت " },
  { kind: "technical", value: "PROFINET" },
  { kind: "text", value: " دارد." },
] as const;
const expectedCpu1217RenderedDraft =
  "مدل SIMATIC S7-1200 CPU 1217C DC/DC/DC، یک CPU کامپکت با ورودی‌ها و خروجی‌های داخلی شامل 10 ورودی دیجیتال و 6 خروجی دیجیتال است. برای توابع فناوری نیز چهار ورودی RS-422/485 و چهار خروجی RS-422/485 دارد. همچنین دارای 2 ورودی آنالوگ 0-10 V DC و 2 خروجی آنالوگ 0-20 mA DC است و 2 پورت PROFINET دارد.";
const expectedBatch02Drafts = [
  {
    productId: "siemens-s7-300-cpu-315f-2dp-6es7315-6ff04-0ab0",
    rendered:
      "مدل SIMATIC S7-300 CPU 315F-2 DP، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری 384 KB است. دارای رابط‌های MPI و PROFIBUS DP است و رابط دوم می‌تواند در نقش اصلی یا تابع کار کند.",
    technicalTokens: [
      "SIMATIC S7-300 CPU 315F-2 DP",
      "384 KB",
      "MPI",
      "PROFIBUS DP",
    ],
  },
  {
    productId: "siemens-s7-300-cpu-315f-2pn-dp-6es7315-2fj14-0ab0",
    rendered:
      "مدل SIMATIC S7-300 CPU 315F-2 PN/DP، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری 512 KB است. دارای رابط‌های MPI/DP و PROFINET مبتنی بر اترنت با سوئیچ دو پورت است.",
    technicalTokens: [
      "SIMATIC S7-300 CPU 315F-2 PN/DP",
      "512 KB",
      "MPI/DP",
      "PROFINET",
    ],
  },
  {
    productId: "siemens-s7-300-cpu-317f-2dp-6es7317-6ff04-0ab0",
    rendered:
      "مدل SIMATIC S7-300 CPU 317F-2 DP، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری 1.5 MB است. دارای رابط‌های MPI/DP و PROFIBUS DP است و رابط دوم می‌تواند در نقش اصلی یا تابع کار کند.",
    technicalTokens: [
      "SIMATIC S7-300 CPU 317F-2 DP",
      "1.5 MB",
      "MPI/DP",
      "PROFIBUS DP",
    ],
  },
  {
    productId: "siemens-s7-300-cpu-317f-2pn-dp-6es7317-2fk14-0ab0",
    rendered:
      "مدل SIMATIC S7-300 CPU 317F-2 PN/DP، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری 1.5 MB است. دارای رابط‌های MPI/DP و PROFINET مبتنی بر اترنت با سوئیچ دو پورت است.",
    technicalTokens: [
      "SIMATIC S7-300 CPU 317F-2 PN/DP",
      "1.5 MB",
      "MPI/DP",
      "PROFINET",
    ],
  },
  {
    productId: "siemens-s7-300-cpu-319f-3pn-dp-3fl01-0ab0",
    rendered:
      "مدل SIMATIC S7-300 CPU 319F-3 PN/DP، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری 2.5 MB است. دارای رابط‌های MPI/DP، PROFIBUS DP با امکان کار در نقش اصلی یا تابع، و PROFINET مبتنی بر اترنت است.",
    technicalTokens: [
      "SIMATIC S7-300 CPU 319F-3 PN/DP",
      "2.5 MB",
      "MPI/DP",
      "PROFIBUS DP",
      "PROFINET",
    ],
  },
] as const;
const expectedBatch03Drafts = [
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-1bh02-0aa0",
    rendered:
      "مدل SIMATIC S7-300 SM 321 16 DI 24 V DC، یک ماژول ورودی دیجیتال با 16 ورودی و ولتاژ ورودی 24 V DC است.",
    technicalTokens: [
      "SIMATIC S7-300 SM 321 16 DI 24 V DC",
      "16",
      "24 V DC",
    ],
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-1bh10-0aa0",
    rendered:
      "مدل SIMATIC S7-300 SM 321 16 DI 24 V DC HF، یک ماژول ورودی دیجیتال با 16 ورودی و ولتاژ ورودی 24 V DC است.",
    technicalTokens: [
      "SIMATIC S7-300 SM 321 16 DI 24 V DC HF",
      "16",
      "24 V DC",
    ],
  },
  {
    productId: "siemens-s7-300-sm321-di-32-24vdc-1bl00-0aa0",
    rendered:
      "مدل SIMATIC S7-300 SM 321 32 DI 24 V DC، یک ماژول ورودی دیجیتال با 32 ورودی و ولتاژ ورودی 24 V DC است.",
    technicalTokens: [
      "SIMATIC S7-300 SM 321 32 DI 24 V DC",
      "32",
      "24 V DC",
    ],
  },
  {
    productId: "siemens-s7-300-sm321-di-64-24vdc-1bp00-0aa0",
    rendered:
      "مدل SIMATIC S7-300 SM 321 64 DI 24 V DC، یک ماژول ورودی دیجیتال با 64 ورودی و ولتاژ ورودی 24 V DC است.",
    technicalTokens: [
      "SIMATIC S7-300 SM 321 64 DI 24 V DC",
      "64",
      "24 V DC",
    ],
  },
  {
    productId: "siemens-s7-300-sm321-di-16-48-125vdc-1ch20-0aa0",
    rendered:
      "مدل SIMATIC S7-300 SM 321 16 DI 48-125 V DC، یک ماژول ورودی دیجیتال با 16 ورودی و ولتاژ ورودی 48-125 V DC است.",
    technicalTokens: [
      "SIMATIC S7-300 SM 321 16 DI 48-125 V DC",
      "16",
      "48-125 V DC",
    ],
  },
] as const;
const BATCH_03_LINGUISTIC_REVIEWED_AT = "2026-09-24T18:38:52Z";
const BATCH_03_TECHNICAL_REVIEWED_AT = "2026-09-24T18:38:53Z";
const BATCH_03_LINGUISTIC_NOTE =
  "Reviewed Persian grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy; approved without content changes.";
const BATCH_03_TECHNICAL_NOTE =
  "Verified title against the canonical Product and input count and voltage against indexed exact-product Siemens datasheet content. Direct PDF returned HTTP 403; delay, diagnostics, and interrupts were not reviewed.";
const expectedBatch03ReviewMetadata = [
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-1bh02-0aa0",
    reviewedContentHash:
      "sha256:1057b0253160356d5add3c8ce7639116fae7c8af48ccdc2630b7d648da29d410",
    evidenceRef:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BH02-0AA0",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-1bh10-0aa0",
    reviewedContentHash:
      "sha256:5d64c61a0fb7f9c62e3ee9eda046b1a4337fe751694fe4096378c0b5f714dd07",
    evidenceRef:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BH10-0AA0",
  },
  {
    productId: "siemens-s7-300-sm321-di-32-24vdc-1bl00-0aa0",
    reviewedContentHash:
      "sha256:5554a0e19f15bccce5c689fde62b5669189267143a09d41ef3fbc699d4c9430b",
    evidenceRef:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BL00-0AA0",
  },
  {
    productId: "siemens-s7-300-sm321-di-64-24vdc-1bp00-0aa0",
    reviewedContentHash:
      "sha256:f276c29b5ef82e5567ed10c70d07080b54fdd7ae2a0bb48783cb3215638e765b",
    evidenceRef:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BP00-0AA0",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-48-125vdc-1ch20-0aa0",
    reviewedContentHash:
      "sha256:fd3901cc3a5c3f3ba356b2beaf2d46935fafa4b525b062efca63ff3db62fa754",
    evidenceRef:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1CH20-0AA0",
  },
] as const;
const BATCH_02_LINGUISTIC_REVIEWED_AT = "2026-09-23T18:33:39Z";
const BATCH_02_TECHNICAL_REVIEWED_AT = "2026-09-23T18:33:41Z";
const BATCH_02_LINGUISTIC_NOTE =
  "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.";
const BATCH_02_TECHNICAL_NOTE =
  "Verified Product identity, MLFB, fail-safe CPU classification, work memory, interfaces, interface roles, technical tokens, and canonical Siemens source; approved without content changes.";
const expectedBatch02ReviewMetadata = [
  {
    productId: "siemens-s7-300-cpu-315f-2dp-6es7315-6ff04-0ab0",
    reviewedContentHash:
      "sha256:8fc714b37de5c59d78c557945706fe0fb66202ff1782e81cdbfc4c3edbc598d8",
    evidenceRef:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7315-6FF04-0AB0",
  },
  {
    productId: "siemens-s7-300-cpu-315f-2pn-dp-6es7315-2fj14-0ab0",
    reviewedContentHash:
      "sha256:bc4e92906d0c8382cf2e79fdd5d4a8da363afef86660b3662500776670b07c6b",
    evidenceRef:
      "https://mall.industry.siemens.com/mall/en/br/Catalog/Product?SiepCountryCode=BR&mlfb=6ES7315-2FJ14-0AB0",
  },
  {
    productId: "siemens-s7-300-cpu-317f-2dp-6es7317-6ff04-0ab0",
    reviewedContentHash:
      "sha256:669054b0662ee5211d27868ca430e6b1ad7b55756c6b3e4c05c98b678dd26372",
    evidenceRef:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7317-6FF04-0AB0",
  },
  {
    productId: "siemens-s7-300-cpu-317f-2pn-dp-6es7317-2fk14-0ab0",
    reviewedContentHash:
      "sha256:db77d0008754e81a0761dc55249b647a0d89b251d78c2d71bbb680ba6bc76300",
    evidenceRef:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7317-2FK14-0AB0",
  },
  {
    productId: "siemens-s7-300-cpu-319f-3pn-dp-3fl01-0ab0",
    reviewedContentHash:
      "sha256:b94828a69f8ffc1b03b357451e4d3f03550120f746636c80fd768a1dd41f48cf",
    evidenceRef:
      "https://mall.industry.siemens.com/mall/en/inosatavtomatica/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7318-3FL01-0AB0",
  },
] as const;

function cloneMutableOverlay(entry: PersianProductCopyOverlay): MutableOverlay {
  return {
    productId: entry.productId,
    shortDescription: entry.shortDescription.map((segment) => ({ ...segment })),
    description: entry.description.map((paragraph) =>
      paragraph.map((segment) => ({ ...segment }))
    ),
    provenance: entry.provenance,
    linguisticReview: { ...entry.linguisticReview },
    technicalReview: { ...entry.technicalReview },
  };
}

const expectedBatch01DraftProductIds = expectedBatch01DraftProducts.map(
  (entry) => entry.productId
);
const expectedBatch02DraftProductIds = expectedBatch02Drafts.map(
  (entry) => entry.productId
);
const expectedBatch03DraftProductIds = expectedBatch03Drafts.map(
  (entry) => entry.productId
);
const expectedBatch01DraftProductIdSet = new Set<ProductId>(
  expectedBatch01DraftProductIds
);
const expectedBatch02DraftProductIdSet = new Set<ProductId>(
  expectedBatch02DraftProductIds
);
const expectedBatch03DraftProductIdSet = new Set<ProductId>(
  expectedBatch03DraftProductIds
);
const registeredBatch01Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch01DraftProductIdSet.has(entry.productId)
);
const registeredBatch02Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch02DraftProductIdSet.has(entry.productId)
);
const registeredBatch03Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch03DraftProductIdSet.has(entry.productId)
);
const registeredBatch01DraftBindings = registeredBatch01Drafts.map(
  (entry) => {
    const product = products.find(
      (candidate) => candidate.id === entry.productId
    );
    assert(
      product !== undefined,
      `Draft Product must remain canonical: ${entry.productId}`
    );
    return {
      productId: product.id,
      slug: product.slug,
      title: product.title,
      partNumber: product.partNumber,
      canonicalDescription: product.description,
      lifecycle: product.lifecycle,
      siemensUrl: product.siemensUrl,
    };
  }
);
const registeredBatch02DraftBindings = registeredBatch02Drafts.map((entry) => {
  const product = products.find((candidate) => candidate.id === entry.productId);
  assert(
    product !== undefined,
    `Batch 02 draft Product must remain canonical: ${entry.productId}`
  );
  return {
    productId: product.id,
    title: product.title,
    partNumber: product.partNumber,
    canonicalDescription: product.description,
    workMemory: product.specifications?.["Work Memory"],
    interfaces: product.specifications?.Interfaces,
    siemensUrl: product.siemensUrl,
  };
});
const registeredBatch03DraftBindings = registeredBatch03Drafts.map((entry) => {
  const product = products.find((candidate) => candidate.id === entry.productId);
  assert(
    product !== undefined,
    `Batch 03 draft Product must remain canonical: ${entry.productId}`
  );
  return {
    productId: product.id,
    title: product.title,
    partNumber: product.partNumber,
    canonicalDescription: product.description,
    digitalInputs: product.specifications?.["Digital Inputs"],
    inputVoltage: product.specifications?.["Input Voltage"],
    siemensUrl: product.siemensUrl,
  };
});
const registeredDraftValidation = validatePersianProductCopyDrafts(
  persianProductCopyDraftRegistry,
  products
);
const registeredDraftActivation = validatePersianProductCopyForActivation(
  persianProductCopyDraftRegistry,
  products
);
const isApprovedReview = (review: ProductCopyReview): boolean =>
  review.decision === "approved";
const registeredLinguisticApprovals = persianProductCopyDraftRegistry.filter(
  (entry) => isApprovedReview(entry.linguisticReview)
).length;
const registeredTechnicalApprovals = persianProductCopyDraftRegistry.filter(
  (entry) => isApprovedReview(entry.technicalReview)
).length;
const registeredBatch01ApprovalRecords = registeredBatch01Drafts.map(
  (entry) => {
    const expected = expectedBatch01ReviewMetadata.find(
      (candidate) => candidate.productId === entry.productId
    );
    assert(
      expected !== undefined,
      `Batch 01 approval metadata must remain scoped to ${entry.productId}.`
    );

    const freshContentHash = createProductCopyContentHash(entry);
    const expectedLinguisticReview = {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: BATCH_01_LINGUISTIC_REVIEWED_AT,
      reviewedContentHash: expected.reviewedContentHash,
      evidenceRef: expected.evidenceRef,
      note: BATCH_01_LINGUISTIC_NOTE,
    } as const;
    const expectedTechnicalReview = {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: BATCH_01_TECHNICAL_REVIEWED_AT,
      reviewedContentHash: expected.reviewedContentHash,
      evidenceRef: expected.evidenceRef,
      note: BATCH_01_TECHNICAL_NOTE,
    } as const;

    assert(
      JSON.stringify(entry.linguisticReview) ===
        JSON.stringify(expectedLinguisticReview),
      `Batch 01 linguistic approval must be exact for ${entry.productId}.`
    );
    assert(
      JSON.stringify(entry.technicalReview) ===
        JSON.stringify(expectedTechnicalReview),
      `Batch 01 technical approval must be exact for ${entry.productId}.`
    );
    assert(
      entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved",
      `Batch 01 must retain both approved role records for ${entry.productId}.`
    );
    assert(
      !Object.is(entry.linguisticReview, entry.technicalReview) &&
        entry.linguisticReview.reviewerId ===
          entry.technicalReview.reviewerId &&
        entry.linguisticReview.reviewedAt < entry.technicalReview.reviewedAt,
      `Batch 01 same-reviewer role records must remain distinct and ordered for ${entry.productId}.`
    );
    assert(
      freshContentHash === expected.reviewedContentHash &&
        entry.linguisticReview.reviewedContentHash === freshContentHash &&
        entry.technicalReview.reviewedContentHash === freshContentHash,
      `Batch 01 approvals must bind the fresh production hash for ${entry.productId}.`
    );

    return {
      productId: entry.productId,
      freshContentHash,
      evidenceRef: expected.evidenceRef,
      roleObjectsDistinct: !Object.is(
        entry.linguisticReview,
        entry.technicalReview
      ),
    };
  }
);
const registeredBatch02ApprovalRecords = registeredBatch02Drafts.map(
  (entry) => {
    const expected = expectedBatch02ReviewMetadata.find(
      (candidate) => candidate.productId === entry.productId
    );
    assert(
      expected !== undefined,
      `Batch 02 approval metadata must remain scoped to ${entry.productId}.`
    );

    const freshContentHash = createProductCopyContentHash(entry);
    const expectedLinguisticReview = {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: BATCH_02_LINGUISTIC_REVIEWED_AT,
      reviewedContentHash: expected.reviewedContentHash,
      evidenceRef: expected.evidenceRef,
      note: BATCH_02_LINGUISTIC_NOTE,
    } as const;
    const expectedTechnicalReview = {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: BATCH_02_TECHNICAL_REVIEWED_AT,
      reviewedContentHash: expected.reviewedContentHash,
      evidenceRef: expected.evidenceRef,
      note: BATCH_02_TECHNICAL_NOTE,
    } as const;

    assert(
      JSON.stringify(entry.linguisticReview) ===
        JSON.stringify(expectedLinguisticReview),
      `Batch 02 linguistic approval must be exact for ${entry.productId}.`
    );
    assert(
      JSON.stringify(entry.technicalReview) ===
        JSON.stringify(expectedTechnicalReview),
      `Batch 02 technical approval must be exact for ${entry.productId}.`
    );
    assert(
      entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        !Object.is(entry.linguisticReview, entry.technicalReview) &&
        entry.linguisticReview.reviewerId ===
          entry.technicalReview.reviewerId &&
        entry.linguisticReview.reviewedAt < entry.technicalReview.reviewedAt,
      `Batch 02 must retain distinct and ordered approved role records for ${entry.productId}.`
    );
    assert(
      freshContentHash === expected.reviewedContentHash &&
        entry.linguisticReview.reviewedContentHash === freshContentHash &&
        entry.technicalReview.reviewedContentHash === freshContentHash,
      `Batch 02 approvals must bind the fresh production hash for ${entry.productId}.`
    );

    return {
      productId: entry.productId,
      freshContentHash,
      evidenceRef: expected.evidenceRef,
      roleObjectsDistinct: !Object.is(
        entry.linguisticReview,
        entry.technicalReview
      ),
    };
  }
);
const registeredBatch03ApprovalRecords = registeredBatch03Drafts.map(
  (entry) => {
    const expected = expectedBatch03ReviewMetadata.find(
      (candidate) => candidate.productId === entry.productId
    );
    assert(
      expected !== undefined,
      `Batch 03 approval metadata must remain scoped to ${entry.productId}.`
    );

    const freshContentHash = createProductCopyContentHash(entry);
    const expectedLinguisticReview = {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: BATCH_03_LINGUISTIC_REVIEWED_AT,
      reviewedContentHash: expected.reviewedContentHash,
      evidenceRef: expected.evidenceRef,
      note: BATCH_03_LINGUISTIC_NOTE,
    } as const;
    const expectedTechnicalReview = {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: BATCH_03_TECHNICAL_REVIEWED_AT,
      reviewedContentHash: expected.reviewedContentHash,
      evidenceRef: expected.evidenceRef,
      note: BATCH_03_TECHNICAL_NOTE,
    } as const;

    assert(
      JSON.stringify(entry.linguisticReview) ===
        JSON.stringify(expectedLinguisticReview) &&
        JSON.stringify(entry.technicalReview) ===
          JSON.stringify(expectedTechnicalReview),
      `Batch 03 role approvals and evidence must be exact for ${entry.productId}.`
    );
    assert(
      !Object.is(entry.linguisticReview, entry.technicalReview) &&
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedAt < entry.technicalReview.reviewedAt,
      `Batch 03 role approvals must be distinct and ordered for ${entry.productId}.`
    );
    assert(
      freshContentHash === expected.reviewedContentHash &&
        entry.linguisticReview.reviewedContentHash === freshContentHash &&
        entry.technicalReview.reviewedContentHash === freshContentHash,
      `Batch 03 approvals must bind the fresh production hash for ${entry.productId}.`
    );

    return {
      productId: entry.productId,
      freshContentHash,
      evidenceRef: expected.evidenceRef,
      roleObjectsDistinct: !Object.is(
        entry.linguisticReview,
        entry.technicalReview
      ),
    };
  }
);
const registeredCurrentDualApprovals = persianProductCopyDraftRegistry.filter(
  (entry) => {
    const freshContentHash = createProductCopyContentHash(entry);
    return (
      entry.linguisticReview.decision === "approved" &&
      entry.technicalReview.decision === "approved" &&
      entry.linguisticReview.reviewedContentHash === freshContentHash &&
      entry.technicalReview.reviewedContentHash === freshContentHash
    );
  }
).length;
const registeredBatch01ApprovalMutationResults =
  registeredBatch01Drafts.map((entry) => {
    const copyMutation = cloneMutableOverlay(entry);
    const finalShortSegment = copyMutation.shortDescription.at(-1);
    assert(
      finalShortSegment !== undefined,
      `Batch 01 copy mutation requires a final segment for ${entry.productId}.`
    );
    finalShortSegment.value = `${finalShortSegment.value.slice(0, -1)}!`;
    const copyMutationResult = validatePersianProductCopyDrafts(
      [copyMutation],
      products
    );

    const kindMutation = cloneMutableOverlay(entry);
    const firstShortSegment = kindMutation.shortDescription[0];
    assert(
      firstShortSegment !== undefined,
      `Batch 01 kind mutation requires a first segment for ${entry.productId}.`
    );
    firstShortSegment.kind =
      firstShortSegment.kind === "text" ? "technical" : "text";
    const kindMutationResult = validatePersianProductCopyDrafts(
      [kindMutation],
      products
    );

    const copyStaleApprovals = copyMutationResult.issues.filter(
      (issue) =>
        issue.code === "stale-approval-hash" &&
        issue.productId === entry.productId
    ).length;
    const kindStaleApprovals = kindMutationResult.issues.filter(
      (issue) =>
        issue.code === "stale-approval-hash" &&
        issue.productId === entry.productId
    ).length;
    assert(
      copyStaleApprovals === 2 && kindStaleApprovals === 2,
      `Batch 01 copy and segment-kind mutations must stale both approvals for ${entry.productId}.`
    );

    return {
      productId: entry.productId,
      copyStaleApprovals,
      kindStaleApprovals,
    };
  });
const registeredBatch02ApprovalMutationResults =
  registeredBatch02Drafts.map((entry) => {
    const copyMutation = cloneMutableOverlay(entry);
    const finalShortSegment = copyMutation.shortDescription.at(-1);
    assert(
      finalShortSegment !== undefined,
      `Batch 02 copy mutation requires a final segment for ${entry.productId}.`
    );
    finalShortSegment.value = `${finalShortSegment.value.slice(0, -1)}!`;
    const copyMutationResult = validatePersianProductCopyDrafts(
      [copyMutation],
      products
    );

    const kindMutation = cloneMutableOverlay(entry);
    const firstShortSegment = kindMutation.shortDescription[0];
    assert(
      firstShortSegment !== undefined,
      `Batch 02 kind mutation requires a first segment for ${entry.productId}.`
    );
    firstShortSegment.kind =
      firstShortSegment.kind === "text" ? "technical" : "text";
    const kindMutationResult = validatePersianProductCopyDrafts(
      [kindMutation],
      products
    );

    const copyStaleApprovals = copyMutationResult.issues.filter(
      (issue) =>
        issue.code === "stale-approval-hash" &&
        issue.productId === entry.productId
    ).length;
    const kindStaleApprovals = kindMutationResult.issues.filter(
      (issue) =>
        issue.code === "stale-approval-hash" &&
        issue.productId === entry.productId
    ).length;
    assert(
      copyStaleApprovals === 2 && kindStaleApprovals === 2,
      `Batch 02 copy and segment-kind mutations must stale both approvals for ${entry.productId}.`
    );

    return {
      productId: entry.productId,
      copyStaleApprovals,
      kindStaleApprovals,
    };
  });
const registeredBatch03ApprovalMutationResults =
  registeredBatch03Drafts.map((entry) => {
    const copyMutation = cloneMutableOverlay(entry);
    const finalShortSegment = copyMutation.shortDescription.at(-1);
    assert(
      finalShortSegment !== undefined,
      `Batch 03 copy mutation requires a final segment for ${entry.productId}.`
    );
    finalShortSegment.value = `${finalShortSegment.value.slice(0, -1)}!`;
    const copyMutationResult = validatePersianProductCopyDrafts(
      [copyMutation],
      products
    );

    const kindMutation = cloneMutableOverlay(entry);
    const firstShortSegment = kindMutation.shortDescription[0];
    assert(
      firstShortSegment !== undefined,
      `Batch 03 kind mutation requires a first segment for ${entry.productId}.`
    );
    firstShortSegment.kind =
      firstShortSegment.kind === "text" ? "technical" : "text";
    const kindMutationResult = validatePersianProductCopyDrafts(
      [kindMutation],
      products
    );

    const copyStaleApprovals = copyMutationResult.issues.filter(
      (issue) =>
        issue.code === "stale-approval-hash" &&
        issue.productId === entry.productId
    ).length;
    const kindStaleApprovals = kindMutationResult.issues.filter(
      (issue) =>
        issue.code === "stale-approval-hash" &&
        issue.productId === entry.productId
    ).length;
    assert(
      copyStaleApprovals === 2 && kindStaleApprovals === 2,
      `Batch 03 copy and segment-kind mutations must stale both approvals for ${entry.productId}.`
    );

    return {
      productId: entry.productId,
      copyStaleApprovals,
      kindStaleApprovals,
    };
  });
const registeredCpu1217Draft = persianProductCopyDraftRegistry.find(
  (entry) => entry.productId === "siemens-s7-1200-cpu-217-1ag40"
);
assert(registeredCpu1217Draft !== undefined, "CPU 1217C draft must exist.");
const registeredCpu1217RenderedDraft = serializeProductCopyParagraphForSearch(
  registeredCpu1217Draft.shortDescription
);
const registeredCpu1217TechnicalSegments =
  registeredCpu1217Draft.shortDescription.filter(
    (segment) => segment.kind === "technical"
  );
const registeredBatch02DraftRecords = expectedBatch02Drafts.map((expected) => {
  const entry = registeredBatch02Drafts.find(
    (candidate) => candidate.productId === expected.productId
  );
  assert(entry !== undefined, `Batch 02 draft must exist: ${expected.productId}`);
  const renderedShortDescription = serializeProductCopyParagraphForSearch(
    entry.shortDescription
  );
  const technicalTokens = entry.shortDescription
    .filter((segment) => segment.kind === "technical")
    .map((segment) => segment.value);
  assert(
    renderedShortDescription === expected.rendered &&
      entry.description.length === 1 &&
      JSON.stringify(entry.description[0]) ===
        JSON.stringify(entry.shortDescription) &&
      JSON.stringify(technicalTokens) ===
        JSON.stringify(expected.technicalTokens),
    `Batch 02 short and long drafts and technical segmentation must be exact: ${expected.productId}`
  );
  assert(
    entry.provenance === "ai-assisted",
    `Batch 02 provenance must remain ai-assisted: ${expected.productId}`
  );
  assert(
    !renderedShortDescription.includes("Ethernet") &&
      !renderedShortDescription.includes("master/slave") &&
      !renderedShortDescription.includes("lifecycle") &&
      !renderedShortDescription.includes("phase-out") &&
      !renderedShortDescription.includes("spare-part") &&
      !renderedShortDescription.includes("discontinued") &&
      !renderedShortDescription.includes("چرخه عمر") &&
      !renderedShortDescription.includes("توقف تولید") &&
      !renderedShortDescription.includes("قطعه یدکی"),
    `Batch 02 drafts must use Persian prose for Ethernet and master/slave concepts and omit lifecycle: ${expected.productId}`
  );
  const freshContentHash = createProductCopyContentHash(entry);
  return {
    productId: entry.productId,
    renderedShortDescription,
    technicalTokens,
    freshContentHash,
  };
});
const registeredBatch03DraftRecords = expectedBatch03Drafts.map((expected) => {
  const entry = registeredBatch03Drafts.find(
    (candidate) => candidate.productId === expected.productId
  );
  assert(entry !== undefined, `Batch 03 draft must exist: ${expected.productId}`);
  const renderedShortDescription = serializeProductCopyParagraphForSearch(
    entry.shortDescription
  );
  const technicalTokens: string[] = entry.shortDescription
    .filter((segment) => segment.kind === "technical")
    .map((segment) => segment.value);
  assert(
    renderedShortDescription === expected.rendered &&
      entry.description.length === 1 &&
      JSON.stringify(entry.description[0]) ===
        JSON.stringify(entry.shortDescription) &&
      JSON.stringify(technicalTokens) ===
        JSON.stringify(expected.technicalTokens),
    `Batch 03 short and long drafts and technical segmentation must be exact: ${expected.productId}`
  );
  assert(
    entry.provenance === "ai-assisted" &&
      entry.linguisticReview.decision === "approved" &&
      entry.technicalReview.decision === "approved" &&
      !Object.is(entry.linguisticReview, entry.technicalReview),
    `Batch 03 provenance and distinct approved review roles must be exact: ${expected.productId}`
  );
  const forbiddenClaims = [
    "Backplane bus",
    "connector",
    "diagnostic",
    "interrupt",
    "input delay",
    "sinking",
    "sourcing",
    "کانکتور",
    "بک‌پلین",
    "تشخیص",
    "وقفه",
    "تأخیر",
    "سینک",
    "سورس",
    "lifecycle",
    "phase-out",
    "spare-part",
    "discontinued",
    "چرخه عمر",
    "توقف تولید",
    "قطعه یدکی",
  ] as const;
  assert(
    technicalTokens.every((token) => token !== "HF") &&
      forbiddenClaims.every(
        (claim) =>
          !renderedShortDescription.toLocaleLowerCase("en").includes(
            claim.toLocaleLowerCase("en")
          )
      ),
    `Batch 03 drafts must omit unauthorized standalone or unsupported claims: ${expected.productId}`
  );
  if (entry.productId === "siemens-s7-300-sm321-di-16-24vdc-1bh10-0aa0") {
    assert(
      !renderedShortDescription.includes("0.05 ms"),
      "Batch 03 SM321 1BH10 must not mention the disputed input delay."
    );
  }
  return {
    productId: entry.productId,
    renderedShortDescription,
    technicalTokens,
    freshContentHash: createProductCopyContentHash(entry),
  };
});
const batch02PublicResolutionResults = batch02Products.map((fixtureProduct) => {
  const english = resolveProductCopy(fixtureProduct, "en");
  const disabledPersian = resolveProductCopy(fixtureProduct, "fa");
  const englishPublic = createPublicProductCardCopyDTO(english);
  const disabledPersianPublic = createPublicProductCardCopyDTO(disabledPersian);
  assert(
    english.source === "canonical-en" &&
      disabledPersian.source === "canonical-en" &&
      serializeProductCopyParagraph(english.shortDescription) ===
        fixtureProduct.shortDescription &&
      serializeProductCopyParagraph(disabledPersian.shortDescription) ===
        fixtureProduct.shortDescription &&
      englishPublic.language === "en" &&
      englishPublic.direction === "ltr" &&
      disabledPersianPublic.language === "en" &&
      disabledPersianPublic.direction === "ltr",
    `Batch 02 public FA/EN copy must remain canonical English/LTR: ${fixtureProduct.id}`
  );
  return {
    productId: fixtureProduct.id,
    englishSource: english.source,
    disabledPersianSource: disabledPersian.source,
    language: disabledPersianPublic.language,
    direction: disabledPersianPublic.direction,
  };
});
const batch03PublicResolutionResults = batch03Products.map((fixtureProduct) => {
  const english = resolveProductCopy(fixtureProduct, "en");
  const disabledPersian = resolveProductCopy(fixtureProduct, "fa");
  const englishPublic = createPublicProductCardCopyDTO(english);
  const disabledPersianPublic = createPublicProductCardCopyDTO(disabledPersian);
  assert(
    english.source === "canonical-en" &&
      disabledPersian.source === "canonical-en" &&
      serializeProductCopyParagraph(english.shortDescription) ===
        fixtureProduct.shortDescription &&
      serializeProductCopyParagraph(disabledPersian.shortDescription) ===
        fixtureProduct.shortDescription &&
      englishPublic.language === "en" &&
      englishPublic.direction === "ltr" &&
      disabledPersianPublic.language === "en" &&
      disabledPersianPublic.direction === "ltr",
    `Batch 03 public FA/EN copy must remain canonical English/LTR: ${fixtureProduct.id}`
  );
  return {
    productId: fixtureProduct.id,
    englishSource: english.source,
    disabledPersianSource: disabledPersian.source,
    language: disabledPersianPublic.language,
    direction: disabledPersianPublic.direction,
  };
});

assert(
  registeredDraftValidation.valid &&
    persianProductCopyDraftRegistry.length === 15 &&
    registeredBatch01Drafts.length === 5 &&
    JSON.stringify(registeredBatch01DraftBindings) ===
      JSON.stringify(expectedBatch01DraftProducts),
  `Batch 01 draft registry and canonical bindings must be exact: ${registeredDraftValidation.issues
    .map((issue) => issue.code)
    .join(", ")}`
);
assert(
  registeredBatch02Drafts.length === 5 &&
    JSON.stringify(registeredBatch02Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch02DraftProductIds) &&
    JSON.stringify(registeredBatch02DraftBindings) ===
      JSON.stringify(expectedBatch02CanonicalProducts) &&
    registeredBatch02DraftRecords.length === 5,
  "Batch 02 draft IDs, canonical Product bindings, copy, and segmentation must be exact."
);
assert(
  registeredBatch03Drafts.length === 5 &&
    JSON.stringify(expectedBatch03DraftProductIds) ===
      JSON.stringify(expectedBatch03ProductIds) &&
    expectedBatch03ReviewMetadata.length === 5 &&
    JSON.stringify(
      expectedBatch03ReviewMetadata.map((entry) => entry.productId)
    ) === JSON.stringify(expectedBatch03ProductIds) &&
    JSON.stringify(registeredBatch03Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch03ProductIds) &&
    JSON.stringify(registeredBatch03DraftBindings) ===
      JSON.stringify(expectedBatch03CanonicalProducts) &&
    registeredBatch03DraftRecords.length === 5,
  "Batch 03 draft IDs, canonical Product bindings, copy, and segmentation must be exact."
);
assert(
  JSON.stringify(registeredCpu1217Draft.shortDescription) ===
    JSON.stringify(expectedCpu1217DraftSegments) &&
    registeredCpu1217Draft.description.length === 1 &&
    JSON.stringify(registeredCpu1217Draft.description[0]) ===
      JSON.stringify(expectedCpu1217DraftSegments) &&
    registeredCpu1217RenderedDraft === expectedCpu1217RenderedDraft,
  "CPU 1217C short and long drafts must use the identical exact corrected segment sequence."
);
assert(
  registeredCpu1217Draft.shortDescription[9]?.kind === "technical" &&
    registeredCpu1217Draft.shortDescription[9].value === "RS-422/485" &&
    registeredCpu1217Draft.shortDescription[11]?.kind === "technical" &&
    registeredCpu1217Draft.shortDescription[11].value === "RS-422/485" &&
    registeredCpu1217TechnicalSegments.at(-1)?.value === "PROFINET",
  "CPU 1217C must use RS-422/485 for both technology I/O positions and standalone PROFINET as its final technical token."
);
assert(
  !registeredCpu1217RenderedDraft.includes("رابط نخست") &&
    !registeredCpu1217RenderedDraft.includes("مجموعه رابط‌های آن"),
  "CPU 1217C must omit the invented interface-set and first-interface wording."
);
assert(
  persianProductCopyDraftRegistry.every(
    (entry) => entry.provenance === "ai-assisted"
  ) &&
    registeredBatch01Drafts.every(
      (entry) =>
      entry.linguisticReview.decision === "approved" &&
      entry.technicalReview.decision === "approved"
    ) &&
    registeredBatch02Drafts.every(
      (entry) =>
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved"
    ) &&
    registeredBatch03Drafts.every(
      (entry) =>
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved"
    ) &&
    registeredLinguisticApprovals === 15 &&
    registeredTechnicalApprovals === 15 &&
    registeredCurrentDualApprovals === 15 &&
    registeredBatch01ApprovalRecords.length === 5 &&
    registeredBatch01ApprovalRecords.every(
      (record) => record.roleObjectsDistinct
    ) &&
    registeredBatch02ApprovalRecords.length === 5 &&
    registeredBatch02ApprovalRecords.every(
      (record) => record.roleObjectsDistinct
    ) &&
    registeredBatch03ApprovalRecords.length === 5 &&
    registeredBatch03ApprovalRecords.every(
      (record) => record.roleObjectsDistinct
    ),
  "Batches 01 and 02 must retain ten exact current dual approvals and Batch 03 must add five."
);
assert(
  !registeredDraftActivation.valid &&
    registeredDraftActivation.overlayCount === 15 &&
    registeredDraftActivation.canonicalCount === 382 &&
    registeredDraftActivation.approvedCount === 15 &&
    registeredDraftActivation.missingIds.length === 367 &&
    !("capability" in registeredDraftActivation),
  "Combined activation must fail closed at exactly 15/382 drafts and dual approvals with 367 missing Products."
);
assert(
  PERSIAN_PRODUCT_COPY_PUBLICATION_STATE === "disabled",
  "Publication must remain disabled."
);
assert(products.length === 382, "Canonical Product count must remain 382.");
assert(s7300Count === 196, "S7-300 Product count must remain 196.");
assert(s71200Count === 186, "S7-1200 Product count must remain 186.");
assert(
  faProductSlugs.length === 382 &&
    enProductSlugs.length === 382 &&
    faProductSlugSet.size === 382 &&
    enProductSlugSet.size === 382 &&
    localizedSlugDifferences.length === 0,
  "FA and EN Product slug sets must remain complete, unique, and identical."
);
assert(
  JSON.stringify(lifecycleOmissionIds) ===
    JSON.stringify(expectedLifecycleOmissionIds),
  "Lifecycle omission IDs must match the established exact set."
);

console.log(
  JSON.stringify(
    {
      registryEntries: persianProductCopyDraftRegistry.length,
      publicationState: PERSIAN_PRODUCT_COPY_PUBLICATION_STATE,
      canonicalProducts: products.length,
      productFamilies: { s7300: s7300Count, s71200: s71200Count },
      localizedProductPaths: {
        fa: faProductSlugs.length,
        en: enProductSlugs.length,
        slugDifferences: localizedSlugDifferences.length,
      },
      lifecycleOmissions: lifecycleOmissionIds.length,
      draftRegistry: {
        valid: registeredDraftValidation.valid,
        entries: persianProductCopyDraftRegistry.length,
        batch01: {
          entries: registeredBatch01Drafts.length,
          exactBindings:
            JSON.stringify(registeredBatch01DraftBindings) ===
            JSON.stringify(expectedBatch01DraftProducts),
          approvalRecords: registeredBatch01ApprovalRecords.length,
          mutationStaleness: registeredBatch01ApprovalMutationResults,
        },
        batch02: {
          entries: registeredBatch02Drafts.length,
          exactBindings:
            JSON.stringify(registeredBatch02DraftBindings) ===
            JSON.stringify(expectedBatch02CanonicalProducts),
          linguisticApprovals: registeredBatch02Drafts.filter(
            (entry) => entry.linguisticReview.decision === "approved"
          ).length,
          technicalApprovals: registeredBatch02Drafts.filter(
            (entry) => entry.technicalReview.decision === "approved"
          ).length,
          currentDualApprovals: registeredBatch02ApprovalRecords.length,
          approvalRecords: registeredBatch02ApprovalRecords.length,
          mutationStaleness: registeredBatch02ApprovalMutationResults,
          exactDrafts: registeredBatch02DraftRecords.length,
          contentHashes: registeredBatch02DraftRecords.map((record) => ({
            productId: record.productId,
            hash: record.freshContentHash,
          })),
          publicCanonicalEnglishLtr: batch02PublicResolutionResults.every(
            (result) =>
              result.englishSource === "canonical-en" &&
              result.disabledPersianSource === "canonical-en" &&
              result.language === "en" &&
              result.direction === "ltr"
          ),
        },
        batch03: {
          entries: registeredBatch03Drafts.length,
          exactBindings:
            JSON.stringify(registeredBatch03DraftBindings) ===
            JSON.stringify(expectedBatch03CanonicalProducts),
          linguisticApprovals: registeredBatch03Drafts.filter(
            (entry) => entry.linguisticReview.decision === "approved"
          ).length,
          technicalApprovals: registeredBatch03Drafts.filter(
            (entry) => entry.technicalReview.decision === "approved"
          ).length,
          currentDualApprovals: registeredBatch03Drafts.filter(
            (entry) =>
              entry.linguisticReview.decision === "approved" &&
              entry.technicalReview.decision === "approved"
          ).length,
          approvalRecords: registeredBatch03ApprovalRecords.length,
          mutationStaleness: registeredBatch03ApprovalMutationResults,
          exactDrafts: registeredBatch03DraftRecords.length,
          contentHashes: registeredBatch03DraftRecords.map((record) => ({
            productId: record.productId,
            hash: record.freshContentHash,
          })),
          publicCanonicalEnglishLtr: batch03PublicResolutionResults.every(
            (result) =>
              result.englishSource === "canonical-en" &&
              result.disabledPersianSource === "canonical-en" &&
              result.language === "en" &&
              result.direction === "ltr"
          ),
        },
        linguisticApprovals: registeredLinguisticApprovals,
        technicalApprovals: registeredTechnicalApprovals,
        currentDualApprovals: registeredCurrentDualApprovals,
        activationValid: registeredDraftActivation.valid,
        activationCoverage: `${registeredDraftActivation.overlayCount}/${registeredDraftActivation.canonicalCount}`,
        activationApproved: registeredDraftActivation.approvedCount,
        activationMissing: registeredDraftActivation.missingIds.length,
        activationCapability:
          "capability" in registeredDraftActivation ? "present" : "absent",
        activeOverlayCoverage: `${activePersianOverlayCount}/${disabledPersianListItems.length}`,
      },
      technicalTokenOverrides: {
        entries: combinedProductionResolver.entryCount,
        tokens: combinedProductionResolver.tokenCount,
        uniqueTokens: uniqueCombinedTechnicalTokenOverrides.size,
        exactMapping: combinedProductionResolver.valid,
        batch01: {
          entries: batch01ProductionResolver.entryCount,
          tokens: batch01ProductionResolver.tokenCount,
          uniqueTokens: uniqueBatch01TechnicalTokenOverrides.size,
        },
        batch02: {
          entries: batch02ProductionResolver.entryCount,
          tokens: batch02ProductionResolver.tokenCount,
          uniqueTokens: uniqueBatch02TechnicalTokenOverrides.size,
          canonicalBindings: batch02Products.length,
          assignmentValidation: approvedBatch02OverrideResults.length,
          isolationFixtures: batch02IsolationResults.length,
          unauthorizedStandaloneFixtures:
            unauthorizedBatch02StandaloneResults.length,
        },
        batch03: {
          entries: batch03ProductionResolver.entryCount,
          tokens: batch03ProductionResolver.tokenCount,
          uniqueTokens: new Set(
            batch03ProductionResolver.entries.flatMap((entry) => entry.tokens)
          ).size,
          canonicalBindings: batch03Products.length,
          issues: batch03ProductionResolver.issues.length,
        },
        globalTokens: reviewedGlobalTechnicalTokens.length,
        detachedDeepFrozen: reviewedTechnicalTokenOverrides.every(
          (entry) => Object.isFrozen(entry) && Object.isFrozen(entry.tokens)
        ),
        isolation:
          overrideIsolationResults.every((result) => !result.valid) &&
          batch02IsolationResults.every((result) => !result.valid) &&
          unauthorizedBatch02StandaloneResults.every(
            (result) => !result.valid
          ) &&
          !unknownProductOverrideResult.valid &&
          !customCpu1217StandaloneProfinetResolver.valid,
        fidelity: productionNegativeResults.every((result) => !result.valid),
        malformedMappingRejected:
          overrideConfigurationFailureResults.length ===
            overrideConfigurationFailureFixtures.length &&
          overrideConfigurationFailureResults.every(
            (resolver) => !resolver.valid && resolver.entries.length === 0
          ),
        configurationFixtures: overrideConfigurationFailureResults.length,
        productionNegativeFixtures: productionNegativeResults.length,
        derivedTokenFixtures:
          derivedTokenResults.length === derivedTokenExpectations.length &&
          derivedTokenResults.every((result) => result.valid),
        standaloneProfinetProductIds: expectedStandaloneProfinetProductIds,
        cpu1217: {
          standaloneProfinetOverride: cpu1217StandaloneProfinetResult.valid,
          combinedInterfaceDerived: derivedTokenResults.at(-1)?.valid === true,
          exactRs422485Override: cpu1217Rs422485OverrideResult.valid,
          combinedOnlyLookalikeRejected:
            !customCpu1217StandaloneProfinetResolver.valid,
        },
        sourceMutationAttemptsRejected: protectedSnapshotMutationAttempts.every(
          (result) => !result
        ),
        resolverMutationAttemptsRejected:
          !returnedTokenMutationAttempt && !returnedEntryMutationAttempt,
        deterministicFailureDiagnostics:
          repeatedInvalidUnrelatedResolver.diagnostic ===
          overrideConfigurationFailureResults.at(-1)?.diagnostic,
        zeroAuthorizationAfterFailure:
          overrideConfigurationFailureResults.every(
            (resolver) => resolver.entries.length === 0
          ),
      },
      draftCases: Object.fromEntries(
        Object.entries(draftCases).map(([name, result]) => [
          name,
          { valid: result.valid, issueCodes: issueCodes(result) },
        ])
      ),
      activation: {
        complete: fullActivation.valid,
        snapshotDeepFrozen: Object.isFrozen(publishedBeforeMutation),
        originalMutationIsolated:
          publishedAfterMutation.shortDescription[0]?.value === approvedValue,
        mutatedOriginalRejected: !mutatedOriginalResult.valid,
        oneApprovalApprovedCount: oneApprovalResult.approvedCount,
        rejectedApprovedCount: rejectedResult.approvedCount,
        duplicateRejected: !duplicateActivationResult.valid,
        unknownIdRejected: !unknownIdActivationResult.valid,
        incompleteCoverage: `${incompleteCoverageResult.overlayCount}/${incompleteCoverageResult.canonicalCount}`,
        emptyCoverage: `${emptyActivation.overlayCount}/${emptyActivation.canonicalCount}`,
        emptyMissing: emptyActivation.missingIds.length,
      },
      resolver: {
        englishSource: resolvedEnglish.source,
        disabledPersianSource: resolvedDisabledPersian.source,
        fakeSeoExcluded: !JSON.stringify(resolvedEnglish).includes("MUST NOT"),
        deepFrozen: Object.isFrozen(resolvedEnglish),
      },
      renderer: {
        forgedCopyRejected: true,
        canonicalLanguageDirection: "en/ltr",
        technicalBdi: true,
      },
      consumerIntegration: {
        publicDtoRoundTrip: true,
        privateFieldsExcluded: true,
        detachedSegments: true,
        listItems: {
          en: englishListItems.length,
          faDisabled: disabledPersianListItems.length,
        },
        searchParityQueries: searchQueries.length,
        comparisonStorage: "ids-only",
        metadataSchemaConsistent: true,
        officialEnglishBrand: "SIEMIRAN",
        topLevelProductSanitization: {
          unknownGetterCalls: unknownTopLevelGetterCalls,
          allowedGetterCalls: allowedTopLevelGetterCalls,
          forbiddenCopyGetterCalls: omittedTopLevelGetterCalls,
          setterCalls: topLevelSetterCalls,
          prematureValueTraversalAttempts,
          lateDescriptorGetterCalls,
          requiredKeys: requiredProductKeys.length,
          optionalKeys: optionalProductKeys.length,
          missingRequiredRejected: true,
          undefinedRequiredRejected: true,
          wrongTypeRequiredRejected: true,
          optionalAbsentAccepted: true,
          optionalUndefinedAccepted: true,
          wrongTypeOptionalRejected: true,
          prototypeFirst: {
            getPrototypeOfCalls: rejectedPrototypeTrapCalls,
            ownKeysCalls: rejectedPrototypeOwnKeysCalls,
          },
          proxySnapshot: {
            getPrototypeOfCalls: proxyGetPrototypeCalls,
            ownKeysCalls: proxyOwnKeysCalls,
            getCalls: proxyGetCalls,
            descriptorsCapturedOnce: proxyExpectedKeys.every(
              (key) => proxyFactoryDescriptorCounts.get(key) === 1
            ),
            divergentSecondDescriptorIgnored: true,
          },
          trustedSnapshotDeepFrozen: Object.isFrozen(nestedTrustedProduct),
          trustedPublicReferencesIsolated: true,
          customPrototypeRejected: true,
          nullPrototypeRejected: true,
          nonEnumerableRejected: true,
          symbolKeyRejected: true,
          unknownKeyRejected: true,
          prototypeSensitiveKeysRejected: true,
        },
      },
    },
    null,
    2
  )
);
