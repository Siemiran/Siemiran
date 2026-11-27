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

Current implementation checkpoint (2026-11-27) is `ec910b0b302483889ffa8651bc859f51f7d6ac4d`.

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

Historical Batch 17 checkpoint (85/297): the following scope, counts and
prospective workflow describe Batch 17 at its merge and are superseded above.

Implementation checkpoint at the Batch 17 merge: `33009a15647ff2907c949e58ff779918a5ec60ad`.

[PR #91](https://github.com/Siemiran/Siemiran/pull/91) completed private Batch 17 at
`33009a15647ff2907c949e58ff779918a5ec60ad`. Approval covers exact MLFB identity and
product type only: interface module for SIPLUS IM 365 and IM 174, drive interface
module for IM 178-4, and communication processor for both CP 340 entries.
Full titles, counts, motion-control behavior, interface standards, electrical
specifications, compatibility, certification, lifecycle and availability remain
outside approval. See [DATABASE.md](DATABASE.md#2026-11-20---batch-17-private-product-copy-checkpoint-historical-snapshot) for exact bindings,
hash-bound role records and evidence limits, [CHANGELOG.md](CHANGELOG.md#2026-11-20---pr-91-complete-batch-17-private-drafts-and-dual-approvals-historical-snapshot)
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
Batch 24 and earlier counts are historical. Batch 25 is current.

After Persian Product-copy completion, the dedicated local visual and functional
website inspection with the maintainer remains pending: FA/EN switching,
Persian wording, RTL/LTR isolation, Product pages, cards, comparison, and
responsive layouts. A later preview task must explicitly define how completed
Persian copy is displayed; private drafts authorize neither activation nor
publication.
