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

Current implementation checkpoint: `e1755b027ebf1f869e20b2cb05e45b5e76d61350`
(merged PR #79, Batch 11; local main synchronized). Batches 01–11 are complete
privately: 55/382 drafts, 55/382 current linguistic approvals, 55/382 current
technical approvals, and 55 current dual approvals, with zero pending roles and
327 Products missing private copy entries. Catalog coverage remains 382 Products
(186 S7-1200 / 196 S7-300). Active overlays remain 0/382, activation capability is
absent, publication is disabled, and public FA/EN Product copy remains canonical
English/LTR. Activation-validation `overlayCount` is 55; full 382/382 current
dual approvals and separate launch authorization remain required. Batch 12
readiness/scope work is unapproved and unstarted; Admin Panel and Automation
remain gated. Batch 11 approves exact MLFB/analog-input type only; full titles,
counts and operating characteristics remain outside approval. Product evidence
and qualifications are in [DATABASE.md](DATABASE.md#2026-11-16---batch-11-private-product-copy-checkpoint-current-state); durable
resume policy is in [SESSION_HANDOFF.md](SESSION_HANDOFF.md). Batch 10's 50/332
checkpoint and earlier counts remain historical; earlier scopes and unresolved
issues remain unchanged.

After Persian Product-copy completion, the dedicated local visual and functional
website inspection with the maintainer remains pending: FA/EN switching,
Persian wording, RTL/LTR isolation, Product pages, cards, comparison, and
responsive layouts. A later preview task must explicitly define how completed
Persian copy is displayed; private drafts authorize neither activation nor
publication.
