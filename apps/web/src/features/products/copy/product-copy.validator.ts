import "server-only";

import { createHash } from "node:crypto";

import type { Product } from "../types/product.types";
import type {
  ProductCopyParagraph,
  ProductCopyReview,
  ProductCopySegment,
  ProductId,
} from "./product-copy.types";
import {
  containsRawTechnicalContent,
  isAllowedTechnicalToken,
} from "./technical-token-policy";

export interface ProductCopyValidationIssue {
  readonly code: string;
  readonly message: string;
  readonly productId?: string;
}

export interface DraftProductCopyValidationResult {
  readonly valid: boolean;
  readonly entryCount: number;
  readonly issues: readonly ProductCopyValidationIssue[];
}

declare const activationCapabilityTypeBrand: unique symbol;

export interface ProductCopyActivationCapability {
  readonly [activationCapabilityTypeBrand]: true;
}

export interface PublishedPersianProductCopy {
  readonly productId: ProductId;
  readonly shortDescription: ProductCopyParagraph;
  readonly description: readonly ProductCopyParagraph[];
}

interface HashableProductCopyContent {
  readonly productId: ProductId;
  readonly shortDescription: ProductCopyParagraph;
  readonly description: readonly ProductCopyParagraph[];
}

const issuedActivationCapabilities = new WeakSet<object>();
const publicationSnapshots = new WeakMap<
  object,
  ReadonlyMap<ProductId, PublishedPersianProductCopy>
>();

export type FullProductCopyValidationResult =
  | {
      readonly valid: false;
      readonly canonicalCount: number;
      readonly overlayCount: number;
      readonly approvedCount: number;
      readonly missingIds: readonly ProductId[];
      readonly extraIds: readonly ProductId[];
      readonly issues: readonly ProductCopyValidationIssue[];
    }
  | {
      readonly valid: true;
      readonly canonicalCount: 382;
      readonly overlayCount: 382;
      readonly approvedCount: 382;
      readonly missingIds: readonly [];
      readonly extraIds: readonly [];
      readonly issues: readonly [];
      readonly capability: ProductCopyActivationCapability;
    };

const EXPECTED_PRODUCT_COUNT = 382;
const INCORRECT_BRAND = "\u0633\u06cc\u0645\u06cc\u0631\u0627\u0646";
const FORBIDDEN_CHARACTERS =
  /[\u061c\u0640\u200b\u200d-\u200f\u202a-\u202e\u2060\u2066-\u2069\ufeff]/u;
const UNEXPECTED_FORMAT_CHARACTER = /\p{Cf}/u;
const ARABIC_YEH_OR_KAF = /[\u064a\u0643]/u;
const INVALID_WHITESPACE = /[\t\r\n]|\s{2,}/u;
const PERSIAN_LETTER = /[\u0621-\u063a\u0641-\u064a\u066e-\u06d3]/u;
const UTC_ISO_TIMESTAMP =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z$/u;

export const EXPECTED_LIFECYCLE_OMISSION_IDS = [
  "siemens-s7-300-im365-0ba81-0aa0",
  "siemens-s7-300-im178-4-4bh00-0ae0",
  "siemens-s7-300-cp343-1-erpc-fx00-0xe0",
  "siemens-s7-300-cp343-1-bacnet-cx10-0xe0",
  "siemens-s7-300-cm35-counter-0aa01-0aa0",
  "siemens-m7-300-fm356-4-4bn00-0ae0",
  "siemens-m7-300-fm356-4-4bm00-0ae0",
  "siemens-s7-300-siwarex-a-4421-1aa01",
  "siemens-siplus-s7-300-fm350-1-counter-1ah03-2ae0",
  "siemens-s7-300-fm357-2-positioning-4ah03-0ae0",
] as const satisfies readonly ProductId[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isProductCopySegment(value: unknown): value is ProductCopySegment {
  return (
    isRecord(value) &&
    (value.kind === "text" || value.kind === "technical") &&
    typeof value.value === "string"
  );
}

function isProductCopyParagraph(value: unknown): value is ProductCopyParagraph {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(isProductCopySegment)
  );
}

function isHashableProductCopyContent(
  value: unknown
): value is HashableProductCopyContent & Record<string, unknown> {
  return (
    isRecord(value) &&
    typeof value.productId === "string" &&
    isProductCopyParagraph(value.shortDescription) &&
    Array.isArray(value.description) &&
    value.description.length > 0 &&
    value.description.every(isProductCopyParagraph)
  );
}

