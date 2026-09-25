# Siemiran — Current Architecture

Baseline: `main` at `b7debb1d9c6b25a787f1cb534247bfba63d001c3`

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
├── copy/           Trusted Product-copy resolver and public DTO boundary
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
invariantly omit the public `Product.lifecycle` property. The copy layer may not
supply, infer, or override lifecycle data.

## Product-copy Resolver and Trust Boundaries

Canonical Product/source/database/adapter data remains English and immutable.
PR #54 (`c690216efc9895866f42586d3686b736da111155`) added the
Product-specific technical-token policy, PR #55
(`25c63e4f7926c782fa9015521734798a9b6f91c1`) added the first five private
Persian Product-copy drafts, and PR #56
(`2d7305e28b183c3f1bde0f6b773fc29ebc619eec`) recorded their exact linguistic
and technical approvals. That Batch 01 state remains unchanged and historical.
PR #58 squash-merged Batch 02 at `2026-09-23T19:42:52Z` as
`e1f844f11e6a29ec14dbe66e1531de37d6700342`; its scope is exactly five
SIMATIC S7-300 fail-safe CPUs with independently reviewed Product-specific
technical-token mappings and current linguistic and technical approvals.
PR #60 (`ac99ce8579d3753a2d4f4aeb6bd22b4fd7f4e514`) corrected the canonical
S7-300 SM321 1BH10 specifications by removing unsupported diagnostics and
interrupt fields and omitting the disputed input-delay claim because official
evidence conflicted; no replacement delay value was verified. PR #61
squash-merged Batch 03 at
`2026-09-25T08:01:51Z` as `b7debb1d9c6b25a787f1cb534247bfba63d001c3`.
Its five private S7-300 SM321 digital-input drafts cover
`6ES7321-1BH02-0AA0`, `6ES7321-1BH10-0AA0`, `6ES7321-1BL00-0AA0`,
`6ES7321-1BP00-0AA0`, and `6ES7321-1CH20-0AA0`, with linguistic and technical
approvals bound to their current content hashes. Technical review used indexed
content from exact-product official Siemens datasheets; direct PDF requests
returned HTTP 403, as the approval notes record. The corrected 1BH10 draft
makes no delay, diagnostics, or interrupt claim. Batch 03 added no
technical-token overrides. Batches 01 and 02 remain unchanged historical work.

The separate private Product-copy registry now contains 15/382 drafts,
with linguistic approvals at 15/382, technical approvals at 15/382, and 15
current dual approvals. Complete coverage is missing for 367 Products. The
technical-token overrides cover 10 Products, 20 assignments, and 7 unique
strings, while the global allowlist remains empty. Publication remains globally
disabled, activation is invalid, no activation capability exists, and active
coverage remains 0/382. Approvals from Batches 01-03 do not authorize
publication or partial activation; activation and publication remain blocked
until all 382/382 Products have current dual approvals.
The next implementation phase is another controlled private drafting batch,
not activation. The resolver remains the sole public Product-copy source for
Product listing, cards and meta, featured and related Products, detail
header/body, search, metadata/OpenGraph/Twitter, Product JSON-LD, comparison,
and inquiry identity.

```text
canonical Product + optional approved Persian overlay
  → trusted server-only resolver and renderer
  → detached, deeply frozen public DTO
  → UI / search / comparison / inquiry identity

trusted resolved copy
  → server-only metadata and Product JSON-LD
```

While publication is disabled, both FA and EN Product descriptions
intentionally resolve to canonical English/LTR. Persian UI localization is a
separate concern and remains active. The resolver has no partial Persian-copy
fallback.

The trusted server-only boundary contains registry and reviews, validation and
cryptography, technical-token policy, publication and capability handling,
resolver authenticity, the trusted Product renderer, metadata, and Product
JSON-LD. Client boundaries receive inert public DTOs. Public Product records
omit `shortDescription`, `description`, `seoTitle`, and `seoDescription`; no
private review, evidence, hash, registry, capability, or publication state is
client-reachable.

The boundary fails closed:

- Original Product descriptors are validated before value traversal, and every
  required or optional Product field is exhaustively bound to policy.
- The resolver receives a trusted full Product snapshot, not the original
  Product object.
- Trusted and public records are independently detached and deeply frozen.
- Public renderers reject malformed input instead of rendering partial or
  untrusted content.
- Activation capabilities and resolved-copy objects are runtime authenticated.
- Activation requires exactly 382/382 canonical Product IDs, with no missing,
  extra, or duplicate entries; every entry needs current linguistic and
  technical approvals bound to its deterministic content hash.
- Brand validation preserves `زیمیران` in Persian and `SIEMIRAN` in English;
  the incorrect active Persian token `سیمیران` has zero occurrences.
- Technical segments retain LTR/English bidi isolation. MLFBs, Product IDs,
  slugs, part numbers, official model/family names, protocols, standards,
  values, units, and URLs remain canonical and untranslated.
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
- Product search uses canonical title and part number plus public DTO search
  text.
- Comparison persists validated Product IDs only under
  `siemiran:product-comparison`; legacy stored Product objects migrate safely to
  ID storage.
- Product detail pages are generated from repository data.
- Inquiry client data contains only Product `id`, `title`, and `partNumber`.
- The inquiry API performs request parsing and validation but has no connected
  persistence or delivery provider.
- Product-copy registry, reviews, validation, cryptography, policy,
  publication/capability, resolver authenticity, trusted rendering, metadata,
  and Product JSON-LD remain behind their server-only boundary.

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
