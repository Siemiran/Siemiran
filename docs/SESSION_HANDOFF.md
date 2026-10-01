# Siemiran — Session Handoff

Checkpoint: **2026-10-01 (Asia/Tehran)**. Stage: local documentation
reconciliation after private Batch 04; independent documentation review pending.

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

Implementation baseline: `84d4fe14e82e7a922509a5ca8899cd50f1d3167d`.
[PR #65](https://github.com/Siemiran/Siemiran/pull/65),
`feat: add Batch 04 Persian product copy`, merged at `2026-09-28T18:03:45Z`.
Sole parent: `00af171572c427dba986340e7efd36f8ca0ad1d7`. Reviewed head:
`2eefce5487fb08872ed6a92f94e3b13d12659fa6`; reviewed/squash tree:
`e567b87b9e7bb9274bab69fec9f3ed98e68964ad`.

At task entry, HEAD, local `main`, `origin/main`, and live remote `main` all
matched this baseline; index/worktree were clean. No prior branch, patch, or
commit for this exact task was found. Documentation branch:
`docs/reconcile-fourth-persian-product-copy-batch`, created from that baseline.
Required single local commit title:
`docs: reconcile fourth Persian product-copy batch`. Identify its actual HEAD
and sole parent with `git log -1 --format="%H %P %s"`; this file records the
implementation baseline rather than its own commit SHA. Independent review,
push, PR creation, merge, and local synchronization are still pending. No
documentation PR number is assigned here.

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
| Private drafts / linguistic approvals / technical approvals | 20/382 each |
| Current dual approvals / missing Persian-copy coverage | 20 / 362 |
| Active overlays / activation capability / publication | 0/382 / absent / disabled |
| Public FA/EN Product copy | Canonical English/LTR |
| Overrides | 10 Products / 20 assignments / 7 unique strings |
| Batch 04 added overrides / global allowlist | Zero / empty |
| Canonical lifecycle omissions | Exactly eleven |
| S7-300 lifecycle provenance | 185 Siemens-official verified / 11 explicitly unverified |

Batches 01-04 are complete **privately**. Batch 04 contains exactly
`6ES7321-1CH00-0AA0`, `6ES7321-1EL00-0AA0`, `6ES7321-1FF01-0AA0`,
`6ES7321-1FF10-0AA0`, and `6ES7321-1FH00-0AA0`. Earlier batches and valid
dated evidence remain intact. Lifecycle omission debt is separate from missing
Persian-copy coverage. Activation requires the complete 382/382 current
content-hash-bound dual-approval gate **and separate authorization**; partial
activation is prohibited. Private drafts authorize neither activation nor publication.

## Outstanding work and evidence limits

1. Independently review this documentation branch. Only after separate
   authorization, push/create a PR, perform a guarded squash merge, and synchronize
   local `main` after verifying the reviewed content, live base, topology, and
   clean worktree.
2. Then perform a **read-only Batch 05 readiness audit**, recommending exactly
   five coherent Products for independent scope/token review. Batch 05 has not
   started and no scope is approved. Do not draft copy or change policy/approvals
   as part of that audit.
3. Complete the remaining 362 private drafts and both review roles through later
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

Review used indexed exact-product Siemens text and available product HTML; direct
PDF requests returned HTTP 403. No fresh direct PDF access is claimed. For 1CH00,
2026-02-09 is the exact datasheet **document date**, not a lifecycle effective
date; 2026-09-25 is the earlier reported review/403 date, with no separate retrieval
audit record located; independent review reproduced HTTP 403 on 2026-09-26.
Supported source lifecycle is `spare-part`, canonical lifecycle remains `legacy`,
and its Mall product URL remains the public link. No current PM code or individual
transition date was established. [PR #60](https://github.com/Siemiran/Siemiran/pull/60)
removed unsupported 1BH10 diagnostics/interrupt fields and omitted the disputed
delay without a verified replacement. Preserve these limitations in later work.

Other deferred work: inquiry delivery/persistence, broader automated tests/CI/CD,
verified download/relation population, and owner-selected catalog expansion. See
[ARCHITECTURE.md](ARCHITECTURE.md), [DATABASE.md](DATABASE.md),
[PROJECT_STATE.md](PROJECT_STATE.md), [PROJECT_PROGRESS.md](PROJECT_PROGRESS.md),
[PROJECT_VISION.md](PROJECT_VISION.md), [ROADMAP.md](ROADMAP.md), and
[CHANGELOG.md](CHANGELOG.md) for details and dated history.

## Validation applicability

- **NEW**, 2026-10-01: `npm.cmd run validate:product-copy` from `apps/web`,
  exit **0**, against application content identical to the implementation baseline.
  Confirms 20 entries/approvals per role, 20 dual approvals, 362 missing, eleven
  omissions, unchanged catalog/route parity, zero Batch 04 overrides, and disabled
  publication with no capability. The fixture-only complete-activation test does
  not describe live registry readiness.
- **REUSED**: PR #65's recorded independent lint, build, and TypeScript PASS at
  reviewed head `2eefce5487fb08872ed6a92f94e3b13d12659fa6`. The reviewed tree
  equals the implementation squash tree, and application/dependency/build-config
  content is unchanged by this eight-document reconciliation. The reviewed build
  generated **774/774** pages. These checks were not newly run; numeric exit codes
  are not retained in the PR record. Recheck applicability if any relevant content changes.
- **NEW** documentation checks, exit **0**: worktree and staged-index whitespace,
  including the baseline-to-staged-content diff; exact eight-path scope with all
  outside content unchanged from both baseline and reviewed head; local documentation
  links. The complete diff was reviewed. Current-statement consistency audit passed;
  dated Batch 01-03 counts remain historical. Post-commit base-to-HEAD whitespace
  and clean index/worktree checks are required at session closure. Independent
  documentation review remains pending.

## Session-end / resume checklist

- Record branch, exact HEAD, sole parent/base, index/worktree clean or dirty state,
  and live/local `main` refs. For this documentation commit, the required parent/base
  is `84d4fe14e82e7a922509a5ca8899cd50f1d3167d`.
- Identify existing task branches, patches, and commits before starting; preserve
  identifiable partial work and finish only missing authorized work. If refs or
  unrelated changes differ, report the discrepancy before any reset/stash/rebase.
- Review the complete diff and verify exactly the seven authorized existing docs
  plus this handoff changed; all application/source/registry/approval/token-policy,
  test/dependency/build-config/AGENTS and legacy content must remain unchanged.
- Record validation commands, exit codes, NEW versus REUSED status, exact checked
  content, and evidence limitations. Check worktree (`git diff --check`), index
  (`git diff --cached --check`), and committed base-to-HEAD whitespace
  (`git diff 84d4fe14e82e7a922509a5ca8899cd50f1d3167d HEAD --check`), then
  verify final index/worktree status after the single local commit.
- List pending actions explicitly. Current stopping point is independent
  documentation review; push/PR/merge/synchronization, Batch 05, overlay activation,
  publication, English indexing, and website inspection remain future work.
