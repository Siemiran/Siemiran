@'
# Siemiran — Current Project State

Last updated: 2026-07-31

## Project Goal

Build a Persian enterprise-grade industrial automation platform with Siemens as the primary brand.

The project must be:

- Siemens-first
- Multi-brand ready
- SEO-first
- High performance
- Scalable
- Maintainable
- Based on verified product data
- Suitable for product discovery, technical reference, comparison and quotation

## Frozen Architecture Rules

1. Never edit the legacy directory.
2. Use Feature First Architecture.
3. Never duplicate reusable components.
4. Never bypass TypeScript.
5. All products must use the canonical Product type.
6. Database hierarchy is frozen:

Brand → Category → Family → Series → Product

## Canonical Product Type

apps/web/src/features/products/types/product.types.ts

Do not create another Product interface outside this feature.

## Design Reference

The official design and migration reference is:

legacy/index.html

Old folders such as html13 are not project references.

## Current Completed Work

- Next.js application setup
- Tailwind CSS setup
- Base Header
- Base Hero
- BannerStrip
- Pillars
- Feature First project structure
- Product type
- Initial product database structure
- Initial brands
- Initial categories
- Initial Siemens families
- Initial taxonomy
- GitHub backup

## Current Known Issues

- Product data is empty.
- ProductCard still contains hardcoded demo data.
- Footer is still empty.
- Several placeholder components are empty.
- Siemens taxonomy is incomplete.
- series.ts currently mixes Series with Product Groups.
- categories are duplicated between taxonomy.ts and categories.ts.
- Documentation files are incomplete.
- The legacy Product interface must remain deleted if no imports use it.

## Current Phase

Project Stabilization and Product Data Foundation

## Do Not Start Yet

- Final Products Page
- Final Product Grid
- Advanced Search
- Product Comparison
- Product Popup
- Final Footer
- Admin Panel

These features must wait until the product data model and taxonomy are validated.
'@ | Set-Content -Encoding UTF8 "docs/PROJECT_STATE.md"

## Project Status (v0.3)

### Completed

* Next.js App Router architecture
* Product feature modularization
* Product dataset
* Product validation
* Product repository (functional)
* Product hooks
* Product reusable UI components
* Featured Products section
* Products listing page
* Home page integration
* Clean component exports
* Stable build pipeline

### Current

* Dynamic Product Page implementation in progress (`/products/[slug]`)

### Build

Status: ✅ Passing

### Git

Stable milestone:

`v0.3-products-foundation`
