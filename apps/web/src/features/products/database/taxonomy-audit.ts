import { families } from "./families";
import { series } from "./series";
import { productTypes } from "./productTypes";

export interface TaxonomyAuditIssue {
  type: "family" | "series" | "product-type";
  message: string;
}

export interface TaxonomyAuditResult {
  valid: boolean;
  issues: TaxonomyAuditIssue[];
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

/**
 * Audits the current taxonomy registries without assuming that
 * series.ts and productTypes.ts already represent the same relation model.
 *
 * This is intentionally an audit layer, not a production validation gate.
 */
export function auditSiemensTaxonomy(): TaxonomyAuditResult {
  const issues: TaxonomyAuditIssue[] = [];

  const siemensFamilies = families.siemens;

  for (const [category, familyList] of Object.entries(siemensFamilies)) {
    const familyValues = unique(familyList);

    if (familyValues.length !== familyList.length) {
      issues.push({
        type: "family",
        message: `Duplicate family in category "${category}"`,
      });
    }
  }

  for (const [familyId, children] of Object.entries(series)) {
    if (!siemensFamilies.PLC.includes(familyId as never)) {
      continue;
    }

    const values = unique(children);

    if (values.length !== children.length) {
      issues.push({
        type: "series",
        message: `Duplicate child entry in series registry for "${familyId}"`,
      });
    }
  }

  const plcProductTypes = productTypes.siemens.PLC;

  for (const [familyId, children] of Object.entries(plcProductTypes)) {
    const values = unique(children);

    if (values.length !== children.length) {
      issues.push({
        type: "product-type",
        message: `Duplicate product type in PLC registry for "${familyId}"`,
      });
    }
  }

  for (const familyId of Object.keys(series)) {
    if (!(familyId in plcProductTypes)) {
      issues.push({
        type: "series",
        message: `Family "${familyId}" exists in series.ts but not in productTypes.ts`,
      });
    }
  }

  for (const familyId of Object.keys(plcProductTypes)) {
    if (!(familyId in series)) {
      issues.push({
        type: "product-type",
        message: `Family "${familyId}" exists in productTypes.ts but not in series.ts`,
      });
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
