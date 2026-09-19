import "server-only";

import { products } from "../data/products";
import type { Product } from "../types/product.types";
import { getReviewedProductTechnicalTokenOverrideEntries } from "./product-copy.technical-token-overrides";

/** Reviewed cross-Product exceptions belong here. No exception is currently needed. */
export const reviewedGlobalTechnicalTokens =
  [] as const satisfies readonly string[];

const RAW_TECHNICAL_CONTENT = /\p{Script=Latin}|[0-9\u0660-\u0669]/u;
const ASCII_DIGIT = /[0-9]/u;
const DERIVED_LONG_LOWERCASE_WORD = /\p{Ll}{4,}/u;
const UPPERCASE_TECHNICAL_TOKEN = /^[A-Z0-9]+(?:[ .,+/()%+-][A-Z0-9]+)*$/u;
const PRODUCT_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const REVIEWED_OVERRIDE_TOKEN =
  /^(?:[A-Z0-9]+|[a-z]+[A-Z][A-Za-z0-9]*)(?:[ .,+/()%+-](?:[A-Z0-9]+|[a-z]+[A-Z][A-Za-z0-9]*))*$/u;
const STANDALONE_LOWERCASE_ASCII_WORD = /(?:^|[^A-Za-z])[a-z]+(?=$|[^A-Za-z])/u;
const TECHNICAL_TOKEN_MAX_LENGTH = 80;
const INVALID_TOKEN_WHITESPACE = /[^\S ]| {2,}/u;
const FORBIDDEN_TOKEN_CHARACTER =
  /[\u0000-\u001f\u007f-\u009f\u061c\u0640\u200b-\u200f\u202a-\u202e\u2060\u2066-\u2069\ufeff]/u;
const UNEXPECTED_FORMAT_CHARACTER = /\p{Cf}/u;
const TOKEN_BOUNDARY_CHARACTER = /[\p{L}\p{N}]/u;
const OVERRIDE_ENTRY_KEYS = ["productId", "tokens"] as const;
const EMPTY_OVERRIDE_TOKENS = Object.freeze([]) as readonly string[];

export interface ProductTechnicalTokenOverrideValidationIssue {
  readonly code: string;
  readonly message: string;
  readonly productId?: string;
  readonly token?: string;
}

export interface ProductTechnicalTokenOverrideResolver {
  readonly valid: boolean;
  readonly entryCount: number;
  readonly tokenCount: number;
  readonly issues: readonly ProductTechnicalTokenOverrideValidationIssue[];
  readonly entries: readonly {
    readonly productId: string;
    readonly tokens: readonly string[];
  }[];
  readonly diagnostic?: string;
  getTokensForProduct(productId: string): readonly string[];
}

function addToken(tokens: Set<string>, value: unknown): void {
  if (typeof value === "string" && value.length > 0) {
    tokens.add(value);
  }
}

export function containsRawTechnicalContent(value: string): boolean {
  return RAW_TECHNICAL_CONTENT.test(value);
}

