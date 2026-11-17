# Siemiran — Session Handoff

Checkpoint: **2026-11-17 (Asia/Tehran)**. Implementation: private Batch 12
merged and local main synchronized. Documentation workflow status belongs in
the task report and PR, rather than this durable implementation checkpoint.

## Identity and source of truth

Siemiran / زیمیران (`SIEMIRAN`) is a Persian-first bilingual Persian/English
Siemens industrial-automation website, with equivalent-page switching and
accurate, human-approved Persian copy. Repository:
[Siemiran/Siemiran](https://github.com/Siemiran/Siemiran); local path:
`C:\Projects\Siemiran`. The maintainer proceeds one Codex prompt at a time.
Keep this handoff current at session boundaries; recheck actual repository state
when resuming after a pause.

For implemented behavior, use the exact committed source and validation first,
then merged PR/review evidence, then current repository summaries. Dated older
snapshots preserve history. Maintainer instructions define authorization; a
historical next-step statement does not authorize new work.

Merged implementation baseline: `b62b5fccebf748d09a0164271bb477be23887570`.
[PR #81](https://github.com/Siemiran/Siemiran/pull/81),
`feat: add Batch 12 Persian product copy`, merged at `2026-11-17T18:15:39Z`
(Asia/Tehran: `2026-11-17 21:45:39`). Sole parent:
`3d1507eef5732b08b1bc0f507993d92c7b84f266`. Reviewed feature head:
`d0ee57798a0e9ec862a9cf1f7d788605796330f7`; draft:
`fafb281b45ff88903742a611acafec31a22f6063`; reviewed/squash tree:
`3149e013ed052457772aacea0ae4d43b84370af1`. Implementation scope: registry
+170/-0, verifier +309/-10; two files +479/-10. Guarded squash and main-only
fetch/switch/fast-forward synchronization completed. At that checkpoint
`feat/fa-product-copy-batch-12` remained locally/cached/live at the reviewed
head. Recheck actual refs and index/worktree on resume.

## Collaboration and resume policy

- Review affected files and relevant evidence; do not reconstruct or rereview
  closed batches without a concrete inconsistency.
- Use machine preservation checks for closed-batch content, complete metadata
  and hashes when subsequent batches change the registry.
- Reuse successful validation when the relevant committed content is unchanged;
  distinguish reused evidence from newly executed checks and human observations.
- Use automated GitHub CLI operations through the existing `Siemiran` keyring
  account. Inspect actual remote state after any failed or uncertain write;
  avoid blind retries, duplicate PRs, browser/manual creation or protection bypass.

## Stable architecture and completed work

Follow [AGENTS.md](../AGENTS.md): Feature First, repository access, one canonical
`Product`, verified manufacturer data, passing build, current docs, and read-only
`legacy/`. Read any applicable nested instructions before future implementation.

- [Product interface](../apps/web/src/features/products/types/product.types.ts),
  [aggregation](../apps/web/src/features/products/data/products.ts), and
  [repository](../apps/web/src/features/products/repository/product.repository.ts)
  remain the canonical data/access boundary. Manufacturer source stays English.
- Catalog integration is complete: S7-1200 186/186 and S7-300 196/196, 382 total.
  Routing foundation and Product-copy consumer integration are complete;
  listing/cards, detail, search, metadata/JSON-LD, comparison, and inquiry identity
  use the trusted resolver/public DTO boundary. Persian UI is active independently
  of Product-copy publication. English remains `noindex, follow`.
- [Copy registry and approvals](../apps/web/src/features/products/copy/product-copy.registry.ts),
  [publication state](../apps/web/src/features/products/copy/product-copy.publication.ts),
  [token policy](../apps/web/src/features/products/copy/product-copy.technical-token-overrides.ts),
  and [validation harness](../apps/web/src/features/products/copy/product-copy.verify.ts)
  retain the server-only, fail-closed protections and canonical token/bidi rules.

| Current measure | State |
| --- | --- |
| Private drafts / linguistic approvals / technical approvals | 60/382 each |
| Current dual approvals / pending roles / missing private entries | 60 / zero / 322 |
| Activation validation / overlayCount / approvedCount / missingIds | Invalid / 60 / 60 / 322 |
| Active overlays / activation capability / publication | 0/382 / absent / disabled |
| Public FA/EN Product copy | Canonical English/LTR |
| Overrides | 10 Products / 20 assignments / 7 unique strings |
| Batch 12 added overrides / global allowlist | Zero / empty |
| Canonical lifecycle omissions | Exactly eleven |
| S7-300 lifecycle provenance | 185 Siemens-official verified / 11 explicitly unverified |

Batches 01-12 are complete **privately**. All five Batch 12 `ai-assisted` entries
approve only exact MLFB identity and analog-input module type, with identical
three-segment short/single-paragraph long content. Ten distinct `Siemiran` role
records bind unchanged production hashes. Observed UTC recording times:
linguistic `2026-11-17T17:56:09Z`; technical `2026-11-17T17:56:19Z`.
These are recording observations, not PM review timestamps. Recorded implementation
checks preserved all previous 55 complete entries/metadata/hashes and all 60
draft contents/bindings/provenance. Five MLFB segments remained authorized; ten
independent text/kind cases each staled both approvals. Fixed 30/50/55 membership
boundaries remain intact. These are reused results, not fresh documentation-task
audits. Product/evidence details are in [DATABASE.md](DATABASE.md#2026-11-17---batch-12-private-product-copy-checkpoint-current-state).
Batch 11's 55/327 checkpoint remains historical below; earlier scopes and
deferred issues remain unchanged.
Recorded public FA/EN resolution checks remain canonical English/LTR. Lifecycle omission debt is separate from missing
Persian-copy coverage. Activation requires the complete 382/382 current
content-hash-bound dual-approval gate **and separate authorization**; partial
activation is prohibited. Private drafts authorize neither activation nor publication.

## Outstanding work and evidence limits

1. Batch 13 readiness/scope work remains **unapproved and unstarted**. A later
   read-only readiness audit and independent scope/token review require separate
   authorization; do not draft copy or change policy/approvals as part of this
   documentation task.
2. Complete the remaining 322 private drafts and both review roles through later
   separately authorized batches. Public activation and bilingual SEO remain
   separate future tasks; English indexing, hreflang, and localized sitemap work
   remain deferred.
3. After Persian Product-copy completion, perform the pending dedicated local
   visual and functional website inspection with the maintainer: FA/EN switching,
   Persian wording, RTL/LTR isolation, Product pages, cards, comparison, and
   responsive layouts. A later preview task must explicitly define how completed
   Persian copy is displayed; private drafts alone authorize neither activation
   nor publication. That inspection has not begun; earlier preview instructions
   or `NOT_REPORTED` human observations must not become an inspection PASS.
4. Admin Panel and Automation remain gated; this workflow starts neither.
5. Eleven lifecycle provenance gaps remain. [PR #64](https://github.com/Siemiran/Siemiran/pull/64)
   merged at `2026-09-27T18:29:17Z` as
   `00af171572c427dba986340e7efd36f8ca0ad1d7` and its maintainer-approved
   uncertainty handling passed independent verification. The policy/representation
   blocker is resolved, but 1FF10's factual current lifecycle remains **UNKNOWN**:
   source `unverified`, canonical `Product.lifecycle` absent, public legacy labels
   removed, comparison missing-value display, and no public `unverified` label.
   Batch 04 approval does not verify that lifecycle. Prior provisional phase-out,
   pending PR #64 review, and blocked Batch 04 statements are historical and superseded.

Historical Batch 04 review used indexed exact-product Siemens text and available product HTML; direct
PDF requests returned HTTP 403. No fresh direct PDF access is claimed. For 1CH00,
2026-02-09 is the exact datasheet **document date**, not a lifecycle effective
date; 2026-09-25 is the earlier reported review/403 date, with no separate retrieval
audit record located; independent review reproduced HTTP 403 on 2026-09-26.
Supported source lifecycle is `spare-part`, canonical lifecycle remains `legacy`,
and its Mall product URL remains the public link. No current PM code or individual
transition date was established. [PR #60](https://github.com/Siemiran/Siemiran/pull/60)
removed unsupported 1BH10 diagnostics/interrupt fields and omitted the disputed
delay without a verified replacement. Preserve these limitations in later work.

Batch 05 review successfully used previously parsed cache-PDF text; visual page
verification was unavailable. 7TH00 `inputVoltage` semantics remain unresolved
and unverified: its complete title is an identifier, with no standalone voltage
assertion approved. 7BH01 HF operation remains conditional. 7BH00's existing
CPU410 source-link reconciliation is a separate data task; its copy evidence is
the exact PCS 7 row, distinct from 7BH01. Historical HTTP 403 observations are
not the later recorded 7BH01 support-hosted `Internal Error`, which exposed no
HTTP status. This reconciliation makes no fresh manufacturer retrieval or
lifecycle-verification claim.

For Batch 07 5GH00, the manual designation is **UC 24/48 V**. Official indexed
exact-product datasheet text supports the canonical identifier; direct PDF
retrieval returned **HTTP 403**, and visual inspection is **NOT OBSERVED**.
No standalone voltage/current or relay-performance claims are approved.
No fresh manufacturer retrieval or lifecycle verification is claimed here.

**Unresolved Batch 08 1BP00 discrepancy:** `6ES7322-1BP00-0AA0`'s canonical
English description says “sink,” while the reviewed Siemens manual says “sourcing.”
Approved Persian copy asserts neither. The disputed field is not verified; a
separately scoped canonical-data review is required. Do not silently correct it
or turn title/token authorization into verification. 1BP50's `Sinking` remains
within its supported complete title only. Batch 08 evidence reuses parsed Module
Data text; visual PDF inspection was **NOT OBSERVED**, with no fresh retrieval or
lifecycle verification. See [DATABASE.md](DATABASE.md#2026-11-13---batch-08-private-product-copy-checkpoint-historical-snapshot).

Batch 09 reuses readiness-accessed parsed Siemens evidence: Ex I/O Modules,
04/2022, A5E00172008-AP, and Module Data, 05/2022, A5E00105505-AK. Detailed
exact-product sections and printed pages are in
[DATABASE.md](DATABASE.md#2026-11-14---batch-09-private-product-copy-checkpoint-historical-snapshot).
Visual inspection and direct-origin HTTP status were **NOT OBSERVED**; no fresh
manufacturer retrieval or lifecycle verification is claimed. Ex remains within
supported complete identifiers, without independent installation, certification
or hazardous-area suitability claims. Diagnostics adds no performance claim.
1CF00's manual describes a **48–125 V DC range**, while its canonical title
retains **48/125 V DC** as an identifier; no correction or standalone voltage
assertion is approved. **5HF00 RC protection requires a jumper**; no unconditional
RC protection claim is approved. The unresolved Batch 08 1BP00 issue above and
all earlier evidence qualifications remain unchanged.

Batch 10 qualifications (detailed sections and printed pages in
[DATABASE.md](DATABASE.md#2026-11-16---batch-10-private-product-copy-checkpoint-historical-snapshot)):

- SM323 `6ES7323-1BH01-0AA0` and `6ES7323-1BL00-0AA0` approve complete
  canonical identifiers, digital input/output module type and respectively
  8 inputs/8 outputs and 16 inputs/16 outputs.
- SM327 `6ES7327-1BH00-0AB0` approves the complete canonical identifier,
  8 fixed digital inputs plus 8 individually configurable input/output channels.
  It does not approve 8 permanently assigned outputs or infer them from normalized
  fields; preserve the correct configuration wording.
- `6ES7331-7KB02-0AB0` approves the exact MLFB and analog-input module type
  only. Its full canonical title, Universal qualifier and input count are outside
  approval. The manufacturer's exact Universal label was not observed; two inputs
  is nominal and resistance measurement uses one measurement channel. Canonical
  data remains unchanged; do not present the title or nominal count as approved
  Persian copy.
- `6ES7331-1KF01-0AB0` approves the complete canonical identifier,
  analog-input module type and 8 analog inputs. The cited EC31 SDK Table A-4
  does not authorize compatibility claims.

Evidence reuses readiness-accessed parsed text of Module Data, 05/2022,
A5E00105505-AK, and Software Development Kit for EC31, 08/2010,
A5E01716340-03. Visual inspection and direct-origin HTTP status were
**NOT OBSERVED**; no fresh manufacturer retrieval or lifecycle verification
is performed here. No additional standalone electrical, lifecycle, availability,
compatibility or operating-performance claims are approved. All earlier
qualifications and unresolved issues above remain unchanged.

Batch 11 approval and evidence limits (sections and printed pages in
[DATABASE.md](DATABASE.md#2026-11-16---batch-11-private-product-copy-checkpoint-historical-snapshot)):

- All five Products — `6ES7331-1KF02-0AB0`, `6ES7331-7KF02-0AB0`,
  `6ES7331-7HF01-0AB0`, `6ES7331-7NF00-0AB0` and `6ES7331-7NF10-0AB0` —
  approve only exact MLFB identity and analog-input module type. Full titles,
  channel counts, Universal, resolution, speed, isochronous operation, diagnostics,
  electrical capabilities, compatibility, lifecycle and availability are outside
  approval. Exclusion does not imply every characteristic is false or unsupported.
- **1KF02:** exact Universal label not observed; PTC mode supplies no analog values.
- **7KF02:** eight nominal inputs versus four with resistive transducers;
  resolution depends on integration time; Universal was not observed.
- **7NF10:** distinct four- and eight-channel modes; no unconditional eight-channel
  Fast claim.
- **7HF01 and 7NF00:** identity/type-only approval despite documented additional
  characteristics.

Evidence reuses readiness-reviewed parsed text of Siemens S7-300 Module Data,
05/2022, A5E00105505-AK. Visual inspection and direct-origin HTTP status were
**NOT OBSERVED**. No fresh retrieval or lifecycle verification is performed here;
no new HTTP 403 result is claimed. Canonical data, SM327 configurable-channel
semantics, 7KB02's MLFB/type-only scope, the 1KF01 SDK limitation, unresolved
1BP00 and older qualifications above remain unchanged.

Batch 12 approval and evidence limits (detailed references and printed pages in
[DATABASE.md](DATABASE.md#2026-11-17---batch-12-private-product-copy-checkpoint-current-state)):

- All five Products — `6ES7331-7PF01-0AB0`, `6ES7331-7PE10-0AB0`,
  `6ES7331-7PF11-0AB0`, `6ES7331-7RD00-0AB0` and `6ES7331-7SF00-0AB0` —
  approve exact MLFB identity and analog-input module type only. Full titles,
  counts, RTD/thermocouple characteristics, Ex certification/suitability,
  resolution, electrical ranges, performance, compatibility, lifecycle and
  availability remain outside approval.
- **7PF01 / 7PE10 / 7PF11:** reuse readiness-reviewed parsed text of Module Data,
  05/2022, A5E00105505-AK. 7PF01 has four/eight-channel operating modes; 7PF11 has
  four/eight-channel modes and compensation-wiring-dependent usable channels.
  No unconditional count or performance claim is approved.
- **7RD00:** evidence remains readiness-reviewed official indexed exact-product
  datasheet text, printed p1/3, product description and Analog inputs.
  Readiness-reported direct tool retrieval returned **403 Forbidden**; this was
  **not a successful PDF read or parsed-PDF access**. Raw footer string:
  `1/29/2026`.
- **7SF00:** evidence remains readiness-accessed parsed exact-product datasheet
  text, printed p1/3, product description and Analog inputs. Eight thermocouple
  versus four RTD inputs are mode-dependent alternatives outside approval.
  Raw footer string: `11/4/2025`.
- Footer strings are document observations without date-format interpretation
  or lifecycle inference. Printed pages are distinct from viewer indices.
  Visual inspection and successful direct-origin HTTP status for accessible
  parsed documents were **NOT OBSERVED**; preserve the separate 7RD00 403
  observation. No fresh retrieval or lifecycle verification is performed here.
  Canonical data, all earlier qualifications and deferred issues remain unchanged.

Other deferred work: inquiry delivery/persistence, broader automated tests/CI/CD,
verified download/relation population, and owner-selected catalog expansion. See
[ARCHITECTURE.md](ARCHITECTURE.md), [DATABASE.md](DATABASE.md),
[PROJECT_STATE.md](PROJECT_STATE.md), [PROJECT_PROGRESS.md](PROJECT_PROGRESS.md),
[PROJECT_VISION.md](PROJECT_VISION.md), [ROADMAP.md](ROADMAP.md), and
[CHANGELOG.md](CHANGELOG.md) for details and dated history.

## Validation applicability

- **PASS (REUSED)**: recorded Batch 12 validator, focused lint and build including
  TypeScript and 774/774 static pages each exited 0 at reviewed head
  `d0ee57798a0e9ec862a9cf1f7d788605796330f7`. Reviewed/squash tree
  `3149e013ed052457772aacea0ae4d43b84370af1` is identical. Application,
  dependency and build-configuration content is unchanged by this Markdown-only
  task; no validator/lint/build/standalone TypeScript, public-resolution checks,
  historical hash audits or manufacturer research are newly run. Recorded
  preservation of all previous 55 complete entries/metadata/hashes and all 60
  draft contents/bindings/provenance, authorization of five MLFB segments and
  ten independent text/kind cases each staling both approvals are reused
  implementation results. Fixed 30/50/55 membership boundaries remain intact;
  these are not fresh documentation-task audits.
- Recorded Batch 12 implementation CI was **absent**: zero checks/statuses,
  combined pending, not passed CI. Guarded squash and main synchronization
  completed. Dedicated completed-copy inspection remains pending.

- Current coverage: 60 drafts/current approvals per role, 60 dual approvals,
  zero pending roles and 322 missing entries. Activation validation remains invalid:
  `overlayCount` 60, `approvedCount` 60, `missingIds.length` 322, capability absent.
  Active overlays remain zero and publication disabled. Fresh documentation checks
  belong in the task report and PR.

### Historical Batch 11 checkpoint and validation

The dated Batch 11 55/327 checkpoint and prospective workflow are historical,
superseded by Batch 12. Product/evidence limits remain in
[DATABASE.md](DATABASE.md#2026-11-16---batch-11-private-product-copy-checkpoint-historical-snapshot).

Merged implementation baseline: `e1755b027ebf1f869e20b2cb05e45b5e76d61350`.
[PR #79](https://github.com/Siemiran/Siemiran/pull/79),
`feat: add Batch 11 Persian product copy`, merged at `2026-11-16T19:10:14Z`
(Asia/Tehran: `2026-11-16 22:40:14`). Sole parent:
`0909b7bfb5960f4e1b23653ffd5f893ead734114`. Reviewed feature head:
`ffc46c2fadb8fa9fa3bfb4b1c849ff079509b46d`; draft:
`e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900`; reviewed/squash tree:
`c7cbe90a28b947f0347c201f7f068d7ee0f9599d`. Implementation scope: registry
+170/-0, verifier +264/-10; two files +434/-10. Guarded squash and main-only
fetch/switch/fast-forward synchronization completed. At that checkpoint
`feat/fa-product-copy-batch-11` remained locally/cached/live at the reviewed
head. Recheck actual refs and index/worktree on resume.

- **PASS (REUSED)**: recorded Batch 11 validator, focused lint and build including
  TypeScript each exited 0 at reviewed head
  `ffc46c2fadb8fa9fa3bfb4b1c849ff079509b46d`. Reviewed/squash tree
  `c7cbe90a28b947f0347c201f7f068d7ee0f9599d` is identical. Application,
  dependency and build-configuration content is unchanged by this Markdown-only
  task; no validator/lint/build/standalone TypeScript, public-resolution checks,
  historical hash audits or manufacturer research are newly run. Preservation
  of all previous 50 complete entries/metadata/hashes and all 55 draft contents/
  bindings/provenance, authorization of five MLFB segments and ten text/kind
  cases each staling both approvals are reused implementation results. The
  30- and 50-entry membership boundaries remain intact; these are not fresh
  documentation-task audits.
- Recorded Batch 11 implementation CI was **absent**: zero checks/statuses,
  combined pending, not passed CI. Guarded squash and main synchronization
  completed. Dedicated completed-copy inspection remains pending.

- Historical coverage: 55 drafts/current approvals per role, 55 dual approvals,
  zero pending roles and 327 missing entries. Activation-validation `overlayCount`
  is 55; active overlays remain zero, capability absent and publication disabled.
  Fresh documentation checks belong in the task report and PR.

### Historical Batch 10 checkpoint and validation

The dated Batch 10 50/332 checkpoint and prospective workflow are historical,
superseded by Batch 11. Product/evidence limits remain in
[DATABASE.md](DATABASE.md#2026-11-16---batch-10-private-product-copy-checkpoint-historical-snapshot).

Merged implementation baseline: `8b88ef4eac08d7cbb8e49b315d91f5f2b49ebaa9`.
[PR #77](https://github.com/Siemiran/Siemiran/pull/77),
`feat: add Batch 10 Persian product copy`, merged at `2026-11-16T17:55:14Z`
(Asia/Tehran: `2026-11-16 21:25:14`). Sole parent:
`bcac20ac778fddd895c18d52d795c4eb62056b0c`. Reviewed feature head:
`f1ee87889d4727d8e57f5e1e5c36195665660c0e`; draft:
`e203b34b5e19bafa85efaf76cf58fbb7721e909e`; reviewed/squash tree:
`651b30e994cff4afe67b86dee9e9778decce3a02`. Implementation scope: registry
+187/-0, verifier +292/-10; two files +479/-10. Guarded squash and main-only
fetch/switch/fast-forward synchronization completed. At that checkpoint
`feat/fa-product-copy-batch-10` remained locally/cached/live at the reviewed
head. Recheck actual refs and index/worktree on resume.

- **PASS (REUSED)**: recorded Batch 10 validator, focused lint and build including
  TypeScript each exited 0 at reviewed head
  `f1ee87889d4727d8e57f5e1e5c36195665660c0e`. Reviewed/squash tree
  `651b30e994cff4afe67b86dee9e9778decce3a02` is identical. Application,
  dependency and build-configuration content is unchanged by this Markdown-only
  task; no validator/lint/build/standalone TypeScript, public-resolution checks,
  historical hash audits or manufacturer research are newly run. Preservation
  of the previous 45 complete entries and all 50 draft contents/bindings/provenance,
  authorization of 12 technical segments and ten text/kind cases each staling both
  approvals are reused implementation evidence, not new documentation-task audits.
- Recorded Batch 10 implementation CI was **absent**: zero checks/statuses,
  combined pending, not passed CI. Guarded squash and main synchronization
  completed. Dedicated completed-copy inspection remains pending.

- Historical coverage: 50 drafts/current approvals per role, 50 dual approvals,
  zero pending roles and 332 missing entries. Activation-validation `overlayCount`
  is 50; active overlays remain zero, capability absent and publication disabled.
  Fresh documentation checks belong in the task report and PR.

### Historical Batch 09 checkpoint and validation

The dated Batch 09 45/337 checkpoint and prospective workflow are historical,
superseded by Batch 10. Product/evidence limits remain in
[DATABASE.md](DATABASE.md#2026-11-14---batch-09-private-product-copy-checkpoint-historical-snapshot).

Merged implementation baseline: `fca25e9134aae5aa9d42d9437cccefe37196eb39`.
[PR #75](https://github.com/Siemiran/Siemiran/pull/75),
`feat: add Batch 09 Persian product copy`, merged at `2026-11-14T18:38:22Z`
(Asia/Tehran: `2026-11-14 22:08:22`). Sole parent:
`7af11af9376a0b12146ce37615f95d056f2e9f85`. Reviewed feature head:
`6ab823a9588c162fd4dd505bab1a21cdf2fb9a6a`; draft:
`cb9b8f629591d0f32f4a2ebf46da720c50f13305`; reviewed/squash tree:
`ee75437291dada3c677e2815dcc37ae42381c8a6`. Implementation scope: registry
+180/-0, verifier +247/-13; two files +427/-13. Guarded squash and main-only
fetch/switch/fast-forward synchronization completed. At that checkpoint
`feat/fa-product-copy-batch-09` remained locally/cached/live at the reviewed
head. Recheck actual refs and index/worktree on resume.

- **PASS (REUSED)**: recorded Batch 09 validator, scoped lint and build including
  TypeScript each exited 0 at reviewed head
  `6ab823a9588c162fd4dd505bab1a21cdf2fb9a6a`. Reviewed/squash tree
  `ee75437291dada3c677e2815dcc37ae42381c8a6` is identical. Application,
  dependency and build-configuration content is unchanged by this Markdown-only
  task; no validator/lint/build/standalone TypeScript, public-resolution checks,
  historical hash audits or manufacturer research are newly run. Recorded ten
  text/kind cases each staled both approvals; previous 40 complete entries,
  metadata and hashes were preserved by recorded implementation comparison.
- Recorded Batch 09 implementation CI: **NOT RUN**; zero checks/statuses/workflows
  and combined pending, not passed CI. Guarded squash and main synchronization
  completed; dedicated completed-copy inspection remains pending.
- Historical coverage: 45 drafts/current approvals per role, 45 dual approvals,
  zero pending roles and 337 missing entries. Activation-validation `overlayCount`
  is 45; active overlays remain zero, capability absent and publication disabled.
  Fresh documentation checks belong in the task report and PR.

### Historical Batch 08 checkpoint and validation

The dated Batch 08 40/342 checkpoint below is historical, superseded by Batch 09.
Its merged implementation was `1fc04eb68d1d1149bf05863a75a37d8c9103c47b`;
Product/review evidence remains in
[DATABASE.md](DATABASE.md#2026-11-13---batch-08-private-product-copy-checkpoint-historical-snapshot).

- **PASS (REUSED)**: recorded Batch 08 validator, scoped lint and build including
  TypeScript each exited 0 at reviewed head
  `65572825232a1d9d4b2b9f440b1619f2aeada275`. Reviewed/squash tree
  `775a12a26ff6c77fc0c219094df4c0a9cbe03589` is identical. Application,
  dependency and build-configuration content is unchanged by this Markdown-only
  task; no validator/lint/build/TypeScript, public-resolution or historical-hash
  audit is newly run. Recorded mutation checks each staled both approvals.
- Recorded Batch 08 pre-merge CI: **NOT RUN**; zero checks/statuses/workflows,
  with combined pending. This is absent CI, not passed CI. Guarded squash and
  main synchronization passed; dedicated completed-copy inspection is pending.

- Current coverage: 40 drafts/current approvals per role, 40 current dual
  approvals, zero pending roles and 342 missing entries. Evidence/limits above
  remain applicable; fresh documentation checks belong in the task report/PR.

### Historical Batch 07 checkpoint and validation

The former Batch 07 implementation `e93dd9229386153ee3a192a22ef3c977be3cb57d` (PR #71)
recorded 35/382 drafts/current approvals per role, 35 current dual approvals,
zero pending roles and 347 missing entries. Its validation below is historical;
Reviewed draft: `e952ecf2036f5d191b712191d637cb042b4426f6`;
merged checkpoint details remain in [CHANGELOG.md](CHANGELOG.md).

- **PASS (REUSED)**: recorded Batch 07 product-copy validator, scoped lint and
  build including TypeScript each exited 0 at reviewed approval head
  `81b2c5dbe7fd86d609380068c6d4ec9a4626acc7`. Its tree
  `590d66a9ea00d05954afbb69f9b0e53b6e772222` equals the PR #71 squash tree.
  This Markdown-only task leaves application, dependency and build-configuration
  content unchanged; no application checks or approval-hash audits are newly run.
- Recorded Batch 07 pre-merge CI: **NOT RUN**; zero check runs/status contexts,
  with empty combined pending status. This is not passed CI. Guarded squash
  merge and main synchronization passed; completed-copy inspection is pending.

Current coverage is 35 drafts/current approvals per role, 35 dual approvals,
zero pending roles and 347 missing entries, with publication safeguards unchanged.

- Fresh documentation consistency, link/anchor, scope and whitespace results
  belong in the task report/PR with actual counts and exit evidence. Dedicated
  completed-copy visual/functional inspection remains pending.

### Historical Batch 06 checkpoint and validation

The former implementation identity, counts, timestamps and validation below are
historical; Batch 07 above supersedes their next-step statements.

Merged implementation baseline: `e1238d59fde168d86f9491546bc4686fb263ab63`.
[PR #69](https://github.com/Siemiran/Siemiran/pull/69),
`feat: add Batch 06 Persian product copy`, merged at `2026-11-13T10:42:08Z`
(Tehran: `2026-11-13 14:12:08`). Sole parent:
`d74ee4f6d3f2c6927629a4cd82ab01662ad912bc`. Reviewed feature head:
`c8974245a187d81ad97be05e0034f5bdc3e57016`; reviewed/squash tree:
`7e82b98b766f9e8f6b5763a0585b541fbb44a800`. Its two-file implementation
scope was +356/-11. Guarded squash merge, remote result
verification, and local main-only fetch/fast-forward synchronization completed.
`feat/fa-product-copy-batch-06` remains at the reviewed head locally and remotely.

Batches 01-06 are complete **privately**. Batch 06 contains exactly
`6ES7321-7RD00-0AB0`, `6ES7322-1BF01-0AA0`, `6ES7322-1BH01-0AA0`,
`6ES7322-1BH10-0AA0`, and `6ES7322-1BL00-0AA0`. Its approved `ai-assisted`
copy covers full model identifiers, digital-input/output type and channel counts
4/8/16/16/32 respectively. Each Product has separate hash-bound approval records
by `Siemiran`: linguistic `2026-11-13T10:10:19Z`, technical
`2026-11-13T10:10:47Z`. Recorded machine comparison preserves all previous
25 complete entries, metadata and hashes. Historical Batch 01-05 coverage remains
5/10/15/20/25 entries and 377/372/367/362/357 missing respectively. For 7RD00,
24 V concerns electronic load supply; copy approval verifies neither
`inputVoltage` semantics nor Ex application claims. High Speed remains part of
the 1BH10 model identifier.

- **PASS (REUSED)**: recorded Batch 06 product-copy validator, scoped lint,
  build including TypeScript, and whitespace checks exited **0** at approval
  head `c8974245a187d81ad97be05e0034f5bdc3e57016`. Its exact tree
  `7e82b98b766f9e8f6b5763a0585b541fbb44a800` equals the PR #69 squash tree.
  Current coverage is 30 drafts/approvals per role, 30 dual approvals, zero
  pending roles and 352 missing entries, with publication safeguards unchanged.
  Markdown-only reconciliation leaves application, dependency and build
  configuration unchanged; no validator/lint/build/TypeScript or approval-hash
  audit is newly executed.
- Focused approval integrity, guarded merge verification and main-only
  fetch/switch/fast-forward synchronization passed. Recorded pre-merge CI was
  **NOT RUN**: zero check runs/status contexts with combined pending, not passed CI.

### Historical Validation — 2026-10-02

The following dated Batch 05 and documentation checks retain their original
counts and evidence; they are not current coverage or new task executions.

- **NEW**, 2026-10-02: `npm.cmd run validate:product-copy` ran exactly once from
  `apps/web`, exit **0**, against unchanged Batch 05 application content. It
  confirms 25 entries/approvals per role, 25 dual approvals, zero pending roles,
  357 missing, eleven omissions, unchanged catalog/route parity, zero overrides
  in Batches 03-05, and disabled publication with no capability. All five Batch
  05 text/kind mutation cases stale both approvals. The fixture-only
  complete-activation test does not describe live registry readiness.
- **REUSED**: recorded Batch 05 validator/lint/build evidence exited **0** and
  the build generated **774/774** pages with TypeScript checked within the build.
  Independent linguistic, technical, and approval-integrity reviews passed at
  reviewed head `a3270bb3ef856cff15d54679a65073d5b676f0d2`. Its tree equals
  the PR #67 squash tree, and application/dependency/build-config content is
  unchanged by this eight-document reconciliation. Lint/build/TypeScript were
  not newly run; older PR #65 evidence is not substituted. Recheck applicability
  if any relevant content changes.
- **NEW**, 2026-10-02: complete eight-document consistency/history review passed.
  The memory-only Node Markdown audit exited **0**: all **31** local link targets
  exist; no local fragments require anchor validation. Worktree/staged-index
  whitespace and exact eight-path scope comparisons against the baseline and
  reviewed head exited **0**, with all outside content unchanged. All **83**
  pre-existing refs were preserved; only this new documentation branch was added.

## Session-end / resume checklist

- Record branch, exact HEAD, sole parent/base, index/worktree clean or dirty state,
  and live/local `main` refs. The durable implementation baseline is
  `b62b5fccebf748d09a0164271bb477be23887570`; task-specific workflow status and
  commit/PR identities belong in the task report rather than this file.
- Identify existing task branches, patches, and commits before starting; preserve
  identifiable partial work and finish only missing authorized work. If refs or
  unrelated changes differ, report the discrepancy before any reset/stash/rebase.
- Review affected passages and confirm the authorized path scope; application,
  source/registry/approval/token-policy, dependency/build-config/AGENTS and legacy
  content must remain unchanged during documentation-only work.
- Record validation commands, exit codes, NEW versus REUSED status, exact checked
  content, and evidence limitations. Check Markdown links/anchors, whitespace
  and unchanged outside content; report actual results and final clean state.
- Batch 13 readiness/scope remains unapproved and unstarted. Overlay activation,
  publication, English indexing and completed-copy website inspection remain
  separately authorized future work.
