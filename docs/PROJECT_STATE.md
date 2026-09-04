# Siemiran — Project State

## Current Baseline

- Status: Active Development
- Documentation synchronized: 2026-08-31
- Repository source of truth: current `main` branch
- No semantic release version is asserted by this document.

## Current Stack

- Next.js 16.2.11 with App Router
- React 19.2.4
- TypeScript 5 in strict mode
- Tailwind CSS 4
- ESLint 9
- npm

## Architecture

- Feature-first application structure under `apps/web/src/features`
- Repository pattern for product access
- One UI-facing `Product` interface
- Routes under `apps/web/app`
- Shared UI under `apps/web/src/components`
- Product feature areas: components, comparison, data, database, filters, hooks,
  lib, pagination, repository, sections, sorting, and types
- `legacy/` is read-only and is not part of the current Next.js application

## Product Platform

| Area | Status | Current state |
| --- | --- | --- |
| Product listing and dynamic detail pages | IMPLEMENTED | Repository-backed listing, static product paths, and not-found handling |
| Search, URL parameters, filters, sorting, pagination | IMPLEMENTED | Category, family, series, and product-type filters; 12-item pagination |
| Gallery and specifications | IMPLEMENTED | Product gallery/image UI and technical specification rendering |
| SEO and structured data | IMPLEMENTED | Metadata, canonical/Open Graph/Twitter fields, Product JSON-LD, breadcrumbs, and Breadcrumb JSON-LD |
| Comparison | IMPLEMENTED | Selection, comparison bar, page, table, and difference highlighting |
| Comparison persistence | IMPLEMENTED | Browser `localStorage` persistence |
| Inquiry UI | IMPLEMENTED | Product inquiry form with shared client/server validation |
| Inquiry backend workflow | PARTIAL | API validates and acknowledges requests but does not deliver or persist them |
| Downloads/resources | PARTIAL | Types and UI architecture exist; active product download arrays are empty |
| Product relations | PARTIAL | Resolution and UI exist; active relation data is unpopulated |

## Siemens Catalog State

### Active Application Data

The `Product` aggregation contains 308 products:

- 36 S7-300 CPU source records mapped through validation and the Siemens adapter
- 13 S7-300 Power Supply source records mapped through the shared validator,
  generic Product mapper, and explicit Power Supply specification normalizer
- 66 S7-300 Signal Module source records mapped through validation and the
  dedicated explicit Signal Module specification normalizer
- 7 S7-300 Interface Module source records mapped through validation and the
  dedicated explicit Interface Module specification normalizer
- 3 S7-1200 Classic Power Module source records mapped through validation and
  the explicit S7-1200 Power Module specification normalizer
- 2 S7-1200 G2 Power Module source records mapped through the same normalizer,
  with generation preserved by `seriesId = S7-1200 G2`
- 10 S7-1200 G2 CPU source records mapped through validation and an explicit
  S7-1200 CPU specification normalizer
- 50 S7-1200 Classic CPU source records mapped through the same explicit CPU
  normalizer: 41 compact and 9 fail-safe
- 9 S7-1200 G2 Signal Module source records mapped through validation and an
  explicit shared S7-1200 Signal Module specification normalizer
- 9 S7-1200 G2 Signal Board source records mapped through validation and an
  explicit shared S7-1200 Signal Board specification normalizer
- 38 S7-1200 Classic Signal Module source records mapped through the unchanged
  shared Signal Module normalizer: 37 active and 1 legacy Product mapped from a
  spare-part source lifecycle
- 23 S7-1200 Classic Signal Board source records mapped through the unchanged
  shared Signal Board normalizer as active Products
- 17 S7-1200 Communication Module records mapped through the unchanged shared
  communication adapter: all 16 records from `cm.ts` plus RF120C from
  `other.ts`, all active
- 7 S7-1200 Communication Processor records mapped through the unchanged shared
  communication adapter: 6 active Products and 1 legacy Product mapped from a
  spare-part source lifecycle
- 3 S7-1200 Communication Board records mapped through the unchanged shared
  communication adapter: all use variant `cb1241-rs485` and map to active
  Products
- 8 S7-1200 Special Module records selected from the shared 11-record source
  array and mapped through the unchanged Special/Technology adapter: 7 active
  Products and 1 legacy Product mapped from a phase-out source lifecycle
- 3 S7-1200 Technology Module records selected from the same shared source array
  and mapped through the unchanged adapter: SIWAREX WP231, WP241, and WP251, all
  active
