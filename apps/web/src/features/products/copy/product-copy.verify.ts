import { Children, isValidElement, type ReactNode } from "react";

import { products } from "../data/products";
import { validateSiemensPLCProduct } from "../database/siemens/plc.validator";
import { mapSiemensS7300CommunicationProcessorToProduct } from "../database/siemens/s7-300/cp.adapter";
import { s7300CP } from "../database/siemens/s7-300/cp";
import { mapSiemensS7300FunctionModuleToProduct } from "../database/siemens/s7-300/fm.adapter";
import { s7300FM } from "../database/siemens/s7-300/fm";
import { mapSiemensS7300InterfaceModuleToProduct } from "../database/siemens/s7-300/im.adapter";
import { s7300IM } from "../database/siemens/s7-300/im";
import { mapSiemensS7300SignalModuleToProduct } from "../database/siemens/s7-300/sm.adapter";
import { s7300SM } from "../database/siemens/s7-300/sm";
import { mapSiemensS71200CPUToProduct } from "../database/siemens/s7-1200/cpu.adapter";
import { siemensS71200CPU } from "../database/siemens/s7-1200/cpu";
import { siemensS71200G2CPU } from "../database/siemens/s7-1200/g2/cpu";
import { siemensS71200G2PowerModules } from "../database/siemens/s7-1200/g2/pm";
import { mapSiemensS71200PowerModuleToProduct } from "../database/siemens/s7-1200/pm.adapter";
import { siemensS71200PowerModules } from "../database/siemens/s7-1200/pm";
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
const expectedBatch04ProductIds = [
  "siemens-s7-300-sm321-di-16-24-48vacdc-1ch00-0aa0",
  "siemens-s7-300-sm321-di-32-120vac-1el00-0aa0",
  "siemens-s7-300-sm321-di-8-120-230vac-1ff01-0aa0",
  "siemens-s7-300-sm321-di-8-120-230vac-1ff10-0aa0",
  "siemens-s7-300-sm321-di-16-120-230vac-1fh00-0aa0",
] as const satisfies readonly ProductId[];
const expectedBatch04ProductIdSet = new Set<ProductId>(
  expectedBatch04ProductIds
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
const batch04TechnicalTokenOverrides = Object.freeze(
  reviewedTechnicalTokenOverrides.filter((entry) =>
    expectedBatch04ProductIdSet.has(entry.productId)
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
  batch04TechnicalTokenOverrides.length === 0,
  "Batch 04 must add no Product-level technical-token override entries."
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

const expectedBatch04CanonicalProducts = [
  {
    productId: "siemens-s7-300-sm321-di-16-24-48vacdc-1ch00-0aa0",
    title: "SIMATIC S7-300 SM 321 16 DI 24-48 V AC/DC",
    partNumber: "6ES7321-1CH00-0AA0",
    digitalInputs: "16",
    inputVoltage: "24-48 V AC/DC",
  },
  {
    productId: "siemens-s7-300-sm321-di-32-120vac-1el00-0aa0",
    title: "SIMATIC S7-300 SM 321 32 DI 120 V AC",
    partNumber: "6ES7321-1EL00-0AA0",
    digitalInputs: "32",
    inputVoltage: "120 V AC",
  },
  {
    productId: "siemens-s7-300-sm321-di-8-120-230vac-1ff01-0aa0",
    title: "SIMATIC S7-300 SM 321 8 DI 120/230 V AC",
    partNumber: "6ES7321-1FF01-0AA0",
    digitalInputs: "8",
    inputVoltage: "120/230 V AC",
  },
  {
    productId: "siemens-s7-300-sm321-di-8-120-230vac-1ff10-0aa0",
    title: "SIMATIC S7-300 SM 321 8 DI 120/230 V AC",
    partNumber: "6ES7321-1FF10-0AA0",
    digitalInputs: "8",
    inputVoltage: "120/230 V AC",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-120-230vac-1fh00-0aa0",
    title: "SIMATIC S7-300 SM 321 16 DI 120/230 V AC",
    partNumber: "6ES7321-1FH00-0AA0",
    digitalInputs: "16",
    inputVoltage: "120/230 V AC",
  },
] as const;

const expectedBatch05CanonicalProducts = [
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-diagnostics-7bh01-0ab0",
    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC HF Diagnostics",
    partNumber: "6ES7321-7BH01-0AB0",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24-125vdc-7eh00-0ab0",
    title: "SIMATIC S7-300 SM 321 16 DI 24/125 V DC",
    partNumber: "6ES7321-7EH00-0AB0",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-namur-7th00-0ab0",
    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC NAMUR",
    partNumber: "6ES7321-7TH00-0AB0",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-sourcing-1bh50-0aa0",
    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC Sourcing",
    partNumber: "6ES7321-1BH50-0AA0",
  },
  {
    productId: "siemens-s7-300-sm321-di16-24vdc-diagnostics-7bh00-0ab0",
    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC Diagnostics",
    partNumber: "6ES7321-7BH00-0AB0",
  },
] as const;
const expectedBatch05ProductIds = expectedBatch05CanonicalProducts.map(
  (entry) => entry.productId
);
const expectedBatch05ProductIdSet = new Set<ProductId>(
  expectedBatch05ProductIds
);

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
const batch02Products = expectedBatch02CanonicalProducts.map(
  (expectedEntry) => {
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
        matchedProduct.shortDescription ===
          expectedEntry.canonicalDescription &&
        matchedProduct.description === expectedEntry.canonicalDescription &&
        matchedProduct.specifications?.["Work Memory"] ===
          expectedEntry.workMemory &&
        matchedProduct.specifications?.Interfaces ===
          expectedEntry.interfaces &&
        matchedProduct.siemensUrl === expectedEntry.siemensUrl,
      `Batch 02 canonical Product binding must remain exact: ${expectedEntry.productId}`
    );
    return matchedProduct;
  }
);
const batch02ProductsById = new Map(
  batch02Products.map((candidate) => [candidate.id, candidate])
);
const batch02ProductionResolver = createProductTechnicalTokenOverrideResolver(
  batch02TechnicalTokenOverrides,
  products
);
const batch03Products = expectedBatch03CanonicalProducts.map(
  (expectedEntry) => {
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
        matchedProduct.shortDescription ===
          expectedEntry.canonicalDescription &&
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
  }
);
const batch03ProductionResolver = createProductTechnicalTokenOverrideResolver(
  batch03TechnicalTokenOverrides,
  products
);
const batch04Products = expectedBatch04CanonicalProducts.map(
  (expectedEntry) => {
    const matchedProduct = products.find(
      (candidate) => candidate.id === expectedEntry.productId
    );
    assert(
      matchedProduct !== undefined &&
        matchedProduct.title === expectedEntry.title &&
        matchedProduct.partNumber === expectedEntry.partNumber &&
        matchedProduct.brandId === "siemens" &&
        matchedProduct.categoryId === "PLC" &&
        matchedProduct.familyId === "S7-300" &&
        matchedProduct.seriesId === "S7-300" &&
        matchedProduct.productTypeId === "Signal Module" &&
        matchedProduct.variantId === "digital-input" &&
        matchedProduct.specifications?.["Digital Inputs"] ===
          expectedEntry.digitalInputs &&
        matchedProduct.specifications?.["Input Voltage"] ===
          expectedEntry.inputVoltage,
      `Batch 04 canonical Product binding must remain exact: ${expectedEntry.productId}`
    );
    const isUnverified1Ff10 =
      matchedProduct.id === "siemens-s7-300-sm321-di-8-120-230vac-1ff10-0aa0";
    assert(
      Object.prototype.hasOwnProperty.call(matchedProduct, "lifecycle") ===
        !isUnverified1Ff10 &&
        matchedProduct.lifecycle === (isUnverified1Ff10 ? undefined : "legacy"),
      `Batch 04 canonical lifecycle must remain unchanged: ${expectedEntry.productId}`
    );
    return matchedProduct;
  }
);
const batch04ProductionResolver = createProductTechnicalTokenOverrideResolver(
  batch04TechnicalTokenOverrides,
  products
);
const batch05Products = expectedBatch05CanonicalProducts.map(
  (expectedEntry) => {
    const matches = products.filter(
      (candidate) =>
        candidate.id === expectedEntry.productId ||
        candidate.partNumber === expectedEntry.partNumber
    );
    const matchedProduct = matches[0];
    assert(
      matches.length === 1 &&
        matchedProduct !== undefined &&
        matchedProduct.id === expectedEntry.productId &&
        matchedProduct.slug === expectedEntry.partNumber.toLowerCase() &&
        matchedProduct.title === expectedEntry.title &&
        matchedProduct.partNumber === expectedEntry.partNumber &&
        matchedProduct.manufacturerPartNumber === expectedEntry.partNumber &&
        matchedProduct.brandId === "siemens" &&
        matchedProduct.categoryId === "PLC" &&
        matchedProduct.familyId === "S7-300" &&
        matchedProduct.seriesId === "S7-300" &&
        matchedProduct.productTypeId === "Signal Module" &&
        matchedProduct.variantId === "digital-input" &&
        matchedProduct.specifications?.["Digital Inputs"] === "16",
      `Batch 05 canonical Product binding must remain unique and exact: ${expectedEntry.productId}`
    );
    return matchedProduct;
  }
);
assert(
  expectedBatch05ProductIdSet.size === 5 &&
    reviewedTechnicalTokenOverrides.every(
      (entry) => !expectedBatch05ProductIdSet.has(entry.productId)
    ),
  "Batch 05 must contain five unique Products and add zero technical-token overrides."
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
  batch04ProductionResolver.valid &&
    batch04ProductionResolver.entryCount === 0 &&
    batch04ProductionResolver.tokenCount === 0 &&
    batch04ProductionResolver.issues.length === 0 &&
    JSON.stringify(batch04ProductionResolver.entries) === "[]",
  `Batch 04 production technical-token resolver must remain empty and valid: ${batch04ProductionResolver.issues
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
  const reviewedOverrides = batch02ProductionResolver.getTokensForProduct(
    fixtureProduct.id
  );
  canonicalDerivedTokens.forEach((token) => {
    assert(
      !reviewedOverrides.includes(token) &&
        deriveAllowedTechnicalTokens(fixtureProduct).has(token) &&
        validateFixture(overrideFixture(fixtureProduct, token), products).valid,
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

batch04Products.forEach((fixtureProduct) => {
  const expectedProduct = expectedBatch04CanonicalProducts.find(
    (candidate) => candidate.productId === fixtureProduct.id
  );
  assert(
    expectedProduct !== undefined,
    `Batch 04 canonical expectation must exist: ${fixtureProduct.id}`
  );
  const canonicalDerivedTokens = [
    expectedProduct.title,
    expectedProduct.digitalInputs,
    expectedProduct.inputVoltage,
  ] as const;
  canonicalDerivedTokens.forEach((token) => {
    assert(
      batch04ProductionResolver.getTokensForProduct(fixtureProduct.id)
        .length === 0 &&
        deriveAllowedTechnicalTokens(fixtureProduct).has(token) &&
        validateFixture(overrideFixture(fixtureProduct, token), products).valid,
      `Batch 04 canonical-derived token must remain valid without an override: ${fixtureProduct.id} / ${token}`
    );
  });
});

batch05Products.forEach((fixtureProduct) => {
  const allowedTokens = deriveAllowedTechnicalTokens(fixtureProduct);
  [fixtureProduct.title, fixtureProduct.partNumber, "16"].forEach((token) => {
    assert(
      combinedProductionResolver.getTokensForProduct(fixtureProduct.id)
        .length === 0 &&
        allowedTokens.has(token) &&
        validateFixture(overrideFixture(fixtureProduct, token), products).valid,
      `Batch 05 reviewed token must pass without an override: ${fixtureProduct.id} / ${token}`
    );
  });
  const unauthorizedStandaloneTokens = [
    "SIMATIC",
    "SM321",
    "SM 321",
    "DI",
    "HF",
    "Diagnostics",
    "HF Diagnostics",
    "Sourcing",
    "24VDC",
    "24V",
    "24 V",
    "24/125",
    "24",
    "125",
    "V",
    "DC",
    "V DC",
    "18 V",
    "8.2 V",
  ];
  unauthorizedStandaloneTokens.forEach((token) => {
    assert(
      !allowedTokens.has(token),
      `Batch 05 title fragments must not acquire standalone authorization: ${fixtureProduct.id} / ${token}`
    );
    assertDraftIncludesIssues(
      `Batch 05 unauthorized standalone token ${fixtureProduct.id} / ${token}`,
      overrideFixture(fixtureProduct, token),
      ["unapproved-technical-token"],
      products
    );
  });
  assert(
    allowedTokens.has("S7-300") &&
      allowedTokens.has("NAMUR") ===
        (fixtureProduct.partNumber === "6ES7321-7TH00-0AB0") &&
      allowedTokens.has("24 V DC") ===
        (fixtureProduct.partNumber !== "6ES7321-7EH00-0AB0") &&
      allowedTokens.has("24/125 V DC") ===
        (fixtureProduct.partNumber === "6ES7321-7EH00-0AB0"),
    `Batch 05 field-derived fragments must retain their exact boundaries outside the draft scope: ${fixtureProduct.id}`
  );
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
const sm321Id = "siemens-s7-300-sm321-di-8-120-230vac-1ff10-0aa0";
const sm321Source = s7300SM.find((item) => item.id === sm321Id);
assert(sm321Source !== undefined, "SM321 1FF10 source record must exist.");
assert(
  JSON.stringify(sm321Source) ===
    JSON.stringify({
      id: sm321Id,
      mlfb: "6ES7321-1FF10-0AA0",
      brandId: "siemens",
      categoryId: "PLC",
      familyId: "S7-300",
      seriesId: "S7-300",
      productTypeId: "Signal Module",
      variantId: "digital-input",
      title: "SIMATIC S7-300 SM 321 8 DI 120/230 V AC",
      description:
        "SIMATIC S7-300 digital input SM 321, isolated, 8 digital inputs, 120/230 V AC, 1 x 40-pole, with single rooting/channel.",
      lifecycle: "unverified",
      specifications: {
        digitalInputs: 8,
        inputVoltage: "120/230 V AC",
        terminalConnection: "1 x 40-pole",
        interfaces: ["Backplane bus"],
      },
      source:
        "https://mall.industry.siemens.com/mall/en/se/Catalog/Product/6ES7321-1FF10-0AA0",
    }),
  "SM321 1FF10 must preserve its exact source data except for the approved unverified lifecycle."
);
assert(
  s7300SM.length === 66 &&
    s7300SM.every((item) => validateSiemensPLCProduct(item).valid),
  "All 66 S7-300 Signal Module source records must validate."
);
const mappedSignalModules = s7300SM.map(mapSiemensS7300SignalModuleToProduct);
assert(
  mappedSignalModules.every(
    (mapped) =>
      JSON.stringify(mapped) ===
      JSON.stringify(products.find((item) => item.id === mapped.id))
  ),
  "All 66 Signal Module records must match their canonical Products."
);
const sm321Product = products.find((item) => item.id === sm321Id);
assert(sm321Product !== undefined, "SM321 1FF10 canonical Product must exist.");
const sm321PriorProduct = mapSiemensS7300SignalModuleToProduct({
  ...sm321Source,
  lifecycle: "phase-out",
});
const { lifecycle: sm321PriorLifecycle, ...sm321PriorWithoutLifecycle } =
  sm321PriorProduct;
assert(
  sm321PriorLifecycle === "legacy" &&
    !("lifecycle" in sm321Product) &&
    JSON.stringify(sm321Product) === JSON.stringify(sm321PriorWithoutLifecycle),
  "SM321 1FF10 canonical Product must differ from its prior mapping only by removing legacy lifecycle."
);
assert(
  lifecycleOmissionIds.length === 11 &&
    expectedLifecycleOmissionIds.length === 11 &&
    expectedLifecycleOmissionIds.includes(sm321Id),
  "Exactly eleven expected Products, including SM321 1FF10, must omit lifecycle."
);
const restoredSm321LifecycleProducts = products.map((item) =>
  item.id === sm321Id ? sm321PriorProduct : item
);
const missingExpectedLifecycleOmission =
  validatePersianProductCopyForActivation(
    products.map(approvedFixture),
    restoredSm321LifecycleProducts
  );
assertIssues(
  missingExpectedLifecycleOmission,
  ["lifecycle-omission-set"],
  "Missing expected SM321 lifecycle omission"
);
const additionalLifecycleOmissionProduct = products.find(
  (item) => item.id !== sm321Id && item.lifecycle !== undefined
);
assert(
  additionalLifecycleOmissionProduct !== undefined,
  "An additional lifecycle omission fixture Product must exist."
);
const { lifecycle: removedAdditionalLifecycle, ...additionalWithoutLifecycle } =
  additionalLifecycleOmissionProduct;
void removedAdditionalLifecycle;
const additionalLifecycleOmission = validatePersianProductCopyForActivation(
  products.map(approvedFixture),
  products.map((item) =>
    item.id === additionalLifecycleOmissionProduct.id
      ? additionalWithoutLifecycle
      : item
  )
);
assertIssues(
  additionalLifecycleOmission,
  ["lifecycle-omission-set"],
  "Unexpected additional lifecycle omission"
);
for (const locale of ["fa", "en"] as const) {
  const currentCopy = resolveProductCopy(sm321Product, locale);
  const priorCopy = resolveProductCopy(sm321PriorProduct, locale);
  const publicItem = createProductListItemViewModel(sm321Product, locale);
  assert(
    !("lifecycle" in publicItem.product) &&
      publicItem.copy.language === "en" &&
      publicItem.copy.direction === "ltr" &&
      !JSON.stringify(publicItem).includes("unverified"),
    `SM321 1FF10 ${locale} public DTO must omit lifecycle and unverified text while retaining canonical English copy.`
  );
  assert(
    JSON.stringify(serializeResolvedProductCopy(currentCopy)) ===
      JSON.stringify(serializeResolvedProductCopy(priorCopy)) &&
      JSON.stringify(createProductMetadata(sm321Product, locale)) ===
        JSON.stringify(createProductMetadata(sm321PriorProduct, locale)) &&
      JSON.stringify(createProductSchema(sm321Product, currentCopy, locale)) ===
        JSON.stringify(
          createProductSchema(sm321PriorProduct, priorCopy, locale)
        ) &&
      JSON.stringify([...deriveAllowedTechnicalTokens(sm321Product)].sort()) ===
        JSON.stringify(
          [...deriveAllowedTechnicalTokens(sm321PriorProduct)].sort()
        ),
    `SM321 1FF10 ${locale} copy, metadata, Product JSON-LD, and derived technical tokens must remain unchanged.`
  );
}
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
    technicalTokens: ["SIMATIC S7-300 SM 321 16 DI 24 V DC", "16", "24 V DC"],
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
    technicalTokens: ["SIMATIC S7-300 SM 321 32 DI 24 V DC", "32", "24 V DC"],
  },
  {
    productId: "siemens-s7-300-sm321-di-64-24vdc-1bp00-0aa0",
    rendered:
      "مدل SIMATIC S7-300 SM 321 64 DI 24 V DC، یک ماژول ورودی دیجیتال با 64 ورودی و ولتاژ ورودی 24 V DC است.",
    technicalTokens: ["SIMATIC S7-300 SM 321 64 DI 24 V DC", "64", "24 V DC"],
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
const expectedBatch04Drafts = [
  {
    productId: "siemens-s7-300-sm321-di-16-24-48vacdc-1ch00-0aa0",
    rendered:
      "مدل SIMATIC S7-300 SM 321 16 DI 24-48 V AC/DC، ماژول ورودی دیجیتال با 16 ورودی است.",
    technicalTokens: ["SIMATIC S7-300 SM 321 16 DI 24-48 V AC/DC", "16"],
  },
  {
    productId: "siemens-s7-300-sm321-di-32-120vac-1el00-0aa0",
    rendered:
      "مدل SIMATIC S7-300 SM 321 32 DI 120 V AC، ماژول ورودی دیجیتال با 32 ورودی است. ولتاژ نامی ورودی آن 120 V AC است.",
    technicalTokens: ["SIMATIC S7-300 SM 321 32 DI 120 V AC", "32", "120 V AC"],
  },
  {
    productId: "siemens-s7-300-sm321-di-8-120-230vac-1ff01-0aa0",
    rendered:
      "مدل SIMATIC S7-300 SM 321 8 DI 120/230 V AC، ماژول ورودی دیجیتال با 8 ورودی است. ولتاژهای نامی ورودی آن 120/230 V AC هستند.",
    technicalTokens: [
      "SIMATIC S7-300 SM 321 8 DI 120/230 V AC",
      "8",
      "120/230 V AC",
    ],
  },
  {
    productId: "siemens-s7-300-sm321-di-8-120-230vac-1ff10-0aa0",
    rendered:
      "مدل SIMATIC S7-300 SM 321 8 DI 120/230 V AC، ماژول ورودی دیجیتال با 8 ورودی است. ولتاژهای نامی ورودی آن 120/230 V AC هستند.",
    technicalTokens: [
      "SIMATIC S7-300 SM 321 8 DI 120/230 V AC",
      "8",
      "120/230 V AC",
    ],
  },
  {
    productId: "siemens-s7-300-sm321-di-16-120-230vac-1fh00-0aa0",
    rendered:
      "مدل SIMATIC S7-300 SM 321 16 DI 120/230 V AC، ماژول ورودی دیجیتال با 16 ورودی است. ولتاژهای نامی ورودی آن 120/230 V AC هستند.",
    technicalTokens: [
      "SIMATIC S7-300 SM 321 16 DI 120/230 V AC",
      "16",
      "120/230 V AC",
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
const BATCH_04_LINGUISTIC_REVIEWED_AT = "2026-09-27T19:51:43Z";
const BATCH_04_TECHNICAL_REVIEWED_AT = "2026-09-27T19:51:44Z";
const BATCH_04_IDENTITY_LINGUISTIC_NOTE =
  "Reviewed concise Persian identity and input-count wording, grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy.";
const BATCH_04_SIMPLE_LINGUISTIC_NOTE =
  "Reviewed Persian wording, grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy.";
const BATCH_04_RATED_VALUE_LINGUISTIC_NOTE =
  "Reviewed Persian rated-value wording, grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy.";
const expectedBatch04ReviewMetadata = [
  {
    productId: "siemens-s7-300-sm321-di-16-24-48vacdc-1ch00-0aa0",
    reviewedContentHash:
      "sha256:d7877cc55cc166b4cff3e96961b8c05e88a06cc38f1567ffafe558484175d632",
    evidenceRef:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1CH00-0AA0",
    linguisticNote: BATCH_04_IDENTITY_LINGUISTIC_NOTE,
    technicalNote:
      "Reviewed exact 1CH00 identity, canonical title, and 16 inputs using Siemens-indexed exact-product datasheet text and available Siemens product HTML. Direct PDF access returned HTTP 403 during review. The removed separate voltage sentence and lifecycle were not approved.",
  },
  {
    productId: "siemens-s7-300-sm321-di-32-120vac-1el00-0aa0",
    reviewedContentHash:
      "sha256:ac298cff5d66e725944026417f976f0237650bc356ad50cce678f57d0e42a4e5",
    evidenceRef:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1EL00-0AA0",
    linguisticNote: BATCH_04_SIMPLE_LINGUISTIC_NOTE,
    technicalNote:
      "Reviewed exact 1EL00 identity, 32 inputs, and rated 120 V AC using Siemens-indexed exact-product datasheet text and available Siemens product HTML. Direct PDF access returned HTTP 403 during review. No lifecycle or other feature claim was approved.",
  },
  {
    productId: "siemens-s7-300-sm321-di-8-120-230vac-1ff01-0aa0",
    reviewedContentHash:
      "sha256:42084ab3fc1652eac520c5bbabd0c034f91f3398dceb97525737754190534765",
    evidenceRef:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1FF01-0AA0",
    linguisticNote: BATCH_04_RATED_VALUE_LINGUISTIC_NOTE,
    technicalNote:
      "Reviewed exact 1FF01 identity, 8 inputs, and rated 120/230 V AC using Siemens-indexed exact-product datasheet text and available Siemens product HTML; distinguished 1FF10 by Product ID. Direct PDF access returned HTTP 403 during review. No lifecycle or other feature claim was approved.",
  },
  {
    productId: "siemens-s7-300-sm321-di-8-120-230vac-1ff10-0aa0",
    reviewedContentHash:
      "sha256:71defd1d6395a23a116bf19da498e4d9f0c40335b1a520e1294177208830f3f9",
    evidenceRef:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1FF10-0AA0",
    linguisticNote: BATCH_04_RATED_VALUE_LINGUISTIC_NOTE,
    technicalNote:
      "Reviewed exact 1FF10 identity, 8 inputs, and rated 120/230 V AC using Siemens-indexed exact-product datasheet text and available Siemens product HTML; distinguished 1FF01 by Product ID. Direct PDF access returned HTTP 403 during review. Current lifecycle remains unknown and was neither claimed nor approved.",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-120-230vac-1fh00-0aa0",
    reviewedContentHash:
      "sha256:659f93e6818797378f02e46b89a8561f2722804b28b874a42801a442b1214a74",
    evidenceRef:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1FH00-0AA0",
    linguisticNote: BATCH_04_RATED_VALUE_LINGUISTIC_NOTE,
    technicalNote:
      "Reviewed exact 1FH00 identity, 16 inputs, and rated 120/230 V AC using Siemens-indexed exact-product datasheet text and available Siemens product HTML. Direct PDF access returned HTTP 403 during review. No lifecycle or other feature claim was approved.",
  },
] as const;
const BATCH_05_LINGUISTIC_REVIEWED_AT = "2026-10-01T17:45:15Z";
const BATCH_05_TECHNICAL_REVIEWED_AT = "2026-10-01T17:45:26Z";
const expectedBatch05ReviewMetadata = [
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-diagnostics-7bh01-0ab0",
    reviewedContentHash:
      "sha256:317aa317e2a9b3cab8b8f032cb3b307097c6a4452ff51a9ee986361235f95de7",
    evidenceRef:
      "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
    linguisticNote:
      "Reviewed 6ES7321-7BH01-0AB0 Persian identity and sixteen-input wording, spacing, Persian comma and final period, NFC and Persian yeh/kaf; the complete Latin title and numeric 16 remain separate typed LTR segments.",
    technicalNote:
      "Reviewed exact 6ES7321-7BH01-0AB0: Module Data section 3.11, printed pp73-74. HF operation remains conditional; retaining the title does not approve unconditional HF behavior. Previously reviewed parsed cache-PDF text; visual page verification unavailable. Approves only identity, digital-input type and 16 inputs; the full canonical title is an identifier. No standalone voltage, lifecycle, availability, compatibility, operating-feature or unrelated specification is approved.",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24-125vdc-7eh00-0ab0",
    reviewedContentHash:
      "sha256:b2fff655b1ac061b629dc798892a262f4e14cf5bc8bb46cf7afa26b95113eb08",
    evidenceRef:
      "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
    linguisticNote:
      "Reviewed 6ES7321-7EH00-0AB0 Persian identity and sixteen-input wording, spacing, Persian comma and final period, NFC and Persian yeh/kaf; the complete Latin title and numeric 16 remain separate typed LTR segments.",
    technicalNote:
      "Reviewed exact 6ES7321-7EH00-0AB0: Module Data section 3.12, printed pp84-85. Previously reviewed parsed cache-PDF text; visual page verification unavailable. Approves only identity, digital-input type and 16 inputs; the full canonical title is an identifier. No standalone voltage, lifecycle, availability, compatibility, operating-feature or unrelated specification is approved.",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-namur-7th00-0ab0",
    reviewedContentHash:
      "sha256:e5fd7c58fefaf24781f555ae6048689d8ac47dc50d5299c5f543bfe5f8d8d49b",
    evidenceRef:
      "https://cache.industry.siemens.com/dl/files/812/7215812/att_81952/v1/Signalbaugruppen_EN_en-US.pdf; https://cache.industry.siemens.com/dl/files/726/23060726/att_66629/v1/23060726_s7-300_kabel_und_zubehoer_zuordnung_stecker_baugruppe_d.pdf",
    linguisticNote:
      "Reviewed 6ES7321-7TH00-0AB0 Persian identity and sixteen-input wording, spacing, Persian comma and final period, NFC and Persian yeh/kaf; the complete Latin title and numeric 16 remain separate typed LTR segments.",
    technicalNote:
      "Reviewed exact 6ES7321-7TH00-0AB0: Process Automation manual section 6.2.1, printed 6-2 and 6-4 to 6-5; FAQ table 2, p6. inputVoltage semantics remain unresolved and unverified. Previously reviewed parsed cache-PDF text; visual page verification unavailable. Approves only identity, digital-input type and 16 inputs; the full canonical title is an identifier. No standalone voltage, lifecycle, availability, compatibility, operating-feature or unrelated specification is approved.",
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-sourcing-1bh50-0aa0",
    reviewedContentHash:
      "sha256:4b3c1b2f32fbc23fcfa9de3914a0dc8af215b6286ee43c8383861b906a87644c",
    evidenceRef:
      "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
    linguisticNote:
      "Reviewed 6ES7321-1BH50-0AA0 Persian identity and sixteen-input wording, spacing, Persian comma and final period, NFC and Persian yeh/kaf; the complete Latin title and numeric 16 remain separate typed LTR segments.",
    technicalNote:
      "Reviewed exact 6ES7321-1BH50-0AA0: Module Data section 3.13, printed p92. Previously reviewed parsed cache-PDF text; visual page verification unavailable. Approves only identity, digital-input type and 16 inputs; the full canonical title is an identifier. No standalone voltage, lifecycle, availability, compatibility, operating-feature or unrelated specification is approved.",
  },
  {
    productId: "siemens-s7-300-sm321-di16-24vdc-diagnostics-7bh00-0ab0",
    reviewedContentHash:
      "sha256:b9d498f47a5b5ed2a6f5bb3a32ef57fefe765211d67b9dc852c0520e15fc1e1f",
    evidenceRef:
      "https://cache.industry.siemens.com/dl/files/047/88868047/att_68363/v1/S7pcshwb.pdf",
    linguisticNote:
      "Reviewed 6ES7321-7BH00-0AB0 Persian identity and sixteen-input wording, spacing, Persian comma and final period, NFC and Persian yeh/kaf; the complete Latin title and numeric 16 remain separate typed LTR segments.",
    technicalNote:
      "Reviewed exact 6ES7321-7BH00-0AB0: Exact PCS 7 S7-300 SM-DI row, printed Page 24 of 41. The existing canonical source link points to a CPU410 manual; copy evidence uses this exact PCS 7 row, and source-link reconciliation remains separate. Previously reviewed parsed cache-PDF text; visual page verification unavailable. Approves only identity, digital-input type and 16 inputs; the full canonical title is an identifier. No standalone voltage, lifecycle, availability, compatibility, operating-feature or unrelated specification is approved.",
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
const expectedBatch04DraftProductIds = expectedBatch04Drafts.map(
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
const expectedBatch04DraftProductIdSet = new Set<ProductId>(
  expectedBatch04DraftProductIds
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
const registeredBatch04Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch04DraftProductIdSet.has(entry.productId)
);
const registeredBatch05Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch05ProductIdSet.has(entry.productId)
);
const registeredBatch01DraftBindings = registeredBatch01Drafts.map((entry) => {
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
});
const registeredBatch02DraftBindings = registeredBatch02Drafts.map((entry) => {
  const product = products.find(
    (candidate) => candidate.id === entry.productId
  );
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
  const product = products.find(
    (candidate) => candidate.id === entry.productId
  );
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
const registeredBatch04DraftBindings = registeredBatch04Drafts.map((entry) => {
  const product = products.find(
    (candidate) => candidate.id === entry.productId
  );
  assert(
    product !== undefined,
    `Batch 04 draft Product must remain canonical: ${entry.productId}`
  );
  return {
    productId: product.id,
    title: product.title,
    partNumber: product.partNumber,
    digitalInputs: product.specifications?.["Digital Inputs"],
    inputVoltage: product.specifications?.["Input Voltage"],
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
const isPendingReview = (review: ProductCopyReview): boolean =>
  review.decision === "pending";
const registeredLinguisticApprovals = persianProductCopyDraftRegistry.filter(
  (entry) => isApprovedReview(entry.linguisticReview)
).length;
const registeredTechnicalApprovals = persianProductCopyDraftRegistry.filter(
  (entry) => isApprovedReview(entry.technicalReview)
).length;
const registeredLinguisticPending = persianProductCopyDraftRegistry.filter(
  (entry) => isPendingReview(entry.linguisticReview)
).length;
const registeredTechnicalPending = persianProductCopyDraftRegistry.filter(
  (entry) => isPendingReview(entry.technicalReview)
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
const registeredBatch04ApprovalRecords = registeredBatch04Drafts.map(
  (entry) => {
    const expected = expectedBatch04ReviewMetadata.find(
      (candidate) => candidate.productId === entry.productId
    );
    assert(
      expected !== undefined,
      `Batch 04 approval metadata must remain scoped to ${entry.productId}.`
    );

    const freshContentHash = createProductCopyContentHash(entry);
    const expectedLinguisticReview = {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: BATCH_04_LINGUISTIC_REVIEWED_AT,
      reviewedContentHash: expected.reviewedContentHash,
      evidenceRef: expected.evidenceRef,
      note: expected.linguisticNote,
    } as const;
    const expectedTechnicalReview = {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: BATCH_04_TECHNICAL_REVIEWED_AT,
      reviewedContentHash: expected.reviewedContentHash,
      evidenceRef: expected.evidenceRef,
      note: expected.technicalNote,
    } as const;

    assert(
      JSON.stringify(entry.linguisticReview) ===
        JSON.stringify(expectedLinguisticReview) &&
        JSON.stringify(entry.technicalReview) ===
          JSON.stringify(expectedTechnicalReview),
      `Batch 04 role approvals and evidence must be exact for ${entry.productId}.`
    );
    assert(
      !Object.is(entry.linguisticReview, entry.technicalReview) &&
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedAt < entry.technicalReview.reviewedAt,
      `Batch 04 role approvals must be distinct and ordered for ${entry.productId}.`
    );
    assert(
      freshContentHash === expected.reviewedContentHash &&
        entry.linguisticReview.reviewedContentHash === freshContentHash &&
        entry.technicalReview.reviewedContentHash === freshContentHash,
      `Batch 04 approvals must bind the fresh production hash for ${entry.productId}.`
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
const registeredBatch05ApprovalRecords = registeredBatch05Drafts.map(
  (entry) => {
    const expected = expectedBatch05ReviewMetadata.find(
      (candidate) => candidate.productId === entry.productId
    );
    assert(
      expected !== undefined,
      `Batch 05 approval metadata must remain scoped to ${entry.productId}.`
    );

    const freshContentHash = createProductCopyContentHash(entry);
    const expectedLinguisticReview = {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: BATCH_05_LINGUISTIC_REVIEWED_AT,
      reviewedContentHash: expected.reviewedContentHash,
      evidenceRef: expected.evidenceRef,
      note: expected.linguisticNote,
    } as const;
    const expectedTechnicalReview = {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: BATCH_05_TECHNICAL_REVIEWED_AT,
      reviewedContentHash: expected.reviewedContentHash,
      evidenceRef: expected.evidenceRef,
      note: expected.technicalNote,
    } as const;

    assert(
      JSON.stringify(entry.linguisticReview) ===
        JSON.stringify(expectedLinguisticReview) &&
        JSON.stringify(entry.technicalReview) ===
          JSON.stringify(expectedTechnicalReview),
      `Batch 05 role approvals and evidence must be exact for ${entry.productId}.`
    );
    assert(
      !Object.is(entry.linguisticReview, entry.technicalReview) &&
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedAt < entry.technicalReview.reviewedAt,
      `Batch 05 role approvals must be distinct and ordered for ${entry.productId}.`
    );
    assert(
      freshContentHash === expected.reviewedContentHash &&
        entry.linguisticReview.reviewedContentHash === freshContentHash &&
        entry.technicalReview.reviewedContentHash === freshContentHash,
      `Batch 05 approvals must bind the unchanged reviewed production hash for ${entry.productId}.`
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
const registeredBatch01ApprovalMutationResults = registeredBatch01Drafts.map(
  (entry) => {
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
  }
);
const registeredBatch02ApprovalMutationResults = registeredBatch02Drafts.map(
  (entry) => {
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
  }
);
const registeredBatch03ApprovalMutationResults = registeredBatch03Drafts.map(
  (entry) => {
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
  }
);
const registeredBatch04ApprovalMutationResults = registeredBatch04Drafts.map(
  (entry) => {
    const copyMutation = cloneMutableOverlay(entry);
    const finalShortSegment = copyMutation.shortDescription.at(-1);
    assert(
      finalShortSegment !== undefined,
      `Batch 04 copy mutation requires a final segment for ${entry.productId}.`
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
      `Batch 04 kind mutation requires a first segment for ${entry.productId}.`
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
      `Batch 04 copy and segment-kind mutations must stale both approvals for ${entry.productId}.`
    );

    return {
      productId: entry.productId,
      copyStaleApprovals,
      kindStaleApprovals,
    };
  }
);
const registeredBatch05ApprovalMutationResults = registeredBatch05Drafts.map(
  (entry) => {
    const copyMutation = cloneMutableOverlay(entry);
    const finalShortSegment = copyMutation.shortDescription.at(-1);
    assert(
      finalShortSegment !== undefined,
      `Batch 05 copy mutation requires a final segment for ${entry.productId}.`
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
      `Batch 05 kind mutation requires a first segment for ${entry.productId}.`
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
      `Batch 05 copy and segment-kind mutations must stale both approvals for ${entry.productId}.`
    );

    return {
      productId: entry.productId,
      copyStaleApprovals,
      kindStaleApprovals,
    };
  }
);
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
  assert(
    entry !== undefined,
    `Batch 02 draft must exist: ${expected.productId}`
  );
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
  assert(
    entry !== undefined,
    `Batch 03 draft must exist: ${expected.productId}`
  );
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
          !renderedShortDescription
            .toLocaleLowerCase("en")
            .includes(claim.toLocaleLowerCase("en"))
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
const registeredBatch04DraftRecords = expectedBatch04Drafts.map((expected) => {
  const entry = registeredBatch04Drafts.find(
    (candidate) => candidate.productId === expected.productId
  );
  const product = batch04Products.find(
    (candidate) => candidate.id === expected.productId
  );
  assert(
    entry !== undefined && product !== undefined,
    `Batch 04 draft and canonical Product must exist: ${expected.productId}`
  );
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
    `Batch 04 short and long drafts and technical segmentation must be exact: ${expected.productId}`
  );
  assert(
    entry.provenance === "ai-assisted" &&
      entry.linguisticReview.decision === "approved" &&
      entry.technicalReview.decision === "approved" &&
      !Object.is(entry.linguisticReview, entry.technicalReview),
    `Batch 04 must retain ai-assisted provenance and distinct approved review roles: ${expected.productId}`
  );
  assert(
    technicalTokens.every(
      (token) =>
        deriveAllowedTechnicalTokens(product).has(token) &&
        !batch04ProductionResolver
          .getTokensForProduct(product.id)
          .includes(token)
    ) &&
      entry.shortDescription.every(
        (segment) =>
          segment.kind === "technical" ||
          !/[A-Za-z0-9\u064A\u0643]/u.test(segment.value)
      ) &&
      renderedShortDescription === renderedShortDescription.normalize("NFC"),
    `Batch 04 technical tokens must be canonical-derived and prose must remain Persian: ${expected.productId}`
  );
  return {
    productId: entry.productId,
    renderedShortDescription,
    technicalTokens,
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
const batch04PublicResolutionResults = batch04Products.map((fixtureProduct) => {
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
    `Batch 04 public FA/EN copy must remain canonical English/LTR: ${fixtureProduct.id}`
  );
  return {
    productId: fixtureProduct.id,
    englishSource: english.source,
    disabledPersianSource: disabledPersian.source,
    language: disabledPersianPublic.language,
    direction: disabledPersianPublic.direction,
  };
});

const registeredBatch05DraftRecords = registeredBatch05Drafts.map((entry) => {
  const product = batch05Products.find(
    (candidate) => candidate.id === entry.productId
  );
  assert(
    product !== undefined,
    `Batch 05 draft must be canonical: ${entry.productId}`
  );
  const technicalTokens = entry.shortDescription
    .filter((segment) => segment.kind === "technical")
    .map((segment) => segment.value);
  const renderedShortDescription = serializeProductCopyParagraph(
    entry.shortDescription
  );
  assert(
    entry.provenance === "ai-assisted" &&
      entry.linguisticReview.decision === "approved" &&
      entry.technicalReview.decision === "approved" &&
      !Object.is(entry.linguisticReview, entry.technicalReview) &&
      entry.description.length === 1 &&
      JSON.stringify(entry.description[0]) ===
        JSON.stringify(entry.shortDescription) &&
      JSON.stringify(entry.shortDescription.map((segment) => segment.kind)) ===
        JSON.stringify(["text", "technical", "text", "technical", "text"]) &&
      JSON.stringify(technicalTokens) === JSON.stringify([product.title, "16"]),
    `Batch 05 short and long drafts must retain only the complete title and 16 with distinct approved review roles: ${entry.productId}`
  );
  assert(
    technicalTokens.every((token) =>
      deriveAllowedTechnicalTokens(product).has(token)
    ) &&
      entry.shortDescription.every(
        (segment) =>
          segment.kind === "technical" ||
          !/[A-Za-z0-9\u064A\u0643]/u.test(segment.value)
      ) &&
      renderedShortDescription === renderedShortDescription.normalize("NFC") &&
      renderedShortDescription.includes("،"),
    `Batch 05 prose must retain Persian letters, NFC, and comma with canonical-derived technical tokens: ${entry.productId}`
  );
  const english = resolveProductCopy(product, "en");
  const disabledPersian = resolveProductCopy(product, "fa");
  const englishPublic = createPublicProductCardCopyDTO(english);
  const disabledPersianPublic = createPublicProductCardCopyDTO(disabledPersian);
  assert(
    english.source === "canonical-en" &&
      disabledPersian.source === "canonical-en" &&
      serializeProductCopyParagraph(english.shortDescription) ===
        product.shortDescription &&
      serializeProductCopyParagraph(disabledPersian.shortDescription) ===
        product.shortDescription &&
      englishPublic.language === "en" &&
      englishPublic.direction === "ltr" &&
      disabledPersianPublic.language === "en" &&
      disabledPersianPublic.direction === "ltr",
    `Batch 05 public FA/EN copy must remain canonical English/LTR: ${entry.productId}`
  );
  return {
    productId: entry.productId,
    renderedShortDescription,
    technicalTokens,
    segmentKinds: entry.shortDescription.map((segment) => segment.kind),
    freshContentHash: createProductCopyContentHash(entry),
    publicCanonicalEnglishLtr: true,
  };
});

const BATCH_06_DRAFT_COMMIT = "02d2ea2b17db358a617024b5e05e3cfdb084f113";
const BATCH_06_LINGUISTIC_REVIEWED_AT = "2026-11-13T10:10:19Z";
const BATCH_06_TECHNICAL_REVIEWED_AT = "2026-11-13T10:10:47Z";
const expectedBatch06CanonicalProducts = [
  {
    productId: "siemens-s7-300-sm321-di-4-24vdc-namur-7rd00-0ab0",
    partNumber: "6ES7321-7RD00-0AB0",
    title: "SIMATIC S7-300 SM 321 4 DI 24 V DC NAMUR",
    direction: "DI",
    count: "4",
    reviewedContentHash:
      "sha256:a87a378c221bd7fae8d5eac58fb451c2e100232bfb8358cc2f366c46bc6e7d49",
    previouslyReviewedSiemensEvidence:
      "A5E00348721-03, English PDF pp4-6; https://cache.industry.siemens.com/dl/files/861/30332861/att_108633/v1/sm321_di_namur_product_information.pdf",
  },
  {
    productId: "siemens-s7-300-sm322-do-8-24vdc-2a-1bf01-0aa0",
    partNumber: "6ES7322-1BF01-0AA0",
    title: "SIMATIC S7-300 SM 322 8 DO 24 V DC",
    direction: "DO",
    count: "8",
    reviewedContentHash:
      "sha256:06946f86824902d2e68cc8d91cd69836c998e8bfc059275d8b768ebb5da6edc9",
    previouslyReviewedSiemensEvidence:
      "Module Data 05/2022 A5E00105505-AK, section 3.28 pp148-149; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
  },
  {
    productId: "siemens-s7-300-sm322-do-16-24vdc-0-5a-1bh01-0aa0",
    partNumber: "6ES7322-1BH01-0AA0",
    title: "SIMATIC S7-300 SM 322 16 DO 24 V DC",
    direction: "DO",
    count: "16",
    reviewedContentHash:
      "sha256:083edd9853d43518ecc020878a3756a79dd6dbbe63866e564da4ca0310c45110",
    previouslyReviewedSiemensEvidence:
      "Module Data 05/2022 A5E00105505-AK, section 3.23 pp125-127; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
  },
  {
    productId: "siemens-s7-300-sm322-do-16-24vdc-high-speed-1bh10-0aa0",
    partNumber: "6ES7322-1BH10-0AA0",
    title: "SIMATIC S7-300 SM 322 High Speed 16 DO 24 V DC",
    direction: "DO",
    count: "16",
    reviewedContentHash:
      "sha256:13fa669b8a3ff684445ebc642a032025ee69b8435c539c21fb043967c0f0b7ed",
    previouslyReviewedSiemensEvidence:
      "Module Data 05/2022 A5E00105505-AK, section 3.25 pp137-138; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
  },
  {
    productId: "siemens-s7-300-sm322-do-32-24vdc-0-5a-1bl00-0aa0",
    partNumber: "6ES7322-1BL00-0AA0",
    title: "SIMATIC S7-300 SM 322 32 DO 24 V DC",
    direction: "DO",
    count: "32",
    reviewedContentHash:
      "sha256:f2a0464dc66280cf7906f4f1b25f713c830bb588d0a418b4a350391d5384a4dc",
    previouslyReviewedSiemensEvidence:
      "Module Data 05/2022 A5E00105505-AK, section 3.21 pp119-121; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
  },
] as const;
const expectedBatch06ProductIds = expectedBatch06CanonicalProducts.map(
  (entry) => entry.productId
);
const expectedBatch06ProductIdSet = new Set<ProductId>(
  expectedBatch06ProductIds
);
const registeredBatch06Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch06ProductIdSet.has(entry.productId)
);
assert(
  expectedBatch06ProductIdSet.size === 5 &&
    JSON.stringify(registeredBatch06Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch06ProductIds) &&
    new Set(
      registeredBatch06Drafts.flatMap((entry) => [
        entry.linguisticReview,
        entry.technicalReview,
      ])
    ).size === 10,
  "Batch 06 must retain five exact ordered bindings and ten distinct approved role objects."
);
const registeredBatch06DraftRecords = registeredBatch06Drafts.map(
  (entry, index) => {
    const expected = expectedBatch06CanonicalProducts[index];
    assert(expected !== undefined, "Batch 06 binding must exist.");
    const matches = products.filter(
      (product) =>
        product.id === expected.productId ||
        product.partNumber === expected.partNumber
    );
    const product = matches[0];
    const specification =
      expected.direction === "DI" ? "Digital Inputs" : "Digital Outputs";
    const count = product?.specifications?.[specification];
    assert(
      matches.length === 1 &&
        product !== undefined &&
        product.id === entry.productId &&
        product.id === expected.productId &&
        product.partNumber === expected.partNumber &&
        product.manufacturerPartNumber === expected.partNumber &&
        product.title === expected.title &&
        product.variantId ===
          (expected.direction === "DI" ? "digital-input" : "digital-output") &&
        count === expected.count,
      `Batch 06 production binding, direction and count must be exact: ${entry.productId}`
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 06 reviewed draft hash must remain unchanged: ${entry.productId}`
    );
    for (const [review, reviewedAt, evidenceRef] of [
      [
        entry.linguisticReview,
        BATCH_06_LINGUISTIC_REVIEWED_AT,
        `PM linguistic approval in this conversation; draft commit ${BATCH_06_DRAFT_COMMIT}; Product ${entry.productId}; MLFB ${expected.partNumber}.`,
      ],
      [
        entry.technicalReview,
        BATCH_06_TECHNICAL_REVIEWED_AT,
        `PM technical approval in this conversation; draft commit ${BATCH_06_DRAFT_COMMIT}; Product ${entry.productId}; MLFB ${expected.partNumber}; previously reviewed Siemens ${expected.previouslyReviewedSiemensEvidence}.`,
      ],
    ] as const) {
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === reviewedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef === evidenceRef &&
          review.note?.startsWith(`${expected.partNumber}:`) === true,
        `Batch 06 role approval must match its observed timestamp, PM evidence and current hash: ${entry.productId}`
      );
    }
    const noun = expected.direction === "DI" ? "ورودی" : "خروجی";
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: product.title },
      { kind: "text", value: `، ماژول ${noun} دیجیتال با ` },
      { kind: "technical", value: count },
      { kind: "text", value: ` ${noun} است.` },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        entry.description.length === 1 &&
        JSON.stringify(entry.description[0]) ===
          JSON.stringify(expectedSegments) &&
        [product.title, count].every((token) =>
          deriveAllowedTechnicalTokens(product).has(token)
        ),
      `Batch 06 copy must retain only the exact reviewed title/count segments: ${entry.productId}`
    );
    return {
      productId: entry.productId,
      partNumber: product.partNumber,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const BATCH_08_DRAFT_COMMIT = "58ecfa94d0e9565fd23967196f358c0f8cb7eccc";
const BATCH_08_LINGUISTIC_RECORDED_AT = "2026-11-13T17:07:03Z";
const BATCH_08_TECHNICAL_RECORDED_AT = "2026-11-13T17:07:54Z";
const BATCH_08_TECHNICAL_EVIDENCE =
  "reused previously reviewed parsed text of Siemens Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; visual PDF inspection NOT OBSERVED; no fresh retrieval";
const expectedBatch08CanonicalProducts = [
  {
    productId: "siemens-s7-300-sm322-do-8-ac-120-230v-2a-5ff00-0ab0",
    partNumber: "6ES7322-5FF00-0AB0",
    title: "SIMATIC S7-300 SM 322 8 DO 120/230 V AC",
    count: "8",
    reviewedContentHash:
      "sha256:2452c2cbf649d43da05803d06d78a607b26d7df8cace1844f21632ce3b7cbf34",
    evidenceSection: "3.32, printed pp164-165",
    qualification: "",
  },
  {
    productId: "siemens-s7-300-sm322-do-32-ac-120-230v-1a-1fl00-0aa0",
    partNumber: "6ES7322-1FL00-0AA0",
    title: "SIMATIC S7-300 SM 322 32 DO 120/230 V AC",
    count: "32",
    reviewedContentHash:
      "sha256:5906dc1fb0ae7c9a71a0a2e5c5f866878cd49d6f1f2d27bf100809a3930ee3da",
    evidenceSection: "3.22, printed pp122-124",
    qualification: "",
  },
  {
    productId: "siemens-s7-300-sm322-do-64-24vdc-0-3a-1bp00-0aa0",
    partNumber: "6ES7322-1BP00-0AA0",
    title: "SIMATIC S7-300 SM 322 64 DO 24 V DC",
    count: "64",
    reviewedContentHash:
      "sha256:eb7c550ce67f8f1b72b92132d73082f9b0ebf2b469c4df2f32dadd3a94cde211",
    evidenceSection: "3.19, printed pp106-108",
    qualification:
      'Unresolved discrepancy: canonical English description says "sink", while the reviewed manual says "sourcing"; approved Persian copy asserts neither; canonical data is unchanged.',
  },
  {
    productId: "siemens-s7-300-sm322-do-64-24vdc-0-3a-sinking-1bp50-0aa0",
    partNumber: "6ES7322-1BP50-0AA0",
    title: "SIMATIC S7-300 SM 322 64 DO 24 V DC Sinking",
    count: "64",
    reviewedContentHash:
      "sha256:865291d13beef6ecf53fa7ab667d7dd353d88db89938e56215ce1048131efefb",
    evidenceSection: "3.20, printed pp112-115",
    qualification:
      "Sinking remains only within the supported complete canonical title; no independent operating claim is approved.",
  },
  {
    productId: "siemens-s7-300-sm322-do-16-24vdc-0-5a-diagnostics-8bh10-0ab0",
    partNumber: "6ES7322-8BH10-0AB0",
    title: "SIMATIC S7-300 SM 322 16 DO 24 V DC Diagnostics",
    count: "16",
    reviewedContentHash:
      "sha256:402de473e8334628845168be88edc7a2b7c99ce78dad01f5ab4c205088820935",
    evidenceSection: "3.24, printed p129",
    qualification: "",
  },
] as const;
const expectedBatch08ProductIdSet = new Set<ProductId>(
  expectedBatch08CanonicalProducts.map((entry) => entry.productId)
);

const BATCH_07_DRAFT_COMMIT = "e952ecf2036f5d191b712191d637cb042b4426f6";
const BATCH_07_LINGUISTIC_REVIEWED_AT = "2026-11-13T15:45:00Z";
const BATCH_07_TECHNICAL_REVIEWED_AT = "2026-11-13T15:45:06Z";
const expectedBatch07CanonicalProducts = [
  {
    productId: "siemens-s7-300-sm322-do-16-ac-120-230v-1a-1fh00-0aa0",
    partNumber: "6ES7322-1FH00-0AA0",
    title: "SIMATIC S7-300 SM 322 16 DO 120/230 V AC",
    count: "16",
    reviewedContentHash:
      "sha256:2899dd2ecbae2223558f50070ada47d0a4a70f7c0fda3d4d737d9f3c2b74ba0e",
    previouslyReviewedSiemensEvidence:
      "Module Data 05/2022 A5E00105505-AK, section 3.27 pp145-146; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
  },
  {
    productId: "siemens-s7-300-sm322-do-16-acdc-24-48v-0-5a-5gh00-0ab0",
    partNumber: "6ES7322-5GH00-0AB0",
    title: "SIMATIC S7-300 SM 322 16 DO 24-48 V AC/DC",
    count: "16",
    reviewedContentHash:
      "sha256:dcd2e368e9e3c1d8c0fa775d4d217f705a48d156264a6c85ba16fbe780d27ad3",
    previouslyReviewedSiemensEvidence:
      "Module Data 05/2022 A5E00105505-AK, section 3.26 pp140-142; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; Manual UC 24/48 V; official indexed exact-product datasheet text supports the canonical identifier; direct PDF retrieval returned HTTP 403; visual inspection NOT OBSERVED.",
  },
  {
    productId: "siemens-s7-300-sm322-do-8-relay-24vdc-230vac-2a-1hf01-0aa0",
    partNumber: "6ES7322-1HF01-0AA0",
    title: "SIMATIC S7-300 SM 322 8 DO Relay",
    count: "8",
    reviewedContentHash:
      "sha256:fd82f3f5548c850671b0f0b5c1dfb06d8230e7051e59e70e964eaeea9889b561",
    previouslyReviewedSiemensEvidence:
      "Module Data 05/2022 A5E00105505-AK, section 3.34 pp172-173; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
  },
  {
    productId: "siemens-s7-300-sm322-do-8-relay-24vdc-230vac-5a-1hf10-0aa0",
    partNumber: "6ES7322-1HF10-0AA0",
    title: "SIMATIC S7-300 SM 322 8 DO Relay 5 A",
    count: "8",
    reviewedContentHash:
      "sha256:8bfc480b7998bd17ec55ffc46b70d35f9b088d67523e15192a48296ca7c9a7e5",
    previouslyReviewedSiemensEvidence:
      "Module Data 05/2022 A5E00105505-AK, section 3.36 pp182-185; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
  },
  {
    productId: "siemens-s7-300-sm322-do-16-relay-120vdc-230vac-2a-1hh01-0aa0",
    partNumber: "6ES7322-1HH01-0AA0",
    title: "SIMATIC S7-300 SM 322 16 DO Relay 120 V DC / 230 V AC",
    count: "16",
    reviewedContentHash:
      "sha256:527c73b9abff604dacc97629ec9cec3421eed355227cdc0437ca7232c4ba591b",
    previouslyReviewedSiemensEvidence:
      "Module Data 05/2022 A5E00105505-AK, section 3.33 pp169-171; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
  },
] as const;
const expectedBatch07ProductIdSet = new Set<ProductId>(
  expectedBatch07CanonicalProducts.map((entry) => entry.productId)
);
const registeredBatch07Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch07ProductIdSet.has(entry.productId)
);
const expectedPreviouslyApprovedProductIdSet = new Set<ProductId>([
  ...expectedBatch01DraftProductIds,
  ...expectedBatch02DraftProductIds,
  ...expectedBatch03DraftProductIds,
  ...expectedBatch04DraftProductIds,
  ...expectedBatch05ProductIds,
  ...expectedBatch06ProductIds,
]);
const registeredPreviouslyApprovedDrafts =
  persianProductCopyDraftRegistry.filter((entry) =>
    expectedPreviouslyApprovedProductIdSet.has(entry.productId)
  );
