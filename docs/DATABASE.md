# Siemiran — Product Database

Repository source of truth: current `main` branch

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

The application currently aggregates 308 Products:

- 36 mapped S7-300 CPU Products
- 13 mapped S7-300 Power Supply Products
- 66 mapped S7-300 Signal Module Products
- 7 mapped S7-300 Interface Module Products
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
| Interface Module (IM) | 7 | DISCONNECTED |
| Function Module (FM) | 32 | DISCONNECTED |
| Communication Processor (CP) | 43 | DISCONNECTED |

S7-300 CPU records flow through the shared Siemens validator and their explicit
CPU normalizer. The 13 S7-300 Power Supply records and 66 Signal Module records
use the same validator and generic common Product mapper with their explicit
product-type specification normalizers. All three datasets enter Product
aggregation, the Product repository, and the UI.

The FM and CP datasets remain disconnected manufacturer source data.
The 66-record S7-300 SM dataset is taxonomy-valid 66/66 and ADAPTER-READY, with
variants digital-input 16, digital-output 19, digital-io 2,
programmable-digital-io 1, analog-input 14, analog-output 9, and analog-io 5.
Its source lifecycle is 1 active, 18 phase-out, 41 spare-part, and 6
discontinued; generic mapping produces 1 active, 59 legacy, and 6
discontinued Products. All 66 are CONNECTED as 1 active, 59 legacy, and 6
discontinued Products. The Product collection is 308. The existing official
Siemens module-specific source for `6ES7321-7BH00-0AB0` is accepted as sufficient
provenance. Direct live Mall retrieval for `6ES7322-5SD00-0AB0` remained
edge-denied; an exact SiePortal capture records PM400 phase-out effective
2023-10-01, corroborated by two independent publishers with no conflicting
higher-authority evidence found. Both verification debts are closed. Current verified S7-300
integration is 122/197, leaving 75 disconnected records: FM 32 and CP 43.
The next gate is Communication Processor readiness, taxonomy, and source
verification.
After full S7-300 completion and closure audit, stop before opening another
Siemens series and separately evaluate additional Siemens series/family data
versus Persian-first bilingual site completion.
The 7 Interface Module records are normalized to functional variants:
`rack-sender` 1, `rack-receiver` 1, `rack-interface` 3, `motion-control` 1, and
`distributed-motion-control` 1. They are taxonomy-valid 7/7, adapter-ready, and
CONNECTED at 7/7 through the dedicated adapter. Source lifecycle is
0 active, 0 phase-out, 5 spare-part, and 2 discontinued; expected future mapping
is now exposed as 0 active, 5 legacy, and 2 discontinued Products. Current
Siemens lifecycle evidence
is now complete: extended-temperature IM365 `6ES7365-0BA81-0AA0` is verified as
PM500/discontinued effective 2012-10-01 with successor `6AG1365-0BA01-2AA0`,
and the erroneous IM178-4 MLFB `6ES7178-4AB00-0XA0` is corrected to the
official-manual identity `6ES7178-4BH00-0AE0`. Current Siemens/TIA documentation
confirms that IM178-4 is no longer actively marketed; its independently
corroborated PM500 lifecycle ended 2014-10-01. Direct Siemens PLM pages were
inaccessible, so both lifecycle closures use matching independent exact-product
reproductions with no conflicting higher-authority evidence. Remaining IM
verification debt is 0. The Product collection is now 308 and S7-300 is 122/197
connected, leaving 75 disconnected records: Communication Processor 43 and
Function Module 32. S7-1200 remains 186/186 connected. The next S7-300 gate is
Communication Processor readiness, taxonomy, and source-verification work.
The connected 13-record PS dataset comprises 5 initial standard/outdoor
records, 4 historical revisions, and 4 SIPLUS records. Official base-product
and successor MLFB relationships remain source-only; they are not mapped into
canonical Product relation fields.

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
disconnected, and the Product collection total is 308. CPU, Power Module, Signal
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
an explicit specification normalizer. Task C establishes this boundary while
preserving the existing S7-300 CPU mapping and adds no new source integration.

This enforcement must not be inferred for disconnected source files. Until a
dataset is connected to the validation/adapter/aggregation path, normal builds
do not establish that every record satisfies the active Product contract.

## Data Rules

- Preserve one canonical UI-facing Product interface.
- Access active Products through the repository.
- Treat manufacturer files as source data until explicitly connected.
- Do not invent prices, stock, specifications, taxonomy, or lifecycle values.
- Do not call disconnected or unverified source records active products.
- Reconcile taxonomy and validation before controlled dataset integration.

## S7-300 Communication Processor Verification — 2026-09-03

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

## 2026-09-04 — S7-300 Function Module Reconciliation

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

## 2026-09-04 — FM Targeted Identity/Lifecycle Reconciliation

Task AQ targets only the 11 open records. The SIPLUS FM 350-1 identity is now
`6AG1350-1AH03-2AE0` with internal ID
`siemens-siplus-s7-300-fm350-1-counter-1ah03-2ae0` and an exact Siemens ST 70
source. FM 353 and FM 354 AH01 are corrected to PM410 spare-part; SIWAREX CS is
corrected to PM410 spare-part and an exact Siemens Mall source; FM 352-5 AH11
is corrected to PM400 phase-out.

FM lifecycle is 0 active / 14 phase-out / 7 spare-part / 11 discontinued.
Identity, placement, and source blockers are zero, while seven lifecycle
blockers remain: `6AG1350-1AH03-2AE0`, `6AT1735-0AA01-0AA0`,
`6ES7354-1AH02-0AE0`, `6ES7356-3BN00-0AE0`, `6ES7356-4BM00-0AE0`,
`6ES7357-4AH03-0AE0`, and `7MH4904-2AA01`. The three SIPLUS source variants,
13-variant taxonomy, and explicit adapter remain deferred. FM remains 0/32,
Product 351, S7-300 165/197, and S7-1200 186/186.

## 2026-09-04 — Function Module Functional Pipeline

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
`6AT1735-0AA01-0AA0`, `6ES7354-1AH02-0AE0`, `6ES7356-3BN00-0AE0`,
`6ES7356-4BM00-0AE0`, `6ES7357-4AH03-0AE0`, and `7MH4904-2AA01`. FM remains
0/32 connected; Product 351, S7-300 165/197, and S7-1200 186/186 are unchanged.