function addIssue(
  issues: ProductCopyValidationIssue[],
  code: string,
  message: string,
  productId?: string
): void {
  issues.push({ code, message, ...(productId ? { productId } : {}) });
}

function validateStringValue(
  value: string,
  kind: ProductCopySegment["kind"],
  product: Readonly<Product> | undefined,
  productId: string | undefined,
  issues: ProductCopyValidationIssue[]
): void {
  if (value.length === 0) {
    addIssue(
      issues,
      "empty-segment",
      "Copy segments must not be empty.",
      productId
    );
    return;
  }

  if (
    (kind === "technical" && value.trim() !== value) ||
    INVALID_WHITESPACE.test(value)
  ) {
    addIssue(
      issues,
      "invalid-whitespace",
      "Copy segments must not have edge, repeated, tab, or newline whitespace.",
      productId
    );
  }

  if (
    FORBIDDEN_CHARACTERS.test(value) ||
    UNEXPECTED_FORMAT_CHARACTER.test(value.replaceAll("‌", ""))
  ) {
    addIssue(
      issues,
      "forbidden-control",
      "Stored copy must not contain forbidden invisible or bidi controls.",
      productId
    );
  }

  if (ARABIC_YEH_OR_KAF.test(value)) {
    addIssue(
      issues,
      "non-persian-letter-form",
      "Use Persian Yeh and Kaf rather than their Arabic forms.",
      productId
    );
  }

  if (value.normalize("NFC") !== value) {
    addIssue(
      issues,
      "non-normalized-copy",
      "Stored copy must use Unicode NFC normalization.",
      productId
    );
  }

  if (value.includes(INCORRECT_BRAND)) {
    addIssue(
      issues,
      "incorrect-brand",
      "The prohibited Persian brand spelling is present.",
      productId
    );
  }

  if (kind === "text") {
    if (containsRawTechnicalContent(value)) {
      addIssue(
        issues,
        "raw-technical-content",
        "Latin letters and technical digits must be isolated in technical segments.",
        productId
      );
    }

    for (let index = 0; index < value.length; index += 1) {
      if (value[index] !== "‌") continue;

      const previous = value[index - 1] ?? "";
      const next = value[index + 1] ?? "";

      if (!PERSIAN_LETTER.test(previous) || !PERSIAN_LETTER.test(next)) {
        addIssue(
          issues,
          "invalid-zwnj",
          "ZWNJ is permitted only between Persian letters.",
          productId
        );
      }
    }
  } else if (!product || !isAllowedTechnicalToken(value, product)) {
    addIssue(
      issues,
      "unapproved-technical-token",
      "Technical segments must exactly match a canonical or reviewed token.",
      productId
    );
  }
}

function validateParagraph(
  value: unknown,
  product: Readonly<Product> | undefined,
  productId: string | undefined,
  location: string,
  issues: ProductCopyValidationIssue[]
): value is ProductCopyParagraph {
  if (!Array.isArray(value) || value.length === 0) {
    addIssue(
      issues,
      "empty-required-field",
      `${location} must contain at least one segment.`,
      productId
    );
    return false;
  }

  let hasPersianText = false;
  let structurallyValid = true;

  value.forEach((candidate, index) => {
    if (
      !isRecord(candidate) ||
      (candidate.kind !== "text" && candidate.kind !== "technical") ||
      typeof candidate.value !== "string"
    ) {
      addIssue(
        issues,
        "invalid-segment",
        `${location}[${index}] is not a valid Product-copy segment.`,
        productId
      );
      structurallyValid = false;
      return;
    }

    if (candidate.kind === "text" && PERSIAN_LETTER.test(candidate.value)) {
      hasPersianText = true;
    }

    validateStringValue(
      candidate.value,
      candidate.kind,
      product,
      productId,
      issues
    );
  });

  if (!structurallyValid) return false;

  const serializedValue = value
    .filter(isRecord)
    .map((candidate) =>
      typeof candidate.value === "string" ? candidate.value : ""
    )
    .join("");

  if (
    serializedValue.trim() !== serializedValue ||
    INVALID_WHITESPACE.test(serializedValue)
  ) {
    addIssue(
      issues,
      "invalid-paragraph-whitespace",
      `${location} has invalid boundary or repeated whitespace.`,
      productId
    );
  }

  if (!hasPersianText) {
    addIssue(
      issues,
      "missing-persian-prose",
      `${location} must contain Persian prose in a text segment.`,
      productId
    );
  }

  return true;
}