- 3 S7-1200 Network Switch records selected from `other.ts` and mapped through
  the unchanged dedicated Network Switch adapter: CSM 1277 variant `csm1277`,
  all active
- 1 S7-1200 Data Decoupling Module record selected from `other.ts` and mapped
  through the unchanged dedicated adapter: DCM 1271 (`3RK7271-1AA30-0AA0`),
  variant `dcm1271`, active

These products flow through `data/products.ts`, the Product repository, and the UI.

### Source Data and Connection Status

- The S7-300 IM dataset is CONNECTED; FM and CP remain DISCONNECTED.
- The 66-record S7-300 Signal Module dataset is SOURCE-VERIFIED, taxonomy-valid
  66/66, ADAPTER-READY, and CONNECTED with 66 Product records. Its
  variants are digital-input 16, digital-output 19, digital-io 2,
  programmable-digital-io 1, analog-input 14, analog-output 9, and analog-io 5.
  Source lifecycle is 1 active, 18 phase-out, 41 spare-part, and 6 discontinued;
  generic Product mapping yields 1 active, 59 legacy, and 6
  discontinued. The existing Siemens-hosted module-specific evidence for
  `6ES7321-7BH00-0AB0` is accepted as sufficient provenance. Direct live Mall
  access for `6ES7322-5SD00-0AB0` remained edge-denied; its phase-out lifecycle,
  effective 2023-10-01, is verified by an exact SiePortal product-page capture,
  two independently published matching sources, and no conflicting
  higher-authority evidence. Both debts are closed. S7-300 integration advances from 49/197 to
  122/197, leaving 75 disconnected records: FM 32 and CP 43. The Product
  collection is 308, while S7-1200 remains 186/186 connected. The next S7-300
  gate is Communication Processor readiness, taxonomy, and source-verification
  work.
  After full S7-300 completion and its closure audit, stop before opening another
  Siemens series and separately evaluate additional Siemens series/family data
  versus Persian-first bilingual site completion.
- The 7-record S7-300 Interface Module dataset is functionally normalized,
  taxonomy-valid 7/7, adapter-ready, and CONNECTED at 7/7 through its explicit
  adapter. Variants are rack-sender 1, rack-receiver 1,
  rack-interface 3, motion-control 1, and distributed-motion-control 1. Source
  lifecycle is 0 active, 0 phase-out, 5 spare-part, and 2 discontinued; Product
  mapping yields 0 active, 5 legacy, and 2 discontinued Products.
  Extended-temperature IM365 `6ES7365-0BA81-0AA0` is verified as
  PM500/discontinued effective 2012-10-01 with successor `6AG1365-0BA01-2AA0`.
  The erroneous IM178-4 MLFB `6ES7178-4AB00-0XA0` is corrected to the official
  Siemens manual identity `6ES7178-4BH00-0AE0`; current Siemens/TIA documentation
  confirms it is no longer actively marketed, and matching independent evidence
  retains PM500/discontinued effective 2014-10-01. Direct Siemens PLM pages were
  inaccessible, and no conflicting higher-authority evidence was found. All IM
  verification debt is closed. Product total is 308 and S7-300 is 122/197
  connected, leaving CP 43 and FM 32 disconnected. The next S7-300 gate is
  Communication Processor readiness, taxonomy, and source verification.
- The 38-record Classic S7-1200 Signal Module and 23-record Classic Signal Board
  sources are source-backed, taxonomy-valid, and CONNECTED through their
  unchanged shared adapters. Classic/G2 physical source separation is
  preserved, and SIPLUS environmental edition remains source evidence rather
  than functional/model variant taxonomy.
- All 186 currently verified S7-1200 source records in the repository are
  connected. This completion statement applies to the verified repository
  dataset and does not assert that no additional Siemens SKUs exist externally.
- All 50 Classic CPU records are taxonomy/validation-ready after normalizing
  their functional variants to 41 `compact` and 9 `fail-safe`. SIPLUS remains
  environmental source evidence in MLFBs, titles, and descriptions rather than
  a functional `variantId`.
- All 50 Classic CPUs are source-backed and connected. The source-backed
  `6ES7214-1AG40-0XB0` Product replaces the former manual declaration, and a
  permanent redirect preserves its old `/products/cpu-1214c-dc-dc-dc` URL.
- The 9 G2 and 38 Classic Signal Modules are connected through one unchanged
  shared SM normalizer. Physical source separation remains preserved.
- The 9 G2 and 23 Classic Signal Boards are connected through one unchanged
  shared SB normalizer. Physical source separation remains preserved.
