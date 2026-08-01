# Siemiran — Project State

**Version:** v0.3 Products Foundation

**Last Updated:** 2026-07-31

---

# Vision

Siemiran is an enterprise-grade industrial automation platform focused on Siemens products, designed with scalability, maintainability, SEO, and future multi-brand expansion in mind.

The platform is intended to become:

* Siemens-first
* Multi-brand ready
* Enterprise architecture
* SEO-first
* High performance
* Scalable
* Maintainable
* Data-driven
* Ready for quotation, comparison and technical documentation

---

# Current Architecture

## Framework

* Next.js 16
* React 19
* TypeScript 5
* Tailwind CSS v4

## Architecture

Feature First Architecture

```
src/
    features/
    components/
    constants/
    types/
```

The legacy implementation is frozen and used only as a visual/design reference.

---

# Canonical Product Model

Single source of truth:

```
src/features/products/types/product.types.ts
```

No duplicate Product interfaces are allowed anywhere in the project.

---

# Canonical Taxonomy

Current hierarchy:

```
Brand
    ↓
Category
    ↓
Family
    ↓
Series
    ↓
Product
```

This hierarchy is frozen unless a documented architectural decision changes it.

---

# Current Completed Work

## Foundation

* ✅ Next.js project
* ✅ Tailwind setup
* ✅ TypeScript strict mode
* ✅ Feature First architecture
* ✅ Git repository
* ✅ Documentation structure

---

## Layout

* ✅ Header
* ✅ Hero
* ✅ Banner Strip
* ✅ Pillars
* ✅ Base Layout

---

## Products Module

Completed:

* ✅ Product Types
* ✅ Product Dataset
* ✅ Product Repository
* ✅ Product Validator
* ✅ Product Hooks
* ✅ Product Components
* ✅ Product Card
* ✅ Featured Products Section
* ✅ Products Listing Page
* ✅ Home Page Integration

---

## Build

Current status:

* ✅ Build Passing
* ✅ TypeScript Passing
* ✅ Repository Stable

---

# Current Work

Active milestone:

```
Dynamic Product Pages
```

Current target:

```
/products/[slug]
```

---

# Next Milestone

SEO Foundation

Tasks:

* Dynamic Product Page
* generateStaticParams
* generateMetadata
* JSON-LD
* OpenGraph
* Canonical URLs

---

# Frozen Rules

These rules may NOT be broken.

1. Feature First Architecture
2. No duplicated Product interfaces
3. Repository is the only data access layer
4. Reusable UI components only
5. TypeScript Strict
6. Build must remain green
7. Documentation must be updated before closing every milestone

---

# Repository Status

Branch:

```
main
```

Current milestone:

```
v0.3-products-foundation
```

Status:

Stable

---

# Definition of Done

A feature is considered complete only when:

* Build passes
* TypeScript passes
* Components are reusable
* Documentation updated
* Git committed
* Architecture preserved

---

# Current Priority

1. Dynamic Product Pages
2. SEO
3. Search
4. Filters
5. Pagination
6. Product Experience
7. Admin Platform
