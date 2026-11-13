# Siemiran — Session Handoff

Checkpoint: **2026-11-13 (Asia/Tehran)**. Implementation: private Batch 06
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
| Private drafts / linguistic approvals / technical approvals | 30/382 each |
| Current dual approvals / pending roles / missing private entries | 30 / zero / 352 |
| Active overlays / activation capability / publication | 0/382 / absent / disabled |
| Public FA/EN Product copy | Canonical English/LTR |
| Overrides | 10 Products / 20 assignments / 7 unique strings |
| Batch 06 added overrides / global allowlist | Zero / empty |
| Canonical lifecycle omissions | Exactly eleven |
| S7-300 lifecycle provenance | 185 Siemens-official verified / 11 explicitly unverified |

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
the 1BH10 model identifier. All 764 public
FA/EN resolutions remain canonical English/LTR. Lifecycle omission debt is separate from missing
Persian-copy coverage. Activation requires the complete 382/382 current
content-hash-bound dual-approval gate **and separate authorization**; partial
activation is prohibited. Private drafts authorize neither activation nor publication.

## Outstanding work and evidence limits

1. Batch 07 readiness/scope work remains **unapproved and unstarted**. A later
   read-only readiness audit and independent scope/token review require separate
   authorization; do not draft copy or change policy/approvals as part of this
   documentation task.
2. Complete the remaining 352 private drafts and both review roles through later
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

Other deferred work: inquiry delivery/persistence, broader automated tests/CI/CD,
verified download/relation population, and owner-selected catalog expansion. See
[ARCHITECTURE.md](ARCHITECTURE.md), [DATABASE.md](DATABASE.md),
[PROJECT_STATE.md](PROJECT_STATE.md), [PROJECT_PROGRESS.md](PROJECT_PROGRESS.md),
[PROJECT_VISION.md](PROJECT_VISION.md), [ROADMAP.md](ROADMAP.md), and
[CHANGELOG.md](CHANGELOG.md) for details and dated history.

## Validation applicability

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
- Fresh documentation consistency, link/anchor, scope and whitespace results
  belong in the task report/PR with actual counts and exit evidence. Dedicated
  completed-copy visual/functional inspection remains pending.

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
  `e1238d59fde168d86f9491546bc4686fb263ab63`; task-specific workflow status and
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
- Batch 07 readiness/scope remains unapproved and unstarted. Overlay activation,
  publication, English indexing and completed-copy website inspection remain
  separately authorized future work.
