# Siemiran — Project Progress

Repository source of truth: current `main` branch

Last synchronized: 2026-08-31

## Completed Foundation

- Feature-first application organization
- Product repository pattern
- Single UI-facing Product interface
- Product data aggregation and repository
- Product listing and dynamic, statically generated detail pages
- Metadata, Product JSON-LD, breadcrumbs, and Breadcrumb JSON-LD

## Completed Product Experience

- Search with URL state
- Category, family, series, and product-type filters
- Active filters and filter clearing
- Sorting and URL-synchronized pagination
- Product gallery and specifications
- Related-product recommendation and relation-rendering architecture
- Download-rendering architecture

Downloads and explicit relations are structurally implemented, but the active
dataset does not currently populate their data.

## Completed Comparison Milestone

- Comparison types and utilities
- Compare controls on product cards
- Comparison selection bar
- Comparison page and responsive table
- Comparison page state integration
- Difference highlighting
- Browser `localStorage` persistence

Comparison integration is complete in the current implementation; it is not a
pending milestone.

## Siemens Catalog Progress

### Shared Pipeline

- Task C Siemens PLC pipeline generalization: COMPLETED
- Neutral structural validation for common identity, taxonomy, lifecycle, and
  official source fields: IMPLEMENTED
- Generic common Product mapping with an explicit specification normalizer:
  IMPLEMENTED
- Existing S7-300 CPU specification normalization: EXTRACTED and PRESERVED
- Task C Product exposure: 0; the current active Product total is 50 after the
  controlled Task D Power Supply integration

### S7-300

- CPU source records: IMPLEMENTED and CONNECTED
- CPU flow from source through validation, adapter, Product aggregation,
  repository, and UI: IMPLEMENTED
- Signal Module source dataset: PRESENT, DISCONNECTED
- Interface Module source dataset: PRESENT, DISCONNECTED
- Function Module source dataset: PRESENT, DISCONNECTED
- Communication Processor source dataset: PRESENT, DISCONNECTED
- Power Supply source dataset: 13 RECORDS, including historical and SIPLUS
  completeness data, IMPLEMENTED, CONNECTED
- Power Supply flow through shared validation, generic Product mapping, and an
  explicit PS specification normalizer: IMPLEMENTED
- Task D new Product exposure: 13; active Product total: 50

### S7-1200

Substantial source datasets are present in:

- `cpu.ts`
- `sm.ts`
- `sb.ts`
- `cm.ts`
- `cp.ts`
- `cb.ts`
- `special.ts`
- `other.ts`
- `pm.ts`

These files contain 186 unique MLFB declarations. The 3 Classic Power Module
records (1 SIMATIC and 2 SIPLUS) are IMPLEMENTED and CONNECTED. The 2 G2 Power
Module records are IMPLEMENTED and CONNECTED. One explicit PM normalizer maps
both compatible source contracts while their source files remain physically
separated and generation remains represented by `seriesId`. Task E exposes 5
new Products, increasing the active Product total from 50 to 55.

The 10-record S7-1200 G2 CPU dataset is IMPLEMENTED and CONNECTED through an
explicit S7-1200 CPU normalizer: 6 compact and 4 fail-safe records. Task F
exposes 10 new Products and increases the active Product total from 55 to 65.
Classic S7-1200 CPU is now NORMALIZED and VALIDATION-READY: all 50 records
validate with 41 `compact` and 9 `fail-safe` variants.

Task I connects all 50 Classic CPU source records and removes the one overlapping
manual Product, for a net increase of 49 and an active Product total of 114.
Classic CPU is IMPLEMENTED, VALIDATED, and CONNECTED. The former manual
`6ES7214-1AG40-0XB0` Product is migrated to its canonical source-backed record,
with a permanent redirect preserving the old Product slug.

The 9-record S7-1200 G2 Signal Module dataset is VALIDATED and CONNECTED through
an explicit shared S7-1200 SM normalizer. Task J exposes 9 new Products and
increases the active Product total from 114 to 123. The 38-record Classic Signal
Module source remains DISCONNECTED.

The 9-record S7-1200 G2 Signal Board dataset is VALIDATED and CONNECTED through
an explicit shared S7-1200 SB normalizer. Task K exposes 9 new Products and
increases the active Product total from 123 to 132. The 23-record Classic Signal
Board source remains DISCONNECTED. S7-1200 now has 83 of 186 source records
connected, leaving 103 disconnected.

