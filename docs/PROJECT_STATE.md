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

The active `Product` aggregation contains 170 products:

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

These products flow through `data/products.ts`, the Product repository, and the UI.

### Source Data Not Connected to the Application

- S7-300 SM, IM, FM, and CP datasets exist but are DISCONNECTED.
- The 38-record Classic S7-1200 Signal Module source is source-backed,
  taxonomy-valid 38/38, and CONNECTED through the unchanged shared Signal
  Module adapter. The 23-record Classic Signal Board source remains
  DISCONNECTED, normalized to 11 model-specific variants, and validates 23/23.
  SIPLUS environmental edition remains source evidence rather than a
  functional/model `variantId`. S7-1200 CM, CP, CB, special, and other datasets
  also remain disconnected.
- All 50 Classic CPU records are taxonomy/validation-ready after normalizing
  their functional variants to 41 `compact` and 9 `fail-safe`. SIPLUS remains
  environmental source evidence in MLFBs, titles, and descriptions rather than
  a functional `variantId`.
- All 50 Classic CPUs are source-backed and connected. The source-backed
  `6ES7214-1AG40-0XB0` Product replaces the former manual declaration, and a
  permanent redirect preserves its old `/products/cpu-1214c-dc-dc-dc` URL.
- The 9 G2 and 38 Classic Signal Modules are connected through one unchanged
  shared SM normalizer. Physical source separation remains preserved.
- The 9 G2 Signal Boards are connected through one shared SB normalizer that
  structurally supports the compatible Classic contract without connecting it.
  Physical G2 source separation remains preserved, and all 23 Classic Signal
  Boards remain disconnected.
- 121 of 186 S7-1200 source records are connected: 50 Classic CPUs, 10 G2 CPUs,
  5 Power Modules, 9 G2 Signal Modules, 38 Classic Signal Modules, and 9 G2
  Signal Boards. The remaining 65 are disconnected.
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
- Task N connects all 38 Classic Signal Modules without changing source,
  taxonomy, adapters, or other datasets. The active Product total is 170 and
  S7-1200 is 121/186 connected with 65 disconnected.
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
  Classic/G2 Power Module and CPU arrays, both Signal Module arrays, and the G2
  Signal Board array are
  connected; all other Siemens source datasets remain disconnected, and the
  active Product count is 170.

## Latest Local Quality Verification

- ESLint: PASS
- TypeScript (`tsc --noEmit`): PASS
- Production build: PASS
- Automated tests: NOT ESTABLISHED
- GitHub Actions CI/CD: NOT FOUND
