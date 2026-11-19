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

Current implementation checkpoint (2026-11-19)
`f30da51f62eb8bfeb9ea2b5b9c0a05e0cf7ac6c2` (merged [PR #83](https://github.com/Siemiran/Siemiran/pull/83)).
Batches 01–13 are complete privately. Batch 13 approves only exact MLFB
identity and the respective module type: two analog inputs and three analog
outputs.
Product evidence is in [DATABASE.md](DATABASE.md#2026-11-19---batch-13-private-product-copy-checkpoint-current-state), with durable
qualifications and resume checks in [SESSION_HANDOFF.md](SESSION_HANDOFF.md).

The catalog contains 382 Products (186 S7-1200 / 196 S7-300). There are
65 private drafts, 65 current approvals per role, 65 current dual approvals,
zero pending roles and 317 missing entries. Activation validation remains
invalid at `overlayCount` 65, `approvedCount` 65 and `missingIds.length` 317,
with capability absent. Active overlays remain 0/382, publication is disabled,
and public FA/EN copy stays canonical English/LTR. Complete 382/382 current dual
approvals and separate launch authorization remain required.

Batch 14 remains unapproved and unstarted. Admin Panel and Automation remain
gated. Batch 12's 60/322 checkpoint and earlier counts are historical.

After Persian Product-copy completion, the dedicated local visual and functional
website inspection with the maintainer remains pending: FA/EN switching,
Persian wording, RTL/LTR isolation, Product pages, cards, comparison, and
responsive layouts. A later preview task must explicitly define how completed
Persian copy is displayed; private drafts authorize neither activation nor
publication.
