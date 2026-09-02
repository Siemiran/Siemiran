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

The `Product` aggregation contains 235 products:

- 36 S7-300 CPU source records mapped through validation and the Siemens adapter
- 13 S7-300 Power Supply source records mapped through the shared validator,
  generic Product mapper, and explicit Power Supply specification normalizer
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

### Source Data Not Connected to the Application

- S7-300 SM, IM, FM, and CP datasets exist but are DISCONNECTED.
- The 66-record S7-300 Signal Module dataset is SOURCE-READY, taxonomy-valid
  66/66, ADAPTER-READY, and DISCONNECTED with zero Product exposure. Its
  variants are digital-input 16, digital-output 19, digital-io 2,
  programmable-digital-io 1, analog-input 14, analog-output 9, and analog-io 5.
  Source lifecycle is 1 active, 17 phase-out, 41 spare-part, and 7 discontinued;
  future generic Product mapping would yield 1 active, 58 legacy, and 7
  discontinued. `6ES7321-7BH00-0AB0` source provenance and
  `6ES7322-5SD00-0AB0` live official PLM lifecycle remain verification debt.
  They do not block taxonomy or adapter readiness, but require resolution or
  review before controlled Product exposure. The Product collection remains 235.
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
  specification normalization. S7-300 CPU, S7-300 Power Supply, and S7-1200
  Classic/G2 Power Module, CPU, Signal Module, Signal Board, Communication
  Module, Communication Processor, Communication Board, Special Module, and
  Technology Module, Network Switch, and Data Decoupling Module records are
  connected. The current verified S7-1200 source integration is 186/186 complete,
  and the Product collection total is 235.

## Latest Local Quality Verification

- ESLint: PASS
- TypeScript (`tsc --noEmit`): PASS
- Production build: PASS
- Automated tests: NOT ESTABLISHED
- GitHub Actions CI/CD: NOT FOUND
