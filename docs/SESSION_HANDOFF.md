# Siemiran — Session Handoff

Checkpoint: **2026-11-13 (Asia/Tehran)**. Implementation: private Batch 08
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

Merged implementation baseline: `1fc04eb68d1d1149bf05863a75a37d8c9103c47b`.
[PR #73](https://github.com/Siemiran/Siemiran/pull/73),
`feat: add Batch 08 Persian product copy`, merged at `2026-11-13T17:31:44Z`
(Asia/Tehran: `2026-11-13 21:01:44`). Sole parent:
`7387413e5cb6a411562c37619dded82684187384`. Reviewed feature head:
`65572825232a1d9d4b2b9f440b1619f2aeada275`; draft:
`58ecfa94d0e9565fd23967196f358c0f8cb7eccc`; reviewed/squash tree:
`775a12a26ff6c77fc0c219094df4c0a9cbe03589`. Implementation scope: registry
+173/-0, verifier +229/-11; two files +402/-11. Guarded squash and main-only
fetch/switch/fast-forward synchronization completed. At that checkpoint
`feat/fa-product-copy-batch-08` remained locally/cached/live at the reviewed
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
| Private drafts / linguistic approvals / technical approvals | 40/382 each |
| Current dual approvals / pending roles / missing private entries | 40 / zero / 342 |
| Active overlays / activation capability / publication | 0/382 / absent / disabled |
| Public FA/EN Product copy | Canonical English/LTR |
| Overrides | 10 Products / 20 assignments / 7 unique strings |
| Batch 08 added overrides / global allowlist | Zero / empty |
| Canonical lifecycle omissions | Exactly eleven |
| S7-300 lifecycle provenance | 185 Siemens-official verified / 11 explicitly unverified |

Batches 01-08 are complete **privately**. Batch 08's five `ai-assisted` entries
approve complete titles as identifiers, digital-output type and counts
8/32/64/64/16 only. Ten distinct `Siemiran` role records bind unchanged hashes.
Observed UTC recording times: linguistic `2026-11-13T17:07:03Z`; technical
`2026-11-13T17:07:54Z`. These are recording-time observations, not claimed PM
review timestamps. Recorded machine comparison preserved the previous 35 complete
entries, metadata and hashes; ten independent text/kind cases each staled both
approvals. Product/evidence details are in [DATABASE.md](DATABASE.md#2026-11-13---batch-08-private-product-copy-checkpoint-current-state).
All 764 public FA/EN resolutions remain canonical English/LTR. Lifecycle omission debt is separate from missing
Persian-copy coverage. Activation requires the complete 382/382 current
content-hash-bound dual-approval gate **and separate authorization**; partial
activation is prohibited. Private drafts authorize neither activation nor publication.

## Outstanding work and evidence limits

1. Batch 09 readiness/scope work remains **unapproved and unstarted**. A later
   read-only readiness audit and independent scope/token review require separate
   authorization; do not draft copy or change policy/approvals as part of this
   documentation task.
2. Complete the remaining 342 private drafts and both review roles through later
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
lifecycle verification. See [DATABASE.md](DATABASE.md#2026-11-13---batch-08-private-product-copy-checkpoint-current-state).

Other deferred work: inquiry delivery/persistence, broader automated tests/CI/CD,
verified download/relation population, and owner-selected catalog expansion. See
[ARCHITECTURE.md](ARCHITECTURE.md), [DATABASE.md](DATABASE.md),
[PROJECT_STATE.md](PROJECT_STATE.md), [PROJECT_PROGRESS.md](PROJECT_PROGRESS.md),
[PROJECT_VISION.md](PROJECT_VISION.md), [ROADMAP.md](ROADMAP.md), and
[CHANGELOG.md](CHANGELOG.md) for details and dated history.

## Validation applicability

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
  `1fc04eb68d1d1149bf05863a75a37d8c9103c47b`; task-specific workflow status and
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
- Batch 09 readiness/scope remains unapproved and unstarted. Overlay activation,
  publication, English indexing and completed-copy website inspection remain
  separately authorized future work.