/** Accepts only calendar-valid YYYY-MM-DDTHH:mm:ss[.SSS]Z timestamps. */
function isValidIsoTimestamp(value: string): boolean {
  const match = UTC_ISO_TIMESTAMP.exec(value);
  if (!match) return false;

  const [, yearText, monthText, dayText, hourText, minuteText, secondText] =
    match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText);

  if (
    year < 1 ||
    month < 1 ||
    month > 12 ||
    hour > 23 ||
    minute > 59 ||
    second > 59
  ) {
    return false;
  }

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31,
    leapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month - 1];

  return day >= 1 && day <= daysInMonth;
}

function validateReview(
  value: unknown,
  expectedHash: string,
  productId: string | undefined,
  reviewName: string,
  issues: ProductCopyValidationIssue[]
): value is ProductCopyReview {
  if (!isRecord(value)) {
    addIssue(
      issues,
      "invalid-review",
      `${reviewName} review is missing.`,
      productId
    );
    return false;
  }

  if (value.decision === "pending" || value.decision === "rejected") {
    if (value.note !== undefined && typeof value.note !== "string") {
      addIssue(
        issues,
        "invalid-review-note",
        `${reviewName} note must be text.`,
        productId
      );
    }
    return true;
  }

  if (value.decision !== "approved") {
    addIssue(
      issues,
      "invalid-review",
      `${reviewName} decision is invalid.`,
      productId
    );
    return false;
  }

  if (typeof value.reviewerId !== "string" || !value.reviewerId.trim()) {
    addIssue(
      issues,
      "missing-reviewer",
      `${reviewName} reviewer ID is required.`,
      productId
    );
  }

  if (typeof value.evidenceRef !== "string" || !value.evidenceRef.trim()) {
    addIssue(
      issues,
      "missing-evidence",
      `${reviewName} evidence reference is required.`,
      productId
    );
  }

  if (
    typeof value.reviewedAt !== "string" ||
    !isValidIsoTimestamp(value.reviewedAt)
  ) {
    addIssue(
      issues,
      "invalid-review-date",
      `${reviewName} review date must be a calendar-valid UTC ISO timestamp.`,
      productId
    );
  }

  if (value.reviewedContentHash !== expectedHash) {
    addIssue(
      issues,
      "stale-approval-hash",
      `${reviewName} approval does not match the current copy content.`,
      productId
    );
  }

  if (value.note !== undefined && typeof value.note !== "string") {
    addIssue(
      issues,
      "invalid-review-note",
      `${reviewName} note must be text.`,
      productId
    );
  }

  return true;
}

function getProductId(value: unknown): string | undefined {
  return isRecord(value) && typeof value.productId === "string"
    ? value.productId
    : undefined;
}

function toHashContent(value: HashableProductCopyContent): string {
  return JSON.stringify([
    value.productId,
    value.shortDescription.map((segment) => [segment.kind, segment.value]),
    value.description.map((paragraph) =>
      paragraph.map((segment) => [segment.kind, segment.value])
    ),
  ]);
}

export function createProductCopyContentHash(
  value: HashableProductCopyContent
): string {
  return `sha256:${createHash("sha256").update(toHashContent(value), "utf8").digest("hex")}`;
}

function cloneFrozenParagraph(
  paragraph: ProductCopyParagraph
): ProductCopyParagraph {
  return Object.freeze(
    paragraph.map((segment) => Object.freeze({ ...segment }))
  );
}

function issueActivationCapability(
  entries: readonly HashableProductCopyContent[]
): ProductCopyActivationCapability {
  const snapshotEntries = entries.map((entry) =>
    Object.freeze({
      productId: entry.productId,
      shortDescription: cloneFrozenParagraph(entry.shortDescription),
      description: Object.freeze(entry.description.map(cloneFrozenParagraph)),
    })
  );
  const lookup = new Map<ProductId, PublishedPersianProductCopy>(
    snapshotEntries.map((entry) => [entry.productId, entry])
  );
  const capability = Object.freeze(
    Object.create(null) as object
  ) as ProductCopyActivationCapability;

  issuedActivationCapabilities.add(capability);
  publicationSnapshots.set(capability, lookup);

  return capability;
}

