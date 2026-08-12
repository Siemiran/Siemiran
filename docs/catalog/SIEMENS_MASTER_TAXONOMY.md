# Siemens Master Taxonomy

**Status:** Draft — Research Baseline  
**Priority:** P0 — Highest catalog priority  
**Source policy:** Official Siemens sources first  
**Last reviewed:** 2026-08-07

---

## 1. Catalog Rules

Siemens is the primary and deepest product catalog of Siemiran.

The Siemens catalog MUST NOT be modeled as a flat list of products or as a small fixed list of categories.

Canonical hierarchy:

Brand
→ Portfolio
→ Family
→ Series
→ Product Type
→ Subtype / Variant
→ Product
→ MLFB / Order Number

The hierarchy MUST be extensible.

A family or series MUST NOT be forced into another family's structure when its real Siemens product organization differs.

Completeness means verified completeness from official Siemens sources, not model assumptions.

Lifecycle MUST be preserved. Legacy and discontinued products are not automatically removed from the catalog.

---

# 2. Siemens Portfolio Baseline

The initial Siemens master catalog must cover, at minimum:

- SIMATIC Automation
- SIMATIC Controllers
- SIMATIC ET 200 / Distributed I/O
- SIMATIC HMI
- SIMATIC Industrial PCs / Industrial Computing
- SIMATIC Industrial Identification
- Industrial Communication
- Industrial Edge
- TIA Portal / Automation Software
- SINAMICS Drive Technology
- SIMOTION / Motion Control
- SIRIUS Industrial Controls
- SENTRON Low Voltage
- SITOP Power Supplies
- Safety / Safety Integrated
- Process Instrumentation / SITRANS
- Process Control Systems
- Industrial Identification
- Accessories and system components

This list is a baseline and MUST be expanded whenever an official Siemens portfolio family is identified.

---

# 3. SIMATIC Controller Master Structure

## 3.1 SIMATIC S7-200

Family-level investigation required.

Product types must be verified from official Siemens documentation before population.

---

## 3.2 SIMATIC S7-200 SMART

Family-level investigation required.

Product types must be verified from official Siemens documentation before population.

---

## 3.3 SIMATIC S7-300

The S7-300 hierarchy MUST support, where applicable:

- Power Supply
- CPU
  - Standard
  - Compact
  - Technology
  - Fail-Safe
  - Other verified variants
- Signal Modules
  - DI
  - DO
  - DI/DO
  - AI
  - AO
  - AI/AO
- Communication Processors
  - CP
- Function Modules
  - FM
- Interface Modules
  - IM
- Technology Modules
- Accessories
- Memory / system components
- Other officially verified modules

S7-300 MUST NOT be represented only by CPU.

---

## 3.4 SIMATIC S7-400

The hierarchy MUST investigate and represent verified variants including:

- Standard CPU
- Fail-Safe
- High Availability
- S7-400H
- S7-400FH
- S7-410
- Power Supply
- Signal Modules
- Communication Processors
- Function Modules
- Interface Modules
- Accessories
- Other verified system components

---

## 3.5 SIMATIC S7-1200

Current and legacy product generations MUST be represented separately where required.

Baseline:

- S7-1200
- S7-1200 G2

Product types:

- CPU
- Signal Modules
  - DI
  - DO
  - DI/DO
  - AI
  - AO
  - AI/AO
- Communication Modules
- Communication Processors
- Technology Modules
- Power Supply / system components
- Memory
- Starter Kits
- Accessories
- Other verified modules

CPU subtypes MUST be investigated rather than reduced to a single CPU type.

---

## 3.6 SIMATIC S7-1500

Baseline product structures:

- Standard CPU
- Compact CPU
- Technology CPU / T-CPU
- Fail-Safe CPU / F-CPU
- Redundant / High Availability
- R/H systems
- Other officially verified CPU variants

Modules:

- Signal Modules
  - DI
  - DO
  - DI/DO
  - AI
  - AO
  - AI/AO