- 186 of 186 S7-1200 source records are connected: all CPU, Power Module,
  Signal Module, Signal Board, Communication Module, Communication Processor,
  Communication Board, Special Module, Technology Module, and Network Switch
  records, plus the Data Decoupling Module record. No currently verified
  S7-1200 source records remain disconnected.
- The S7-1200 source files contain 186 unique MLFB declarations.
- `S7-1200 G2` is a distinct series under the S7-1200 family. Existing G2
  classification covers 10 CPU, 9 Signal Board, and 9 Signal Module records;
  the 2 G2 Power Module records were already classified in that series.
- G2 manufacturer data is physically separated under `s7-1200/g2/`, containing
  30 records: 10 CPU, 9 Signal Board, 9 Signal Module, and 2 Power Module. The
  root Classic files retain 50 CPU, 23 Signal Board, 38 Signal Module, and 3
  Power Module records. The Classic and G2 Power Module source files remain
  physically separated while both are connected through one explicit normalizer;
  G2 CPU source separation is also preserved.
- Historical and SIPLUS S7-300 Power Supply records and the Classic SIPLUS
  S7-1200 Power Module records are included in their controlled connected datasets.
- Disconnected source records are not validated during normal application
  construction and must not be treated as active UI products.
- The verified taxonomy distinguishes the Classic `S7-1200` and `S7-1200 G2`
  series and covers the Classic and G2 Signal Board and Signal Module variants
  without changing G2 source or taxonomy semantics.
- Task O connects all 23 Classic Signal Boards without changing source,
  taxonomy, adapters, or other datasets. The active Product total is 193 and
  S7-1200 is 144/186 connected with 42 disconnected.
- Task Q adds seven evidence-backed Classic S7-1200 Product Types and eliminates
  `Other Module` from the remaining source classification with zero Product
  exposure. Active Products remain 193 and S7-1200 remains 144/186 connected.
- Task R adds four explicit adapters and gives all seven remaining Product Types
  exactly one intended adapter route. Communication Module, Communication
  Processor, and Communication Board share `communication.adapter.ts`; Special
  Module and Technology Module share `special.adapter.ts`; Network Switch and
  Data Decoupling Module use their own narrow guarded adapters. The mixed
  physical `other.ts` file remains unchanged, and Product-Type guards prevent
  cross-mapping. Product exposure remains zero, with 193 active Products and
  S7-1200 still 144/186 connected with 42 disconnected.
- Task S connects all 17 Communication Module records: 16 from `cm.ts` plus
  RF120C from `other.ts`. All 17 map to active Products through the unchanged
  communication adapter, increasing the Product aggregation from 193 to 210 and
  S7-1200 connectivity from 144/186 to 161/186, with 25 disconnected.
- Task T connects all 7 Communication Processor records through the unchanged
  communication adapter. Variants are `telecontrol-gprs` 1,
  `industrial-ethernet-telecontrol` 3, `lte-eu` 1, `lte-us` 1, and
  `telecontrol-irc` 1. Source lifecycle is 6 active and 1 spare-part, mapped to
  6 active and 1 legacy Product. The spare-part CP 1242-7 V2 is preserved and
  connected rather than filtered. The Product collection total is 217 and
  S7-1200 connectivity is 168/186, with 18 disconnected: Communication Board 3,
  Special Module 8, Technology Module 3, Network Switch 3, and Data Decoupling
  Module 1.
- Task U connects all 3 Communication Board records through the unchanged
  communication adapter. All use variant `cb1241-rs485` and map to active
  Products; lifecycle for these three is 3 active, 0 legacy, and 0 discontinued.
  All S7-1200 communication Product Types are now connected:
  Communication Module 17, Communication Processor 7, and Communication Board
  3, for 27 communication records total. The Product collection total is 220
  and S7-1200 connectivity is 171/186, with 15 disconnected: Special Module 8,
  Technology Module 3, Network Switch 3, and Data Decoupling Module 1.
- Task V connects exactly 8 Special Module records from the shared 11-record
  source array through the unchanged Special/Technology adapter, leaving all 3
  Technology Module records disconnected. Variants are `io-link-master` 3,
  `condition-monitoring` 1, `simulator-1211-1212` 1,
  `simulator-1214-1215` 1, `simulator-1217` 1, and `battery-board` 1. Source
  lifecycle for these eight is 7 active and 1 phase-out, mapped to 7 active and
  1 legacy Product. The phase-out SM 1278 (`6ES7278-4BD32-0XB0`) remains
  connected as legacy. The Product collection total is 228 and S7-1200
  connectivity is 179/186, with 7 disconnected: Technology Module 3, Network
  Switch 3, and Data Decoupling Module 1.