Task M normalizes the 38-record Classic S7-1200 Signal Module dataset to 8
functional variants and the 23-record Classic Signal Board dataset to 11
model-specific variants. Classic SM is NORMALIZED, VALIDATION-READY 38/38, and
DISCONNECTED. Classic SB is NORMALIZED, VALIDATION-READY 23/23, and
DISCONNECTED. SIPLUS environmental edition no longer appears in their
functional/model `variantId` values. The shared SM/SB adapters and all G2
source/taxonomy semantics remain unchanged.

Task M Product exposure is 0. The active Product total remains 132; S7-1200
remains 83/186 connected with 103 disconnected. The next controlled steps are:

1. Classic Signal Module integration
2. Classic Signal Board integration

Neither Classic dataset is marked connected by Task M. The previously known
`6AG1223-1QH32-4XB0` AC-title versus 24 V DC specification discrepancy is
VERIFIED and RESOLVED: official Siemens evidence confirms 120/230 V AC digital
inputs, and the record now uses its direct MLFB-specific source URL. No Product
integration occurred, and Classic SM remains ready for the next controlled
integration task.

Task N connects all 38 normalized and validated Classic S7-1200 Signal Module
records through the unchanged shared SM adapter. Classic SM is now 38 RECORDS,
NORMALIZED, VALIDATED, and CONNECTED. Task N exposes 38 Products and increases
the active Product total from 132 to 170. The source lifecycle distribution of
37 active and 1 spare-part maps to 37 active and 1 legacy Product.

Task O connects all 23 normalized and validated Classic S7-1200 Signal Board
records through the unchanged shared SB adapter. Classic SB is now 23 RECORDS,
NORMALIZED, VALIDATED, and CONNECTED. Task O exposes 23 active Products and
increases the active Product total from 170 to 193.

S7-1200 is now 144/186 connected with 42 disconnected. CPU, Power Module,
Signal Module, and Signal Board are fully connected across Classic and G2. CM
16, CP 7, CB 3, special/technology 11, and other/companion 5 remain
DISCONNECTED. Structural G2 classification is complete for 28 existing records:
10 CPU, 9 Signal Board, and 9 Signal Module records now carry generation in
`seriesId`, while their functional variant IDs no longer encode G2. The G2
taxonomy now covers those product types alongside the 2 previously classified
G2 Power Modules. Six G2 Signal Module links were upgraded to MLFB-specific
Siemens URLs, and the manual Classic Product series was corrected to
`S7-1200`. All 30 G2 records are now physically separated under `s7-1200/g2/`
(10 CPU, 9 Signal Board, 9 Signal Module, and 2 Power Module), while the root
Classic files retain 50 CPU, 23 Signal Board, 38 Signal Module, and 3 Power
Module records. No G5 series was created.

Task Q completes normalization and taxonomy work for all remaining 42 S7-1200
records. It normalizes 19 environmental/SIPLUS composite variants, reclassifies
all five former `Other Module` records, and adds seven stable Product Types.
All 42 records are taxonomy-valid but remain DISCONNECTED. Task Q exposure is
0; active Products remain 193 and S7-1200 remains 144/186 connected with 42
disconnected.

Task R completes the EXPLICIT ADAPTER LAYER for all remaining 42 records. A
shared communication adapter covers CM, CP, CB, and RF120C; a shared special
adapter covers Special Module and Technology Module; guarded narrow adapters
cover Network Switch and Data Decoupling Module. Every remaining Product Type
now has exactly one deterministic route. Source, taxonomy, and Product
aggregation remain unchanged, so exposure is 0, active Products remain 193,
and S7-1200 remains 144/186 connected with 42 disconnected.

Task S connects all 17 Communication Module records: all 16 normalized CM
records plus RF120C from `other.ts`. Communication Module is now 17 RECORDS,
NORMALIZED, TAXONOMY-VALID, ADAPTER-READY, and CONNECTED. The unchanged
communication adapter maps 17 active Products, increasing the Product total
from 193 to 210 and S7-1200 connectivity from 144/186 to 161/186, leaving 25
disconnected.

Task T connects all 7 Communication Processor records. Communication Processor
is now 7 RECORDS, NORMALIZED, TAXONOMY-VALID, ADAPTER-READY, and CONNECTED
through the unchanged communication adapter. Source lifecycle is 6 active and
1 spare-part, mapped to 6 active and 1 legacy Product. The spare-part lifecycle
is preserved and the record is connected rather than filtered. The Product
collection total increases from 210 to 217, and S7-1200 connectivity increases
from 161/186 to 168/186, leaving 18 disconnected.

