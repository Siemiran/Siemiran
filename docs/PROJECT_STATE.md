# Siemiran — Project State

## Current Baseline

- Status: Active Development
- Documentation synchronized: 2026-08-30
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

The active `Product` aggregation contains 55 products:

- 1 manually declared Classic S7-1200 product, now classified with
  `seriesId = S7-1200`
- 36 S7-300 CPU source records mapped through validation and the Siemens adapter
- 13 S7-300 Power Supply source records mapped through the shared validator,
  generic Product mapper, and explicit Power Supply specification normalizer
- 3 S7-1200 Classic Power Module source records mapped through validation and
  the explicit S7-1200 Power Module specification normalizer
- 2 S7-1200 G2 Power Module source records mapped through the same normalizer,
  with generation preserved by `seriesId = S7-1200 G2`

These products flow through `data/products.ts`, the Product repository, and the UI.

### Source Data Not Connected to the Application

- S7-300 SM, IM, FM, and CP datasets exist but are DISCONNECTED.
- S7-1200 CPU, SM, SB, CM, CP, CB, special, and other datasets exist but are
  DISCONNECTED.
- The S7-1200 source files contain 186 unique MLFB declarations.
- `S7-1200 G2` is a distinct series under the S7-1200 family. Existing G2
  classification covers 10 CPU, 9 Signal Board, and 9 Signal Module records;
  the 2 G2 Power Module records were already classified in that series.
- G2 manufacturer data is physically separated under `s7-1200/g2/`, containing
  30 records: 10 CPU, 9 Signal Board, 9 Signal Module, and 2 Power Module. The
  root Classic files retain 50 CPU, 23 Signal Board, 38 Signal Module, and 3
  Power Module records. The Classic and G2 Power Module source files remain
  physically separated while both are connected through one explicit normalizer.
- Historical and SIPLUS S7-300 Power Supply records and the Classic SIPLUS
  S7-1200 Power Module records are included in their controlled connected datasets.
- Disconnected source records are not validated during normal application
  construction and must not be treated as active UI products.
- The verified taxonomy distinguishes the Classic `S7-1200` and `S7-1200 G2`
  series and now covers the structurally classified G2 CPU, Signal Board,
  Signal Module, and Power Module variants.
- No S7-1200 G5 generation has been established.
- The Siemens validation boundary now uses a neutral PLC source structural
  contract for identity, taxonomy, lifecycle, descriptions, and official
  source URLs.
- Common Siemens Product mapping is separated from explicit product-type
  specification normalization. S7-300 CPU, S7-300 Power Supply, and S7-1200
  Classic/G2 Power Module are the only connected manufacturer source arrays;
  all other Siemens source datasets remain disconnected, and the active Product
  count is 55.

## Latest Local Quality Verification

- ESLint: PASS
- TypeScript (`tsc --noEmit`): PASS
- Production build: PASS
- Automated tests: NOT ESTABLISHED
- GitHub Actions CI/CD: NOT FOUND
