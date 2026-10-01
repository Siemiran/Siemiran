# Siemiran — Roadmap

Baseline: `main` at `84d4fe14e82e7a922509a5ca8899cd50f1d3167d`

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
- PR #58, `feat: add Batch 02 Persian product copy`, squash-merged at
  `2026-09-23T19:42:52Z` as
  `e1f844f11e6a29ec14dbe66e1531de37d6700342`. Batch 02 covers exactly five
  SIMATIC S7-300 fail-safe CPUs with independently reviewed Product-specific
  technical-token mappings and current dual approvals.
- PR #60 (`ac99ce8579d3753a2d4f4aeb6bd22b4fd7f4e514`) corrected the
  canonical S7-300 SM321 1BH10 specifications by removing unsupported
  diagnostics and interrupt fields and omitting the disputed input-delay claim
  because official evidence conflicted; no replacement delay value was
  verified.
- PR #61, `feat: add Batch 03 Persian product copy`, squash-merged at
  `2026-09-25T08:01:51Z` as
  `b7debb1d9c6b25a787f1cb534247bfba63d001c3`. Batch 03 covers five
  S7-300 SM321 digital-input Products: `6ES7321-1BH02-0AA0`,
  `6ES7321-1BH10-0AA0`, `6ES7321-1BL00-0AA0`, `6ES7321-1BP00-0AA0`, and
  `6ES7321-1CH20-0AA0`. Private drafts have current hash-bound linguistic and
  technical approvals. Technical review used indexed exact-product official
  Siemens datasheet content; direct PDF requests returned HTTP 403, as recorded
  in the approval notes. The corrected 1BH10 draft makes no delay, diagnostics,
  or interrupt claim. Batch 03 added no technical-token overrides. Batches 01
  and 02 remain unchanged historical work.
- PR #64 merged at `2026-09-27T18:29:17Z` as
  `00af171572c427dba986340e7efd36f8ca0ad1d7`; the maintainer-approved 1FF10
  uncertainty handling passed independent verification. The representation
  blocker is resolved, while factual current lifecycle remains UNKNOWN:
  source `unverified`, canonical lifecycle omitted, no public legacy or
  `unverified` label, and comparison's existing missing-value display.
  S7-300 provenance is 185 Siemens-official verified / 11 explicitly unverified.
- PR #65, `feat: add Batch 04 Persian product copy`, squash-merged at
  `2026-09-28T18:03:45Z` as
  `84d4fe14e82e7a922509a5ca8899cd50f1d3167d`. Its sole parent is
  `00af171572c427dba986340e7efd36f8ca0ad1d7`; reviewed head was
  `2eefce5487fb08872ed6a92f94e3b13d12659fa6`, with identical squash/reviewed
  tree `e567b87b9e7bb9274bab69fec9f3ed98e68964ad`. It covers exactly five
  private SM321 drafts: `6ES7321-1CH00-0AA0`, `6ES7321-1EL00-0AA0`,
  `6ES7321-1FF01-0AA0`, `6ES7321-1FF10-0AA0`, and `6ES7321-1FH00-0AA0`.
  Their current dual approvals use Siemens-indexed exact-product datasheet
  text and available product HTML; direct PDF access returned HTTP 403 during
  review. No fresh direct PDF access or 1FF10 lifecycle verification is claimed.
  Batch 04 added zero overrides and made no canonical Product-data change.
  Batches 01–03 remain unchanged historical work.
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
  20/382, with 20 current dual approvals and 362 Products not yet drafted or
  approved.
- Technical-token overrides cover 10 Products, 20 assignments, and 7 unique
  strings; the global allowlist remains empty.
- Active Persian Product-copy coverage remains 0/382, no activation capability
  exists, publication is disabled, and public FA/EN Product prose remains
  canonical English/LTR. Batch approvals do not authorize publication or
  partial activation.
  Activation and publication remain blocked until all 382/382 Products have
  current dual approvals and separate authorization is given. Earlier pending
  PR #64 review and Batch 04 drafting-blocker wording is historical and superseded.

## Next Resume Workflow

1. Complete independent review of the documentation reconciliation on
   `docs/reconcile-fourth-persian-product-copy-batch`.
2. Obtain separate authorization for push/PR creation.
3. Perform a guarded squash merge and local synchronization in the authorized
   follow-up workflow.
4. Then perform a read-only Batch 05 readiness audit recommending exactly five
   coherent Products for independent scope/token review. Batch 05 has not
   started and no scope is approved.

The documentation review, push/PR, and merge are pending. The durable checkpoint
and session-end/resume checklist are in
[SESSION_HANDOFF.md](SESSION_HANDOFF.md).

## 1. Persian Product-copy Drafting, Review, and Atomic Activation

1. Draft accurate Persian Product copy in controlled, reviewable batches while
   keeping canonical Product/source data unchanged.
2. Complete human linguistic review for each draft.
3. Complete human technical review for each draft, with both approvals bound to
   the current deterministic content hash.
4. Pass complete 382/382 dual-approval validation.
5. Obtain separate authorization and perform one atomic public activation only
   after the complete gate passes; drafting/review batches may never be
   partially activated.
6. Only after the complete Product-copy gate, activate public bilingual SEO,
   reciprocal hreflang, and localized sitemap coverage.

Throughout drafting and review, canonical technical tokens remain untranslated:
MLFBs, Product IDs, slugs, part numbers, official model/family names, protocols,
standards, values, units, and URLs. Batches 01–03 remain unchanged historical
work; Batch 04 private drafting and dual review are complete for exactly five
S7-300 SM321 digital-input Products. Future drafting requires separately
approved scope after the Batch 05 readiness and independent scope/token review.

After Persian Product-copy completion, perform a dedicated local visual and
functional website inspection with the maintainer: FA/EN switching, Persian
wording, RTL/LTR isolation, Product pages, cards, comparison, and responsive
layouts. This is pending. A later preview task must explicitly define how
completed Persian copy is displayed; private drafts authorize neither activation
nor publication.

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

Persian Product-copy drafting and review are complete privately for 20/382
Products but not for the remaining 362. The 382/382 current dual-approval gate,
separate activation authorization, atomic publication, maintainer website inspection,
bilingual SEO activation, inquiry delivery, CI/CD, download population, and
another Siemens-series expansion are not complete. Consumer integration and
its trusted/public presentation boundaries are complete.
