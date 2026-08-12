# Siemens S7-300 — Verified Deep Taxonomy

**Status:** Verified structural baseline  
**Priority:** P0  
**Parent:** Siemens → SIMATIC → Advanced Controllers → S7-300

---

## 1. System Components

### 1.1 Racks / Mounting

- Mounting Rail
- Rack / system components
- Shielding / grounding accessories

### 1.2 Power Supply

- PS
- SIPLUS PS variants where applicable
- Power supply accessories

### 1.3 Central Processing Units

CPU MUST be modeled as a family with variants.

Baseline:

- Standard CPU
- Compact CPU
- CPU with integrated technology functions
- CPU with integrated communication
- CPU with PROFINET
- CPU with PROFIBUS DP
- CPU with MPI
- Other officially verified CPU variants
- SIPLUS CPU variants

Examples of historically verified CPU families include:

- CPU 312
- CPU 313
- CPU 314
- CPU 315
- CPU 316
- CPU 317
- CPU 318
- CPU 31xC compact CPUs
- CPU variants with DP / PN interfaces

DO NOT encode these examples as exhaustive product records yet.

---

# 2. Signal Modules — SM

Signal Modules MUST be split by electrical signal class.

## 2.1 Digital Input

- DI

Possible electrical / functional variants must be represented when verified:

- 24 V DC
- 120 V AC
- 230 V AC
- High-speed
- Diagnostic
- Other verified variants

## 2.2 Digital Output

- DO

Possible variants:

- Transistor
- Relay
- AC
- Diagnostic
- High-speed
- Other verified variants

## 2.3 Digital Input / Output

- DI/DO
- Mixed digital modules
- Other verified combinations

## 2.4 Analog Input

- AI
- Voltage
- Current
- RTD
- Thermocouple
- Other verified analog input types

## 2.5 Analog Output

- AO
- Voltage
- Current
- Other verified analog output types

## 2.6 Analog Input / Output

- AI/AO
- Mixed analog modules
- Other verified combinations

---

# 3. Functional / Special I/O

S7-300 I/O taxonomy MUST NOT stop at DI/DO/AI/AO.

Official Siemens catalog structure includes additional module classes.

## 3.1 F-Digital / Analog Modules

- F-DI
- F-DO
- F-DI/DO
- F-AI
- F-AO
- Other verified fail-safe signal modules

## 3.2 Ex Digital Modules

- Ex-DI
- Ex-DO
- Other verified Ex digital modules

## 3.3 Ex Analog Modules

- Ex-AI
- Ex-AO
- Other verified Ex analog modules

## 3.4 Function Modules — FM

Baseline:

- Counter
- Position
- Motion / positioning
- Closed-loop control
- High-speed processing
- Other verified FM families

Verified examples include:

- FM 350-1
- FM 350-2
- Other FM families discovered through Siemens catalog verification

FM 350-1 is an actual S7-300 counter module, and Siemens Industry Mall identifies it as an FM product family. 

---

# 4. Communication Processors — CP

CP MUST be a dedicated branch.

Baseline:

- Industrial Ethernet CP
- PROFIBUS CP
- Point-to-Point CP
- Serial communication
- Other verified communication processors

Example:

- CP 342-5 DP

The official S7-300 documentation explicitly identifies CP as the communication processor class and gives CP 342-5 DP as an example. 

---

# 5. Interface Modules — IM

IM MUST be a separate Product Type.

Baseline:

- IM 360
- IM 361
- IM 365
- Other verified interface modules

Functions:

- Expansion rack connection
- Multi-row S7-300 configuration
- Distributed I/O connection where applicable
- Redundant / special configurations where applicable

Siemens documentation explicitly identifies IM as the module connecting multiple S7-300 rows. 

---

# 6. Communication / Network Components

S7-300 system-related communication components MUST be modeled separately from CP.

Baseline:

- MPI components
- PROFIBUS components
- PROFINET components where applicable
- Bus connectors
- Bus cables
- RS-485 components
- Repeaters
- Diagnostic repeaters
- Network accessories

---

# 7. Special Modules

Dedicated Special Module branch.

Baseline:

- Dummy modules
- Special-purpose modules
- SIPLUS special modules
- Other verified special modules

The Siemens Industry Mall explicitly exposes a Special Modules branch for S7-300, including DM 370 and SIPLUS special modules. 

---

# 8. Connection System

Baseline:

- Front connectors
- Connecting cables
- SIMATIC TOP connect
- Terminal systems
- Wiring accessories
- Other verified connection-system products

---

# 9. SIPLUS S7-300

SIPLUS MUST NOT be mixed into ordinary S7-300 product records.

Structure:

S7-300
└── SIPLUS
    ├── CPU
    ├── Signal Modules
    ├── Power Supply
    ├── Interface Modules
    ├── Special Modules
    └── Accessories

SIPLUS variants must preserve their relationship to the underlying standard SIMATIC product.

---

# 10. Accessories

Baseline:

- Micro Memory Card / MMC
- Front connectors
- Bus connectors
- Connecting cables
- Mounting rail
- Shielding / grounding
- Wiring accessories
- Replacement components
- Other officially verified accessories

---

# 11. Lifecycle

S7-300 contains legacy and discontinued products.

Lifecycle MUST NOT be used as a filter that deletes products.

Supported lifecycle values:

- active
- phase-out
- discontinued
- spare-part
- successor-available
- deleted-without-replacement

Example: Siemens Industry Mall identifies some S7-300 products as spare parts and some as discontinued/deleted, while providing successor information where applicable.

Therefore the catalog MUST preserve historical S7-300 products.

---

# 12. Canonical Product Record

Every populated S7-300 product should eventually support:

- brandId
- categoryId
- familyId
- seriesId
- productTypeId
- variant
- title
- MLFB
- manufacturerPartNumber
- lifecycle
- official Siemens URL
- datasheet
- manual
- certificates
- CAD
- firmware/software where applicable
- technical specifications
- compatibility
- accessories
- replacement/successor
- related products

---

# 13. Taxonomy Rule

The hierarchy is:

Siemens
→ SIMATIC
→ Advanced Controllers
→ S7-300
→ Product Type
→ Variant
→ Product
→ MLFB

Examples:

S7-300
→ CPU
→ Compact
→ CPU 313C-2 DP
→ MLFB

S7-300
→ Signal Module
→ Digital Input
→ specific module
→ MLFB

S7-300
→ Function Module
→ Counter
→ FM 350-1
→ MLFB

S7-300
→ Communication Processor
→ PROFIBUS
→ CP 342-5
→ MLFB

S7-300
→ Interface Module
→ Expansion
→ IM 360 / IM 361 / IM 365
→ MLFB

---

# 14. Implementation Rule

Do NOT populate the full S7-300 product catalog from assumptions.

First:

1. Verify official Siemens family.
2. Verify official product family.
3. Verify product type.
4. Verify variants.
5. Retrieve MLFB.
6. Retrieve lifecycle.
7. Retrieve official documentation.
8. Then import into database.

The taxonomy is authoritative only after official-source verification.

---

# 15. Current Verification Evidence

Primary Siemens documentation confirms the following S7-300 component classes:

- Power Supply
- CPU
- Signal Modules
- Function Modules
- Communication Processors
- Interface Modules
- Connection / bus components
- Accessories

Siemens Industry Mall additionally exposes:

- Central Processing Units
- I/O Modules
- Power Supplies
- Interface Modules
- SIPLUS
- Accessories
- Digital Modules
- Analog Modules
- F-Digital/Analog Modules
- Ex Digital Modules
- Ex Analog Modules
- Function Modules
- Communication
- Special Modules
- Connection System

This structure is the baseline for implementation.