function isAtomicTechnicalSpecificationValue(value: string): boolean {
  if (value.length > TECHNICAL_TOKEN_MAX_LENGTH) return false;

  return (
    UPPERCASE_TECHNICAL_TOKEN.test(value) ||
    (ASCII_DIGIT.test(value) && !DERIVED_LONG_LOWERCASE_WORD.test(value))
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function addOverrideIssue(
  issues: ProductTechnicalTokenOverrideValidationIssue[],
  code: string,
  message: string,
  productId?: string,
  token?: string
): void {
  issues.push({
    code,
    message,
    ...(productId !== undefined ? { productId } : {}),
    ...(token !== undefined ? { token } : {}),
  });
}

function getCanonicalOccurrenceCorpus(
  product: Readonly<Product>
): readonly string[] {
  return [
    product.title,
    product.shortDescription,
    ...(product.description ? product.description.split(/\n\n+/u) : []),
    ...Object.values(product.specifications ?? {}),
    ...(product.compatibility ?? []),
  ];
}

function hasMeaningfulTokenOccurrence(value: string, token: string): boolean {
  let searchFrom = 0;

  while (searchFrom <= value.length - token.length) {
    const index = value.indexOf(token, searchFrom);
    if (index < 0) return false;

    const preceding = value[index - 1] ?? "";
    const following = value[index + token.length] ?? "";
    const precedingBoundary =
      !preceding || !TOKEN_BOUNDARY_CHARACTER.test(preceding);
    const followingBoundary =
      !following || !TOKEN_BOUNDARY_CHARACTER.test(following);

    if (precedingBoundary && followingBoundary) return true;
    searchFrom = index + 1;
  }

  return false;
}

function getTokenFormatIssue(token: string): string | undefined {
  if (!token) return "Override tokens must not be empty.";
  if (token.length > TECHNICAL_TOKEN_MAX_LENGTH) {
    return `Override tokens must not exceed ${TECHNICAL_TOKEN_MAX_LENGTH} characters.`;
  }
  if (token.trim() !== token || INVALID_TOKEN_WHITESPACE.test(token)) {
    return "Override tokens must use single ASCII spaces without boundary whitespace.";
  }
  if (
    FORBIDDEN_TOKEN_CHARACTER.test(token) ||
    UNEXPECTED_FORMAT_CHARACTER.test(token)
  ) {
    return "Override tokens must not contain control, bidi, or invisible characters.";
  }
  if (token.normalize("NFC") !== token) {
    return "Override tokens must use Unicode NFC normalization.";
  }
  if (
    !REVIEWED_OVERRIDE_TOKEN.test(token) ||
    STANDALONE_LOWERCASE_ASCII_WORD.test(token)
  ) {
    return "Override tokens must match the strict reviewed technical-token grammar.";
  }

  return undefined;
}

function getTokenEvidenceIssue(
  token: string,
  product: Readonly<Product>
): string | undefined {
  const canonicalDescriptions = [
    product.shortDescription,
    ...(product.description ? product.description.split(/\n\n+/u) : []),
  ];

  if (canonicalDescriptions.includes(token)) {
    return "A complete canonical description must not become a technical token.";
  }

  if (
    !getCanonicalOccurrenceCorpus(product).some((value) =>
      hasMeaningfulTokenOccurrence(value, token)
    )
  ) {
    return "Override token does not occur at a meaningful boundary in canonical Product content.";
  }

  return undefined;
}

function freezeIssue(
  issue: ProductTechnicalTokenOverrideValidationIssue
): ProductTechnicalTokenOverrideValidationIssue {
  return Object.freeze({ ...issue });
}

function formatOverrideDiagnostic(
  issues: readonly ProductTechnicalTokenOverrideValidationIssue[]
): string {
  return `Invalid Product technical-token override configuration: ${issues
    .map(
      (issue) =>
        `${issue.code}${issue.productId ? ` [${issue.productId}]` : ""}${issue.token ? ` [${issue.token}]` : ""}: ${issue.message}`
    )
    .join(" | ")}`;
}

/**
 * Builds the same fail-closed resolver used by production. Invalid input retains
 * diagnostics but commits no authorization snapshot.
 */
export function createProductTechnicalTokenOverrideResolver(
  configuration: unknown,
  canonicalProducts: readonly Readonly<Product>[]
): ProductTechnicalTokenOverrideResolver {
  const issues: ProductTechnicalTokenOverrideValidationIssue[] = [];
  const productsById = new Map(
    canonicalProducts.map((product) => [product.id, product])
  );
  const seenProductIds = new Set<string>();
  const validatedEntries: { productId: string; tokens: string[] }[] = [];
  let tokenCount = 0;

  if (!Array.isArray(configuration)) {
    addOverrideIssue(
      issues,
      "invalid-override-root",
      "Product technical-token override configuration must be an array."
    );
  } else {
    Array.from({ length: configuration.length }, (_, index) => index).forEach(
      (entryIndex) => {
        const candidate = configuration[entryIndex];
        if (!isRecord(candidate)) {
          addOverrideIssue(
            issues,
            "invalid-override-entry",
            `Override entry ${entryIndex} must be an object.`
          );
          return;
        }

        const ownKeys = Reflect.ownKeys(candidate);
        const stringKeys = ownKeys.filter(
          (key): key is string => typeof key === "string"
        );
        const missingKeys = OVERRIDE_ENTRY_KEYS.filter(
          (key) => !Object.hasOwn(candidate, key)
        );
        const extraKeys = stringKeys.filter(
          (key) => !(OVERRIDE_ENTRY_KEYS as readonly string[]).includes(key)
        );

        missingKeys.forEach((key) =>
          addOverrideIssue(
            issues,
            "missing-override-field",
            `Override entry ${entryIndex} is missing required field: ${key}.`
          )
        );
        if (extraKeys.length > 0 || ownKeys.length !== stringKeys.length) {
          addOverrideIssue(
            issues,
            "unsupported-override-field",
            `Override entry ${entryIndex} contains unsupported fields.`
          );
        }

        const productId = candidate.productId;
        const validProductId =
          typeof productId === "string" && PRODUCT_ID.test(productId);

        if (!validProductId) {
          addOverrideIssue(
            issues,
            "invalid-override-product-id",
            `Override entry ${entryIndex} requires a canonical Product-ID value.`,
            typeof productId === "string" ? productId : undefined
          );
        } else if (seenProductIds.has(productId)) {
          addOverrideIssue(
            issues,
            "duplicate-override-product-id",
            "Override Product IDs must be unique.",
            productId
          );
        } else {
          seenProductIds.add(productId);
        }

        const product = validProductId
          ? productsById.get(productId)
          : undefined;
        if (validProductId && !product) {
          addOverrideIssue(
            issues,
            "unknown-override-product-id",
            "Override Product ID is not canonical.",
            productId
          );
        }

        const candidateTokens = candidate.tokens;
        if (!Array.isArray(candidateTokens) || candidateTokens.length === 0) {
          addOverrideIssue(
            issues,
            "invalid-override-tokens",
            "Each override entry requires a non-empty token array.",
            validProductId ? productId : undefined
          );
          return;
        }

        const seenTokens = new Set<string>();
        const committedTokens = new Set<string>();
        const validatedTokens: string[] = [];

        Array.from(
          { length: candidateTokens.length },
          (_, index) => index
        ).forEach((tokenIndex) => {
          const value = candidateTokens[tokenIndex];
          tokenCount += 1;

          if (typeof value !== "string") {
            addOverrideIssue(
              issues,
              "invalid-override-token",
              `Override token ${entryIndex}:${tokenIndex} must be a string.`,
              validProductId ? productId : undefined
            );
            return;
          }

          if (seenTokens.has(value)) {
            addOverrideIssue(
              issues,
              "duplicate-override-token",
              "Override tokens must be unique within each Product.",
              validProductId ? productId : undefined,
              value
            );
          } else {
            seenTokens.add(value);
          }

          const formatIssue = getTokenFormatIssue(value);
          if (formatIssue) {
            addOverrideIssue(
              issues,
              "invalid-override-token",
              formatIssue,
              validProductId ? productId : undefined,
              value
            );
            return;
          }

          if (product) {
            const evidenceIssue = getTokenEvidenceIssue(value, product);
            if (evidenceIssue) {
              addOverrideIssue(
                issues,
                "invalid-override-evidence",
                evidenceIssue,
                typeof productId === "string" ? productId : undefined,
                value
              );
              return;
            }
          }

          if (validProductId && product && !committedTokens.has(value)) {
            validatedTokens.push(value);
            committedTokens.add(value);
          }
        });

        if (validProductId && product) {
          validatedEntries.push({ productId, tokens: validatedTokens });
        }
      }
    );
  }

  const frozenIssues = Object.freeze(issues.map(freezeIssue));
  const valid = frozenIssues.length === 0;
  const frozenEntries = Object.freeze(
    (valid ? validatedEntries : []).map((entry) =>
      Object.freeze({
        productId: entry.productId,
        tokens: Object.freeze([...entry.tokens]),
      })
    )
  );
  const tokensByProductId = new Map(
    frozenEntries.map((entry) => [entry.productId, entry.tokens])
  );
  const diagnostic = valid ? undefined : formatOverrideDiagnostic(frozenIssues);

  return Object.freeze({
    valid,
    entryCount: Array.isArray(configuration) ? configuration.length : 0,
    tokenCount,
    issues: frozenIssues,
    entries: frozenEntries,
    ...(diagnostic ? { diagnostic } : {}),
    getTokensForProduct(productId: string): readonly string[] {
      if (diagnostic) throw new Error(diagnostic);
      const resolved = tokensByProductId.get(productId);
      return resolved ? Object.freeze([...resolved]) : EMPTY_OVERRIDE_TOKENS;
    },
  });
}

const productionOverrideResolver = createProductTechnicalTokenOverrideResolver(
  getReviewedProductTechnicalTokenOverrideEntries(),
  products
);

if (!productionOverrideResolver.valid) {
  productionOverrideResolver.getTokensForProduct("");
}

export function deriveAllowedTechnicalTokens(
  product: Readonly<Product>
): ReadonlySet<string> {
  const tokens = new Set<string>(reviewedGlobalTechnicalTokens);

  [
    product.id,
    product.slug,
    product.title,
    product.brandId,
    product.categoryId,
    product.familyId,
    product.seriesId,
    product.productTypeId,
    product.variantId,
    product.partNumber,
    product.manufacturerPartNumber,
    product.ean,
    product.replacementProduct,
    product.siemensUrl,
  ].forEach((value) => addToken(tokens, value));

  product.images.forEach((value) => addToken(tokens, value));
  product.tags?.forEach((value) => addToken(tokens, value));
  product.compatibility?.forEach((value) => addToken(tokens, value));
  product.accessories?.forEach((value) => addToken(tokens, value));
  product.relatedProducts?.forEach((value) => addToken(tokens, value));

  Object.values(product.specifications ?? {}).forEach((value) => {
    if (isAtomicTechnicalSpecificationValue(value)) {
      addToken(tokens, value);
    }
  });

  product.downloads.forEach((download) => {
    [download.id, download.size, download.file].forEach((value) =>
      addToken(tokens, value)
    );
  });

  productionOverrideResolver
    .getTokensForProduct(product.id)
    .forEach((value) => addToken(tokens, value));

  return tokens;
}

export function isAllowedTechnicalToken(
  value: string,
  product: Readonly<Product>
): boolean {
  return deriveAllowedTechnicalTokens(product).has(value);
}
