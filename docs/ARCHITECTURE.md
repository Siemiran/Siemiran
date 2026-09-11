# Siemiran — Current Architecture

Baseline: `main` at `c37272e4da8e7a7f509b917eacff833fea6b58b9`

## Repository Structure

```text
Siemiran/
├── apps/
│   └── web/
│       ├── app/
│       │   └── [locale]/           Next.js App Router route tree
│       ├── public/                 Static assets
│       └── src/
│           ├── components/         Shared UI and navigation
│           └── features/           Feature-first application code
├── docs/                            Project documentation
└── legacy/                          Read-only legacy implementation
```

The application uses Next.js 16.2.11 App Router, React 19.2.4, TypeScript 5,
and `next-intl` 4.13.4. Current feature directories under
`apps/web/src/features` are `products`, `blog`, and `contact`.

## Application Routes

`apps/web/app/[locale]` currently contains:

- Home page
- Product listing route
- Dynamic product detail route
- Product comparison route
- Inquiry API route
- Root layout and global styling

Persian (`fa`) is the unprefixed default locale, while English (`en`) is under
`/en`. Locale detection is disabled for deterministic routing. The locale-aware
one-click switch preserves the equivalent route, Product slug, and query
string. Persian documents use `lang="fa"` and RTL direction; English documents
use `lang="en"` and LTR direction. English remains temporarily
`noindex, follow`; reciprocal hreflang and localized sitemap coverage are
deferred.

## Product Feature

```text
apps/web/src/features/products/
├── components/     Product-specific UI
├── comparison/     Comparison types and utilities
├── copy/           Inactive Product-copy infrastructure
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
- Canonical Siemens source data remains English.
- `data/products.ts` is the canonical Product aggregation.
- `repository/product.repository.ts` remains the canonical application access
  layer for Product data.
- Routes and components consume Product data through the repository.
- Product-specific UI remains inside the product feature; reusable application
  UI belongs under `src/components`.

## Current Canonical Data Flow

All active Siemens Product groups use the current application path:

```text
canonical Siemens source
  → validators and adapters
  → Product aggregation
  → Product repository
  → current routes and UI
```

The aggregation contains 382 canonical Products. S7-300 coverage is 196/196
across CPU, Power Supply, Signal Module, Interface Module, Communication
Processor, and Function Module. S7-1200 coverage is 186/186 across all verified
Classic and G2 source groups. Every active Siemens Product group is connected
through validation/adapters and aggregation to the Product repository.

Ten established S7-300 Products have unverified lifecycle provenance and
invariantly omit the public `Product.lifecycle` property. The inactive copy
layer may not supply, infer, or override lifecycle data.

## Inactive Persian Product-copy Infrastructure

PR #50 added a server-only foundation under
`apps/web/src/features/products/copy/`. It defines explicit `text` and
`technical` segments, validation, deterministic serialization and content
hashing, an activation capability, immutable validated publication snapshots,
a locale resolver, and rendering support.

The intended future presentation path is:

```text
canonical Product
  → locale resolver
  → approved Persian overlay
  → UI / Metadata / JSON-LD / search consumers
```

Only the inactive infrastructure for this second path is implemented. No public
Product-copy consumer is wired to it, the draft registry contains 0 entries,
and publication is disabled. Consequently both locales still display canonical
English Product descriptions; no Persian Product copy has been drafted or
published.

The boundary fails closed:

- Registry and validation inputs are server-only and runtime validated.
- Validated publication snapshots are cloned, deeply frozen, and isolated from
  subsequent registry mutation.
- Activation capabilities and resolved-copy objects are runtime authenticated.
- Activation requires exactly 382/382 canonical Product IDs, with no missing,
  extra, or duplicate entries.
- Every entry requires current linguistic and technical approvals bound to its
  deterministic content hash.
- Brand validation preserves `زیمیران` in Persian and `SIEMIRAN` in English.
- Technical identifiers, MLFBs, part numbers, Product/model names, protocols,
  standards, values, units, and URLs remain canonical English tokens and are
  bidi-isolated at presentation.
- The exact ten canonical lifecycle omissions remain an enforced invariant.
- Mutation, malformed input, timestamps, normalization, brand, technical-token,
  lifecycle, coverage, capability, and resolved-copy boundaries are validated.

Run the dedicated harness from `apps/web` with:

```text
npm.cmd run validate:product-copy
```

## Client State and Server Boundaries

- Search, filters, sorting, and pagination are reflected in product-list URL
  parameters.
- Comparison selections are client state persisted in browser `localStorage`.
- Product detail pages are generated from repository data.
- The inquiry API performs request parsing and validation but has no connected
  persistence or delivery provider.
- Product-copy registry, validation, publication, and resolution remain behind
  their server-only boundary.

## Verified Local Production-runtime Caveat

- Standard `next start` with no hostname option passes.
- `next start --hostname localhost` passes when requested through `localhost`.
- Explicit `next start --hostname 127.0.0.1` triggers a Next.js rewrite-origin
  mismatch for unprefixed default-locale routes in the verified environment.
- No proxy or other routing workaround and no dependency downgrade were added
  because a supported invocation passes.
- This framework/runtime-specific caveat does not authorize changing
  `localePrefix: "as-needed"` or prefixing Persian URLs.

## Architectural Constraints

- Feature First
- Repository Pattern
- Single Product Interface
- Verified Product Data
- Build must pass
- Documentation must track implementation
- `legacy/` is read-only
