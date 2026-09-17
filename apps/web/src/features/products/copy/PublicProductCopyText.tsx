import { Fragment } from "react";

import type {
  PublicProductCopyDirection,
  PublicProductCopyLanguage,
  PublicProductCopyParagraphDTO,
} from "./product-copy.public-types";

interface PublicProductCopyInlineProps {
  readonly language: PublicProductCopyLanguage;
  readonly direction: PublicProductCopyDirection;
  readonly paragraph: PublicProductCopyParagraphDTO;
  readonly className?: string;
}

interface PublicProductCopyBlockProps {
  readonly language: PublicProductCopyLanguage;
  readonly direction: PublicProductCopyDirection;
  readonly paragraphs: readonly PublicProductCopyParagraphDTO[];
  readonly className?: string;
  readonly paragraphClassName?: string;
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function hasValidLanguageDirection(
  language: unknown,
  direction: unknown
): language is PublicProductCopyLanguage {
  return (
    (language === "en" && direction === "ltr") ||
    (language === "fa" && direction === "rtl")
  );
}

function isPublicSegment(
  value: unknown
): value is PublicProductCopyParagraphDTO[number] {
  if (!isPlainRecord(value)) return false;

  return (
    (value.kind === "text" || value.kind === "technical") &&
    typeof value.value === "string" &&
    value.value.length > 0
  );
}

function isPublicParagraph(
  value: unknown
): value is PublicProductCopyParagraphDTO {
  return (
    Array.isArray(value) && value.length > 0 && value.every(isPublicSegment)
  );
}

function renderPublicSegments(paragraph: PublicProductCopyParagraphDTO) {
  return paragraph.map((segment, index) => (
    <Fragment key={index}>
      {segment.kind === "technical" ? (
        <bdi dir="ltr" lang="en">
          {segment.value}
        </bdi>
      ) : (
        segment.value
      )}
    </Fragment>
  ));
}

export function PublicProductCopyInline({
  language,
  direction,
  paragraph,
  className,
}: PublicProductCopyInlineProps) {
  if (
    !hasValidLanguageDirection(language, direction) ||
    !isPublicParagraph(paragraph)
  ) {
    return null;
  }

  return (
    <span lang={language} dir={direction} className={className}>
      {renderPublicSegments(paragraph)}
    </span>
  );
}

export function PublicProductCopyBlock({
  language,
  direction,
  paragraphs,
  className,
  paragraphClassName,
}: PublicProductCopyBlockProps) {
  if (
    !hasValidLanguageDirection(language, direction) ||
    !Array.isArray(paragraphs) ||
    paragraphs.length === 0 ||
    !paragraphs.every(isPublicParagraph)
  ) {
    return null;
  }

  return (
    <div lang={language} dir={direction} className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={paragraphClassName}>
          {renderPublicSegments(paragraph)}
        </p>
      ))}
    </div>
  );
}