- Task W connects all 3 Technology Module records through the unchanged shared
  Special/Technology adapter: SIWAREX WP231, WP241, and WP251. Variants are
  `weighing-wp231` 1, `weighing-wp241` 1, and `weighing-wp251` 1; lifecycle for
  these three Products is 3 active. The shared source array is now fully
  connected with 8 Special Module plus 3 Technology Module records, or 11/11.
  The Product collection total is 231 and S7-1200 connectivity is 182/186, with
  4 disconnected: Network Switch 3 and Data Decoupling Module 1.
- Task X connects exactly 3 Network Switch / CSM 1277 records through the
  unchanged dedicated Network Switch adapter. All use variant `csm1277` and map
  to active Products. Mixed `other.ts` exposure is now RF120C Communication
  Module 1 connected, CSM 1277 Network Switch 3 connected, and DCM 1271 Data
  Decoupling Module 1 disconnected, for 4/5 connected. The Product collection
  total is 234 and S7-1200 connectivity is 185/186, with only Data Decoupling
  Module 1 remaining disconnected.
- Task Y connects DCM 1271 (`3RK7271-1AA30-0AA0`) through the unchanged dedicated
  Data Decoupling adapter. Variant `dcm1271` maps to 1 active, 0 legacy, and 0
  discontinued Product. Mixed `other.ts` exposure is complete: Communication
  Module 1, Network Switch 3, and Data Decoupling Module 1, for 5/5 connected
  with no duplicates. The Product collection total is 235, and all 186 currently
  verified S7-1200 source records in the repository are connected with 0
  disconnected. This does not imply that no additional Siemens SKUs exist
  outside the verified repository dataset.
- Connector verification for `6AG1241-1CH32-4XB0` and
  `6AG1241-1CH32-2XB0` is RESOLVED. Both are verified as `9-pole D-sub pin`,
  and no source correction was required.
- `6AG1223-1QH32-4XB0` was verified against its official Siemens Industry Mall
  product record. Its digital inputs are 120/230 V AC, the incorrect 24 V DC
  source value is corrected, and the record now uses a direct MLFB-specific
  Siemens source URL. Lifecycle remains active as of 2026-08-31, and the
  corrected 120/230 V AC value and direct URL now flow into its Product.
- No S7-1200 G5 generation has been established.
- The Siemens validation boundary now uses a neutral PLC source structural
  contract for identity, taxonomy, lifecycle, descriptions, and official
  source URLs.
- Common Siemens Product mapping is separated from explicit product-type
  specification normalization. S7-300 CPU, Power Supply, Signal Module, and
  Interface Module plus
  S7-1200 Classic/G2 Power Module, CPU, Signal Module, Signal Board, Communication
  Module, Communication Processor, Communication Board, Special Module, and
  Technology Module, Network Switch, and Data Decoupling Module records are
  connected. The current verified S7-1200 source integration is 186/186 complete,
  and the Product collection total is 308.

## Latest Local Quality Verification

- ESLint: PASS
- TypeScript (`tsc --noEmit`): PASS
- Production build: PASS
- Automated tests: NOT ESTABLISHED
- GitHub Actions CI/CD: NOT FOUND

## S7-300 Communication Processor Source Verification — 2026-09-03

- Task AJ audited 43/43 records: all identities reconcile, with zero taxonomy
  blockers and zero adapter blockers; 30 lifecycle records required verification.
- Task AK verified that set and corrected `6GK7343-1CX10-0XE0`,
  `6GK7343-1EX30-0XE0`, and `6GK7343-1GX31-0XE0` to `spare-part`. Exact Siemens
  technical product data replaced family-manual sources for the Lean and
  Advanced records. The other lifecycle values were retained after verification.
- Final recorded lifecycle: 0 active, 1 phase-out, 18 spare-part, 24
  discontinued. Of the 30 initial blockers, 28 are resolved; ERPC
  `6GK7343-1FX00-0XE0` and BACnet `6FL4343-1CX10-0XE0` remain unresolved because
  accessible secondary PLM claims conflict. Communication Processor stays
  disconnected at 0/43 and is not exposure-ready.
