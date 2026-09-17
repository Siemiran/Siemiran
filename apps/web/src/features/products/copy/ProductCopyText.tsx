import "server-only";

import { Fragment } from "react";

import type { ResolvedProductCopy } from "./product-copy.types";
import { assertResolverIssuedProductCopy } from "./product-copy.resolver";

type ProductCopyField =
  "shortDescription" | "description" | "seoTitle" | "seoDescription";

interface ProductCopyInlineProps {
  readonly copy: Readonly<ResolvedProductCopy>;
  readonly field: Exclude<ProductCopyField, "description">;
  readonly className?: string;
}

interface ProductCopyBlockProps {
  readonly copy: Readonly<ResolvedProductCopy>;
  readonly field: "description";
  readonly className?: string;
  readonly paragraphClassName?: string;
}

function renderProductSegments(
  paragraph: ResolvedProductCopy["shortDescription"]
) {
  return paragraph.map((segment, segmentIndex) => (
    <Fragment key={segmentIndex}>
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

export function ProductCopyInline({
  copy,
  field,
  className,
}: ProductCopyInlineProps) {
  assertResolverIssuedProductCopy(copy);

  const isPersian = copy.source === "approved-fa";

  return (
    <span
      lang={isPersian ? "fa" : "en"}
      dir={isPersian ? "rtl" : "ltr"}
      className={className}
    >
      {renderProductSegments(copy[field])}
    </span>
  );
}

export function ProductCopyBlock({
  copy,
  className,
  paragraphClassName,
}: ProductCopyBlockProps) {
  assertResolverIssuedProductCopy(copy);

  const isPersian = copy.source === "approved-fa";

  if (copy.description.length === 0) return null;

  return (
    <div
      lang={isPersian ? "fa" : "en"}
      dir={isPersian ? "rtl" : "ltr"}
      className={className}
    >
      {copy.description.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex} className={paragraphClassName}>
          {renderProductSegments(paragraph)}
        </p>
      ))}
    </div>
  );
}
