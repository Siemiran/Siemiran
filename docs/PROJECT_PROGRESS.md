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
- Signal Module source dataset: 66 RECORDS, SOURCE-VERIFIED, TAXONOMY-VALID 66/66,
  ADAPTER-READY, and CONNECTED. Variant coverage is digital-input 16,
  digital-output 19, digital-io 2, programmable-digital-io 1, analog-input 14,
  analog-output 9, and analog-io 5. Source lifecycle is 1 active, 18 phase-out,
  41 spare-part, and 6 discontinued; Product mapping is 1 active, 59 legacy,
  and 6 discontinued. All 66 source records are exposed exactly once, and the
  Product collection is 308. The existing official module-specific source
  closes `6ES7321-7BH00-0AB0` provenance debt. Direct live Mall access remained
  edge-denied for `6ES7322-5SD00-0AB0`; an exact captured SiePortal PM400 state
  and 2023-10-01 effective date, two independently published matching sources,
  and no conflicting higher-authority evidence close its lifecycle debt. Current verified S7-300
  integration advances from 49/197 to 122/197, leaving 75 records disconnected:
  FM 32 and CP 43. S7-1200 remains 186/186 connected. The next S7-300 gate is
  Communication Processor readiness, taxonomy, and source-verification work.
  After full S7-300 completion and closure audit, stop before another Siemens
  series and separately evaluate additional Siemens series/family data versus
  Persian-first bilingual site completion.
- Interface Module source dataset: 7 RECORDS, FUNCTIONALLY NORMALIZED,
  TAXONOMY-VALID 7/7, ADAPTER-READY, and CONNECTED at 7/7. Variants are
  rack-sender 1, rack-receiver 1, rack-interface 3, motion-control 1, and
  distributed-motion-control 1. Source lifecycle is 0 active, 0 phase-out, 5
  spare-part, and 2 discontinued; Product mapping is 0 active, 5 legacy, and 2
  discontinued. Extended-temperature IM365 `6ES7365-0BA81-0AA0` is verified as
  PM500/discontinued effective 2012-10-01, and erroneous IM178-4 MLFB
  `6ES7178-4AB00-0XA0` is corrected to official-manual identity
  `6ES7178-4BH00-0AE0`, retained PM500/discontinued effective 2014-10-01.
  Current Siemens/TIA documentation confirms IM178-4 is no longer actively
  marketed. Direct Siemens PLM pages were inaccessible; matching independent
  exact-product reproductions close both lifecycle debts with no conflicting
  higher-authority evidence. Remaining IM verification debt is 0. Product total
  is 308 and S7-300 is 122/197 connected, leaving CP 43 and FM 32 disconnected.
  The next gate is Communication Processor readiness, taxonomy, and source
  verification.
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

## S7-300 Communication Processor Source Progress — 2026-09-03

- Task AJ: 43/43 identities reconciled; taxonomy blockers 0; adapter blockers 0;
  initial lifecycle-verification set 30.
- Task AK: all 30 checked, with three lifecycle corrections and two exact-source
  upgrades. Final recorded lifecycle is 0 active, 1 phase-out, 18 spare-part,
  and 24 discontinued. Verification resolved 28; ERPC `6GK7343-1FX00-0XE0`
  and BACnet `6FL4343-1CX10-0XE0` remain unresolved because accessible secondary
  PLM claims conflict.
- CP remains disconnected 0/43. Product collection remains 308, S7-300 remains
  122/197, and S7-1200 remains 186/186.
- Next gate: targeted lifecycle resolution of those two exact MLFBs. Product
  exposure, taxonomy preparation, adapter preparation, and SIPLUS normalization
  were not performed. The post-S7-300 management gate remains unchanged.