- Product collection stays 308, S7-300 stays 122/197, and S7-1200 stays 186/186.
  The next gate is targeted lifecycle resolution for those two exact MLFBs; the
  post-S7-300 management gate remains in force.

Task AL closes the final two lifecycle debts. ERPC `6GK7343-1FX00-0XE0`
remains `discontinued`: exact official Siemens catalog and ProductCERT evidence
establish identity, an exact Siemens-derived product reproduction explicitly
reports PM500, and independent exact-product evidence reports manufacturer
discontinuation; older PM300 mirrors are stale. BACnet `6FL4343-1CX10-0XE0`
also remains `discontinued`: the official Siemens datasheet establishes sales
restriction from 2012-04-30, followed by Siemens-derived cancellation evidence
dated 2019-07-01; Phase-Out evidence reflects the earlier stage. Direct Siemens
PLM pages were not accessible for either record. Both canonical sources now use
exact official Siemens technical documents. Lifecycle remains 0 active, 1
phase-out, 18 spare-part, and 24 discontinued. CP is SOURCE/LIFECYCLE VERIFIED
with identity, lifecycle, taxonomy, and adapter blocker counts all zero, but
remains disconnected 0/43. The next gate is SIPLUS normalization, taxonomy, and
explicit adapter preparation. Product total remains 308, S7-300 remains 122/197,
S7-1200 remains 186/186, and the post-S7-300 management gate remains in force.

Task AM normalizes exactly four SIPLUS CP variant leaks to their functional base
roles and reduces the 43-record vocabulary from 20 to 16 variants. Verified
Communication Processor taxonomy now covers 43/43 records, and a dedicated
explicit adapter maps all 43 through the generic Siemens Product mapper. Future
Product lifecycle is 0 active, 19 legacy, and 24 discontinued. CP is
SOURCE/LIFECYCLE VERIFIED, FUNCTIONALLY NORMALIZED, TAXONOMY-VALID 43/43,
ADAPTER-READY, and DISCONNECTED 0/43, with identity, lifecycle, taxonomy, and
adapter blockers all zero. Product total remains 308, S7-300 remains 122/197,
and S7-1200 remains 186/186. The next task is controlled 43-record CP Product
integration; expected future totals are 351 Products and S7-300 165/197, leaving
Function Module 32. These are projections, not current state. The post-S7-300
management gate remains in force.

Task AN connects all 43 verified S7-300 Communication Processor records through
the dedicated explicit adapter. CP is now SOURCE/LIFECYCLE VERIFIED,
FUNCTIONALLY NORMALIZED, TAXONOMY-VALID 43/43, ADAPTER-READY, and CONNECTED
43/43. Mapped Product lifecycle is 0 active, 19 legacy, and 24 discontinued.
The Product collection increases from 308 to 351 and S7-300 advances from
122/197 to 165/197; S7-1200 remains 186/186. S7-300 is not complete: Function
Module is the sole remaining disconnected dataset with 32 records. The next
S7-300 gate is Function Module readiness, source, taxonomy, and adapter work.
After Function Module integration and a strict S7-300 closure audit, stop before
starting another Siemens series and evaluate additional Siemens data versus
Persian-first bilingual site completion.

## 2026-09-04 — S7-300 Function Module Source/Lifecycle Reconciliation

Task AO audited all 32 Function Module source records. SM 338 POS remains
`Function Module` / `position-input` because Siemens compatibility evidence
lists it among S7-300 function modules. CM35 remains S7-300 `Function Module` /
`counter` because its official Siemens manual documents central S7-300 use.

Task AP corrects FM 355 S from active to phase-out (exact Siemens PM400),
replaces the FM 355-2 S and CM35 sources with exact official manuals, and fixes
the one-channel SIWAREX CS internal ID. Lifecycle changes from 1 active, 13
phase-out, 4 spare-part, and 14 discontinued to 0 active, 14 phase-out, 4
spare-part, and 14 discontinued. Eleven exact lifecycle records remain blocked;
the SIPLUS FM 350-1 `6AG1350-1AH03-4AE0` identity/source also needs resolution
because current Siemens material identifies `6AG1350-1AH03-2AE0` instead.

The three SIPLUS variant merges remain deferred. The expected later Function
Module taxonomy has 13 functional variants and reconciles all 32 records after
source/lifecycle closure and SIPLUS normalization. No FM adapter exists and FM
remains disconnected 0/32. Product total remains 351, S7-300 remains 165/197,
and S7-1200 remains 186/186. The next gate targets only the unresolved exact
MLFBs. The locked post-S7-300 decision gate remains in force.
