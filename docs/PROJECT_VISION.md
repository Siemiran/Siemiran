# Siemiran Project Vision

Goal:

Build the best Persian-first, fully bilingual Persian/English Siemens Industrial
Automation website for زیمیران (`SIEMIRAN`), with equivalent-page, one-click
language switching and accurate, natural, human-approved Persian copy.

Principles:

- Clean architecture
- Official and verified Product data
- Complete Product database
- AI-assisted workflow with accountable human review
- SEO-first implementation
- High performance
- Scalable structure
- Maintainable code
- Canonical technical identifiers remain unchanged across languages.
- Product IDs, slugs, MLFBs, part numbers, official Product and model names,
  protocols, standards, URLs, numerical technical values, and engineering units
  are canonical and are not translated.
- Persian Product prose is stored as a separate approved presentation overlay
  keyed by stable Product ID; canonical Product/source data remains unchanged.
- AI- or machine-generated Persian Product prose is draft-only and cannot be
  published without linguistic and technical review.
- Full Product-copy readiness requires approved Persian overlays for 382/382
  Products. Drafting and linguistic/technical review proceed in controlled,
  reviewable batches, but no partial Persian Product-copy overlay is publicly
  activated before the complete 382/382 current dual-approval gate passes and
  separate activation authorization is given.
- Translation must not introduce unsupported lifecycle, availability,
  compatibility, or technical claims.
- The eleven unverified S7-300 records continue to omit public lifecycle in both
  languages.

Current implementation checkpoint (2026-11-20): `33009a15647ff2907c949e58ff779918a5ec60ad`.

[PR #91](https://github.com/Siemiran/Siemiran/pull/91) completed private Batch 17 at
`33009a15647ff2907c949e58ff779918a5ec60ad`. Approval covers exact MLFB identity and
product type only: interface module for SIPLUS IM 365 and IM 174, drive interface
module for IM 178-4, and communication processor for both CP 340 entries.
Full titles, counts, motion-control behavior, interface standards, electrical
specifications, compatibility, certification, lifecycle and availability remain
outside approval. See [DATABASE.md](DATABASE.md#2026-11-20---batch-17-private-product-copy-checkpoint-current-state) for exact bindings,
hash-bound role records and evidence limits, [CHANGELOG.md](CHANGELOG.md#2026-11-20---pr-91-complete-batch-17-private-drafts-and-dual-approvals)
for merge identity, and [SESSION_HANDOFF.md](SESSION_HANDOFF.md) for resume facts.

The catalog contains 382 Products (186 S7-1200 / 196 S7-300). There are 85 private
drafts, 85 current approvals per role, 85 current dual approvals, zero pending
roles and 297 missing entries. Activation validation remains invalid at
`overlayCount=85`, `approvedCount=85` and `missingIds.length=297`, with capability
absent. Active overlays remain 0/382, publication is disabled, and public FA/EN
copy stays canonical English/LTR. Complete 382/382 current dual approvals and
separate launch authorization remain required.

Overrides remain 10 Products / 20 assignments / 7 unique strings with an empty
global allowlist. Batch 17 added zero overrides. The eleven public lifecycle
omissions, including IM 178-4, and separate S7-300 provenance classification
(185 Siemens-official verified / 11 explicitly unverified) remain in effect.

Batch 18 is unstarted; its product selection and scope require separate approval.
Admin Panel and Automation remain gated, and the dedicated completed-copy
website inspection remains pending.

Historical Batch 16 checkpoint (80/302): [PR #89](https://github.com/Siemiran/Siemiran/pull/89)
completed one mixed analog input/output and four interface-module entries.
Its exact MLFB/type-only scope, exclusions and evidence qualifications remain in
[DATABASE.md](DATABASE.md#2026-11-20---batch-16-private-product-copy-checkpoint-historical-snapshot).
Batch 16 and earlier counts are historical; Batch 17 is current.

After Persian Product-copy completion, the dedicated local visual and functional
website inspection with the maintainer remains pending: FA/EN switching,
Persian wording, RTL/LTR isolation, Product pages, cards, comparison, and
responsive layouts. A later preview task must explicitly define how completed
Persian copy is displayed; private drafts authorize neither activation nor
publication.
