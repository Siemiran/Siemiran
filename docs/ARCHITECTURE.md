# Siemiran — Current Architecture

Implementation base: `main` at `7a3525d59c26ad60105f3fa8c48900afe79118f1` (2026-11-27)

Current checkpoint and resume workflow: [SESSION_HANDOFF.md](SESSION_HANDOFF.md).

## Repository Structure

```text
Siemiran/
├── apps/
│   └── web/
│       ├── app/
│       │   └── [locale]/           Next.js App Router route tree
│       ├── public/                 Static assets
│       └── src/
│           ├── components/         Shared UI and navigation
│           └── features/           Feature-first application code
├── docs/                            Project documentation
└── legacy/                          Read-only legacy implementation
```

The application uses Next.js 16.2.11 App Router, React 19.2.4, TypeScript 5,
and `next-intl` 4.13.4. Current feature directories under
`apps/web/src/features` are `products`, `blog`, and `contact`.

## Application Routes

`apps/web/app/[locale]` currently contains:

- Home page
- Product listing route
- Dynamic product detail route
- Product comparison route
- Inquiry API route
- Root layout and global styling

Persian (`fa`) is the unprefixed default locale, while English (`en`) is under
`/en`. Locale detection is disabled for deterministic routing. The locale-aware
one-click switch preserves the equivalent route, Product slug, and query
string. Persian documents use `lang="fa"` and RTL direction; English documents
use `lang="en"` and LTR direction. English remains temporarily
`noindex, follow`; reciprocal hreflang and localized sitemap coverage are
deferred.

## Product Feature

```text
apps/web/src/features/products/
├── components/     Product-specific UI
├── comparison/     Comparison types and utilities
├── copy/           Trusted Product-copy resolver and public DTO boundary
├── data/           Product aggregation
├── database/       Taxonomy and manufacturer source records
├── filters/        Catalog filtering functions
├── hooks/          Catalog, URL, pagination, and comparison state
├── lib/            Validation, SEO, schema, relation, and recommendation logic
├── pagination/     Pagination calculation
├── repository/     Product read access
├── sections/       Product page sections
├── sorting/        Product sorting
└── types/          Canonical Product and download interfaces
```

## Product Access Rules

- `Product` in `types/product.types.ts` is the canonical UI-facing interface.
- Canonical Siemens source data remains English.
- `data/products.ts` is the canonical Product aggregation.
- `repository/product.repository.ts` remains the canonical application access
  layer for Product data.
- Routes and components consume Product data through the repository.
- Product-specific UI remains inside the product feature; reusable application
  UI belongs under `src/components`.

## Current Canonical Data Flow

All active Siemens Product groups use the current application path:

```text
canonical Siemens source
  → validators and adapters
  → Product aggregation
  → Product repository
  → current routes and UI
```

The aggregation contains 382 canonical Products. S7-300 coverage is 196/196
across CPU, Power Supply, Signal Module, Interface Module, Communication
Processor, and Function Module. S7-1200 coverage is 186/186 across all verified
Classic and G2 source groups. Every active Siemens Product group is connected
through validation/adapters and aggregation to the Product repository.

Eleven S7-300 Products have unverified lifecycle provenance and
invariantly omit the public `Product.lifecycle` property. The copy layer may not
supply, infer, or override lifecycle data. For SM321 `6ES7321-1FF10-0AA0`,
the maintainer approved `unverified` source lifecycle while its factual current
exact-product lifecycle remains **UNKNOWN**. PR #64 merged at
`2026-09-27T18:29:17Z` as `00af171572c427dba986340e7efd36f8ca0ad1d7`;
independent verification returned **PASS** for the uncertainty representation.
This resolved the policy/representation blocker, without verifying lifecycle.
Previously recorded historical
Siemens Mall phase-out evidence is retained; the public legacy label and badge
disappear through the existing omission behavior, and comparison uses its existing
missing-value display. No public `unverified` category is introduced. S7-300
provenance is 185 Siemens-official verified / 11 explicit unverified.

## Product-copy Resolver and Trust Boundaries

Canonical Product/source/database/adapter data remains English and immutable.
PR #54 (`c690216efc9895866f42586d3686b736da111155`) added the
Product-specific technical-token policy, PR #55
(`25c63e4f7926c782fa9015521734798a9b6f91c1`) added the first five private
Persian Product-copy drafts, and PR #56
(`2d7305e28b183c3f1bde0f6b773fc29ebc619eec`) recorded their exact linguistic
and technical approvals. That Batch 01 state remains unchanged and historical.
PR #58 squash-merged Batch 02 at `2026-09-23T19:42:52Z` as
`e1f844f11e6a29ec14dbe66e1531de37d6700342`; its scope is exactly five
SIMATIC S7-300 fail-safe CPUs with independently reviewed Product-specific
technical-token mappings and current linguistic and technical approvals.
PR #60 (`ac99ce8579d3753a2d4f4aeb6bd22b4fd7f4e514`) corrected the canonical
S7-300 SM321 1BH10 specifications by removing unsupported diagnostics and
interrupt fields and omitting the disputed input-delay claim because official
evidence conflicted; no replacement delay value was verified. PR #61
squash-merged Batch 03 at
`2026-09-25T08:01:51Z` as `b7debb1d9c6b25a787f1cb534247bfba63d001c3`.
Its five private S7-300 SM321 digital-input drafts cover
`6ES7321-1BH02-0AA0`, `6ES7321-1BH10-0AA0`, `6ES7321-1BL00-0AA0`,
`6ES7321-1BP00-0AA0`, and `6ES7321-1CH20-0AA0`, with linguistic and technical
approvals bound to their current content hashes. Technical review used indexed
content from exact-product official Siemens datasheets; direct PDF requests
returned HTTP 403, as the approval notes record. The corrected 1BH10 draft
makes no delay, diagnostics, or interrupt claim. Batch 03 added no
technical-token overrides. Batches 01 and 02 remain unchanged historical work.

