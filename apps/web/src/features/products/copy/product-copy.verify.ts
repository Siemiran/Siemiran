import { Children, isValidElement, type ReactNode } from "react";

import { products } from "../data/products";
import type { Product } from "../types/product.types";
import ProductCopyText from "./ProductCopyText";
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
    ProductCopyText({
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

const renderedEnglishSeo = ProductCopyText({
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
    },
    null,
    2
  )
);
