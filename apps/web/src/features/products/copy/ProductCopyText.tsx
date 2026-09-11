import "server-only";

import { Fragment } from "react";

import type { ResolvedProductCopy } from "./product-copy.types";
import { assertResolverIssuedProductCopy } from "./product-copy.resolver";

type ProductCopyField =
  "shortDescription" | "description" | "seoTitle" | "seoDescription";

interface ProductCopyTextProps {
  readonly copy: Readonly<ResolvedProductCopy>;
  readonly field: ProductCopyField;
  readonly className?: string;
}

export default function ProductCopyText({
  copy,
  field,
  className,
}: ProductCopyTextProps) {
  assertResolverIssuedProductCopy(copy);

  const paragraphs = field === "description" ? copy.description : [copy[field]];
  const isPersian = copy.source === "approved-fa";

  if (paragraphs.length === 0) return null;

  return (
    <div
      lang={isPersian ? "fa" : "en"}
      dir={isPersian ? "rtl" : "ltr"}
      className={className}
    >
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex}>
          {paragraph.map((segment, segmentIndex) => (
            <Fragment key={segmentIndex}>
              {segment.kind === "technical" ? (
                <bdi dir="ltr" lang="en">
                  {segment.value}
                </bdi>
              ) : (
                segment.value
              )}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
