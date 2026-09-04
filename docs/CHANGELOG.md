# Siemiran — Changelog

This file records completed repository changes. Connection status refers to the
implementation on the current `main` branch.

## 2026-09-04 — S7-300 Final FM Exact Identity Closure

### Changed

- Corrected SIWAREX A from unsupported repository MLFB `7MH4904-2AA01` to exact
  Siemens MLFB `7MH4421-1AA01`, corrected its internal ID to
  `siemens-s7-300-siwarex-a-4421-1aa01`, and replaced its source with the exact
  Siemens device manual.
- Replaced the SIWAREX A exposure-gate key without exposing the record; no
  explicit Siemens lifecycle statement was recovered, so provisional
  `discontinued` remains.
- Classified FM354 `6ES7354-1AH02-0AE0` as IDENTITY-NOT-ESTABLISHED and a
  DELETE/INVENTORY-CORRECTION CANDIDATE. Siemens revision material establishes
  AH00 followed by AH01 but not AH02; management review is required before any
  denominator change.

### State

- Identity debt falls from two records to one. FM remains 25/32 exposed and 7
  blocked; Product remains 376; S7-300 remains 190/197 with denominator status
  PENDING-IDENTITY-REVIEW; S7-1200 remains 186/186.
- No closure audit, IM/CP audit, localization, or new Siemens series work was
  started.

## 2026-09-04 — S7-300 Final Seven FM Identity Correction

### Changed

- Corrected the FM356-4 8 MB record to exact Siemens MLFB
  `6ES7356-4BN00-0AE0` and internal ID
  `siemens-m7-300-fm356-4-4bn00-0ae0`.
- Replaced the malformed MLFB in the exposure gate without removing the gate.
  The Siemens FM356 manual explicitly maps `4BM00` to 4 MB and `4BN00` to 8 MB.
- Recorded FM354 `6ES7354-1AH02-0AE0` and SIWAREX A `7MH4904-2AA01` as exact
  identity debt pending management review.

### State

- Task AV resolved 0/7 lifecycle debts. Task AW found no explicit Siemens
  lifecycle state for corrected `4BN00`, so provisional `discontinued` remains.
- FM remains 25/32 exposed and 7 blocked; Product remains 376; S7-300 remains
  190/197; S7-1200 remains 186/186.
- Remaining FM identity/lifecycle completion continues before the S7-300
  closure audit. IM/CP audit, localization, and another Siemens series remain
  unstarted.

## 2026-09-04 — S7-300 Final Eight FM Partial Closure

### Changed

- Upgraded FM354 `6ES7354-1AH01-0AE0` to its exact Siemens Industry Mall
  source. The page states PM410 "Product cancellation" effective 2017-03-01,
  confirming the existing `spare-part` lifecycle.
- Removed that exact MLFB from the exposure gate. The other seven targets stay
  blocked because exact Siemens lifecycle evidence remains unresolved.

### State

- Resolved 1/8; FM is 25/32 exposed and 7 blocked.
- Source lifecycle remains 0 active, 14 phase-out, 7 spare-part, and 11
  discontinued; exposed Products map to 0 active, 20 legacy, and 5
  discontinued.
- Product is 376, S7-300 remains incomplete at 190/197, and S7-1200 remains
  186/186. Seven FM lifecycle records remain gated, and no third-party evidence
  was used. Next work continues Siemens-official-only lifecycle resolution for
  those same seven records. The strict S7-300 closure audit is deferred until
  all seven are exposed and S7-300 reaches 197/197.

## 2026-09-04 — S7-300 Function Module Verified-Subset Integration

### Added

- Added one explicit Siemens-official lifecycle exposure gate containing the
  eight unresolved Function Module MLFBs.
- Connected the remaining 24 Function Modules through the existing explicit FM
  adapter. Blocked source records remain in the dataset but are not Products.

### State

- FM353 `6ES7353-1AH01-0AE0` is Siemens-official PM410 from 2017-03-01,
  and FM352-5 AH11 `6ES7352-5AH11-0AE0` is Siemens-official PM400 from
  2023-10-01; both remain exposed. FM354 AH01 `6ES7354-1AH01-0AE0` has
  official identity evidence but insufficient official lifecycle evidence and
  is withheld.
- FM is SOURCE RECORDS 32/32, FUNCTIONALLY NORMALIZED, TAXONOMY-VALID 32/32,
  ADAPTER-READY 32/32, PRODUCT-EXPOSED 24/32, and SIEMENS-OFFICIAL
  LIFECYCLE-DEBT 8.
