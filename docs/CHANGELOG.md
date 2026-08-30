# Siemiran — Changelog

This file records completed repository changes. Connection status refers to the
implementation on the current `main` branch.

## 2026-08-30 — Siemens Power Supply Historical/SIPLUS Completeness

### Completed

- Added 4 historical S7-300 PS 307 revisions with Siemens-stated successor relationships.
- Added 4 SIPLUS S7-300 PS records with record-specific lifecycle, base-product,
  environmental, and successor metadata.
- Added 2 active Classic SIPLUS S7-1200 PM 1207 records.
- Kept all historical and SIPLUS PS/PM records disconnected from Product
  aggregation and the UI.

## 2026-08-29 — Siemens Power Supply Source Baseline

### Completed

- Added 5 verified S7-300 Power Supply source records covering PS 305, PS 307,
  and PS 307 Outdoor.
- Added 3 verified S7-1200 Power Module source records: 1 Classic PM 1207 and 2
  G2 PM 1207 variants, including the EX-certified model.
- Added the minimum verified taxonomy for S7-300 Power Supply and S7-1200
  Classic/G2 Power Module source classification.
- Kept all new PS/PM records disconnected from Product aggregation and the UI.
- Corrected the active baseline to 36 mapped S7-300 CPUs plus 1 manual S7-1200
  Product, for 37 active Products total.
- Recorded that an S7-1200 G5 generation is not established.

## 2026-08-29 — Current-State Documentation Synchronization

### Completed

- Audited the current Git, application, Siemens data, quality, and documentation
  state.
- Synchronized project documentation with the current implementation.
- Corrected comparison documentation to record page integration, table, and
  localStorage persistence as implemented.
- Distinguished active Product data from disconnected Siemens source datasets.
- Recorded the partial inquiry backend, missing automated-test baseline, and
  absence of GitHub Actions CI/CD.

## S7-1200 Source Database Expansion

The following source datasets were added historically. At the current baseline,
they remain DISCONNECTED from active Product aggregation and the UI.

- `2b9e885` — Added S7-1200 communication boards
- `c00af82` — Added S7-1200 signal boards
- `b3281e7` — Added S7-1200 companion modules
- `81bd9e2` — Added S7-1200 communication modules
- `14bafe4` — Added S7-1200 special and technology modules
- `be3b4e7` — Added S7-1200 communication processors
- `251afd0` — Added S7-1200 signal modules
- `2882774` — Added the S7-1200 CPU database

Together, the current S7-1200 files contain 186 unique MLFB declarations. Their
addition to the repository did not connect them to the validation, adapter,
repository, or UI pipeline.

## S7-300 Source Database Expansion

- `ce1cd47` — Added S7-300 interface modules
- `5f43ab3` — Added S7-300 function modules
- `bc51b08` — Added S7-300 communication processors
- `088c1c6` — Completed the S7-300 signal module baseline
- `2249f9d` — Normalized SM335 variant classification

These datasets remain DISCONNECTED at the current baseline. The previously
completed S7-300 CPU source dataset is the Siemens dataset currently connected
through validation and adapter mapping to active Products.

## Comparison Integration

### Completed

- Product comparison types and utilities
- Compare controls and comparison selection bar
- Product comparison route and view
- Comparison table with dynamic specification rows and difference highlighting
- Comparison page state integration
- Browser `localStorage` persistence
- Product catalog connection to comparison state

## Product Catalog Milestones

### Pagination

- Pagination engine and hook
- Product pagination component
- Page URL synchronization
- Page reset after filter, search, or sorting changes

### Filtering and Sorting

- Category, family, series, and product-type filters
- Active filter display and clear controls
- Product sorting

### Search

- Product search UI
- Product toolbar
- Search URL parameters
- Client-side catalog integration