- Task AL closes ERPC `6GK7343-1FX00-0XE0` and BACnet
  `6FL4343-1CX10-0XE0` lifecycle debt. Both remain `discontinued`; exact official
  Siemens technical sources replace their compliance-only sources. ERPC PM500
  and independent manufacturer-discontinuation evidence supersede stale PM300
  mirrors. BACnet sales restriction from 2012-04-30 precedes verified
  cancellation on 2019-07-01, resolving Phase-Out as the earlier stage. Direct
  Siemens PLM pages were inaccessible. AJ blockers 30 became 2 after AK and 0
  after AL. Final lifecycle remains 0 active, 1 phase-out, 18 spare-part, and 24
  discontinued. CP is SOURCE/LIFECYCLE VERIFIED but remains disconnected 0/43.
- Next gate: Communication Processor SIPLUS normalization, taxonomy, and explicit
  adapter preparation. Product total remains 308, S7-300 remains 122/197, and
  S7-1200 remains 186/186. The post-S7-300 management gate remains unchanged.

- Task AM normalizes 4 SIPLUS CP records from environmental labels to functional
  base variants and reduces the vocabulary from 20 to 16. Final counts are:
  rs232 3, 20ma-tty 3, rs422-485 3, profibus-dp 4, profibus-dp-fo 1,
  profibus-fms 2, as-interface 4, as-interface-plus 2, industrial-ethernet 7,
  industrial-ethernet-lean 3, industrial-ethernet-advanced 4,
  industrial-ethernet-iso 1, industrial-ethernet-it 3,
  industrial-ethernet-erpc 1, profinet 1, and bacnet 1.
- Taxonomy validation and explicit adapter mapping are 43/43 with no remaining
  identity, lifecycle, taxonomy, or adapter blocker. Future Product lifecycle is
  0 active, 19 legacy, and 24 discontinued. CP is SOURCE/LIFECYCLE VERIFIED,
  FUNCTIONALLY NORMALIZED, TAXONOMY-VALID, ADAPTER-READY, and DISCONNECTED 0/43.
- Product total remains 308, S7-300 remains 122/197, and S7-1200 remains 186/186.
  Controlled CP Product integration is next; projected future totals are 351 and
  165/197, leaving Function Module 32. The post-S7-300 gate remains unchanged.

- Task AN connects all 43 verified S7-300 Communication Processor records
  through the existing dedicated adapter with no filtering. CP is now
  SOURCE/LIFECYCLE VERIFIED, FUNCTIONALLY NORMALIZED, TAXONOMY-VALID 43/43,
  ADAPTER-READY, and CONNECTED 43/43. Mapped lifecycle is 0 active, 19 legacy,
  and 24 discontinued.
- Product total advances from 308 to 351 and S7-300 from 122/197 to 165/197;
  S7-1200 remains 186/186. Function Module is the sole remaining disconnected
  S7-300 dataset with 32 records, and its readiness pipeline is next.
- After Function Module integration and strict S7-300 closure audit, stop before
  starting another Siemens series and evaluate additional Siemens data versus
  Persian-first bilingual site completion.

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
The S7-300 Power Supply and Signal Module plus S7-1200 Classic/G2 Power Module,
CPU, Signal Module, and Signal Board datasets are connected through explicit
normalizers. All other
disconnected source datasets still require controlled taxonomy and normalization
work before integration and must not be presented as active products before
verification.

## 2026-09-04 — Function Module Source/Lifecycle Progress

- Task AO audited 32/32 S7-300 Function Module source records.
- SM 338 POS remains Function Module / position-input, and CM35 remains S7-300
  Function Module / counter, based on official Siemens compatibility/manual
  evidence. Placement blockers are zero.
- FM 355 S is corrected from active to phase-out under exact PM400 evidence.
  FM 355-2 S and CM35 now use their exact official Siemens manuals. The
  one-channel SIWAREX CS internal ID is corrected before Product exposure.
- Lifecycle moves from 1 active / 13 phase-out / 4 spare-part / 14 discontinued
  to 0 / 14 / 4 / 14. Eleven exact lifecycle blockers remain, plus unresolved
  exact-product provenance for SIPLUS FM 350-1 `6AG1350-1AH03-4AE0`.
