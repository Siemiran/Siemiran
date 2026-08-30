# Siemiran — Product Database

Repository source of truth: current `main` branch

## Canonical Hierarchy

```text
Brand
→ Category
→ Family
→ Series
→ Product Type
→ Product / Variant
```

The canonical UI-facing interface is
`apps/web/src/features/products/types/product.types.ts`.

The active Product aggregation is
`apps/web/src/features/products/data/products.ts`.

Product reads are exposed through
`apps/web/src/features/products/repository/product.repository.ts`.

## Current Active Dataset

The application currently aggregates 114 Products:

- 36 mapped S7-300 CPU Products
- 13 mapped S7-300 Power Supply Products
- 3 mapped S7-1200 Classic Power Module Products
- 2 mapped S7-1200 G2 Power Module Products
- 10 mapped S7-1200 G2 CPU Products
- 50 mapped S7-1200 Classic CPU Products

Only records included by `data/products.ts` reach the Product repository and UI.
The presence of a manufacturer source file does not make its records active
application data.

## Siemens Database Layout

Manufacturer source data is under:

`apps/web/src/features/products/database/siemens/`

The current shared Siemens files are:

- `plc.ts`: defines the neutral Siemens PLC source identity, taxonomy, and
  lifecycle boundary and exports the records currently connected to the
  pipeline
- `plc.validator.ts`: validates connected records against that shared
  structural boundary
- `plc.adapter.ts`: maps common validated fields into `Product` and requires an
  explicit product-type specification normalizer
- `verified-taxonomy.ts`: verified Siemens taxonomy contract used by validation

## S7-300 Source Data

| Source class | Records | Connection status |
| --- | ---: | --- |
| CPU | 36 | CONNECTED |
| Power Supply (PS) | 13 | CONNECTED |
| Signal Module (SM) | 66 | DISCONNECTED |
| Interface Module (IM) | 7 | DISCONNECTED |
| Function Module (FM) | 32 | DISCONNECTED |
| Communication Processor (CP) | 43 | DISCONNECTED |

S7-300 CPU records flow through the shared Siemens validator and their explicit
CPU normalizer. The 13 S7-300 Power Supply records use the same validator and
generic common Product mapper with an explicit PS specification normalizer.
Both datasets enter active Product aggregation, the Product repository, and the
UI.

The SM, IM, FM, and CP datasets remain disconnected manufacturer source data.
The connected 13-record PS dataset comprises 5 initial standard/outdoor
records, 4 historical revisions, and 4 SIPLUS records. Official base-product
and successor MLFB relationships remain source-only; they are not mapped into
canonical Product relation fields.

## S7-1200 Source Data

| Source module | Records | Connection status |
| --- | ---: | --- |
| CPU | 60 | CONNECTED (50 Classic, 10 G2) |
| Power Module (PM) | 5 | CONNECTED (3 Classic, 2 G2) |
| Signal Module (SM) | 47 | DISCONNECTED |
| Signal Board (SB) | 32 | DISCONNECTED |
| Communication Module (CM) | 16 | DISCONNECTED |
| Communication Processor (CP) | 7 | DISCONNECTED |
| Communication Board (CB) | 3 | DISCONNECTED |
| Special/technology modules | 11 | DISCONNECTED |
| Other/companion modules | 5 | DISCONNECTED |
| **Total** | **186** | **65 CONNECTED; 121 DISCONNECTED** |

The current S7-1200 source files contain 186 unique MLFB declarations. No source
records were added or removed during structural G2 reclassification. Generation
is represented by `seriesId`: 28 existing CPU/SB/SM records are classified as
`S7-1200 G2` (10 CPU, 9 Signal Board, and 9 Signal Module), in addition to the
2 SIMATIC G2 Power Module records that were already classified. The 5 PM records
comprise 1 Classic SIMATIC PM 1207, 2 G2 SIMATIC PM 1207 records, and 2 Classic
SIPLUS PM 1207 records.

The 30 G2 records are physically separated under `s7-1200/g2/`: 10 CPU, 9
Signal Board, 9 Signal Module, and 2 Power Module records. The corresponding
root Classic files contain 50 CPU, 23 Signal Board, 38 Signal Module, and 3
Power Module records. Combined source-module totals remain unchanged.

The 3 Classic and 2 G2 Power Module records are connected through one explicit
PM specification normalizer that supports both structurally compatible source
contracts. Their source arrays and files remain separate, and `seriesId`
preserves the Classic/G2 generation distinction. Classic `baseMlfb` lineage
metadata remains source-only.

The 10 G2 CPU records are connected through an explicit S7-1200 CPU
specification normalizer: 6 compact and 4 fail-safe Products. Their generation
is preserved by `seriesId = S7-1200 G2`.

The 50 Classic CPU source records are connected with 41 `compact` and 9
`fail-safe` functional variants and validate 50/50 against the verified
taxonomy. SIPLUS environmental edition remains represented by source MLFB,
title, and description evidence rather than `variantId`.

The former manual `6ES7214-1AG40-0XB0` Product no longer exists. Its canonical
source-backed record supplies Product identity and content, while a permanent
redirect maps the old manual slug to `6es7214-1ag40-0xb0`. The S7-1200 source
state is 65 connected of 186 total—50 Classic CPUs, 10 G2 CPUs, and 5 Power
Modules—with 121 records remaining disconnected. The active Product total is
114.

All other S7-1200 manufacturer source datasets remain disconnected and await
controlled integration; connecting 65 of 186 records does not establish that
the remaining 121 records are lifecycle-verified.

Current constraints:

- Only the Classic/G2 Power Module and Classic/G2 CPU arrays connect to Product
  aggregation.
- Disconnected records are not validated during normal application construction.
- Source/reference URL fields exist on the source records.
- Source and taxonomy enforcement occurs only when a record passes through the
  current validator.
- `verified-taxonomy.ts` distinguishes the `S7-1200` and `S7-1200 G2` series
  for the classified CPU, Signal Board, Signal Module, and Power Module
  variants. No S7-1200 G5 series is defined because that generation is not
  established.
- Connected source types use explicit product-type specification normalizers;
  arbitrary specification serialization is not supported.

## Validation and Mapping

For connected S7-300 CPU and Power Supply records, S7-1200 Classic/G2 Power
Module records, and S7-1200 G2 CPU records, validation checks required
identity and classification values, supported lifecycle, MLFB format, HTTPS
source presence, and membership in verified Siemens taxonomy. Invalid connected
records cause adapter mapping to fail.

Manufacturer source interfaces retain their product-type-specific
`specifications` contracts. Common Product mapping does not inspect or
arbitrarily serialize those objects; every connected product type must supply
an explicit specification normalizer. Task C establishes this boundary while
preserving the existing S7-300 CPU mapping and adds no new source integration.

This enforcement must not be inferred for disconnected source files. Until a
dataset is connected to the validation/adapter/aggregation path, normal builds
do not establish that every record satisfies the active Product contract.

## Data Rules

- Preserve one canonical UI-facing Product interface.
- Access active Products through the repository.
- Treat manufacturer files as source data until explicitly connected.
- Do not invent prices, stock, specifications, taxonomy, or lifecycle values.
- Do not call disconnected or unverified source records active products.
- Reconcile taxonomy and validation before controlled dataset integration.
