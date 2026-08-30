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

The active `Product` aggregation contains 37 products:

- 1 manually declared S7-1200 product
- 36 S7-300 CPU source records mapped through validation and the Siemens adapter

These products flow through `data/products.ts`, the Product repository, and the UI.

### Source Data Not Connected to the Application

- S7-300 PS, SM, IM, FM, and CP datasets exist but are DISCONNECTED. The PS
  baseline contains 13 source records: 5 initial standard/outdoor, 4 historical,
  and 4 SIPLUS records.
- S7-1200 CPU, PM, SM, SB, CM, CP, CB, special, and other datasets exist but are
  DISCONNECTED. The PM baseline contains 1 Classic SIMATIC, 2 G2 SIMATIC, and
  2 Classic SIPLUS source records.
- The S7-1200 source files contain 186 unique MLFB declarations.
- Historical and SIPLUS PS/PM source records remain disconnected.
- Disconnected source records are not validated during normal application
  construction and must not be treated as active UI products.
- The verified taxonomy distinguishes the Classic `S7-1200` and `S7-1200 G2`
  series for Power Modules. Broader S7-1200 source taxonomy still requires
  reconciliation before controlled integration.
- No S7-1200 G5 generation has been established.
- The current Siemens validator/adapter contract is coupled primarily to the
  S7-300 CPU source interface.

## Latest Local Quality Verification

- ESLint: PASS
- TypeScript (`tsc --noEmit`): PASS
- Production build: PASS
- Automated tests: NOT ESTABLISHED
- GitHub Actions CI/CD: NOT FOUND
