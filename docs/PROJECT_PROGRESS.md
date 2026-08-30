# Siemiran — Project Progress

Repository source of truth: current `main` branch

Last synchronized: 2026-08-30

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

All S7-1200 CPU, SM, SB, CM, CP, CB, special, and other datasets remain
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
The S7-300 Power Supply dataset and the S7-1200 Classic/G2 Power Module datasets
are now connected through explicit normalizers. All other disconnected source
datasets still require controlled taxonomy and normalization work before
integration and must not be presented as active products before verification.