Task U connects all 3 Communication Board records. Communication Board is now
3 RECORDS, NORMALIZED, TAXONOMY-VALID, ADAPTER-READY, and CONNECTED through the
unchanged communication adapter. All three use variant `cb1241-rs485` and map
to active Products; lifecycle for these three is 3 active, 0 legacy, and 0
discontinued. The Product collection total increases from 217 to 220,
and S7-1200 connectivity increases from 168/186 to 171/186, leaving 15
disconnected. The S7-1200 communication layer is complete with 27/27 records
connected: Communication Module 17, Communication Processor 7, and
Communication Board 3.

Task V connects exactly 8 Special Module records from the shared 11-record
source array. Special Module is now 8 RECORDS, NORMALIZED, TAXONOMY-VALID,
ADAPTER-READY, and CONNECTED through the unchanged Special/Technology adapter.
All 3 Technology Module records remain disconnected. Source lifecycle for the
selected eight is 7 active and 1 phase-out, mapped to 7 active and 1 legacy
Product. The phase-out SM 1278 (`6ES7278-4BD32-0XB0`) is preserved as legacy.
The Product collection total increases from 220 to 228, and S7-1200 connectivity
increases from 171/186 to 179/186, leaving 7 disconnected.

Task W connects all 3 Technology Module / SIWAREX records. Technology Module is
now 3 RECORDS, NORMALIZED, TAXONOMY-VALID, ADAPTER-READY, and CONNECTED through
the unchanged Special/Technology adapter. SIWAREX WP231, WP241, and WP251 map to
3 active Products. The existing 8 Special Module Products remain unchanged, and
the shared Special/Technology source layer is complete at 11/11 connected. The
Product collection total increases from 228 to 231, and S7-1200 connectivity
increases from 179/186 to 182/186, leaving 4 disconnected.

Task X connects exactly 3 Network Switch / CSM 1277 records. Network Switch is
now 3 RECORDS, NORMALIZED, TAXONOMY-VALID, ADAPTER-READY, and CONNECTED through
the unchanged dedicated Network Switch adapter. All three use variant `csm1277`
and map to active Products. Existing RF120C exposure is preserved, DCM 1271
remains disconnected, and mixed `other.ts` exposure is 4/5. The Product
collection total increases from 231 to 234, and S7-1200 connectivity increases
from 182/186 to 185/186, leaving 1 Data Decoupling Module disconnected.

Task Y connects the final currently verified S7-1200 source record. Data
Decoupling Module is now 1 RECORD, NORMALIZED, TAXONOMY-VALID, ADAPTER-READY,
and CONNECTED through the unchanged dedicated adapter. DCM 1271
(`3RK7271-1AA30-0AA0`) maps to 1 active, 0 legacy, and 0 discontinued Product.
Mixed `other.ts` exposure is complete at 5/5. The Product collection total
increases from 234 to 235, and current verified S7-1200 source integration is
186/186 COMPLETE, with 0 current source records disconnected. This completion
statement is limited to the verified repository dataset.

Connector verification debt for `6AG1241-1CH32-4XB0` and
`6AG1241-1CH32-2XB0` is RESOLVED: both connector values are verified as
`9-pole D-sub pin`, and no source change was required. The next step is an
S7-1200 integration closure / verification audit, a read-only verification step
after Task Y merge.

## Inquiry Progress

- Inquiry form UI: IMPLEMENTED
- Shared client/server validation: IMPLEMENTED
- Inquiry API validation and acknowledgement: IMPLEMENTED
- Delivery or persistence workflow: PARTIAL / NOT ESTABLISHED

## Quality Progress

- Latest local ESLint check: PASS
- Latest local TypeScript check: PASS
- Latest local production build: PASS
- Automated test baseline: NOT ESTABLISHED
- CI/CD: NOT ESTABLISHED

## Current Development State

The product browsing, detail, comparison, and inquiry-entry experiences are in
place. The Siemens validation and common Product mapping pipeline is now
generalized while product-type specification normalization remains explicit.
The S7-300 Power Supply and S7-1200 Classic/G2 Power Module, CPU, Signal Module,
and Signal Board datasets are connected through explicit
normalizers. All other
disconnected source datasets still require controlled taxonomy and normalization
work before integration and must not be presented as active products before
verification.
