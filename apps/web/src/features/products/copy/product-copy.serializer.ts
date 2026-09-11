import type {
  ProductCopyParagraph,
  ResolvedProductCopy,
} from "./product-copy.types";

export const LRI = "\u2066";
export const PDI = "\u2069";

const BIDI_ISOLATION_CONTROLS = /[\u2066-\u2069]/gu;

export function serializeProductCopyParagraph(
  paragraph: ProductCopyParagraph
): string {
  return paragraph
    .map((segment) =>
      segment.kind === "technical"
        ? `${LRI}${segment.value}${PDI}`
        : segment.value
    )
    .join("");
}

export function serializeProductCopyParagraphs(
  paragraphs: readonly ProductCopyParagraph[]
): string {
  return paragraphs.map(serializeProductCopyParagraph).join("\n\n");
}

export function serializeResolvedProductCopy(
  copy: Readonly<ResolvedProductCopy>
) {
  return {
    shortDescription: serializeProductCopyParagraph(copy.shortDescription),
    description: serializeProductCopyParagraphs(copy.description),
    seoTitle: serializeProductCopyParagraph(copy.seoTitle),
    seoDescription: serializeProductCopyParagraph(copy.seoDescription),
  } as const;
}

export function serializeProductCopyParagraphForSearch(
  paragraph: ProductCopyParagraph
): string {
  return paragraph.map((segment) => segment.value).join("");
}

export function serializeProductCopyParagraphsForSearch(
  paragraphs: readonly ProductCopyParagraph[]
): string {
  return paragraphs.map(serializeProductCopyParagraphForSearch).join("\n\n");
}

export function normalizeProductCopySearchValue(value: string): string {
  return value
    .replace(BIDI_ISOLATION_CONTROLS, "")
    .normalize("NFC")
    .toLocaleLowerCase();
}