PR #65, `feat: add Batch 04 Persian product copy`, squash-merged at
`2026-09-28T18:03:45Z` as `84d4fe14e82e7a922509a5ca8899cd50f1d3167d`.
Its sole parent is `00af171572c427dba986340e7efd36f8ca0ad1d7`; the reviewed
head was `2eefce5487fb08872ed6a92f94e3b13d12659fa6`, and the identical
squash/reviewed tree is `e567b87b9e7bb9274bab69fec9f3ed98e68964ad`.
Batch 04 adds exactly five private SM321 drafts with current hash-bound
linguistic and technical approvals: `6ES7321-1CH00-0AA0`,
`6ES7321-1EL00-0AA0`, `6ES7321-1FF01-0AA0`, `6ES7321-1FF10-0AA0`, and
`6ES7321-1FH00-0AA0`. Review used Siemens-indexed exact-product datasheet
text and available Siemens product HTML; direct PDF access returned HTTP 403
during review. This is not fresh direct PDF retrieval or lifecycle verification.
Batch 04 added zero technical-token overrides and made no canonical Product
data change. Batches 01–03 remain unchanged historical work.

[PR #67](https://github.com/Siemiran/Siemiran/pull/67),
`feat: add Batch 05 Persian product copy`, squash-merged at
`2026-10-02T09:46:57Z` (Tehran `2026-10-02 13:16:57`) as
`04a302c9b587954131289e8624a1f90344b9ffdd`, and local main synchronization
is complete. Its sole parent is `3becc93356a3e46780f7f36f947b184c234cc376`.
The reviewed head `a3270bb3ef856cff15d54679a65073d5b676f0d2` remains on
`feat/fa-product-copy-batch-05`; the reviewed and squash trees are exactly
`199d0286dbb0b80123c4f4b51a7d5b1c9ddaf9ce`. Implementation changed only the
copy registry and verification harness, with 602 insertions and 9 deletions.
Batch 05 adds five private SM321 drafts: `6ES7321-7BH01-0AB0`,
`6ES7321-7EH00-0AB0`, `6ES7321-7TH00-0AB0`, `6ES7321-1BH50-0AA0`, and
`6ES7321-7BH00-0AB0`. Their approved scope is complete canonical titles as
identifiers, digital-input module type, and sixteen inputs, with `ai-assisted`
provenance. Each Product has separate linguistic and technical approval records
bound to its unchanged production content hash. Reviewer `Siemiran` recorded
linguistic approvals at `2026-10-01T17:45:15Z` and technical approvals at
`2026-10-01T17:45:26Z`; all prior twenty entries, metadata, and approval hashes
remain unchanged. Batches 03–05 added zero technical-token overrides.

7TH00 `inputVoltage` semantics remain unresolved and unverified; retaining its
complete title adds no standalone voltage assertion. 7BH01 HF operation remains
conditional. 7BH00's canonical CPU410 source-link reconciliation remains a
separate data task: its copy evidence is the exact PCS 7 row, distinct from
7BH01 evidence. Previously reviewed parsed cache-PDF text was successfully
read, while visual verification was unavailable. Recorded historical HTTP 403
responses remain distinct from the later 7BH01 support-hosted `Internal Error`,
which exposed no HTTP status. No fresh manufacturer retrieval or lifecycle
verification is claimed.

Historical Batch 06 checkpoint: [PR #69](https://github.com/Siemiran/Siemiran/pull/69) completed private Batch 06
and merged as `e1238d59fde168d86f9491546bc4686fb263ab63`; local main is
synchronized. Its five entries retain full model identifiers and claim only
digital-input/output type and channel counts 4/8/16/16/32. Separate reviews are
bound to unchanged production hashes; recorded machine comparison preserves
the previous 25 complete entries and metadata. See [CHANGELOG.md](CHANGELOG.md)
for merge/review evidence and [DATABASE.md](DATABASE.md) for technical limits,
including 7RD00 load-supply versus `inputVoltage` semantics and the 1BH10
High Speed identifier. No fresh manufacturer or lifecycle verification is claimed.

Historical Batch 07 checkpoint: [PR #71](https://github.com/Siemiran/Siemiran/pull/71) completed private Batch 07
and merged as `e93dd9229386153ee3a192a22ef3c977be3cb57d`; local main synchronization
completed. Its five entries approve complete model identifiers, digital-output
module type and counts 16/16/8/8/16 only. Recorded machine comparison preserves
the prior 30 complete entries, metadata and hashes. Products, separate review
timestamps and the 5GH00 evidence qualification are in
[DATABASE.md](DATABASE.md#2026-11-13---batch-07-private-product-copy-checkpoint-historical-snapshot).
No fresh manufacturer retrieval or lifecycle verification is claimed.

[PR #73](https://github.com/Siemiran/Siemiran/pull/73) completed private Batch 08
at `1fc04eb68d1d1149bf05863a75a37d8c9103c47b`; main synchronization completed. Its
five SM322 entries approve complete titles as identifiers, digital-output type
and counts 8/32/64/64/16 only. Recorded preservation and mutation checks passed;
Product/evidence details and the unresolved 1BP00 issue are in
[DATABASE.md](DATABASE.md#2026-11-13---batch-08-private-product-copy-checkpoint-historical-snapshot).

[PR #75](https://github.com/Siemiran/Siemiran/pull/75) completed private Batch 09
at `fca25e9134aae5aa9d42d9437cccefe37196eb39`; guarded squash and main
synchronization completed. Five SM322 entries approve complete title identifiers,
digital-output type and counts 4/4/8/8/8 only. Recorded implementation checks
preserved the prior 40 complete entries and staled both approvals in each of ten
text/kind cases. Product evidence and Ex/Diagnostics/1CF00/RC limits are in
[DATABASE.md](DATABASE.md#2026-11-14---batch-09-private-product-copy-checkpoint-historical-snapshot).

[PR #77](https://github.com/Siemiran/Siemiran/pull/77) completed private Batch 10
at `8b88ef4eac08d7cbb8e49b315d91f5f2b49ebaa9`; guarded squash and main
synchronization completed. Product-specific scopes and reused implementation
evidence are in [DATABASE.md](DATABASE.md#2026-11-16---batch-10-private-product-copy-checkpoint-historical-snapshot); SM327
counts configurable channels, 7KB02 is MLFB/type-only, and the 1KF01 SDK table
adds no compatibility approval. Durable qualifications are in
[SESSION_HANDOFF.md](SESSION_HANDOFF.md#outstanding-work-and-evidence-limits).

[PR #79](https://github.com/Siemiran/Siemiran/pull/79) completed private Batch 11
at `e1755b027ebf1f869e20b2cb05e45b5e76d61350`; guarded squash and main
synchronization completed. All five entries approve only exact MLFB identity and
analog-input module type; full titles, channel counts and operating characteristics
remain outside approval. Product evidence and reused checks are in
[DATABASE.md](DATABASE.md#2026-11-16---batch-11-private-product-copy-checkpoint-historical-snapshot); durable qualifications are in
[SESSION_HANDOFF.md](SESSION_HANDOFF.md#outstanding-work-and-evidence-limits).

[PR #81](https://github.com/Siemiran/Siemiran/pull/81) completed private Batch 12
at `b62b5fccebf748d09a0164271bb477be23887570`; guarded squash and main
synchronization completed. All five entries approve only exact MLFB identity
and analog-input module type. Evidence access kinds, channel-mode qualifications
and raw footer strings are preserved in [DATABASE.md](DATABASE.md#2026-11-17---batch-12-private-product-copy-checkpoint-historical-snapshot);
durable qualifications are in
[SESSION_HANDOFF.md](SESSION_HANDOFF.md#outstanding-work-and-evidence-limits).

[PR #83](https://github.com/Siemiran/Siemiran/pull/83) completed private Batch 13 at
`f30da51f62eb8bfeb9ea2b5b9c0a05e0cf7ac6c2`. The five entries approve only exact MLFB identity and the respective module
type: two analog inputs and three analog outputs.
See [DATABASE.md](DATABASE.md#2026-11-19---batch-13-private-product-copy-checkpoint-historical-snapshot) for the exact bindings and access qualifications.

[PR #85](https://github.com/Siemiran/Siemiran/pull/85) completed private Batch 14 at
`74668d494683525d8128d9950309b511fc1b373a`. The five private entries approve only
exact MLFB identity and analog-output module type.
See [DATABASE.md](DATABASE.md#2026-11-19---batch-14-private-product-copy-checkpoint-historical-snapshot) for evidence and access qualifications.
Batch 14's 70/312 checkpoint is historical.

[PR #87](https://github.com/Siemiran/Siemiran/pull/87) completed private Batch 15 at
`8e33dd6a895057db175fe7ec496fb4f4486bd0b5`. The five entries approve exact MLFB identity
and module type only: one analog output and four mixed analog input/output
modules. Titles, counts, specifications, lifecycle and availability remain
outside approval. See [DATABASE.md](DATABASE.md#2026-11-19---batch-15-private-product-copy-checkpoint-historical-snapshot) for exact bindings,
evidence limits and recorded preservation results, [CHANGELOG.md](CHANGELOG.md#2026-11-19---pr-87-complete-batch-15-private-drafts-and-dual-approvals-historical-snapshot)
for merge identity, and [SESSION_HANDOFF.md](SESSION_HANDOFF.md) for resume facts.

Batch 15's 75/307 checkpoint is historical.

[PR #89](https://github.com/Siemiran/Siemiran/pull/89) completed private Batch 16 at
`52f6a336e307254867e4957c14db804105477bd6`. Approval covers exact MLFB identity and
module type only: one mixed analog input/output module and four interface
modules. Titles, counts, speed, sender/receiver behavior, temperature range,
other specifications and lifecycle claims remain outside approval.
See [DATABASE.md](DATABASE.md#2026-11-20---batch-16-private-product-copy-checkpoint-historical-snapshot) for exact bindings, evidence limits and
recorded preservation results, [CHANGELOG.md](CHANGELOG.md#2026-11-20---pr-89-complete-batch-16-private-drafts-and-dual-approvals-historical-snapshot) for merge
identity, and [SESSION_HANDOFF.md](SESSION_HANDOFF.md) for durable resume facts.

Batch 16's 80/302 checkpoint is historical; its records and evidence limits
remain in the linked historical record.

[PR #91](https://github.com/Siemiran/Siemiran/pull/91) completed private Batch 17 at
`33009a15647ff2907c949e58ff779918a5ec60ad`. Approval covers exact MLFB identity and
product type only: interface module for SIPLUS IM 365 and IM 174, drive interface
module for IM 178-4, and communication processor for both CP 340 entries.
Full titles, counts, motion-control behavior, interface standards, electrical
specifications, compatibility, certification, lifecycle and availability remain
outside approval. See [DATABASE.md](DATABASE.md#2026-11-20---batch-17-private-product-copy-checkpoint-historical-snapshot) for exact bindings,
hash-bound role records and evidence limits, [CHANGELOG.md](CHANGELOG.md#2026-11-20---pr-91-complete-batch-17-private-drafts-and-dual-approvals-historical-snapshot)
for merge identity, and [SESSION_HANDOFF.md](SESSION_HANDOFF.md) for resume facts.

Batch 17's 85/297 checkpoint is historical; its records and evidence limits
remain in the linked historical record.

[PR #111](https://github.com/Siemiran/Siemiran/pull/111) completed private Batch 27 at
`7a3525d59c26ad60105f3fa8c48900afe79118f1`. Its ten new classic S7-1200 CPU
entries occupy positions 217, 219–220, 222–223, and 225–229. Positions 218, 221,
and 224 retain their original Batch 01 entries, registry indexes, and both
current approvals. Technical approval covers exact order identity and CPU type
only. See the ten bindings, stored hashes, and evidence limits in [DATABASE.md](DATABASE.md#2026-11-27---batch-27-private-product-copy-checkpoint-current-state).

Batches 01–27 are complete privately. The catalog contains 382 Products
(186 S7-1200 and 196 S7-300), with 185 private drafts, 185 current approvals
per role, 185 current dual approvals, zero pending roles, and 197 products
without drafts. Activation remains invalid at `185/185/197` (drafts, dual
approvals, missing drafts). Capability is absent, active overlays are 0/382,
publication is disabled, and public FA/EN Product copy resolves to canonical
English/LTR. Launch requires 382/382 current dual approvals and separate
authorization.

Technical-token overrides remain `10/20/7` (Products, assignments, unique
strings), with an empty global allowlist. The eleven public lifecycle omissions
and the separate S7-300 provenance classification (185 verified and 11
explicitly unverified) remain in effect.

Batch 28 remains unstarted. Product selection, readiness, and scope require
separate authorization. The dedicated completed-copy website inspection is
pending, and Admin Panel and Automation remain gated.

Historical Batch 26 checkpoint (`175/175/207`).

[PR #109](https://github.com/Siemiran/Siemiran/pull/109) completed private Batch 26 at
`7ed2bb4a5f5f14f5a85a4f0d1562ed3fc29146df`. Its ten new CPU entries occupy
positions 205–211, 213–214, and 216 in the G2 and classic S7-1200 sources.
Positions 212 and 215 already had both approvals and retained their original
registry entries. Technical approval covers exact order identity and CPU type
only. See the ten bindings, stored hashes, and evidence limits in
[DATABASE.md](DATABASE.md#2026-11-27---batch-26-private-product-copy-checkpoint-current-state).

Batches 01–26 are complete privately. The catalog contains 382 Products
(186 S7-1200 and 196 S7-300), with 175 private drafts, 175 current approvals
per role, 175 current dual approvals, zero pending roles, and 207 products
without drafts. Activation remains invalid at `175/175/207` (drafts, dual
approvals, missing drafts). Capability is absent, active overlays are 0/382,
publication is disabled, and public FA/EN Product copy resolves to canonical
English/LTR. Launch requires 382/382 current dual approvals and separate
authorization.

Technical-token overrides remain `10/20/7` (Products, assignments, unique
strings), with an empty global allowlist. The eleven public lifecycle omissions
and the separate S7-300 provenance classification (185 verified and 11
explicitly unverified) remain in effect.

Batch 27 remains unstarted. Product selection, readiness, and scope require
separate authorization. The dedicated completed-copy website inspection is
pending, and Admin Panel and Automation remain gated.

Historical Batch 25 checkpoint (`165/165/217`).

[PR #107](https://github.com/Siemiran/Siemiran/pull/107) completed private Batch 25 at
`ec910b0b302483889ffa8651bc859f51f7d6ac4d`. Positions 195–204 transition
from S7-300 function modules to S7-1200 classic power modules, G2 power
modules, and G2 CPUs. Technical approval covers exact MLFB identity and product
type only. The database records all ten bindings, hashes, and evidence limits.
[DATABASE.md](DATABASE.md#2026-11-27---batch-25-private-product-copy-checkpoint-current-state)

Batches 01–25 are complete privately. The catalog contains 382 Products
(186 S7-1200 and 196 S7-300), with 165 private drafts, 165 current approvals
per role, 165 current dual approvals, zero pending roles, and 217 products
without drafts. Activation remains invalid at `165/165/217` (drafts, dual
approvals, missing drafts). Capability is absent, active overlays are 0/382,
publication is disabled, and public FA/EN Product copy resolves to canonical
English/LTR. Launch requires 382/382 current dual approvals and separate
authorization.

Technical-token overrides remain `10/20/7` (Products, assignments, unique
strings), with an empty global allowlist. The eleven public lifecycle omissions
and the separate S7-300 provenance classification (185 verified and 11
explicitly unverified) remain in effect.

Batch 26 remains unstarted. Product selection, readiness, and scope require
separate authorization. The dedicated completed-copy website inspection is
pending, and Admin Panel and Automation remain gated.

Historical Batch 24 checkpoint (`155/155/227`).

[PR #105](https://github.com/Siemiran/Siemiran/pull/105) completed private Batch 24 at
`ab37f3f05208e027aeb7ac47c1b97b00072d16a8`. Its ten Function Module entries
occupy positions 185–194. Technical approval covers exact MLFB identity and
module type only. The database record includes exact bindings, hashes, and
evidence limits. [DATABASE.md](DATABASE.md#2026-11-26---batch-24-private-product-copy-checkpoint-current-state)

The catalog contains 382 Products (186 S7-1200 and 196 S7-300). There are 155
private drafts, 155 current approvals per role, 155 current dual approvals, zero
pending roles, and 227 products without drafts. Activation remains invalid at
`155/155/227` (drafts, dual approvals, missing drafts). Capability is absent,
active overlays are 0/382, publication is disabled, and public FA/EN Product
copy remains canonical English/LTR. Launch requires complete 382/382 current
dual approvals and separate authorization.

Overrides remain `10/20/7` (Products, assignments, unique strings), with an
empty global allowlist. Batch 24 added no overrides. The eleven public lifecycle
omissions and separate S7-300 provenance classification (185 verified and 11
explicitly unverified) remain in effect.

Batch 25 remains unstarted. Product selection, readiness, and scope require
separate authorization. Admin Panel and Automation remain gated, and the
dedicated completed-copy website inspection is pending.

Historical Batch 23 checkpoint (`145/145/237`):

[PR #103](https://github.com/Siemiran/Siemiran/pull/103) completed private Batch 23 at `84d458642afd1a716449d4f4e0db6aabb0d5354f`. Its ten Function Module
entries occupy positions 175–184. Technical approval covers exact MLFB identity
and module type only. [DATABASE.md](DATABASE.md#2026-11-26---batch-23-private-product-copy-checkpoint-current-state) records the bindings, reviewed hashes, and evidence
limits. [CHANGELOG.md](CHANGELOG.md#2026-11-26---pr-103-complete-batch-23-private-drafts-and-dual-approvals) records the implementation merge.

The catalog contains 382 Products (186 S7-1200 and 196 S7-300). There are 145
private drafts, 145 current approvals per role, 145 current dual approvals, zero
pending roles, and 237 products without drafts. Activation remains invalid at
`145/145/237` (drafts, dual approvals, missing drafts). Capability is absent,
active overlays are 0/382, publication is disabled, and public FA/EN Product
copy remains canonical English/LTR. Launch requires complete 382/382 current
dual approvals and separate authorization.

Overrides remain `10/20/7` (Products, assignments, unique strings), with an
empty global allowlist. Batch 23 added no overrides. The eleven public lifecycle
omissions and the separate S7-300 provenance classification (185 verified and
11 explicitly unverified) remain in effect.

Batch 24 remains unstarted. Product selection, readiness, and scope require
separate authorization. Admin Panel and Automation remain gated, and the
dedicated completed-copy website inspection is pending.

Historical Batch 22 checkpoint (`135/135/247`):

[PR #101](https://github.com/Siemiran/Siemiran/pull/101) completed private Batch 22 at
`7aa9741f6a80ccccb2a4877567d60bc16e2e6444`. Its ten entries occupy canonical
positions 165–174. Approval covers exact MLFB identity and the supported product
type only: one communication processor, four counter modules, two FM351
positioning modules, one electronic cam controller, FM353 positioning and
FM354 servo positioning. The CP-to-FM boundary is at 165/166. Canonical variants
are binding metadata outside copy claims; FM350-2 2AH00/2AH01 and the SIPLUS
order remain distinct. FM351 MLFBs contain 1AH01/1AH02 while their stable IDs
retain 1ch01/1ch02 verbatim. Position 167's performance discrepancy remains
deferred and outside approval. No characteristics transfer between orders.
Model titles, interfaces, protocols, performance, compatibility, lifecycle,
certification and availability remain excluded. Exact bindings, recorded hashes
and qualified A–F evidence are in [DATABASE.md](DATABASE.md#2026-11-24---batch-22-private-product-copy-checkpoint-current-state);
merge identity is in [CHANGELOG.md](CHANGELOG.md#2026-11-24---pr-101-complete-batch-22-private-drafts-and-dual-approvals)
and durable resume facts are in [SESSION_HANDOFF.md](SESSION_HANDOFF.md).

The catalog contains 382 Products (186 S7-1200 / 196 S7-300). There are 135 private
drafts, 135 current approvals per role, 135 current dual approvals, zero pending
roles and 247 products without drafts. Activation remains invalid at
`overlayCount=135`, `approvedCount=135` and `missingIds.length=247`
(`135/135/247`), with capability absent. Active overlays remain 0/382, publication
is disabled, and public FA/EN copy stays canonical English/LTR. Complete
382/382 current dual approvals and separate launch authorization remain required.

Overrides remain 10 Products / 20 assignments / 7 unique strings (`10/20/7`),
with an empty global allowlist; Batch 22 added zero overrides. The eleven
lifecycle omissions, including IM 178-4, and separate S7-300 provenance
classification (185 Siemens-official verified / 11 explicitly unverified) remain.

Batch 23 remains unstarted and outside this documentation task's scope.
Selection, readiness and future scope require separate authorization. Admin
Panel and Automation remain gated; completed-copy website inspection is pending.

Historical Batch 21 checkpoint (125/257): the following dated facts, evidence
and prospective workflow are preserved.

[PR #99](https://github.com/Siemiran/Siemiran/pull/99) completed private Batch 21 at
`c1c1779a4e019b6a49b8fae96dae0762e0b16d50`. Its ten entries at canonical positions
155–164 approve exact MLFB identity and communication-processor type only.
The `6FL`, `6GK` and `6AG` identities, both SIPLUS orders versus standard
orders, and CX00 versus CX10 remain distinct. Canonical variants and the
IT-to-Advanced boundary after position 154 are binding metadata outside copy
claims; no characteristics are transferred between revisions. Titles, interfaces,
protocols, performance, compatibility, lifecycle, certification and availability
remain outside approval. Exact bindings, recorded hashes and qualified A–E
evidence are in [DATABASE.md](DATABASE.md#2026-11-22---batch-21-private-product-copy-checkpoint-current-state);
the implementation merge record is in [CHANGELOG.md](CHANGELOG.md#2026-11-22---pr-99-complete-batch-21-private-drafts-and-dual-approvals)
and durable resume facts are in [SESSION_HANDOFF.md](SESSION_HANDOFF.md).

The catalog contains 382 Products (186 S7-1200 / 196 S7-300). There are 125 private
drafts, 125 current approvals per role, 125 current dual approvals, zero pending
roles and 257 products without drafts. Activation remains invalid at
`overlayCount=125`, `approvedCount=125` and `missingIds.length=257`, with capability
absent. Active overlays remain 0/382, publication is disabled, and public FA/EN
copy stays canonical English/LTR. Complete 382/382 current dual approvals and
separate launch authorization remain required.

Overrides remain 10 Products / 20 assignments / 7 unique strings with an empty
global allowlist. Batch 21 added zero overrides. The eleven public lifecycle
omissions, including IM 178-4, and separate S7-300 provenance classification
(185 Siemens-official verified / 11 explicitly unverified) remain in effect.

Batch 22 remains unstarted and outside this task's scope. Product selection and
future scope require separate authorization. Admin Panel and Automation remain
gated; the dedicated completed-copy website inspection remains pending.

Historical Batch 20 checkpoint (115/267): the following scope, counts and
prospective workflow describe Batch 20 at its merge and are superseded above.

[PR #97](https://github.com/Siemiran/Siemiran/pull/97) completed private Batch 20 at
`541386b2775cf21270a4708bd37a144cac3b90f7`. Its ten entries at canonical positions
145–154 approve exact MLFB identity and communication-processor type only.
Positions 150/151 retain the AS-Interface versus ISO/IT subfamily boundary as
binding metadata outside copy claims. GX00, GX11 and GX20 remain distinct;
no characteristics are transferred between variants. Model titles, interfaces,
protocols, performance, compatibility, lifecycle, certification and availability
remain outside approval. Exact bindings, recorded hashes and qualified A–E
evidence are in [DATABASE.md](DATABASE.md#2026-11-22---batch-20-private-product-copy-checkpoint-historical-snapshot);
the implementation merge record is in [CHANGELOG.md](CHANGELOG.md#2026-11-22---pr-97-complete-batch-20-private-drafts-and-dual-approvals-historical-snapshot)
and durable resume facts are in [SESSION_HANDOFF.md](SESSION_HANDOFF.md).

The catalog contains 382 Products (186 S7-1200 / 196 S7-300). There are 115 private
drafts, 115 current approvals per role, 115 current dual approvals, zero pending
roles and 267 products without drafts. Activation remains invalid at
`overlayCount=115`, `approvedCount=115` and `missingIds.length=267`, with capability
absent. Active overlays remain 0/382, publication is disabled, and public FA/EN
copy stays canonical English/LTR. Complete 382/382 current dual approvals and
separate launch authorization remain required.

Overrides remain 10 Products / 20 assignments / 7 unique strings with an empty
global allowlist. Batch 20 added zero overrides. The eleven public lifecycle
omissions, including IM 178-4, and separate S7-300 provenance classification
(185 Siemens-official verified / 11 explicitly unverified) remain in effect.

Batch 21 remains unstarted and outside this task's scope. Product selection and
future scope require separate authorization. Admin Panel and Automation remain
gated; the dedicated completed-copy website inspection remains pending.

Historical Batch 19 checkpoint (105/277): the following scope, counts and
prospective workflow describe Batch 19 at its merge and are superseded above.

[PR #95](https://github.com/Siemiran/Siemiran/pull/95) completed private Batch 19 at
`416495b83f071b9b105d30a35cb04ab5f3b17131`. Its ten entries at canonical positions
135–144 approve exact MLFB identity and communication-processor type only.
The exact SIPLUS order number stays distinct from the standard CP 342-5 code;
FA00 and FA01 remain distinct, with no characteristics transferred between variants.
Model titles, interfaces, protocols, performance, compatibility, lifecycle,
certification and availability remain outside approval. Exact bindings, recorded
hashes and qualified A–E evidence are in
[DATABASE.md](DATABASE.md#2026-11-21---batch-19-private-product-copy-checkpoint-historical-snapshot);
the merge record is in
[CHANGELOG.md](CHANGELOG.md#2026-11-21---pr-95-complete-batch-19-private-drafts-and-dual-approvals-historical-snapshot)
and durable resume facts are in [SESSION_HANDOFF.md](SESSION_HANDOFF.md).

The catalog contains 382 Products (186 S7-1200 / 196 S7-300). There are 105 private
drafts, 105 current approvals per role, 105 current dual approvals, zero pending
roles and 277 products without drafts. Activation remains invalid at
`overlayCount=105`, `approvedCount=105` and `missingIds.length=277`, with capability
absent. Active overlays remain 0/382, publication is disabled, and public FA/EN
copy stays canonical English/LTR. Complete 382/382 current dual approvals and
separate launch authorization remain required.

Overrides remain 10 Products / 20 assignments / 7 unique strings with an empty
global allowlist. Batch 19 added zero overrides. The eleven public lifecycle
omissions, including IM 178-4, and separate S7-300 provenance classification
(185 Siemens-official verified / 11 explicitly unverified) remain in effect.

Batch 20 remains unstarted and outside this task's scope. Product selection and
future scope require separate authorization. Admin Panel and Automation remain
gated; the dedicated completed-copy website inspection remains pending.

Historical Batch 18 checkpoint (95/287): the following scope, counts and
prospective workflow describe Batch 18 at its merge and are superseded above.

[PR #93](https://github.com/Siemiran/Siemiran/pull/93) completed private Batch 18 at
`800094010e6ada6199652168d74274a87f1f6be2`. The ten entries approve exact MLFB
identity and communication-processor type only, retaining distinct CP 340,
CP 341 and CP 342-5 order numbers, including each CP 341 01/02 revision.
Interfaces, performance, compatibility, lifecycle, certification and
availability remain outside approval. Exact bindings, recorded hashes and E1-E6
evidence are in [DATABASE.md](DATABASE.md#2026-11-20---batch-18-private-product-copy-checkpoint-historical-snapshot); the merge record is in
[CHANGELOG.md](CHANGELOG.md#2026-11-20---pr-93-complete-batch-18-private-drafts-and-dual-approvals-historical-snapshot) and durable resume facts are in
[SESSION_HANDOFF.md](SESSION_HANDOFF.md).

The catalog contains 382 Products (186 S7-1200 / 196 S7-300). There are 95 private
drafts, 95 current approvals per role, 95 current dual approvals, zero pending
roles and 287 products without drafts. Activation remains invalid at
`overlayCount=95`, `approvedCount=95` and `missingIds.length=287`, with capability
absent. Active overlays remain 0/382, publication is disabled, and public FA/EN
copy stays canonical English/LTR. Complete 382/382 current dual approvals and
separate launch authorization remain required.

Overrides remain 10 Products / 20 assignments / 7 unique strings with an empty
global allowlist. Batch 18 added zero overrides. The eleven public lifecycle
omissions, including IM 178-4, and separate S7-300 provenance classification
(185 Siemens-official verified / 11 explicitly unverified) remain in effect.

Batch 19 remains unstarted and outside this task's scope. Product selection and
future scope require separate authorization. Admin Panel and Automation remain
gated; the dedicated completed-copy website inspection remains pending.

Fixed 30/50/55/60 membership boundaries and the separate 65-ID set for completed
Batches 01–13, the 70-ID set for completed Batches 01–14, and the 75-ID set for
completed Batches 01–15 remain intact. The 80-ID completed-through-Batch-16
set and five-ID Batch 17 set remain preserved and form the explicit 85-ID
completed-through-Batch-17 set. That set and the disjoint ten-ID Batch 18 set
form the explicit 95-ID completed-through-Batch-18 set. That set and the
disjoint ten-ID Batch 19 set admit only their union by membership filtering;
no positional slicing is used. The completed-through-Batch-19 cohort retains
105 IDs; its ordering assertion checks that cohort. At Batch 20, a separate
assertion checked membership and order across the full 115-entry registry,
including the ten disjoint Batch 20 IDs. Batch 21 retains the scoped Batch 19 and Batch 20 order
checks and the exact 115-entry completed-through-Batch-20 order. Explicit disjoint
membership separates those 115 IDs from ten Batch 21 IDs; a separate assertion
checks membership and order across the full 125-entry registry. Earlier cohort
checks and boundaries remain intact.

At Batch 22, that 125-entry completed-through-Batch-21 membership/order
assertion remains scoped to the earlier cohort. Explicit disjoint membership
separates those 125 IDs from ten Batch 22 IDs; a separate assertion verifies
membership and order across the full 135-entry registry. Earlier checks remain.
Batch 23 checks the first 135 entries against the established Batch 01–22 order
and appends the ten exact FM bindings in source order. Both approval roles
are checked against the reviewed production hash for each entry.
Batch 24 retains the first 145 entries and checks the next ten exact FM
bindings, both hash-bound approvals per entry, and staleness of both roles
after a text or segment-kind mutation.
Batch 25 preserves the 155 earlier entries and checks the ten new records in
canonical order through their FM, classic power-module, G2 power-module, and
G2 CPU adapters. It verifies both current approval hashes per entry and that
each text or segment-kind mutation stales both roles.
Batch 26 preserves the first 165 registry entries and verifies ten new CPU
bindings in non-contiguous catalog order across G2 and classic sources. The
verifier checks that positions 212 and 215 retain both original approvals and
that every text or segment-kind mutation makes both new approval roles stale.
Batch 27 preserves the first 175 registry entries and verifies ten new classic
CPU bindings in non-contiguous catalog order. The verifier pins the three
Batch 01 entries at positions 218, 221, and 224 to their original registry
indexes and approval hashes. Each text or segment-kind mutation makes both
new approval roles stale.
Batch 14's 70/312, Batch 13's 65/317 and Batch 12's 60/322 checkpoints
are historical. Batch 11 recorded 55/327.
Dated Batch 01–10 checkpoints retain 5/10/15/20/25/30/35/40/45/50 entries and
377/372/367/362/357/352/347/342/337/332 missing Products respectively. Partial
activation remains prohibited.

The dedicated local visual and functional website inspection with the maintainer
remains pending after Persian Product-copy completion. It must cover FA/EN
switching, Persian wording, RTL/LTR isolation, Product pages, cards, comparison,
and responsive layouts. A later preview task must explicitly define how
completed Persian copy is displayed; private drafts authorize neither activation
nor publication. The resolver remains the sole
public Product-copy source for Product listing, cards and meta, featured and
related Products, detail header/body, search, metadata/OpenGraph/Twitter,
Product JSON-LD, comparison,
and inquiry identity.

```text
canonical Product + optional approved Persian overlay
  → trusted server-only resolver and renderer
  → detached, deeply frozen public DTO
  → UI / search / comparison / inquiry identity

trusted resolved copy
  → server-only metadata and Product JSON-LD
```

While publication is disabled, both FA and EN Product descriptions
intentionally resolve to canonical English/LTR. Persian UI localization is a
separate concern and remains active. The resolver has no partial Persian-copy
fallback.

The trusted server-only boundary contains registry and reviews, validation and
cryptography, technical-token policy, publication and capability handling,
resolver authenticity, the trusted Product renderer, metadata, and Product
JSON-LD. Client boundaries receive inert public DTOs. Public Product records
omit `shortDescription`, `description`, `seoTitle`, and `seoDescription`; no
private review, evidence, hash, registry, capability, or publication state is
client-reachable.

The boundary fails closed:

- Original Product descriptors are validated before value traversal, and every
  required or optional Product field is exhaustively bound to policy.
- The resolver receives a trusted full Product snapshot, not the original
  Product object.
- Trusted and public records are independently detached and deeply frozen.
- Public renderers reject malformed input instead of rendering partial or
  untrusted content.
- Activation capabilities and resolved-copy objects are runtime authenticated.
- Activation requires exactly 382/382 canonical Product IDs, with no missing,
  extra, or duplicate entries; every entry needs current linguistic and
  technical approvals bound to its deterministic content hash. Passing this
  gate still requires separate authorization for public activation.
- Brand validation preserves `زیمیران` in Persian and `SIEMIRAN` in English;
  the incorrect active Persian token `سیمیران` has zero occurrences.
- Technical segments retain LTR/English bidi isolation. MLFBs, Product IDs,
  slugs, part numbers, official model/family names, protocols, standards,
  values, units, and URLs remain canonical and untranslated.
- The exact eleven canonical lifecycle omissions remain an enforced invariant.
- Mutation, malformed input, timestamps, normalization, brand, technical-token,
  lifecycle, coverage, capability, and resolved-copy boundaries are validated.

Run the dedicated harness from `apps/web` with:

```text
npm.cmd run validate:product-copy
```

## Client State and Server Boundaries

- Search, filters, sorting, and pagination are reflected in product-list URL
  parameters.
- Product search uses canonical title and part number plus public DTO search
  text.
- Comparison persists validated Product IDs only under
  `siemiran:product-comparison`; legacy stored Product objects migrate safely to
  ID storage.
- Product detail pages are generated from repository data.
- Inquiry client data contains only Product `id`, `title`, and `partNumber`.
- The inquiry API performs request parsing and validation but has no connected
  persistence or delivery provider.
- Product-copy registry, reviews, validation, cryptography, policy,
  publication/capability, resolver authenticity, trusted rendering, metadata,
  and Product JSON-LD remain behind their server-only boundary.

## Verified Local Production-runtime Caveat

- Standard `next start` with no hostname option passes.
- `next start --hostname localhost` passes when requested through `localhost`.
- Explicit `next start --hostname 127.0.0.1` triggers a Next.js rewrite-origin
  mismatch for unprefixed default-locale routes in the verified environment.
- No proxy or other routing workaround and no dependency downgrade were added
  because a supported invocation passes.
- This framework/runtime-specific caveat does not authorize changing
  `localePrefix: "as-needed"` or prefixing Persian URLs.

## Architectural Constraints

- Feature First
- Repository Pattern
- Single Product Interface
- Verified Product Data
- Build must pass
- Documentation must track implementation
- `legacy/` is read-only
