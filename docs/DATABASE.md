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

The Product aggregation is
`apps/web/src/features/products/data/products.ts`.

Product reads are exposed through
`apps/web/src/features/products/repository/product.repository.ts`.

## Current Active Dataset

The application currently aggregates 220 Products:

- 36 mapped S7-300 CPU Products
- 13 mapped S7-300 Power Supply Products
- 3 mapped S7-1200 Classic Power Module Products
- 2 mapped S7-1200 G2 Power Module Products
- 10 mapped S7-1200 G2 CPU Products
- 50 mapped S7-1200 Classic CPU Products
- 9 mapped S7-1200 G2 Signal Module Products
- 9 mapped S7-1200 G2 Signal Board Products
- 38 mapped S7-1200 Classic Signal Module Products
- 23 mapped S7-1200 Classic Signal Board Products
- 17 mapped S7-1200 Communication Module Products
- 7 mapped S7-1200 Communication Processor Products
- 3 mapped S7-1200 Communication Board Products

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
| Signal Module (SM) | 47 | CONNECTED (38 Classic, 9 G2) |
| Signal Board (SB) | 32 | CONNECTED (23 Classic, 9 G2) |
| Communication Module (CM) | 16 | CONNECTED |
| Communication Processor (CP) | 7 | CONNECTED |
| Communication Board (CB) | 3 | CONNECTED |
| Special/technology modules | 11 | DISCONNECTED |
| Other/companion modules | 5 | 1 CONNECTED; 4 DISCONNECTED |
| **Total** | **186** | **171 CONNECTED; 15 DISCONNECTED** |

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
state includes 50 Classic CPUs, 10 G2 CPUs, and 5 Power Modules.

The 9 G2 and 38 Classic Signal Module records are connected through the same
explicit S7-1200 Signal Module specification normalizer. G2 variants comprise
2 digital-output, 2 digital-io, 3 analog-input, 1 analog-output, and 1 analog-io.

The 38 Classic Signal Module records are NORMALIZED, taxonomy-valid 38/38, and
CONNECTED. Their functional variants are: `digital-input` 4,
`digital-output` 11, `digital-io` 11, `fail-safe-input` 1,
`fail-safe-output` 2, `analog-input` 5, `analog-output` 2, and `analog-io` 2.
Source lifecycle is 37 active and 1 spare-part, mapped to 37 active and 1 legacy
Products.

The 32 Signal Board source records comprise 9 G2 and 23 Classic records. All are
connected through the unchanged shared S7-1200 Signal Board specification
normalizer. Each G2 variant has one record:
`sb1221-di8-24vdc`, `sb1222-dq8-24vdc`, `sb1223-di4-dq4-24vdc`,
`sb1223-di4-dq4-5vdc`, `sb1231-ai4`, `sb1231-rtd-ai2`, `sb1231-tc-ai4`,
`sb1232-ao4`, and `sb1233-ai2-ao2`.

The 23 Classic Signal Board records are NORMALIZED, taxonomy-valid 23/23, and
CONNECTED. Their model-specific variants are:
`sb1221-di4-24vdc` 2, `sb1221-di4-5vdc` 2, `sb1222-dq4-24vdc` 2,
`sb1222-dq4-5vdc` 2, `sb1223-di2-do2-standard` 4,
`sb1223-di2-do2-24vdc` 2, `sb1223-di2-do2-5vdc` 2, `sb1231-ai1` 1,
`sb1231-rtd` 2, `sb1231-thermocouple` 1, and `sb1232-ao1` 3. All 23
records map to 23 active Products.

For both Classic datasets, SIPLUS environmental edition remains represented by
MLFB, title, description, and other source evidence rather than functional or
model variant taxonomy. Their shared adapters are unchanged.

S7-1200 now has 171 connected of 186 source records, with 15 disconnected, and
the Product collection total is 220. CPU, Power Module, Signal Module, Signal
Board, Communication Module, Communication Processor, and Communication Board
are fully connected across Classic and G2.

Communication Module is CONNECTED with 17 active Products: 16 records from
`cm.ts` plus RF120C from `other.ts`. Their variant distribution is:

- `cm1241-rs232`: 4
- `cm1241-rs422-485`: 4
- `cm1242-5`: 3
- `cm1243-2`: 2
- `cm1243-5`: 3
- `rf120c`: 1

Communication Processor is CONNECTED with 7 Products through the unchanged
communication adapter. Its variant distribution is:

- `telecontrol-gprs`: 1
- `industrial-ethernet-telecontrol`: 3
- `lte-eu`: 1
- `lte-us`: 1
- `telecontrol-irc`: 1

Source lifecycle is 6 active and 1 spare-part; mapped Product lifecycle for
these seven is 6 active and 1 legacy. The spare-part CP 1242-7 V2
(`6GK7242-7KX31-0XE0`) is preserved and connected rather than filtered.

Communication Board is CONNECTED with 3 active Products through the unchanged
communication adapter. Lifecycle for these three is 3 active, 0 legacy, and 0
discontinued. All use variant `cb1241-rs485`. Their MLFBs are:

- `6ES7241-1CH30-1XB0`
- `6AG1241-1CH30-5XB1`
- `6AG2241-1CH30-1XB0`

All Communication Module, Communication Processor, and Communication Board
records are now connected: 27/27 communication records.

The remaining 15 records are NORMALIZED, TAXONOMY-VALID, ADAPTER-ROUTED, and
DISCONNECTED. Their Product-Type distribution and explicit adapter routes are:

- Special Module: 8 via `special.adapter.ts`
- Technology Module: 3 via `special.adapter.ts`
- Network Switch: 3 via `network-switch.adapter.ts`
- Data Decoupling Module: 1 via `data-decoupling.adapter.ts`

`Other Module` is no longer used as a source classification. The mixed physical
`other.ts` file remains unchanged: only RF120C is connected through the guarded
communication adapter, while Network Switch and Data Decoupling Module remain
disconnected.

Connector values for `6AG1241-1CH32-4XB0` and `6AG1241-1CH32-2XB0` were
verified before exposure as `9-pole D-sub pin`; no source correction was
required.

Current constraints:

- The Classic/G2 CPU, Power Module, Signal Module, and Signal Board arrays plus
  the 17 Communication Module records connect to Product aggregation.
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