assert(
  expectedBatch07ProductIdSet.size === 5 &&
    JSON.stringify(registeredBatch07Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(
        expectedBatch07CanonicalProducts.map((entry) => entry.productId)
      ) &&
    new Set(
      registeredBatch07Drafts.flatMap((entry) => [
        entry.linguisticReview,
        entry.technicalReview,
      ])
    ).size === 10 &&
    registeredBatch07Drafts.filter((entry) =>
      isPendingReview(entry.linguisticReview)
    ).length === 0 &&
    registeredBatch07Drafts.filter((entry) =>
      isPendingReview(entry.technicalReview)
    ).length === 0,
  "Batch 07 must contain five exact ordered bindings, ten distinct approved role objects, and no pending reviews."
);
const registeredBatch07DraftRecords = registeredBatch07Drafts.map(
  (entry, index) => {
    const expected = expectedBatch07CanonicalProducts[index];
    assert(expected !== undefined, "Batch 07 binding must exist.");
    const matches = products.filter(
      (product) =>
        product.id === expected.productId ||
        product.partNumber === expected.partNumber ||
        product.manufacturerPartNumber === expected.partNumber
    );
    const product = matches[0];
    const count = product?.specifications?.["Digital Outputs"];
    assert(
      matches.length === 1 &&
        product !== undefined &&
        product.id === entry.productId &&
        product.id === expected.productId &&
        product.partNumber === expected.partNumber &&
        product.manufacturerPartNumber === expected.partNumber &&
        product.title === expected.title &&
        product.variantId === "digital-output" &&
        count === expected.count &&
        getReviewedProductTechnicalTokenOverrideEntries().every(
          (override) => override.productId !== product.id
        ),
      `Batch 07 production binding, count and absence of overrides must be exact: ${entry.productId}`
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 07 reviewed draft hash must remain unchanged: ${entry.productId}`
    );
    for (const [review, reviewedAt, evidenceRef] of [
      [
        entry.linguisticReview,
        BATCH_07_LINGUISTIC_REVIEWED_AT,
        `PM linguistic approval in this conversation; draft commit ${BATCH_07_DRAFT_COMMIT}; Product ${entry.productId}; MLFB ${expected.partNumber}.`,
      ],
      [
        entry.technicalReview,
        BATCH_07_TECHNICAL_REVIEWED_AT,
        `PM technical approval in this conversation; draft commit ${BATCH_07_DRAFT_COMMIT}; Product ${entry.productId}; MLFB ${expected.partNumber}; previously reviewed Siemens ${expected.previouslyReviewedSiemensEvidence}.`,
      ],
    ] as const) {
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === reviewedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef === evidenceRef &&
          review.note?.startsWith(`${expected.partNumber}:`) === true,
        `Batch 07 role approval must match its observed timestamp, PM evidence and current hash: ${entry.productId}`
      );
    }
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: product.title },
      { kind: "text", value: "، ماژول خروجی دیجیتال با " },
      { kind: "technical", value: count },
      { kind: "text", value: " خروجی است." },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        [product.title, count].every((token) =>
          deriveAllowedTechnicalTokens(product).has(token)
        ),
      `Batch 07 must retain exact typed title/count paragraphs and approved review hashes: ${entry.productId}`
    );
    return {
      productId: entry.productId,
      partNumber: product.partNumber,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const registeredBatch08Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch08ProductIdSet.has(entry.productId)
);
assert(
  expectedBatch08ProductIdSet.size === 5 &&
    JSON.stringify(registeredBatch08Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(
        expectedBatch08CanonicalProducts.map((entry) => entry.productId)
      ) &&
    new Set(
      registeredBatch08Drafts.flatMap((entry) => [
        entry.linguisticReview,
        entry.technicalReview,
      ])
    ).size === 10 &&
    registeredBatch08Drafts.filter((entry) =>
      isPendingReview(entry.linguisticReview)
    ).length === 0 &&
    registeredBatch08Drafts.filter((entry) =>
      isPendingReview(entry.technicalReview)
    ).length === 0,
  "Batch 08 must contain five exact ordered bindings, ten distinct approved role objects, and no pending reviews."
);
const registeredBatch08DraftRecords = registeredBatch08Drafts.map(
  (entry, index) => {
    const expected = expectedBatch08CanonicalProducts[index];
    assert(expected !== undefined, "Batch 08 binding must exist.");
    const matches = products.filter(
      (product) =>
        product.id === expected.productId ||
        product.partNumber === expected.partNumber ||
        product.manufacturerPartNumber === expected.partNumber
    );
    const product = matches[0];
    const count = product?.specifications?.["Digital Outputs"];
    assert(
      matches.length === 1 &&
        product !== undefined &&
        product.id === entry.productId &&
        product.id === expected.productId &&
        product.partNumber === expected.partNumber &&
        product.manufacturerPartNumber === expected.partNumber &&
        product.title === expected.title &&
        product.variantId === "digital-output" &&
        count === expected.count &&
        getReviewedProductTechnicalTokenOverrideEntries().every(
          (override) => override.productId !== product.id
        ),
      `Batch 08 production binding, count and absence of overrides must be exact: ${entry.productId}`
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 08 reviewed draft hash must remain unchanged: ${entry.productId}`
    );
    for (const [role, recordedAt] of [
      ["linguisticReview", BATCH_08_LINGUISTIC_RECORDED_AT],
      ["technicalReview", BATCH_08_TECHNICAL_RECORDED_AT],
    ] as const) {
      const technical = role === "technicalReview";
      const label = technical ? "technical" : "linguistic";
      const qualification =
        technical && expected.qualification ? ` ${expected.qualification}` : "";
      const expectedReview = {
        decision: "approved",
        reviewerId: "Siemiran",
        reviewedAt: recordedAt,
        reviewedContentHash: freshContentHash,
        evidenceRef: `PM ${label} approval in the supplied Batch 08 continuation; draft commit ${BATCH_08_DRAFT_COMMIT}; Product ${entry.productId}; MLFB ${expected.partNumber}${technical ? "; " + BATCH_08_TECHNICAL_EVIDENCE + "; section " + expected.evidenceSection : ""}.${qualification}`,
        note: technical
          ? `${expected.partNumber}: PM-approved complete canonical title as an identifier, digital-output module type and ${expected.count} outputs only. No additional standalone voltage/current, operating-feature, lifecycle, availability or compatibility claims are approved.${qualification}`
          : `${expected.partNumber}: PM-approved Persian wording, punctuation and spacing; complete Latin title and numeric count retain separate typed isolation.`,
      };
      assert(
        JSON.stringify(entry[role]) === JSON.stringify(expectedReview),
        `Batch 08 ${label} approval must bind its observed recording time, reviewer, hash and PM evidence: ${entry.productId}`
      );
    }
    assert(
      BATCH_08_LINGUISTIC_RECORDED_AT < BATCH_08_TECHNICAL_RECORDED_AT,
      "Batch 08 role recording times must be independently observed and ordered."
    );
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: product.title },
      { kind: "text", value: "، ماژول خروجی دیجیتال با " },
      { kind: "technical", value: count },
      { kind: "text", value: " خروجی است." },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        [product.title, count].every((token) =>
          deriveAllowedTechnicalTokens(product).has(token)
        ),
      `Batch 08 must retain exact typed title/count paragraphs and current approved review hashes: ${entry.productId}`
    );
    return {
      productId: entry.productId,
      partNumber: product.partNumber,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const registeredBatch08ApprovalMutationResults =
  registeredBatch08Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(
        segment !== undefined,
        `Batch 08 mutation requires a first segment: ${entry.productId}`
      );
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 08 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const BATCH_09_DRAFT_COMMIT = "cb9b8f629591d0f32f4a2ebf46da720c50f13305";
// Actual UTC recording observations, not PM review timestamps.
const BATCH_09_LINGUISTIC_RECORDED_AT = "2026-11-14T18:23:04Z";
const BATCH_09_TECHNICAL_RECORDED_AT = "2026-11-14T18:23:11Z";
const BATCH_09_EVIDENCE_URLS = {
  "A5E00172008-AP":
    "https://cache.industry.siemens.com/dl/files/709/1096709/att_885614/v2/s7300_et200m_ex_io_modules_manual_en_en-US.pdf?download=true",
  "A5E00105505-AK":
    "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
} as const;
assert(
  [BATCH_09_LINGUISTIC_RECORDED_AT, BATCH_09_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt.replace("Z", ".000Z")
  ) && BATCH_09_LINGUISTIC_RECORDED_AT < BATCH_09_TECHNICAL_RECORDED_AT,
  "Batch 09 role recording times must be valid, independently observed and ordered."
);
const expectedBatch09CanonicalProducts = [
  {
    productId: "siemens-s7-300-sm322-do-4-ex-15v-20ma-5rd00-0ab0",
    partNumber: "6ES7322-5RD00-0AB0",
    title: "SIMATIC S7-300 SM 322 4 DO 15 V / 20 mA Ex",
    count: "4",
    reviewedContentHash:
      "sha256:30129c7354a1fa60198fee2f54feb4074612e873f2566f9fac62849c2e9ae2e9",
    evidenceDocument: "A5E00172008-AP",
    evidenceSection: "2.4.1, printed pp77-78",
  },
  {
    productId: "siemens-s7-300-sm322-do-4-ex-24v-10ma-5sd00-0ab0",
    partNumber: "6ES7322-5SD00-0AB0",
    title: "SIMATIC S7-300 SM 322 4 DO 24 V DC / 10 mA Ex",
    count: "4",
    reviewedContentHash:
      "sha256:bf78d3e02989c4df9f06c614bccef6db89d03f50d8da24fb2336f98704bb8ddf",
    evidenceDocument: "A5E00172008-AP",
    evidenceSection: "2.3.1, printed pp66-69",
  },
  {
    productId: "siemens-s7-300-sm322-do-8-24vdc-0-5a-diagnostics-8bf00-0ab0",
    partNumber: "6ES7322-8BF00-0AB0",
    title: "SIMATIC S7-300 SM 322 8 DO 24 V DC Diagnostics",
    count: "8",
    reviewedContentHash:
      "sha256:261c51a45d9c502af6e81277423025fa5ec9b2effba4338b699d6d78680fcb16",
    evidenceDocument: "A5E00105505-AK",
    evidenceSection: "3.29, printed p151",
  },
  {
    productId: "siemens-s7-300-sm322-do-8-48-125vdc-1-5a-1cf00-0aa0",
    partNumber: "6ES7322-1CF00-0AA0",
    title: "SIMATIC S7-300 SM 322 8 DO 48/125 V DC",
    count: "8",
    reviewedContentHash:
      "sha256:2ffd2d15d399972bd875501d45858f0b4d5e079b0ad7d484996ebf6066a5a250",
    evidenceDocument: "A5E00105505-AK",
    evidenceSection: "3.30, printed pp158-159",
  },
  {
    productId: "siemens-s7-300-sm322-do-8-relay-230vac-5a-rc-5hf00-0ab0",
    partNumber: "6ES7322-5HF00-0AB0",
    title: "SIMATIC S7-300 SM 322 8 DO Relay 230 V AC 5 A RC",
    count: "8",
    reviewedContentHash:
      "sha256:eb38af6a708f702bd04da99b086fb94492d85e9f2b4a5581b321e8322b4ca4c0",
    evidenceDocument: "A5E00105505-AK",
    evidenceSection: "3.35, printed pp176 and 180",
  },
] as const;
const expectedBatch09ProductIdSet = new Set<ProductId>(
  expectedBatch09CanonicalProducts.map((entry) => entry.productId)
);
const registeredBatch09Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch09ProductIdSet.has(entry.productId)
);
const registeredBatch09ReviewRoles = registeredBatch09Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedBatch09ProductIdSet.size === 5 &&
    JSON.stringify(registeredBatch09Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(
        expectedBatch09CanonicalProducts.map((entry) => entry.productId)
      ) &&
    new Set(registeredBatch09ReviewRoles).size === 10 &&
    registeredBatch09ReviewRoles.every(isApprovedReview) &&
    registeredBatch09Drafts.filter((entry) =>
      isPendingReview(entry.linguisticReview)
    ).length === 0 &&
    registeredBatch09Drafts.filter((entry) =>
      isPendingReview(entry.technicalReview)
    ).length === 0,
  "Batch 09 must contain five exact ordered bindings, ten distinct approved role objects and no pending reviews."
);
const registeredBatch09DraftRecords = registeredBatch09Drafts.map(
  (entry, index) => {
    const expected = expectedBatch09CanonicalProducts[index];
    assert(expected !== undefined, "Batch 09 binding must exist.");
    const matches = products.filter(
      (product) =>
        product.id === expected.productId ||
        product.partNumber === expected.partNumber ||
        product.manufacturerPartNumber === expected.partNumber
    );
    const product = matches[0];
    const count = product?.specifications?.["Digital Outputs"];
    assert(
      matches.length === 1 &&
        product !== undefined &&
        product.id === entry.productId &&
        product.id === expected.productId &&
        product.partNumber === expected.partNumber &&
        product.manufacturerPartNumber === expected.partNumber &&
        product.title === expected.title &&
        product.productTypeId === "Signal Module" &&
        product.variantId === "digital-output" &&
        count === expected.count &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== product.id
        ),
      `Batch 09 production binding, count and absence of overrides must be exact: ${entry.productId}`
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 09 approved content must retain its reviewed draft hash: ${entry.productId}`
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_09_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_09_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef.includes(`PM ${label} approval`) &&
          review.evidenceRef.includes(BATCH_09_DRAFT_COMMIT) &&
          review.evidenceRef.includes(entry.productId) &&
          review.evidenceRef.includes(expected.partNumber) &&
          review.evidenceRef.includes("not the PM review timestamp") &&
          review.note?.startsWith(`${expected.partNumber}:`) === true &&
          (role !== "technicalReview" ||
            (review.evidenceRef.includes(expected.evidenceDocument) &&
              review.evidenceRef.includes(expected.evidenceSection) &&
              review.evidenceRef.includes(
                BATCH_09_EVIDENCE_URLS[expected.evidenceDocument]
              ) &&
              review.evidenceRef.includes("readiness-reviewed parsed text") &&
              review.evidenceRef.includes(
                "visual inspection and direct-origin HTTP status NOT OBSERVED"
              ) &&
              review.evidenceRef.includes("no fresh retrieval"))),
        `Batch 09 ${label} approval must bind the reviewer, observed recording time, current hash and applicable PM evidence: ${entry.productId}`
      );
    }
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: product.title },
      { kind: "text", value: "، ماژول خروجی دیجیتال با " },
      { kind: "technical", value: count },
      { kind: "text", value: " خروجی است." },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        [product.title, count].every((token) =>
          deriveAllowedTechnicalTokens(product).has(token)
        ),
      `Batch 09 must use exact identical title/count paragraphs with authorized technical tokens: ${entry.productId}`
    );
    return {
      productId: entry.productId,
      partNumber: product.partNumber,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const registeredBatch09ApprovalMutationResults =
  registeredBatch09Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(
        segment !== undefined,
        "Batch 09 mutation requires a first segment."
      );
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 09 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const BATCH_10_DRAFT_COMMIT = "e203b34b5e19bafa85efaf76cf58fbb7721e909e";
// Actual UTC recording observations, not PM review timestamps.
const BATCH_10_LINGUISTIC_RECORDED_AT = "2026-11-16T17:32:37Z";
const BATCH_10_TECHNICAL_RECORDED_AT = "2026-11-16T17:33:11Z";
const BATCH_10_EVIDENCE_URLS = {
  "A5E00105505-AK": BATCH_09_EVIDENCE_URLS["A5E00105505-AK"],
  "A5E01716340-03":
    "https://cache.industry.siemens.com/dl/files/383/46360383/att_84101/v1/s7_mec_sdk_programming_manual_en-US_en-US.pdf",
} as const;
assert(
  [BATCH_10_LINGUISTIC_RECORDED_AT, BATCH_10_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt.replace("Z", ".000Z")
  ) && BATCH_10_LINGUISTIC_RECORDED_AT < BATCH_10_TECHNICAL_RECORDED_AT,
  "Batch 10 role recording times must be valid, independently observed and ordered."
);
const expectedBatch10Products = [
  {
    productId: "siemens-s7-300-sm323-di8-do8-24vdc-0-5a-1bh01-0aa0",
    partNumber: "6ES7323-1BH01-0AA0",
    reviewedContentHash:
      "sha256:230d011bba459015aaa2a9ddfd8991a69a4cbd540cd1023c863fa99d67816c42",
    evidenceDocument: "A5E00105505-AK",
    evidenceSection: "3.38, printed pp190-192",
    title: "SIMATIC S7-300 SM 323 8 DI / 8 DO 24 V DC",
    variant: "digital-io",
    canonicalCounts: { "Digital Inputs": "8", "Digital Outputs": "8" },
    draft: { scope: "sm323", inputs: "8", outputs: "8" },
  },
  {
    productId: "siemens-s7-300-sm323-di16-do16-24vdc-0-5a-1bl00-0aa0",
    partNumber: "6ES7323-1BL00-0AA0",
    reviewedContentHash:
      "sha256:7d7b40e0f621db4e6c5e85c4e8502ebf6e4fa65d3219364c88d85e87828392c6",
    evidenceDocument: "A5E00105505-AK",
    evidenceSection: "3.37, printed pp187-189",
    title: "SIMATIC S7-300 SM 323 16 DI / 16 DO 24 V DC",
    variant: "digital-io",
    canonicalCounts: { "Digital Inputs": "16", "Digital Outputs": "16" },
    draft: { scope: "sm323", inputs: "16", outputs: "16" },
  },
  {
    productId: "siemens-s7-300-sm327-di8-do8-24vdc-0-5a-1bh00-0ab0",
    partNumber: "6ES7327-1BH00-0AB0",
    reviewedContentHash:
      "sha256:6bead8934643a3532b824141de26f3b41962713829bdb36693a9bed296ad7a0d",
    evidenceDocument: "A5E00105505-AK",
    evidenceSection: "3.39, printed pp193-195",
    title: "SIMATIC S7-300 SM 327 8 DI / 8 DX 24 V DC",
    variant: "programmable-digital-io",
    canonicalCounts: { "Digital Inputs": "8", "Digital Outputs": "8" },
    // Prose counts fixed inputs and configurable channels, not fixed outputs.
    draft: { scope: "sm327", fixedInputs: "8", configurableChannels: "8" },
  },
  {
    productId: "siemens-s7-300-sm331-ai2-9-12-14bit-7kb02-0ab0",
    partNumber: "6ES7331-7KB02-0AB0",
    reviewedContentHash:
      "sha256:2a3d107c79fffcb9ada9893bd8ea1be89529b774a44dccfd6755ce259ab157a4",
    evidenceDocument: "A5E00105505-AK",
    evidenceSection:
      "6.8.1, printed pp305 and 310; section 6.8.2, printed pp313-314",
    title: "SIMATIC S7-300 SM 331 2 AI Universal",
    variant: "analog-input",
    canonicalCounts: { "Analog Inputs": "2" },
    // Preserve canonical binding data; prose intentionally omits title/count.
    draft: { scope: "mlfb-only" },
  },
  {
    productId: "siemens-s7-300-sm331-ai8-13bit-1kf01-0ab0",
    partNumber: "6ES7331-1KF01-0AB0",
    reviewedContentHash:
      "sha256:9b8015c893fda3c9a340f6d2e9e0a3539312326ff1ce1918f1623119c30109f9",
    evidenceDocument: "A5E01716340-03",
    evidenceSection: "A.3, Table A-4, printed p54",
    title: "SIMATIC S7-300 SM 331 8 AI 13 Bit",
    variant: "analog-input",
    canonicalCounts: { "Analog Inputs": "8" },
    draft: { scope: "analog-input", inputs: "8" },
  },
] as const;

function getExpectedBatch10Segments(
  expected: (typeof expectedBatch10Products)[number]
): MutableSegment[] {
  const model: MutableSegment[] = [
    { kind: "text", value: "مدل " },
    {
      kind: "technical",
      value:
        expected.draft.scope === "mlfb-only"
          ? expected.partNumber
          : expected.title,
    },
  ];
  switch (expected.draft.scope) {
    case "sm323":
      return [
        ...model,
        { kind: "text", value: "، ماژول ورودی و خروجی دیجیتال با " },
        { kind: "technical", value: expected.draft.inputs },
        { kind: "text", value: " ورودی و " },
        { kind: "technical", value: expected.draft.outputs },
        { kind: "text", value: " خروجی است." },
      ];
    case "sm327":
      return [
        ...model,
        { kind: "text", value: "، ماژول ورودی و خروجی دیجیتال با " },
        { kind: "technical", value: expected.draft.fixedInputs },
        { kind: "text", value: " ورودی ثابت و " },
        { kind: "technical", value: expected.draft.configurableChannels },
        {
          kind: "text",
          value: " کانال قابل پیکربندی به‌صورت ورودی یا خروجی است.",
        },
      ];
    case "mlfb-only":
      return [...model, { kind: "text", value: "، ماژول ورودی آنالوگ است." }];
    case "analog-input":
      return [
        ...model,
        { kind: "text", value: "، ماژول ورودی آنالوگ با " },
        { kind: "technical", value: expected.draft.inputs },
        { kind: "text", value: " ورودی است." },
      ];
  }
}

const expectedBatch10ProductIdSet = new Set<ProductId>(
  expectedBatch10Products.map((entry) => entry.productId)
);
const registeredBatch10Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch10ProductIdSet.has(entry.productId)
);
const registeredBatch10ReviewRoles = registeredBatch10Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedBatch10ProductIdSet.size === 5 &&
    JSON.stringify(registeredBatch10Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch10Products.map((entry) => entry.productId)) &&
    new Set(registeredBatch10ReviewRoles).size === 10 &&
    registeredBatch10ReviewRoles.every(isApprovedReview) &&
    registeredBatch10Drafts.filter((entry) =>
      isPendingReview(entry.linguisticReview)
    ).length === 0 &&
    registeredBatch10Drafts.filter((entry) =>
      isPendingReview(entry.technicalReview)
    ).length === 0,
  "Batch 10 must contain five exact ordered bindings, ten distinct approved role objects and no pending reviews."
);
const registeredBatch10DraftRecords = registeredBatch10Drafts.map(
  (entry, index) => {
    const expected = expectedBatch10Products[index];
    assert(expected !== undefined, "Batch 10 binding must exist.");
    const matches = products.filter(
      (product) =>
        product.id === expected.productId ||
        product.partNumber === expected.partNumber ||
        product.manufacturerPartNumber === expected.partNumber
    );
    const product = matches[0];
    assert(
      matches.length === 1 &&
        product !== undefined &&
        product.id === entry.productId &&
        product.id === expected.productId &&
        product.partNumber === expected.partNumber &&
        product.manufacturerPartNumber === expected.partNumber &&
        product.title === expected.title &&
        product.productTypeId === "Signal Module" &&
        product.variantId === expected.variant &&
        Object.entries(expected.canonicalCounts).every(
          ([field, count]) => product.specifications?.[field] === count
        ) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== product.id
        ),
      `Batch 10 canonical binding, variant, counts and zero overrides must remain exact: ${entry.productId}`
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 10 approved content must retain its reviewed draft hash: ${entry.productId}`
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_10_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_10_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef.includes(`PM ${label} approval`) &&
          review.evidenceRef.includes(BATCH_10_DRAFT_COMMIT) &&
          review.evidenceRef.includes(entry.productId) &&
          review.evidenceRef.includes(expected.partNumber) &&
          review.evidenceRef.includes("not the PM review timestamp") &&
          review.note?.startsWith(`${expected.partNumber}:`) === true &&
          (role !== "technicalReview" ||
            (review.evidenceRef.includes(expected.evidenceDocument) &&
              review.evidenceRef.includes(expected.evidenceSection) &&
              review.evidenceRef.includes(
                BATCH_10_EVIDENCE_URLS[expected.evidenceDocument]
              ) &&
              review.evidenceRef.includes("readiness-reviewed parsed text") &&
              review.evidenceRef.includes(
                "visual inspection and direct-origin HTTP status NOT OBSERVED"
              ) &&
              review.evidenceRef.includes("no fresh retrieval"))),
        `Batch 10 ${label} approval must bind the reviewer, observed recording time, current hash and applicable PM evidence: ${entry.productId}`
      );
    }
    const expectedSegments = getExpectedBatch10Segments(expected);
    const allowedTokens = deriveAllowedTechnicalTokens(product);
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        expectedSegments.every(
          (segment) =>
            segment.kind !== "technical" || allowedTokens.has(segment.value)
        ),
      `Batch 10 must retain the exact narrowed typed prose and authorize every technical segment: ${entry.productId}`
    );
    return {
      productId: entry.productId,
      partNumber: product.partNumber,
      scope: expected.draft.scope,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const registeredBatch10ApprovalMutationResults =
  registeredBatch10Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(
        segment !== undefined,
        "Batch 10 mutation requires a first segment."
      );
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 10 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const BATCH_11_DRAFT_COMMIT = "e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900";
// Actual UTC recording observations, not PM review timestamps.
const BATCH_11_LINGUISTIC_RECORDED_AT = "2026-11-16T18:54:19Z";
const BATCH_11_TECHNICAL_RECORDED_AT = "2026-11-16T18:54:26Z";
const BATCH_11_EVIDENCE_URL = BATCH_10_EVIDENCE_URLS["A5E00105505-AK"];
assert(
  [BATCH_11_LINGUISTIC_RECORDED_AT, BATCH_11_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt.replace("Z", ".000Z")
  ) && BATCH_11_LINGUISTIC_RECORDED_AT < BATCH_11_TECHNICAL_RECORDED_AT,
  "Batch 11 role recording times must be valid, independently observed and ordered."
);
const expectedBatch11Products = [
  {
    productId: "siemens-s7-300-sm331-ai8-13bit-universal-1kf02-0ab0",
    partNumber: "6ES7331-1KF02-0AB0",
    reviewedContentHash:
      "sha256:a6381c0d18676bf6493922f44565530ef2918b5faef480243edf38e6ffcf58cd",
    evidenceSection:
      "section 6.6, printed pp283 and 287; section 6.6.3, printed p292",
  },
  {
    productId: "siemens-s7-300-sm331-ai8-9-12-14bit-7kf02-0ab0",
    partNumber: "6ES7331-7KF02-0AB0",
    reviewedContentHash:
      "sha256:a1075ecbbd65d260501efd5be06ba97aebf655ee6e62bed73e6e3e94d5c309ca",
    evidenceSection:
      "section 6.7.1, printed pp293 and 298-299; section 6.7.2, printed pp301-303",
  },
  {
    productId: "siemens-s7-300-sm331-ai8-14bit-isochronous-7hf01-0ab0",
    partNumber: "6ES7331-7HF01-0AB0",
    reviewedContentHash:
      "sha256:ec1b81cd5f1164c8c7cbe5992e2c55151e90f95965c378f62d4ffb0dc285e0dd",
    evidenceSection: "section 6.5, printed p274",
  },
  {
    productId: "siemens-s7-300-sm331-ai8-16bit-voltage-current-7nf00-0ab0",
    partNumber: "6ES7331-7NF00-0AB0",
    reviewedContentHash:
      "sha256:89dbb40e8e4edac18eff9f9064d130efbf5973193491e8e4f959bcc56fc5d0f0",
    evidenceSection: "section 6.3, printed pp255, 259 and 261",
  },
  {
    productId: "siemens-s7-300-sm331-ai8-16bit-voltage-current-fast-7nf10-0ab0",
    partNumber: "6ES7331-7NF10-0AB0",
    reviewedContentHash:
      "sha256:2761cc070175cb99e5df37f0ed99e1738a739edae775d2e33dd1fc39690c3b67",
    evidenceSection:
      "section 6.4, printed pp263-264; section 6.4.3, printed pp270-272",
  },
] as const;
const expectedBatch11ProductIdSet = new Set<ProductId>(
  expectedBatch11Products.map((entry) => entry.productId)
);
const registeredBatch11Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch11ProductIdSet.has(entry.productId)
);
const registeredBatch11ReviewRoles = registeredBatch11Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedBatch11ProductIdSet.size === 5 &&
    JSON.stringify(registeredBatch11Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch11Products.map((entry) => entry.productId)) &&
    new Set(registeredBatch11ReviewRoles).size === 10 &&
    registeredBatch11ReviewRoles.every(isApprovedReview) &&
    registeredBatch11Drafts.filter((entry) =>
      isPendingReview(entry.linguisticReview)
    ).length === 0 &&
    registeredBatch11Drafts.filter((entry) =>
      isPendingReview(entry.technicalReview)
    ).length === 0,
  "Batch 11 must contain five exact ordered bindings, ten distinct approved role objects and no pending reviews."
);
const registeredBatch11DraftRecords = registeredBatch11Drafts.map(
  (entry, index) => {
    const expected = expectedBatch11Products[index];
    assert(expected !== undefined, "Batch 11 binding must exist.");
    const sources = s7300SM.filter(
      (source) =>
        source.id === expected.productId || source.mlfb === expected.partNumber
    );
    const source = sources[0];
    const matches = products.filter(
      (product) =>
        product.id === expected.productId ||
        product.partNumber === expected.partNumber ||
        product.manufacturerPartNumber === expected.partNumber
    );
    const product = matches[0];
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === expected.productId &&
        source.mlfb === expected.partNumber &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === entry.productId &&
        product.id === expected.productId &&
        product.partNumber === expected.partNumber &&
        product.manufacturerPartNumber === expected.partNumber &&
        product.productTypeId === "Signal Module" &&
        product.variantId === "analog-input" &&
        JSON.stringify(mapSiemensS7300SignalModuleToProduct(source)) ===
          JSON.stringify(product) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== product.id
        ),
      `Batch 11 source, production binding and zero overrides must remain exact: ${entry.productId}`
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 11 approved content must retain its reviewed draft hash: ${entry.productId}`
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_11_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_11_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef.includes(`PM ${label} approval`) &&
          review.evidenceRef.includes(BATCH_11_DRAFT_COMMIT) &&
          review.evidenceRef.includes(entry.productId) &&
          review.evidenceRef.includes(expected.partNumber) &&
          review.evidenceRef.includes("not the PM review timestamp") &&
          review.note?.startsWith(`${expected.partNumber}:`) === true &&
          (role !== "technicalReview" ||
            (review.evidenceRef.includes("A5E00105505-AK") &&
              review.evidenceRef.includes(expected.evidenceSection) &&
              review.evidenceRef.includes(BATCH_11_EVIDENCE_URL) &&
              review.evidenceRef.includes("readiness-reviewed parsed text") &&
              review.evidenceRef.includes(
                "visual inspection and direct-origin HTTP status NOT OBSERVED"
              ) &&
              review.evidenceRef.includes("no fresh retrieval"))),
        `Batch 11 ${label} approval must bind the reviewer, observed recording time, current hash and applicable PM evidence: ${entry.productId}`
      );
    }
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: expected.partNumber },
      { kind: "text", value: "، ماژول ورودی آنالوگ است." },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        deriveAllowedTechnicalTokens(product).has(expected.partNumber),
      `Batch 11 must retain identical three-segment MLFB/type-only paragraphs with an authorized MLFB: ${entry.productId}`
    );
    return {
      productId: entry.productId,
      partNumber: product.partNumber,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const registeredBatch11ApprovalMutationResults =
  registeredBatch11Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(
        segment !== undefined,
        "Batch 11 mutation requires a first segment."
      );
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 11 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const BATCH_12_DRAFT_COMMIT = "fafb281b45ff88903742a611acafec31a22f6063";
// Actual UTC recording observations, not PM review timestamps.
const BATCH_12_LINGUISTIC_RECORDED_AT = "2026-11-17T17:56:09Z";
const BATCH_12_TECHNICAL_RECORDED_AT = "2026-11-17T17:56:19Z";
assert(
  [BATCH_12_LINGUISTIC_RECORDED_AT, BATCH_12_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt.replace("Z", ".000Z")
  ) && BATCH_12_LINGUISTIC_RECORDED_AT < BATCH_12_TECHNICAL_RECORDED_AT,
  "Batch 12 role recording times must be valid, independently observed and ordered."
);
const expectedBatch12Products = [
  {
    productId: "siemens-s7-300-sm331-ai8-rtd-7pf01-0ab0",
    partNumber: "6ES7331-7PF01-0AB0",
    reviewedContentHash:
      "sha256:4b2fd6f390cc22aa86d7a436f921fddfe48220399f02dfdc344add49aa264e1a",
    evidenceUrl: BATCH_11_EVIDENCE_URL,
    evidenceAccess:
      "readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK",
    evidenceSection:
      "section 6.9.1, printed pp316-317; section 6.9.4, printed pp325-328",
    evidenceQualifications: ["Four- and eight-channel operating modes"],
  },
  {
    productId: "siemens-s7-300-sm331-ai6-thermocouple-16bit-7pe10-0ab0",
    partNumber: "6ES7331-7PE10-0AB0",
    reviewedContentHash:
      "sha256:f151e41395474c7ea56d74f247daefabe984f2c874f712ca6157549b1c77d194",
    evidenceUrl: BATCH_11_EVIDENCE_URL,
    evidenceAccess:
      "readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK",
    evidenceSection: "section 6.11, printed pp342-343",
    evidenceQualifications: [
      "Exact identity and analog-input type established",
    ],
  },
  {
    productId: "siemens-s7-300-sm331-ai8-thermocouple-7pf11-0ab0",
    partNumber: "6ES7331-7PF11-0AB0",
    reviewedContentHash:
      "sha256:3f64cb913ca57a3f6eea0845bdcd7c1234c6cab4dae4dc5698d343f86c58cc4d",
    evidenceUrl: BATCH_11_EVIDENCE_URL,
    evidenceAccess:
      "readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK",
    evidenceSection:
      "section 6.10, printed pp329-330; section 6.10.3, printed pp339-341",
    evidenceQualifications: [
      "Four- and eight-channel modes",
      "compensation-wiring-dependent usable channels",
    ],
  },
  {
    productId: "siemens-s7-300-sm331-ai4-0-4-20ma-ex-7rd00-0ab0",
    partNumber: "6ES7331-7RD00-0AB0",
    reviewedContentHash:
      "sha256:34b333674940106446f9e5a4da38aea5fd7d3a951943c917c22acfd742eee33f",
    evidenceUrl:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7331-7RD00-0AB0",
    evidenceAccess:
      "readiness-reviewed official indexed exact-product datasheet text",
    evidenceSection: "printed p1/3, product description and Analog inputs",
    evidenceQualifications: [
      "403 Forbidden",
      "not a successful PDF read or parsed-PDF access",
      "1/29/2026",
      "document observation only, no date-format interpretation or lifecycle inference",
    ],
  },
  {
    productId: "siemens-s7-300-sm331-ai8-tc-ai4-pt100-ex-7sf00-0ab0",
    partNumber: "6ES7331-7SF00-0AB0",
    reviewedContentHash:
      "sha256:f0fd456293f7046a9e9d1a9bb3457bef6104cde1aca1f85000977cef9e23b344",
    evidenceUrl:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES73317SF000AB0",
    evidenceAccess: "readiness-accessed parsed exact-product datasheet text",
    evidenceSection: "printed p1/3, product description and Analog inputs",
    evidenceQualifications: [
      "11/4/2025",
      "document observation only, no date-format interpretation or lifecycle inference",
      "Eight thermocouple versus four RTD inputs are mode-dependent alternatives",
    ],
  },
] as const;
const expectedBatch12ProductIdSet = new Set<ProductId>(
  expectedBatch12Products.map((entry) => entry.productId)
);
const registeredBatch12Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch12ProductIdSet.has(entry.productId)
);
const registeredBatch12ReviewRoles = registeredBatch12Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
const registeredBatch12TechnicalSegmentCount = registeredBatch12Drafts.reduce(
  (count, entry) =>
    count +
    entry.shortDescription.filter((segment) => segment.kind === "technical")
      .length,
  0
);
assert(
  expectedBatch12ProductIdSet.size === 5 &&
    JSON.stringify(registeredBatch12Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch12Products.map((entry) => entry.productId)) &&
    new Set(registeredBatch12ReviewRoles).size === 10 &&
    registeredBatch12ReviewRoles.every(isApprovedReview) &&
    registeredBatch12Drafts.filter((entry) =>
      isPendingReview(entry.linguisticReview)
    ).length === 0 &&
    registeredBatch12Drafts.filter((entry) =>
      isPendingReview(entry.technicalReview)
    ).length === 0 &&
    registeredBatch12TechnicalSegmentCount === 5,
  "Batch 12 must contain five exact ordered bindings, five technical segments, ten distinct approved role objects and no pending reviews."
);
const registeredBatch12DraftRecords = registeredBatch12Drafts.map(
  (entry, index) => {
    const expected = expectedBatch12Products[index];
    assert(expected !== undefined, "Batch 12 binding must exist.");
    const sources = s7300SM.filter(
      (source) =>
        source.id === expected.productId || source.mlfb === expected.partNumber
    );
    const source = sources[0];
    const matches = products.filter(
      (product) =>
        product.id === expected.productId ||
        product.partNumber === expected.partNumber ||
        product.manufacturerPartNumber === expected.partNumber
    );
    const product = matches[0];
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === expected.productId &&
        source.mlfb === expected.partNumber &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === entry.productId &&
        product.id === expected.productId &&
        product.partNumber === expected.partNumber &&
        product.manufacturerPartNumber === expected.partNumber &&
        product.productTypeId === "Signal Module" &&
        product.variantId === "analog-input" &&
        JSON.stringify(mapSiemensS7300SignalModuleToProduct(source)) ===
          JSON.stringify(product) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== product.id
        ),
      `Batch 12 source, production binding and zero overrides must remain exact: ${entry.productId}`
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 12 approved content must retain its reviewed draft hash: ${entry.productId}`
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_12_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_12_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef.includes(`PM ${label} approval`) &&
          review.evidenceRef.includes(BATCH_12_DRAFT_COMMIT) &&
          review.evidenceRef.includes(entry.productId) &&
          review.evidenceRef.includes(expected.partNumber) &&
          review.evidenceRef.includes("not the PM review timestamp") &&
          review.note?.startsWith(`${expected.partNumber}:`) === true &&
          (role !== "technicalReview" ||
            (review.evidenceRef.includes(expected.evidenceUrl) &&
              review.evidenceRef.includes(expected.evidenceAccess) &&
              review.evidenceRef.includes(expected.evidenceSection) &&
              expected.evidenceQualifications.every((qualification) =>
                review.evidenceRef.includes(qualification)
              ) &&
              review.evidenceRef.includes(
                "Visual inspection and successful direct-origin HTTP status for accessible parsed documents NOT OBSERVED"
              ) &&
              review.evidenceRef.includes(
                "no fresh retrieval or lifecycle verification"
              ) &&
              review.note.includes(
                "PM-approved exact MLFB identity and analog-input module type only."
              ))),
        `Batch 12 ${label} approval must bind the reviewer, observed recording time, current hash and applicable PM evidence: ${entry.productId}`
      );
    }
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: expected.partNumber },
      { kind: "text", value: "، ماژول ورودی آنالوگ است." },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        deriveAllowedTechnicalTokens(product).has(expected.partNumber),
      `Batch 12 must retain identical three-segment MLFB/type-only paragraphs with an authorized MLFB: ${entry.productId}`
    );
    return {
      productId: entry.productId,
      partNumber: product.partNumber,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const registeredBatch12ApprovalMutationResults =
  registeredBatch12Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(
        segment !== undefined,
        "Batch 12 mutation requires a first segment."
      );
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 12 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const BATCH_13_DRAFT_COMMIT = "1b92833003a32176546b7e8064e79a6b44a22591";
// Actual UTC recording observations, not PM review timestamps.
const BATCH_13_LINGUISTIC_RECORDED_AT = "2026-11-17T19:13:24Z";
const BATCH_13_TECHNICAL_RECORDED_AT = "2026-11-17T19:13:41Z";
assert(
  [BATCH_13_LINGUISTIC_RECORDED_AT, BATCH_13_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt.replace("Z", ".000Z")
  ) && BATCH_13_LINGUISTIC_RECORDED_AT < BATCH_13_TECHNICAL_RECORDED_AT,
  "Batch 13 role recording times must be valid, independently observed and ordered."
);
const expectedBatch13Products = [
  {
    productId: "siemens-s7-300-sm331-ai2-hart-7tb00-0ab0",
    partNumber: "6ES7331-7TB00-0AB0",
    variantId: "analog-input",
    direction: "input",
    reviewedContentHash:
      "sha256:a6896ed2f4528cb62e0f001f5f683bdc5aa0ccde450d4876bce0b45fbb85bf98",
    evidenceDocument: "A5E00172008-AP",
    evidenceEdition: "04/2022",
    evidenceUrl:
      "https://support.industry.siemens.com/cs/attachments/1096709/s7300_et200m_ex_io_modules_manual_en_en-US.pdf",
    evidenceAccess: "readiness-reviewed official indexed text",
    evidenceSection: "section 4.4.4, printed p176",
    evidenceQualifications: [
      "403 Forbidden",
      "not a successful PDF read or parsed-PDF access",
      "HART measurement modes and nominal counts remain outside approval.",
    ],
  },
  {
    productId: "siemens-s7-300-sm331-ai8-hart-7tf01-0ab0",
    partNumber: "6ES7331-7TF01-0AB0",
    variantId: "analog-input",
    direction: "input",
    reviewedContentHash:
      "sha256:8a24745ae08f5316c66cbe7a02673c6ee5a21d64238061d962217fa83c289a16",
    evidenceDocument: "A5E00434623-AG",
    evidenceEdition: "11/2020",
    evidenceUrl:
      "https://support.industry.siemens.com/cs/attachments/22063748/et200m_hart_analog_modules_manual_en-US_en-US.pdf",
    evidenceAccess: "readiness-reviewed official indexed text",
    evidenceSection: "section 6.1, printed p55",
    evidenceQualifications: [
      "403 Forbidden",
      "not a successful PDF read or parsed-PDF access",
      "HART measurement modes and nominal counts remain outside approval.",
    ],
  },
  {
    productId: "siemens-s7-300-sm332-ao2-ui-11-12bit-5hb01-0ab0",
    partNumber: "6ES7332-5HB01-0AB0",
    variantId: "analog-output",
    direction: "output",
    reviewedContentHash:
      "sha256:6552b4aa8b0764023e34078b81a23934b4e9e17615dc0296926a2f5bda4b7f63",
    evidenceDocument: "A5E00105505-AK",
    evidenceEdition: "05/2022",
    evidenceUrl:
      "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
    evidenceAccess: "readiness-accessible parsed document text",
    evidenceSection: "section 6.15, printed pp388-389",
    evidenceQualifications: [
      "Voltage/current output configuration and nominal counts remain outside approval.",
    ],
  },
  {
    productId: "siemens-s7-300-sm332-ao4-ui-diagnostics-5hd01-0ab0",
    partNumber: "6ES7332-5HD01-0AB0",
    variantId: "analog-output",
    direction: "output",
    reviewedContentHash:
      "sha256:23942831cb57197f2cf8bf5906c8acc4da25029b2238545e316f31b9901c767d",
    evidenceDocument: "A5E00105505-AK",
    evidenceEdition: "05/2022",
    evidenceUrl:
      "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
    evidenceAccess: "readiness-accessible parsed document text",
    evidenceSection: "section 6.14, printed p382",
    evidenceQualifications: [
      "Voltage/current output configuration and nominal counts remain outside approval.",
    ],
  },
  {
    productId: "siemens-s7-300-sm332-ao8-ui-diagnostics-5hf00-0ab0",
    partNumber: "6ES7332-5HF00-0AB0",
    variantId: "analog-output",
    direction: "output",
    reviewedContentHash:
      "sha256:27389a865bd2a8960e5ca1a428242d84f524aec88adf6132a596084fb716ba86",
    evidenceDocument: "A5E00105505-AK",
    evidenceEdition: "05/2022",
    evidenceUrl:
      "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
    evidenceAccess: "readiness-accessible parsed document text",
    evidenceSection: "section 6.12, printed p367",
    evidenceQualifications: [
      "Voltage/current output configuration and nominal counts remain outside approval.",
    ],
  },
] as const;
const expectedBatch13ProductIdSet = new Set<ProductId>(
  expectedBatch13Products.map((entry) => entry.productId)
);
const registeredBatch13Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch13ProductIdSet.has(entry.productId)
);
const registeredBatch13ReviewRoles = registeredBatch13Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
const registeredBatch13TechnicalSegmentCount = registeredBatch13Drafts.reduce(
  (count, entry) =>
    count +
    entry.shortDescription.filter((segment) => segment.kind === "technical")
      .length,
  0
);
assert(
  expectedBatch13ProductIdSet.size === 5 &&
    JSON.stringify(registeredBatch13Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch13Products.map((entry) => entry.productId)) &&
    expectedBatch13Products.filter((entry) => entry.direction === "input")
      .length === 2 &&
    expectedBatch13Products.filter((entry) => entry.direction === "output")
      .length === 3 &&
    new Set(registeredBatch13ReviewRoles).size === 10 &&
    registeredBatch13ReviewRoles.every(isApprovedReview) &&
    registeredBatch13Drafts.filter((entry) =>
      isPendingReview(entry.linguisticReview)
    ).length === 0 &&
    registeredBatch13Drafts.filter((entry) =>
      isPendingReview(entry.technicalReview)
    ).length === 0 &&
    registeredBatch13TechnicalSegmentCount === 5,
  "Batch 13 must contain five exact ordered bindings, two inputs, three outputs, five technical segments, ten distinct approved role objects and no pending reviews."
);
const registeredBatch13DraftRecords = registeredBatch13Drafts.map(
  (entry, index) => {
    const expected = expectedBatch13Products[index];
    assert(expected !== undefined, "Batch 13 binding must exist.");
    const sources = s7300SM.filter(
      (source) =>
        source.id === expected.productId || source.mlfb === expected.partNumber
    );
    const source = sources[0];
    const matches = products.filter(
      (product) =>
        product.id === expected.productId ||
        product.partNumber === expected.partNumber ||
        product.manufacturerPartNumber === expected.partNumber
    );
    const product = matches[0];
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === expected.productId &&
        source.mlfb === expected.partNumber &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === entry.productId &&
        product.id === expected.productId &&
        product.partNumber === expected.partNumber &&
        product.manufacturerPartNumber === expected.partNumber &&
        product.productTypeId === "Signal Module" &&
        product.variantId === expected.variantId &&
        ((expected.direction === "input" &&
          product.variantId === "analog-input") ||
          (expected.direction === "output" &&
            product.variantId === "analog-output")) &&
        JSON.stringify(mapSiemensS7300SignalModuleToProduct(source)) ===
          JSON.stringify(product) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== product.id
        ),
      `Batch 13 source, production binding, direction and zero overrides must remain exact: ${entry.productId}`
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 13 approved content must retain its reviewed draft hash: ${entry.productId}`
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_13_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_13_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef.includes(`PM ${label} approval`) &&
          review.evidenceRef.includes(BATCH_13_DRAFT_COMMIT) &&
          review.evidenceRef.includes(entry.productId) &&
          review.evidenceRef.includes(expected.partNumber) &&
          review.evidenceRef.includes(`module type ${expected.variantId}`) &&
          review.evidenceRef.includes("not the PM review timestamp") &&
          review.note?.startsWith(`${expected.partNumber}:`) === true &&
          (role !== "linguisticReview" ||
            review.note.includes(
              expected.direction === "input" ? "ورودی" : "خروجی"
            )) &&
          (role !== "technicalReview" ||
            (review.evidenceRef.includes(expected.evidenceDocument) &&
              review.evidenceRef.includes(expected.evidenceEdition) &&
              review.evidenceRef.includes(expected.evidenceUrl) &&
              review.evidenceRef.includes(expected.evidenceAccess) &&
              review.evidenceRef.includes(expected.evidenceSection) &&
              expected.evidenceQualifications.every((qualification) =>
                review.evidenceRef.includes(qualification)
              ) &&
              review.evidenceRef.includes(
                "Printed pages are not assumed viewer indices."
              ) &&
              review.evidenceRef.includes(
                "Visual inspection and successful direct-origin HTTP status for accessible parsed material NOT OBSERVED"
              ) &&
              review.evidenceRef.includes(
                "no fresh retrieval or lifecycle verification"
              ) &&
              review.note.includes(
                `PM-approved exact MLFB identity and ${expected.variantId} module type only.`
              ))),
        `Batch 13 ${label} approval must bind the reviewer, observed recording time, current hash, direction and applicable PM evidence: ${entry.productId}`
      );
    }
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: expected.partNumber },
      {
        kind: "text",
        value:
          expected.direction === "input"
            ? "، ماژول ورودی آنالوگ است."
            : "، ماژول خروجی آنالوگ است.",
      },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        deriveAllowedTechnicalTokens(product).has(expected.partNumber),
      `Batch 13 must retain identical three-segment MLFB/type-only paragraphs with the correct Persian direction and authorized MLFB: ${entry.productId}`
    );
    return {
      productId: entry.productId,
      partNumber: product.partNumber,
      variantId: product.variantId,
      direction: expected.direction,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const registeredBatch13ApprovalMutationResults =
  registeredBatch13Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(
        segment !== undefined,
        "Batch 13 mutation requires a first segment."
      );
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 13 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const expectedCompletedBatchProductIdSet = new Set<ProductId>([
  ...expectedPreviouslyApprovedProductIdSet,
  ...expectedBatch07ProductIdSet,
  ...expectedBatch08ProductIdSet,
  ...expectedBatch09ProductIdSet,
  ...expectedBatch10ProductIdSet,
]);
const expectedCompletedThroughBatch11ProductIdSet = new Set<ProductId>([
  ...expectedCompletedBatchProductIdSet,
  ...expectedBatch11ProductIdSet,
]);
const registeredCompletedThroughBatch11Drafts =
  persianProductCopyDraftRegistry.filter((entry) =>
    expectedCompletedThroughBatch11ProductIdSet.has(entry.productId)
  );
assert(
  expectedCompletedThroughBatch11ProductIdSet.size === 55 &&
    registeredCompletedThroughBatch11Drafts.length === 55 &&
    new Set(
      registeredCompletedThroughBatch11Drafts.map((entry) => entry.productId)
    ).size === 55 &&
    [...expectedBatch12ProductIdSet].every(
      (productId) => !expectedCompletedThroughBatch11ProductIdSet.has(productId)
    ) &&
    registeredCompletedThroughBatch11Drafts.every((entry) => {
      const contentHash = createProductCopyContentHash(entry);
      return (
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash
      );
    }),
  "Completed Batches 01-11 must retain exactly fifty-five current dual-approved entries, disjoint from the five Batch 12 entries."
);
const expectedCompletedThroughBatch12ProductIdSet = new Set<ProductId>([
  ...expectedCompletedThroughBatch11ProductIdSet,
  ...expectedBatch12ProductIdSet,
]);
const registeredCompletedThroughBatch12Drafts =
  persianProductCopyDraftRegistry.filter((entry) =>
    expectedCompletedThroughBatch12ProductIdSet.has(entry.productId)
  );
assert(
  expectedCompletedThroughBatch12ProductIdSet.size === 60 &&
    registeredCompletedThroughBatch12Drafts.length === 60 &&
    new Set(
      registeredCompletedThroughBatch12Drafts.map((entry) => entry.productId)
    ).size === 60 &&
    [...expectedBatch13ProductIdSet].every(
      (productId) => !expectedCompletedThroughBatch12ProductIdSet.has(productId)
    ) &&
    registeredCompletedThroughBatch12Drafts.every((entry) => {
      const contentHash = createProductCopyContentHash(entry);
      return (
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash
      );
    }),
  "Completed Batches 01-12 must retain exactly sixty current dual-approved entries, disjoint from the five Batch 13 entries."
);
const expectedCompletedThroughBatch13ProductIdSet = new Set<ProductId>([
  ...expectedCompletedThroughBatch12ProductIdSet,
  ...expectedBatch13ProductIdSet,
]);
const registeredCompletedThroughBatch13Drafts =
  persianProductCopyDraftRegistry.filter((entry) =>
    expectedCompletedThroughBatch13ProductIdSet.has(entry.productId)
  );
assert(
  expectedCompletedThroughBatch13ProductIdSet.size === 65 &&
    registeredCompletedThroughBatch13Drafts.length === 65 &&
    new Set(
      registeredCompletedThroughBatch13Drafts.map((entry) => entry.productId)
    ).size === 65 &&
    registeredCompletedThroughBatch13Drafts.every((entry) => {
      const contentHash = createProductCopyContentHash(entry);
      return (
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash
      );
    }),
  "Completed Batches 01-13 must retain exactly sixty-five current dual-approved entries."
);

const BATCH_14_DRAFT_COMMIT = "31cc7c87d22df51dde622c5f1ef34c942acefad6";
// Actual UTC recording observations, not PM review timestamps.
const BATCH_14_LINGUISTIC_RECORDED_AT = "2026-11-19T09:05:22Z";
const BATCH_14_TECHNICAL_RECORDED_AT = "2026-11-19T09:05:23Z";
assert(
  [BATCH_14_LINGUISTIC_RECORDED_AT, BATCH_14_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt.replace("Z", ".000Z")
  ) && BATCH_14_LINGUISTIC_RECORDED_AT < BATCH_14_TECHNICAL_RECORDED_AT,
  "Batch 14 role recording times must be valid and ordered."
);

const batch14EvidenceDocuments = {
  module: {
    title: "S7-300 Module Data",
    edition: "05/2022",
    number: "A5E00105505-AK",
    url: "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
  },
  ex: {
    title: "S7-300, ET 200M Ex I/O Modules",
    edition: "04/2022",
    number: "A5E00172008-AP",
    url: "https://cache.industry.siemens.com/dl/files/709/1096709/att_885614/v2/s7300_et200m_ex_io_modules_manual_en_en-US.pdf?download=true",
  },
  hart: {
    title: "HART analog modules",
    edition: "11/2020",
    number: "A5E00434623-AG",
    url: "https://support.industry.siemens.com/cs/attachments/22063748/et200m_hart_analog_modules_manual_en-US_en-US.pdf?download=true",
  },
} as const;

const expectedBatch14Products = [
  {
    productId: "siemens-s7-300-sm332-ao4-channel-isolated-16bit-7nd02-0ab0",
    partNumber: "6ES7332-7ND02-0AB0",
    reviewedContentHash:
      "sha256:31d12dc70ce3271779b913a916729290ef8622fd2b65bc0f0de3c728fe81c3b2",
    evidenceDocument: "module",
    evidenceSection: "section 6.13, printed p373",
    evidenceAccess: "parsed manual text",
    evidenceQualifications: [
      "https://mall.industry.siemens.com/mall/en/sg/Catalog/Product/6ES7332-7ND02-0AB0",
      '"4 AI"',
      "No count approval, catalog correction or canonical-data change.",
    ],
  },
  {
    productId: "siemens-s7-300-sm332-ao4-0-4-20ma-ex-5rd00-0ab0",
    partNumber: "6ES7332-5RD00-0AB0",
    reviewedContentHash:
      "sha256:69abfc57a5946c926b15c7b1e0e18c4c742e7f3f26211a5fc568ea4953344e03",
    evidenceDocument: "ex",
    evidenceSection: "section 3.13, printed p153",
    evidenceAccess: "official indexed excerpts and parsed text",
    evidenceQualifications: [],
  },
  {
    productId: "siemens-s7-300-sm332-ao2-hart-5tb00-0ab0",
    partNumber: "6ES7332-5TB00-0AB0",
    reviewedContentHash:
      "sha256:da80c757ca2bbc694590e9eebad1aef4b604dc05f092ca139688653af0f880bf",
    evidenceDocument: "ex",
    evidenceSection: "section 4.4.5, printed p183",
    evidenceAccess: "official indexed excerpts and parsed text",
    evidenceQualifications: [],
  },
  {
    productId: "siemens-s7-300-sm332-ao8-hart-8tf01-0ab0",
    partNumber: "6ES7332-8TF01-0AB0",
    reviewedContentHash:
      "sha256:91d11f448e3ab88cecc1845903aae8b1b689ebadf47f98f24b515eec9949690d",
    evidenceDocument: "hart",
    evidenceSection: "section 6.2, printed p61",
    evidenceAccess: "official indexed excerpts and parsed text",
    evidenceQualifications: [],
  },
  {
    productId: "siemens-siplus-s7-300-sm332-ao2-ui-5hb01-2ab0",
    partNumber: "6AG1332-5HB01-2AB0",
    reviewedContentHash:
      "sha256:2fc22d6c41f2e4492722c6809128ea38ebaebd1b6bff51877c96ebb2e4900374",
    evidenceDocument: "module",
    evidenceSection: "section 1.7, printed p28 and section 6.15, printed p388",
    evidenceAccess: "parsed manual text",
    evidenceQualifications: [
      "6ES7332-5HB01-0AB0",
      "inaccessible through the reader",
      "no numeric status reported",
    ],
  },
] as const;
const expectedBatch14ProductIds = expectedBatch14Products.map(
  (entry) => entry.productId
);
const expectedBatch14ProductIdSet = new Set<ProductId>(
  expectedBatch14ProductIds
);
const registeredBatch14Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch14ProductIdSet.has(entry.productId)
);
const registeredBatch14ReviewRoles = registeredBatch14Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedBatch14ProductIdSet.size === 5 &&
    expectedBatch14ProductIds.every(
      (id) => !expectedCompletedThroughBatch13ProductIdSet.has(id)
    ) &&
    JSON.stringify(registeredBatch14Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch14ProductIds) &&
    new Set(registeredBatch14ReviewRoles).size === 10 &&
    registeredBatch14ReviewRoles.every(isApprovedReview),
  "Batch 14 must contain exactly five ordered drafts and ten distinct approved role records."
);
const registeredBatch14DraftRecords = registeredBatch14Drafts.map(
  (entry, index) => {
    const expected = expectedBatch14Products[index];
    const { productId, partNumber } = expected;
    const sources = s7300SM.filter(
      (source) => source.id === productId || source.mlfb === partNumber
    );
    const matches = products.filter(
      (product) =>
        product.id === productId ||
        product.partNumber === partNumber ||
        product.manufacturerPartNumber === partNumber
    );
    const [source] = sources;
    const [product] = matches;
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === productId &&
        source.mlfb === partNumber &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === productId &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.productTypeId === "Signal Module" &&
        product.variantId === "analog-output" &&
        JSON.stringify(mapSiemensS7300SignalModuleToProduct(source)) ===
          JSON.stringify(product) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      `Batch 14 source and production binding must be exact with zero overrides: ${productId}`
    );

    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: partNumber },
      { kind: "text", value: "، ماژول خروجی آنالوگ است." },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        deriveAllowedTechnicalTokens(product).has(partNumber),
      `Batch 14 must retain identical MLFB/type-only paragraphs with an authorized MLFB and the Persian output suffix: ${productId}`
    );

    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 14 content must retain its PM-reviewed draft hash: ${productId}`
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_14_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_14_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef.includes(`PM ${label} approval`) &&
          review.evidenceRef.includes(BATCH_14_DRAFT_COMMIT) &&
          review.evidenceRef.includes(productId) &&
          review.evidenceRef.includes(partNumber) &&
          review.evidenceRef.includes("module type analog-output") &&
          review.evidenceRef.includes("not the PM review timestamp") &&
          review.note?.startsWith(`${partNumber}:`) === true,
        `Batch 14 ${label} approval must bind the PM review, recording time and draft identity: ${productId}`
      );
      if (role === "linguisticReview") {
        assert(
          review.note.includes("Persian wording, spacing and punctuation") &&
            review.note.includes("typed MLFB isolation"),
          `Batch 14 linguistic approval must cover wording and typed MLFB isolation: ${productId}`
        );
      } else {
        const document = batch14EvidenceDocuments[expected.evidenceDocument];
        assert(
          [
            document.title,
            document.edition,
            document.number,
            document.url,
            expected.evidenceSection,
            expected.evidenceAccess,
            ...expected.evidenceQualifications,
            "Printed pages are not assumed viewer indices.",
            "Visual inspection and direct-origin HTTP status were NOT OBSERVED.",
            "No fresh retrieval or lifecycle verification.",
          ].every((fact) => review.evidenceRef.includes(fact)) &&
            !review.evidenceRef.includes("403") &&
            review.note.includes(
              "PM-approved exact MLFB identity and analog-output module type only."
            ),
          `Batch 14 technical approval must preserve the exact evidence and scope: ${productId}`
        );
      }
    }

    return {
      productId,
      partNumber,
      variantId: product.variantId,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const registeredBatch14ApprovalMutationResults =
  registeredBatch14Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(
        segment !== undefined,
        "Batch 14 mutation requires a first segment."
      );
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 14 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const expectedCompletedThroughBatch14ProductIdSet = new Set<ProductId>([
  ...expectedCompletedThroughBatch13ProductIdSet,
  ...expectedBatch14ProductIdSet,
]);
const registeredCompletedThroughBatch14Drafts =
  persianProductCopyDraftRegistry.filter((entry) =>
    expectedCompletedThroughBatch14ProductIdSet.has(entry.productId)
  );
assert(
  expectedCompletedThroughBatch14ProductIdSet.size === 70 &&
    registeredCompletedThroughBatch14Drafts.length === 70 &&
    new Set(
      registeredCompletedThroughBatch14Drafts.map((entry) => entry.productId)
    ).size === 70 &&
    registeredCompletedThroughBatch14Drafts.every((entry) => {
      const contentHash = createProductCopyContentHash(entry);
      return (
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash
      );
    }),
  "Completed Batches 01-14 must retain exactly seventy current dual-approved entries."
);

const BATCH_15_DRAFT_COMMIT = "55aafe89238e3c68dac886358e9d9fcda753b4a2";
// Actual UTC recording observations, not PM review timestamps.
const BATCH_15_LINGUISTIC_RECORDED_AT = "2026-11-19T09:57:17Z";
const BATCH_15_TECHNICAL_RECORDED_AT = "2026-11-19T09:57:18Z";
assert(
  [BATCH_15_LINGUISTIC_RECORDED_AT, BATCH_15_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt.replace("Z", ".000Z")
  ) && BATCH_15_LINGUISTIC_RECORDED_AT < BATCH_15_TECHNICAL_RECORDED_AT,
  "Batch 15 role recording times must be valid and ordered."
);

const batch15EvidenceDocuments = {
  module: {
    title: "S7-300 Module Data",
    edition: "05/2022",
    reference: "A5E00105505-AK",
    url: "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
  },
  catalog: {
    title: "ST 70",
    edition: "2023",
    reference: "SIPLUS SM 334",
    url: "https://cache.industry.siemens.com/dl/files/167/109744167/att_1145924/v1/simatic-st70-complete-english-2023.pdf",
  },
  faq: {
    title: "Front Connector Selection",
    edition: "V2.0, 15 October 2008",
    reference: "ID 23060726",
    url: "https://cache.industry.siemens.com/dl/files/726/23060726/att_66628/v1/23060726_s7-300_kabel_und_zubehoer_zuordnung_stecker_baugruppe_e.pdf",
  },
} as const;

const expectedBatch15Products = [
  {
    productId: "siemens-siplus-s7-300-sm332-ao8-ui-5hf00-2ab0",
    partNumber: "6AG1332-5HF00-2AB0",
    variantId: "analog-output",
    reviewedContentHash:
      "sha256:335779e11d5d493187d7dccc5663fe7836ae473f0771d1f18311b828c56973d9",
    evidenceReferences: [
      ["module", "section 1.7, printed p28 and section 6.12, printed p367"],
    ],
    evidenceAccess: "parsed text",
    evidenceQualifications: [
      "Distinct from the standard order number 6ES7332-5HF00-0AB0.",
    ],
  },
  {
    productId: "siemens-s7-300-sm334-ai4-ao2-8bit-0ce01-0aa0",
    partNumber: "6ES7334-0CE01-0AA0",
    variantId: "analog-io",
    reviewedContentHash:
      "sha256:e4d3dfb326ba107c2fd3b278b53a02f994b88a1f58b222431d260f85da229f11",
    evidenceReferences: [["module", "section 6.16, printed p395"]],
    evidenceAccess: "parsed text",
    evidenceQualifications: [],
  },
  {
    productId: "siemens-s7-300-sm334-ai4-ao2-12bit-0ke00-0ab0",
    partNumber: "6ES7334-0KE00-0AB0",
    variantId: "analog-io",
    reviewedContentHash:
      "sha256:b8d05d32718ace7c27bba9c90964e672228b8960fa504062bb6e7a7f0fe390bf",
    evidenceReferences: [["module", "section 6.17, printed p401"]],
    evidenceAccess: "parsed text",
    evidenceQualifications: [],
  },
  {
    productId: "siemens-siplus-s7-300-sm334-ai4-ao2-12bit-0ke00-7ab0",
    partNumber: "6AG1334-0KE00-7AB0",
    variantId: "analog-io",
    reviewedContentHash:
      "sha256:31c4b179029b64012767dae1d797942be038a1fd2864b31386de93e7c3941fbb",
    evidenceReferences: [
      ["module", "section 1.7, printed p28"],
      ["catalog", "printed p5/104"],
    ],
    evidenceAccess: "parsed text",
    evidenceQualifications: [
      "Module Data section 6.17, printed p401 lists a separate SIPLUS -2AB0 order number and is not evidence for -7AB0.",
    ],
  },
  {
    productId: "siemens-s7-300-sm335-ai4-ao4-14bit-7hg01-0ab0",
    partNumber: "6ES7335-7HG01-0AB0",
    variantId: "analog-io",
    reviewedContentHash:
      "sha256:5977e85f4e4304fe10efa342a31b69830981b800d55a7f2d7d6797a0915359a8",
    evidenceReferences: [["faq", "section 1.3 Table 7, printed p13/16"]],
    evidenceAccess: "indexed and parsed FAQ text",
    evidenceQualifications: [
      "The separate SM 335 manual request returned 403 in the reader and supplied no evidence. The usable indexed and parsed FAQ is a separate source.",
    ],
  },
] as const;
const expectedBatch15ProductIds = expectedBatch15Products.map(
  (entry) => entry.productId
);
const expectedBatch15ProductIdSet = new Set<ProductId>(
  expectedBatch15ProductIds
);
const registeredBatch15Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch15ProductIdSet.has(entry.productId)
);
const registeredBatch15ReviewRoles = registeredBatch15Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedBatch15ProductIdSet.size === 5 &&
    expectedBatch15ProductIds.every(
      (id) => !expectedCompletedThroughBatch14ProductIdSet.has(id)
    ) &&
    JSON.stringify(registeredBatch15Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch15ProductIds) &&
    new Set(registeredBatch15ReviewRoles).size === 10 &&
    registeredBatch15ReviewRoles.every(isApprovedReview),
  "Batch 15 must contain five ordered drafts and ten distinct approved role records."
);
const registeredBatch15DraftRecords = registeredBatch15Drafts.map(
  (entry, index) => {
    const expected = expectedBatch15Products[index];
    const { productId, partNumber, variantId } = expected;
    const sources = s7300SM.filter(
      (source) => source.id === productId || source.mlfb === partNumber
    );
    const matches = products.filter(
      (product) =>
        product.id === productId ||
        product.partNumber === partNumber ||
        product.manufacturerPartNumber === partNumber
    );
    const [source] = sources;
    const [product] = matches;
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === productId &&
        source.mlfb === partNumber &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === productId &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.productTypeId === "Signal Module" &&
        product.variantId === variantId &&
        JSON.stringify(mapSiemensS7300SignalModuleToProduct(source)) ===
          JSON.stringify(product) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      `Batch 15 source and production binding must be exact with zero overrides: ${productId}`
    );

    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: partNumber },
      {
        kind: "text",
        value:
          variantId === "analog-output"
            ? "، ماژول خروجی آنالوگ است."
            : "، ماژول ورودی و خروجی آنالوگ است.",
      },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        deriveAllowedTechnicalTokens(product).has(partNumber),
      `Batch 15 must retain identical three-segment copy with its exact MLFB and Persian module type: ${productId}`
    );

    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 15 content must retain its PM-reviewed draft hash: ${productId}`
    );
    const [typeLabel, persianType] =
      variantId === "analog-output"
        ? ["analog-output", "خروجی آنالوگ"]
        : ["mixed analog input and output", "ورودی و خروجی آنالوگ"];
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_15_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_15_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef.includes(`PM ${label} approval`) &&
          review.evidenceRef.includes(BATCH_15_DRAFT_COMMIT) &&
          review.evidenceRef.includes(productId) &&
          review.evidenceRef.includes(partNumber) &&
          review.evidenceRef.includes(`module type ${variantId}`) &&
          review.evidenceRef.includes("not the PM review timestamp") &&
          review.note?.startsWith(`${partNumber}:`) === true,
        `Batch 15 ${label} approval must bind the PM review, recording time and draft identity: ${productId}`
      );
      if (role === "linguisticReview") {
        assert(
          review.note.includes("Persian wording, punctuation and spacing") &&
            review.note.includes("typed MLFB isolation") &&
            review.note.includes(`exact ${persianType} wording`),
          `Batch 15 linguistic approval must cover exact wording and typed MLFB isolation: ${productId}`
        );
      } else {
        assert(
          expected.evidenceReferences.every(([key, section]) => {
            const document = batch15EvidenceDocuments[key];
            return [
              document.title,
              document.edition,
              document.reference,
              document.url,
              section,
            ].every((fact) => review.evidenceRef.includes(fact));
          }) &&
            [
              expected.evidenceAccess,
              ...expected.evidenceQualifications,
              "Printed pages are not assumed viewer indices.",
              "Visual inspection and successful direct-origin HTTP status for parsed material were NOT OBSERVED.",
              "No fresh retrieval or lifecycle verification.",
            ].every((fact) => review.evidenceRef.includes(fact)) &&
            review.note.includes(
              `PM-approved exact MLFB identity and ${typeLabel} module type only.`
            ),
          `Batch 15 technical approval must preserve exact evidence and variant scope: ${productId}`
        );
      }
    }

    return {
      productId,
      partNumber,
      variantId: product.variantId,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const registeredBatch15ApprovalMutationResults =
  registeredBatch15Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(
        segment !== undefined,
        "Batch 15 mutation requires a first segment."
      );
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 15 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const expectedCompletedThroughBatch15ProductIdSet = new Set<ProductId>([
  ...expectedCompletedThroughBatch14ProductIdSet,
  ...expectedBatch15ProductIdSet,
]);
const registeredCompletedThroughBatch15Drafts =
  persianProductCopyDraftRegistry.filter((entry) =>
    expectedCompletedThroughBatch15ProductIdSet.has(entry.productId)
  );
assert(
  expectedCompletedThroughBatch15ProductIdSet.size === 75 &&
    registeredCompletedThroughBatch15Drafts.length === 75 &&
    new Set(
      registeredCompletedThroughBatch15Drafts.map((entry) => entry.productId)
    ).size === 75 &&
    registeredCompletedThroughBatch15Drafts.every((entry) => {
      const contentHash = createProductCopyContentHash(entry);
      return (
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash
      );
    }),
  "Completed Batches 01-15 must retain exactly seventy-five unique current dual-approved entries."
);

// Reused readiness evidence for exact MLFB/module type only, not approvals.
// No fresh manufacturer retrieval or lifecycle verification is performed here.
const BATCH_16_DRAFT_COMMIT = "64be5ce1cf8f1787a556029844130c0d6d88b2cd";
// Actual UTC role recording observations, not PM review timestamps.
const BATCH_16_LINGUISTIC_RECORDED_AT = "2026-11-20T10:15:48Z";
const BATCH_16_TECHNICAL_RECORDED_AT = "2026-11-20T10:15:56Z";
assert(
  [BATCH_16_LINGUISTIC_RECORDED_AT, BATCH_16_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt.replace("Z", ".000Z")
  ) && BATCH_16_LINGUISTIC_RECORDED_AT < BATCH_16_TECHNICAL_RECORDED_AT,
  "Batch 16 role recording observations must be valid and separately ordered."
);
const batch16ReadinessEvidence = {
  sm335: {
    productUrl:
      "https://mall.industry.siemens.com/mall/en/se/Catalog/Product/6ES7335-7HG02-0AB0",
    datasheetUrl:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7335-7HG02-0AB0",
    access:
      "Indexed text and reader-returned Mall HTML; indexed datasheet printed p1/2. The separate datasheet request returned 403 in the reader, not a successful PDF read.",
  },
  interfaces: {
    title: "SINUMERIK Safety Integrated, Description of Functions",
    edition: "11.03",
    reference: "6FC5297-6AB80-0BP2",
    section: "2.9, Table 2-8, printed p2-42",
    url: "https://cache.industry.siemens.com/dl/files/938/109474938/att_834764/v1/FBSI_1103_en.pdf",
    access:
      "Indexed and parsed text lists all four exact IM order numbers separately. The support-hosted manual and three standard IM Mall requests returned 403 in the reader; those failed requests supplied no parsed evidence.",
  },
  catalogLimit:
    "ST 70 2021 supplied indexed corroboration at printed p5/255. The reader reported (400) Content length is too large: 25626498; this is a reader size error, not a Siemens-origin HTTP 400.",
  visualInspection: "NOT OBSERVED",
  successfulDirectOriginHttpStatus: "NOT OBSERVED",
} as const;

const expectedBatch16Products = [
  {
    productId: "siemens-s7-300-sm335-ai4-ao4-14bit-7hg02-0ab0",
    partNumber: "6ES7335-7HG02-0AB0",
    productTypeId: "Signal Module",
    variantId: "analog-io",
    suffix: "، ماژول ورودی و خروجی آنالوگ است.",
    sourceGroup: "sm",
    reviewedContentHash:
      "sha256:7cea0b953bd3af82756492e0a6d31428d893fa98fbc0f8d139fb12a9af0ba08a",
  },
  {
    productId: "siemens-s7-300-im360-3aa01-0aa0",
    partNumber: "6ES7360-3AA01-0AA0",
    productTypeId: "Interface Module",
    variantId: "rack-sender",
    suffix: "، ماژول رابط است.",
    sourceGroup: "im",
    reviewedContentHash:
      "sha256:0943e72a22fb929d256cc74388c2d8be71ba36ccda3fbaf86ddb30a436d36001",
  },
  {
    productId: "siemens-s7-300-im361-3ca01-0aa0",
    partNumber: "6ES7361-3CA01-0AA0",
    productTypeId: "Interface Module",
    variantId: "rack-receiver",
    suffix: "، ماژول رابط است.",
    sourceGroup: "im",
    reviewedContentHash:
      "sha256:92d6f77bf7531bddcf2dba02d812931667ef58ea62c222e03571aab81a564570",
  },
  {
    productId: "siemens-s7-300-im365-0ba01-0aa0",
    partNumber: "6ES7365-0BA01-0AA0",
    productTypeId: "Interface Module",
    variantId: "rack-interface",
    suffix: "، ماژول رابط است.",
    sourceGroup: "im",
    reviewedContentHash:
      "sha256:ba8f2857a26fc682b7d4909ad2eced3802f6d5f74d60d5ce4c5bacfda1aaba7d",
  },
  {
    productId: "siemens-s7-300-im365-0ba81-0aa0",
    partNumber: "6ES7365-0BA81-0AA0",
    productTypeId: "Interface Module",
    variantId: "rack-interface",
    suffix: "، ماژول رابط است.",
    sourceGroup: "im",
    reviewedContentHash:
      "sha256:d4f700afe1d6cbf46f2f4e980cb225f3c8af7d894b74a9cdaaa8b6a6db064191",
  },
] as const;
const expectedBatch16ProductIds = expectedBatch16Products.map(
  (entry) => entry.productId
);
const expectedBatch16ProductIdSet = new Set<ProductId>(
  expectedBatch16ProductIds
);
const registeredBatch16Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch16ProductIdSet.has(entry.productId)
);
const registeredBatch16ReviewRoles = registeredBatch16Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedBatch16ProductIdSet.size === 5 &&
    expectedBatch16ProductIds.every(
      (id) => !expectedCompletedThroughBatch15ProductIdSet.has(id)
    ) &&
    JSON.stringify(registeredBatch16Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch16ProductIds) &&
    new Set(registeredBatch16ReviewRoles).size === 10 &&
    registeredBatch16ReviewRoles.every(isApprovedReview),
  "Batch 16 must contain five exact ordered drafts and ten distinct approved role objects, disjoint from completed Batches 01-15."
);
const registeredBatch16DraftRecords = registeredBatch16Drafts.map(
  (entry, index) => {
    const expected = expectedBatch16Products[index];
    const { productId, partNumber, productTypeId, variantId, suffix } =
      expected;
    const sources = [...s7300SM, ...s7300IM].filter(
      (source) => source.id === productId || source.mlfb === partNumber
    );
    const matches = products.filter(
      (product) =>
        product.id === productId ||
        product.partNumber === partNumber ||
        product.manufacturerPartNumber === partNumber
    );
    const [source] = sources;
    const [product] = matches;
    const adaptedMatches =
      expected.sourceGroup === "sm"
        ? s7300SM
            .filter((candidate) => candidate.id === productId)
            .map(mapSiemensS7300SignalModuleToProduct)
        : s7300IM
            .filter((candidate) => candidate.id === productId)
            .map(mapSiemensS7300InterfaceModuleToProduct);
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === productId &&
        source.mlfb === partNumber &&
        source.productTypeId === productTypeId &&
        source.variantId === variantId &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === productId &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.productTypeId === productTypeId &&
        product.variantId === variantId &&
        adaptedMatches.length === 1 &&
        JSON.stringify(adaptedMatches[0]) === JSON.stringify(product) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      `Batch 16 source and production binding must be exact with zero overrides: ${productId}`
    );
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: partNumber },
      { kind: "text", value: suffix },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        deriveAllowedTechnicalTokens(product).has(partNumber),
      `Batch 16 must contain only the exact three segments and eligible MLFB: ${productId}`
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 16 must retain the exact PM-approved production hash: ${productId}`
    );
    const moduleType =
      expected.sourceGroup === "sm"
        ? "mixed analog input and output"
        : "interface";
    const persianType =
      expected.sourceGroup === "sm" ? "ورودی و خروجی آنالوگ" : "رابط";
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_16_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_16_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef.includes(`PM ${label} approval`) &&
          review.evidenceRef.includes(BATCH_16_DRAFT_COMMIT) &&
          review.evidenceRef.includes(productId) &&
          review.evidenceRef.includes(partNumber) &&
          review.evidenceRef.includes(`module type ${moduleType}`) &&
          review.evidenceRef.includes("not the PM review timestamp") &&
          review.note?.startsWith(`${partNumber}:`) === true,
        `Batch 16 ${label} approval must bind the exact draft hash and separate recording observation: ${productId}`
      );
      if (role === "linguisticReview") {
        assert(
          review.note.includes("PM-approved exact Persian wording") &&
            review.note.includes("typed MLFB isolation") &&
            review.note.includes(`exact ${persianType} suffix`),
          `Batch 16 linguistic approval must cover the reported Persian text: ${productId}`
        );
      } else {
        const evidenceFacts =
          expected.sourceGroup === "sm"
            ? [
                batch16ReadinessEvidence.sm335.productUrl,
                batch16ReadinessEvidence.sm335.datasheetUrl,
                "indexed Siemens exact-product datasheet, printed p1/2",
                "separate datasheet request returned 403 in the reader",
                "no successful PDF read or parsed evidence",
              ]
            : [
                batch16ReadinessEvidence.interfaces.title,
                batch16ReadinessEvidence.interfaces.edition,
                batch16ReadinessEvidence.interfaces.reference,
                batch16ReadinessEvidence.interfaces.url,
                "section 2.9, Table 2-8, printed p2-42",
                "indexed and parsed text",
                "failed support-hosted manual request returned 403 in the reader",
                "distinct from the usable cache-hosted parsed manual",
              ];
        assert(
          [
            ...evidenceFacts,
            "reader size limit, not a Siemens-origin HTTP status",
            "Printed pages are not assumed viewer indices.",
            "Visual inspection and successful direct-origin HTTP status were NOT OBSERVED.",
            "No fresh retrieval or lifecycle verification.",
          ].every((fact) => review.evidenceRef.includes(fact)) &&
            review.note.includes(
              `PM-approved exact MLFB identity and ${moduleType} module type only.`
            ) &&
            review.note.includes("remain outside approval"),
          `Batch 16 technical approval must preserve narrow scope and distinct evidence/access limits: ${productId}`
        );
      }
    }
    return {
      productId,
      partNumber,
      variantId,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const registeredBatch16ApprovalMutationResults =
  registeredBatch16Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(
        segment !== undefined,
        "Batch 16 mutation requires a first segment."
      );
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 16 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const expectedCompletedThroughBatch16ProductIdSet = new Set<ProductId>([
  ...expectedCompletedThroughBatch15ProductIdSet,
  ...expectedBatch16ProductIdSet,
]);
const registeredCompletedThroughBatch16Drafts =
  persianProductCopyDraftRegistry.filter((entry) =>
    expectedCompletedThroughBatch16ProductIdSet.has(entry.productId)
  );
assert(
  expectedCompletedThroughBatch16ProductIdSet.size === 80 &&
    registeredCompletedThroughBatch16Drafts.length === 80 &&
    new Set(
      registeredCompletedThroughBatch16Drafts.map((entry) => entry.productId)
    ).size === 80 &&
    registeredCompletedThroughBatch16Drafts.every((entry) => {
      const contentHash = createProductCopyContentHash(entry);
      return (
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash
      );
    }),
  "Completed Batches 01-16 must retain exactly eighty unique current dual-approved entries."
);

// Actual UTC recording observations, not the PM's review timestamps.
const BATCH_17_DRAFT_COMMIT = "65b6682a2471e502a63227e333bbf1c3a58c686b";
const BATCH_17_LINGUISTIC_RECORDED_AT = "2026-11-20T13:07:06Z";
const BATCH_17_TECHNICAL_RECORDED_AT = "2026-11-20T13:07:12Z";
assert(
  [BATCH_17_LINGUISTIC_RECORDED_AT, BATCH_17_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt.replace("Z", ".000Z")
  ) && BATCH_17_LINGUISTIC_RECORDED_AT < BATCH_17_TECHNICAL_RECORDED_AT,
  "Batch 17 role recording observations must be valid and separately ordered."
);
// Reused readiness evidence supports only the narrow identity/type approval.
const batch17ReadinessEvidence = {
  siplusIm365: {
    title: "S7-300 Module Data, 05/2022, A5E00105505-AK",
    section: "1.7 Table 1-2, printed p27; 8.4, printed p431",
    url: "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
    access:
      "Parsed text identifies the exact SIPLUS order number as an interface module. The separate canonical Mall reader request returned 403.",
  },
  im174: {
    title:
      "S7 Easy Motion Control - Driver Blocks for SINAMICS and IM174, V1.0, Siemens Entry 40787611",
    section: "Table 1-1, printed p4",
    url: "https://support.industry.siemens.com/cs/attachments/40787611/40787611_EMC_additional_Drivers_en.pdf",
    access:
      "Indexed text only identifies the exact order number as an interface module. The separate direct PDF reader request returned 403; no successful parsed read was observed.",
  },
  im1784: {
    title: "IM 178-4 Drive Interface, C79000-G7000-C178-01",
    section: "German unnumbered cover and printed p1-1",
    url: "https://cache.industry.siemens.com/dl/files/389/1117389/att_22592/v1/IM1784_d.pdf",
    identityCorroboration:
      "English C79000-G7076-C178-01, printed p1-1; https://cache.industry.siemens.com/dl/files/389/1117389/att_22595/v1/IM1784_e.pdf",
    access:
      "Parsed German text identifies Drive Interface and the exact order number; parsed English text corroborates identity. The separate support-hosted English reader request returned 403.",
  },
  cp340: {
    title: "PtP coupling and configuration of CP 340, 04/2011, A5E00369892-03",
    section: "1.1 Table 1-1, printed p11",
    url: "https://cache.industry.siemens.com/dl/files/332/1137332/att_24649/v1/s7300_cp340_manual_en_en-US.pdf",
    access:
      "Parsed text separately lists both exact order numbers as communication-processor variants.",
  },
  freshRetrieval: "NOT RUN",
  visualInspection: "NOT OBSERVED",
  successfulDirectOriginHttpStatus: "NOT OBSERVED",
} as const;

const expectedBatch17Products = [
  {
    productId: "siemens-siplus-s7-300-im365-0ba01-2aa0",
    partNumber: "6AG1365-0BA01-2AA0",
    approvalType: "interface module",
    reviewedContentHash:
      "sha256:9bc2e9c4ac070faef6a49208c79226fb5eeeca5e77cc3f2281fef0f236eb4946",
    productTypeId: "Interface Module",
    variantId: "rack-interface",
    suffix: "، ماژول رابط است.",
    sourceGroup: "im",
  },
  {
    productId: "siemens-s7-300-im174-0aa10-0aa0",
    partNumber: "6ES7174-0AA10-0AA0",
    approvalType: "interface module",
    reviewedContentHash:
      "sha256:7646442547fe6d820467f951a5da2a2bf3d692dde9de9f1fb8dd876367692a7b",
    productTypeId: "Interface Module",
    variantId: "motion-control",
    suffix: "، ماژول رابط است.",
    sourceGroup: "im",
  },
  {
    productId: "siemens-s7-300-im178-4-4bh00-0ae0",
    partNumber: "6ES7178-4BH00-0AE0",
    approvalType: "drive interface module",
    reviewedContentHash:
      "sha256:d5008ca2271b6562097b90c0fc3b4de2891ea3bad7069ea9b530ee7eeb0c8c4f",
    productTypeId: "Interface Module",
    variantId: "distributed-motion-control",
    suffix: "، ماژول رابط درایو است.",
    sourceGroup: "im",
  },
  {
    productId: "siemens-s7-300-cp340-rs232-1ah02-0ae0",
    partNumber: "6ES7340-1AH02-0AE0",
    approvalType: "communication processor",
    reviewedContentHash:
      "sha256:21a6c7208281c57c32f9963efbe3453f38085adac45faf7bf82b1656d194c747",
    productTypeId: "Communication Processor",
    variantId: "rs232",
    suffix: "، پردازندهٔ ارتباطی است.",
    sourceGroup: "cp",
  },
  {
    productId: "siemens-s7-300-cp340-tty-1bh02-0ae0",
    partNumber: "6ES7340-1BH02-0AE0",
    approvalType: "communication processor",
    reviewedContentHash:
      "sha256:63fa7ba48908fa7905aadcc489f1e552c4253aeca40bd440dea3ed69c6ef2b1a",
    productTypeId: "Communication Processor",
    variantId: "20ma-tty",
    suffix: "، پردازندهٔ ارتباطی است.",
    sourceGroup: "cp",
  },
] as const;
const expectedBatch17ProductIds = expectedBatch17Products.map(
  (entry) => entry.productId
);
const expectedBatch17ProductIdSet = new Set<ProductId>(
  expectedBatch17ProductIds
);
const registeredBatch17Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch17ProductIdSet.has(entry.productId)
);
const registeredBatch17ReviewRoles = registeredBatch17Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedBatch17ProductIdSet.size === 5 &&
    expectedBatch17ProductIds.every(
      (id) => !expectedCompletedThroughBatch16ProductIdSet.has(id)
    ) &&
    JSON.stringify(registeredBatch17Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch17ProductIds) &&
    new Set(registeredBatch17ReviewRoles).size === 10 &&
    registeredBatch17ReviewRoles.every(isApprovedReview),
  "Batch 17 must contain five exact ordered drafts and ten distinct approved role objects, disjoint from completed Batches 01-16."
);
const registeredBatch17DraftRecords = registeredBatch17Drafts.map(
  (entry, index) => {
    const expected = expectedBatch17Products[index];
    const { productId, partNumber, productTypeId, variantId, suffix } =
      expected;
    const sources = [...s7300IM, ...s7300CP].filter(
      (source) => source.id === productId || source.mlfb === partNumber
    );
    const matches = products.filter(
      (product) =>
        product.id === productId ||
        product.partNumber === partNumber ||
        product.manufacturerPartNumber === partNumber
    );
    const [source] = sources;
    const [product] = matches;
    const adaptedMatches =
      expected.sourceGroup === "im"
        ? s7300IM
            .filter((candidate) => candidate.id === productId)
            .map(mapSiemensS7300InterfaceModuleToProduct)
        : s7300CP
            .filter((candidate) => candidate.id === productId)
            .map(mapSiemensS7300CommunicationProcessorToProduct);
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === productId &&
        source.mlfb === partNumber &&
        source.productTypeId === productTypeId &&
        source.variantId === variantId &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === productId &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.productTypeId === productTypeId &&
        product.variantId === variantId &&
        adaptedMatches.length === 1 &&
        JSON.stringify(adaptedMatches[0]) === JSON.stringify(product) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      `Batch 17 source and production binding must be exact with zero overrides: ${productId}`
    );
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: partNumber },
      { kind: "text", value: suffix },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        deriveAllowedTechnicalTokens(product).has(partNumber),
      `Batch 17 must contain only the exact three segments and eligible MLFB: ${productId}`
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 17 must retain the exact PM-approved production hash: ${productId}`
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_17_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_17_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef.includes(`PM ${label} approval`) &&
          review.evidenceRef.includes(BATCH_17_DRAFT_COMMIT) &&
          review.evidenceRef.includes(productId) &&
          review.evidenceRef.includes(partNumber) &&
          review.evidenceRef.includes(`product type ${expected.approvalType}`) &&
          review.evidenceRef.includes("not the PM review timestamp") &&
          review.note?.startsWith(`${partNumber}:`) === true,
        `Batch 17 ${label} approval must bind the exact draft hash and separate recording observation: ${productId}`
      );
      if (role === "linguisticReview") {
        assert(
          review.note.includes("PM-approved exact Persian wording") &&
            review.note.includes("typed MLFB isolation") &&
            review.note.includes(
              "identical three-segment short and single-paragraph long descriptions"
            ),
          `Batch 17 linguistic approval must cover the reported Persian text: ${productId}`
        );
      } else {
        const evidenceFacts =
          partNumber === "6AG1365-0BA01-2AA0"
            ? [
                batch17ReadinessEvidence.siplusIm365.url,
                "parsed text",
                "printed p27",
                "printed p431",
                "Mall reader request returned 403",
                "distinct from the usable parsed manual",
              ]
            : partNumber === "6ES7174-0AA10-0AA0"
              ? [
                  batch17ReadinessEvidence.im174.url,
                  "indexed-only text",
                  "Entry 40787611",
                  "Table 1-1, printed p4",
                  "direct PDF reader request returned 403",
                  "no successful parsed read was observed",
                ]
              : partNumber === "6ES7178-4BH00-0AE0"
                ? [
                    batch17ReadinessEvidence.im1784.url,
                    "parsed German",
                    "Drive Interface",
                    "unnumbered cover and printed p1-1",
                    "Parsed English C79000-G7076-C178-01, printed p1-1",
                    "https://cache.industry.siemens.com/dl/files/389/1117389/att_22595/v1/IM1784_e.pdf",
                    "support-hosted English reader request returned 403",
                    "distinct from the usable cache-hosted parsed manuals",
                  ]
                : [
                    batch17ReadinessEvidence.cp340.url,
                    "parsed text",
                    "section 1.1 Table 1-1, printed p11",
                    "Both CP order numbers are listed separately",
                  ];
        assert(
          [
            ...evidenceFacts,
            "Printed pages are not assumed viewer indices.",
            "Visual inspection and successful direct-origin HTTP status were NOT OBSERVED.",
            "No fresh retrieval or lifecycle verification.",
          ].every((fact) => review.evidenceRef.includes(fact)) &&
            review.note.includes(
              `PM-approved exact MLFB identity and ${expected.approvalType} only.`
            ) &&
            review.note.includes("remain outside approval"),
          `Batch 17 technical approval must preserve narrow scope and distinct evidence/access limits: ${productId}`
        );
      }
    }
    return {
      productId,
      partNumber,
      variantId,
      renderedShortDescription: serializeProductCopyParagraphForSearch(
        entry.shortDescription
      ),
      freshContentHash,
    };
  }
);

const registeredBatch17ApprovalMutationResults =
  registeredBatch17Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(segment !== undefined, "Batch 17 mutation requires a first segment.");
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 17 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const expectedCompletedThroughBatch17ProductIdSet = new Set<ProductId>([
  ...expectedCompletedThroughBatch16ProductIdSet,
  ...expectedBatch17ProductIdSet,
]);
const registeredCompletedThroughBatch17Drafts =
  persianProductCopyDraftRegistry.filter((entry) =>
    expectedCompletedThroughBatch17ProductIdSet.has(entry.productId)
  );
assert(
  expectedCompletedThroughBatch17ProductIdSet.size === 85 &&
    registeredCompletedThroughBatch17Drafts.length === 85 &&
    new Set(
      registeredCompletedThroughBatch17Drafts.map((entry) => entry.productId)
    ).size === 85 &&
    registeredCompletedThroughBatch17Drafts.every((entry) => {
      const contentHash = createProductCopyContentHash(entry);
      return (
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash
      );
    }),
  "Completed Batches 01-17 must retain exactly eighty-five unique current dual-approved entries."
);

// Actual UTC recording observations, not the PM's review timestamps.
const BATCH_18_DRAFT_COMMIT = "501d607b7f141317cc72c39ceac94df9107a2c5e";
const BATCH_18_LINGUISTIC_RECORDED_AT = "2026-11-20T14:14:07Z";
const BATCH_18_TECHNICAL_RECORDED_AT = "2026-11-20T14:14:12Z";
assert(
  [BATCH_18_LINGUISTIC_RECORDED_AT, BATCH_18_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt.replace("Z", ".000Z")
  ) && BATCH_18_LINGUISTIC_RECORDED_AT < BATCH_18_TECHNICAL_RECORDED_AT,
  "Batch 18 role recording observations must be valid and separately ordered."
);
// Reused readiness references supplied for Batch 18; no new retrieval.
// Indexed evidence is distinct from parsed table text and canonical provenance.
const batch18ReadinessEvidence = {
  cp340: {
    reference: "Siemens CP 340 manual, Table 1-1, printed p11",
    url: "https://cache.industry.siemens.com/dl/files/332/1137332/att_24649/v1/s7300_cp340_manual_en_en-US.pdf",
    access: "reused parsed readiness text",
    orderNumbers: ["6ES7340-1CH02-0AE0"],
    productType: "communication processor",
  },
  cp341App: {
    reference: "Siemens application document, Table 2-7",
    url: "https://support.industry.siemens.com/cs/attachments/25545680/25545680_sms_md720-3_library_v13_v1_0_en.pdf",
    access: "reused parsed readiness text",
    orderNumbers: ["6ES7341-1AH01-0AE0"],
    productType: "communication processor",
  },
  cp34102: {
    reference: "Siemens CP 341 manual, Table 1-1, printed p11",
    access: "reused parsed readiness text",
    orderNumbers: [
      "6ES7341-1AH02-0AE0",
      "6ES7341-1BH02-0AE0",
      "6ES7341-1CH02-0AE0",
    ],
    productType: "communication processor",
  },
  cp341Bh01Index: {
    reference: "Siemens SiePortal exact entry 6ES7341-1BH01-0AE0",
    access: "reused indexed-only readiness text",
    orderNumbers: ["6ES7341-1BH01-0AE0"],
    productType: "communication processor",
  },
  cp341Ch01Index: {
    reference: "Siemens SiePortal exact entry 6ES7341-1CH01-0AE0",
    access: "reused indexed-only readiness text",
    orderNumbers: ["6ES7341-1CH01-0AE0"],
    productType: "communication processor",
  },
  cp3425: {
    reference: "Siemens CP 342-5 manual, section 1.6.1, printed p21",
    url: "https://support.industry.siemens.com/cs/attachments/67225941/HY_S7-CPs-PB_76.pdf",
    access: "reused parsed readiness text",
    orderNumbers: [
      "6GK7342-5DA01-0XE0",
      "6GK7342-5DA02-0XE0",
      "6GK7342-5DA03-0XE0",
    ],
    productType: "communication processor",
  },
} as const;
const expectedBatch18Products = [
  {
    position: 125,
    productId: "siemens-s7-300-cp340-rs422-485-1ch02-0ae0",
    partNumber: "6ES7340-1CH02-0AE0",
    reviewedContentHash:
      "sha256:aba8acd2bef88ef918679ddbf9d386cf93edf2811e3ddb8ee9a486454b23d69e",
    variantId: "rs422-485",
    evidenceKey: "cp340",
  },
  {
    position: 126,
    productId: "siemens-s7-300-cp341-rs232-1ah01-0ae0",
    partNumber: "6ES7341-1AH01-0AE0",
    reviewedContentHash:
      "sha256:6f09a7720bdd3e80297ff389346d4d855e6c31a98fa58cb257695781e21244da",
    variantId: "rs232",
    evidenceKey: "cp341App",
  },
  {
    position: 127,
    productId: "siemens-s7-300-cp341-rs232-1ah02-0ae0",
    partNumber: "6ES7341-1AH02-0AE0",
    reviewedContentHash:
      "sha256:55ee921e9c25f37520ba51943fa55a2340f108b5293ca71665bed033b0df7e4d",
    variantId: "rs232",
    evidenceKey: "cp34102",
  },
  {
    position: 128,
    productId: "siemens-s7-300-cp341-tty-1bh01-0ae0",
    partNumber: "6ES7341-1BH01-0AE0",
    reviewedContentHash:
      "sha256:c391cd43cb1f39709f582c559fb1eeb4a7a06dfd792e39a7445c953e113fd453",
    variantId: "20ma-tty",
    evidenceKey: "cp341Bh01Index",
  },
  {
    position: 129,
    productId: "siemens-s7-300-cp341-tty-1bh02-0ae0",
    partNumber: "6ES7341-1BH02-0AE0",
    reviewedContentHash:
      "sha256:eb75b535beed231d7ffb26c0050e589c602155b91d7f9528ed0c7d101d7c1648",
    variantId: "20ma-tty",
    evidenceKey: "cp34102",
  },
  {
    position: 130,
    productId: "siemens-s7-300-cp341-rs422-485-1ch01-0ae0",
    partNumber: "6ES7341-1CH01-0AE0",
    reviewedContentHash:
      "sha256:3bd9511024575a27995e6a1bbafaabb461c44564af5fd67421ac50cef66e0218",
    variantId: "rs422-485",
    evidenceKey: "cp341Ch01Index",
  },
  {
    position: 131,
    productId: "siemens-s7-300-cp341-rs422-485-1ch02-0ae0",
    partNumber: "6ES7341-1CH02-0AE0",
    reviewedContentHash:
      "sha256:bb7b8ec933cbfdb272082cdfd52f42140f0cf6b2b3ef5ce9d9b8b4483104da8f",
    variantId: "rs422-485",
    evidenceKey: "cp34102",
  },
  {
    position: 132,
    productId: "siemens-s7-300-cp342-5-da01-0xe0",
    partNumber: "6GK7342-5DA01-0XE0",
    reviewedContentHash:
      "sha256:f0c2854befb74fd5074f7ecb51cb9fdfc60c62ebb05230b9024cfa6032c8b1de",
    variantId: "profibus-dp",
    evidenceKey: "cp3425",
  },
  {
    position: 133,
    productId: "siemens-s7-300-cp342-5-da02-0xe0",
    partNumber: "6GK7342-5DA02-0XE0",
    reviewedContentHash:
      "sha256:14af9845640ae4ea389a52a7db7dde5f85496da3971aedeba8d1428f97970add",
    variantId: "profibus-dp",
    evidenceKey: "cp3425",
  },
  {
    position: 134,
    productId: "siemens-s7-300-cp342-5-da03-0xe0",
    partNumber: "6GK7342-5DA03-0XE0",
    reviewedContentHash:
      "sha256:1722e4274119a55e66faa33cbd3f44ab63d669554bc8ed4e428809711f2a1a3a",
    variantId: "profibus-dp",
    evidenceKey: "cp3425",
  },
] as const;
const expectedBatch18ProductIds = expectedBatch18Products.map(
  (entry) => entry.productId
);
const expectedBatch18ProductIdSet = new Set<ProductId>(
  expectedBatch18ProductIds
);
const registeredBatch18Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch18ProductIdSet.has(entry.productId)
);
const registeredBatch18ReviewRoles = registeredBatch18Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedBatch18ProductIdSet.size === 10 &&
    expectedBatch18ProductIds.every(
      (id) => !expectedCompletedThroughBatch17ProductIdSet.has(id)
    ) &&
    JSON.stringify(registeredBatch18Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch18ProductIds) &&
    new Set(registeredBatch18ReviewRoles).size === 20 &&
    registeredBatch18ReviewRoles.every(isApprovedReview),
  "Batch 18 must contain ten exact ordered drafts and twenty distinct approved role objects, disjoint from completed Batches 01-17."
);
const registeredBatch18DraftRecords = registeredBatch18Drafts.map(
  (entry, index) => {
    const expected = expectedBatch18Products[index];
    const { position, productId, partNumber, variantId, evidenceKey } = expected;
    const sources = s7300CP.filter(
      (source) => source.id === productId || source.mlfb === partNumber
    );
    const matches = products.filter(
      (product) =>
        product.id === productId ||
        product.partNumber === partNumber ||
        product.manufacturerPartNumber === partNumber
    );
    const [source] = sources;
    const [product] = matches;
    const adaptedMatches = s7300CP
      .filter((candidate) => candidate.id === productId)
      .map(mapSiemensS7300CommunicationProcessorToProduct);
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === productId &&
        source.mlfb === partNumber &&
        source.variantId === variantId &&
        source.productTypeId === "Communication Processor" &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === productId &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.variantId === variantId &&
        product.productTypeId === "Communication Processor" &&
        products.indexOf(product) + 1 === position &&
        adaptedMatches.length === 1 &&
        JSON.stringify(adaptedMatches[0]) === JSON.stringify(product) &&
        deriveAllowedTechnicalTokens(product).has(partNumber) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      `Batch 18 exact CP source/adapter/production binding and token eligibility must pass: ${productId}`
    );
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: partNumber },
      { kind: "text", value: "، پردازندهٔ ارتباطی است." },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        entry.shortDescription.every(
          (segment) => segment.value.normalize("NFC") === segment.value
        ),
      `Batch 18 linguistic draft check must retain exact wording, punctuation, NFC and three segment boundaries: ${productId}`
    );
    const evidence = batch18ReadinessEvidence[evidenceKey];
    assert(
      new Set<string>(evidence.orderNumbers).has(partNumber) &&
        evidence.productType === "communication processor",
      `Batch 18 technical draft check must use readiness evidence for the exact order number and narrow type: ${productId}`
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expected.reviewedContentHash,
      `Batch 18 must retain the exact PM-authorized production hash: ${productId}`
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_18_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_18_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          review.evidenceRef.includes(`PM-authorized ${label} approval`) &&
          review.evidenceRef.includes(BATCH_18_DRAFT_COMMIT) &&
          review.evidenceRef.includes(productId) &&
          review.evidenceRef.includes(partNumber) &&
          review.evidenceRef.includes("product type communication processor") &&
          review.evidenceRef.includes("not the PM review timestamp") &&
          review.note?.startsWith(`${partNumber}:`) === true,
        `Batch 18 ${label} approval must bind the exact draft hash and separate recording observation: ${productId}`
      );
      if (role === "linguisticReview") {
        assert(
          review.note.includes("PM-authorized exact Persian wording") &&
            review.note.includes("NFC normalization") &&
            review.note.includes("typed MLFB isolation and segment boundaries") &&
            review.note.includes(
              "identical three-segment short and single-paragraph long descriptions"
            ),
          `Batch 18 linguistic approval must cover the reported Persian text: ${productId}`
        );
      } else {
        assert(
          [
            evidence.reference,
            evidence.access,
            "Printed pages are not assumed viewer indices.",
            "No fresh retrieval or visual inspection.",
            "Visual inspection and successful direct-origin HTTP status were NOT OBSERVED.",
          ].every((fact) => review.evidenceRef.includes(fact)) &&
            review.note.includes(
              "PM-authorized exact MLFB identity and communication-processor type only."
            ) &&
            review.note.includes("remain outside approval") &&
            (!evidence.access.includes("indexed-only") ||
              review.evidenceRef.includes(
                "Indexed text is not a parsed document read."
              )),
          `Batch 18 technical approval must preserve narrow type and indexed/parsed distinctions: ${productId}`
        );
      }
    }
    return {
      position,
      productId,
      partNumber,
      variantId,
      renderedShortDescription: entry.shortDescription
        .map((segment) => segment.value)
        .join(""),
      freshContentHash,
      linguisticDraftReview: {
        result: "PASS",
        wording: "Exact requested Persian introduction and product-type suffix",
        punctuation: "Exact Persian comma, spacing and final period",
        unicodeNormalization: "NFC",
        segmentBoundaries: "text / exact technical MLFB / text",
      },
      technicalDraftReview: {
        result: "PASS",
        binding: "One source, one exact CP adapter/production binding",
        manufacturerSupportedType: evidence.productType,
        evidenceReference: evidence.reference,
        evidenceAccess: evidence.access,
      },
    };
  }
);

const registeredBatch18ApprovalMutationResults =
  registeredBatch18Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(segment !== undefined, "Batch 18 mutation requires a first segment.");
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 18 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

// Actual UTC recording observations, not the PM's review timestamps.
const BATCH_19_DRAFT_COMMIT = "4a36081e61e9a2ea3fe6e9d403b1edac053f1184";
const BATCH_19_LINGUISTIC_RECORDED_AT = "2026-11-21T19:34:16.592Z";
const BATCH_19_TECHNICAL_RECORDED_AT = "2026-11-21T19:34:43.097Z";
assert(
  [BATCH_19_LINGUISTIC_RECORDED_AT, BATCH_19_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt
  ) && BATCH_19_LINGUISTIC_RECORDED_AT < BATCH_19_TECHNICAL_RECORDED_AT,
  "Batch 19 role recording observations must be valid and separately ordered."
);
// Reused readiness evidence only; no fresh retrieval or visual inspection.
// Reader 403s (support PDFs and SIPLUS Mall), the ST 70 reader size limit
// (25,626,498 bytes), and GX30's JavaScript shell supplied no usable evidence.
// Successful direct-origin HTTP status was NOT OBSERVED. Printed pages are
// not assumed viewer indices. No FA01 characteristics are transferred to FA00.
const batch19ReadinessEvidence = {
  A: {
    reference:
      "Siemens February 2025 supplier declaration, CP300 table, printed p12",
    url: "https://cache.industry.siemens.com/dl/files/142/109983142/att_1315774/v1/c02-suppliers_declaration_of_conformity_2025-02-05.pdf",
    access: "reused parsed readiness text; identity/type only",
    orderNumbers: ["6GK7342-5DF00-0XE0"],
    productType: "communication processor",
  },
  B: {
    reference:
      "Siemens ST 70 (2021), SIPLUS CP 342-5 ordering data; printed page unestablished",
    url: "https://cache.industry.siemens.com/dl/files/167/109744167/att_1076941/v1/simatic-st70-complete-english-2021.pdf",
    access: "reused indexed-only readiness text; not a parsed document read",
    orderNumbers: ["6AG1342-5DA03-7XE0"],
    productType: "communication processor",
  },
  C: {
    reference: "Siemens CP 343-1 manual, 02/2003, cover and printed pB1–5",
    url: "https://cache.industry.siemens.com/dl/files/308/8777308/att_39695/v1/ghb3431_e.pdf",
    access: "reused parsed readiness text",
    orderNumbers: ["6GK7343-1EX11-0XE0"],
    productType: "communication processor",
  },
  D: {
    reference:
      "Siemens LCom manual, 02/2013, section 1.4 Table 1–1 CP types, printed p29",
    url: "https://cache.industry.siemens.com/dl/files/385/48955385/att_10839/v2/lcom_communication_library_simatic_v1_2.pdf",
    access: "reused parsed readiness text",
    orderNumbers: [
      "6GK7343-1EX21-0XE0",
      "6GK7343-1EX30-0XE0",
      "6GK7343-1CX10-0XE0",
      "6GK7343-1GX30-0XE0",
      "6GK7343-1GX31-0XE0",
    ],
    productType: "communication processor",
  },
  E: {
    reference:
      "Siemens CP 343-5 manual, 05/2023; FA00 section 5.1.1 printed p23; FA01 printed pp3 and 23",
    url: "https://cache.industry.siemens.com/dl/files/841/8778841/att_1143234/v1/GHB_CP343-5_76.pdf",
    access: "reused parsed readiness text; exact MLFB and type only",
    orderNumbers: ["6GK7343-5FA00-0XE0", "6GK7343-5FA01-0XE0"],
    productType: "communication processor",
  },
} as const;
const expectedBatch19Products = [
  {
    position: 135,
    productId: "siemens-s7-300-cp342-5-fo-df00-0xe0",
    partNumber: "6GK7342-5DF00-0XE0",
    reviewedContentHash:
      "sha256:8a10bbefa9b9dfcba577ee23d8e88e514f94efeb3042f261c079f28d6f4b212d",
    variantId: "profibus-dp-fo",
    evidenceKey: "A",
  },
  {
    position: 136,
    productId: "siemens-siplus-s7-300-cp342-5-da03-7xe0",
    partNumber: "6AG1342-5DA03-7XE0",
    reviewedContentHash:
      "sha256:8bca868dafcd12e26879a31eb0464245218ba1b0d4a812a8f38feae971d402d1",
    variantId: "profibus-dp",
    evidenceKey: "B",
  },
  {
    position: 137,
    productId: "siemens-s7-300-cp343-1-ex11-0xe0",
    partNumber: "6GK7343-1EX11-0XE0",
    reviewedContentHash:
      "sha256:7c51652d24a1e3dfa619a7c81abdb15e164b5ae572c6ac0a17412156e5655d50",
    variantId: "industrial-ethernet",
    evidenceKey: "C",
  },
  {
    position: 138,
    productId: "siemens-s7-300-cp343-1-ex21-0xe0",
    partNumber: "6GK7343-1EX21-0XE0",
    reviewedContentHash:
      "sha256:eb4c9ad10b1147ae31a3fae2e60b5d86d819dedf0ad4524fec659914c5e34f6a",
    variantId: "industrial-ethernet",
    evidenceKey: "D",
  },
  {
    position: 139,
    productId: "siemens-s7-300-cp343-1-ex30-0xe0",
    partNumber: "6GK7343-1EX30-0XE0",
    reviewedContentHash:
      "sha256:1ecd4cbfd29c2c1155c9ee9ba4910f600484db58b8d7079f024da0d93b5a4c3c",
    variantId: "industrial-ethernet",
    evidenceKey: "D",
  },
  {
    position: 140,
    productId: "siemens-s7-300-cp343-1-lean-cx10-0xe0",
    partNumber: "6GK7343-1CX10-0XE0",
    reviewedContentHash:
      "sha256:7136ddd83d4ffe861db78cc932cc1952e9547d30b1a42da77737c0d02c5c5eff",
    variantId: "industrial-ethernet-lean",
    evidenceKey: "D",
  },
  {
    position: 141,
    productId: "siemens-s7-300-cp343-1-advanced-gx30-0xe0",
    partNumber: "6GK7343-1GX30-0XE0",
    reviewedContentHash:
      "sha256:897acc1cae3276fcc331b67cda48c8b779fb82ee2e3c9439a8d364620631603d",
    variantId: "industrial-ethernet-advanced",
    evidenceKey: "D",
  },
  {
    position: 142,
    productId: "siemens-s7-300-cp343-1-advanced-gx31-0xe0",
    partNumber: "6GK7343-1GX31-0XE0",
    reviewedContentHash:
      "sha256:e23e8f722fc337c9c9c9fc20861f3a53b489369e3ed7dc0d928a756c65660aa2",
    variantId: "industrial-ethernet-advanced",
    evidenceKey: "D",
  },
  {
    position: 143,
    productId: "siemens-s7-300-cp343-5-fa00-0xe0",
    partNumber: "6GK7343-5FA00-0XE0",
    reviewedContentHash:
      "sha256:70f50596cc143e6d61be0b890a42961e3bdf786067a5ec8e4efbd9a4b2b935d5",
    variantId: "profibus-fms",
    evidenceKey: "E",
  },
  {
    position: 144,
    productId: "siemens-s7-300-cp343-5-fa01-0xe0",
    partNumber: "6GK7343-5FA01-0XE0",
    reviewedContentHash:
      "sha256:e7117ea60b88d95799b82a10acca66e54f1f17a00abe30be4374ab4a514c3f43",
    variantId: "profibus-fms",
    evidenceKey: "E",
  },
] as const;
const expectedCompletedThroughBatch18ProductIdSet = new Set<ProductId>([
  ...expectedCompletedThroughBatch17ProductIdSet,
  ...expectedBatch18ProductIdSet,
]);
const registeredCompletedThroughBatch18Drafts =
  persianProductCopyDraftRegistry.filter((entry) =>
    expectedCompletedThroughBatch18ProductIdSet.has(entry.productId)
  );
assert(
  expectedCompletedThroughBatch18ProductIdSet.size === 95 &&
    registeredCompletedThroughBatch18Drafts.length === 95 &&
    JSON.stringify(
      registeredCompletedThroughBatch18Drafts.map((entry) => entry.productId)
    ) === JSON.stringify([...expectedCompletedThroughBatch18ProductIdSet]) &&
    registeredCompletedThroughBatch18Drafts.every((entry) => {
      const contentHash = createProductCopyContentHash(entry);
      return (
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash
      );
    }),
  "Completed Batches 01-18 must retain exactly 95 ordered current dual-approved entries."
);
const expectedBatch19ProductIds = expectedBatch19Products.map(
  (entry) => entry.productId
);
const expectedBatch19ProductIdSet = new Set<ProductId>(
  expectedBatch19ProductIds
);
const registeredBatch19Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch19ProductIdSet.has(entry.productId)
);
const registeredBatch19ReviewRoles = registeredBatch19Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedBatch19ProductIdSet.size === 10 &&
    expectedBatch19ProductIds.every(
      (id) => !expectedCompletedThroughBatch18ProductIdSet.has(id)
    ) &&
    JSON.stringify(registeredBatch19Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch19ProductIds) &&
    JSON.stringify(
      persianProductCopyDraftRegistry
        .filter((entry) =>
          expectedCompletedThroughBatch18ProductIdSet.has(entry.productId) ||
          expectedBatch19ProductIdSet.has(entry.productId)
        )
        .map((entry) => entry.productId)
    ) ===
      JSON.stringify([
        ...expectedCompletedThroughBatch18ProductIdSet,
        ...expectedBatch19ProductIds,
      ]) &&
    new Set(registeredBatch19ReviewRoles).size === 20 &&
    registeredBatch19ReviewRoles.every(isApprovedReview),
  "Batch 19 must retain ten disjoint ordered drafts with twenty distinct approved role objects."
);
const registeredBatch19DraftRecords = registeredBatch19Drafts.map(
  (entry, index) => {
    const { position, productId, partNumber, variantId, evidenceKey } =
      expectedBatch19Products[index];
    const sources = s7300CP.filter(
      (source) => source.id === productId || source.mlfb === partNumber
    );
    const matches = products.filter(
      (product) =>
        product.id === productId ||
        product.partNumber === partNumber ||
        product.manufacturerPartNumber === partNumber
    );
    const [source] = sources;
    const [product] = matches;
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === productId &&
        source.mlfb === partNumber &&
        source.variantId === variantId &&
        source.familyId === "S7-300" &&
        source.productTypeId === "Communication Processor" &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === productId &&
        product.familyId === "S7-300" &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.variantId === variantId &&
        product.productTypeId === "Communication Processor" &&
        products.indexOf(product) + 1 === position &&
        JSON.stringify(
          mapSiemensS7300CommunicationProcessorToProduct(source)
        ) === JSON.stringify(product) &&
        deriveAllowedTechnicalTokens(product).has(partNumber) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      "Batch 19 exact source/CP adapter/production binding, variant and token must pass: " +
        productId
    );
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: partNumber },
      { kind: "text", value: "، پردازندهٔ ارتباطی است." },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        entry.shortDescription.every(
          (segment) => segment.value.normalize("NFC") === segment.value
        ),
      "Batch 19 linguistic draft check must retain exact wording, punctuation, NFC and segment boundaries: " +
        productId
    );
    const evidence = batch19ReadinessEvidence[evidenceKey];
    assert(
      new Set<string>(evidence.orderNumbers).has(partNumber) &&
        evidence.productType === "communication processor",
      "Batch 19 technical draft check must use exact-order identity/type evidence: " +
        productId
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expectedBatch19Products[index].reviewedContentHash,
      "Batch 19 must retain the exact PM-authorized production hash: " +
        productId
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_19_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_19_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          Reflect.ownKeys(review).length === 6 &&
          review.evidenceRef.includes("PM-authorized " + label + " approval") &&
          review.evidenceRef.includes(BATCH_19_DRAFT_COMMIT) &&
          review.evidenceRef.includes(productId) &&
          review.evidenceRef.includes(partNumber) &&
          review.evidenceRef.includes("product type communication processor") &&
          review.evidenceRef.includes("not the PM review timestamp") &&
          review.note?.startsWith(partNumber + ":") === true,
        "Batch 19 " +
          label +
          " approval must bind the reviewed draft hash and separate UTC recording observation: " +
          productId
      );
      if (role === "linguisticReview") {
        assert(
          [
            "PM-authorized exact Persian wording",
            "NFC normalization",
            "typed MLFB isolation and segment boundaries",
            "identical three-segment short and single-paragraph long descriptions",
          ].every((fact) => review.note.includes(fact)),
          "Batch 19 linguistic approval must cover exact Persian text and typed segments: " +
            productId
        );
      } else {
        assert(
          [
            evidence.reference,
            evidence.access,
            evidence.url,
            "Printed pages are not assumed viewer indices.",
            "No fresh retrieval or visual inspection.",
            "Visual inspection and successful direct-origin HTTP status were NOT OBSERVED.",
            "Reported reader 403s, the ST 70 reader size limit (25,626,498 bytes), and the GX30 JavaScript shell are distinct from usable evidence.",
          ].every((fact) => review.evidenceRef.includes(fact)) &&
            review.note.includes(
              "PM-authorized exact MLFB identity and communication-processor type only."
            ) &&
            review.note.includes("remain outside approval") &&
            (evidenceKey !== "B" ||
              [
                "Indexed text is not a parsed document read.",
                "Printed page is unestablished.",
                "no standard CP 342-5 code is substituted.",
              ].every((fact) => review.evidenceRef.includes(fact))) &&
            (evidenceKey !== "E" ||
              review.evidenceRef.includes(
                "FA00 and FA01 are separate exact identities; no FA01 characteristics are transferred to FA00."
              )),
          "Batch 19 technical approval must preserve exact identity/type and evidence limits: " +
            productId
        );
      }
    }
    return {
      position,
      productId,
      partNumber,
      variantId,
      renderedShortDescription: entry.shortDescription
        .map((segment) => segment.value)
        .join(""),
      freshContentHash,
      linguisticDraftReview: {
        result: "PASS",
        wording: "Exact requested Persian introduction and product-type suffix",
        punctuation: "Exact Persian comma, spacing and final period",
        unicodeNormalization: "NFC",
        segmentBoundaries: "text / exact technical MLFB / text",
        approvalDecision: entry.linguisticReview.decision,
      },
      technicalDraftReview: {
        result: "PASS",
        binding: "One exact source/CP adapter/production binding",
        manufacturerSupportedType: evidence.productType,
        evidenceReference: evidence.reference,
        evidenceAccess: evidence.access,
        approvalDecision: entry.technicalReview.decision,
      },
    };
  }
);

const registeredBatch19ApprovalMutationResults =
  registeredBatch19Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(segment !== undefined, "Batch 19 mutation requires a first segment.");
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 19 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const BATCH_20_DRAFT_COMMIT = "2a3db21d07e60e2f86bbc78f525af3963ca7ba08";
// Actual UTC recording observations, not PM review timestamps.
const BATCH_20_LINGUISTIC_RECORDED_AT = "2026-11-22T18:39:22.991Z";
const BATCH_20_TECHNICAL_RECORDED_AT = "2026-11-22T18:39:23.902Z";
assert(
  [BATCH_20_LINGUISTIC_RECORDED_AT, BATCH_20_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt
  ) && BATCH_20_LINGUISTIC_RECORDED_AT < BATCH_20_TECHNICAL_RECORDED_AT,
  "Batch 20 role recording observations must be valid and separately ordered."
);

// Reused readiness evidence for exact identity and product type only.
// Parsed text, indexed text and failed reader requests remain distinct.
const batch20ReadinessEvidence = {
  A: {
    reference:
      "PCS 7 AS-Interface Library V9.0 SP2, section 1.7.2 Supported modules, printed p19 (four exact identities); AS-Interface system manual, section 6.1.3.2, printed p94 (AH00/AH10 type)",
    urls: [
      "https://cache.industry.siemens.com/dl/files/336/109773336/att_1004103/v1/manual_asi_pcs7_library_v90sp2_en-US.pdf?download=true",
      "https://cache.industry.siemens.com/dl/files/840/26250840/att_109960/v1/AS-Interface_System-Manual_2008-11_X-2010-09_en-US.pdf",
    ],
    access:
      "reused parsed library text; system-manual type evidence is indexed-only, not a parsed read",
    orderNumbers: [
      "6GK7343-2AH00-0XA0",
      "6GK7343-2AH01-0XA0",
      "6GK7343-2AH10-0XA0",
      "6GK7343-2AH11-0XA0",
    ],
    typeOrderNumbers: ["6GK7343-2AH00-0XA0", "6GK7343-2AH10-0XA0"],
    productType: "communication processor",
  },
  B: {
    reference:
      "Siemens IC 10 (2025), selection and ordering data, printed p2/40 (CP 343-2 AH01 and CP 343-2P AH11 type)",
    urls: [
      "https://cache.industry.siemens.com/dl/files/994/109771994/att_1311260/v1/SIRIUS_IC10_chap02_English_2025_202501240945406042.pdf",
    ],
    access: "reused indexed-only readiness text; not a parsed document read",
    orderNumbers: ["6GK7343-2AH01-0XA0", "6GK7343-2AH11-0XA0"],
    typeOrderNumbers: ["6GK7343-2AH01-0XA0", "6GK7343-2AH11-0XA0"],
    productType: "communication processor",
  },
  C: {
    reference:
      "Released Modules V8.0, section 13.2, printed p77 (both CP 342-2 identities); CP 342-2 manual, printed pA-1 (AH00) and pC-1 (product type)",
    urls: [
      "https://cache.industry.siemens.com/dl/files/475/61187475/att_62477/v1/S7pcshwb_en-US.pdf",
      "https://cache.industry.siemens.com/dl/files/328/1123328/att_80869/v1/CP342_e.pdf?download=true",
    ],
    access:
      "reused parsed readiness text; CP 342-2 glossary establishes type, without transferring AH00 characteristics to AH01",
    orderNumbers: ["6GK7342-2AH00-0XA0", "6GK7342-2AH01-0XA0"],
    typeOrderNumbers: ["6GK7342-2AH00-0XA0", "6GK7342-2AH01-0XA0"],
    productType: "communication processor",
  },
  D: {
    reference:
      "Exact BA00 Siemens SiePortal entry (type); Siemens routing overview, printed p1/2 (exact identity)",
    urls: [
      "https://sieportal.siemens.com/en-ww/products-services/detail/6GK7343-1BA00-0XE0?tree=CatalogTree",
      "https://cache.industry.siemens.com/dl/files/459/584459/att_109849/v7/584459_overview_cps_en.pdf",
    ],
    access:
      "reused indexed-only SiePortal type text and parsed routing-overview identity text",
    orderNumbers: ["6GK7343-1BA00-0XE0"],
    typeOrderNumbers: ["6GK7343-1BA00-0XE0"],
    productType: "communication processor",
  },
  E: {
    reference:
      "Siemens CP 343-1 IT manual, 06/2003, cover and printed ppB3-5/B3-22; GX00 predecessor is separately identified in section 7.2, pB3-22",
    urls: [
      "https://cache.industry.siemens.com/dl/files/544/8776544/att_104755/v1/ghb3431it_e.pdf",
    ],
    access:
      "reused parsed readiness text; GX00, GX11 and GX20 remain distinct, without transfer of newer characteristics to GX00",
    orderNumbers: [
      "6GK7343-1GX00-0XE0",
      "6GK7343-1GX11-0XE0",
      "6GK7343-1GX20-0XE0",
    ],
    typeOrderNumbers: [
      "6GK7343-1GX00-0XE0",
      "6GK7343-1GX11-0XE0",
      "6GK7343-1GX20-0XE0",
    ],
    productType: "communication processor",
  },
} as const;
const batch20ReadinessEvidenceLimits = {
  freshManufacturerRetrieval: "NOT RUN",
  visualInspection: "NOT OBSERVED",
  successfulDirectOriginHttpStatus: "NOT OBSERVED",
  printedPages: "Printed pages are not assumed viewer indices.",
  failedReaderRequests: [
    "Reader 403s for the canonical AS-Interface library, Released Modules and 78906145.pdf supplied no parsed evidence.",
    "The IC 10 reader request returned 404; its usable evidence remains indexed-only.",
    "The system-manual reader rejected 40,107,922 bytes; this is a reader size limit, not a Siemens-origin HTTP status.",
    "Direct BA00 SiePortal access returned a JavaScript shell, distinct from indexed type evidence.",
  ],
  familyBoundary:
    "All ten are S7-300 communication processors; positions 150/151 mark an AS-Interface to ISO/IT subfamily boundary, outside copy claims.",
  excludedClaims:
    "Titles, interfaces, protocols, performance, compatibility, lifecycle, certification and availability are outside the copy scope.",
} as const;
const expectedBatch20Products = [
  {
    position: 145,
    productId: "siemens-s7-300-cp343-2-ah00-0xa0",
    partNumber: "6GK7343-2AH00-0XA0",
    reviewedContentHash:
      "sha256:6ec21d4284b83227075b250107e828f28a528048f6d24cda84cf8ba97211535c",
    variantId: "as-interface",
    evidenceKeys: ["A"],
  },
  {
    position: 146,
    productId: "siemens-s7-300-cp343-2-ah01-0xa0",
    partNumber: "6GK7343-2AH01-0XA0",
    reviewedContentHash:
      "sha256:7bbc35c13b6d09501a026d8691b7b4cd733cdcf3d1925f80909483f8fac64fb5",
    variantId: "as-interface",
    evidenceKeys: ["A", "B"],
  },
  {
    position: 147,
    productId: "siemens-s7-300-cp343-2p-ah10-0xa0",
    partNumber: "6GK7343-2AH10-0XA0",
    reviewedContentHash:
      "sha256:0b5f9facca8df37c940cdc94e91ad4260c7e2e980b4b437847a9e5c73c284b2e",
    variantId: "as-interface-plus",
    evidenceKeys: ["A"],
  },
  {
    position: 148,
    productId: "siemens-s7-300-cp343-2p-ah11-0xa0",
    partNumber: "6GK7343-2AH11-0XA0",
    reviewedContentHash:
      "sha256:e074ff6ed8b1e2944502fdfe868a73ddef692e39dfe0189cd05c259cc1375930",
    variantId: "as-interface-plus",
    evidenceKeys: ["A", "B"],
  },
  {
    position: 149,
    productId: "siemens-s7-300-cp342-2-ah00-0xa0",
    partNumber: "6GK7342-2AH00-0XA0",
    reviewedContentHash:
      "sha256:4344cfdc77d02e1e21104238889943752cbf04fdb8217c7f0e52dfdfc66b1000",
    variantId: "as-interface",
    evidenceKeys: ["C"],
  },
  {
    position: 150,
    productId: "siemens-s7-300-cp342-2-ah01-0xa0",
    partNumber: "6GK7342-2AH01-0XA0",
    reviewedContentHash:
      "sha256:e9d6ae394bda5f9796f7f4191b1eadb69680c85a1caf8ce788f5dab4aaede64f",
    variantId: "as-interface",
    evidenceKeys: ["C"],
  },
  {
    position: 151,
    productId: "siemens-s7-300-cp343-1-iso-ba00-0xe0",
    partNumber: "6GK7343-1BA00-0XE0",
    reviewedContentHash:
      "sha256:d3c8c1652d0daf8f1f8fafd5f3d7c492214cd7906a33fe48950e4b3221969f72",
    variantId: "industrial-ethernet-iso",
    evidenceKeys: ["D"],
  },
  {
    position: 152,
    productId: "siemens-s7-300-cp343-1it-gx00-0xe0",
    partNumber: "6GK7343-1GX00-0XE0",
    reviewedContentHash:
      "sha256:50dee404b38d6776774cfd358b2cf9e59318b537fd5eb846ffc97a8e367e3173",
    variantId: "industrial-ethernet-it",
    evidenceKeys: ["E"],
  },
  {
    position: 153,
    productId: "siemens-s7-300-cp343-1it-gx11-0xe0",
    partNumber: "6GK7343-1GX11-0XE0",
    reviewedContentHash:
      "sha256:948ae7bdabeee1f3189079888ecd7347e6115678b071de033dfc9fb2a57d6904",
    variantId: "industrial-ethernet-it",
    evidenceKeys: ["E"],
  },
  {
    position: 154,
    productId: "siemens-s7-300-cp343-1it-gx20-0xe0",
    partNumber: "6GK7343-1GX20-0XE0",
    reviewedContentHash:
      "sha256:6a9b8d5ebeca94afbf10ad0796b2c13347a69d28631727ae6ed14b4210a1f6f3",
    variantId: "industrial-ethernet-it",
    evidenceKeys: ["E"],
  },
] as const;
const expectedCompletedThroughBatch19ProductIdSet = new Set<ProductId>([
  ...expectedCompletedThroughBatch18ProductIdSet,
  ...expectedBatch19ProductIdSet,
]);
const registeredCompletedThroughBatch19Drafts =
  persianProductCopyDraftRegistry.filter((entry) =>
    expectedCompletedThroughBatch19ProductIdSet.has(entry.productId)
  );
assert(
  expectedCompletedThroughBatch19ProductIdSet.size === 105 &&
    registeredCompletedThroughBatch19Drafts.length === 105 &&
    JSON.stringify(
      registeredCompletedThroughBatch19Drafts.map((entry) => entry.productId)
    ) === JSON.stringify([...expectedCompletedThroughBatch19ProductIdSet]) &&
    registeredCompletedThroughBatch19Drafts.every((entry) => {
      const contentHash = createProductCopyContentHash(entry);
      return (
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash
      );
    }),
  "Completed Batches 01-19 must retain exactly 105 ordered current dual-approved entries."
);
const expectedBatch20ProductIds = expectedBatch20Products.map(
  (entry) => entry.productId
);
const expectedBatch20ProductIdSet = new Set<ProductId>(
  expectedBatch20ProductIds
);
const registeredBatch20Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch20ProductIdSet.has(entry.productId)
);
const registeredBatch20ReviewRoles = registeredBatch20Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedBatch20ProductIdSet.size === 10 &&
    expectedBatch20ProductIds.every(
      (id) => !expectedCompletedThroughBatch19ProductIdSet.has(id)
    ) &&
    JSON.stringify(registeredBatch20Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch20ProductIds) &&
    new Set(registeredBatch20ReviewRoles).size === 20 &&
    registeredBatch20ReviewRoles.every(isApprovedReview),
  "Batch 20 must append ten disjoint ordered drafts with twenty distinct approved role objects."
);
const expectedCompletedThroughBatch20ProductIdSet = new Set<ProductId>([
  ...expectedCompletedThroughBatch19ProductIdSet,
  ...expectedBatch20ProductIds,
]);
const registeredCompletedThroughBatch20Drafts =
  persianProductCopyDraftRegistry.filter((entry) =>
    expectedCompletedThroughBatch20ProductIdSet.has(entry.productId)
  );
assert(
  expectedCompletedThroughBatch20ProductIdSet.size === 115 &&
    registeredCompletedThroughBatch20Drafts.length === 115 &&
    JSON.stringify(
      registeredCompletedThroughBatch20Drafts.map((entry) => entry.productId)
    ) === JSON.stringify([...expectedCompletedThroughBatch20ProductIdSet]) &&
    registeredCompletedThroughBatch20Drafts.every((entry) => {
      const contentHash = createProductCopyContentHash(entry);
      return (
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash
      );
    }),
  "Completed Batches 01-20 must retain exactly 115 ordered current dual-approved entries."
);
const registeredBatch20DraftRecords = registeredBatch20Drafts.map(
  (entry, index) => {
    const { position, productId, partNumber, variantId, evidenceKeys } =
      expectedBatch20Products[index];
    const sources = s7300CP.filter(
      (source) => source.id === productId || source.mlfb === partNumber
    );
    const matches = products.filter(
      (product) =>
        product.id === productId ||
        product.partNumber === partNumber ||
        product.manufacturerPartNumber === partNumber
    );
    const [source] = sources;
    const [product] = matches;
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === productId &&
        source.mlfb === partNumber &&
        source.variantId === variantId &&
        source.familyId === "S7-300" &&
        source.productTypeId === "Communication Processor" &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === productId &&
        product.familyId === "S7-300" &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.variantId === variantId &&
        product.productTypeId === "Communication Processor" &&
        products.indexOf(product) + 1 === position &&
        JSON.stringify(
          mapSiemensS7300CommunicationProcessorToProduct(source)
        ) === JSON.stringify(product) &&
        deriveAllowedTechnicalTokens(product).has(partNumber) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      "Batch 20 exact source/CP adapter/production binding, variant and MLFB token must pass: " +
        productId
    );
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: partNumber },
      { kind: "text", value: "، پردازندهٔ ارتباطی است." },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        entry.shortDescription.every(
          (segment) => segment.value.normalize("NFC") === segment.value
        ),
      "Batch 20 linguistic draft check must retain exact wording, punctuation, NFC and segment boundaries: " +
        productId
    );
    const evidence = evidenceKeys.map((key) => batch20ReadinessEvidence[key]);
    assert(
      evidence.every((item) =>
        new Set<string>(item.orderNumbers).has(partNumber)
      ) &&
        evidence.some(
          (item) =>
            new Set<string>(item.typeOrderNumbers).has(partNumber) &&
            item.productType === "communication processor"
        ),
      "Batch 20 technical draft check must use exact-order identity and type evidence without revision substitution: " +
        productId
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expectedBatch20Products[index].reviewedContentHash,
      "Batch 20 must retain the exact PM-authorized production hash: " +
        productId
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_20_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_20_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      const expectedEvidenceRef =
        `PM-authorized ${label} approval in the supplied Batch 20 approval request; draft commit ${BATCH_20_DRAFT_COMMIT}; Product ${productId}; MLFB ${partNumber}; product type communication processor. Recording time is an actual UTC observation, not the PM review timestamp.` +
        (role === "technicalReview"
          ? evidenceKeys
              .map((key) => {
                const item = batch20ReadinessEvidence[key];
                return ` Reused readiness ${key}: ${item.reference}; ${item.access}; ${item.urls.join("; ")}.`;
              })
              .join("") +
            " Printed pages are not assumed viewer indices. No fresh retrieval or visual inspection. Visual inspection and successful direct-origin HTTP status were NOT OBSERVED. " +
            batch20ReadinessEvidenceLimits.failedReaderRequests.join(" ")
          : "");
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          Reflect.ownKeys(review).length === 6 &&
          review.evidenceRef === expectedEvidenceRef &&
          review.note?.startsWith(partNumber + ":") === true,
        "Batch 20 " +
          label +
          " approval must bind the reviewed hash, exact evidence and separate UTC recording observation: " +
          productId
      );
      assert(
        review.note ===
          (role === "linguisticReview"
            ? `${partNumber}: PM-authorized exact Persian wording, punctuation and spacing, NFC normalization, typed MLFB isolation and segment boundaries in identical three-segment short and single-paragraph long descriptions.`
            : `${partNumber}: PM-authorized exact MLFB identity and communication-processor type only. Model titles, interfaces, protocols, performance, compatibility, lifecycle, certification and availability remain outside approval.`),
        "Batch 20 " + label + " approval scope must remain exact: " + productId
      );
    }
    return {
      position,
      productId,
      partNumber,
      variantId,
      renderedShortDescription: entry.shortDescription
        .map((segment) => segment.value)
        .join(""),
      freshContentHash,
      linguisticDraftReview: {
        result: "PASS",
        wording: "Exact requested Persian introduction and product-type suffix",
        punctuation: "Exact Persian comma, spacing and final period",
        unicodeNormalization: "NFC",
        segmentBoundaries: "text / exact technical MLFB / text",
        approvalDecision: entry.linguisticReview.decision,
      },
      technicalDraftReview: {
        result: "PASS",
        binding: "One exact source/CP adapter/production binding",
        manufacturerSupportedType: "communication processor",
        evidenceKeys,
        evidenceReferences: evidence.map((item) => item.reference),
        evidenceAccess: evidence.map((item) => item.access),
        approvalDecision: entry.technicalReview.decision,
      },
    };
  }
);

const registeredBatch20ApprovalMutationResults =
  registeredBatch20Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(segment !== undefined, "Batch 20 mutation requires a first segment.");
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 20 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const BATCH_21_DRAFT_COMMIT = "c267ffa67444d21fdfe816221889246a96571120";
// Actual UTC recording observations, not PM review timestamps or GitHub reviews.
const BATCH_21_LINGUISTIC_RECORDED_AT = "2026-11-22T19:54:14.570Z";
const BATCH_21_TECHNICAL_RECORDED_AT = "2026-11-22T19:54:14.594Z";
assert(
  [BATCH_21_LINGUISTIC_RECORDED_AT, BATCH_21_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt
  ) && BATCH_21_LINGUISTIC_RECORDED_AT < BATCH_21_TECHNICAL_RECORDED_AT,
  "Batch 21 role recording observations must be valid and separately ordered."
);

// Reused Batch 21 readiness evidence supports exact identity and type only.
// Parsed rows, indexed type text and reader failures remain distinct.
const batch21ReadinessEvidence = {
  A: {
    reference:
      "Siemens supplier declaration, February 2025, printed p12, CP300 table; exact GX21, FX00 and BACnet identity/type rows only; no certification claim",
    urls: [
      "https://cache.industry.siemens.com/dl/files/142/109983142/att_1315774/v1/c02-suppliers_declaration_of_conformity_2025-02-05.pdf",
    ],
    access: "reused parsed readiness text; no certification claim",
    orderNumbers: [
      "6GK7343-1GX21-0XE0",
      "6GK7343-1FX00-0XE0",
      "6FL4343-1CX10-0XE0",
    ],
    typeOrderNumbers: [
      "6GK7343-1GX21-0XE0",
      "6GK7343-1FX00-0XE0",
      "6FL4343-1CX10-0XE0",
    ],
    productType: "communication processor",
  },
  B: {
    reference:
      "Siemens S7-routing note 78906145, section 2.3.2.2, S7 CP communication-processor table; printed pagination unestablished",
    urls: [
      "https://cache.industry.siemens.com/dl/files/145/78906145/att_76780/v1/78906145.pdf",
    ],
    access:
      "reused parsed exact-order rows and indexed Chinese type heading; the parsed Chinese heading is garbled; printed pagination unestablished",
    orderNumbers: [
      "6GK7343-1CX00-0XE0",
      "6GK7343-1EX00-0XE0",
      "6GK7343-1EX10-0XE0",
      "6GK7343-1EX20-0XE0",
      "6GK7343-1HX00-0XE0",
    ],
    typeOrderNumbers: [
      "6GK7343-1CX00-0XE0",
      "6GK7343-1EX00-0XE0",
      "6GK7343-1EX10-0XE0",
      "6GK7343-1EX20-0XE0",
      "6GK7343-1HX00-0XE0",
    ],
    productType: "communication processor",
  },
  C: {
    reference:
      "Siemens CP 343-1 Lean manual, 12/2018, C79000-G8976-C198-08; printed p3 for exact SIPLUS identity/type; section 7.3.2 printed p54 and Table 7-1 printed p55 separately identify CX00 as a predecessor",
    urls: [
      "https://cache.industry.siemens.com/dl/files/456/23643456/att_973772/v1/GH_CP343-1-Lean-CX10_76.pdf",
    ],
    access:
      "reused parsed readiness text; SIPLUS and standard codes remain distinct; no CX10 characteristics are transferred to CX00",
    orderNumbers: [
      "6GK7343-1CX00-0XE0",
      "6AG1343-1CX10-2XE0",
    ],
    typeOrderNumbers: ["6AG1343-1CX10-2XE0"],
    productType: "communication processor",
  },
  D: {
    reference:
      "Siemens CP 343-1 manual, 12/2018, C79000-G8976-C201-08; printed p3 for exact SIPLUS EX30 identity/type",
    urls: [
      "https://cache.industry.siemens.com/dl/files/272/24485272/att_973778/v1/GH_CP343-1-EX30_76.pdf",
    ],
    access:
      "reused parsed readiness text; exact SIPLUS EX30 code remains distinct from the standard EX30 code",
    orderNumbers: ["6AG1343-1EX30-7XE0"],
    typeOrderNumbers: ["6AG1343-1EX30-7XE0"],
    productType: "communication processor",
  },
  E: {
    reference:
      "Siemens routing overview, Entry 584459, printed p1/2; separate exact EX00, EX10, EX20 and HX00 identities",
    urls: [
      "https://cache.industry.siemens.com/dl/files/459/584459/att_109849/v7/584459_overview_cps_en.pdf",
    ],
    access:
      "reused parsed readiness identity corroboration only; product type comes from evidence B",
    orderNumbers: [
      "6GK7343-1EX00-0XE0",
      "6GK7343-1EX10-0XE0",
      "6GK7343-1EX20-0XE0",
      "6GK7343-1HX00-0XE0",
    ],
    typeOrderNumbers: [],
    productType: "communication processor",
  },
} as const;
const batch21ReadinessEvidenceLimits = {
  freshManufacturerRetrieval: "NOT RUN; reused readiness references",
  visualInspection: "NOT OBSERVED",
  successfulDirectOriginHttpStatus: "NOT OBSERVED",
  printedPages: "Printed pages are not assumed viewer indices.",
  failedReaderRequests: [
    "The IE_CP_S7-300_e.pdf canonical support-manual request returned a reader 403 and supplied no usable evidence.",
    "The hy_S7-CPs-IE_76.pdf canonical support-manual request returned a reader 403 and supplied no usable evidence.",
  ],
  familyBoundary:
    "All ten are S7-300 CP 343-1 communication processors; the IT-to-Advanced boundary after position 154 and the ERPC, BACnet, Lean, standard, PN and SIPLUS distinctions remain binding metadata outside copy claims.",
  revisionBoundary:
    "GX20/GX21, CX00/CX10, EX00/EX10/EX20/EX30, HX00 and the 6GK/6FL/6AG prefixes remain distinct; no characteristics are transferred between variants.",
  excludedClaims:
    "Model titles, interfaces, protocols, performance, compatibility, lifecycle, certification and availability are outside the copy scope.",
} as const;
const expectedBatch21Products = [
  {
    position: 155,
    productId: "siemens-s7-300-cp343-1-advanced-gx21-0xe0",
    partNumber: "6GK7343-1GX21-0XE0",
    reviewedContentHash:
      "sha256:88359626f1ad601d449430b1b90dfba03a9280504c9ca14429ec40631a9dd0b1",
    variantId: "industrial-ethernet-advanced",
    evidenceKeys: ["A"],
  },
  {
    position: 156,
    productId: "siemens-s7-300-cp343-1-erpc-fx00-0xe0",
    partNumber: "6GK7343-1FX00-0XE0",
    reviewedContentHash:
      "sha256:8f0dee9c1b276a78e5b1483357be30bb6a95a7cc2c4f58c610b38aae9a9673ad",
    variantId: "industrial-ethernet-erpc",
    evidenceKeys: ["A"],
  },
  {
    position: 157,
    productId: "siemens-s7-300-cp343-1-bacnet-cx10-0xe0",
    partNumber: "6FL4343-1CX10-0XE0",
    reviewedContentHash:
      "sha256:c57c0c123fbabfe64d0630d6268347caaa00fb2056c14bdee09969cce0e3cbb0",
    variantId: "bacnet",
    evidenceKeys: ["A"],
  },
  {
    position: 158,
    productId: "siemens-s7-300-cp343-1-lean-cx00-0xe0",
    partNumber: "6GK7343-1CX00-0XE0",
    reviewedContentHash:
      "sha256:6dba0342353992e6f23eee26807b21b47775429eefe35b8968b8d9563e3ef99f",
    variantId: "industrial-ethernet-lean",
    evidenceKeys: ["B", "C"],
  },
  {
    position: 159,
    productId: "siemens-siplus-s7-300-cp343-1-lean-cx10-2xe0",
    partNumber: "6AG1343-1CX10-2XE0",
    reviewedContentHash:
      "sha256:95424da2b03ded957fc7e65702fbb6c90a174ed42c3fbe21b4871da4b2edfa94",
    variantId: "industrial-ethernet-lean",
    evidenceKeys: ["C"],
  },
  {
    position: 160,
    productId: "siemens-s7-300-cp343-1-ex00-0xe0",
    partNumber: "6GK7343-1EX00-0XE0",
    reviewedContentHash:
      "sha256:59a970a5f52934f6d312282b0e9f6ce71399335e6b3954371758c5de4ecc9a8e",
    variantId: "industrial-ethernet",
    evidenceKeys: ["B", "E"],
  },
  {
    position: 161,
    productId: "siemens-s7-300-cp343-1-ex10-0xe0",
    partNumber: "6GK7343-1EX10-0XE0",
    reviewedContentHash:
      "sha256:561f3d48f5cc5d386586b9750871d16857a6297b7d9656ce284a32e7867ef3d9",
    variantId: "industrial-ethernet",
    evidenceKeys: ["B", "E"],
  },
  {
    position: 162,
    productId: "siemens-s7-300-cp343-1-ex20-0xe0",
    partNumber: "6GK7343-1EX20-0XE0",
    reviewedContentHash:
      "sha256:ff7cfa1bea74e03d43013facefcc5ca24501b40994540e8a58667401059442d0",
    variantId: "industrial-ethernet",
    evidenceKeys: ["B", "E"],
  },
  {
    position: 163,
    productId: "siemens-s7-300-cp343-1-pn-hx00-0xe0",
    partNumber: "6GK7343-1HX00-0XE0",
    reviewedContentHash:
      "sha256:163daf3e1695e70083332b8e097c862d553855424edc21d6b2fdeff79a6bda54",
    variantId: "profinet",
    evidenceKeys: ["B", "E"],
  },
  {
    position: 164,
    productId: "siemens-siplus-s7-300-cp343-1-ex30-7xe0",
    partNumber: "6AG1343-1EX30-7XE0",
    reviewedContentHash:
      "sha256:d9497214759749ab080156b63d1cd6ae1ad1012683fdbdc72cccc9ed3be9019d",
    variantId: "industrial-ethernet",
    evidenceKeys: ["D"],
  },
] as const;
const expectedBatch21ProductIds = expectedBatch21Products.map(
  (entry) => entry.productId
);
const expectedBatch21ProductIdSet = new Set<ProductId>(
  expectedBatch21ProductIds
);
const registeredBatch21Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch21ProductIdSet.has(entry.productId)
);
const registeredBatch21ReviewRoles = registeredBatch21Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedBatch21ProductIdSet.size === 10 &&
    expectedBatch21ProductIds.every(
      (id) => !expectedCompletedThroughBatch20ProductIdSet.has(id)
    ) &&
    JSON.stringify(registeredBatch21Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch21ProductIds) &&
    new Set(registeredBatch21ReviewRoles).size === 20 &&
    registeredBatch21ReviewRoles.every(isApprovedReview),
  "Batch 21 must retain ten disjoint ordered drafts with twenty distinct approved role objects."
);
const expectedCompletedThroughBatch21ProductIdSet = new Set<ProductId>([
  ...expectedCompletedThroughBatch20ProductIdSet,
  ...expectedBatch21ProductIds,
]);
const registeredCompletedThroughBatch21Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedCompletedThroughBatch21ProductIdSet.has(entry.productId)
);
assert(
  expectedCompletedThroughBatch21ProductIdSet.size === 125 &&
    registeredCompletedThroughBatch21Drafts.length === 125 &&
    JSON.stringify(
      registeredCompletedThroughBatch21Drafts.map((entry) => entry.productId)
    ) === JSON.stringify([...expectedCompletedThroughBatch21ProductIdSet]),
  "Completed Batches 01-21 must retain exact membership and order across 125 entries."
);
const registeredBatch21DraftRecords = registeredBatch21Drafts.map(
  (entry, index) => {
    const { position, productId, partNumber, variantId, evidenceKeys } =
      expectedBatch21Products[index];
    const sources = s7300CP.filter(
      (source) => source.id === productId || source.mlfb === partNumber
    );
    const matches = products.filter(
      (product) =>
        product.id === productId ||
        product.partNumber === partNumber ||
        product.manufacturerPartNumber === partNumber
    );
    const [source] = sources;
    const [product] = matches;
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === productId &&
        source.mlfb === partNumber &&
        source.variantId === variantId &&
        source.familyId === "S7-300" &&
        source.productTypeId === "Communication Processor" &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === productId &&
        product.familyId === "S7-300" &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.variantId === variantId &&
        product.productTypeId === "Communication Processor" &&
        products.indexOf(product) + 1 === position &&
        JSON.stringify(
          mapSiemensS7300CommunicationProcessorToProduct(source)
        ) === JSON.stringify(product) &&
        deriveAllowedTechnicalTokens(product).has(partNumber) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      "Batch 21 exact source/CP adapter/production binding, variant and MLFB token must pass: " +
        productId
    );
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: partNumber },
      { kind: "text", value: "، پردازندهٔ ارتباطی است." },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        entry.shortDescription.every(
          (segment) => segment.value.normalize("NFC") === segment.value
        ),
      "Batch 21 linguistic draft check must retain exact wording, punctuation, NFC and segment boundaries: " +
        productId
    );
    const evidence = evidenceKeys.map((key) => batch21ReadinessEvidence[key]);
    assert(
      evidence.every((item) =>
        new Set<string>(item.orderNumbers).has(partNumber)
      ) &&
        evidence.some(
          (item) =>
            new Set<string>(item.typeOrderNumbers).has(partNumber) &&
            item.productType === "communication processor"
        ),
      "Batch 21 technical draft check must use exact-order identity/type evidence without transferring variant characteristics: " +
        productId
    );
    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expectedBatch21Products[index].reviewedContentHash,
      "Batch 21 must retain the exact PM-authorized production hash: " +
        productId
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_21_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_21_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      const expectedEvidenceRef =
        `PM-authorized ${label} approval in the supplied Batch 21 approval request; draft commit ${BATCH_21_DRAFT_COMMIT}; Product ${productId}; MLFB ${partNumber}; product type communication processor. Recording time is an actual UTC observation, not the PM review timestamp. Registry role approvals are separate from GitHub reviews.` +
        (role === "technicalReview"
          ? evidenceKeys
              .map((key) => {
                const item = batch21ReadinessEvidence[key];
                return ` Reused readiness ${key}: ${item.reference}; ${item.access}; ${item.urls.join("; ")}.`;
              })
              .join("") +
            " Exact 6FL, 6GK and 6AG identities remain separate; CX00 is distinct from CX10, and both SIPLUS orders remain distinct from standard orders. No characteristics are transferred between variants." +
            " Printed pages are not assumed viewer indices. No fresh retrieval or visual inspection. Visual inspection and successful direct-origin HTTP status were NOT OBSERVED. " +
            batch21ReadinessEvidenceLimits.failedReaderRequests.join(" ")
          : "");
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          Reflect.ownKeys(review).length === 6 &&
          review.evidenceRef === expectedEvidenceRef &&
          review.note?.startsWith(partNumber + ":") === true,
        "Batch 21 " +
          label +
          " approval must bind the reviewed hash, exact evidence and separate UTC recording observation: " +
          productId
      );
      assert(
        review.note ===
          (role === "linguisticReview"
            ? `${partNumber}: PM-authorized exact Persian wording, punctuation and spacing, NFC normalization, typed MLFB isolation and segment boundaries in identical three-segment short and single-paragraph long descriptions.`
            : `${partNumber}: PM-authorized exact MLFB identity and communication-processor type only. Model titles, interfaces, protocols, performance, compatibility, lifecycle, certification and availability remain outside approval.`),
        "Batch 21 " + label + " approval scope must remain exact: " + productId
      );
    }
    return {
      position,
      productId,
      partNumber,
      variantId,
      renderedShortDescription: entry.shortDescription
        .map((segment) => segment.value)
        .join(""),
      freshContentHash,
      linguisticDraftReview: {
        result: "PASS",
        wording: "Exact requested Persian introduction and product-type suffix",
        punctuation: "Exact Persian comma, spacing and final period",
        unicodeNormalization: "NFC",
        segmentBoundaries: "text / exact technical MLFB / text",
        approvalDecision: entry.linguisticReview.decision,
      },
      technicalDraftReview: {
        result: "PASS",
        binding: "One exact source/CP adapter/production binding",
        manufacturerSupportedType: "communication processor",
        evidenceKeys,
        evidenceReferences: evidence.map((item) => item.reference),
        evidenceAccess: evidence.map((item) => item.access),
        approvalDecision: entry.technicalReview.decision,
      },
    };
  }
);

const registeredBatch21ApprovalMutationResults =
  registeredBatch21Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(segment !== undefined, "Batch 21 mutation requires a first segment.");
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 21 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const BATCH_22_DRAFT_COMMIT = "fd516cfdd92d494a2b17bc9e1f712734b3e004f1";
// Actual UTC recording observations, not PM review timestamps or GitHub reviews.
const BATCH_22_LINGUISTIC_RECORDED_AT = "2026-11-24T19:01:55.331Z";
const BATCH_22_TECHNICAL_RECORDED_AT = "2026-11-24T19:01:55.333Z";
assert(
  [BATCH_22_LINGUISTIC_RECORDED_AT, BATCH_22_TECHNICAL_RECORDED_AT].every(
    (recordedAt) =>
      Number.isFinite(Date.parse(recordedAt)) &&
      new Date(recordedAt).toISOString() === recordedAt
  ) && BATCH_22_LINGUISTIC_RECORDED_AT < BATCH_22_TECHNICAL_RECORDED_AT,
  "Batch 22 role recording observations must be valid and separately ordered."
);

// Batch 22 approval checks reuse readiness evidence; the two roles are recorded separately.
const batch22ReadinessEvidence: Record<
  string,
  {
    reference: string;
    url: string;
    access: string;
    orderTypes: Readonly<Record<string, string>>;
  }
> = {
  A: {
    reference:
      "Siemens CP 343-1 Advanced manual, 12/2018, C79000-G8976-C202-06; printed p4, Validity",
    url: "https://cache.industry.siemens.com/dl/files/619/62046619/att_973791/v1/GH_CP343-1-Adv-GX31_76.pdf",
    access:
      "Reused parsed readiness text; exact SIPLUS order identity/type only",
    orderTypes: {
      "6AG1343-1GX31-4XE0": "communication processor",
    },
  },
  B: {
    reference:
      "Siemens Entry 21536617, 28 February 2011; printed p1/1, module-name/order-number table",
    url: "https://cache.industry.siemens.com/dl/files/617/21536617/att_108718/v1/21536617_compatibility_fm_with_profibus_interfacemodules_en.pdf",
    access:
      "Reused parsed readiness text; module names and exact order numbers only; compatibility columns excluded",
    orderTypes: {
      "6ES7350-1AH03-0AE0": "counter module",
      "6ES7350-2AH01-0AE0": "counter module",
      "6ES7351-1AH01-0AE0": "positioning module",
      "6ES7351-1AH02-0AE0": "positioning module",
      "6ES7352-1AH02-0AE0": "electronic cam controller",
      "6ES7353-1AH01-0AE0": "positioning module",
      "6ES7354-1AH01-0AE0": "servo positioning module",
    },
  },
  C: {
    reference:
      "Siemens Fichas Tecnicas, August 2025; printed p17, Modulos de Funcao table",
    url: "https://assets.new.siemens.com/siemens/assets/api/uuid%3A6b83665d-d50c-409b-8e2e-05ccaa826c49/Fichas-tecnicas-MONTADA-AGO25_original.pdf",
    access:
      "Reused indexed readiness text; reader size limit supplied no parsed or visual evidence; exact 2AH00 identity/type only",
    orderTypes: {
      "6ES7350-2AH00-0AE0": "counter module",
    },
  },
  D: {
    reference:
      "Exact Siemens SIPLUS 6AG1350-2AH01-4AE0 datasheet; printed p1/4; indexed ST70 2021 ordering-table corroboration, catalog printed pagination unestablished",
    url: "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6AG1350-2AH01-4AE0",
    access:
      "Reused indexed readiness text only; exact datasheet reader 403; ST70 reader size limit; no parsed or visual evidence; corroboration https://cache.industry.siemens.com/dl/files/167/109744167/att_1076941/v1/simatic-st70-complete-english-2021.pdf",
    orderTypes: {
      "6AG1350-2AH01-4AE0": "counter module",
    },
  },
  E: {
    reference:
      "Siemens FM351 manual, 05/2011, A5E01092700-02; printed p31 for 1AH01, p78 for 1AH02",
    url: "https://cache.industry.siemens.com/dl/files/043/2103043/att_66101/v1/s7300_fm351_operating_instructions_en_en-US.pdf",
    access:
      "Reused parsed readiness text; exact FM351 order corroboration only; no characteristics transferred",
    orderTypes: {
      "6ES7351-1AH01-0AE0": "positioning module",
      "6ES7351-1AH02-0AE0": "positioning module",
    },
  },
  F: {
    reference:
      "Siemens Product Information A5E00390472, AA, August 2004; English validity table on second PDF page; printed pagination unestablished",
    url: "https://cache.industry.siemens.com/dl/files/415/19659415/att_41963/v1/Produktinformation_FM-Pos.pdf?download=true",
    access:
      "Reused parsed readiness text; exact FM353/FM354 positioning identity/type only; servo type for FM354 is supported separately by B",
    orderTypes: {
      "6ES7353-1AH01-0AE0": "positioning module",
      "6ES7354-1AH01-0AE0": "positioning module",
    },
  },
};
const batch22ReadinessEvidenceLimits = {
  freshManufacturerRetrieval: "NOT RUN; reused readiness references",
  visualInspection: "NOT OBSERVED",
  successfulDirectOriginHttpStatus: "NOT OBSERVED",
  printedPages: "Printed pages are not assumed viewer indices.",
  failedReaderRequests: [
    "Position 167 Mall reader request returned 403; no usable evidence.",
    "Position 169 exact SIPLUS datasheet reader request returned 403; indexed text remains separate.",
    "Siemens Fichas Tecnicas reader hit a 10,485,761+ byte size limit; indexed text remains separate.",
    "ST70 2021 reader hit a 25,626,498 byte size limit; indexed corroboration remains separate.",
    "FM352 support-manual reader request returned 403; no usable evidence.",
    "FM353 support-manual URL was inaccessible via the reader; no usable evidence.",
  ],
  familyBoundary:
    "Position 165 uses the CP adapter; positions 166-174 use the FM adapter. Canonical variants remain binding metadata outside copy claims.",
  revisionBoundary:
    "FM350-2 2AH00, 2AH01 and the SIPLUS order remain distinct. Both FM351 stable IDs retain 1ch01/1ch02 while exact MLFBs contain 1AH01/1AH02. No characteristics transfer between orders.",
  deferredDataReview:
    "Position 167 indexed Siemens performance information differs from the canonical record; the discrepancy is unchanged and outside this identity/type-only copy.",
  excludedClaims:
    "Model titles, interfaces, protocols, performance, compatibility, lifecycle, certification and availability are outside the copy scope.",
};
const expectedBatch22Products = [
  {
    position: 165,
    productId: "siemens-siplus-s7-300-cp343-1-advanced-gx31-4xe0",
    partNumber: "6AG1343-1GX31-4XE0",
    reviewedContentHash:
      "sha256:b6f66d381313bed1c6d70277cde4adac4c799a9fce3038bbad312544a26e5bac",
    variantId: "industrial-ethernet-advanced",
    suffix: "، پردازندهٔ ارتباطی است.",
    productTypeId: "Communication Processor",
    supportedType: "communication processor",
    evidenceKeys: ["A"],
  },
  {
    position: 166,
    productId: "siemens-s7-300-fm350-1-counter-1ah03-0ae0",
    partNumber: "6ES7350-1AH03-0AE0",
    reviewedContentHash:
      "sha256:28f66d2700933ee658907e9650ded8f58e1209755fcd301682395eb35657ff83",
    variantId: "counter",
    suffix: "، ماژول شمارنده است.",
    productTypeId: "Function Module",
    supportedType: "counter module",
    evidenceKeys: ["B"],
  },
  {
    position: 167,
    productId: "siemens-s7-300-fm350-2-counter-2ah00-0ae0",
    partNumber: "6ES7350-2AH00-0AE0",
    reviewedContentHash:
      "sha256:d298aa7c3eefe248fe8bfb6a33717836d5ee2a51b429ee1ca32d983b1786205b",
    variantId: "counter",
    suffix: "، ماژول شمارنده است.",
    productTypeId: "Function Module",
    supportedType: "counter module",
    evidenceKeys: ["C"],
  },
  {
    position: 168,
    productId: "siemens-s7-300-fm350-2-counter-2ah01-0ae0",
    partNumber: "6ES7350-2AH01-0AE0",
    reviewedContentHash:
      "sha256:579c10f639520675f95caf0d368be2522e0c3b95181819baa102873653bd0051",
    variantId: "counter",
    suffix: "، ماژول شمارنده است.",
    productTypeId: "Function Module",
    supportedType: "counter module",
    evidenceKeys: ["B"],
  },
  {
    position: 169,
    productId: "siemens-siplus-s7-300-fm350-2-counter-2ah01-4ae0",
    partNumber: "6AG1350-2AH01-4AE0",
    reviewedContentHash:
      "sha256:dfee312de5f9341b2b92e7399b235c3f87e9b3b38a5466d844d14e5a5e7c29e6",
    variantId: "counter",
    suffix: "، ماژول شمارنده است.",
    productTypeId: "Function Module",
    supportedType: "counter module",
    evidenceKeys: ["D"],
  },
  {
    position: 170,
    productId: "siemens-s7-300-fm351-positioning-1ch01-0ae0",
    partNumber: "6ES7351-1AH01-0AE0",
    reviewedContentHash:
      "sha256:212f9ed9aa3d3848d251dcb5c88cd9c8f624bcc268a0bc28db621dadca84b467",
    variantId: "positioning",
    suffix: "، ماژول موقعیت‌دهی است.",
    productTypeId: "Function Module",
    supportedType: "positioning module",
    evidenceKeys: ["B", "E"],
  },
  {
    position: 171,
    productId: "siemens-s7-300-fm351-positioning-1ch02-0ae0",
    partNumber: "6ES7351-1AH02-0AE0",
    reviewedContentHash:
      "sha256:a1b32474533bac0515ad26b3392a8e2d52576d153983c2e81aa140af0bdcffae",
    variantId: "positioning",
    suffix: "، ماژول موقعیت‌دهی است.",
    productTypeId: "Function Module",
    supportedType: "positioning module",
    evidenceKeys: ["B", "E"],
  },
  {
    position: 172,
    productId: "siemens-s7-300-fm352-cam-controller-1ah02-0ae0",
    partNumber: "6ES7352-1AH02-0AE0",
    reviewedContentHash:
      "sha256:8f2cd62d9b6190e47c09799db4b8fa5aa173680270132ec91c0cc0c44dd6acb0",
    variantId: "cam-controller",
    suffix: "، کنترل‌کنندهٔ الکترونیکی بادامک است.",
    productTypeId: "Function Module",
    supportedType: "electronic cam controller",
    evidenceKeys: ["B"],
  },
  {
    position: 173,
    productId: "siemens-s7-300-fm353-positioning-1ah01-0ae0",
    partNumber: "6ES7353-1AH01-0AE0",
    reviewedContentHash:
      "sha256:9b70d41d3cc7cf9dc6c68d7e0101b61d7f1abb5b61e23037a7e042887c9278f4",
    variantId: "positioning",
    suffix: "، ماژول موقعیت‌دهی است.",
    productTypeId: "Function Module",
    supportedType: "positioning module",
    evidenceKeys: ["B", "F"],
  },
  {
    position: 174,
    productId: "siemens-s7-300-fm354-servo-positioning-1ah01-0ae0",
    partNumber: "6ES7354-1AH01-0AE0",
    reviewedContentHash:
      "sha256:ba2961c36ace7f4f835779673f90eba4218ca74e173d2cfa81d053a09ad0ee7c",
    variantId: "servo-positioning",
    suffix: "، ماژول موقعیت‌دهی سروو است.",
    productTypeId: "Function Module",
    supportedType: "servo positioning module",
    evidenceKeys: ["B", "F"],
  },
] as const;
const expectedBatch22ProductIds = expectedBatch22Products.map(
  (entry) => entry.productId
);
const expectedBatch22ProductIdSet = new Set<ProductId>(
  expectedBatch22ProductIds
);
const registeredBatch22Drafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedBatch22ProductIdSet.has(entry.productId)
);
const registeredBatch22ReviewRoles = registeredBatch22Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  expectedCompletedThroughBatch21ProductIdSet.size === 125 &&
    expectedBatch22ProductIdSet.size === 10 &&
    expectedBatch22ProductIds.every(
      (id) => !expectedCompletedThroughBatch21ProductIdSet.has(id)
    ) &&
    JSON.stringify(registeredBatch22Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch22ProductIds) &&
    new Set(registeredBatch22ReviewRoles).size === 20 &&
    registeredBatch22ReviewRoles.every(isApprovedReview),
  "Batch 22 must retain ten disjoint ordered drafts and twenty distinct approved role objects."
);
const registeredCompletedThroughBatch22Drafts =
  persianProductCopyDraftRegistry.slice(0, 135);
assert(
  JSON.stringify(
    registeredCompletedThroughBatch22Drafts.map((entry) => entry.productId)
  ) ===
    JSON.stringify([
      ...expectedCompletedThroughBatch21ProductIdSet,
      ...expectedBatch22ProductIds,
    ]),
  "The first 135 registry entries must retain exact membership and order across Batches 01-22."
);
const registeredBatch22DraftRecords = registeredBatch22Drafts.map(
  (entry, index) => {
    const {
      position,
      productId,
      partNumber,
      variantId,
      suffix,
      productTypeId,
      supportedType,
      evidenceKeys,
    } = expectedBatch22Products[index];
    const matchesSource = (source: { id: string; mlfb: string }) =>
      source.id === productId || source.mlfb === partNumber;
    const sources =
      position === 165
        ? s7300CP.filter(matchesSource)
        : s7300FM.filter(matchesSource);
    const matches = products.filter(
      (product) =>
        product.id === productId ||
        product.partNumber === partNumber ||
        product.manufacturerPartNumber === partNumber
    );
    const [source] = sources;
    const [product] = matches;
    assert(
      sources.length === 1 &&
        source !== undefined &&
        source.id === productId &&
        source.mlfb === partNumber &&
        source.familyId === "S7-300" &&
        source.variantId === variantId &&
        source.productTypeId === productTypeId &&
        validateSiemensPLCProduct(source).valid &&
        matches.length === 1 &&
        product !== undefined &&
        product.id === productId &&
        product.familyId === "S7-300" &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.variantId === variantId &&
        product.productTypeId === productTypeId &&
        products.indexOf(product) + 1 === position,
      "Batch 22 exact source/production binding and variant must pass: " +
        productId
    );
    const adapted =
      source.productTypeId === "Communication Processor"
        ? mapSiemensS7300CommunicationProcessorToProduct(source)
        : mapSiemensS7300FunctionModuleToProduct(source);
    assert(
      JSON.stringify(adapted) === JSON.stringify(product) &&
        deriveAllowedTechnicalTokens(product).has(partNumber) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      "Batch 22 CP/FM adapter equality and exact MLFB token eligibility must pass without overrides: " +
        productId
    );
    const expectedSegments = [
      { kind: "text", value: "مدل " },
      { kind: "technical", value: partNumber },
      { kind: "text", value: suffix },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        entry.shortDescription.every(
          (segment) => segment.value.normalize("NFC") === segment.value
        ) &&
        validatePersianProductCopyDrafts([entry], products).valid,
      "Batch 22 linguistic check must retain exact wording, punctuation, NFC and three valid segments: " +
        productId
    );
    const evidence = evidenceKeys.map((key) => batch22ReadinessEvidence[key]);
    assert(
      evidence.every((item) => item.orderTypes[partNumber] !== undefined) &&
        evidence.some((item) => item.orderTypes[partNumber] === supportedType),
      "Batch 22 technical check must use exact-order identity/type evidence: " +
        productId
    );

    const freshContentHash = createProductCopyContentHash(entry);
    assert(
      freshContentHash === expectedBatch22Products[index].reviewedContentHash,
      "Batch 22 must retain the exact PM-reviewed production hash: " + productId
    );
    for (const [role, label, recordedAt] of [
      ["linguisticReview", "linguistic", BATCH_22_LINGUISTIC_RECORDED_AT],
      ["technicalReview", "technical", BATCH_22_TECHNICAL_RECORDED_AT],
    ] as const) {
      const review = entry[role];
      const expectedEvidenceRef =
        "PM-authorized " +
        label +
        " approval in the supplied Batch 22 approval request; draft commit " +
        BATCH_22_DRAFT_COMMIT +
        "; Product " +
        productId +
        "; MLFB " +
        partNumber +
        "; product type " +
        supportedType +
        ". Recording time is an actual UTC observation, not the PM review timestamp. Registry role approvals are separate from GitHub reviews." +
        (role === "technicalReview"
          ? evidenceKeys
              .map((key) => {
                const item = batch22ReadinessEvidence[key];
                return (
                  " Reused readiness " +
                  key +
                  ": " +
                  item.reference +
                  "; " +
                  item.access +
                  "; " +
                  item.url +
                  "."
                );
              })
              .join("") +
            " " +
            batch22ReadinessEvidenceLimits.familyBoundary +
            " " +
            batch22ReadinessEvidenceLimits.revisionBoundary +
            " " +
            batch22ReadinessEvidenceLimits.deferredDataReview +
            " Printed pages are not assumed viewer indices. No fresh retrieval or visual inspection. Visual inspection and successful direct-origin HTTP status were NOT OBSERVED. " +
            batch22ReadinessEvidenceLimits.failedReaderRequests.join(" ")
          : "");
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedAt === recordedAt &&
          review.reviewedContentHash === freshContentHash &&
          Reflect.ownKeys(review).length === 6 &&
          review.evidenceRef === expectedEvidenceRef &&
          review.note ===
            (role === "linguisticReview"
              ? partNumber +
                ": PM-authorized exact Persian wording, punctuation and spacing, NFC normalization, typed MLFB isolation and segment boundaries in identical three-segment short and single-paragraph long descriptions."
              : partNumber +
                ": PM-authorized exact MLFB identity and " +
                supportedType +
                " type only. Model titles, interfaces, protocols, performance, compatibility, lifecycle, certification and availability remain outside approval."),
        "Batch 22 " +
          label +
          " approval must bind the reviewed hash, exact scope, evidence and actual UTC recording observation: " +
          productId
      );
    }
    return {
      position,
      productId,
      partNumber,
      variantId,
      renderedShortDescription: entry.shortDescription
        .map((segment) => segment.value)
        .join(""),
      freshContentHash,
      linguisticDraftReview: {
        result: "PASS",
        wording:
          "Exact authorized Persian introduction and product-type suffix",
        punctuation: "Exact Persian comma, spacing and final period",
        unicodeNormalization: "NFC",
        segmentBoundaries: "text / exact technical MLFB / text",
        approvalDecision: entry.linguisticReview.decision,
      },
      technicalDraftReview: {
        result: "PASS",
        binding: "One exact source, CP/FM adapter and production record",
        manufacturerSupportedType: supportedType,
        evidenceKeys,
        evidenceReferences: evidence.map((item) => item.reference),
        evidenceAccess: evidence.map((item) => item.access),
        approvalDecision: entry.technicalReview.decision,
      },
    };
  }
);

const registeredBatch22ApprovalMutationResults =
  registeredBatch22Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      const segment = changed.shortDescription[0];
      assert(segment !== undefined, "Batch 22 mutation requires a first segment.");
      if (mutation === "text") segment.value += "!";
      else segment.kind = segment.kind === "text" ? "technical" : "text";
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 22 independent ${mutation} mutation must stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const BATCH_23_DRAFT_COMMIT = "a69bd823dfc020e4023827607375d33884739d0a";
const BATCH_23_LINGUISTIC_RECORDED_AT = "2026-11-26T18:46:48.627Z";
const BATCH_23_TECHNICAL_RECORDED_AT = "2026-11-26T18:46:48.974Z";
assert(
  [BATCH_23_LINGUISTIC_RECORDED_AT, BATCH_23_TECHNICAL_RECORDED_AT].every(
    (recordedAt) => new Date(recordedAt).toISOString() === recordedAt
  ) && BATCH_23_LINGUISTIC_RECORDED_AT < BATCH_23_TECHNICAL_RECORDED_AT,
  "Batch 23 must retain distinct UTC recording times for both roles."
);

const expectedBatch23Products = [
  {
    position: 175,
    productId: "siemens-s7-300-fm355-c-control-0vh10-0ae0",
    partNumber: "6ES7355-0VH10-0AE0",
    variantId: "closed-loop-control",
    typeLabel: "ماژول کنترل حلقه‌بسته",
    reviewedContentHash:
      "sha256:e52b1cbd8b93ab08f7576c87c5c5b10f09ca6c668710612f800f0d35421c589d",
  },
  {
    position: 176,
    productId: "siemens-s7-300-fm355-s-control-1vh10-0ae0",
    partNumber: "6ES7355-1VH10-0AE0",
    variantId: "closed-loop-control-step-pulse",
    typeLabel: "ماژول کنترل حلقه‌بسته",
    reviewedContentHash:
      "sha256:f049ff4b268627b899ec7032c027039c304436428ce84300282beab079016af3",
  },
  {
    position: 177,
    productId: "siemens-s7-300-fm355-2-c-temperature-control-2ch00-0ae0",
    partNumber: "6ES7355-2CH00-0AE0",
    variantId: "temperature-control",
    typeLabel: "ماژول کنترل دما",
    reviewedContentHash:
      "sha256:8b5cf9209048a3a94c6f1c005e964223a7a7113ee37392957f7d6cd2be1f32e9",
  },
  {
    position: 178,
    productId: "siemens-s7-300-fm355-2-s-temperature-control-2sh00-0ae0",
    partNumber: "6ES7355-2SH00-0AE0",
    variantId: "temperature-control-step-pulse",
    typeLabel: "ماژول کنترل دما",
    reviewedContentHash:
      "sha256:4fb8c160c8cf076df720ea2b9dc2a36cf68dc1ade084533c1f61162cf4b3de23",
  },
  {
    position: 179,
    productId: "siemens-s7-300-fm352-5-high-speed-boolean-5ah01-0ae0",
    partNumber: "6ES7352-5AH01-0AE0",
    variantId: "high-speed-boolean-processor",
    typeLabel: "پردازندهٔ منطقی بولی",
    reviewedContentHash:
      "sha256:d5655408d6f1d57621afd845a565735fe58acf86eb835fbfcb97abb4508705bc",
  },
  {
    position: 180,
    productId: "siemens-s7-300-cm35-counter-0aa01-0aa0",
    partNumber: "6AT1735-0AA01-0AA0",
    variantId: "counter",
    typeLabel: "ماژول شمارنده",
    reviewedContentHash:
      "sha256:312bf6c5f69637cefde6b234268c2d8e9f4dcb92777c4c8d0593d4fc4678a6c2",
  },
  {
    position: 181,
    productId: "siemens-s7-300-fm352-5-high-speed-boolean-5ah00-0ae0",
    partNumber: "6ES7352-5AH00-0AE0",
    variantId: "high-speed-boolean-processor",
    typeLabel: "پردازندهٔ منطقی بولی",
    reviewedContentHash:
      "sha256:e1d4129480c13471e327deb38c9cd91e41d956e92e746e8201f568283738e7ad",
  },
  {
    position: 182,
    productId: "siemens-s7-300-fm352-5-high-speed-boolean-5ah10-0ae0",
    partNumber: "6ES7352-5AH10-0AE0",
    variantId: "high-speed-boolean-processor",
    typeLabel: "پردازندهٔ منطقی بولی",
    reviewedContentHash:
      "sha256:17877c7fcb514294d034bf0ee62bad80fbc196ee564f81b48abfd503d66f7974",
  },
  {
    position: 183,
    productId: "siemens-s7-300-fm352-5-high-speed-boolean-5ah11-0ae0",
    partNumber: "6ES7352-5AH11-0AE0",
    variantId: "high-speed-boolean-processor",
    typeLabel: "پردازندهٔ منطقی بولی",
    reviewedContentHash:
      "sha256:e3dddf7bdb0c48945c408f52fbaa17be3f379eefd98b5bbd03abeb879fd5a40e",
  },
  {
    position: 184,
    productId: "siemens-m7-300-fm356-4-4bn00-0ae0",
    partNumber: "6ES7356-4BN00-0AE0",
    variantId: "application-function",
    typeLabel: "ماژول تابع کاربردی",
    reviewedContentHash:
      "sha256:01fb576958bab91123a6a9c5dd2d0162facbb0901a693c71b523cb9b67ac7da9",
  },
] as const;
const registeredCompletedThroughBatch23Drafts =
  persianProductCopyDraftRegistry.slice(0, 145);
const registeredBatch23Drafts = registeredCompletedThroughBatch23Drafts.slice(
  registeredCompletedThroughBatch22Drafts.length
);
const registeredBatch23ReviewRoles = registeredBatch23Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  registeredBatch23Drafts.length === 10 &&
    new Set(registeredBatch23ReviewRoles).size === 20 &&
    registeredBatch23ReviewRoles.every(isApprovedReview),
  "Batch 23 must retain ten drafts after Batches 01-22 and twenty distinct approvals."
);

const registeredBatch23DraftRecords = expectedBatch23Products.map(
  (expected, index) => {
    const { position, productId, partNumber, variantId, typeLabel } = expected;
    const entry = registeredBatch23Drafts[index];
    assert(
      entry?.productId === productId,
      `Batch 23 draft order must match the exact binding at position ${position}.`
    );

    const sources = s7300FM.filter(
      (source) => source.id === productId || source.mlfb === partNumber
    );
    const matches = products.filter(
      (product) =>
        product.id === productId ||
        product.partNumber === partNumber ||
        product.manufacturerPartNumber === partNumber
    );
    const [source] = sources;
    const [product] = matches;
    assert(
      sources.length === 1 &&
        source === s7300FM[9 + index] &&
        source.id === productId &&
        source.mlfb === partNumber &&
        source.productTypeId === "Function Module" &&
        source.variantId === variantId &&
        validateSiemensPLCProduct(source).valid &&
        matches.length === 1 &&
        product === products[position - 1] &&
        product.id === productId &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.productTypeId === "Function Module" &&
        product.variantId === variantId &&
        JSON.stringify(mapSiemensS7300FunctionModuleToProduct(source)) ===
          JSON.stringify(product),
      `Batch 23 source order, canonical binding and FM adapter output must be exact: ${productId}`
    );
    assert(
      deriveAllowedTechnicalTokens(product).has(partNumber) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      `Batch 23 exact MLFB must be eligible without a token override: ${productId}`
    );

    const expectedSegments = [
      { kind: "technical", value: partNumber },
      { kind: "text", value: `، ${typeLabel}` },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) === JSON.stringify([expectedSegments]) &&
        typeLabel.normalize("NFC") === typeLabel,
      `Batch 23 copy must use the exact MLFB and NFC Persian label in separate segments: ${productId}`
    );
    const contentHash = createProductCopyContentHash(entry);
    assert(
      contentHash === expected.reviewedContentHash,
      `Batch 23 must retain the authorized production hash: ${productId}`
    );
    const technicalEvidenceUrl =
      position === 180
        ? "https://cache.industry.siemens.com/dl/files/297/1911297/att_59462/v1/HB_CM35_d.pdf"
        : position === 184
          ? "https://cache.industry.siemens.com/dl/files/369/1109369/att_21519/v1/Fm356_e.pdf"
          : "https://cache.industry.siemens.com/dl/files/617/21536617/att_108718/v1/21536617_compatibility_fm_with_profibus_interfacemodules_en.pdf";
    const reference =
      `for ${partNumber} in the supplied Batch 23 approval request, citing draft commit ${BATCH_23_DRAFT_COMMIT}. The UTC timestamp records entry of this approval. Registry approvals are separate from GitHub reviews.`;
    for (const [review, role, recordedAt] of [
      [entry.linguisticReview, "Linguistic", BATCH_23_LINGUISTIC_RECORDED_AT],
      [entry.technicalReview, "Technical", BATCH_23_TECHNICAL_RECORDED_AT],
    ] as const) {
      const referencePrefix = `${role} approval ${reference}`;
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedContentHash === contentHash &&
          review.reviewedAt === recordedAt &&
          (role === "Linguistic"
            ? review.evidenceRef === referencePrefix &&
              review.note ===
                "Approved the exact Persian wording, punctuation, NFC normalization, and MLFB segmentation in the identical short and single-paragraph long descriptions."
            : review.evidenceRef.startsWith(`${referencePrefix} `) &&
              review.evidenceRef.endsWith(technicalEvidenceUrl) &&
              review.note ===
                "Approved exact MLFB identity and module type only. Speed, performance, compatibility, interfaces, protocols, lifecycle, certification, and availability are outside the reviewed scope."),
        `Batch 23 ${role} approval must bind the current hash and reviewed scope: ${productId}`
      );
    }

    for (const locale of ["fa", "en"] as const) {
      const resolved = resolveProductCopy(product, locale);
      const publicCopy = createPublicProductCardCopyDTO(resolved);
      assert(
        resolved.source === "canonical-en" &&
          serializeProductCopyParagraph(resolved.shortDescription) ===
            product.shortDescription &&
          resolved.description.map(serializeProductCopyParagraph).join("\n") ===
            (product.description ?? "") &&
          publicCopy.language === "en" &&
          publicCopy.direction === "ltr",
        `Batch 23 public ${locale} copy must remain canonical English/LTR: ${productId}`
      );
    }

    return {
      position,
      productId,
      partNumber,
      variantId,
      draftText: serializeProductCopyParagraph(entry.shortDescription),
      contentHash,
      linguisticReview: entry.linguisticReview.decision,
      technicalReview: entry.technicalReview.decision,
    };
  }
);

const registeredBatch23ApprovalMutationResults =
  registeredBatch23Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      if (mutation === "text") {
        changed.shortDescription[1].value += ".";
      } else {
        changed.description[0][0].kind = "text";
      }
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        createProductCopyContentHash(changed) !==
          createProductCopyContentHash(entry) &&
          !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 23 ${mutation} mutation must change the production hash and stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const BATCH_24_DRAFT_COMMIT = "541f72f8234fa128362ca5d0e05b3e97d966dbd3";
const BATCH_24_LINGUISTIC_RECORDED_AT = "2026-11-26T19:47:24.786Z";
const BATCH_24_TECHNICAL_RECORDED_AT = "2026-11-26T19:47:25.249Z";
assert(
  [BATCH_24_LINGUISTIC_RECORDED_AT, BATCH_24_TECHNICAL_RECORDED_AT].every(
    (recordedAt) => new Date(recordedAt).toISOString() === recordedAt
  ) && BATCH_24_LINGUISTIC_RECORDED_AT < BATCH_24_TECHNICAL_RECORDED_AT,
  "Batch 24 must retain distinct UTC recording times for both roles."
);

const expectedBatch24Products = [
  {
    position: 185,
    productId: "siemens-m7-300-fm356-4-4bm00-0ae0",
    partNumber: "6ES7356-4BM00-0AE0",
    variantId: "application-function",
    typeLabel: "ماژول تابع کاربردی",
    reviewedContentHash:
      "sha256:35a2e9987a2cc5a19f58c2612334bb0129b464b472cace03aecb98bff468cbd9",
    evidenceFiles: ["Fm356_e.pdf"],
  },
  {
    position: 186,
    productId: "siemens-s7-300-fm357-2-positioning-4ah01-0ae0",
    partNumber: "6ES7357-4AH01-0AE0",
    variantId: "multi-axis-positioning",
    typeLabel: "ماژول موقعیت‌دهی چندمحوره",
    reviewedContentHash:
      "sha256:5f62768f025bac6f819077f048efe6b9bc34f4d072bac1b9f2956064f96631ba",
    evidenceFiles: ["FM357_2_b.pdf"],
  },
  {
    position: 187,
    productId: "siemens-s7-300-sm338-pos-input-4bc01-0ab0",
    partNumber: "6ES7338-4BC01-0AB0",
    variantId: "position-input",
    typeLabel: "ماژول ورودی موقعیت",
    reviewedContentHash:
      "sha256:8b3eb5cb38d78aedf6eab445b2ca6f361ee3bb66593d08812bf47e0da514fc3b",
    evidenceFiles: ["pi_sm388_e.pdf"],
  },
  {
    position: 188,
    productId: "siemens-s7-300-siwarex-u1-4950-1aa01",
    partNumber: "7MH4950-1AA01",
    variantId: "weighing-electronics",
    typeLabel: "ماژول توزین",
    reviewedContentHash:
      "sha256:d63ee959df42bf97cdcd324ce27dcc1d093d529e23b74155293bf7b8a1f757f6",
    evidenceFiles: ["Manual_U_en_38.pdf"],
  },
  {
    position: 189,
    productId: "siemens-s7-300-siwarex-u2-4950-2aa01",
    partNumber: "7MH4950-2AA01",
    variantId: "weighing-electronics",
    typeLabel: "ماژول توزین",
    reviewedContentHash:
      "sha256:e8c74be63274020fba67c7cf4487ba81403110fdfbbeaeff13643d536b8ffe4e",
    evidenceFiles: ["Manual_U_en_38.pdf"],
  },
  {
    position: 190,
    productId: "siemens-siplus-s7-300-siwarex-u2-1950-2aa01-4aa0",
    partNumber: "6AG1950-2AA01-4AA0",
    variantId: "weighing-electronics",
    typeLabel: "ماژول توزین",
    reviewedContentHash:
      "sha256:6b8c9c53a81050508031176f9ebe54adb36437a0f3737af90d692720059f5e95",
    evidenceFiles: ["simatic-st70-complete-english-2023.pdf"],
  },
  {
    position: 191,
    productId: "siemens-s7-300-siwarex-fta-4900-2aa01",
    partNumber: "7MH4900-2AA01",
    variantId: "weighing-electronics",
    typeLabel: "ماژول توزین و دوزینگ",
    reviewedContentHash:
      "sha256:5f3202390e52bf66a6a479c987ca497f56add38784357607a246570005fbe829",
    evidenceFiles: ["STEP_7_-_Neue_Baugruppen.pdf", "siwarex_fta-en_v01_3.pdf"],
  },
  {
    position: 192,
    productId: "siemens-s7-300-siwarex-ftc-4900-3aa01",
    partNumber: "7MH4900-3AA01",
    variantId: "weighing-electronics",
    typeLabel: "ماژول توزین پیوسته",
    reviewedContentHash:
      "sha256:030f93b6d8aa2f69a754dd527971f1d0807f09c96d00bc84cc2814a1890729e7",
    evidenceFiles: ["STEP_7_-_Neue_Baugruppen.pdf", "SIWAREX_FTC_B_Quick_Guide_V3_3_Siwatool_V2.pdf"],
  },
  {
    position: 193,
    productId: "siemens-s7-300-siwarex-a-4421-1aa01",
    partNumber: "7MH4421-1AA01",
    variantId: "weighing-electronics",
    typeLabel: "ماژول دوزینگ",
    reviewedContentHash:
      "sha256:08cd5804f7c1eb52fdef1220ea7d5bb6a334ec5ac93d046598c628c453bdcc92",
    evidenceFiles: ["STEP_7_-_Neue_Baugruppen.pdf", "manual_a_de_04072001.pdf"],
  },
  {
    position: 194,
    productId: "siemens-s7-300-siwarex-cs-4910-0aa01",
    partNumber: "7MH4910-0AA01",
    variantId: "weighing-electronics",
    typeLabel: "ماژول توزین",
    reviewedContentHash:
      "sha256:b248500e5ad5a34009b27d25c6244817b5fe86c6f3006e76f27f2b9716a49bef",
    evidenceFiles: ["SIWAREX_CS_Quick_Guide_V4_0.pdf"],
  },
] as const;
const batch24DraftEnd =
  registeredCompletedThroughBatch23Drafts.length + expectedBatch24Products.length;
const registeredBatch24Drafts = persianProductCopyDraftRegistry.slice(
  registeredCompletedThroughBatch23Drafts.length,
  batch24DraftEnd
);
const registeredBatch24ReviewRoles = registeredBatch24Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  registeredBatch24Drafts.length === 10 &&
    new Set(registeredBatch24ReviewRoles).size === 20 &&
    registeredBatch24ReviewRoles.every(isApprovedReview),
  "Batch 24 must retain ten drafts and twenty separate approved review roles."
);

const registeredBatch24DraftRecords = expectedBatch24Products.map(
  (expected, index) => {
    const { position, productId, partNumber, variantId, typeLabel } = expected;
    const entry = registeredBatch24Drafts[index];
    assert(
      entry?.productId === productId,
      `Batch 24 draft order must match the exact binding at position ${position}.`
    );

    const sources = s7300FM.filter(
      (source) => source.id === productId || source.mlfb === partNumber
    );
    const matches = products.filter(
      (product) =>
        product.id === productId ||
        product.partNumber === partNumber ||
        product.manufacturerPartNumber === partNumber
    );
    const [source] = sources;
    const [product] = matches;
    assert(
      sources.length === 1 &&
        source === s7300FM[19 + index] &&
        source.id === productId &&
        source.mlfb === partNumber &&
        source.productTypeId === "Function Module" &&
        source.variantId === variantId &&
        validateSiemensPLCProduct(source).valid &&
        matches.length === 1 &&
        product === products[position - 1] &&
        product.id === productId &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.productTypeId === "Function Module" &&
        product.variantId === variantId &&
        JSON.stringify(mapSiemensS7300FunctionModuleToProduct(source)) ===
          JSON.stringify(product),
      `Batch 24 source order, catalog binding and FM adapter output must be exact: ${productId}`
    );
    assert(
      deriveAllowedTechnicalTokens(product).has(partNumber) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      `Batch 24 exact MLFB must be eligible without a token override: ${productId}`
    );

    const expectedSegments = [
      { kind: "technical", value: partNumber },
      { kind: "text", value: `، ${typeLabel}` },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        typeLabel.normalize("NFC") === typeLabel,
      `Batch 24 copy must use the exact MLFB and NFC Persian label in identical two-segment paragraphs: ${productId}`
    );

    const contentHash = createProductCopyContentHash(entry);
    assert(
      contentHash === expected.reviewedContentHash,
      `Batch 24 must retain the authorized production hash: ${productId}`
    );
    const reference =
      `for ${partNumber} in the supplied Batch 24 approval request, citing draft commit ${BATCH_24_DRAFT_COMMIT}. The UTC timestamp records entry of this approval in the registry. Registry approvals are separate from GitHub reviews.`;
    for (const [review, role, recordedAt] of [
      [entry.linguisticReview, "Linguistic", BATCH_24_LINGUISTIC_RECORDED_AT],
      [entry.technicalReview, "Technical", BATCH_24_TECHNICAL_RECORDED_AT],
    ] as const) {
      const referencePrefix = `${role} approval ${reference}`;
      assert(
        review.decision === "approved" &&
          review.reviewerId === "Siemiran" &&
          review.reviewedContentHash === contentHash &&
          review.reviewedAt === recordedAt &&
          (role === "Linguistic"
            ? review.evidenceRef === referencePrefix &&
              review.note ===
                "Approved the exact Persian wording, punctuation, NFC normalization, and MLFB segmentation in the identical short and single-paragraph long descriptions."
            : review.evidenceRef.startsWith(`${referencePrefix} `) &&
              expected.evidenceFiles.every((file) =>
                review.evidenceRef.includes(file)
              ) &&
              review.evidenceRef.includes("Visual inspection was not observed.") &&
              review.evidenceRef.includes("reader HTTP 403") ===
                [186, 191, 192, 193].includes(position) &&
              review.note ===
                "Approved exact order identity and module type only. Family, capacity, performance, compatibility, interfaces, lifecycle, certification, and availability are outside the reviewed copy scope."),
        `Batch 24 ${role} approval must bind the current hash and reviewed scope: ${productId}`
      );
    }

    for (const locale of ["fa", "en"] as const) {
      const resolved = resolveProductCopy(product, locale);
      const publicCopy = createPublicProductCardCopyDTO(resolved);
      assert(
        resolved.source === "canonical-en" &&
          serializeProductCopyParagraph(resolved.shortDescription) ===
            product.shortDescription &&
          resolved.description.map(serializeProductCopyParagraph).join("\n") ===
            (product.description ?? "") &&
          publicCopy.language === "en" &&
          publicCopy.direction === "ltr",
        `Batch 24 public ${locale} copy must remain canonical English/LTR: ${productId}`
      );
    }

    return {
      position,
      productId,
      partNumber,
      variantId,
      draftText: serializeProductCopyParagraph(entry.shortDescription),
      contentHash,
      linguisticReview: entry.linguisticReview.decision,
      technicalReview: entry.technicalReview.decision,
    };
  }
);

const registeredBatch24ApprovalMutationResults =
  registeredBatch24Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      if (mutation === "text") {
        changed.shortDescription[1].value += ".";
      } else {
        changed.description[0][0].kind = "text";
      }
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        createProductCopyContentHash(changed) !==
          createProductCopyContentHash(entry) &&
          !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 24 ${mutation} mutation must change the production hash and stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const BATCH_25_DRAFT_COMMIT = "d499bed2b712f91d77bdf9a8cefc9a808e50b4d9";
const BATCH_25_LINGUISTIC_RECORDED_AT = "2026-11-27T07:54:26.515Z";
const BATCH_25_TECHNICAL_RECORDED_AT = "2026-11-27T07:54:26.764Z";
assert(
  [BATCH_25_LINGUISTIC_RECORDED_AT, BATCH_25_TECHNICAL_RECORDED_AT].every(
    (recordedAt) => new Date(recordedAt).toISOString() === recordedAt
  ) && BATCH_25_LINGUISTIC_RECORDED_AT < BATCH_25_TECHNICAL_RECORDED_AT,
  "Batch 25 must retain distinct UTC recording times for both roles."
);

const expectedBatch25Products = [
  {
    position: 195,
    productId: "siemens-siplus-s7-300-fm350-1-counter-1ah03-2ae0",
    partNumber: "6AG1350-1AH03-2AE0",
    variantId: "counter",
    sourceGroup: "fm",
    sourceIndex: 29,
    typeLabel: "ماژول شمارنده",
    reviewedContentHash:
      "sha256:1267799fdb73595a7004d43b156cda280502deb8a553341509d8d25495306fa2",
    evidenceMarkers: [
      "simatic-st70-complete-english-2023.pdf",
      "p. 5/166",
      "reader size limit",
    ],
  },
  {
    position: 196,
    productId: "siemens-s7-300-fm357-2-positioning-4ah03-0ae0",
    partNumber: "6ES7357-4AH03-0AE0",
    variantId: "multi-axis-positioning",
    sourceGroup: "fm",
    sourceIndex: 30,
    typeLabel: "ماژول موقعیت‌دهی چندمحوره",
    reviewedContentHash:
      "sha256:56731df80887d1e70aba56d39e1418abd97c1d347577463d881e5abfeaf599e9",
    evidenceMarkers: [
      "a0359.pdf#page=24",
      "Product_Brief_FM357-2_01_2003.pdf#page=4",
      "Appendix Table 3",
      "4AH03-0AE0 module order",
      "4AH01 hardware",
      "4AH03-3AE0 firmware",
      "reader HTTP 403",
    ],
  },
  {
    position: 197,
    productId: "siemens-s7-1200-pm1207-1sh71",
    partNumber: "6EP1332-1SH71",
    variantId: "pm-1207",
    sourceGroup: "classicPm",
    sourceIndex: 0,
    typeLabel: "ماژول منبع تغذیه",
    reviewedContentHash:
      "sha256:eb7647c2a68bccce608462462c7bac788087dad9c6b9aba3812b424ff0c3ef5d",
    evidenceMarkers: [
      "simatic-st70-complete-english-2023.pdf",
      "p. 3/175",
      "reader size limit",
    ],
  },
  {
    position: 198,
    productId: "siemens-s7-1200-siplus-pm1207-1sh71-4aa0",
    partNumber: "6AG1332-1SH71-4AA0",
    variantId: "pm-1207",
    sourceGroup: "classicPm",
    sourceIndex: 1,
    typeLabel: "ماژول منبع تغذیه",
    reviewedContentHash:
      "sha256:cc855604f86ab56a37061dbb8c564a45ba184a9c415dbda73847261bbc5e05a9",
    evidenceMarkers: [
      "simatic-st70-complete-english-2023.pdf",
      "p. 3/177",
      "-4AA0 article-number column",
      "reader size limit",
    ],
  },
  {
    position: 199,
    productId: "siemens-s7-1200-siplus-pm1207-1sh71-7aa0",
    partNumber: "6AG1332-1SH71-7AA0",
    variantId: "pm-1207",
    sourceGroup: "classicPm",
    sourceIndex: 2,
    typeLabel: "ماژول منبع تغذیه",
    reviewedContentHash:
      "sha256:c81be47698b87486b544c3985ddbf1b99f11a714a5a6ff9fec5336d1297a9cb7",
    evidenceMarkers: [
      "simatic-st70-complete-english-2023.pdf",
      "p. 3/177",
      "-7AA0 article-number column",
      "reader size limit",
    ],
  },
  {
    position: 200,
    productId: "siemens-s7-1200-g2-pm1207-4sb00-3ax0",
    partNumber: "6EP3333-4SB00-3AX0",
    variantId: "pm-1207",
    sourceGroup: "g2Pm",
    sourceIndex: 0,
    typeLabel: "ماژول منبع تغذیه",
    reviewedContentHash:
      "sha256:2cf19330446b239cc695c68bc918d82150dd81b77707906d38419dc41de9790e",
    evidenceMarkers: [
      "A5E53972465-1-76_MANUAL_SIMATIC-PM1207-G2_en-US.pdf#page=4",
      "first ordering table",
    ],
  },
  {
    position: 201,
    productId: "siemens-s7-1200-g2-pm1207-ex-4sc00-3ax0",
    partNumber: "6EP3333-4SC00-3AX0",
    variantId: "pm-1207-ex",
    sourceGroup: "g2Pm",
    sourceIndex: 1,
    typeLabel: "ماژول منبع تغذیه",
    reviewedContentHash:
      "sha256:80a47f827635ef7184121dbf64e8f7a8abddaedd16798d09f17170f1a488ecd5",
    evidenceMarkers: [
      "A5E53972465-1-76_MANUAL_SIMATIC-PM1207-G2_en-US.pdf#page=4",
      "second ordering table",
      "pm-1207-ex canonical variant is binding metadata only",
    ],
  },
  {
    position: 202,
    productId: "siemens-s7-1200-cpu-212-1ag50",
    partNumber: "6ES7212-1AG50-0XB0",
    variantId: "compact",
    sourceGroup: "g2Cpu",
    sourceIndex: 0,
    typeLabel: "واحد پردازش مرکزی کامپکت",
    reviewedContentHash:
      "sha256:5f2c79ca0a2dd8be24fcf085f4761afa8c08a67c90df58fcaccd5e6cfc95e377",
    evidenceMarkers: [
      "mlfbs=6ES7212-1AG50-0XB0",
      "p. 1",
    ],
  },
  {
    position: 203,
    productId: "siemens-s7-1200-cpu-212-1bg50",
    partNumber: "6ES7212-1BG50-0XB0",
    variantId: "compact",
    sourceGroup: "g2Cpu",
    sourceIndex: 1,
    typeLabel: "واحد پردازش مرکزی کامپکت",
    reviewedContentHash:
      "sha256:d5d60bccfd56b8ae6b0897a958cf984cd09e4bd93fdc85ee154a01a3a87facde",
    evidenceMarkers: [
      "mlfbs=6ES72121BG500XB0",
      "p. 1",
    ],
  },
  {
    position: 204,
    productId: "siemens-s7-1200-cpu-212-1hg50",
    partNumber: "6ES7212-1HG50-0XB0",
    variantId: "compact",
    sourceGroup: "g2Cpu",
    sourceIndex: 2,
    typeLabel: "واحد پردازش مرکزی کامپکت",
    reviewedContentHash:
      "sha256:ae2e8b968363818aac9a777226ae77ec1ec728751fc0887e2102c5671b830ed6",
    evidenceMarkers: [
      "mlfbs=6ES7212-1HG50-0XB0",
      "p. 1",
    ],
  },
] as const;

const batch25SourceGroups = {
  fm: s7300FM.map((source) => ({
    source,
    product: mapSiemensS7300FunctionModuleToProduct(source),
  })),
  classicPm: siemensS71200PowerModules.map((source) => ({
    source,
    product: mapSiemensS71200PowerModuleToProduct(source),
  })),
  g2Pm: siemensS71200G2PowerModules.map((source) => ({
    source,
    product: mapSiemensS71200PowerModuleToProduct(source),
  })),
  g2Cpu: siemensS71200G2CPU.map((source) => ({
    source,
    product: mapSiemensS71200CPUToProduct(source),
  })),
};
const batch25SourceBindings = Object.values(batch25SourceGroups).flat();
const batch25DraftEnd = batch24DraftEnd + expectedBatch25Products.length;
const registeredBatch25Drafts = persianProductCopyDraftRegistry.slice(
  batch24DraftEnd,
  batch25DraftEnd
);
const registeredBatch25ReviewRoles = registeredBatch25Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  registeredBatch25Drafts.length === expectedBatch25Products.length &&
    new Set(registeredBatch25ReviewRoles).size === 20 &&
    registeredBatch25ReviewRoles.every(isApprovedReview),
  "Batch 25 must contain ten drafts and twenty distinct approved review records."
);
assert(
  products[193]?.partNumber === "7MH4910-0AA01",
  "Batch 25 must immediately follow the last Batch 24 Product."
);

const registeredBatch25DraftRecords = expectedBatch25Products.map(
  (expected, index) => {
    const {
      position,
      productId,
      partNumber,
      variantId,
      sourceGroup,
      sourceIndex,
      typeLabel,
    } = expected;
    const entry = registeredBatch25Drafts[index];
    assert(
      entry?.productId === productId,
      `Batch 25 draft order must match the exact binding at position ${position}.`
    );

    const sourceMatches = batch25SourceBindings.filter(
      ({ source }) => source.id === productId || source.mlfb === partNumber
    );
    const binding = sourceMatches[0];
    const product = products[position - 1];
    const productMatches = products.filter(
      (candidate) =>
        candidate.id === productId ||
        candidate.partNumber === partNumber ||
        candidate.manufacturerPartNumber === partNumber ||
        candidate.slug === product?.slug
    );
    assert(
      sourceMatches.length === 1 &&
        binding === batch25SourceGroups[sourceGroup][sourceIndex] &&
        binding.source.id === productId &&
        binding.source.mlfb === partNumber &&
        binding.source.variantId === variantId &&
        productMatches.length === 1 &&
        product === productMatches[0] &&
        product.id === productId &&
        product.partNumber === partNumber &&
        product.manufacturerPartNumber === partNumber &&
        product.variantId === variantId &&
        JSON.stringify(binding.product) === JSON.stringify(product),
      `Batch 25 source order, catalog binding and adapter output must be exact: ${productId}`
    );
    assert(
      deriveAllowedTechnicalTokens(product).has(partNumber) &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      `Batch 25 exact MLFB must be eligible without a token override: ${productId}`
    );

    const expectedSegments = [
      { kind: "technical", value: partNumber },
      { kind: "text", value: `، ${typeLabel}` },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        typeLabel.normalize("NFC") === typeLabel,
      `Batch 25 copy must use the exact MLFB and NFC Persian label in identical two-segment paragraphs: ${productId}`
    );

    const contentHash = createProductCopyContentHash(entry);
    assert(
      contentHash === expected.reviewedContentHash,
      `Batch 25 must retain the authorized production hash: ${productId}`
    );
    const reviewReference =
      `for ${partNumber} in the supplied Batch 25 approval request, citing draft commit ${BATCH_25_DRAFT_COMMIT}. The UTC timestamp records entry of this approval in the registry. Registry approvals are separate from GitHub reviews.`;
    const { linguisticReview, technicalReview } = entry;
    assert(
      linguisticReview.decision === "approved" &&
        linguisticReview.reviewerId === "Siemiran" &&
        linguisticReview.reviewedAt === BATCH_25_LINGUISTIC_RECORDED_AT &&
        linguisticReview.reviewedContentHash === contentHash &&
        linguisticReview.evidenceRef === `Linguistic approval ${reviewReference}` &&
        linguisticReview.note ===
          "Approved the exact Persian wording, punctuation, NFC normalization, and MLFB segmentation in the identical short and single-paragraph long descriptions.",
      `Batch 25 linguistic approval must match the reviewed draft and wording scope: ${productId}`
    );
    const visualInspection = [196, 200, 201].includes(position)
      ? "Visual inspection was reported for this row during readiness."
      : "Visual inspection was not observed.";
    assert(
      technicalReview.decision === "approved" &&
        technicalReview.reviewerId === "Siemiran" &&
        technicalReview.reviewedAt === BATCH_25_TECHNICAL_RECORDED_AT &&
        technicalReview.reviewedContentHash === contentHash &&
        technicalReview.evidenceRef.startsWith(
          `Technical approval ${reviewReference} Parsed `
        ) &&
        technicalReview.evidenceRef.includes(visualInspection) &&
        technicalReview.evidenceRef.includes(
          "Indexed results were used for discovery."
        ) &&
        expected.evidenceMarkers.every((marker) =>
          technicalReview.evidenceRef.includes(marker)
        ) &&
        technicalReview.note ===
          "Approved exact order identity and product type only.",
      `Batch 25 technical approval must match the reviewed draft and evidence scope: ${productId}`
    );

    for (const locale of ["fa", "en"] as const) {
      const resolved = resolveProductCopy(product, locale);
      const publicCopy = createPublicProductCardCopyDTO(resolved);
      assert(
        resolved.source === "canonical-en" &&
          serializeProductCopyParagraph(resolved.shortDescription) ===
            product.shortDescription &&
          resolved.description.map(serializeProductCopyParagraph).join("\n") ===
            (product.description ?? "") &&
          publicCopy.language === "en" &&
          publicCopy.direction === "ltr",
        `Batch 25 public ${locale} copy must remain canonical English/LTR: ${productId}`
      );
    }

    return {
      position,
      productId,
      partNumber,
      variantId,
      sourceGroup,
      draftText: serializeProductCopyParagraph(entry.shortDescription),
      contentHash,
      linguisticReview: entry.linguisticReview.decision,
      technicalReview: entry.technicalReview.decision,
    };
  }
);

const registeredBatch25ApprovalMutationResults =
  registeredBatch25Drafts.flatMap((entry) =>
    (["text", "kind"] as const).map((mutation) => {
      const changed = cloneMutableOverlay(entry);
      if (mutation === "text") {
        changed.shortDescription[1].value += ".";
      } else {
        changed.description[0][0].kind = "text";
      }
      const result = validatePersianProductCopyDrafts([changed], products);
      const staleApprovals = result.issues.filter(
        (issue) =>
          issue.code === "stale-approval-hash" &&
          issue.productId === entry.productId
      );
      assert(
        createProductCopyContentHash(changed) !==
          createProductCopyContentHash(entry) &&
          !result.valid &&
          staleApprovals.length === 2 &&
          ["Linguistic", "Technical"].every((role) =>
            staleApprovals.some(
              (issue) =>
                issue.message ===
                `${role} approval does not match the current copy content.`
            )
          ),
        `Batch 25 ${mutation} mutation must change the production hash and stale both approvals: ${entry.productId}`
      );
      return {
        productId: entry.productId,
        mutation,
        staleApprovals: staleApprovals.length,
      };
    })
  );

const expectedBatch26Catalog = [
  {
    position: 205,
    productId: "siemens-s7-1200-cpu-214-1ah50",
    partNumber: "6ES7214-1AH50-0XB0",
    variantId: "compact",
    sourceGroup: "g2",
    sourceIndex: 3,
    typeLabel: "واحد پردازش مرکزی کامپکت",
  },
  {
    position: 206,
    productId: "siemens-s7-1200-cpu-214-1bh50",
    partNumber: "6ES7214-1BH50-0XB0",
    variantId: "compact",
    sourceGroup: "g2",
    sourceIndex: 4,
    typeLabel: "واحد پردازش مرکزی کامپکت",
  },
  {
    position: 207,
    productId: "siemens-s7-1200-cpu-214-1hh50",
    partNumber: "6ES7214-1HH50-0XB0",
    variantId: "compact",
    sourceGroup: "g2",
    sourceIndex: 5,
    typeLabel: "واحد پردازش مرکزی کامپکت",
  },
  {
    position: 208,
    productId: "siemens-s7-1200-cpu-212-1af50",
    partNumber: "6ES7212-1AF50-0XB0",
    variantId: "fail-safe",
    sourceGroup: "g2",
    sourceIndex: 6,
    typeLabel: "واحد پردازش مرکزی ایمن در برابر خطا",
  },
  {
    position: 209,
    productId: "siemens-s7-1200-cpu-212-1hf50",
    partNumber: "6ES7212-1HF50-0XB0",
    variantId: "fail-safe",
    sourceGroup: "g2",
    sourceIndex: 7,
    typeLabel: "واحد پردازش مرکزی ایمن در برابر خطا",
  },
  {
    position: 210,
    productId: "siemens-s7-1200-cpu-214-1af50",
    partNumber: "6ES7214-1AF50-0XB0",
    variantId: "fail-safe",
    sourceGroup: "g2",
    sourceIndex: 8,
    typeLabel: "واحد پردازش مرکزی ایمن در برابر خطا",
  },
  {
    position: 211,
    productId: "siemens-s7-1200-cpu-214-1hf50",
    partNumber: "6ES7214-1HF50-0XB0",
    variantId: "fail-safe",
    sourceGroup: "g2",
    sourceIndex: 9,
    typeLabel: "واحد پردازش مرکزی ایمن در برابر خطا",
  },
  {
    position: 212,
    productId: "siemens-s7-1200-cpu-211-1ae40",
    partNumber: "6ES7211-1AE40-0XB0",
    variantId: "compact",
    sourceGroup: "classic",
    sourceIndex: 0,
    typeLabel: null,
  },
  {
    position: 213,
    productId: "siemens-s7-1200-cpu-211-1he40",
    partNumber: "6ES7211-1HE40-0XB0",
    variantId: "compact",
    sourceGroup: "classic",
    sourceIndex: 1,
    typeLabel: "واحد پردازش مرکزی کامپکت",
  },
  {
    position: 214,
    productId: "siemens-s7-1200-cpu-211-1be40",
    partNumber: "6ES7211-1BE40-0XB0",
    variantId: "compact",
    sourceGroup: "classic",
    sourceIndex: 2,
    typeLabel: "واحد پردازش مرکزی کامپکت",
  },
  {
    position: 215,
    productId: "siemens-s7-1200-cpu-212-1ae40",
    partNumber: "6ES7212-1AE40-0XB0",
    variantId: "compact",
    sourceGroup: "classic",
    sourceIndex: 3,
    typeLabel: null,
  },
  {
    position: 216,
    productId: "siemens-s7-1200-cpu-212-1he40",
    partNumber: "6ES7212-1HE40-0XB0",
    variantId: "compact",
    sourceGroup: "classic",
    sourceIndex: 4,
    typeLabel: "واحد پردازش مرکزی کامپکت",
  },
] as const;

const batch26SourceGroups = {
  g2: batch25SourceGroups.g2Cpu,
  classic: siemensS71200CPU.map((source) => ({
    source,
    product: mapSiemensS71200CPUToProduct(source),
  })),
};
const batch26SourceBindings = Object.values(batch26SourceGroups).flat();
assert(
  products[203]?.partNumber === "6ES7212-1HG50-0XB0",
  "The Batch 26 catalog window must immediately follow the last Batch 25 Product."
);
const batch26CatalogBindings = expectedBatch26Catalog.map((expected) => {
  const { position, productId, partNumber, variantId, sourceGroup, sourceIndex } =
    expected;
  const sourceMatches = batch26SourceBindings.filter(
    ({ source }) => source.id === productId || source.mlfb === partNumber
  );
  const binding = sourceMatches[0];
  const product = products[position - 1];
  const productMatches = products.filter(
    (candidate) =>
      candidate.id === productId ||
      candidate.partNumber === partNumber ||
      candidate.manufacturerPartNumber === partNumber ||
      candidate.slug === product?.slug
  );
  assert(
    sourceMatches.length === 1 &&
      binding === batch26SourceGroups[sourceGroup][sourceIndex] &&
      binding.source.id === productId &&
      binding.source.mlfb === partNumber &&
      binding.source.variantId === variantId &&
      productMatches.length === 1 &&
      product === productMatches[0] &&
      product.id === productId &&
      product.partNumber === partNumber &&
      product.manufacturerPartNumber === partNumber &&
      product.variantId === variantId &&
      product.productTypeId === "CPU" &&
      JSON.stringify(binding.product) === JSON.stringify(product),
    `Batch 26 catalog position ${position}, source group, and CPU adapter binding must be exact: ${productId}`
  );
  return { ...expected, product };
});

const registeredBatch26SkippedRecords = batch26CatalogBindings
  .filter(({ typeLabel }) => typeLabel === null)
  .map(({ position, productId, partNumber }) => {
    const entries = persianProductCopyDraftRegistry.filter(
      (entry) => entry.productId === productId
    );
    const [entry] = entries;
    assert(
      entries.length === 1 &&
        persianProductCopyDraftRegistry.indexOf(entry) < batch25DraftEnd,
      `Batch 26 skip at position ${position} must retain exactly one earlier registry entry: ${productId}`
    );
    const contentHash = createProductCopyContentHash(entry);
    assert(
      entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash,
      `Batch 26 skip at position ${position} must retain both current approvals: ${productId}`
    );
    return { position, productId, partNumber, contentHash };
  });
assert(
  registeredBatch26SkippedRecords.length === 2,
  "Batch 26 must retain both earlier approved skips."
);

const registeredBatch26Drafts =
  persianProductCopyDraftRegistry.slice(batch25DraftEnd);
const registeredBatch26ReviewRoles = registeredBatch26Drafts.flatMap(
  (entry) => [entry.linguisticReview, entry.technicalReview]
);
assert(
  registeredBatch26Drafts.length === 10 &&
    new Set(registeredBatch26ReviewRoles).size === 20 &&
    registeredBatch26ReviewRoles.every(
      (review) => isPendingReview(review) && Object.keys(review).length === 1
    ),
  "Batch 26 must contain ten drafts and twenty distinct pending review records."
);

const registeredBatch26DraftRecords = batch26CatalogBindings
  .filter(({ typeLabel }) => typeLabel !== null)
  .map((binding, index) => {
    const {
      position,
      productId,
      partNumber,
      variantId,
      sourceGroup,
      typeLabel,
      product,
    } = binding;
    const entry = registeredBatch26Drafts[index];
    assert(
      entry?.productId === productId,
      `Batch 26 draft order must match the exact binding at position ${position}.`
    );
    assert(
      deriveAllowedTechnicalTokens(product).has(partNumber) &&
        reviewedGlobalTechnicalTokens.length === 0 &&
        reviewedTechnicalTokenOverrides.every(
          (override) => override.productId !== productId
        ),
      `Batch 26 exact MLFB must be eligible without a token override: ${productId}`
    );

    const expectedSegments = [
      { kind: "technical", value: partNumber },
      { kind: "text", value: `، ${typeLabel}` },
    ];
    assert(
      entry.provenance === "ai-assisted" &&
        JSON.stringify(entry.shortDescription) ===
          JSON.stringify(expectedSegments) &&
        JSON.stringify(entry.description) ===
          JSON.stringify([expectedSegments]) &&
        typeLabel === typeLabel?.normalize("NFC"),
      `Batch 26 copy must use the exact MLFB and NFC Persian label in identical two-segment paragraphs: ${productId}`
    );

    for (const locale of ["fa", "en"] as const) {
      const resolved = resolveProductCopy(product, locale);
      const publicCopy = createPublicProductCardCopyDTO(resolved);
      assert(
        resolved.source === "canonical-en" &&
          serializeProductCopyParagraph(resolved.shortDescription) ===
            product.shortDescription &&
          resolved.description.map(serializeProductCopyParagraph).join("\n") ===
            (product.description ?? "") &&
          publicCopy.language === "en" &&
          publicCopy.direction === "ltr",
        `Batch 26 public ${locale} copy must remain canonical English/LTR: ${productId}`
      );
    }

    return {
      position,
      productId,
      partNumber,
      variantId,
      sourceGroup,
      draftText: serializeProductCopyParagraph(entry.shortDescription),
      contentHash: createProductCopyContentHash(entry),
      linguisticReview: entry.linguisticReview.decision,
      technicalReview: entry.technicalReview.decision,
    };
  });

const registeredCompletedBatchDrafts = persianProductCopyDraftRegistry.filter(
  (entry) => expectedCompletedBatchProductIdSet.has(entry.productId)
);
assert(
  expectedCompletedBatchProductIdSet.size === 50 &&
    registeredCompletedBatchDrafts.length === 50 &&
    new Set(registeredCompletedBatchDrafts.map((entry) => entry.productId))
      .size === 50 &&
    [...expectedBatch11ProductIdSet].every(
      (productId) => !expectedCompletedBatchProductIdSet.has(productId)
    ) &&
    registeredCompletedThroughBatch22Drafts.every(
      (entry) =>
        expectedCompletedThroughBatch21ProductIdSet.has(entry.productId) ||
        expectedBatch22ProductIdSet.has(entry.productId)
    ) &&
    registeredCompletedBatchDrafts.every((entry) => {
      const contentHash = createProductCopyContentHash(entry);
      return (
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved" &&
        entry.linguisticReview.reviewedContentHash === contentHash &&
        entry.technicalReview.reviewedContentHash === contentHash
      );
    }),
  "Completed Batches 01-10 must retain exactly fifty current dual-approved entries, disjoint from the five Batch 11 entries."
);

assert(
  registeredDraftValidation.valid &&
    batch24DraftEnd === 155 &&
    batch25DraftEnd === 165 &&
    persianProductCopyDraftRegistry.length === 175 &&
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
  registeredBatch04Drafts.length === 5 &&
    JSON.stringify(expectedBatch04DraftProductIds) ===
      JSON.stringify(expectedBatch04ProductIds) &&
    expectedBatch04ReviewMetadata.length === 5 &&
    JSON.stringify(
      expectedBatch04ReviewMetadata.map((entry) => entry.productId)
    ) === JSON.stringify(expectedBatch04ProductIds) &&
    JSON.stringify(registeredBatch04Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch04ProductIds) &&
    JSON.stringify(registeredBatch04DraftBindings) ===
      JSON.stringify(expectedBatch04CanonicalProducts) &&
    registeredBatch04DraftRecords.length === 5,
  "Batch 04 draft IDs, canonical Product bindings, copy, and segmentation must be exact."
);
assert(
  registeredBatch05Drafts.length === 5 &&
    new Set(registeredBatch05Drafts.map((entry) => entry.productId)).size ===
      5 &&
    JSON.stringify(registeredBatch05Drafts.map((entry) => entry.productId)) ===
      JSON.stringify(expectedBatch05ProductIds) &&
    expectedBatch05ReviewMetadata.length === 5 &&
    JSON.stringify(
      expectedBatch05ReviewMetadata.map((entry) => entry.productId)
    ) === JSON.stringify(expectedBatch05ProductIds) &&
    registeredBatch05DraftRecords.length === 5 &&
    registeredBatch05ApprovalRecords.length === 5 &&
    new Set(
      registeredBatch05Drafts.flatMap((entry) => [
        entry.linguisticReview,
        entry.technicalReview,
      ])
    ).size === 10 &&
    registeredBatch05Drafts.filter((entry) =>
      isPendingReview(entry.linguisticReview)
    ).length === 0 &&
    registeredBatch05Drafts.filter((entry) =>
      isPendingReview(entry.technicalReview)
    ).length === 0,
  "Batch 05 must retain exactly five unique canonical bindings, ten distinct approved role objects, and no pending reviews."
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
    registeredBatch04Drafts.every(
      (entry) =>
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved"
    ) &&
    registeredBatch05Drafts.every(
      (entry) =>
        entry.linguisticReview.decision === "approved" &&
        entry.technicalReview.decision === "approved"
    ) &&
    expectedPreviouslyApprovedProductIdSet.size === 30 &&
    registeredPreviouslyApprovedDrafts.length === 30 &&
    registeredPreviouslyApprovedDrafts.filter((entry) =>
      isPendingReview(entry.linguisticReview)
    ).length === 0 &&
    registeredPreviouslyApprovedDrafts.filter((entry) =>
      isPendingReview(entry.technicalReview)
    ).length === 0 &&
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
    ) &&
    registeredBatch04ApprovalRecords.length === 5 &&
    registeredBatch04ApprovalRecords.every(
      (record) => record.roleObjectsDistinct
    ) &&
    registeredBatch05ApprovalRecords.length === 5 &&
    registeredBatch05ApprovalRecords.every(
      (record) => record.roleObjectsDistinct
    ),
  "The existing thirty drafts must retain exact current dual approvals with no pending reviews."
);
assert(
  registeredLinguisticApprovals === 165 &&
    registeredTechnicalApprovals === 165 &&
    registeredCurrentDualApprovals === 165 &&
    registeredLinguisticPending === 10 &&
    registeredTechnicalPending === 10,
  "The registry must contain 165 current dual approvals and ten pending reviews per role."
);
assert(
  !registeredDraftActivation.valid &&
    registeredDraftActivation.overlayCount === 175 &&
    registeredDraftActivation.canonicalCount === 382 &&
    registeredDraftActivation.approvedCount === 165 &&
    registeredDraftActivation.missingIds.length === 207 &&
    !("capability" in registeredDraftActivation),
  "Combined activation must fail closed at exactly 175/382 drafts, 165 dual approvals, and 207 missing Products."
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
        batch04: {
          entries: registeredBatch04Drafts.length,
          exactBindings:
            JSON.stringify(registeredBatch04DraftBindings) ===
            JSON.stringify(expectedBatch04CanonicalProducts),
          linguisticApprovals: registeredBatch04Drafts.filter(
            (entry) => entry.linguisticReview.decision === "approved"
          ).length,
          technicalApprovals: registeredBatch04Drafts.filter(
            (entry) => entry.technicalReview.decision === "approved"
          ).length,
          currentDualApprovals: registeredBatch04Drafts.filter(
            (entry) =>
              entry.linguisticReview.decision === "approved" &&
              entry.technicalReview.decision === "approved"
          ).length,
          pendingReviewRoles:
            registeredBatch04Drafts.length -
            registeredBatch04ApprovalRecords.length,
          approvalRecords: registeredBatch04ApprovalRecords.length,
          mutationStaleness: registeredBatch04ApprovalMutationResults,
          exactDrafts: registeredBatch04DraftRecords.length,
          contentHashes: registeredBatch04ApprovalRecords.map((record) => ({
            productId: record.productId,
            hash: record.freshContentHash,
          })),
          publicCanonicalEnglishLtr: batch04PublicResolutionResults.every(
            (result) =>
              result.englishSource === "canonical-en" &&
              result.disabledPersianSource === "canonical-en" &&
              result.language === "en" &&
              result.direction === "ltr"
          ),
        },
        batch05: {
          entries: registeredBatch05Drafts.length,
          exactBindings:
            JSON.stringify(
              registeredBatch05Drafts.map((entry) => entry.productId)
            ) === JSON.stringify(expectedBatch05ProductIds),
          linguisticPending: registeredBatch05Drafts.filter((entry) =>
            isPendingReview(entry.linguisticReview)
          ).length,
          technicalPending: registeredBatch05Drafts.filter((entry) =>
            isPendingReview(entry.technicalReview)
          ).length,
          linguisticApprovals: registeredBatch05Drafts.filter(
            (entry) => entry.linguisticReview.decision === "approved"
          ).length,
          technicalApprovals: registeredBatch05Drafts.filter(
            (entry) => entry.technicalReview.decision === "approved"
          ).length,
          currentDualApprovals: registeredBatch05ApprovalRecords.length,
          approvalRecords: registeredBatch05ApprovalRecords.length,
          mutationStaleness: registeredBatch05ApprovalMutationResults,
          contentHashes: registeredBatch05ApprovalRecords.map((record) => ({
            productId: record.productId,
            hash: record.freshContentHash,
          })),
          exactDrafts: registeredBatch05DraftRecords.length,
          drafts: registeredBatch05DraftRecords,
          publicCanonicalEnglishLtr: registeredBatch05DraftRecords.every(
            (record) => record.publicCanonicalEnglishLtr
          ),
        },
        batch06: {
          entries: registeredBatch06Drafts.length,
          drafts: registeredBatch06DraftRecords,
        },
        batch07: {
          entries: registeredBatch07Drafts.length,
          drafts: registeredBatch07DraftRecords,
        },
        batch08: {
          entries: registeredBatch08Drafts.length,
          drafts: registeredBatch08DraftRecords,
          mutationStaleness: registeredBatch08ApprovalMutationResults,
        },
        batch09: {
          entries: registeredBatch09Drafts.length,
          drafts: registeredBatch09DraftRecords,
          mutationStaleness: registeredBatch09ApprovalMutationResults,
        },
        batch10: {
          entries: registeredBatch10Drafts.length,
          drafts: registeredBatch10DraftRecords,
          mutationStaleness: registeredBatch10ApprovalMutationResults,
        },
        batch11: {
          entries: registeredBatch11Drafts.length,
          drafts: registeredBatch11DraftRecords,
          mutationStaleness: registeredBatch11ApprovalMutationResults,
          technicalSegments: registeredBatch11Drafts.reduce(
            (count, entry) =>
              count +
              entry.shortDescription.filter(
                (segment) => segment.kind === "technical"
              ).length,
            0
          ),
        },
        batch12: {
          entries: registeredBatch12Drafts.length,
          drafts: registeredBatch12DraftRecords,
          mutationStaleness: registeredBatch12ApprovalMutationResults,
          technicalSegments: registeredBatch12TechnicalSegmentCount,
        },
        batch13: {
          entries: registeredBatch13Drafts.length,
          drafts: registeredBatch13DraftRecords,
          mutationStaleness: registeredBatch13ApprovalMutationResults,
          technicalSegments: registeredBatch13TechnicalSegmentCount,
        },
        batch14: {
          entries: registeredBatch14Drafts.length,
          drafts: registeredBatch14DraftRecords,
          approvedRoleRecords: registeredBatch14ReviewRoles.length,
          linguisticRecordedAt: BATCH_14_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_14_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch14ApprovalMutationResults,
        },
        batch15: {
          entries: registeredBatch15Drafts.length,
          drafts: registeredBatch15DraftRecords,
          approvedRoleRecords: registeredBatch15ReviewRoles.length,
          linguisticRecordedAt: BATCH_15_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_15_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch15ApprovalMutationResults,
        },
        batch16: {
          entries: registeredBatch16Drafts.length,
          drafts: registeredBatch16DraftRecords,
          approvedRoleRecords: registeredBatch16ReviewRoles.length,
          linguisticRecordedAt: BATCH_16_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_16_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch16ApprovalMutationResults,
          readinessEvidence: batch16ReadinessEvidence,
        },
        batch17: {
          entries: registeredBatch17Drafts.length,
          drafts: registeredBatch17DraftRecords,
          approvedRoleRecords: registeredBatch17ReviewRoles.length,
          linguisticRecordedAt: BATCH_17_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_17_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch17ApprovalMutationResults,
          readinessEvidence: batch17ReadinessEvidence,
        },
        batch18: {
          entries: registeredBatch18Drafts.length,
          drafts: registeredBatch18DraftRecords,
          approvedRoleRecords: registeredBatch18ReviewRoles.length,
          linguisticRecordedAt: BATCH_18_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_18_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch18ApprovalMutationResults,
          readinessEvidence: batch18ReadinessEvidence,
          finalApprovalsRecorded: true,
          freshManufacturerRetrieval: "NOT RUN",
          visualInspection: "NOT OBSERVED",
        },
        batch19: {
          entries: registeredBatch19Drafts.length,
          drafts: registeredBatch19DraftRecords,
          approvedRoleRecords: registeredBatch19ReviewRoles.length,
          linguisticRecordedAt: BATCH_19_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_19_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch19ApprovalMutationResults,
          readinessEvidence: batch19ReadinessEvidence,
          finalApprovalsRecorded: true,
          freshManufacturerRetrieval: "NOT RUN",
          visualInspection: "NOT OBSERVED",
          successfulDirectOriginHttpStatus: "NOT OBSERVED",
        },
        batch20: {
          entries: registeredBatch20Drafts.length,
          drafts: registeredBatch20DraftRecords,
          approvedRoleRecords: registeredBatch20ReviewRoles.length,
          linguisticRecordedAt: BATCH_20_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_20_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch20ApprovalMutationResults,
          readinessEvidence: batch20ReadinessEvidence,
          evidenceLimits: batch20ReadinessEvidenceLimits,
          finalApprovalsRecorded: true,
        },
        batch21: {
          entries: registeredBatch21Drafts.length,
          drafts: registeredBatch21DraftRecords,
          approvedRoleRecords: registeredBatch21ReviewRoles.length,
          linguisticRecordedAt: BATCH_21_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_21_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch21ApprovalMutationResults,
          readinessEvidence: batch21ReadinessEvidence,
          evidenceLimits: batch21ReadinessEvidenceLimits,
          finalApprovalsRecorded: true,
        },
        batch22: {
          entries: registeredBatch22Drafts.length,
          drafts: registeredBatch22DraftRecords,
          approvedRoleRecords: registeredBatch22ReviewRoles.length,
          linguisticRecordedAt: BATCH_22_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_22_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch22ApprovalMutationResults,
          readinessEvidence: batch22ReadinessEvidence,
          evidenceLimits: batch22ReadinessEvidenceLimits,
          finalApprovalsRecorded: true,
        },
        batch23: {
          entries: registeredBatch23Drafts.length,
          drafts: registeredBatch23DraftRecords,
          approvedRoleRecords: registeredBatch23ReviewRoles.length,
          linguisticRecordedAt: BATCH_23_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_23_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch23ApprovalMutationResults,
          publicCanonicalEnglishLtr: true,
        },
        batch24: {
          entries: registeredBatch24Drafts.length,
          drafts: registeredBatch24DraftRecords,
          approvedRoleRecords: registeredBatch24ReviewRoles.length,
          linguisticRecordedAt: BATCH_24_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_24_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch24ApprovalMutationResults,
          publicCanonicalEnglishLtr: true,
        },
        batch25: {
          entries: registeredBatch25Drafts.length,
          drafts: registeredBatch25DraftRecords,
          approvedRoleRecords: registeredBatch25ReviewRoles.length,
          linguisticRecordedAt: BATCH_25_LINGUISTIC_RECORDED_AT,
          technicalRecordedAt: BATCH_25_TECHNICAL_RECORDED_AT,
          mutationStaleness: registeredBatch25ApprovalMutationResults,
          publicCanonicalEnglishLtr: true,
        },
        batch26: {
          entries: registeredBatch26Drafts.length,
          drafts: registeredBatch26DraftRecords,
          skipped: registeredBatch26SkippedRecords,
          pendingRoleRecords: registeredBatch26ReviewRoles.length,
          publicCanonicalEnglishLtr: true,
        },
        completedThroughBatch21Entries:
          registeredCompletedThroughBatch21Drafts.length,
        completedThroughBatch20Entries:
          registeredCompletedThroughBatch20Drafts.length,
        completedThroughBatch19Entries:
          registeredCompletedThroughBatch19Drafts.length,
        completedThroughBatch18Entries:
          registeredCompletedThroughBatch18Drafts.length,
        completedThroughBatch17Entries:
          registeredCompletedThroughBatch17Drafts.length,
        completedThroughBatch16Entries:
          registeredCompletedThroughBatch16Drafts.length,
        completedThroughBatch15Entries:
          registeredCompletedThroughBatch15Drafts.length,
        completedThroughBatch14Entries:
          registeredCompletedThroughBatch14Drafts.length,
        completedThroughBatch13Entries:
          registeredCompletedThroughBatch13Drafts.length,
        completedThroughBatch12Entries:
          registeredCompletedThroughBatch12Drafts.length,
        completedThroughBatch11Entries:
          registeredCompletedThroughBatch11Drafts.length,
        completedBatchEntries: registeredCompletedBatchDrafts.length,
        linguisticPending: registeredLinguisticPending,
        technicalPending: registeredTechnicalPending,
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
        batch04: {
          entries: batch04ProductionResolver.entryCount,
          tokens: batch04ProductionResolver.tokenCount,
          canonicalBindings: batch04Products.length,
          issues: batch04ProductionResolver.issues.length,
        },
        batch05: {
          entries: reviewedTechnicalTokenOverrides.filter((entry) =>
            expectedBatch05ProductIdSet.has(entry.productId)
          ).length,
          tokens: batch05Products.reduce(
            (count, product) =>
              count +
              combinedProductionResolver.getTokensForProduct(product.id).length,
            0
          ),
          canonicalBindings: batch05Products.length,
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