- Exposed Product lifecycle is 0 active, 19 legacy, and 5 discontinued.
- Product increases from 351 to 375 and S7-300 from 165/197 to 189/197;
  S7-1200 remains 186/186. S7-300 is not complete.
- Third-party lifecycle research is prohibited. Only future official Siemens
  evidence may remove an MLFB from the exposure gate. The locked post-S7-300
  decision remains pending.

## 2026-09-04 — S7-300 Function Module Pipeline Preparation

### Added

- Added the verified S7-300 Function Module taxonomy with 13 functional
  variants covering all 32 source records.
- Added the explicit Function Module Product adapter using the generic Siemens
  mapper and a zero-safe, field-by-field specification normalizer.

### Changed

- Normalized exactly three SIPLUS environmental variant leaks: two
  `counter-siplus` records to `counter`, and one
  `weighing-electronics-siplus` record to `weighing-electronics`.
- Variant vocabulary is reduced from 15 source IDs to 13 functional IDs. All
  32 records are taxonomy-valid and map successfully through the adapter.

### State

- Task AR exhausted the bounded seven-record lifecycle research without safe
  source corrections. Repeating that research is stopped; the seven records
  remain explicit Product-exposure debt but no longer block preparation.
- FM is IDENTITY-VALID, PLACEMENT-VALID, SOURCE-VALID, FUNCTIONALLY NORMALIZED,
  TAXONOMY-VALID 32/32, ADAPTER-READY, LIFECYCLE-DEBT 7, and DISCONNECTED 0/32.
- Current mapped projection is 0 active, 21 legacy, and 11 discontinued.
  Product remains 351, S7-300 165/197, and S7-1200 186/186.

## 2026-09-04 — S7-300 FM Targeted Identity/Lifecycle Closure

### Corrected

- Targeted only the 11 remaining Function Module blockers; no full FM re-audit.
- Corrected SIPLUS FM 350-1 from the unsupported `6AG1350-1AH03-4AE0`
  identity to Siemens-documented `6AG1350-1AH03-2AE0`, including its internal
  ID and canonical Siemens ST 70 source.
- Corrected FM 353 and FM 354 AH01 from discontinued to PM410 spare-part,
  SIWAREX CS from phase-out to PM410 spare-part, and FM 352-5 AH11 from stale
  discontinued to PM400 phase-out. SIWAREX CS now uses its exact Siemens Mall
  lifecycle page.

### State

- FM lifecycle is now 0 active, 14 phase-out, 7 spare-part, and 11
  discontinued. Identity, placement, and source blockers are zero; seven exact
  lifecycle blockers remain.
- The three SIPLUS variants remain unchanged. Taxonomy and adapter remain
  absent, FM remains disconnected 0/32, Product remains 351, S7-300 remains
  165/197, and S7-1200 remains 186/186.
- The next task targets only the remaining seven MLFB lifecycles. The locked
  post-S7-300 closure audit and management decision remain required.

## 2026-09-04 — Siemens S7-300 Function Module Data Reconciliation

### Corrected

- Corrected FM 355 S `6ES7355-1VH10-0AE0` from active to phase-out using exact
  Siemens PM400 lifecycle evidence.
- Replaced the mismatched FM 355-2 S source and the non-Siemens CM35 source with
  exact official Siemens manuals.
- Corrected the one-channel SIWAREX CS internal ID to
  `siemens-s7-300-siwarex-cs-4910-0aa01` without changing its MLFB or data.

### State

- Task AO audited all 32 FM records. SM 338 POS and CM35 retain their locked
  Function Module placement. Lifecycle changes from 1 active / 13 phase-out /
  4 spare-part / 14 discontinued to 0 / 14 / 4 / 14.
- Eleven exact lifecycle blockers and SIPLUS FM 350-1 exact-product provenance
  remain unresolved. Its `counter-siplus` variant and the other two SIPLUS
  variants remain unchanged pending the later 13-variant taxonomy task.
- No taxonomy, adapter, or Product exposure was added. FM remains 0/32, Product
  remains 351, S7-300 remains 165/197, and S7-1200 remains 186/186.
- The next gate targets only unresolved exact MLFBs. The post-S7-300 closure
  audit and locked management decision remain required.

## 2026-09-03 — Siemens S7-300 Communication Processor Product Integration

