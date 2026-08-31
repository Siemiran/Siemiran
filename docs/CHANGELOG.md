# Siemiran — Changelog

This file records completed repository changes. Connection status refers to the
implementation on the current `main` branch.

## 2026-08-31 — Siemens S7-1200 Classic SM/SB Variant & Taxonomy Normalization

### Completed

- Normalized 12 Classic Signal Module and 12 Classic Signal Board SIPLUS
  composite variants to their evidence-backed functional/model variants.
- Added Classic Signal Module taxonomy with 8 functional variants and Classic
  Signal Board taxonomy with 11 model-specific variants.
- Made Classic SM taxonomy-valid 38/38 and Classic SB taxonomy-valid 23/23 while
  keeping both datasets disconnected.
- Added no Product exposure: the active Product total remains 132 and S7-1200
  remains 83/186 connected.
- Kept the existing SM/SB adapters and G2 source/taxonomy semantics unchanged.
- Intentionally left the `6AG1223-1QH32-4XB0` AC-title versus 24 V DC
  specification discrepancy untouched pending separate verification.

## 2026-08-30 — Siemens S7-1200 G2 Signal Board Integration

### Completed

- Connected all 9 verified G2 Signal Board variants through the active Product
  aggregation.
- Added one explicit shared S7-1200 Signal Board normalizer while preserving
  physical G2 source separation and keeping all 23 Classic Signal Boards
  disconnected.
- Preserved the existing 123 Products and increased the active total from 123
  to 132.
- Increased connected S7-1200 source records from 74 to 83 of 186, leaving 103
  disconnected.
- Made no source, taxonomy, Product interface, or generic pipeline changes and
  connected no other dataset.

## 2026-08-30 — Siemens S7-1200 G2 Signal Module Integration

### Completed

- Connected all 9 G2 Signal Module records: 2 digital-output, 2 digital-io, 3
  analog-input, 1 analog-output, and 1 analog-io.
- Added one explicit shared S7-1200 Signal Module normalizer while preserving
  physical G2 source separation and keeping Classic SM disconnected.
- Preserved the existing 114 Products and increased the active total from 114
  to 123.
- Increased connected S7-1200 source records from 65 to 74 of 186, leaving 112
  disconnected.
- Made no source, taxonomy, Product interface, or generic pipeline changes and
  connected no other dataset.

## 2026-08-30 — Siemens S7-1200 Classic CPU Canonical Migration

### Completed

- Connected all 50 Classic S7-1200 CPU source records: 41 compact and 9
  fail-safe.
- Removed the overlapping manual Product and replaced `6ES7214-1AG40-0XB0`
  with its canonical source-backed representation.
- Added one permanent redirect from the former manual Product slug to the
  canonical MLFB-derived slug.
- Preserved the existing 64 non-overlapping Products and increased the active
  total from 65 to 114.
- Made no manufacturer source, taxonomy, adapter, Product interface, generic
  pipeline, repository, dynamic Product page, or comparison-hook changes.
- Connected no other Siemens dataset.

## 2026-08-30 — Siemens S7-1200 Classic CPU Variant Normalization

### Completed

- Normalized 28 Classic SIPLUS CPU records to functional `compact` variants and
  3 SIPLUS fail-safe records to `fail-safe`.
- Added the legitimate Classic CPU `fail-safe` taxonomy entry.
- Established final Classic CPU variants of 41 compact and 9 fail-safe, with
  all 50 source records passing taxonomy validation.
- Added or removed no source records and exposed no new Products.
- Kept Classic CPU disconnected and the active Product total at 65.

## 2026-08-30 — Siemens S7-1200 G2 CPU Integration

### Completed

- Connected all 10 S7-1200 G2 CPU records: 6 compact and 4 fail-safe.
- Added an explicit S7-1200 CPU specification normalizer while preserving
  physical G2 source separation and `seriesId = S7-1200 G2`.
- Preserved the existing 55 Products and increased the active total from 55 to
  65.
- Kept the 50-record Classic CPU source disconnected and preserved the manual
  Classic Product pending controlled MLFB deduplication and migration.
- Made no taxonomy, Product interface, generic Siemens infrastructure, or
  manufacturer source-record changes.
- Connected no other S7-1200 dataset.

## 2026-08-30 — Siemens S7-1200 Power Module Integration

### Completed

- Connected 3 Classic and 2 G2 S7-1200 Power Module records through shared
  Siemens validation and generic Product mapping.
- Added one explicit Power Module specification normalizer for both compatible
  source contracts while preserving physical Classic/G2 source separation.
- Preserved the generation distinction through `seriesId` and kept source
  lineage metadata source-only.
- Preserved the existing 50 Products and increased the active total from 50 to
  55.
- Made no taxonomy, Product interface, generic Siemens infrastructure, or
  manufacturer source-record changes.
- Connected no other S7-1200 dataset.

## 2026-08-30 — Siemens S7-300 Power Supply Integration

### Completed

- Connected all 13 verified S7-300 Power Supply source records through shared
  Siemens validation and generic Product mapping.
- Added explicit Power Supply specification normalization while keeping MLFB
  lineage metadata source-only.
- Preserved all 36 existing mapped S7-300 CPU Products and increased the active
  Product aggregation from 37 to 50.
- Included the historical and SIPLUS Power Supply records in the controlled
  connected dataset.
- Connected no other Siemens dataset and made no taxonomy, Product interface,
  or manufacturer source-record changes.

## 2026-08-30 — Siemens PLC Pipeline Generalization

### Completed

- Added a neutral Siemens PLC source base contract for shared identity,
  taxonomy, lifecycle, description, and official source validation.
- Decoupled the Siemens validator from the S7-300 CPU source interface.
- Separated common Product mapping from explicit S7-300 CPU specification
  normalization without changing existing mapped output.
- Preserved the canonical Product interface and the active total of 37
  Products.
- Added no new manufacturer source integration or Product exposure.

## 2026-08-30 — Siemens S7-1200 G2 Structural Reclassification

### Completed

- Reclassified 28 existing S7-1200 G2 source records: 10 CPU, 9 Signal Board,
  and 9 Signal Module records.
- Expanded the G2 taxonomy and replaced generation-prefixed SB/SM variants
  with functional variant IDs.
- Upgraded six G2 Signal Module sources to MLFB-specific Siemens Industry Mall
  URLs.
- Physically separated all 30 G2 source records into `s7-1200/g2/`: 10 CPU, 9
  Signal Board, 9 Signal Module, and 2 Power Module records.
- Retained 50 CPU, 23 Signal Board, 38 Signal Module, and 3 Power Module records
  in the root Classic source files.
- Corrected the manual Classic S7-1200 Product series classification.
- Kept the S7-1200 source count at 186 and the active Product count at 37.
- Added no source aggregation or Product integration.

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
