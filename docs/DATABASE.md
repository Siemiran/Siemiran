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

The application currently aggregates 37 Products:

- 1 manually declared S7-1200 Product
- 36 mapped S7-300 CPU Products

Only records included by `data/products.ts` reach the Product repository and UI.
The presence of a manufacturer source file does not make its records active
application data.

## Siemens Database Layout

Manufacturer source data is under:

`apps/web/src/features/products/database/siemens/`

The current shared Siemens files are:

- `plc.ts`: exports the source contract and records currently connected to the
  pipeline
- `plc.validator.ts`: validates connected source records
- `plc.adapter.ts`: maps validated source records into `Product`
- `verified-taxonomy.ts`: verified Siemens taxonomy contract used by validation

## S7-300 Source Data

| Source class | Records | Connection status |
| --- | ---: | --- |
| CPU | 36 | CONNECTED |
| Power Supply (PS) | 13 | DISCONNECTED |
| Signal Module (SM) | 66 | DISCONNECTED |
| Interface Module (IM) | 7 | DISCONNECTED |
| Function Module (FM) | 32 | DISCONNECTED |
| Communication Processor (CP) | 43 | DISCONNECTED |

Only S7-300 CPU is exported through `siemens/plc.ts`. CPU records flow through
the Siemens validator and adapter into active Product aggregation, the Product
repository, and the UI.

The PS, SM, IM, FM, and CP datasets are present as manufacturer source records
but are not imported by the active pipeline. They are therefore not active
Products and are not validated during normal application construction. The 13
PS records comprise 5 initial standard/outdoor records, 4 historical revisions,
and 4 SIPLUS records. Official base-product and successor relationships are
preserved where Siemens states them.

## S7-1200 Source Data

| Source module | Records | Connection status |
| --- | ---: | --- |
| CPU | 60 | DISCONNECTED |
| Power Module (PM) | 5 | DISCONNECTED |
| Signal Module (SM) | 47 | DISCONNECTED |
| Signal Board (SB) | 32 | DISCONNECTED |
| Communication Module (CM) | 16 | DISCONNECTED |
| Communication Processor (CP) | 7 | DISCONNECTED |
| Communication Board (CB) | 3 | DISCONNECTED |
| Special/technology modules | 11 | DISCONNECTED |
| Other/companion modules | 5 | DISCONNECTED |
| **Total** | **186** | **DISCONNECTED** |

The current S7-1200 source files contain 186 unique MLFB declarations. The 5 PM
records comprise 1 Classic SIMATIC PM 1207, 2 G2 SIMATIC PM 1207 records, and
2 Classic SIPLUS PM 1207 records. These are source records awaiting controlled
integration; they are not active application Products.

Current constraints:

- No S7-1200 index or aggregator connects these modules to Product aggregation.
- These records are not validated during normal application construction.
- Source/reference URL fields exist on the source records.
- Source and taxonomy enforcement occurs only when a record passes through the
  current validator.
- `verified-taxonomy.ts` distinguishes the `S7-1200` and `S7-1200 G2` series for
  the initial Power Module baseline. No S7-1200 G5 series is defined because
  that generation is not established.
- S7-1200 source `seriesId` values and the verified taxonomy's S7-1200 series
  identifier are not aligned.
- The current shared adapter and source interface are coupled to S7-300 CPU
  assumptions and preserve only their explicitly mapped specification fields.

## Validation and Mapping

For connected S7-300 CPU records, validation checks required identity and
classification values, supported lifecycle, MLFB format, HTTPS source presence,
and membership in verified Siemens taxonomy. Invalid connected records cause
adapter mapping to fail.

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