### Completed

- Connected all 43 verified S7-300 Communication Processor records through the
  existing dedicated adapter without changing source, taxonomy, adapter, or
  generic Siemens infrastructure.
- CP is SOURCE/LIFECYCLE VERIFIED, FUNCTIONALLY NORMALIZED, TAXONOMY-VALID
  43/43, ADAPTER-READY, and CONNECTED 43/43. Mapped Product lifecycle is 0
  active, 19 legacy, and 24 discontinued.
- Product collection increased from 308 to 351 and S7-300 advanced from 122/197
  to 165/197. S7-1200 remains 186/186.
- Function Module is the only remaining disconnected S7-300 dataset, with 32
  records. Function Module readiness, source, taxonomy, and adapter work is the
  next gate; S7-300 is not yet complete.
- The post-S7-300 decision gate remains locked: after Function Module integration
  and strict S7-300 closure audit, stop before another Siemens series and
  evaluate additional Siemens data versus Persian-first bilingual completion.

## 2026-09-03 — Siemens S7-300 Communication Processor Pipeline Preparation

### Completed

- Normalized four SIPLUS Communication Processor records to their functional
  base variants, reducing the source vocabulary from 20 variants to 16 without
  changing identity, lifecycle, sources, descriptions, or specifications.
- Added verified S7-300 Communication Processor taxonomy covering all 43 records
  and a dedicated explicit specification adapter using the generic Siemens
  Product mapper. Taxonomy validation and adapter mapping are 43/43.
- Final variants are rs232 3, 20ma-tty 3, rs422-485 3, profibus-dp 4,
  profibus-dp-fo 1, profibus-fms 2, as-interface 4, as-interface-plus 2,
  industrial-ethernet 7, industrial-ethernet-lean 3,
  industrial-ethernet-advanced 4, industrial-ethernet-iso 1,
  industrial-ethernet-it 3, industrial-ethernet-erpc 1, profinet 1, bacnet 1.
- Future Product lifecycle is 0 active, 19 legacy, and 24 discontinued. CP is
  SOURCE/LIFECYCLE VERIFIED, FUNCTIONALLY NORMALIZED, TAXONOMY-VALID 43/43,
  ADAPTER-READY, and DISCONNECTED 0/43.
- Product total remains 308, S7-300 remains 122/197, and S7-1200 remains 186/186.
  Controlled 43-record CP Product integration is next; that future task would
  produce 351 Products and S7-300 165/197, leaving Function Module 32. The
  post-S7-300 decision gate remains preserved.

## 2026-09-03 — Siemens S7-300 Communication Processor Final Lifecycle Closure

### Completed

- Closed the final ERPC `6GK7343-1FX00-0XE0` and BACnet
  `6FL4343-1CX10-0XE0` lifecycle debts without changing their verified
  `discontinued` values. Direct Siemens PLM pages were not accessible.
- Reconciled ERPC using official Siemens catalog and ProductCERT identity,
  explicit Siemens-derived PM500 evidence, and independent manufacturer-
  discontinuation evidence; stale PM300 mirrors represent an earlier state.
- Reconstructed BACnet chronology from the official Siemens sales restriction
  dated 2012-04-30 to Siemens-derived cancellation dated 2019-07-01; Phase-Out
  evidence represents the earlier stage.
- Replaced both compliance-only canonical sources with exact official Siemens
  technical documents. Lifecycle remains 0 active, 1 phase-out, 18 spare-part,
  and 24 discontinued. AJ blockers 30 became 2 after AK and 0 after AL.
- CP is SOURCE/LIFECYCLE VERIFIED with zero identity, lifecycle, taxonomy, or
  adapter blockers, while remaining disconnected 0/43. Product total remains
  308, S7-300 remains 122/197, and S7-1200 remains 186/186. The next gate is CP
  SIPLUS normalization, taxonomy, and explicit adapter preparation; the
  post-S7-300 management gate is preserved.

## 2026-09-03 — Siemens S7-300 Communication Processor Source and Lifecycle Correction

### Completed

- Recorded the Task AJ read-only audit of all 43 Communication Processor source
  records: identities reconcile 43/43 with zero taxonomy or adapter blockers and
  an initial lifecycle-verification set of 30 records.
