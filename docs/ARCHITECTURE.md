# Siemiran — Current Architecture

Baseline: `main` at `2b9e8857108bfc6a5e4e3929ac06fefdf32041d3`

## Repository Structure

```text
Siemiran/
├── apps/
│   └── web/
│       ├── app/                    Next.js App Router routes
│       ├── public/                 Static assets
│       └── src/
│           ├── components/         Shared UI and navigation
│           └── features/           Feature-first application code
├── docs/                            Project documentation
└── legacy/                          Read-only legacy implementation
```

Current feature directories under `apps/web/src/features` are `products`,
`blog`, and `contact`.

## Application Routes

`apps/web/app` currently contains:

- Home page
- Product listing route
- Dynamic product detail route
- Product comparison route
- Inquiry API route
- Root layout and global styling

## Product Feature

```text
apps/web/src/features/products/
├── components/     Product-specific UI
├── comparison/     Comparison types and utilities
├── data/           Product aggregation
├── database/       Taxonomy and manufacturer source records
├── filters/        Catalog filtering functions
├── hooks/          Catalog, URL, pagination, and comparison state
├── lib/            Validation, SEO, schema, relation, and recommendation logic
├── pagination/     Pagination calculation
├── repository/     Product read access
├── sections/       Product page sections
├── sorting/        Product sorting
└── types/          Canonical Product and download interfaces
```

## Product Access Rules

- `Product` in `types/product.types.ts` is the canonical UI-facing interface.
- `data/products.ts` is the active Product aggregation.
- `repository/product.repository.ts` is the application access layer for
  Product data.
- Routes and components consume Product data through the repository.
- Product-specific UI remains inside the product feature; reusable application
  UI belongs under `src/components`.

## Current Data Flow

The intended current flow is:

```text
Siemens source records
  → validation and adapter layer where connected
  → Product interface
  → product data aggregation
  → Product repository
  → routes and UI
```

This complete flow currently applies to the S7-300 CPU source dataset only.
`siemens/plc.ts` exports the S7-300 CPU contract and records, which are validated
and mapped by `plc.validator.ts` and `plc.adapter.ts` before aggregation.

S7-300 SM, IM, FM, and CP source files and all current S7-1200 source files are
DISCONNECTED. They have separate source interfaces and are not imported by the
active aggregation. A generalized Siemens module pipeline does not yet exist.

## Client State and Server Boundaries

- Search, filters, sorting, and pagination are reflected in product-list URL
  parameters.
- Comparison selections are client state persisted in browser `localStorage`.
- Product detail pages are generated from repository data.
- The inquiry API performs request parsing and validation but has no connected
  persistence or delivery provider.

## Architectural Constraints

- Feature First
- Repository Pattern
- Single Product Interface
- Verified Product Data
- Build must pass
- Documentation must track implementation
- `legacy/` is read-only
