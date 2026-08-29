# Siemiran — Roadmap

Baseline: `main` at `2b9e8857108bfc6a5e4e3929ac06fefdf32041d3`

This roadmap contains future work only. Ordering expresses current priority, not
a finalized implementation design or semantic release schedule.

## 1. Siemens Data Pipeline Normalization

- Define a controlled path for the existing Siemens source-record classes to
  reach validation, Product mapping, and aggregation.
- Reduce the current coupling of the shared Siemens contract and adapter to the
  S7-300 CPU source shape.
- Preserve the repository pattern and canonical Product interface.

The specific generalized interface design is NOT ESTABLISHED and requires a
separately scoped architecture decision.

## 2. Taxonomy Reconciliation

- Reconcile S7-1200 source classification identifiers with verified taxonomy.
- Extend verified taxonomy only from confirmed manufacturer classifications.
- Establish validation coverage for the source classes selected for integration.

## 3. Controlled S7-1200 Integration

- Add an explicit aggregation path for the existing S7-1200 source modules.
- Integrate source classes in verified, reviewable batches.
- Resolve overlap between the manually declared active S7-1200 product and the
  source CPU dataset before activation.
- Do not expose the 181 source records as active Products until validation and
  mapping are established.

## 4. Remaining S7-300 Dataset Connection

- Connect existing SM, IM, FM, and CP datasets through the validated Product
  pipeline in controlled batches.
- Confirm taxonomy and source validation for each connected class.

## 5. Richer Specification Preservation

- Ensure verified module-specific fields survive mapping into displayable
  Product specifications.
- Define mapping behavior only after the Siemens source contract is scoped.

## 6. Inquiry Delivery and Persistence

- Connect the implemented inquiry UI and validation API to an approved delivery
  or persistence workflow.
- Add explicit success handling and operational failure visibility.

The delivery provider and storage architecture are NOT ESTABLISHED.

## 7. Automated Validation and Testing Baseline

- Add automated coverage for taxonomy, dataset integrity, adapters,
  repositories, catalog behavior, comparison, and inquiry validation.
- Select tooling in a separately reviewed task; no test framework is currently
  established.

## 8. CI/CD

- Add continuous checks for lint, TypeScript, production build, and the future
  automated validation suite.
- Define deployment automation only when the target environment is established.

## 9. Resource and Download Population

- Populate verified datasheets, manuals, firmware, certificates, and CAD
  resources using the existing download architecture.
- Keep resource provenance and product associations verifiable.

## 10. Catalog, SEO, and Later Platform Expansion

- Brand, category, family, series, and product-type landing pages
- Organization and Website structured data
- Sitemap and robots configuration
- Performance measurement and optimization
- CMS/API/database/cache evaluation after current catalog architecture is stable