- Reconciled that complete set against exact current or historical product
  evidence. Updated CP 343-1 Lean `6GK7343-1CX10-0XE0`, CP 343-1
  `6GK7343-1EX30-0XE0`, and CP 343-1 Advanced `6GK7343-1GX31-0XE0` from stale
  lifecycle values to `spare-part`; the standard CP 343-1 and Advanced products
  passed from phase-out on 2023-10-01 to cancellation/spare-part on 2025-10-01.
- Upgraded the Lean and Advanced records from family manuals to exact Siemens
  technical product data. Other checked lifecycle values were retained where
  the evidence confirmed the existing PM410 or PM500 classification.
- Final recorded CP lifecycle is 0 active, 1 phase-out, 18 spare-part, and 24
  discontinued. Exact Siemens evidence closes 28 of the 30 initial lifecycle
  blockers; ERPC `6GK7343-1FX00-0XE0` and BACnet `6FL4343-1CX10-0XE0` retain
  their existing values but remain unresolved because accessible secondary PLM
  claims conflict. CP remains disconnected at 0/43; Product collection remains
  308, S7-300 remains 122/197, and S7-1200 remains 186/186.
- Set targeted resolution of those two MLFBs as the next gate. Product exposure
  remains explicitly blocked, and the post-S7-300 management gate is preserved.

## 2026-09-03 — Siemens S7-300 Interface Module Integration

### Completed

- Connected all 7 source-verified, taxonomy-valid S7-300 Interface Module
  records through the existing dedicated adapter without changing source,
  taxonomy, adapter, or generic Siemens infrastructure.
- Added 0 active, 5 legacy, and 2 discontinued Products while preserving the
  corrected IM178-4 identity `6ES7178-4BH00-0AE0` and exact source mapping.
- Increased the Product collection from 301 to 308 with 308 unique IDs, slugs,
  and part numbers and no duplicate exposure.
- Advanced S7-300 integration from 115/197 to 122/197. The remaining 75
  disconnected records are Communication Processor 43 and Function Module 32;
  S7-300 is not complete, and S7-1200 remains 186/186 connected.
- Set Communication Processor readiness, taxonomy, and source verification as
  the next S7-300 gate. After full S7-300 completion and closure audit, work
  still stops before another Siemens series while additional Siemens
  series/family data is evaluated against Persian-first bilingual completion.

## 2026-09-03 — Siemens S7-300 Interface Module Final Source Verification

### Completed

- Verified extended-temperature IM365 `6ES7365-0BA81-0AA0` as PM500,
  discontinued effective 2012-10-01, with successor `6AG1365-0BA01-2AA0`.
  Direct Siemens PLM access was unavailable; two independent exact-product
  reproductions agree and no conflicting higher-authority evidence was found.
- Corrected the IM178-4 source MLFB from erroneous `6ES7178-4AB00-0XA0` to
  `6ES7178-4BH00-0AE0` and updated its source ID. The official Siemens manual
  confirms the identity and specifications, while current Siemens/TIA
  documentation confirms that IM178-4 is no longer actively marketed and
  suggests IM174 as an alternative.
- Retained discontinued lifecycle for corrected IM178-4. Direct Siemens PLM
  access was unavailable; independent exact-product evidence agrees on PM500
  and lifecycle end 2014-10-01, with no conflicting higher-authority evidence.
- Closed all remaining IM verification debt. The seven-record dataset is now
  source-verified, taxonomy-valid 7/7, adapter-ready, and disconnected 0/7,
  ready for controlled Product exposure as the next task. Product total remains
  301 and S7-300 remains 115/197 connected; taxonomy and adapter are unchanged.

## 2026-09-03 — Siemens S7-300 Interface Module Pipeline Preparation

### Completed

- Normalized all 7 Interface Module records to five functional variants:
  rack-sender 1, rack-receiver 1, rack-interface 3, motion-control 1, and
  distributed-motion-control 1. SIPLUS and extended-temperature editions remain
  source evidence rather than taxonomy variants.
- Updated IM361 and standard IM365 from phase-out to spare-part using current
  Siemens datasheets. Final source lifecycle is 0 active, 0 phase-out, 5
  spare-part, and 2 discontinued.
- Added verified Interface Module taxonomy with 7/7 coverage and one explicit
  specification adapter using the unchanged generic Siemens mapper.
- Retained discontinued lifecycle for extended-temperature IM365
  `6ES7365-0BA81-0AA0` and IM178-4 `6ES7178-4AB00-0XA0` because current Siemens
  lifecycle evidence was unavailable. This debt does not block taxonomy or
  adapter readiness, but blocks final Product exposure.