- Three SIPLUS variant merges, the expected 13-variant FM taxonomy, and the
  explicit FM adapter remain deferred. FM is still 0/32; Product is 351,
  S7-300 is 165/197, and S7-1200 is 186/186.
- Next gate: target only unresolved exact MLFB lifecycle/source evidence. After
  later FM integration and strict S7-300 closure audit, stop for the locked
  management decision before localization or another Siemens series.

## 2026-09-04 — FM Targeted Closure Progress

- Task AQ researched only the 11 remaining blockers; no non-blocking FM records
  were re-audited.
- Corrected SIPLUS FM 350-1 to Siemens MLFB `6AG1350-1AH03-2AE0` with the
  matching internal ID and Siemens ST 70 source.
- Corrected FM 353 and FM 354 AH01 to PM410 spare-part, SIWAREX CS to PM410
  spare-part, and FM 352-5 AH11 to PM400 phase-out. SIWAREX CS now uses its
  exact Siemens Mall page.
- FM lifecycle is 0 active / 14 phase-out / 7 spare-part / 11 discontinued.
  Identity, placement, and source blockers are closed; seven exact lifecycle
  blockers remain and are the only next research gate.
- Variant normalization, the 13-variant taxonomy, adapter work, and Product
  integration have not started. FM remains 0/32; Product is 351, S7-300 is
  165/197, and S7-1200 is 186/186. The post-S7-300 gate remains locked.

## 2026-09-04 — FM Functional Preparation Complete

- Normalized exactly three SIPLUS records to their base functional variants,
  reducing 15 source variant IDs to 13 functional IDs.
- Added Function Module taxonomy and validated 32/32 records with zero invalid
  combinations.
- Added the explicit FM adapter and mapped 32/32 records. The current lifecycle
  projection is 0 active, 21 legacy, and 11 discontinued; numeric zero,
  arrays, and boolean specifications are preserved explicitly.
- Task AR exhausted the bounded lifecycle search with no safe corrections.
  Seven lifecycle blockers remain unchanged and block Product exposure, while
  no longer blocking functional normalization, taxonomy, or adapter work.
- State: IDENTITY-VALID, PLACEMENT-VALID, SOURCE-VALID, FUNCTIONALLY NORMALIZED,
  TAXONOMY-VALID 32/32, ADAPTER-READY, LIFECYCLE-DEBT 7, DISCONNECTED 0/32.
- Product remains 351, S7-300 remains 165/197, and S7-1200 remains 186/186.
  The next management gate is a bounded historical-lifecycle acceptance policy
  for the seven legacy records before integration; S7-300 is not complete.

## 2026-09-04 — FM Verified Subset Connected

- Added an explicit eight-MLFB Siemens-official lifecycle exposure gate beside
  the 32-record FM source dataset.
- Connected exactly 24 non-blocked records through the existing FM adapter;
  all eight unresolved records remain disconnected with no lifecycle inference.
- Siemens Industry Mall verifies FM353 `6ES7353-1AH01-0AE0` as PM410 from
  2017-03-01 and FM352-5 AH11 `6ES7352-5AH11-0AE0` as PM400 from 2023-10-01;
  both remain exposed. FM354 AH01 `6ES7354-1AH01-0AE0` has official identity
  evidence but insufficient official lifecycle evidence and is withheld.
- Exposed mapping is 0 active, 19 legacy, and 5 discontinued. FM moves from
  0/32 to 24/32, Product from 351 to 375, and S7-300 from 165/197 to 189/197.
  S7-1200 remains 186/186.
- State: FM SOURCE RECORDS 32/32, FUNCTIONALLY NORMALIZED, TAXONOMY-VALID
  32/32, ADAPTER-READY 32/32, PRODUCT-EXPOSED 24/32, SIEMENS-OFFICIAL
  LIFECYCLE-DEBT 8, S7-300 CONNECTED 189/197.
- S7-300 is not complete. Third-party lifecycle evidence cannot remove records
  from the gate; the next management action requires official Siemens evidence
  and preserves the locked post-S7-300 decision.
