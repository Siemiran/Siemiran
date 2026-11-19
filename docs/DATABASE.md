# Siemiran — Product Database

Repository source of truth: `main` at
`f30da51f62eb8bfeb9ea2b5b9c0a05e0cf7ac6c2` (2026-11-19).

## 2026-11-19 - Batch 13 Private Product-copy Checkpoint (Current State)

[PR #83](https://github.com/Siemiran/Siemiran/pull/83) merged as `f30da51f62eb8bfeb9ea2b5b9c0a05e0cf7ac6c2`
on 2026-11-19. See [CHANGELOG.md](CHANGELOG.md#2026-11-19---pr-83-complete-batch-13-private-drafts-and-dual-approvals) for the exact merge identity and scope.

The five entries approve only exact MLFB identity and the respective module
type: two analog inputs and three analog outputs. The `ai-assisted` copy uses identical three-segment short and
single-paragraph long descriptions: a Persian introduction, one typed exact
MLFB, and the respective Persian module type. Full titles, counts, HART/U/I
characteristics, resolution, diagnostics, electrical ranges, compatibility,
certification, lifecycle, availability and performance are outside approval.

| Exact MLFB | Stable Product ID | Approved module type | Evidence / section / printed pages |
| --- | --- | --- | --- |
| `6ES7331-7TB00-0AB0` | `siemens-s7-300-sm331-ai2-hart-7tb00-0ab0` | analog-input | E1 / §4.4.4 / p176 |
| `6ES7331-7TF01-0AB0` | `siemens-s7-300-sm331-ai8-hart-7tf01-0ab0` | analog-input | E2 / §6.1 / p55 |
| `6ES7332-5HB01-0AB0` | `siemens-s7-300-sm332-ao2-ui-11-12bit-5hb01-0ab0` | analog-output | E3 / §6.15 / pp388–389 |
| `6ES7332-5HD01-0AB0` | `siemens-s7-300-sm332-ao4-ui-diagnostics-5hd01-0ab0` | analog-output | E3 / §6.14 / p382 |
| `6ES7332-5HF00-0AB0` | `siemens-s7-300-sm332-ao8-ui-diagnostics-5hf00-0ab0` | analog-output | E3 / §6.12 / p367 |

- **E1:** [Siemens S7-300, ET 200M Ex I/O Modules, 04/2022, A5E00172008-AP](https://support.industry.siemens.com/cs/attachments/1096709/s7300_et200m_ex_io_modules_manual_en_en-US.pdf).
- **E2:** [Siemens HART analog modules, 11/2020, A5E00434623-AG](https://support.industry.siemens.com/cs/attachments/22063748/et200m_hart_analog_modules_manual_en-US_en-US.pdf).
- **E3:** [Siemens S7-300 Module Data, 05/2022, A5E00105505-AK](https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf).

- **7TB00 / 7TF01 (analog-input):** Reuse readiness-reviewed official indexed
  text. The reported direct tool fetches returned **403 Forbidden** and yielded
  no PDF reads or parsed text. HART measurement modes and nominal counts remain
  outside approval.
- **5HB01 / 5HD01 / 5HF00 (analog-output):** Reuse readiness-accessible parsed
  Siemens S7-300 Module Data text. Voltage/current output configuration and
  nominal counts remain outside approval.
- Printed page references do not establish viewer indices. Visual inspection and
  successful direct-origin HTTP status for the accessible parsed material were
  **NOT OBSERVED**. There was no fresh retrieval or lifecycle verification for
  this checkpoint. The separate input-reference 403 observations still apply.

Ten distinct `Siemiran` role records bind unchanged production hashes. The UTC
recording observations were linguistic `2026-11-17T19:13:24Z` and technical
`2026-11-17T19:13:41Z`. They record role entries separately from PM review
and the November 19 merge.

The recorded implementation checks preserved the previous 60 complete entries
with their metadata, order and production hashes, and all 65 draft contents,
bindings and provenance. Five MLFB technical segments were authorized, and the
two input and three output bindings and Persian suffixes passed. Each of ten
independent text/kind mutations staled both approvals. Fixed 30/50/55/60
membership boundaries and the Batch 12 checks were preserved. These results come from the implementation checkpoint.

The catalog contains 382 Products (186 S7-1200 / 196 S7-300). There are
65 private drafts, 65 current approvals per role, 65 current dual approvals,
zero pending roles and 317 missing entries. Activation validation remains
invalid at `overlayCount` 65, `approvedCount` 65 and `missingIds.length` 317,
with capability absent. Active overlays remain 0/382, publication is disabled,
and public FA/EN copy stays canonical English/LTR. Complete 382/382 current dual
approvals and separate launch authorization remain required.

Overrides remain 10 Products / 20 assignments / 7 unique strings. The global
allowlist is empty and Batch 13 added zero overrides. The eleven public
lifecycle omissions and separate S7-300 provenance classification (185
Siemens-official verified / 11 explicitly unverified) remain in effect.
Batch 14 remains unapproved and unstarted. Admin Panel and Automation remain
gated, and dedicated completed-Persian-copy website inspection remains pending.

## 2026-11-17 - Batch 12 Private Product-copy Checkpoint (Historical Snapshot)

The 60/322 checkpoint and prospective workflow below describe Batch 12 at its
merge. The current checkpoint is Batch 13.

[PR #81](https://github.com/Siemiran/Siemiran/pull/81),
`feat: add Batch 12 Persian product copy`, merged at `2026-11-17T18:15:39Z`
/ `2026-11-17 21:45:39` Asia/Tehran as
`b62b5fccebf748d09a0164271bb477be23887570`. Guarded squash and main synchronization
completed; exact merge identities and the two-file +479/-10 scope are in
[CHANGELOG.md](CHANGELOG.md#2026-11-17---pr-81-complete-batch-12-private-drafts-and-dual-approvals-historical-snapshot).

All five approved descriptions cover **only exact MLFB identity and analog-input
module type**. They retain `ai-assisted` provenance and identical three-segment
short/single-paragraph long content: Persian model introduction, one typed exact
MLFB, and Persian analog-input module type. Full canonical titles, channel counts,
RTD/thermocouple characteristics, Ex certification/suitability, resolution,
electrical ranges, performance, compatibility, lifecycle and availability are
outside approval. Canonical titles and normalized counts remain unchanged and
do not constitute approval of those claims.

| MLFB | Stable Product ID | Evidence / section / printed pages |
| --- | --- | --- |
| `6ES7331-7PF01-0AB0` | `siemens-s7-300-sm331-ai8-rtd-7pf01-0ab0` | E1 / §6.9.1, pp316–317; §6.9.4, pp325–328 |
| `6ES7331-7PE10-0AB0` | `siemens-s7-300-sm331-ai6-thermocouple-16bit-7pe10-0ab0` | E1 / §6.11, pp342–343 |
| `6ES7331-7PF11-0AB0` | `siemens-s7-300-sm331-ai8-thermocouple-7pf11-0ab0` | E1 / §6.10, pp329–330; §6.10.3, pp339–341 |
| `6ES7331-7RD00-0AB0` | `siemens-s7-300-sm331-ai4-0-4-20ma-ex-7rd00-0ab0` | E2 / product description and Analog inputs / p1/3 |
| `6ES7331-7SF00-0AB0` | `siemens-s7-300-sm331-ai8-tc-ai4-pt100-ex-7sf00-0ab0` | E3 / product description and Analog inputs / p1/3 |

Ten distinct `Siemiran` linguistic/technical role records bind unchanged
production hashes. Actual UTC recording observations were linguistic
`2026-11-17T17:56:09Z` and technical `2026-11-17T17:56:19Z`; these are
recording observations, **not PM review timestamps**.

Recorded implementation checks preserved all previous 55 complete entries,
metadata and hashes, and all 60 draft contents/bindings/provenance. Five MLFB
technical segments remained authorized; ten independent text/kind mutation cases
each staled both approvals. Fixed 30/50/55 membership boundaries remain intact.
These are reused implementation results, not fresh documentation-task audits.

- **E1:** [Siemens S7-300 Module Data, 05/2022, A5E00105505-AK](https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf).
  Evidence reuses readiness-reviewed parsed text for 7PF01, 7PE10 and 7PF11.
- **E2:** [Siemens exact-product datasheet, 7RD00](https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7331-7RD00-0AB0).
  Evidence is readiness-reviewed official indexed exact-product datasheet text.
  Readiness-reported direct tool retrieval returned **403 Forbidden**; this was
  **not a successful PDF read or parsed-PDF access**. Recorded footer string:
  `1/29/2026`.
- **E3:** [Siemens exact-product datasheet, 7SF00](https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES73317SF000AB0).
  Evidence is readiness-accessed parsed exact-product datasheet text. Recorded
  footer string: `11/4/2025`.

All page references are printed pages, distinct from viewer indices. Footer
strings are document observations without date-format interpretation or lifecycle
inference. Visual inspection and successful direct-origin HTTP status for
accessible parsed documents were **NOT OBSERVED**. The separate 7RD00 403
observation remains preserved. No fresh retrieval or lifecycle verification is
performed here.

Qualifications below are separate from the approved Persian prose:

- **7PF01:** four/eight-channel operating modes; no unconditional usable-channel
  count or performance claim is approved.
- **7PE10:** exact identity and analog-input type established; no additional
  characteristic is approved.
- **7PF11:** four/eight-channel modes and compensation-wiring-dependent usable
  channels; no unconditional count or performance claim is approved.
- **7SF00:** eight thermocouple versus four RTD inputs are mode-dependent
  alternatives outside approval.
- **7RD00:** indexed-text evidence supports only the approved identity/type scope;
  no Ex certification/suitability or lifecycle claim is approved.

Batch 12 totals at merge: 382 Products (186 S7-1200 / 196 S7-300); 60/382 private drafts
and current approvals per role; 60 current dual approvals; zero pending roles;
322 missing entries. Overrides remain 10 Products / 20 assignments / 7 unique
strings, global allowlist empty and zero Batch 12 overrides. Eleven lifecycle
omissions and separate S7-300 provenance of 185 Siemens-official verified / 11
explicitly unverified remain unchanged.

Activation validation remains invalid: `overlayCount` 60, `approvedCount` 60,
`missingIds.length` 322, capability absent. Active published overlays remain
0/382; publication is disabled and public FA/EN copy remains canonical English/LTR.
Full 382/382 current dual approvals plus separate launch authorization remain
required. Canonical data, earlier scopes and deferred issues remain unchanged;
durable qualifications are in
[SESSION_HANDOFF.md](SESSION_HANDOFF.md#outstanding-work-and-evidence-limits).
Batch 13 is unapproved and unstarted; Admin Panel and Automation remain gated.
Dedicated completed-Persian-copy website inspection remains pending.

## 2026-11-16 - Batch 11 Private Product-copy Checkpoint (Historical Snapshot)

The dated Batch 11 55/327 checkpoint, evidence and prospective workflow below
are historical, superseded by merged Batch 12 above.

[PR #79](https://github.com/Siemiran/Siemiran/pull/79),
`feat: add Batch 11 Persian product copy`, merged at `2026-11-16T19:10:14Z`
/ `2026-11-16 22:40:14` Asia/Tehran as
`e1755b027ebf1f869e20b2cb05e45b5e76d61350`. Guarded squash and main synchronization
completed; exact merge identities and two-file scope are in
[CHANGELOG.md](CHANGELOG.md#2026-11-16---pr-79-complete-batch-11-private-drafts-and-dual-approvals-historical-snapshot).
All five approved descriptions cover **only exact MLFB identity and analog-input
module type**. They retain `ai-assisted` provenance and identical three-segment
short/single-paragraph long content: Persian model introduction, one typed exact
MLFB, and Persian analog-input module type. No full canonical title, channel count
or operating characteristic is approved.

| MLFB | Official Module Data section / printed pages |
| --- | --- |
| `6ES7331-1KF02-0AB0` | §6.6, pp283 and 287; §6.6.3, p292 |
| `6ES7331-7KF02-0AB0` | §6.7.1, pp293 and 298–299; §6.7.2, pp301–303 |
| `6ES7331-7HF01-0AB0` | §6.5, p274 |
| `6ES7331-7NF00-0AB0` | §6.3, pp255, 259 and 261 |
| `6ES7331-7NF10-0AB0` | §6.4, pp263–264; §6.4.3, pp270–272 |

Ten distinct `Siemiran` linguistic/technical role records bind unchanged
production hashes. Actual UTC recording observations were linguistic
`2026-11-16T18:54:19Z` and technical `2026-11-16T18:54:26Z`; these are
recording observations, **not PM review timestamps**.

Recorded implementation checks preserved all previous 50 complete entries,
metadata and hashes, and all 55 draft contents/bindings/provenance. Five MLFB
technical segments remained authorized; ten independent text/kind mutation cases
each staled both approvals. The 30- and 50-entry membership boundaries remain
intact. These are reused results, not fresh documentation-task approval or hash
audits.

Evidence reuses readiness-reviewed accessible parsed text of
[Siemens S7-300 Module Data, 05/2022, A5E00105505-AK](https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf).
References above are printed pages, not assumed viewer indices. Visual inspection
and direct-origin HTTP status were **NOT OBSERVED**. No fresh retrieval or
lifecycle verification is performed here; no new HTTP 403 result is claimed.

Qualifications below are separate from the approved Persian prose:

- **1KF02:** the exact Universal label was not observed; PTC mode supplies no
  analog values.
- **7KF02:** eight nominal inputs versus four with resistive transducers;
  resolution depends on integration time; Universal was not observed.
- **7NF10:** distinct four- and eight-channel modes; no unconditional eight-channel
  Fast claim.
- **7HF01 and 7NF00:** approval remains identity/type-only despite documented
  additional characteristics.

Approval deliberately excludes full titles, channel counts, Universal, resolution,
speed, isochronous operation, diagnostics, electrical capabilities, compatibility,
lifecycle and availability. Exclusion does not imply that every characteristic
is false or unsupported. Canonical data remains unchanged. Earlier SM327, 7KB02,
1KF01 SDK and 1BP00 qualifications and older deferred issues remain unchanged;
see the historical checkpoints below and
[SESSION_HANDOFF.md](SESSION_HANDOFF.md#outstanding-work-and-evidence-limits).

Current totals: 382 Products (186 S7-1200 / 196 S7-300); 55/382 private drafts
and current approvals per role; 55 current dual approvals; zero pending roles;
327 missing entries. Overrides remain 10 Products / 20 assignments / 7 unique
strings, global allowlist empty and zero Batch 11 overrides. Eleven lifecycle
omissions and the separate 185 Siemens-official verified / 11 explicitly
unverified S7-300 provenance classification remain unchanged.

Activation-validation `overlayCount` is 55; active published overlays remain
0/382. Publication is disabled, capability absent and public FA/EN copy remains
canonical English/LTR. Full 382/382 current dual approvals plus separate launch
authorization remain required. Batch 12 is unapproved and unstarted; Admin Panel
and Automation remain gated. Dedicated completed-Persian-copy website inspection
remains pending.

## 2026-11-16 - Batch 10 Private Product-copy Checkpoint (Historical Snapshot)

The dated Batch 10 50/332 checkpoint, evidence and prospective workflow below
are historical, superseded by merged Batch 11 above.

[PR #77](https://github.com/Siemiran/Siemiran/pull/77),
`feat: add Batch 10 Persian product copy`, merged at `2026-11-16T17:55:14Z`
/ `2026-11-16 21:25:14` Asia/Tehran as
`8b88ef4eac08d7cbb8e49b315d91f5f2b49ebaa9`. Guarded squash and main synchronization
completed; exact merge identities and two-file scope are in
[CHANGELOG.md](CHANGELOG.md#2026-11-16---pr-77-complete-batch-10-private-drafts-and-dual-approvals-historical-snapshot).
Five private `ai-assisted` entries retain identical short and single-paragraph
long typed content, unchanged production bindings and provenance. Approved
technical scope is limited to:

| MLFB | Approved identifier, module type and channel scope | Evidence / section / printed pages |
| --- | --- | --- |
| `6ES7323-1BH01-0AA0` | Complete canonical identifier `SIMATIC S7-300 SM 323 8 DI / 8 DO 24 V DC`; digital input/output module; 8 inputs and 8 outputs | E1 / 3.38 / 190–192 |
| `6ES7323-1BL00-0AA0` | Complete canonical identifier `SIMATIC S7-300 SM 323 16 DI / 16 DO 24 V DC`; digital input/output module; 16 inputs and 16 outputs | E1 / 3.37 / 187–189 |
| `6ES7327-1BH00-0AB0` | Complete canonical identifier `SIMATIC S7-300 SM 327 8 DI / 8 DX 24 V DC`; digital input/output module; 8 fixed digital inputs plus 8 individually configurable input/output channels | E1 / 3.39 / 193–195 |
| `6ES7331-7KB02-0AB0` | Exact MLFB and analog-input module type only; full canonical title, Universal qualifier and input count are outside approval | E1 / 6.8.1 / 305 and 310; 6.8.2 / 313–314 |
| `6ES7331-1KF01-0AB0` | Complete canonical identifier `SIMATIC S7-300 SM 331 8 AI 13 Bit`; analog-input module; 8 analog inputs | E2 / A.3, Table A-4 / 54 |

Ten distinct linguistic/technical records use reviewer `Siemiran` and unchanged
production content hashes. Actual UTC recording observations were linguistic
`2026-11-16T17:32:37Z` and technical `2026-11-16T17:33:11Z`; these are **not PM
review timestamps**. Linguistic approval covers Product-specific Persian wording,
spacing, punctuation and typed Latin/numeric isolation, including SM327's correct
configuration wording and 7KB02's MLFB-only identifier.

Recorded implementation checks preserved the previous 45 complete entries,
metadata and hashes, and all 50 draft contents/bindings/provenance. All 12 Batch 10
technical segments were authorized; ten independent text/kind mutation cases each
staled both approvals. These are reused implementation results, not new
documentation-task approval or hash audits.

- **E1:** [Siemens Module Data, 05/2022, A5E00105505-AK](https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf).
- **E2:** [Siemens Software Development Kit for EC31, 08/2010, A5E01716340-03](https://cache.industry.siemens.com/dl/files/383/46360383/att_84101/v1/s7_mec_sdk_programming_manual_en-US_en-US.pdf).

Evidence reuses readiness-accessed parsed text; references are printed pages,
not assumed PDF viewer indices. Visual inspection and direct-origin HTTP status
were **NOT OBSERVED**. No fresh manufacturer retrieval or lifecycle verification
is performed here; no new HTTP 403 result is claimed.

SM327's configurable channels are individually selectable as input or output;
approval does **not** assert 8 permanently assigned outputs or infer them from
normalized fields. For 7KB02, the manufacturer's exact **Universal** label was
not observed; two inputs is nominal and resistance measurement uses one
measurement channel. Neither its full canonical title nor that nominal count is
approved Persian copy; canonical data remains unchanged. The 1KF01 SDK table
supports the stated identifier/type/count scope and does **not** authorize
compatibility claims. No additional standalone electrical, lifecycle,
availability, compatibility or operating-performance claims are approved.

Current totals: 382 Products (186 S7-1200 / 196 S7-300); 50/382 private drafts
and current approvals per role; 50 current dual approvals; zero pending roles;
332 missing entries. Overrides remain 10 Products / 20 assignments / 7 unique
strings, global allowlist empty and zero Batch 10 overrides. Eleven lifecycle
omissions and the separate 185 Siemens-official verified / 11 explicitly
unverified S7-300 provenance classification remain unchanged.

Activation-validation `overlayCount` is 50; active published overlays remain
0/382. Publication is disabled, capability absent and public FA/EN copy remains
canonical English/LTR. Full 382/382 current dual approvals plus separate launch
authorization remain required. Batch 11 is unapproved and unstarted; Admin Panel
and Automation remain gated. Dedicated completed-Persian-copy website inspection
remains pending. Batch 09's Ex/RC/1CF00 limits, Batch 08's unresolved 1BP00 issue
and earlier 5GH00, 7TH00, 7BH01, 7BH00 and 1FF10 qualifications remain unchanged;
see the historical checkpoints below and durable limits in
[SESSION_HANDOFF.md](SESSION_HANDOFF.md#outstanding-work-and-evidence-limits).

## 2026-11-14 - Batch 09 Private Product-copy Checkpoint (Historical Snapshot)

The dated Batch 09 45/337 checkpoint, evidence and prospective workflow below
are historical, superseded by merged Batch 10 above.

[PR #75](https://github.com/Siemiran/Siemiran/pull/75) merged at
`2026-11-14T18:38:22Z` / `2026-11-14 22:08:22` Asia/Tehran as
`fca25e9134aae5aa9d42d9437cccefe37196eb39`. Guarded squash and main
synchronization completed; merge identities and scope are in
[CHANGELOG.md](CHANGELOG.md#2026-11-14---pr-75-complete-batch-09-private-drafts-and-dual-approvals-historical-snapshot).
Approved `ai-assisted` copy covers complete canonical titles as identifiers,
digital-output module type and output count only:

| MLFB | Complete canonical title | Outputs | Evidence / section / printed pages |
| --- | --- | --- | --- |
| `6ES7322-5RD00-0AB0` | SIMATIC S7-300 SM 322 4 DO 15 V / 20 mA Ex | 4 | E1 / 2.4.1 / 77–78 |
| `6ES7322-5SD00-0AB0` | SIMATIC S7-300 SM 322 4 DO 24 V DC / 10 mA Ex | 4 | E1 / 2.3.1 / 66–69 |
| `6ES7322-8BF00-0AB0` | SIMATIC S7-300 SM 322 8 DO 24 V DC Diagnostics | 8 | E2 / 3.29 / 151 |
| `6ES7322-1CF00-0AA0` | SIMATIC S7-300 SM 322 8 DO 48/125 V DC | 8 | E2 / 3.30 / 158–159 |
| `6ES7322-5HF00-0AB0` | SIMATIC S7-300 SM 322 8 DO Relay 230 V AC 5 A RC | 8 | E2 / 3.35 / 176 and 180 |

Ten distinct linguistic/technical records use reviewer `Siemiran` and unchanged
production content hashes. Actual UTC recording observations were linguistic
`2026-11-14T18:23:04Z` and technical `2026-11-14T18:23:11Z`; these are **not PM
review timestamps**. Recorded implementation checks preserved the previous 40
complete entries, metadata and hashes; ten independent text/kind mutation cases
each staled both approvals. These results are reused, not new documentation-task
approval or hash audits.

- **E1:** [Siemens S7-300, ET 200M Ex I/O Modules, 04/2022, A5E00172008-AP](https://cache.industry.siemens.com/dl/files/709/1096709/att_885614/v2/s7300_et200m_ex_io_modules_manual_en_en-US.pdf?download=true).
- **E2:** [Siemens S7-300 Module Data, 05/2022, A5E00105505-AK](https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf).

Evidence was parsed text accessed during readiness and reused for approvals.
References above are printed pages, not assumed PDF viewer indices. Visual
inspection and direct-origin HTTP status were **NOT OBSERVED**. This task
performs no fresh manufacturer retrieval or lifecycle verification and makes no
new HTTP 403 observation.

Ex remains within supported complete identifiers, with no independent
installation, certification or hazardous-area suitability claim. Diagnostics adds
no independent performance claim. For 1CF00, the manual describes a **48–125 V DC
range**; the exact canonical title retains **48/125 V DC** as an identifier, with
no canonical correction or standalone voltage assertion. For 5HF00, **RC
protection requires a jumper**; approval adds no unconditional RC protection
claim. No standalone electrical, lifecycle, availability or compatibility claims
are approved. Batch 08's [1BP00 sink/sourcing discrepancy](#2026-11-13---batch-08-private-product-copy-checkpoint-historical-snapshot)
remains unresolved and unverified. Existing 5GH00, 7TH00, 7BH01, 7BH00 and 1FF10
qualifications remain unchanged; durable limits are in
[SESSION_HANDOFF.md](SESSION_HANDOFF.md#outstanding-work-and-evidence-limits).

Current totals: 382 Products (186 S7-1200 / 196 S7-300); 45/382 private drafts
and current approvals per role; 45 current dual approvals; zero pending roles;
337 missing entries. Overrides remain 10 Products / 20 assignments / 7 unique
strings, global allowlist empty and zero Batch 09 overrides. Exactly eleven
lifecycle omissions and the separate 185 Siemens-official verified / 11 explicitly
unverified S7-300 provenance classification remain unchanged.

Activation-validation `overlayCount` is 45; active published overlays remain
0/382. Publication is disabled, capability absent and public FA/EN copy remains
canonical English/LTR. Full 382/382 current dual approvals plus separate launch
authorization remain required. Batch 10 is unapproved and unstarted; Admin Panel
and Automation remain gated. Dedicated completed-Persian-copy website inspection
remains pending; a preview or unreported observation is not inspection PASS.

## 2026-11-13 - Batch 08 Private Product-copy Checkpoint (Historical Snapshot)

The dated Batch 08 40/342 checkpoint, evidence and prospective workflow below
are historical, superseded by merged Batch 09 above.

[PR #73](https://github.com/Siemiran/Siemiran/pull/73) merged at
`2026-11-13T17:31:44Z` / `2026-11-13 21:01:44` Asia/Tehran. Its guarded
squash and main synchronization completed; full merge identity and scope are in
[CHANGELOG.md](CHANGELOG.md). Approved `ai-assisted` copy covers complete
canonical titles as identifiers, digital-output module type and these counts only:

| MLFB | Direction | Outputs | Previously reviewed Module Data section / printed pages |
| --- | --- | --- | --- |
| `6ES7322-5FF00-0AB0` | DO | 8 | 3.32 / 164–165 |
| `6ES7322-1FL00-0AA0` | DO | 32 | 3.22 / 122–124 |
| `6ES7322-1BP00-0AA0` | DO | 64 | 3.19 / 106–108 |
| `6ES7322-1BP50-0AA0` | DO | 64 | 3.20 / 112–115 |
| `6ES7322-8BH10-0AB0` | DO | 16 | 3.24 / 129 |

Ten distinct linguistic/technical approval records use reviewer `Siemiran` and
unchanged production content hashes. Actual UTC recording-time observations were
linguistic `2026-11-13T17:07:03Z` and technical `2026-11-13T17:07:54Z`;
these are **not claimed PM review timestamps**. Recorded machine comparison
preserved the previous 35 complete entries, metadata and hashes. Ten independent
text/kind mutation cases each staled both approvals.

Evidence reuses parsed text of
[Siemens Module Data, 05/2022, A5E00105505-AK](https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf).
Visual PDF inspection was **NOT OBSERVED**; no fresh retrieval or lifecycle
verification is claimed. No standalone voltage/current, operating-feature,
lifecycle, availability or compatibility claims are approved. `Sinking` remains
within 1BP50's supported complete title only.

**Unresolved 1BP00 discrepancy:** `6ES7322-1BP00-0AA0`'s canonical English
description says “sink,” while the reviewed Siemens manual says “sourcing.”
The approved Persian copy asserts neither. The disputed field is **not verified**
and requires a separately scoped canonical-data review; no correction is made here.
Existing qualifications, including 5GH00 evidence/access limits and the deferred
issues below, remain unchanged.

Current totals: 382 Products (186 S7-1200 / 196 S7-300); 40/382 private drafts
and current approvals per role; 40 current dual approvals; zero pending roles;
342 missing entries. Overrides remain 10 Products / 20 assignments / 7 unique
strings, global allowlist empty and zero Batch 08 overrides. Exactly eleven
lifecycle omissions and the separate 185 Siemens-official verified / 11 explicitly
unverified S7-300 provenance classification remain unchanged.

Publication is disabled, capability absent and active overlays zero; public FA/EN
copy remains canonical English/LTR. Full 382/382 current dual approvals plus
separate launch authorization remain required. Batch 09 is unapproved and
unstarted; Admin Panel/Automation remain gated and completed-copy inspection
remains pending. Durable checks are in [SESSION_HANDOFF.md](SESSION_HANDOFF.md).

## 2026-11-13 - Batch 07 Private Product-copy Checkpoint (Historical Snapshot)

The former Batch 07 35/347 checkpoint, review evidence and next-step statements
below are historical, superseded by Batch 08 above.

[PR #71](https://github.com/Siemiran/Siemiran/pull/71) merged at
`2026-11-13T16:06:26Z` / `2026-11-13 19:36:26` Tehran; main synchronization
completed. Full merge identity is in [CHANGELOG.md](CHANGELOG.md).
The five private, `ai-assisted` entries approve complete canonical model
identifiers, digital-output module type and only the following counts:

| MLFB | Direction | Channels | Previously reviewed Module Data section / printed pages |
| --- | --- | --- | --- |
| `6ES7322-1FH00-0AA0` | DO | 16 | 3.27 / 145–146 |
| `6ES7322-5GH00-0AB0` | DO | 16 | 3.26 / 140–142 |
| `6ES7322-1HF01-0AA0` | DO | 8 | 3.34 / 172–173 |
| `6ES7322-1HF10-0AA0` | DO | 8 | 3.36 / 182–185 |
| `6ES7322-1HH01-0AA0` | DO | 16 | 3.33 / 169–171 |

Reviewer `Siemiran` recorded distinct linguistic approvals at
`2026-11-13T15:45:00Z` and technical approvals at `2026-11-13T15:45:06Z`,
bound to unchanged production hashes. Evidence is previously reviewed
[Siemens Module Data, 05/2022, A5E00105505-AK](https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf).
For 5GH00 the manual designation is **UC 24/48 V**; official indexed
exact-product datasheet text supports the canonical identifier. Direct PDF
retrieval returned **HTTP 403**; visual inspection is **NOT OBSERVED**.
Titles remain identifiers. No standalone voltage/current or relay-performance
claims are approved. No fresh manufacturer retrieval or lifecycle verification
is performed for this documentation task; prior deferred technical issues below
remain unchanged.

Catalog remains 382 Products (186 S7-1200 / 196 S7-300). Private drafts and
current approvals per role are 35/382, with 35 current dual approvals, zero
pending roles and 347 missing entries. Recorded machine comparison preserved
the previous 30 complete entries, metadata and hashes. Overrides remain
10 Products / 20 assignments / 7 unique strings; Batch 07 adds zero and the
global allowlist is empty. Eleven lifecycle omissions and the separate
185 Siemens-official verified / 11 explicitly unverified S7-300 classification
are unchanged.

Publication remains disabled, activation capability absent and active overlays
zero; public FA/EN Product copy remains canonical English/LTR. Full 382/382
current dual approvals and separate launch authorization remain required.
Batch 08 readiness/scope is unapproved and unstarted. Admin Panel and Automation
remain gated; dedicated completed-Persian-copy inspection remains pending.
Resume checks are in [SESSION_HANDOFF.md](SESSION_HANDOFF.md).

## 2026-11-13 - Batch 06 Private Product-copy Checkpoint (Historical Snapshot)

The dated counts, review evidence and next-step statements below describe the
former Batch 06 checkpoint, superseded by Batch 07 above.

[PR #69](https://github.com/Siemiran/Siemiran/pull/69) merged Batch 06 at
`2026-11-13T10:42:08Z` / `2026-11-13 14:12:08` Tehran. Merge identity,
review timestamps and reused validation are recorded in [CHANGELOG.md](CHANGELOG.md).
The five private, `ai-assisted` entries cover only full model identifiers,
digital-input/output module type and these canonical channel counts:

| MLFB | Direction | Channels |
| --- | --- | --- |
| `6ES7321-7RD00-0AB0` | DI | 4 |
| `6ES7322-1BF01-0AA0` | DO | 8 |
| `6ES7322-1BH01-0AA0` | DO | 16 |
| `6ES7322-1BH10-0AA0` | DO | 16 |
| `6ES7322-1BL00-0AA0` | DO | 32 |

7RD00's 24 V concerns electronic load supply, not verified `inputVoltage`
semantics; copy approval does not approve Ex application claims. High Speed is
part of the 1BH10 model identifier. Existing deferred issues and evidence
qualifications below are preserved without fresh manufacturer retrieval,
visual inspection or lifecycle verification.

Canonical coverage remains 382 Products (186 S7-1200 / 196 S7-300). Private
drafts and current approvals per role are 30/382, with 30 current dual approvals,
zero pending roles and 352 missing entries. The previous 25 complete entries,
metadata and hashes are preserved by recorded machine comparison. Overrides
remain 10 Products / 20 assignments / 7 unique strings, the global allowlist
is empty and Batch 06 adds zero overrides. Eleven lifecycle omissions and the
185 Siemens-official verified / 11 explicitly unverified S7-300 classification
remain unchanged and separate from copy coverage.

Publication is disabled, activation capability absent and active overlays zero;
public FA/EN Product copy remains canonical English/LTR. Activation requires
382/382 current dual approvals and separate launch authorization. Batch 07
readiness/scope remains unapproved and unstarted; the completed-copy inspection
remains pending. Resume limits are in [SESSION_HANDOFF.md](SESSION_HANDOFF.md).

## 2026-10-02 - Batch 05 Private Product-copy Checkpoint (Historical Snapshot)

The dated coverage and prospective workflow below describe the former Batch 05
checkpoint, superseded by Batch 06 above; technical qualifications remain applicable.

[PR #67](https://github.com/Siemiran/Siemiran/pull/67),
`feat: add Batch 05 Persian product copy`, squash-merged at
`2026-10-02T09:46:57Z` (Tehran `2026-10-02 13:16:57`) as
`04a302c9b587954131289e8624a1f90344b9ffdd`, with sole parent
`3becc93356a3e46780f7f36f947b184c234cc376`. Local main synchronization is
complete. Reviewed head `a3270bb3ef856cff15d54679a65073d5b676f0d2` remains
on `feat/fa-product-copy-batch-05`; reviewed and squash trees are identical at
`199d0286dbb0b80123c4f4b51a7d5b1c9ddaf9ce`. Implementation scope was exactly
the copy registry and verification harness: two modified files, 602 insertions
and 9 deletions, with no canonical Product/source data change.

Batch 05 adds private `ai-assisted` drafts for exactly `6ES7321-7BH01-0AB0`,
`6ES7321-7EH00-0AB0`, `6ES7321-7TH00-0AB0`, `6ES7321-1BH50-0AA0`, and
`6ES7321-7BH00-0AB0`. Approved copy covers complete canonical titles used as
identifiers, digital-input module type, and sixteen inputs. Each Product has
separate linguistic and technical approvals bound to its unchanged production
content hash. Reviewer `Siemiran` recorded linguistic approvals at
`2026-10-01T17:45:15Z` and technical approvals at `2026-10-01T17:45:26Z`.
All prior twenty entries, metadata, and approval hashes remain unchanged.

Canonical coverage remains 382 Products: 186 S7-1200 and 196 S7-300. Current
private copy coverage is 25/382 drafts, 25/382 linguistic approvals, 25/382
technical approvals, and 25 current dual approvals, with zero pending roles and
357 Products missing private entries. Product-specific overrides remain
10 Products / 20 assignments / 7 unique strings; Batches 03–05 added zero,
and the global allowlist remains empty. The exact eleven public lifecycle
omissions and recorded S7-300 185 Siemens-official verified / 11 explicit
unverified provenance classification remain unchanged and separate from copy
coverage.

7TH00 `inputVoltage` semantics remain unresolved and unverified; its complete
title is an identifier and copy approval adds no standalone voltage assertion.
7BH01 HF operation remains conditional. 7BH00's CPU410 source-link
reconciliation remains a separate data task; copy evidence uses its exact PCS 7
row, distinct from 7BH01. Previously reviewed parsed cache-PDF text was
successfully read; visual verification was unavailable. Recorded historical
HTTP 403 responses remain distinct from the later 7BH01 support-hosted
`Internal Error` without an exposed HTTP status. No fresh manufacturer
retrieval or lifecycle verification is claimed.

Active overlays remain 0/382, activation capability is absent, publication is
disabled, and public FA/EN Product copy remains canonical English/LTR.
Activation requires all 382/382 current dual approvals and separate launch
authorization. The new `docs/reconcile-fifth-persian-product-copy-batch` branch
is unmerged; independent documentation review, push/PR, and guarded merge
remain pending. Batch 06 scope/readiness work is unapproved and unstarted.
The maintainer website inspection and existing preview constraints remain
pending; see [SESSION_HANDOFF.md](SESSION_HANDOFF.md).

## 2026-09-28 - Batch 04 Private Product-copy Checkpoint (Historical Snapshot)

PR #65, `feat: add Batch 04 Persian product copy`, merged at
`2026-09-28T18:03:45Z` as `84d4fe14e82e7a922509a5ca8899cd50f1d3167d`.
It added private drafts and current hash-bound linguistic and technical approvals
for exactly `6ES7321-1CH00-0AA0`, `6ES7321-1EL00-0AA0`,
`6ES7321-1FF01-0AA0`, `6ES7321-1FF10-0AA0`, and `6ES7321-1FH00-0AA0`.
Canonical Product/source data remains unchanged: 382 Products, S7-300 196/196,
and S7-1200 186/186. At this checkpoint the registry had 20/382 drafts, 20/382
linguistic approvals, 20/382 technical approvals, and 20 current dual approvals; 362
Products lack complete Persian-copy coverage. This coverage count is separate
from the eleven canonical lifecycle omissions.

Batch 04 added zero overrides; Product-specific technical-token overrides remain
10 Products / 20 assignments / 7 unique strings, with an empty global allowlist.
Review used Siemens-indexed exact-product datasheet text and available Siemens
product HTML, with direct PDF access returning HTTP 403 during review; no fresh
direct PDF access is claimed. The copy approval does not establish 1FF10's
factual current lifecycle. Active overlays remain 0/382, activation capability
is absent, publication is disabled, and public FA/EN Product copy remains
canonical English/LTR. Activation requires all 382/382 current dual approvals
and separate authorization. This dated 20/362 copy checkpoint is historical
and superseded by the merged Batch 05 current state above.

## 2026-09-27 - SM321 1FF10 Lifecycle Uncertainty (Current State)

The maintainer approved recording source lifecycle for
`6ES7321-1FF10-0AA0` as `unverified`; its factual current exact-product lifecycle
remains **UNKNOWN**. PR #64 merged at `2026-09-27T18:29:17Z` as
`00af171572c427dba986340e7efd36f8ca0ad1d7`, and independent verification of
the uncertainty handling returned **PASS**. Previously recorded historical
exact-product [Siemens Mall evidence](https://mall.industry.siemens.com/mall/en/se/Catalog/Product/6ES7321-1FF10-0AA0)
supports phase-out at that time, but does not establish the current
exact-product lifecycle or an individual transition date. The S7-300 family's
planned cancellation does not resolve that gap. This is an explicit unresolved
provenance state, not a newly verified lifecycle category.

The source record remains exposed as the same canonical Product, with
`Product.lifecycle` intentionally omitted. Its legacy label and badge therefore
disappear in both languages; comparison uses its existing missing-value display.
No public `unverified` label is introduced. S7-300 lifecycle provenance is now
185 Siemens-official verified / 11 explicit unverified across the same 196/196
connected Products. The full 382/382 Product-copy activation gate and separate
authorization requirement are unchanged. The policy/representation blocker was
resolved; prior pending-review and Batch 04 drafting-blocker statements are
historical and superseded by PR #64 verification and the completed private
Batch 04. They do not imply that current lifecycle became verified. The
maintainer website inspection remains pending after Persian Product-copy
completion, with its scope and preview constraint in
[SESSION_HANDOFF.md](SESSION_HANDOFF.md).

## 2026-09-25 - S7-300 SM321 Lifecycle Provenance Review (Historical Snapshot)

For `6ES7321-1CH00-0AA0`, source `lifecycle` is corrected from `phase-out`
to `spare-part`. Reviewed indexed content for the [exact-product Siemens
datasheet](https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1CH00-0AA0)
identifies this MLFB as a spare part. The document is dated 2026-02-09;
that is a document date, not a lifecycle effective date. The earlier report
records 2026-09-25 as its evidence-review date and reports HTTP 403 on direct
PDF retrieval that day; no separate retrieval audit record was located for
that response. The subsequent independent review on 2026-09-26 reproduced
HTTP 403 on direct PDF retrieval. The retained [Siemens Mall
product link](https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/6ES7321-1CH00-0AA0)
provides historical PM400 phase-out evidence, not the newer lifecycle evidence.
No current PM code or individual transition date was established.
The supported source lifecycle remains `spare-part`, canonical
`Product.lifecycle` remains `legacy`, and the Mall product URL remains the
public source link.

At this checkpoint, `6ES7321-1FF10-0AA0` remained provisionally `phase-out`.
Its [historical
exact-product Siemens Mall evidence](https://mall.industry.siemens.com/mall/en/se/Catalog/Product/6ES7321-1FF10-0AA0)
supports phase-out, but its current exact-product lifecycle is unverified.
The S7-300 family's planned cancellation does not establish this product's
individual transition. Batch 04 drafting was blocked pending sufficient
evidence or a separately authorized uncertainty-handling decision. This
provisional representation and drafting blocker are historical and superseded
by the maintainer-approved PR #64 uncertainty handling, its independent
verification, and PR #65's private Batch 04 completion. Its factual current
lifecycle remains UNKNOWN, as documented above.

## 2026-09-08 - Task BD: S7-300 Formal Closure (Historical Snapshot)

Task BD independently verified `main` at
`c3378ebdc2a4858b468a99ee49282fea95aeab89`, returned **PASS**, and formally
closed Siemens S7-300 under the current Siemens-only provenance policy.

- S7-300 inventory and Product coverage: 196/196; S7-1200: 186/186; global
  Product: 382; FM: 31/31.
- All six S7-300 source groups are connected and map one-to-one into Product;
  duplicate Product IDs, slugs, and part numbers are all 0.
- Lifecycle provenance: 186 Siemens-official verified, 10 explicit unverified,
  0 noncompliant, and 0 unknown.
- All ten unverified records remain exposed as Products with public lifecycle
  intentionally omitted.
- Source domains: 196 Siemens-controlled URLs and 0 non-Siemens URLs.
- Lifecycle provenance debt remains exactly 10 explicit known gaps after
  closure; closure does not mean all 196 lifecycle values are verified.

## 2026-09-07 - Task BC: S7-300 Provenance Remediation (Historical Snapshot)

Task BB classified the completed S7-300 Product inventory as **PASS WITH
REMEDIATION REQUIRED**. Task BC changes exactly four source lifecycle values
from `discontinued` to `unverified`: Interface Modules
`6ES7365-0BA81-0AA0` and `6ES7178-4BH00-0AE0`, plus Communication Processors
`6GK7343-1FX00-0XE0` and `6FL4343-1CX10-0XE0`.

Their Siemens-controlled URLs remain identity/specification sources, not
lifecycle evidence. All four Products remain exposed with public lifecycle
omitted through the unchanged generic Siemens mapper. No third-party evidence
is used.

- S7-300 inventory and Product coverage: 196/196.
- FM: 31/31; S7-1200: 186/186; global Product: 382.
- Lifecycle provenance: 186 Siemens-official verified, 10 explicit unverified,
  0 noncompliant, and 0 unknown.
- Lifecycle provenance debt: 10 explicit known gaps.

Formal closure remains deferred to the separate read-only Task BD verification.

## 2026-09-07 - Task BA: Explicit Unverified Lifecycle and Full FM Exposure (Historical Snapshot)

Task AZ exhausted reasonable Siemens-only historical lifecycle research and
resolved 0/6 exact lifecycle debts. Third-party evidence remains prohibited
and was not used. The Siemens source contract and validator now require and
accept an explicit `unverified` provenance state. The generic Siemens mapper
omits public `Product.lifecycle` for that state; the public Product contract
and UI are unchanged.

The lifecycle field is now `unverified` for exactly:

- `6AG1350-1AH03-2AE0`
- `6AT1735-0AA01-0AA0`
- `6ES7356-4BN00-0AE0`
- `6ES7356-4BM00-0AE0`
- `6ES7357-4AH03-0AE0`
- `7MH4421-1AA01`

Their existing Siemens-controlled source URLs remain identity/specification
evidence and are not represented as lifecycle evidence. Because all 31 FM
identities are verified, the six-entry exposure gate is removed and all 31
records map directly into Product.

- FM source and exposed: 31/31; identity debt: 0.
- Product collection: 376 to 382.
- S7-300 Product coverage: 190/196 to 196/196, complete.
- S7-1200: 186/186, unchanged.
- Lifecycle provenance debt: 6; not fully verified.

Next work is the separate **STRICT S7-300 CLOSURE / PROVENANCE AUDIT**. It must
include the six unverified FM lifecycles, deferred IM/CP Siemens-only
provenance, the 196-record denominator, Product coverage reconciliation, and
source-domain compliance. It is not part of Task BA.

## 2026-09-04 - Task AY: FM354 AH02 Inventory Correction (Historical Snapshot)

The project owner approved removal of unsupported FM354 AH02
`6ES7354-1AH02-0AE0` (ID
`siemens-s7-300-fm354-servo-positioning-1ah02-0ae0`) from the FM source and
exposure gate. Prior Siemens-only verification did not establish this exact
identity. No new external research or third-party evidence was used. Valid
FM354 AH01 `6ES7354-1AH01-0AE0` remains unchanged; no replacement or
placeholder was fabricated.

- FM source: 32 to 31; blocked: 7 to 6; exposed: 25 to 25 (now 25/31).
- Product collection: 376 to 376; S7-300: 190/197 to 190/196.
- Current S7-300 total: 196; connected: 190; remaining: 6; not complete.
- S7-1200 remains 186/186.
- Identity debt: 1 to 0; lifecycle debt: 7 to 6.
- Lifecycle values for all six remaining gated records are unchanged.

The current exposure gate contains exactly:

- `6AG1350-1AH03-2AE0`
- `6AT1735-0AA01-0AA0`
- `6ES7356-4BN00-0AE0`
- `6ES7356-4BM00-0AE0`
- `6ES7357-4AH03-0AE0`
- `7MH4421-1AA01`

Next work remains **S7-300 FINAL 6 FM LIFECYCLE COMPLETION -
SIEMENS-OFFICIAL-ONLY**, after this correction is merged. Strict S7-300 closure
audit has NOT started; closure requires 196/196. IM/CP audit, localization,
and new Siemens series work have not started.

This was the authoritative Task AY inventory snapshot. Earlier task entries below
preserve their historical counts and AH02 references; those references describe
the inventory before this approved deletion, not a valid current record.

## Canonical Hierarchy

```text
Brand
→ Category
→ Family
→ Series
→ Product Type
→ Product / Variant
```

The canonical UI-facing interface is
`apps/web/src/features/products/types/product.types.ts`.

The Product aggregation is
`apps/web/src/features/products/data/products.ts`.

Product reads are exposed through
`apps/web/src/features/products/repository/product.repository.ts`.

## Current Active Dataset

The application currently aggregates 382 Products:

- 36 mapped S7-300 CPU Products
- 13 mapped S7-300 Power Supply Products
- 66 mapped S7-300 Signal Module Products
- 7 mapped S7-300 Interface Module Products
- 43 mapped S7-300 Communication Processor Products
- 31 mapped S7-300 Function Module Products
- 3 mapped S7-1200 Classic Power Module Products
- 2 mapped S7-1200 G2 Power Module Products
- 10 mapped S7-1200 G2 CPU Products
- 50 mapped S7-1200 Classic CPU Products
- 9 mapped S7-1200 G2 Signal Module Products
- 9 mapped S7-1200 G2 Signal Board Products
- 38 mapped S7-1200 Classic Signal Module Products
- 23 mapped S7-1200 Classic Signal Board Products
- 17 mapped S7-1200 Communication Module Products
- 7 mapped S7-1200 Communication Processor Products
- 3 mapped S7-1200 Communication Board Products
- 8 mapped S7-1200 Special Module Products
- 3 mapped S7-1200 Technology Module Products
- 3 mapped S7-1200 Network Switch Products
- 1 mapped S7-1200 Data Decoupling Module Product

Only records included by `data/products.ts` reach the Product repository and UI.
The presence of a manufacturer source file does not make its records active
application data.

## Siemens Database Layout

Manufacturer source data is under:

`apps/web/src/features/products/database/siemens/`

The current shared Siemens files are:

- `plc.ts`: defines the neutral Siemens PLC source identity, taxonomy, and
  lifecycle boundary and exports the records currently connected to the
  pipeline
- `plc.validator.ts`: validates connected records against that shared
  structural boundary
- `plc.adapter.ts`: maps common validated fields into `Product` and requires an
  explicit product-type specification normalizer
- `verified-taxonomy.ts`: verified Siemens taxonomy contract used by validation

## S7-300 Source Data

| Source class | Records | Connection status |
| --- | ---: | --- |
| CPU | 36 | CONNECTED |
| Power Supply (PS) | 13 | CONNECTED |
| Signal Module (SM) | 66 | CONNECTED |
| Interface Module (IM) | 7 | CONNECTED |
| Communication Processor (CP) | 43 | CONNECTED |
| Function Module (FM) | 31 | CONNECTED |
| **Total** | **196** | **196/196 CONNECTED** |

All six S7-300 source groups flow through the shared Siemens validator and
generic Product mapper with explicit product-type specification normalizers.
Every source record maps to exactly one Product; no current exposure gate
remains. CPU contributes 36 Products, PS 13, SM 66, IM 7, CP 43, and FM 31.

The current lifecycle provenance matrix is 185 Siemens-official verified and 11
explicit unverified, with 0 noncompliant secondary-history claims and 0
unclassified provenance records (the matrix's `unknown` bucket). This classification
does not verify the factual current lifecycle of 1FF10, which remains UNKNOWN.
The eleven known gaps remain exposed without a public lifecycle value. Historical
source and integration milestones are preserved in the dated task sections
below and do not define the current connection state.

## S7-1200 Source Data

| Source module | Records | Connection status |
| --- | ---: | --- |
| CPU | 60 | CONNECTED (50 Classic, 10 G2) |
| Power Module (PM) | 5 | CONNECTED (3 Classic, 2 G2) |
| Signal Module (SM) | 47 | CONNECTED (38 Classic, 9 G2) |
| Signal Board (SB) | 32 | CONNECTED (23 Classic, 9 G2) |
| Communication Module (CM) | 16 | CONNECTED |
| Communication Processor (CP) | 7 | CONNECTED |
| Communication Board (CB) | 3 | CONNECTED |
| Special/technology modules | 11 | CONNECTED (8 Special Module, 3 Technology Module) |
| Other/companion modules | 5 | CONNECTED (1 Communication Module, 3 Network Switch, 1 Data Decoupling Module) |
| **Total** | **186** | **186 CONNECTED; 0 DISCONNECTED** |

The current S7-1200 source files contain 186 unique MLFB declarations. No source
records were added or removed during structural G2 reclassification. Generation
is represented by `seriesId`: 28 existing CPU/SB/SM records are classified as
`S7-1200 G2` (10 CPU, 9 Signal Board, and 9 Signal Module), in addition to the
2 SIMATIC G2 Power Module records that were already classified. The 5 PM records
comprise 1 Classic SIMATIC PM 1207, 2 G2 SIMATIC PM 1207 records, and 2 Classic
SIPLUS PM 1207 records.

The 30 G2 records are physically separated under `s7-1200/g2/`: 10 CPU, 9
Signal Board, 9 Signal Module, and 2 Power Module records. The corresponding
root Classic files contain 50 CPU, 23 Signal Board, 38 Signal Module, and 3
Power Module records. Combined source-module totals remain unchanged.

The 3 Classic and 2 G2 Power Module records are connected through one explicit
PM specification normalizer that supports both structurally compatible source
contracts. Their source arrays and files remain separate, and `seriesId`
preserves the Classic/G2 generation distinction. Classic `baseMlfb` lineage
metadata remains source-only.

The 10 G2 CPU records are connected through an explicit S7-1200 CPU
specification normalizer: 6 compact and 4 fail-safe Products. Their generation
is preserved by `seriesId = S7-1200 G2`.

The 50 Classic CPU source records are connected with 41 `compact` and 9
`fail-safe` functional variants and validate 50/50 against the verified
taxonomy. SIPLUS environmental edition remains represented by source MLFB,
title, and description evidence rather than `variantId`.

The former manual `6ES7214-1AG40-0XB0` Product no longer exists. Its canonical
source-backed record supplies Product identity and content, while a permanent
redirect maps the old manual slug to `6es7214-1ag40-0xb0`. The S7-1200 source
state includes 50 Classic CPUs, 10 G2 CPUs, and 5 Power Modules.

The 9 G2 and 38 Classic Signal Module records are connected through the same
explicit S7-1200 Signal Module specification normalizer. G2 variants comprise
2 digital-output, 2 digital-io, 3 analog-input, 1 analog-output, and 1 analog-io.

The 38 Classic Signal Module records are NORMALIZED, taxonomy-valid 38/38, and
CONNECTED. Their functional variants are: `digital-input` 4,
`digital-output` 11, `digital-io` 11, `fail-safe-input` 1,
`fail-safe-output` 2, `analog-input` 5, `analog-output` 2, and `analog-io` 2.
Source lifecycle is 37 active and 1 spare-part, mapped to 37 active and 1 legacy
Products.

The 32 Signal Board source records comprise 9 G2 and 23 Classic records. All are
connected through the unchanged shared S7-1200 Signal Board specification
normalizer. Each G2 variant has one record:
`sb1221-di8-24vdc`, `sb1222-dq8-24vdc`, `sb1223-di4-dq4-24vdc`,
`sb1223-di4-dq4-5vdc`, `sb1231-ai4`, `sb1231-rtd-ai2`, `sb1231-tc-ai4`,
`sb1232-ao4`, and `sb1233-ai2-ao2`.

The 23 Classic Signal Board records are NORMALIZED, taxonomy-valid 23/23, and
CONNECTED. Their model-specific variants are:
`sb1221-di4-24vdc` 2, `sb1221-di4-5vdc` 2, `sb1222-dq4-24vdc` 2,
`sb1222-dq4-5vdc` 2, `sb1223-di2-do2-standard` 4,
`sb1223-di2-do2-24vdc` 2, `sb1223-di2-do2-5vdc` 2, `sb1231-ai1` 1,
`sb1231-rtd` 2, `sb1231-thermocouple` 1, and `sb1232-ao1` 3. All 23
records map to 23 active Products.

For both Classic datasets, SIPLUS environmental edition remains represented by
MLFB, title, description, and other source evidence rather than functional or
model variant taxonomy. Their shared adapters are unchanged.

S7-1200 current verified source integration is 186/186 connected, with 0
disconnected, and the Product collection total is 382. CPU, Power Module, Signal
Board, Communication Module, Communication Processor, and Communication Board
are fully connected across Classic and G2; Special Module and Technology Module
are also connected, as are Network Switch and Data Decoupling Module.

Communication Module is CONNECTED with 17 active Products: 16 records from
`cm.ts` plus RF120C from `other.ts`. Their variant distribution is:

- `cm1241-rs232`: 4
- `cm1241-rs422-485`: 4
- `cm1242-5`: 3
- `cm1243-2`: 2
- `cm1243-5`: 3
- `rf120c`: 1

Communication Processor is CONNECTED with 7 Products through the unchanged
communication adapter. Its variant distribution is:

- `telecontrol-gprs`: 1
- `industrial-ethernet-telecontrol`: 3
- `lte-eu`: 1
- `lte-us`: 1
- `telecontrol-irc`: 1

Source lifecycle is 6 active and 1 spare-part; mapped Product lifecycle for
these seven is 6 active and 1 legacy. The spare-part CP 1242-7 V2
(`6GK7242-7KX31-0XE0`) is preserved and connected rather than filtered.

Communication Board is CONNECTED with 3 active Products through the unchanged
communication adapter. Lifecycle for these three is 3 active, 0 legacy, and 0
discontinued. All use variant `cb1241-rs485`. Their MLFBs are:

- `6ES7241-1CH30-1XB0`
- `6AG1241-1CH30-5XB1`
- `6AG2241-1CH30-1XB0`

All Communication Module, Communication Processor, and Communication Board
records are now connected: 27/27 communication records.

Special Module is CONNECTED with exactly 8 Products selected from the shared
11-record source array. Variant distribution is:

- `io-link-master`: 3
- `condition-monitoring`: 1
- `simulator-1211-1212`: 1
- `simulator-1214-1215`: 1
- `simulator-1217`: 1
- `battery-board`: 1

Source lifecycle for these eight is 7 active and 1 phase-out; mapped Product
lifecycle is 7 active and 1 legacy. The phase-out SM 1278
(`6ES7278-4BD32-0XB0`) remains connected as a legacy Product. Technology Module
is CONNECTED with all 3 SIWAREX Products:

- WP231 — `7MH4960-2AA01`, variant `weighing-wp231`
- WP241 — `7MH4960-4AA01`, variant `weighing-wp241`
- WP251 — `7MH4960-6AA01`, variant `weighing-wp251`

All three Technology Module Products are active. The shared Special/Technology
source array is fully connected: 8 Special Module plus 3 Technology Module,
or 11/11 records.

Network Switch is CONNECTED with 3 active CSM 1277 Products through the unchanged
dedicated Network Switch adapter. All use variant `csm1277`. Their MLFBs are:

- `6GK7277-1AA10-0AA0`
- `6AG1277-1AA10-2AA0`
- `6AG1277-1AA10-4AA0`

Data Decoupling Module is CONNECTED with DCM 1271, MLFB
`3RK7271-1AA30-0AA0`, variant `dcm1271`, and lifecycle active.

Mixed `other.ts` exposure is complete at 5/5: RF120C Communication Module 1,
Network Switch 3, and Data Decoupling Module 1 connected.

All current S7-1200 source buckets represented in repository aggregation are
connected. This 186/186 statement is scoped to the verified repository dataset.

`Other Module` is no longer used as a source classification. The mixed physical
`other.ts` file remains unchanged: RF120C is connected through the guarded
communication adapter and three CSM 1277 records through the dedicated Network
Switch adapter, while DCM 1271 is connected through the dedicated Data
Decoupling adapter.

Connector values for `6AG1241-1CH32-4XB0` and `6AG1241-1CH32-2XB0` were
verified before exposure as `9-pole D-sub pin`; no source correction was
required.

Current constraints:

- The Classic/G2 CPU, Power Module, Signal Module, and Signal Board arrays plus
  the 17 Communication Module records connect to Product aggregation.
- Disconnected records are not validated during normal application construction.
- Source/reference URL fields exist on the source records.
- Source and taxonomy enforcement occurs only when a record passes through the
  current validator.
- `verified-taxonomy.ts` distinguishes the `S7-1200` and `S7-1200 G2` series
  for the classified CPU, Signal Board, Signal Module, and Power Module
  variants. No S7-1200 G5 series is defined because that generation is not
  established.
- Connected source types use explicit product-type specification normalizers;
  arbitrary specification serialization is not supported.

## Validation and Mapping

For connected S7-300 CPU, Power Supply, and Signal Module records, S7-1200
Classic/G2 Power Module records, and S7-1200 G2 CPU records, validation checks required
identity and classification values, supported lifecycle, MLFB format, HTTPS
source presence, and membership in verified Siemens taxonomy. Invalid connected
records cause adapter mapping to fail.

Manufacturer source interfaces retain their product-type-specific
`specifications` contracts. Common Product mapping does not inspect or
arbitrarily serialize those objects; every connected product type must supply
an explicit specification normalizer. Historical Task C established this boundary
while preserving the then-existing S7-300 CPU mapping and adding no new source
integration in that task.

This enforcement must not be inferred for disconnected source files. Until a
dataset is connected to the validation/adapter/aggregation path, normal builds
do not establish that every record satisfies the active Product contract.

## Data Rules

- Preserve one canonical UI-facing Product interface.
- Access active Products through the repository.
- Treat manufacturer files as source data until explicitly connected.
- Do not invent prices, stock, specifications, taxonomy, or lifecycle values.
- Expose source records only after identity/specification validation and explicit
  integration; an unverified lifecycle remains omitted from public Product data.
- Reconcile taxonomy and validation before controlled dataset integration.

## S7-300 Communication Processor Verification — 2026-09-03 (Historical Snapshot)

The dated CP/FM sections below preserve their historical evidence, counts, and
next steps. Their references to current totals, provisional lifecycle, pending
audits, or disconnected records describe those checkpoints, not the current
382-Product dataset or completed 196/196 S7-300 pipeline.

Task AJ reconciled all 43 Communication Processor identities and found no
taxonomy or adapter blocker, while identifying 30 lifecycle records requiring
verification. Task AK reconciled that set. Three stale values were corrected:
`6GK7343-1CX10-0XE0`, `6GK7343-1EX30-0XE0`, and `6GK7343-1GX31-0XE0` are now
`spare-part`; exact Siemens technical product data also replaced the family
sources for the Lean and Advanced records. All other checked lifecycle values
were retained. Final recorded distribution is 0 active, 1 phase-out, 18
spare-part, and 24 discontinued. Verification resolved 28/30 initial blockers;
ERPC `6GK7343-1FX00-0XE0` and BACnet `6FL4343-1CX10-0XE0` remain unresolved due
to conflicting secondary PLM claims. The dataset remains source-only,
disconnected at 0/43, and not exposure-ready; Product total is 308, S7-300 is
122/197, and S7-1200 is 186/186. Targeted resolution of those MLFBs is next.

Task AL closes both remaining debts without changing lifecycle values. ERPC
`6GK7343-1FX00-0XE0` remains `discontinued` because explicit PM500 evidence and
independent manufacturer-discontinuation evidence supersede stale PM300 mirrors;
its canonical source is upgraded to the exact official Siemens IK PI catalog.
BACnet `6FL4343-1CX10-0XE0` remains `discontinued`: official Siemens data records
sales restriction from 2012-04-30, and later Siemens-derived product data records
cancellation on 2019-07-01, making Phase-Out the earlier lifecycle stage. Its
canonical source is upgraded to the exact Siemens BACnet datasheet. Direct
Siemens PLM pages were inaccessible for both. Lifecycle blockers are now 0 and
the 43-record source is SOURCE/LIFECYCLE VERIFIED, still disconnected 0/43.
The next gate is SIPLUS normalization, taxonomy, and explicit adapter preparation.

Task AM completes that preparation. Four SIPLUS records now use their functional
base variants, reducing Communication Processor taxonomy from 20 source labels
to 16 functional variants. All 43 records validate against the new S7-300
Communication Processor taxonomy and map through a dedicated explicit adapter.
The adapter preserves strings, joins `interfaces` and `protocols` arrays with
`, `, omits undefined fields, and delegates Product construction and lifecycle
mapping to the generic Siemens mapper. Expected future Product lifecycle is 0
active, 19 legacy, and 24 discontinued. CP remains disconnected 0/43; Product
total remains 308, S7-300 remains 122/197, and S7-1200 remains 186/186. The next
task is controlled 43-record CP integration, projected to produce 351 Products
and S7-300 165/197 with Function Module 32 remaining. The projection is not the
current state.

Task AN integrates all 43 Communication Processor records into the canonical
Product collection through the existing dedicated adapter, with no source,
taxonomy, adapter, or generic infrastructure changes. CP is SOURCE/LIFECYCLE
VERIFIED, FUNCTIONALLY NORMALIZED, TAXONOMY-VALID 43/43, ADAPTER-READY, and
CONNECTED 43/43. Product lifecycle is 0 active, 19 legacy, and 24 discontinued.
The current Product total is 351, S7-300 is 165/197, and S7-1200 remains 186/186.
Function Module is the only remaining disconnected S7-300 dataset, with 32
records. Its readiness, source, taxonomy, and adapter work is the next gate.
After its integration and strict S7-300 closure audit, the locked decision gate
requires stopping before another Siemens series and evaluating additional
Siemens data versus Persian-first bilingual site completion.

## 2026-09-04 — S7-300 Function Module Reconciliation (Historical Snapshot)

Task AO audited 32 unique FM records and confirmed the project placement of SM
338 POS as `Function Module` / `position-input` and CM35 as S7-300 `Function
Module` / `counter`. Task AP preserves all 32 MLFBs, titles, specifications,
Product Types, and variants while correcting FM 355 S from active to phase-out,
upgrading the FM 355-2 S and CM35 sources to exact Siemens manuals, and changing
the SIWAREX CS internal ID to `siemens-s7-300-siwarex-cs-4910-0aa01`.

Lifecycle before was 1 active, 13 phase-out, 4 spare-part, and 14 discontinued;
afterward it is 0 active, 14 phase-out, 4 spare-part, and 14 discontinued.
Eleven lifecycle records remain blocked, and SIPLUS FM 350-1 MLFB
`6AG1350-1AH03-4AE0` retains unresolved exact-product provenance. The three
SIPLUS variant normalizations remain deferred. Expected final FM taxonomy is 13
functional variants covering all 32 records, but verified taxonomy and an FM
adapter have not been created. FM remains 0/32, Product remains 351, S7-300
remains 165/197, and S7-1200 remains 186/186.

## 2026-09-04 — FM Targeted Identity/Lifecycle Reconciliation (Historical Snapshot)

Task AQ targets only the 11 open records. The SIPLUS FM 350-1 identity is now
`6AG1350-1AH03-2AE0` with internal ID
`siemens-siplus-s7-300-fm350-1-counter-1ah03-2ae0` and an exact Siemens ST 70
source. FM 353 and FM 354 AH01 are corrected to PM410 spare-part; SIWAREX CS is
corrected to PM410 spare-part and an exact Siemens Mall source; FM 352-5 AH11
is corrected to PM400 phase-out.

FM lifecycle is 0 active / 14 phase-out / 7 spare-part / 11 discontinued.
Identity, placement, and source blockers are zero, while seven lifecycle
blockers remain: `6AG1350-1AH03-2AE0`, `6AT1735-0AA01-0AA0`,
`6ES7354-1AH02-0AE0`, `6ES7356-4BN00-0AE0`, `6ES7356-4BM00-0AE0`,
`6ES7357-4AH03-0AE0`, and `7MH4904-2AA01`. The three SIPLUS source variants,
13-variant taxonomy, and explicit adapter remain deferred. FM remains 0/32,
Product 351, S7-300 165/197, and S7-1200 186/186.

## 2026-09-04 — Function Module Functional Pipeline (Historical Snapshot)

Task AS normalizes the three SIPLUS environmental leaks without changing any
identity or lifecycle: `6AG1350-1AH03-2AE0` and `6AG1350-2AH01-4AE0` now use
`counter`; `6AG1950-2AA01-4AA0` now uses `weighing-electronics`. The source
vocabulary moves from 15 variant IDs to 13 functional IDs with counts: counter
6, positioning 3, cam-controller 1, servo-positioning 2,
closed-loop-control 1, closed-loop-control-step-pulse 1,
temperature-control 1, temperature-control-step-pulse 1,
high-speed-boolean-processor 4, application-function 2,
multi-axis-positioning 2, position-input 1, and weighing-electronics 7.

The verified Function Module taxonomy validates 32/32 records. The dedicated
FM adapter explicitly maps all supported specifications and preserves numeric
zero values; its validation maps 32/32 records with a current projection of 0
active, 21 legacy, and 11 discontinued.

Task AR produced no safe lifecycle correction, so repeated identical research
is stopped. Seven exact lifecycle blockers remain and block Product exposure,
but not functional preparation: `6AG1350-1AH03-2AE0`,
`6AT1735-0AA01-0AA0`, `6ES7354-1AH02-0AE0`, `6ES7356-4BN00-0AE0`,
`6ES7356-4BM00-0AE0`, `6ES7357-4AH03-0AE0`, and `7MH4904-2AA01`. FM remains
0/32 connected; Product 351, S7-300 165/197, and S7-1200 186/186 are unchanged.

## 2026-09-04 — Function Module Verified-Subset Exposure (Historical Snapshot)

Task AS prepared all 32 FM source records structurally. Task AT adds a single
Siemens-official evidence gate in `fm.ts` for the eight lifecycle-unresolved
MLFBs and connects every other record through the FM adapter. The result is 24
exposed and 8 blocked records, with no source-record, lifecycle, taxonomy, or
adapter change.

FM353 `6ES7353-1AH01-0AE0` is verified by Siemens Industry Mall as PM410 from
2017-03-01, and FM352-5 AH11 `6ES7352-5AH11-0AE0` is verified by Siemens
Industry Mall as PM400 from 2023-10-01; both remain exposed. FM354 AH01
`6ES7354-1AH01-0AE0` has official Siemens identity evidence, but its lifecycle
is Siemens-official-unresolved and it is withheld without changing its source
value.

The exposed source distribution is 0 active, 13 phase-out, 6 spare-part, and 5
discontinued; mapped Product lifecycle is 0 active, 19 legacy, and 5
discontinued. Product increases 351 to 375, S7-300 increases 165/197 to
189/197, and S7-1200 remains 186/186.

Current state: FM SOURCE RECORDS 32/32, FUNCTIONALLY NORMALIZED,
TAXONOMY-VALID 32/32, ADAPTER-READY 32/32, PRODUCT-EXPOSED 24/32,
SIEMENS-OFFICIAL LIFECYCLE-DEBT 8, S7-300 CONNECTED 189/197. The blocked
records remain source records, and S7-300 is not complete. Repeated third-party
lifecycle research is prohibited; only official Siemens evidence may remove a
record from the exposure gate.

## 2026-09-04 — Final Eight FM Lifecycle Reconciliation (Historical Snapshot)

The exact Siemens Industry Mall page for FM354 `6ES7354-1AH01-0AE0` states
PM410 "Product cancellation" effective 2017-03-01. Its before/after lifecycle
is `spare-part`; the exact canonical source replaces the identity-only manual,
the gate entry is removed, and exposure is approved.

| MLFB | Model | Before / after | Official Siemens source | Explicit lifecycle / date | Gate / exposure |
| --- | --- | --- | --- | --- | --- |
| `6AG1350-1AH03-2AE0` | SIPLUS FM350-1 | phase-out / phase-out | Siemens ST 70 2023, `cache.industry.siemens.com/.../simatic-st70-complete-english-2023.pdf` | None; identity/catalog context only | kept / no |
| `6AT1735-0AA01-0AA0` | CM35 | discontinued / discontinued | Siemens CM35 manual, `cache.industry.siemens.com/.../HB_CM35_d.pdf` | None; identity/manual context only | kept / no |
| `6ES7354-1AH01-0AE0` | FM354 | spare-part / spare-part | Siemens Industry Mall exact Product page | PM410 "Product cancellation" / 2017-03-01 | removed / yes |
| `6ES7354-1AH02-0AE0` | FM354 | discontinued / discontinued | No exact identity source; Siemens FM354 material names AH00/AH01 | Identity unresolved; lifecycle not established | kept / no |
| `6ES7356-4BN00-0AE0` | FM356-4 8 MB | discontinued / discontinued | Siemens FM356 manual, `cache.industry.siemens.com/.../Fm356_e.pdf` | None; identity/manual context only | kept / no |
| `6ES7356-4BM00-0AE0` | FM356-4 | discontinued / discontinued | Siemens FM356 manual, `cache.industry.siemens.com/.../Fm356_e.pdf` | None; identity/manual context only | kept / no |
| `6ES7357-4AH03-0AE0` | FM357-2 | discontinued / discontinued | Siemens FM357 manual, `support.industry.siemens.com/.../fm357_e.pdf` | None; identity/manual context only | kept / no |
| `7MH4904-2AA01` | SIWAREX A | discontinued / discontinued | Siemens SIWAREX A manual, `support.industry.siemens.com/.../manual_a_en_04072001.pdf` | Model/function only; exact MLFB and lifecycle unresolved | kept / no |

The remaining targets retain their provisional lifecycle and stay gated because
no exact official Siemens lifecycle statement was established: SIPLUS FM350-1
`6AG1350-1AH03-2AE0` (`phase-out`), CM35 `6AT1735-0AA01-0AA0`
(`discontinued`), FM354 AH02 `6ES7354-1AH02-0AE0` (`discontinued`), FM356-4
`6ES7356-4BN00-0AE0` and `6ES7356-4BM00-0AE0` (`discontinued`), FM357-2
`6ES7357-4AH03-0AE0` (`discontinued`), and SIWAREX A `7MH4904-2AA01`
(`discontinued`). Exact identity sources remain valid for five records. FM354
AH02 and SIWAREX A retain identity debt; no effective lifecycle date is claimed
for any of the seven.

Source remains 32 records (0 active / 14 phase-out / 7 spare-part / 11
discontinued). Exposure is 25/32, with mapped lifecycle 0 active / 20 legacy /
5 discontinued. Product is 376, S7-300 is 190/197, and S7-1200 is 186/186.
The next gate is continued Siemens-official-only lifecycle resolution for the
seven remaining gated Function Modules. Only after all seven are exposed and
S7-300 reaches 197/197 does the strict S7-300 closure audit begin. After S7-300
completion, the deferred Siemens-only provenance compliance audit precedes the
locked Persian-first bilingual versus additional-Siemens-series decision.

## 2026-09-04 — Final Seven FM Identity Integrity (Historical Snapshot)

Task AV closed 0/7 lifecycle debts and exposed a malformed FM356-4 8 MB
identity. Task AW replaces that source record and exposure-gate key with exact
Siemens MLFB `6ES7356-4BN00-0AE0`; its internal ID is now
`siemens-m7-300-fm356-4-4bn00-0ae0`. The Siemens FM356 manual explicitly maps
`6ES7356-4BM00-0AE0` to 4 MB and `6ES7356-4BN00-0AE0` to 8 MB. No duplicate ID,
MLFB, generated slug, or Product part number results.

The manual and firmware material contain no explicit lifecycle state for
`4BN00`, so its provisional `discontinued` value is unchanged and it remains
blocked. The seven-item gate is now `6AG1350-1AH03-2AE0`,
`6AT1735-0AA01-0AA0`, `6ES7354-1AH02-0AE0`, `6ES7356-4BN00-0AE0`,
`6ES7356-4BM00-0AE0`, `6ES7357-4AH03-0AE0`, and `7MH4904-2AA01`.

FM354 `6ES7354-1AH02-0AE0` is IDENTITY-UNRESOLVED: exact Siemens material
identifies FM354 AH00/AH01, not AH02. SIWAREX A `7MH4904-2AA01` is also
exact-identity-unresolved because its official manual establishes the
SIWAREX A model/function without displaying that MLFB. Both remain gated and
unchanged pending management review. Source stays 32 unique records; exposure
stays 25/32; Product stays 376; S7-300 stays 190/197; S7-1200 stays 186/186.

## 2026-09-04 — Final Seven FM Exact Identity Closure (Historical Snapshot)

Task AX corrects the SIWAREX A source MLFB from `7MH4904-2AA01` to Siemens
MLFB `7MH4421-1AA01`, corrects its internal ID to
`siemens-s7-300-siwarex-a-4421-1aa01`, and replaces its source with the exact
Siemens SIWAREX A device manual. That manual explicitly displays SIWAREX A and
order number `7MH4421-1AA01`; Siemens STEP 7 S7-300 module and compatibility
tables corroborate the same mapping. No repository collision results. Because
none of the qualifying identity material states lifecycle, provisional
`discontinued` remains and the corrected gate key stays blocked.

FM354 `6ES7354-1AH02-0AE0` remains IDENTITY-NOT-ESTABLISHED. Official Siemens
FM354 material establishes AH00 as predecessor and AH01 as successor/current
revision, while manuals, firmware summaries, compatibility tables, migration
guides, and STEP 7 material do not establish AH02. The record is retained as a
DELETE/INVENTORY-CORRECTION CANDIDATE pending management review; no speculative
rewrite or denominator change is made.

Identity debt falls from two records to one. The seven-item gate now ends with
`7MH4421-1AA01`; FM remains 25/32 exposed, Product remains 376, S7-300 remains
190/197 with denominator status PENDING-IDENTITY-REVIEW, and S7-1200 remains
186/186.