- Added zero Product exposure: Interface Module remains 0/7 connected, Product
  total remains 301, and S7-300 remains 115/197 connected. Debt resolution is
  the next gate before controlled integration.

## 2026-09-02 — Siemens S7-300 Signal Module Integration

### Completed

- Connected all 66 source-verified, taxonomy-valid S7-300 Signal Module records
  through the existing dedicated adapter without changing source or taxonomy.
- Added 1 active, 59 legacy, and 6 discontinued Products while preserving exact
  source identity, MLFB, variant, Siemens URL, and generic lifecycle mapping.
- Increased the Product collection from 235 to 301 with 301 unique IDs, slugs,
  and part numbers and no duplicate exposure.
- Advanced current verified S7-300 integration from 49/197 to 115/197, leaving
  82 disconnected records: IM 7, FM 32, and CP 43. S7-300 is not complete; the
  next gate is Interface Module readiness, taxonomy, and source verification.
- Preserved S7-1200 integration at 186/186 and made no source, taxonomy, adapter,
  generic infrastructure, repository, UI, route, dependency, or roadmap change.
- Retained the decision that after full S7-300 completion and closure audit,
  work stops before another Siemens series while additional Siemens series/family
  data is evaluated separately against Persian-first bilingual site completion.

## 2026-09-02 — Siemens S7-300 Signal Module Verification-Debt Closure

### Completed

- Accepted the existing Siemens-hosted module-specific evidence for
  `6ES7321-7BH00-0AB0` as sufficient provenance, closing that debt without
  changing its source record.
- Verified `6ES7322-5SD00-0AB0` as PM400 phase-out effective 2023-10-01 and
  changed its source lifecycle from discontinued to phase-out. Direct live Mall
  retrieval remained edge-denied; the accepted chain comprises an exact
  SiePortal product-page capture, two independently published matching sources,
  and no conflicting higher-authority evidence.
- Updated source lifecycle readiness to 1 active, 18 phase-out, 41 spare-part,
  and 6 discontinued, with future Product mapping of 1 active, 59 legacy, and 6
  discontinued.
- Closed both remaining blocking verification debts while keeping all 66 Signal
  Module records disconnected, Product exposure at zero, and the Product
  collection at 235. Controlled Product exposure remains a separate task.

## 2026-09-02 — Siemens S7-300 Signal Module Pipeline Preparation

### Completed

- Added verified S7-300 Signal Module taxonomy for all 66 source records across
  digital-input 16, digital-output 19, digital-io 2, programmable-digital-io 1,
  analog-input 14, analog-output 9, and analog-io 5.
- Added an explicit S7-300 Signal Module specification adapter that delegates
  common Product construction and lifecycle mapping to the generic Siemens
  mapper unchanged.
- Confirmed source lifecycle readiness at 1 active, 17 phase-out, 41 spare-part,
  and 7 discontinued, mapping in a future integration to 1 active, 58 legacy,
  and 7 discontinued Products.
- Retained verification debt for `6ES7321-7BH00-0AB0` source provenance and
  `6ES7322-5SD00-0AB0` live official PLM lifecycle. Resolution or review remains
  the next gate before controlled Product exposure.
- Kept all 66 records disconnected, added zero Product exposure, and retained
  the Product collection total of 235.

## 2026-09-02 — Siemens S7-300 Signal Module Verified Source Corrections

### Completed

- Completed the S7-300 Signal Module taxonomy evidence audit and corrected only
  sufficiently verified manufacturer source data.
- Changed `6ES7322-5RD00-0AB0` from discontinued to phase-out from Siemens PM400
  evidence and marked it as hazardous-area capable.
- Marked `6ES7322-5SD00-0AB0` as hazardous-area capable while retaining its
  discontinued lifecycle pending official PLM verification.
- Retained the existing `6ES7321-7BH00-0AB0` source and recorded the need for a
  stronger product- or module-specific Siemens source before final exposure.
- Added no taxonomy, adapter, or Product exposure. S7-300 Signal Module remains
  disconnected and the Product collection remains 235; taxonomy and adapter
  preparation is the next gate.

## 2026-09-01 — Siemens S7-1200 Data Decoupling Module Final Integration

### Completed

- Connected DCM 1271 (`3RK7271-1AA30-0AA0`) through the existing dedicated Data
  Decoupling adapter unchanged; Product lifecycle is active.