- Technology Modules
- Communication Modules
- Communication Processors
- Interface Modules
- Power Supply
- Load / system components
- Memory Cards
- Accessories
- Other verified modules

---

## 3.7 SIMATIC S7-1500 R/H

Dedicated high-availability controller family.

Must be modeled separately from ordinary S7-1500 where Siemens treats the product as a distinct system.

---

## 3.8 SIMATIC S7-1500S

Software Controller.

Must NOT be incorrectly modeled as ordinary hardware CPU.

---

## 3.9 SIMATIC S7-1500V

Virtual Controller.

Must be investigated and represented separately.

---

## 3.10 SIMATIC Distributed Controllers

Distributed controller families must be investigated separately.

---

# 4. SIMATIC ET 200 / Distributed I/O

The ET 200 catalog MUST include verified current and legacy families.

Baseline:

- ET 200SP
- ET 200MP
- ET 200AL
- ET 200pro
- ET 200eco PN
- ET 200clean
- ET 200BL
- Process Industry Distributed I/O
- Other verified ET 200 families

Each family should be decomposed into actual Siemens product types such as:

- Interface Module
- CPU / Controller
- DI
- DO
- DI/DO
- AI
- AO
- AI/AO
- Technology Module
- Communication Module
- Energy / Power Module
- Base Unit
- Terminal / system component
- Accessories

Do NOT assume every ET 200 family contains the same module types.

---

# 5. SIMATIC HMI

HMI MUST be modeled independently from PLC.

Baseline:

- Key Panels
- Basic Panels
- Comfort Panels
- Unified Basic Panels
- Unified Comfort Panels
- Unified Comfort PRO
- Unified Hygienic
- Mobile Panels
- Web Panels
- Thin Clients
- PC-based HMI
- SIPLUS HMI
- Legacy / Previous HMI Systems

HMI software:

- WinCC
- WinCC Unified
- WinCC Runtime
- Engineering licenses
- Options / Extensions

Siemens currently distinguishes Basic, Comfort, Mobile, PC-based and Unified HMI portfolios. Official Siemens documentation also lists Unified Basic, Unified Comfort and upcoming Unified Mobile products. :contentReference[oaicite:2]{index=2}

---

# 6. SINAMICS Drives

Drive taxonomy MUST NOT be a single "Drives" list.

Baseline families to investigate:

- SINAMICS V20
- SINAMICS G120
- SINAMICS G120X
- SINAMICS G120D
- SINAMICS G115D
- SINAMICS G130
- SINAMICS G150
- SINAMICS S120
- SINAMICS S210
- SINAMICS V90
- SINAMICS S200
- MICROMASTER
- SIMODRIVE
- Other verified Siemens drive families

Each family MUST be decomposed according to its actual Siemens architecture, for example:

- Power Module
- Control Unit
- Drive Unit
- Motor
- Servo Motor
- Operator Panel
- Brake
- Filter
- Line Reactor
- Communication
- Safety
- Accessories

Do NOT force identical product types onto every SINAMICS family.

---

# 7. SIRIUS Industrial Controls

SIRIUS MUST be treated as a major Siemens portfolio.

Baseline:

## SIRIUS Control

- Motor Starter Protectors
- Circuit Breakers
- Contactors
- Contactor Relays
- Overload Relays
- Current Monitoring
- Intelligent Link Modules
- Load Feeders
- Compact Starters
- Motor Management
- Accessories

## SIRIUS Start

- Motor Starters
- Soft Starters
- Direct Starters
- Reversing Starters
- Star-Delta Starters
- Enclosed Starters
- Accessories

## SIRIUS Command

- Pushbuttons
- Selector Switches
- Signaling Devices
- Command Devices
- Position / detection components
- Accessories

## SIRIUS Monitor

- Monitoring relays
- Current monitoring
- Motor management
- Safety monitoring
- Other verified monitoring products

Official Siemens SIRIUS portfolio explicitly separates Control, Start, Command and Monitor. :contentReference[oaicite:3]{index=3}