export function lookupValidatedPersianProductCopy(
  capability: unknown,
  productId: ProductId
): PublishedPersianProductCopy {
  if (
    typeof capability !== "object" ||
    capability === null ||
    !issuedActivationCapabilities.has(capability)
  ) {
    throw new Error(
      "Persian Product-copy activation capability is not authentic."
    );
  }

  const overlay = publicationSnapshots.get(capability)?.get(productId);
  if (!overlay) {
    throw new Error(
      `Persian Product-copy publication invariant failed for Product ID: ${productId}`
    );
  }

  return overlay;
}

export function validatePersianProductCopyDrafts(
  entries: readonly unknown[],
  canonicalProducts: readonly Readonly<Product>[]
): DraftProductCopyValidationResult {
  const issues: ProductCopyValidationIssue[] = [];
  const productsById = new Map(
    canonicalProducts.map((product) => [product.id, product])
  );
  const seenIds = new Set<string>();

  entries.forEach((candidate, entryIndex) => {
    if (!isRecord(candidate)) {
      addIssue(
        issues,
        "invalid-entry",
        `Entry ${entryIndex} is not an object.`
      );
      return;
    }

    const productId = getProductId(candidate);

    if (!productId?.trim()) {
      addIssue(issues, "missing-product-id", "Overlay Product ID is required.");
    } else if (seenIds.has(productId)) {
      addIssue(
        issues,
        "duplicate-product-id",
        "Duplicate overlay Product ID.",
        productId
      );
    } else {
      seenIds.add(productId);
    }

    const product = productId ? productsById.get(productId) : undefined;

    if (productId && !product) {
      addIssue(
        issues,
        "unknown-product-id",
        "Overlay Product ID is not canonical.",
        productId
      );
    }

    const shortValid = validateParagraph(
      candidate.shortDescription,
      product,
      productId,
      "shortDescription",
      issues
    );

    let descriptionValid = true;
    if (
      !Array.isArray(candidate.description) ||
      candidate.description.length === 0
    ) {
      addIssue(
        issues,
        "empty-required-field",
        "description must contain at least one paragraph.",
        productId
      );
      descriptionValid = false;
    } else {
      candidate.description.forEach((paragraph, paragraphIndex) => {
        if (
          !validateParagraph(
            paragraph,
            product,
            productId,
            `description[${paragraphIndex}]`,
            issues
          )
        ) {
          descriptionValid = false;
        }
      });
    }

    if (
      !["human", "ai-assisted", "machine-draft"].includes(
        String(candidate.provenance)
      )
    ) {
      addIssue(
        issues,
        "invalid-provenance",
        "Overlay provenance is invalid.",
        productId
      );
    }

    if (
      productId &&
      shortValid &&
      descriptionValid &&
      isHashableProductCopyContent(candidate)
    ) {
      const expectedHash = createProductCopyContentHash(candidate);

      validateReview(
        candidate.linguisticReview,
        expectedHash,
        productId,
        "Linguistic",
        issues
      );
      validateReview(
        candidate.technicalReview,
        expectedHash,
        productId,
        "Technical",
        issues
      );
    } else {
      validateReview(
        candidate.linguisticReview,
        "",
        productId,
        "Linguistic",
        issues
      );
      validateReview(
        candidate.technicalReview,
        "",
        productId,
        "Technical",
        issues
      );
    }
  });

  return {
    valid: issues.length === 0,
    entryCount: entries.length,
    issues,
  };
}

function validateUniqueCanonicalField(
  products: readonly Readonly<Product>[],
  field: "id" | "slug" | "partNumber",
  issues: ProductCopyValidationIssue[]
): void {
  const seen = new Set<string>();

  products.forEach((product) => {
    const value = product[field];
    if (!value.trim()) {
      addIssue(
        issues,
        `empty-canonical-${field}`,
        `Canonical ${field} is empty.`,
        product.id
      );
    } else if (seen.has(value)) {
      addIssue(
        issues,
        `duplicate-canonical-${field}`,
        `Canonical ${field} is duplicated.`,
        product.id
      );
    } else {
      seen.add(value);
    }
  });
}