- Completed `other.ts` exposure at 5/5 with no duplicate exposure.
- Increased the Product collection total from 234 to 235.
- Increased current verified S7-1200 integration from 185/186 to 186/186 and
  reduced disconnected current source records from 1 to 0.
- Made no source, taxonomy, adapter, or generic-pipeline changes.
- Completed current verified S7-1200 source integration. This statement is
  scoped to the repository dataset and does not claim external catalog
  exhaustiveness.

## 2026-09-01 — Siemens S7-1200 Network Switch Integration

### Completed

- Connected exactly 3 Network Switch / CSM 1277 records through the existing
  dedicated Network Switch adapter unchanged.
- Preserved variant `csm1277` for all three records; all map to active Products.
- Preserved existing RF120C exposure and left DCM 1271 disconnected.
- Increased the Product collection total from 231 to 234.
- Increased connected S7-1200 source records from 182 to 185 of 186 and reduced
  the disconnected remainder from 4 to 1.
- Made no source, taxonomy, adapter, or generic-pipeline changes and exposed no
  Data Decoupling Module records.

## 2026-09-01 — Siemens S7-1200 Technology Module Integration

### Completed

- Connected all 3 Technology Module / SIWAREX records: WP231, WP241, and WP251.
- Reused the existing Special/Technology adapter unchanged and kept the existing
  8 Special Module Products unchanged.
- Completed shared Special/Technology source exposure at 11/11 records; all 3
  new Technology Module Products are active.
- Increased the Product collection total from 228 to 231.
- Increased connected S7-1200 source records from 179 to 182 of 186 and reduced
  the disconnected remainder from 7 to 4.
- Made no source, taxonomy, adapter, or generic-pipeline changes and exposed no
  Network Switch or Data Decoupling Module records.

## 2026-09-01 — Siemens S7-1200 Special Module Integration

### Completed

- Connected exactly 8 Special Module records from the shared 11-record source
  array and left all 3 Technology Module records disconnected.
- Reused the existing Special/Technology adapter unchanged.
- Preserved the phase-out SM 1278 (`6ES7278-4BD32-0XB0`) and mapped it to a
  legacy Product; lifecycle for the eight new Products is 7 active and 1 legacy.
- Increased the Product collection total from 220 to 228.
- Increased connected S7-1200 source records from 171 to 179 of 186 and reduced
  the disconnected remainder from 15 to 7.
- Made no source, taxonomy, adapter, or generic-pipeline changes and exposed no
  Network Switch or Data Decoupling Module records.

## 2026-09-01 — Siemens S7-1200 Communication Board Integration

### Completed

- Connected all three normalized and taxonomy-valid Communication Board records
  through the existing communication adapter unchanged.
- Preserved the final functional variant `cb1241-rs485` for all three records;
  all three map to active Products, with Task U lifecycle of 3 active, 0 legacy,
  and 0 discontinued.
- Preserved the existing 217 Products and increased the Product collection
  total from 217 to 220.
- Increased connected S7-1200 source records from 168 to 171 of 186 and reduced
  the disconnected remainder from 18 to 15.
- Completed S7-1200 Communication Module, Communication Processor, and
  Communication Board exposure with 27/27 communication records connected.
- Made no source, taxonomy, adapter, or generic-pipeline changes and exposed no
  Special Module, Technology Module, Network Switch, or Data Decoupling Module
  records.

## 2026-08-31 — Siemens S7-1200 Communication Processor Integration

### Completed

- Connected all seven normalized and taxonomy-valid Communication Processor
  records through the existing communication adapter unchanged.
- Preserved five final CP variants, including separate LTE EU and LTE US
  variants.
- Preserved source lifecycle of 6 active and 1 spare-part, mapped to Product
  lifecycle of 6 active and 1 legacy.
- Retained the spare-part CP 1242-7 V2 (`6GK7242-7KX31-0XE0`) rather than
  filtering it.
- Preserved the existing 210 Products and increased the Product collection
  total from 210 to 217.
- Increased connected S7-1200 source records from 161 to 168 of 186 and reduced
  the disconnected remainder from 25 to 18.
- Made no source, taxonomy, adapter, or generic-pipeline changes and exposed no
  Communication Board, Special Module, Technology Module, Network Switch, or
  Data Decoupling Module records.

## 2026-08-31 — Siemens S7-1200 Communication Module Integration

### Completed

- Connected all 17 Communication Module records: 16 CM source records plus the
  RF120C record from `other.ts`, reusing the unchanged communication adapter.
