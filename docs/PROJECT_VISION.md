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

Current implementation checkpoint: `b62b5fccebf748d09a0164271bb477be23887570`
(merged PR #81, Batch 12; local main synchronized). Batches 01–12 are complete
privately: 60/382 drafts and current approvals per role, 60 current dual approvals,
zero pending roles and 322 missing entries. Catalog coverage remains 382 Products
(186 S7-1200 / 196 S7-300). Activation validation remains invalid:
`overlayCount` 60, `approvedCount` 60, `missingIds.length` 322, capability
absent. Active overlays remain 0/382, publication disabled and public FA/EN copy
canonical English/LTR. Full 382/382 current dual approvals and separate launch
authorization remain required. Batch 13 is unapproved and unstarted; Admin Panel
and Automation remain gated. Batch 12 approves exact MLFB/analog-input type only;
full titles, counts, RTD/thermocouple characteristics, Ex certification/suitability
and other operating claims remain outside approval. Product evidence and distinct
access qualifications are in [DATABASE.md](DATABASE.md#2026-11-17---batch-12-private-product-copy-checkpoint-current-state);
durable resume policy is in [SESSION_HANDOFF.md](SESSION_HANDOFF.md).
Batch 11's 55/327 checkpoint and earlier counts remain historical; earlier scopes
and deferred issues remain unchanged.

After Persian Product-copy completion, the dedicated local visual and functional
website inspection with the maintainer remains pending: FA/EN switching,
Persian wording, RTL/LTR isolation, Product pages, cards, comparison, and
responsive layouts. A later preview task must explicitly define how completed
Persian copy is displayed; private drafts authorize neither activation nor
publication.
