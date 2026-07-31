@'
# Architecture Decision Log

## ADR-001 — Feature First Architecture

Status: Accepted

Product-related types, data, helpers and components must live inside:

apps/web/src/features/products

Reason:

Product functionality is a major independent domain and must remain isolated and reusable.

---

## ADR-002 — Canonical Product Type

Status: Accepted

Canonical file:

apps/web/src/features/products/types/product.types.ts

No second Product interface may be created elsewhere.

---

## ADR-003 — Frozen Product Hierarchy

Status: Accepted

Brand → Category → Family → Series → Product

Any change to this hierarchy requires an explicit architecture review.

---

## ADR-004 — Legacy Policy

Status: Accepted

The legacy directory is read-only.

It may be used for:

- UI reference
- feature discovery
- data migration
- content extraction

It must never be edited or imported directly into production runtime code.

---

## ADR-005 — Siemens-First Multi-Brand Strategy

Status: Accepted

Siemens is the default and primary brand.

The architecture must remain capable of supporting additional brands without duplicating product features.

---

## ADR-006 — Verified Product Data Only

Status: Accepted

Technical specifications, documents and lifecycle data must not be guessed.

Official manufacturer sources have priority.

Legacy data may be imported only after validation.

---

## ADR-007 — UI Development Order

Status: Accepted

Data Model → Verified Data → Reusable Components → Pages → Search/Compare → SEO

Pages must not be finalized before the underlying data model is stable.
'@ | Set-Content -Encoding UTF8 "docs/DECISIONS.md"