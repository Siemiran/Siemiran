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

Current implementation checkpoint: `e1238d59fde168d86f9491546bc4686fb263ab63`
(merged PR #69, Batch 06; local main synchronized). Batches 01–06 are complete
privately: 30/382 drafts, 30/382 current linguistic approvals, 30/382 current
technical approvals, and 30 current dual approvals, with zero pending roles and
352 Products missing private copy entries. Catalog coverage remains 382 Products
(186 S7-1200 / 196 S7-300). Active overlays remain 0/382,
activation capability is absent, publication is disabled,
and public FA/EN Product copy remains canonical English/LTR. Batch 07 readiness
and scope work is unapproved and unstarted; Admin Panel and Automation remain
gated. Batch 06's limited model/type/count approvals and evidence qualifications
are recorded in [CHANGELOG.md](CHANGELOG.md). Durable resume policy is in
[SESSION_HANDOFF.md](SESSION_HANDOFF.md).

After Persian Product-copy completion, the dedicated local visual and functional
website inspection with the maintainer remains pending: FA/EN switching,
Persian wording, RTL/LTR isolation, Product pages, cards, comparison, and
responsive layouts. A later preview task must explicitly define how completed
Persian copy is displayed; private drafts authorize neither activation nor
publication.
