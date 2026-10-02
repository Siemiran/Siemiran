# Siemiran — Session Handoff

Checkpoint: **2026-10-02 (Asia/Tehran)**. Stage: local documentation
reconciliation after merged private Batch 05; independent documentation review pending.

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

Merged implementation baseline: `04a302c9b587954131289e8624a1f90344b9ffdd`.
[PR #67](https://github.com/Siemiran/Siemiran/pull/67),
`feat: add Batch 05 Persian product copy`, merged at `2026-10-02T09:46:57Z`
(Tehran: `2026-10-02 13:16:57`). Sole parent:
`3becc93356a3e46780f7f36f947b184c234cc376`. Reviewed feature head:
`a3270bb3ef856cff15d54679a65073d5b676f0d2`; reviewed/squash tree:
`199d0286dbb0b80123c4f4b51a7d5b1c9ddaf9ce`. Its two-file implementation
scope was 602 insertions and 9 deletions. Guarded squash merge, remote result
verification, and local main-only fetch/fast-forward synchronization completed.
`feat/fa-product-copy-batch-05` remains at the reviewed head locally and remotely.

At task entry, HEAD, local `main`, `origin/main`, and live remote `main` all
matched this baseline; index/worktree were clean. No prior branch, patch, or
commit for this exact task was found. Documentation branch:
`docs/reconcile-fifth-persian-product-copy-batch`, created from that baseline.
Required single local commit title:
`docs: reconcile fifth Persian product-copy batch`. Identify its actual HEAD
and sole parent with `git log -1 --format="%H %P %s"`; this file records the
implementation baseline rather than its own commit SHA. Independent review,
push, PR creation, merge, and local synchronization are still pending. No
documentation PR number is assigned here.

Historical operational limitations are resolved for the implementation: the
GitHub integration PR-creation attempt returned HTTP 403 (`Resource not
accessible by integration`), and browser automation reported no available
browser. PR #67 was subsequently created and its guarded merge and synchronization
completed; these earlier limitations do not describe the current PR state.

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
| Private drafts / linguistic approvals / technical approvals | 25/382 each |
| Current dual approvals / pending roles / missing private entries | 25 / zero / 357 |
| Active overlays / activation capability / publication | 0/382 / absent / disabled |
| Public FA/EN Product copy | Canonical English/LTR |
| Overrides | 10 Products / 20 assignments / 7 unique strings |
| Batches 03-05 added overrides / global allowlist | Zero / empty |
| Canonical lifecycle omissions | Exactly eleven |
| S7-300 lifecycle provenance | 185 Siemens-official verified / 11 explicitly unverified |

Batches 01-05 are complete **privately**. Batch 05 contains exactly
`6ES7321-7BH01-0AB0`, `6ES7321-7EH00-0AB0`, `6ES7321-7TH00-0AB0`,
`6ES7321-1BH50-0AA0`, and `6ES7321-7BH00-0AB0`. Its approved `ai-assisted`
copy uses complete canonical titles as identifiers, digital-input module type,
and sixteen inputs. Each Product has separate hash-bound linguistic and technical
approval records by `Siemiran`, at `2026-10-01T17:45:15Z` and
`2026-10-01T17:45:26Z` respectively. All prior twenty entries, metadata, and
approval hashes remain intact. Historical Batch 01-04 coverage remains
5/10/15/20 entries and 377/372/367/362 missing respectively. All 764 public
FA/EN resolutions remain canonical English/LTR. Lifecycle omission debt is separate from missing
Persian-copy coverage. Activation requires the complete 382/382 current
content-hash-bound dual-approval gate **and separate authorization**; partial
activation is prohibited. Private drafts authorize neither activation nor publication.

## Outstanding work and evidence limits

1. Independently review this documentation branch. Only after separate
   authorization, push/create a PR, perform a guarded squash merge, and synchronize
   local `main` after verifying the reviewed content, live base, topology, and
   clean worktree.
2. Batch 06 scope/readiness work remains **unapproved and unstarted**. A later
   read-only readiness audit and independent scope/token review require separate
   authorization; do not draft copy or change policy/approvals as part of this
   documentation task.
3. Complete the remaining 357 private drafts and both review roles through later
   separately authorized batches. Public activation and bilingual SEO remain
   separate future tasks; English indexing, hreflang, and localized sitemap work
   remain deferred.
4. After Persian Product-copy completion, perform the pending dedicated local
   visual and functional website inspection with the maintainer: FA/EN switching,
   Persian wording, RTL/LTR isolation, Product pages, cards, comparison, and
   responsive layouts. A later preview task must explicitly define how completed
   Persian copy is displayed; private drafts alone authorize neither activation
   nor publication. That inspection has not begun.
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
- After the single local commit, check cumulative committed-diff whitespace,
  final clean index/worktree, pre-existing ref identities, and live `main`
  read-only. Report actual results and the documentation SHA separately;
  independent documentation review remains pending.

## Session-end / resume checklist

- Record branch, exact HEAD, sole parent/base, index/worktree clean or dirty state,
  and live/local `main` refs. For this documentation commit, the required parent/base
  is `04a302c9b587954131289e8624a1f90344b9ffdd`.
- Identify existing task branches, patches, and commits before starting; preserve
  identifiable partial work and finish only missing authorized work. If refs or
  unrelated changes differ, report the discrepancy before any reset/stash/rebase.
- Review the complete diff and verify exactly the seven authorized existing docs
  plus this handoff changed; all application/source/registry/approval/token-policy,
  test/dependency/build-config/AGENTS and legacy content must remain unchanged.
- Record validation commands, exit codes, NEW versus REUSED status, exact checked
  content, and evidence limitations. Check worktree (`git diff --check`), index
  (`git diff --cached --check`), and committed base-to-HEAD whitespace
  (`git diff 04a302c9b587954131289e8624a1f90344b9ffdd HEAD --check`), then
  verify final index/worktree status after the single local commit.
- List pending actions explicitly. Current stopping point is independent
  documentation review; documentation push/PR/merge/synchronization, Batch 06, overlay activation,
  publication, English indexing, and website inspection remain future work.