- Verified before exposure that `6AG1241-1CH32-4XB0` and
  `6AG1241-1CH32-2XB0` both specify a 9-pole D-sub pin connector; no source
  correction was required.
- Preserved all existing 193 Products and increased the Product collection
  total from 193 to 210.
- Increased connected S7-1200 source records from 144 to 161 of 186 and reduced
  the disconnected remainder from 42 to 25.
- Made no source, taxonomy, adapter, or generic-pipeline changes and exposed no
  Communication Processor, Communication Board, Special Module, Technology
  Module, Network Switch, or Data Decoupling Module records.

## 2026-08-31 — Remaining S7-1200 Explicit Adapter Layer

### Completed

- Added a shared explicit communication adapter for CM, CP, CB, and RF120C and
  a shared explicit adapter for Special Module and Technology Module.
- Added guarded Network Switch and Data Decoupling Module adapters, giving all
  42 remaining records one deterministic adapter route.
- Kept the mixed `other.ts` source file unchanged and protected its routes with
  runtime Product-Type guards.
- Made no source, taxonomy, generic-pipeline, or Product aggregation changes;
  Product exposure remains 0, the active Product total remains 193, and
  S7-1200 remains 144/186 connected with 42 disconnected.
- Retained CM connector verification for `6AG1241-1CH32-4XB0` and
  `6AG1241-1CH32-2XB0` before future exposure.

## 2026-08-31 — Remaining S7-1200 Source Normalization & Taxonomy

### Completed

- Normalized 19 environmental/SIPLUS composite variant fields across the
  remaining S7-1200 source records.
- Reclassified all five former `Other Module` records and eliminated that
  catch-all source classification.
- Added seven stable, evidence-backed Product Types and made all remaining 42
  records taxonomy-valid while preserving source lifecycle.
- Added zero Product exposure: the active Product total remains 193 and
  S7-1200 remains 144/186 connected with 42 disconnected.
- Deferred explicit adapters to Task R.
- Retained CM RS422/485 connector verification debt for
  `6AG1241-1CH32-4XB0` and `6AG1241-1CH32-2XB0` before future exposure.

## 2026-08-31 — Siemens S7-1200 Classic Signal Board Integration

### Completed

- Connected all 23 normalized Classic Signal Board records across 11
  model-specific variants as 23 active Products.
- Reused the unchanged shared Classic/G2 Signal Board adapter and preserved all
  170 existing Products while increasing the active total from 170 to 193.
- Increased connected S7-1200 source records from 121 to 144 of 186, reducing
  the disconnected remainder from 65 to 42.
- Completed S7-1200 CPU, Power Module, Signal Module, and Signal Board
  integration across Classic and G2.
- Made no source, taxonomy, adapter, Product interface, or generic-pipeline
  changes and connected no other dataset.
- Kept CM, CP, CB, special/technology, and other/companion datasets
  disconnected.

## 2026-08-31 — Siemens S7-1200 Classic Signal Module Integration

### Completed

- Connected all 38 normalized Classic Signal Module records: 4 digital-input,
  11 digital-output, 11 digital-io, 1 fail-safe-input, 2 fail-safe-output, 5
  analog-input, 2 analog-output, and 2 analog-io.
- Mapped 37 active and 1 spare-part source lifecycle to 37 active and 1 legacy
  Product through the unchanged shared Classic/G2 Signal Module adapter.
- Preserved all 132 existing Products and increased the active total from 132
  to 170.
- Increased connected S7-1200 source records from 83 to 121 of 186, reducing
  the disconnected remainder from 103 to 65.
- Exposed the corrected `6AG1223-1QH32-4XB0` 120/230 V AC input voltage and
  direct Siemens source URL through its Product.
- Made no source, taxonomy, adapter, Product interface, or generic-pipeline
  changes; connected no other dataset, and kept Classic Signal Board
  disconnected.

## 2026-08-31 — Siemens S7-1200 SM 1223 AC Input Verification

### Completed

- Verified MLFB `6AG1223-1QH32-4XB0` against its official Siemens Industry Mall
  product record.
- Corrected Input Voltage from 24 V DC to 120/230 V AC and replaced the broad
  catalog reference with the exact MLFB-specific Siemens URL.
- Kept lifecycle active and made no taxonomy, adapter, or Product aggregation
  changes.
- Added no Product exposure; the active Product total remains 132.

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