SIRIUS contactors include families such as 3RT, 3RT7, 3RH and related assemblies. :contentReference[oaicite:4]{index=4}

---

# 8. SENTRON Low Voltage

Low Voltage MUST be a major Siemens category.

Baseline:

- MCB
- MCCB
- ACB
- RCCB / RCD
- RCBO
- AFDD
- Fuse Systems
- Surge Protection
- Installation Devices
- Switching Devices
- Protection Devices
- Measurement / Metering
- Communication
- Accessories
- Other verified SENTRON products

Important families to investigate include:

- 5SY
- 5SL
- 5SV
- 5SU
- 5SM
- 3VA
- 3WA
- Other verified SENTRON families

Siemens' current SENTRON portfolio explicitly includes MCB, RCCB, AFDD/MCB combinations and RCBO products. :contentReference[oaicite:5]{index=5}

---

# 9. SITOP Power Supplies

Baseline:

- SITOP PSU
- SITOP UPS
- SITOP DC-UPS
- SITOP Selectivity
- SITOP Buffer
- SITOP Redundancy
- Accessories
- Other verified SITOP families

Existing project entries such as PSU100 / PSU300 / PSU6200 MUST be verified against the official catalog before being treated as canonical series.

---

# 10. SIMATIC Industrial Computing

Baseline:

- Box PC
- Rack PC
- Panel PC
- Industrial PCs
- Embedded / IoT
- IOT2050
- Industrial OS
- IPC Software
- IPC Diagnostics
- IPC Accessories

Siemens currently lists Box PC families including IOT2050, IPC BX-21A, IPC227G, IPC BX-39A and others. :contentReference[oaicite:6]{index=6}

Rack PC families include server and workstation classes such as IPC RS-545A, RS-828A, RW-543B, RW-545A, IPC647E and IPC847E. :contentReference[oaicite:7]{index=7}

---

# 11. Industrial Communication

Baseline:

- SCALANCE
- Industrial Ethernet
- PROFINET
- PROFIBUS
- Industrial Wireless
- Switches
- Routers
- Security
- Media converters
- Network management
- Communication modules
- Accessories

---

# 12. SIMATIC Industrial Identification

Baseline:

- SIMATIC Ident
- RFID
- RF200
- RF300
- RF1000
- RF100C
- Location Intelligence
- Identification software
- Accessories

Siemens currently positions SIMATIC Ident as an end-to-end RFID and Location Intelligence portfolio. :contentReference[oaicite:8]{index=8}

---

# 13. Industrial Edge

Baseline:

- Edge IPCs
- Edge Panels
- Software-based Edge Devices
- Industrial Edge Industrial Switches
- Industrial Edge Software
- Applications
- Accessories

Siemens currently identifies IPC, Panels, Software-based Devices and Industrial Switches as Industrial Edge device classes. :contentReference[oaicite:9]{index=9}

---

# 14. Process Instrumentation

Baseline:

- Flow
- Pressure
- Temperature
- Level
- Weighing
- Process analytics
- Communication
- Digital applications
- Accessories

SITRANS MUST be treated as a dedicated Siemens Process Instrumentation portfolio. :contentReference[oaicite:10]{index=10}

---

# 15. Safety

Safety MUST be represented across relevant Siemens families rather than as one flat product type.

Baseline areas:

- SIMATIC Safety
- SIRIUS Safety
- Safety Integrated
- Fail-Safe Controllers
- Fail-Safe I/O
- Safety switches
- Safety relays
- Emergency stop
- Safety drives
- Safety accessories

---

# 16. Motion Control

Baseline:

- SIMOTION
- SINAMICS motion products
- Servo systems
- Motion controllers
- Technology CPUs
- Technology Modules
- Motors
- Gear units
- Accessories

---

# 17. Software

Software MUST be separated from physical hardware.

Baseline:

- TIA Portal
- STEP 7
- WinCC
- WinCC Unified
- Startdrive
- PLCSIM
- PLCSIM Advanced
- SIMATIC Automation Tool
- Industrial Edge Software
- Engineering tools
- Runtime licenses
- Options / PowerPacks

---

# 18. Data Rules

Every product record SHOULD support:

- Siemens MLFB / Order Number
- Product title
- Official series
- Product type
- Variant
- Lifecycle
- Official Siemens URL
- Datasheet
- Manual
- Certificate
- Firmware
- Software
- CAD / CAx
- Technical specifications
- Compatibility
- Accessories
- Replacement product
- Related products

---

# 19. Brand Priority

Current target brands:

1. Siemens — P0 / primary
2. Schneider Electric — P1
3. Eaton — P1
4. Endress+Hauser — P1
5. Emerson — P1

The following brands currently present in the old database are NOT part of the new priority list:

- ABB
- Omron
- Delta
- Phoenix Contact

They MUST NOT be expanded unless explicitly reintroduced into the project roadmap.

---

# 20. Research Rule

Official Siemens sources are the primary authority.

Preferred sources:

1. Siemens official product pages
2. Siemens Industry Mall / SiePortal
3. Siemens official catalogs
4. Siemens official manuals and datasheets
5. Siemens official lifecycle information

Third-party sources may only be used to discover information and MUST NOT override official Siemens information.

No family, series, product type or variant is considered canonical until verified.

---

# 21. Current Status

This document is the Siemens taxonomy research baseline.

It is NOT yet the final product catalog.

The next stage is to verify every branch against Siemens official sources and then implement the verified hierarchy inside:

pps/web/src/features/products/database/

Product population comes AFTER taxonomy verification.

---

# VERIFIED BASELINE — Siemens SIMATIC / Industrial Portfolio

## Verified Controller Families

The official Siemens SIMATIC portfolio currently identifies the following controller branches:

- SIMATIC S7-1200 G2
- SIMATIC S7-1500
- SIMATIC S7-1500S Software Controller
- SIMATIC S7-1500 R/H
- SIMATIC S7-1500V Virtual PLC
- SIMATIC Distributed Controllers
- SIMATIC S7-300
- SIMATIC S7-400

Source: Siemens SIMATIC official portfolio.

## S7-300

S7-300 is a modular controller system.

The taxonomy must support at minimum:

- Central Processing Unit
- I/O Modules
- Power Supply
- Interface Modules
- Accessories
- Communication
- Function / Technology modules where officially applicable
- SIPLUS variants where applicable

The S7-300 must NOT be represented as a CPU-only family.

## S7-400

The taxonomy must distinguish:

- S7-400
- S7-400H
- S7-400F
- S7-400FH
- S7-410

Relevant module/product branches must include, where officially applicable:

- CPU
- Power Supply
- Signal / I/O Modules
- Communication Processors
- Interface Modules
- Function / Technology Modules
- Accessories

## ET 200

Verified Siemens ET 200 portfolio branches:

- ET 200MP
- ET 200SP
- ET 200BL
- ET 200AL
- ET 200pro
- ET 200eco PN
- ET 200clean
- Distributed Process I/O

Important rule:

Each ET 200 family MUST be modeled according to its own actual Siemens architecture.

Do not assume that every ET 200 family contains identical Product Types.

## SIRIUS

Verified major SIRIUS branches:

- SIRIUS Control
- SIRIUS Start
- SIRIUS Command
- SIRIUS Monitor

These branches must remain distinct in the taxonomy.

## SITOP

Verified SITOP areas:

- SITOP Power Supplies
- SITOP DC-UPS / UPS
- SITOP Selectivity
- SITOP Add-on Modules
- SITOP Redundancy / Buffer solutions where officially applicable
- Accessories

## Verification Status

The above branches are verified against current Siemens official sources.

This is NOT yet the final exhaustive Siemens product taxonomy.

Individual series, product types, variants and MLFBs require a second verification pass against Siemens Industry Mall / SiePortal and official product documentation before database population.

