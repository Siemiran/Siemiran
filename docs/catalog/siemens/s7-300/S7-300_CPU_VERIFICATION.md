# Siemens S7-300 �?" CPU Verification

**Status:** Verification in progress  
**Priority:** P0  
**Parent:** Siemens �?' SIMATIC �?' Advanced Controllers �?' S7-300 �?' CPU

---

## 1. Purpose

This document is the verification source for the S7-300 CPU catalog.

No S7-300 CPU product should be added to the production catalog unless its:

- Siemens MLFB
- official product name
- CPU variant
- lifecycle
- relevant specifications
- Siemens source

have been verified.

This document is a verification layer, not the final product database.

---

# 2. CPU Taxonomy

S7-300 CPUs MUST be classified into the following variants where officially applicable:

- Standard CPU
- Compact CPU
- Fail-Safe CPU
- Technology CPU
- SIPLUS CPU

Additional distinctions such as:

- MPI
- PROFIBUS DP
- PROFINET
- integrated I/O
- integrated technology functions

should be represented as product specifications or sub-variants when supported by the official Siemens product structure.

---

# 3. Standard CPUs

## 3.1 CPU 312

Known verified product:

| CPU | MLFB | Variant | Lifecycle | Status |
|---|---|---|---|---|
| CPU 312 | 6ES7312-1AE14-0AB0 | Standard | spare-part | Verified in project |

---

## 3.2 CPU 313

Required verification:

- CPU 313
- CPU 313C
- CPU 313C-2 DP
- other officially listed CPU 313 variants

---

## 3.3 CPU 314

Known verified product:

| CPU | MLFB | Variant | Lifecycle | Status |
|---|---|---|---|---|
| CPU 314 | 6ES7314-1AG14-0AB0 | Standard | spare-part | Verified in project |

Required verification:

- CPU 314 IFM
- CPU 314C
- CPU 314C-2 DP
- CPU 314C-2 PN/DP
- other officially listed variants

---

## 3.4 CPU 315

Known verified products:

| CPU | MLFB | Variant | Lifecycle | Status |
|---|---|---|---|---|
| CPU 315-2 DP | 6ES7315-2AH14-0AB0 | Standard | spare-part | Verified in project |
| CPU 315-2 PN/DP | 6ES7315-2EH14-0AB0 | Standard | spare-part | Verified in project |

Required verification:

- CPU 315
- CPU 315-2 DP
- CPU 315-2 PN/DP
- CPU 315F-2 DP
- CPU 315F-2 PN/DP
- CPU 315T
- CPU 315T-2 DP
- CPU 315T-3 PN/DP
- other officially listed variants

---

## 3.5 CPU 316

Required verification:

- CPU 316
- CPU 316-2 DP
- other officially listed variants

---

## 3.6 CPU 317

Known verified products:

| CPU | MLFB | Variant | Lifecycle | Status |
|---|---|---|---|---|
| CPU 317-2 PN/DP | 6ES7317-2EK14-0AB0 | Standard | phase-out | Verified in project |

Required verification:

- CPU 317-2 DP
- CPU 317-2 PN/DP
- CPU 317F-2 DP
- CPU 317F-2 PN/DP
- CPU 317T
- CPU 317T-2 DP
- CPU 317T-3 PN/DP
- other officially listed variants

---

## 3.7 CPU 318

Known verified product:

| CPU | MLFB | Variant | Lifecycle | Status |
|---|---|---|---|---|
| CPU 319-3 PN/DP | 6ES7318-3EL01-0AB0 | Standard | spare-part | Verified in project |

Required verification:

- CPU 318-2
- CPU 319-3 PN/DP
- CPU 319F-3 PN/DP
- other officially listed variants

---

# 4. Compact CPUs

Known verified products:

| CPU | MLFB | Variant | Lifecycle | Status |
|---|---|---|---|---|
| CPU 314C-2 DP | 6ES7314-6CH04-0AB0 | Compact | spare-part | Verified in project |
| CPU 314C-2 PN/DP | 6ES7314-6EH04-0AB0 | Compact | spare-part | Verified in project |

Required verification:

- CPU 312C
- CPU 313C
- CPU 313C-2 DP
- CPU 314C
- CPU 314C-2 DP
- CPU 314C-2 PN/DP
- other officially listed compact CPUs

---

# 5. Fail-Safe CPUs

Fail-Safe CPUs MUST be modeled separately from Standard CPUs.

Required verification:

- CPU 315F-2 DP
- CPU 315F-2 PN/DP
- CPU 317F-2 DP
- CPU 317F-2 PN/DP
- CPU 319F-3 PN/DP
- other officially verified S7-300 F CPUs

Variant:

`fail-safe`

---

# 6. Technology CPUs

Technology CPUs MUST be modeled separately when Siemens identifies the CPU as a Technology CPU.

Required verification:

- CPU 315T
- CPU 315T-2 DP
- CPU 315T-3 PN/DP
- CPU 317T
- CPU 317T-2 DP
- CPU 317T-3 PN/DP
- other officially listed Technology CPUs

Variant:

`technology`

---

# 7. SIPLUS CPUs

SIPLUS CPUs MUST NOT be mixed into ordinary SIMATIC S7-300 CPU records.

Known verified products:

| CPU | MLFB | Variant | Lifecycle | Status |
|---|---|---|---|---|
| SIPLUS S7-300 CPU 315-2 PN/DP | 6AG1315-2EH14-7AB0 | SIPLUS | spare-part | Verified in project |
| SIPLUS S7-300 CPU 314C-2 PN/DP | 6AG1314-6EH04-7AB0 | SIPLUS | phase-out | Verified in project |

Required verification:

- SIPLUS CPU 312
- SIPLUS CPU 313
- SIPLUS CPU 314
- SIPLUS CPU 315
- SIPLUS CPU 317
- SIPLUS compact CPUs
- SIPLUS fail-safe CPUs where officially available
- other officially listed SIPLUS CPU variants

SIPLUS records must preserve the relationship to their underlying SIMATIC product.

---

# 8. Product Specification Fields

For every verified CPU, populate only information supported by an authoritative source.

Minimum fields:

- MLFB
- Product name
- CPU family
- Variant
- Lifecycle
- Work memory
- Load memory where applicable
- Interface list
- Supply voltage
- Integrated digital inputs
- Integrated digital outputs
- Integrated analog inputs
- Integrated analog outputs
- Technology functions where applicable
- Memory card type
- PROFINET capability where applicable
- PROFIBUS capability where applicable
- MPI capability where applicable
- Siemens source URL

Do not invent missing specifications.

---

# 9. Lifecycle

Supported lifecycle values:

- active
- phase-out
- spare-part
- discontinued

Lifecycle MUST NOT remove historical products from the catalog.

Legacy and discontinued S7-300 products are intentionally retained because they remain relevant for:

- installed-base identification
- spare parts
- replacement
- maintenance
- engineering
- compatibility
- industrial service

---

# 10. Verification Rules

A product is considered **Verified** only when:

1. The MLFB is traceable to Siemens.
2. The product name matches Siemens terminology.
3. The CPU variant is structurally correct.
4. Lifecycle information is available or explicitly marked for further verification.
5. Product specifications are supported by Siemens documentation.
6. The source URL is recorded.
7. The product is not duplicated under another MLFB.

---

# 11. Source Priority

Use sources in this order:

1. Siemens Industry Mall
2. Siemens official product documentation
3. Siemens product manuals
4. Siemens product certificates
5. Other Siemens official domains

Third-party distributors may be used only as secondary evidence and MUST NOT override Siemens information.

---

# 12. Important Rule

Do NOT interpret the lists in this document as proof that every listed CPU exists with every possible variant.

Entries marked:

`Required verification`

are research targets only.

Only entries marked:

`Verified in project`

may currently be treated as verified project data.

---

# 13. Next Verification Batch

The next verification batch is:

### Batch S7-300-CPU-01

1. CPU 312
2. CPU 313
3. CPU 313C
4. CPU 313C-2 DP
5. CPU 314
6. CPU 314 IFM
7. CPU 314C
8. CPU 314C-2 DP
9. CPU 314C-2 PN/DP

After this batch:

### Batch S7-300-CPU-02

1. CPU 315
2. CPU 315-2 DP
3. CPU 315-2 PN/DP
4. CPU 315F variants
5. CPU 315T variants

Then:

### Batch S7-300-CPU-03

1. CPU 316 variants
2. CPU 317 variants
3. CPU 317F variants
4. CPU 317T variants

Then:

### Batch S7-300-CPU-04

1. CPU 318
2. CPU 319 variants
3. CPU 319F variants
4. SIPLUS CPU variants

---

# 14. Current Project State

Current verified project records:

- Standard CPU: 6
- Compact CPU: 2
- SIPLUS CPU: 2
- Fail-Safe CPU: 0
- Technology CPU: 0

Total currently verified project records:

`10`

These records are considered the initial seed dataset only.

The S7-300 CPU catalog is NOT complete.

---

# 15. Completion Criterion

S7-300 CPU work is complete only when all officially documented CPU families and relevant variants have been evaluated and each target is classified as one of:

- verified product
- verified successor
- discontinued
- not applicable
- duplicate
- requires further verification

No assumption-based product records are permitted.