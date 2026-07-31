@'
# Siemiran Roadmap

## Phase 0 — Foundation

Status: Completed

- Next.js setup
- Tailwind setup
- TypeScript setup
- Feature First architecture
- Base layout
- GitHub backup

## Phase 1 — Project Stabilization

Status: In Progress

- Remove unused duplicate Product type
- Record architecture decisions
- Create project audit tool
- Identify empty placeholder files
- Establish canonical sources of truth
- Validate build, lint and Git status

Exit criteria:

- One Product interface
- No untracked architectural decisions
- Build passes
- Lint passes
- Documentation reflects the real repository

## Phase 2 — Product Data Model

Status: Not Started

- Validate Brand model
- Validate Category model
- Validate Family model
- Correct Series semantics
- Decide whether ProductGroup is required
- Add typed IDs and relations
- Add validation helpers
- Define product document structure
- Define lifecycle values
- Define official data source policy

Exit criteria:

- Taxonomy supports real Siemens products without ambiguity
- No duplicated category or taxonomy source
- At least 5 verified Siemens products can be represented correctly

## Phase 3 — Siemens Data Migration

Status: Not Started

- Extract product records from legacy data
- Normalize Siemens part numbers
- Map products to taxonomy
- Import images and technical documents
- Add lifecycle and availability fields
- Verify data against official sources

Exit criteria:

- First verified Siemens product family migrated
- Data contains no guessed technical specifications
- Products pass validation

## Phase 4 — Reusable Product UI

Status: Not Started

- ProductImage
- ProductBadge
- ProductMeta
- ProductActions
- ProductCard
- ProductSkeleton
- ProductGrid

Exit criteria:

- ProductCard receives Product through props
- No hardcoded product content
- Components support RTL and responsive layouts

## Phase 5 — Product Experience

Status: Not Started

- Products page
- Filters
- Pagination
- Search
- Product details
- Related products
- Document downloads
- Quote request
- Compare

## Phase 6 — Content and SEO

Status: Not Started

- Metadata architecture
- Structured data
- Category SEO pages
- Brand pages
- Family pages
- Technical articles
- Internal linking
- Sitemap

## Phase 7 — Final Experience

Status: Not Started

- Final Home page
- Mega Menu
- Final Footer
- Motion and interactions
- Accessibility
- Performance optimization
- Production deployment
'@ | Set-Content -Encoding UTF8 "docs/ROADMAP.md"

## Products Module

### Foundation

* ✅ Product Types
* ✅ Product Dataset
* ✅ Product Repository
* ✅ Product Validator
* ✅ Product Hook
* ✅ Product Components
* ✅ Featured Products
* ✅ Products Page

### SEO Phase

* ⬜ Dynamic Product Page
* ⬜ generateStaticParams
* ⬜ generateMetadata
* ⬜ Product Schema (JSON-LD)
* ⬜ OpenGraph
* ⬜ Canonical URL

### Catalog Phase

* ⬜ Search
* ⬜ Filter
* ⬜ Sort
* ⬜ Pagination

### UX Phase

* ⬜ Breadcrumb
* ⬜ Related Products
* ⬜ Product Gallery
* ⬜ Datasheet Download
