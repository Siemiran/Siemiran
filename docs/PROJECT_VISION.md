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
`74668d494683525d8128d9950309b511fc1b373a` (merged [PR #85](https://github.com/Siemiran/Siemiran/pull/85)).
Batches 01–14 are complete privately. The five Batch 14 entries approve only
exact MLFB identity and analog-output module type.
See [DATABASE.md](DATABASE.md#2026-11-19---batch-14-private-product-copy-checkpoint-current-state) for Product evidence and
[SESSION_HANDOFF.md](SESSION_HANDOFF.md) for durable qualifications.

The catalog contains 382 Products (186 S7-1200 / 196 S7-300). There are 70 private
drafts, 70 current approvals per role, 70 current dual approvals, zero pending
roles and 312 missing entries. Activation validation remains invalid at
`overlayCount` 70, `approvedCount` 70 and `missingIds.length` 312, with capability
absent. Active overlays remain 0/382, publication is disabled, and public FA/EN
copy stays canonical English/LTR. Complete 382/382 current dual approvals and
separate launch authorization remain required.

Batch 15 remains unapproved and unstarted. Admin Panel and Automation remain
gated. Batch 13's 65/317 checkpoint and earlier counts are historical.

After Persian Product-copy completion, the dedicated local visual and functional
website inspection with the maintainer remains pending: FA/EN switching,
Persian wording, RTL/LTR isolation, Product pages, cards, comparison, and
responsive layouts. A later preview task must explicitly define how completed
Persian copy is displayed; private drafts authorize neither activation nor
publication.
