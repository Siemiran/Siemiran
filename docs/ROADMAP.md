# Siemiran — Roadmap

Baseline: `main` at `c37272e4da8e7a7f509b917eacff833fea6b58b9`

This roadmap distinguishes the completed repository baseline from future
priorities. Ordering expresses current priority, not a finalized implementation
design or semantic release schedule.

## Completed Baseline

- Siemens pipeline normalization is complete.
- Taxonomy reconciliation is complete.
- S7-1200 coverage is complete at 186/186.
- S7-300 is formally closed at 196/196 under the current provenance policy.
- The global Product total is 382.
- The Persian/English routing foundation is merged and independently verified.
- Product-detail generation covers 382 Persian routes and 382 English routes.
- Static generation completes 774/774.
- UI catalogs contain 123 matched messages per locale.
- English routes remain temporarily `noindex, follow`.
- The inactive typed Product-copy infrastructure is merged and independently
  verified.
- Its server-only validation, publication, and resolution foundation fails
  closed, with immutable snapshots and runtime-authenticated boundaries.
- The Product-copy registry is 0/382 and publication is disabled.

## 1. Persian Product-copy Integration, Drafting, and Activation

1. Wire the resolver into all Product-copy consumers while publication remains
   disabled and prove unchanged canonical output across visible UI, Metadata,
   OpenGraph/Twitter, JSON-LD, Product cards, related Products, and search.
2. Ensure search and comparison persistence use safe locale-aware presentation
   boundaries without shipping drafts or reviewer data.
3. Draft accurate Persian Product copy in controlled batches while keeping
   canonical Product/source data unchanged and canonical technical tokens
   bidi-isolated.
4. Complete linguistic and technical review with approvals bound to the current
   deterministic content hash.
5. Pass the complete, exact 382/382 activation gate.
6. Activate Persian Product copy atomically, with no partial publication.

## 2. Bilingual SEO Activation

- Begin public bilingual SEO activation only after the complete 382/382
  Persian Product-copy approval gate passes.
- Remove temporary English `noindex` only at the approved launch gate.
- Add correct reciprocal hreflang and alternate links.
- Add localized sitemap coverage.
- Verify locale-specific canonical, OpenGraph, and structured-data output.
- Prevent duplicate-content or partial-indexing rollout.

## 3. Richer Specification Preservation

- Preserve verified module-specific fields.
- Translate presentation labels only where appropriate.
- Keep canonical technical values and engineering units unchanged.

## 4. Inquiry Delivery and Persistence

- Select an approved delivery or storage provider.
- Add success handling and operational failure visibility.
- Preserve localized presentation and the shared validation contract.

## 5. Automated Validation and CI/CD

- Automate locale routing, catalog parity, Product integrity, bidi, lifecycle
  omission, lint, TypeScript, and production-build checks.
- Add a deployment workflow only after target hosting is selected.

## 6. Resource and Download Population

- Add verified Siemens datasheets, manuals, firmware, certificates, and CAD.
- Keep provenance and Product associations verifiable.

## 7. Catalog and SEO Expansion

- Add localized brand, category, family, series, and product-type landing pages.
- Add Organization and Website structured data.
- Measure and optimize performance.

## 8. Later Product/Platform Expansion

- Do not begin another Siemens series until the owner selects it in a separate
  task.
- Keep CMS, API, database, and cache evaluation as future architecture
  decisions.

Product-copy consumer integration, Persian drafting and review, the 382/382
activation gate, atomic publication, bilingual SEO activation, inquiry
delivery, CI/CD, download population, and another Siemens-series expansion are
not complete. The underlying inactive Product-copy infrastructure is complete.
