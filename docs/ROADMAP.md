# Siemiran — Roadmap

Baseline: `main` at `2d7305e28b183c3f1bde0f6b773fc29ebc619eec`

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
- The typed Product-copy infrastructure and all intended consumer integrations
  are merged through PR #52 and independently verified with a Task BW **PASS**.
- PR #54 (`c690216efc9895866f42586d3686b736da111155`) merged the
  Product-specific technical-token policy.
- PR #55 (`25c63e4f7926c782fa9015521734798a9b6f91c1`) merged the first five
  private Persian Product-copy drafts.
- PR #56 (`2d7305e28b183c3f1bde0f6b773fc29ebc619eec`) merged their exact
  linguistic and technical approvals.
- Product listing, cards/meta, featured and related Products, detail
  header/body, search, metadata/OpenGraph/Twitter, Product JSON-LD, comparison,
  and inquiry identity use the central resolver/presentation boundary.
- Its server-only trusted boundary and inert public DTO boundary fail closed,
  with descriptor-first validation, exhaustive field policy, independently
  detached/deeply frozen snapshots, runtime-authenticated boundaries, and no
  private review or publication state exposed to clients.
- Comparison persists validated Product IDs under
  `siemiran:product-comparison` and safely migrates legacy stored objects.
- Private drafts, linguistic approvals, and technical approvals are each
  5/382, with five current dual approvals and 377 Products not yet drafted or
  approved.
- Active Persian Product-copy coverage remains 0/382, no activation capability
  exists, publication is disabled, and public FA/EN Product prose remains
  canonical English/LTR. Batch 01 approval does not authorize publication or
  partial activation, and canonical Product data is unchanged.

## 1. Persian Product-copy Drafting, Review, and Atomic Activation

1. Draft accurate Persian Product copy in controlled, reviewable batches while
   keeping canonical Product/source data unchanged.
2. Complete human linguistic review for each draft.
3. Complete human technical review for each draft, with both approvals bound to
   the current deterministic content hash.
4. Pass complete 382/382 dual-approval validation.
5. Perform one atomic public activation only after the complete gate passes;
   drafting/review batches may never be partially activated.
6. Only after the complete Product-copy gate, activate public bilingual SEO,
   reciprocal hreflang, and localized sitemap coverage.

Throughout drafting and review, canonical technical tokens remain untranslated:
MLFBs, Product IDs, slugs, part numbers, official model/family names, protocols,
standards, values, units, and URLs. Batch 01 private drafting and dual review
are complete for five Products. The next unstarted implementation phase is
another controlled private drafting batch, not activation.

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

Persian Product-copy drafting and review, the 382/382 dual-approval gate, atomic
publication, bilingual SEO activation, inquiry delivery, CI/CD, download
population, and another Siemens-series expansion are not complete. Consumer
integration and its trusted/public presentation boundaries are complete.
