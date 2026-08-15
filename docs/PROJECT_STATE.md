# Siemiran — Project State

Current Version:
v1.1 Comparison Core

Status:
Production Stable / Comparison Integration Pending

Last Update:
2026-08-12

--------------------------------------------------

STACK

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- ESLint
- App Router

--------------------------------------------------

ARCHITECTURE

Feature First Architecture

apps/web/src/features

Repository Pattern

Single Product Interface

--------------------------------------------------

CANONICAL PRODUCT HIERARCHY

Brand
 └── Category
      └── Family
           └── Series
                └── Product Type
                     └── Product

--------------------------------------------------

PRODUCT SYSTEM

✔ Product Dataset

✔ Product Repository

✔ Product Listing

✔ Dynamic Product Pages

✔ Static Product Generation

--------------------------------------------------

PRODUCT EXPERIENCE

✔ Product Gallery

✔ Image Zoom / Lightbox

✔ Technical Specifications

✔ Related Products

✔ Download Architecture

--------------------------------------------------

SEO

✔ Product Metadata

✔ Product JSON-LD

✔ Breadcrumb

✔ Breadcrumb JSON-LD

--------------------------------------------------

CATALOG

✔ Product Search

✔ URL Search Params

✔ Category Filter

✔ Family Filter

✔ Series Filter

✔ Product Type Filter

✔ Active Filters

✔ Clear Filters

✔ Sorting

✔ Pagination

### Verified Siemens Catalog

- Siemens PLC source validation is active.
- Verified Siemens taxonomy contract is active.
- Siemens PLC records pass source validation before adapter mapping.
- S7-300 Signal Module verification is active.
- Completed S7-300 Signal Module families:
  - SM321 — Digital Input
  - SM322 — Digital Output
  - SM323 — Digital I/O
  - SM327 — Programmable Digital I/O
  - SM331 — Analog Input
  - SM332 — Analog Output
  - SM334 — Analog I/O
  - SM335 — High-Speed Analog I/O
- S7-300 Signal Module records are maintained as verified source records before adapter mapping.
- Historical and lifecycle variants are preserved where officially verifiable.
- Additional S7-300 product classes must be added only after official Siemens verification.

--------------------------------------------------

COMPARISON

✔ Comparison Types

✔ Comparison Utilities

✔ Comparison Hook

✔ Compare Button

✔ Comparison Bar

◐ Comparison Page Integration Pending

--------------------------------------------------

QUALITY

✔ ESLint Passing

✔ TypeScript Passing

✔ Production Build Passing

--------------------------------------------------

CURRENT MILESTONE

v1.1 Product Comparison Integration

--------------------------------------------------

NEXT

- Connect comparison state to comparison page
- Comparison URL / persistence
- Comparison table
- Responsive comparison UX