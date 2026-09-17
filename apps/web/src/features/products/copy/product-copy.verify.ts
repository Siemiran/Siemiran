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
import {
  normalizeProductCopySearchValue,
  serializeProductCopyParagraph,
  serializeProductCopyParagraphForSearch,
  serializeResolvedProductCopy,
} from "./product-copy.serializer";
import type {
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
assert(
  englishListItems.length === 382 &&
    disabledPersianListItems.length === 382 &&
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

assert(
  persianProductCopyDraftRegistry.length === 0,
  "Registry must remain empty."
);
assert(
  PERSIAN_PRODUCT_COPY_PUBLICATION_STATE === "disabled",
  "Publication must remain disabled."
);
assert(products.length === 382, "Canonical Product count must remain 382.");
assert(s7300Count === 196, "S7-300 Product count must remain 196.");
assert(s71200Count === 186, "S7-1200 Product count must remain 186.");
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
      localizedProductPaths: { fa: products.length, en: products.length },
      lifecycleOmissions: lifecycleOmissionIds.length,
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
