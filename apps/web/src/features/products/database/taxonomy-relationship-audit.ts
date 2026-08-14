import { families } from "./families";
import { productTypes } from "./productTypes";
import { series } from "./series";

export interface TaxonomyRelationshipIssue {
  familyId: string;
  type: "child-mismatch";
  message: string;
}

export interface TaxonomyRelationshipAuditResult {
  valid: boolean;
  issues: TaxonomyRelationshipIssue[];
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

/**
 * Compares only the overlapping Siemens PLC family entries that
 * currently exist in both registries.
 *
 * Missing registry coverage is intentionally not treated as an error.
 * This registry is still being migrated toward a canonical taxonomy.
 */
export function auditSiemensTaxonomyRelationships(): TaxonomyRelationshipAuditResult {
  const issues: TaxonomyRelationshipIssue[] = [];

  const plcFamilies = new Set<string>(families.siemens.PLC);
  const plcProductTypeRegistry = productTypes.siemens.PLC;

  for (const familyId of Object.keys(series)) {
    if (!plcFamilies.has(familyId)) {
      continue;
    }

    if (
      !Object.prototype.hasOwnProperty.call(plcProductTypeRegistry, familyId)
    ) {
      continue;
    }

    const seriesChildren = new Set(
      unique(series[familyId as keyof typeof series])
    );

    const productTypeChildren = new Set(
      unique(
        plcProductTypeRegistry[familyId as keyof typeof plcProductTypeRegistry]
      )
    );

    for (const child of seriesChildren) {
      if (!productTypeChildren.has(child)) {
        issues.push({
          familyId,
          type: "child-mismatch",
          message: `"${child}" exists under "${familyId}" in series.ts but not in productTypes.ts.`,
        });
      }
    }

    for (const child of productTypeChildren) {
      if (!seriesChildren.has(child)) {
        issues.push({
          familyId,
          type: "child-mismatch",
          message: `"${child}" exists under "${familyId}" in productTypes.ts but not in series.ts.`,
        });
      }
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