function isCurrentApproval(review: unknown, expectedHash: string): boolean {
  return (
    isRecord(review) &&
    review.decision === "approved" &&
    typeof review.reviewerId === "string" &&
    Boolean(review.reviewerId.trim()) &&
    typeof review.evidenceRef === "string" &&
    Boolean(review.evidenceRef.trim()) &&
    typeof review.reviewedAt === "string" &&
    isValidIsoTimestamp(review.reviewedAt) &&
    review.reviewedContentHash === expectedHash
  );
}

export function validatePersianProductCopyForActivation(
  entries: readonly unknown[],
  canonicalProducts: readonly Readonly<Product>[]
): FullProductCopyValidationResult {
  const draftResult = validatePersianProductCopyDrafts(
    entries,
    canonicalProducts
  );
  const issues = [...draftResult.issues];

  if (canonicalProducts.length !== EXPECTED_PRODUCT_COUNT) {
    addIssue(
      issues,
      "canonical-count",
      `Expected ${EXPECTED_PRODUCT_COUNT} canonical Products; received ${canonicalProducts.length}.`
    );
  }

  validateUniqueCanonicalField(canonicalProducts, "id", issues);
  validateUniqueCanonicalField(canonicalProducts, "slug", issues);
  validateUniqueCanonicalField(canonicalProducts, "partNumber", issues);

  if (entries.length !== EXPECTED_PRODUCT_COUNT) {
    addIssue(
      issues,
      "overlay-count",
      `Persian Product-copy coverage is ${entries.length}/${EXPECTED_PRODUCT_COUNT}.`
    );
  }

  const canonicalIds = new Set(canonicalProducts.map((product) => product.id));
  const declaredIds = entries
    .map(getProductId)
    .filter((id): id is string => Boolean(id));
  const declaredIdSet = new Set(declaredIds);
  const missingIds = [...canonicalIds].filter((id) => !declaredIdSet.has(id));
  const extraIds = [...declaredIdSet].filter((id) => !canonicalIds.has(id));

  missingIds.forEach((id) =>
    addIssue(
      issues,
      "missing-overlay-id",
      "Canonical Product has no overlay.",
      id
    )
  );
  extraIds.forEach((id) =>
    addIssue(issues, "extra-overlay-id", "Overlay ID is not canonical.", id)
  );

  const lifecycleOmissionIds = canonicalProducts
    .filter((product) => product.lifecycle === undefined)
    .map((product) => product.id)
    .sort();
  const expectedLifecycleOmissionIds = [
    ...EXPECTED_LIFECYCLE_OMISSION_IDS,
  ].sort();

  if (
    lifecycleOmissionIds.length !== expectedLifecycleOmissionIds.length ||
    lifecycleOmissionIds.some(
      (id, index) => id !== expectedLifecycleOmissionIds[index]
    )
  ) {
    addIssue(
      issues,
      "lifecycle-omission-set",
      "Canonical lifecycle omissions do not match the established ten Product IDs."
    );
  }

  let approvedCount = 0;
  const hashableEntries: HashableProductCopyContent[] = [];

  entries.forEach((candidate) => {
    if (!isHashableProductCopyContent(candidate)) return;

    const expectedHash = createProductCopyContentHash(candidate);
    if (
      isCurrentApproval(candidate.linguisticReview, expectedHash) &&
      isCurrentApproval(candidate.technicalReview, expectedHash)
    ) {
      approvedCount += 1;
    } else {
      addIssue(
        issues,
        "not-fully-approved",
        "Both current linguistic and technical approvals are required.",
        candidate.productId
      );
    }
    hashableEntries.push(candidate);
  });

  if (
    issues.length > 0 ||
    canonicalProducts.length !== EXPECTED_PRODUCT_COUNT ||
    entries.length !== EXPECTED_PRODUCT_COUNT ||
    approvedCount !== EXPECTED_PRODUCT_COUNT ||
    missingIds.length > 0 ||
    extraIds.length > 0
  ) {
    return {
      valid: false,
      canonicalCount: canonicalProducts.length,
      overlayCount: entries.length,
      approvedCount,
      missingIds,
      extraIds,
      issues,
    };
  }

  const capability = issueActivationCapability(hashableEntries);

  return {
    valid: true,
    canonicalCount: EXPECTED_PRODUCT_COUNT,
    overlayCount: EXPECTED_PRODUCT_COUNT,
    approvedCount: EXPECTED_PRODUCT_COUNT,
    missingIds: [],
    extraIds: [],
    issues: [],
    capability,
  };
}
