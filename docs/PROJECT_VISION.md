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

Current implementation checkpoint (2026-11-20)
`52f6a336e307254867e4957c14db804105477bd6` (merged [PR #89](https://github.com/Siemiran/Siemiran/pull/89)).
Batches 01–16 are complete privately. The five Batch 16 entries approve only
exact MLFB identity and module type: one mixed analog input/output module and
four interface modules. Titles, counts, speed, sender/receiver behavior,
temperature range, other specifications and lifecycle claims remain outside approval.
See [DATABASE.md](DATABASE.md#2026-11-20---batch-16-private-product-copy-checkpoint-current-state) for Product evidence and
[SESSION_HANDOFF.md](SESSION_HANDOFF.md) for durable qualifications.

The catalog contains 382 Products (186 S7-1200 / 196 S7-300). There are 80 private
drafts, 80 current approvals per role, 80 current dual approvals, zero pending
roles and 302 missing entries. Activation validation remains invalid at
`overlayCount=80`, `approvedCount=80` and `missingIds.length=302`, with capability
absent. Active overlays remain 0/382, publication is disabled, and public FA/EN
copy stays canonical English/LTR. Complete 382/382 current dual approvals and
separate launch authorization remain required.

Overrides remain 10 Products / 20 assignments / 7 unique strings with an empty
global allowlist. Batch 16 added zero overrides. The eleven public lifecycle
omissions and separate S7-300 provenance classification (185 Siemens-official
verified / 11 explicitly unverified) remain in effect.

Batch 17 remains unapproved and unstarted. Admin Panel and Automation remain
gated, and the dedicated completed-copy website inspection remains pending.
Batch 15's 75/307 checkpoint and earlier counts are historical.

After Persian Product-copy completion, the dedicated local visual and functional
website inspection with the maintainer remains pending: FA/EN switching,
Persian wording, RTL/LTR isolation, Product pages, cards, comparison, and
responsive layouts. A later preview task must explicitly define how completed
Persian copy is displayed; private drafts authorize neither activation nor
publication.
