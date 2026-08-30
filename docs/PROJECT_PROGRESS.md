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

### S7-300

- CPU source records: IMPLEMENTED and CONNECTED
- CPU flow from source through validation, adapter, Product aggregation,
  repository, and UI: IMPLEMENTED
- Signal Module source dataset: PRESENT, DISCONNECTED
- Interface Module source dataset: PRESENT, DISCONNECTED
- Function Module source dataset: PRESENT, DISCONNECTED
- Communication Processor source dataset: PRESENT, DISCONNECTED
- Power Supply source dataset: 13 RECORDS, including historical and SIPLUS completeness data, IMPLEMENTED, DISCONNECTED

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

These files contain 186 unique MLFB declarations. The Power Module baseline
contains 1 Classic SIMATIC, 2 G2 SIMATIC, and 2 Classic SIPLUS records, all
DISCONNECTED. Their integration into the
validated Product pipeline is NOT COMPLETE. There is no connecting S7-1200
aggregator. Structural G2 classification is complete for 28 existing records:
10 CPU, 9 Signal Board, and 9 Signal Module records now carry generation in
`seriesId`, while their functional variant IDs no longer encode G2. The G2
taxonomy now covers those product types alongside the 2 previously classified
G2 Power Modules. Six G2 Signal Module links were upgraded to MLFB-specific
Siemens URLs, and the manual Classic Product series was corrected to
`S7-1200`. No source integration was performed, and no G5 series was created.

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
place. The current catalog work is centered on safely generalizing the Siemens
validation/mapping pipeline and connecting existing source datasets without
presenting them as active products before controlled verification.
