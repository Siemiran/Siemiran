# Siemiran — Changelog

This file records completed repository changes. Connection status refers to the
implementation at baseline commit
`2b9e8857108bfc6a5e4e3929ac06fefdf32041d3`.

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

Together, the current S7-1200 files contain 181 unique MLFB declarations. Their
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
