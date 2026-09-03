export type SiemensS7300CPLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS7300CommunicationProcessor {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-300";
  seriesId: "S7-300";

  productTypeId: "Communication Processor";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS7300CPLifecycle;

  specifications: {
    interface?: string;
    interfaces?: string[];
    supplyVoltage?: string;
    transmissionRate?: string;
    protocols?: string[];
    connector?: string;
    cableLength?: string;
    diagnostics?: string;
  };

  source: string;
}

export const s7300CP: SiemensS7300CommunicationProcessor[] = [
  // --------------------------------------------------
  // S7-300 — CP 340 — Point-to-Point Communication
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp340-rs232-1ah02-0ae0",
    mlfb: "6ES7340-1AH02-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "rs232",

    title: "SIMATIC S7-300 CP 340 RS232C",

    description:
      "SIMATIC S7-300 CP 340 communications processor with isolated RS232C (V.24) interface for point-to-point communication, including configuration package on CD.",

    lifecycle: "spare-part",

    specifications: {
      interface: "RS232C (V.24)",
      interfaces: ["RS232C"],
      supplyVoltage:
        "5 V DC via backplane bus; 24 V DC auxiliary supply not required",
      transmissionRate: "2.4 to 19.2 kbit/s",
      protocols: ["3964(R)", "ASCII", "Printer"],
      connector: "9-pin Sub-D socket",
      cableLength: "Up to 15 m",
      diagnostics: "RxD, TxD and SF LEDs",
    },

    source:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7340-1AH02-0AE0",
  },

  {
    id: "siemens-s7-300-cp340-tty-1bh02-0ae0",
    mlfb: "6ES7340-1BH02-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "20ma-tty",

    title: "SIMATIC S7-300 CP 340 20 mA (TTY)",

    description:
      "SIMATIC S7-300 CP 340 communications processor with isolated 20 mA (TTY) interface for point-to-point communication, including configuration package on CD.",

    lifecycle: "spare-part",

    specifications: {
      interface: "20 mA (TTY)",
      interfaces: ["20 mA (TTY)"],
      supplyVoltage:
        "5 V DC via backplane bus; 24 V DC auxiliary supply not required",
      transmissionRate: "2.4 to 19.2 kbit/s",
      protocols: ["3964(R)", "ASCII", "Printer"],
      connector: "9-pin Sub-D socket",
      cableLength: "Up to 1,000 m",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7340-1BH02-0AE0",
  },

  {
    id: "siemens-s7-300-cp340-rs422-485-1ch02-0ae0",
    mlfb: "6ES7340-1CH02-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "rs422-485",

    title: "SIMATIC S7-300 CP 340 RS422/485",

    description:
      "SIMATIC S7-300 CP 340 communications processor with isolated RS422/485 (X.27) interface for point-to-point communication, including configuration package on CD.",

    lifecycle: "spare-part",

    specifications: {
      interface: "RS422 / RS485 (X.27)",
      interfaces: ["RS422", "RS485"],
      supplyVoltage:
        "5 V DC via backplane bus; 24 V DC auxiliary supply not required",
      transmissionRate: "2.4 to 19.2 kbit/s",
      protocols: ["3964(R)", "ASCII", "Printer"],
      connector: "15-pin Sub-D socket",
      cableLength: "Up to 1,200 m",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7340-1CH02-0AE0",
  },

  // --------------------------------------------------
  // S7-300 — CP 341 — Point-to-Point Communication
  // Siemens CP 341 interface variants and hardware revisions.
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp341-rs232-1ah01-0ae0",
    mlfb: "6ES7341-1AH01-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "rs232",

    title: "SIMATIC S7-300 CP 341 RS232C",

    description:
      "SIMATIC S7-300 CP 341 communications processor with isolated RS232C interface for point-to-point communication and reloadable protocol drivers.",

    lifecycle: "discontinued",

    specifications: {
      interface: "RS232C (V.24)",
      interfaces: ["RS232C"],
      supplyVoltage: "24 V DC",
      transmissionRate: "Up to 38.4 kbit/s",
      protocols: ["3964(R)", "ASCII", "Printer"],
      connector: "9-pin Sub-D socket",
      cableLength: "Up to 15 m",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/25545680/25545680_sms_md720-3_library_v13_v1_0_en.pdf",
  },

  {
    id: "siemens-s7-300-cp341-rs232-1ah02-0ae0",
    mlfb: "6ES7341-1AH02-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "rs232",

    title: "SIMATIC S7-300 CP 341 RS232C",

    description:
      "SIMATIC S7-300 CP 341 communications processor with isolated RS232C interface for point-to-point communication, including configuration package on CD.",

    lifecycle: "spare-part",

    specifications: {
      interface: "RS232C (V.24)",
      interfaces: ["RS232C"],
      supplyVoltage: "24 V DC",
      transmissionRate: "0.3 to 115.2 kbit/s",
      protocols: ["3964(R)", "ASCII", "RK 512", "Printer"],
      connector: "9-pin Sub-D socket",
      cableLength: "Up to 15 m",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7341-1AH02-0AE0",
  },

  {
    id: "siemens-s7-300-cp341-tty-1bh01-0ae0",
    mlfb: "6ES7341-1BH01-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "20ma-tty",

    title: "SIMATIC S7-300 CP 341 20 mA (TTY)",

    description:
      "SIMATIC S7-300 CP 341 communications processor with isolated 20 mA (TTY) interface for point-to-point communication and reloadable protocol drivers.",

    lifecycle: "discontinued",

    specifications: {
      interface: "20 mA (TTY)",
      interfaces: ["20 mA (TTY)"],
      supplyVoltage: "24 V DC",
      transmissionRate: "Up to 38.4 kbit/s",
      protocols: ["3964(R)", "ASCII", "Printer"],
      connector: "9-pin Sub-D socket",
      cableLength: "Up to 1,000 m",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/25545680/25545680_sms_md720-3_library_v13_v1_0_en.pdf",
  },

  {
    id: "siemens-s7-300-cp341-tty-1bh02-0ae0",
    mlfb: "6ES7341-1BH02-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "20ma-tty",

    title: "SIMATIC S7-300 CP 341 20 mA (TTY)",

    description:
      "SIMATIC S7-300 CP 341 communications processor with isolated 20 mA (TTY) interface for point-to-point communication, including configuration package on CD.",

    lifecycle: "spare-part",

    specifications: {
      interface: "20 mA (TTY)",
      interfaces: ["20 mA (TTY)"],
      supplyVoltage: "24 V DC",
      transmissionRate: "0.3 to 115.2 kbit/s",
      protocols: ["3964(R)", "ASCII", "RK 512", "Printer"],
      connector: "9-pin Sub-D socket",
      cableLength: "Up to 1,000 m",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7341-1BH02-0AE0",
  },

  {
    id: "siemens-s7-300-cp341-rs422-485-1ch01-0ae0",
    mlfb: "6ES7341-1CH01-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "rs422-485",

    title: "SIMATIC S7-300 CP 341 RS422/485",

    description:
      "SIMATIC S7-300 CP 341 communications processor with isolated RS422 interface for point-to-point communication and reloadable protocol drivers.",

    lifecycle: "discontinued",

    specifications: {
      interface: "RS422 / RS485 (X.27)",
      interfaces: ["RS422", "RS485"],
      supplyVoltage: "24 V DC",
      transmissionRate: "Up to 38.4 kbit/s",
      protocols: ["3964(R)", "ASCII", "RK 512", "Printer"],
      connector: "15-pin Sub-D socket",
      cableLength: "Up to 1,200 m",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/16504365/PCS7_Released_Modules.pdf",
  },

  {
    id: "siemens-s7-300-cp341-rs422-485-1ch02-0ae0",
    mlfb: "6ES7341-1CH02-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "rs422-485",

    title: "SIMATIC S7-300 CP 341 RS422/485",

    description:
      "SIMATIC S7-300 CP 341 communications processor with isolated RS422/485 interface for point-to-point communication, including configuration package on CD.",

    lifecycle: "spare-part",

    specifications: {
      interface: "RS422 / RS485 (X.27)",
      interfaces: ["RS422", "RS485"],
      supplyVoltage: "24 V DC",
      transmissionRate: "0.3 to 115.2 kbit/s",
      protocols: ["3964(R)", "ASCII", "RK 512", "Printer"],
      connector: "15-pin Sub-D socket",
      cableLength: "Up to 1,200 m",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7341-1CH02-0AE0",
  },

  // --------------------------------------------------
  // S7-300 — CP 342-5 — PROFIBUS DP
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp342-5-da01-0xe0",
    mlfb: "6GK7342-5DA01-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "profibus-dp",

    title: "SIMATIC S7-300 CP 342-5 PROFIBUS DP",

    description:
      "SIMATIC S7-300 communications processor for connection to PROFIBUS DP, with S5-compatible, PG/OP and S7 communication services.",

    lifecycle: "discontinued",

    specifications: {
      interface: "PROFIBUS DP",
      interfaces: ["PROFIBUS DP"],
      supplyVoltage: "5 V DC via backplane bus; 24 V DC external supply",
      transmissionRate: "9.6 kbit/s to 12 Mbit/s",
      protocols: [
        "PROFIBUS DP",
        "S5-compatible communication",
        "PG/OP communication",
        "S7 communication",
      ],
      connector: "9-pin Sub-D socket (RS485)",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/67225941/HY_S7-CPs-PB_76.pdf",
  },

  {
    id: "siemens-s7-300-cp342-5-da02-0xe0",
    mlfb: "6GK7342-5DA02-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "profibus-dp",

    title: "SIMATIC S7-300 CP 342-5 PROFIBUS DP",

    description:
      "SIMATIC S7-300 communications processor for connection to PROFIBUS DP, with S5-compatible, PG/OP and S7 communication services.",

    lifecycle: "discontinued",

    specifications: {
      interface: "PROFIBUS DP",
      interfaces: ["PROFIBUS DP"],
      supplyVoltage: "5 V DC via backplane bus; 24 V DC external supply",
      transmissionRate: "9.6 kbit/s to 12 Mbit/s",
      protocols: [
        "PROFIBUS DP",
        "S5-compatible communication",
        "PG/OP communication",
        "S7 communication",
      ],
      connector: "9-pin Sub-D socket (RS485)",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/67225941/HY_S7-CPs-PB_76.pdf",
  },

  {
    id: "siemens-s7-300-cp342-5-da03-0xe0",
    mlfb: "6GK7342-5DA03-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "profibus-dp",

    title: "SIMATIC S7-300 CP 342-5 PROFIBUS DP",

    description:
      "SIMATIC S7-300 communications processor for connection to PROFIBUS DP, with S5-compatible, PG/OP and S7 communication services.",

    lifecycle: "spare-part",

    specifications: {
      interface: "PROFIBUS DP",
      interfaces: ["PROFIBUS DP"],
      supplyVoltage: "5 V DC via backplane bus; 24 V DC external supply",
      transmissionRate: "9.6 kbit/s to 12 Mbit/s",
      protocols: [
        "PROFIBUS DP",
        "S5-compatible communication",
        "PG/OP communication",
        "S7 communication",
      ],
      connector: "9-pin Sub-D socket (RS485)",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6GK7342-5DA03-0XE0&lang=en",
  },

  {
    id: "siemens-s7-300-cp342-5-fo-df00-0xe0",
    mlfb: "6GK7342-5DF00-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "profibus-dp-fo",

    title: "SIMATIC S7-300 CP 342-5 FO PROFIBUS DP",

    description:
      "SIMATIC S7-300 communications processor for PROFIBUS DP over optical fiber, with S5-compatible, PG/OP and S7 communication services.",

    lifecycle: "discontinued",

    specifications: {
      interface: "PROFIBUS DP FO",
      interfaces: ["PROFIBUS DP", "Optical fiber"],
      supplyVoltage: "5 V DC via backplane bus; 24 V DC external supply",
      transmissionRate: "9.6 kbit/s to 12 Mbit/s",
      protocols: [
        "PROFIBUS DP",
        "S5-compatible communication",
        "PG/OP communication",
        "S7 communication",
      ],
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/67225941/HY_S7-CPs-PB_76.pdf",
  },

  {
    id: "siemens-siplus-s7-300-cp342-5-da03-7xe0",
    mlfb: "6AG1342-5DA03-7XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "profibus-dp",

    title: "SIPLUS NET S7-300 CP 342-5 PROFIBUS DP",

    description:
      "SIPLUS NET communications processor CP 342-5 based on 6GK7342-5DA03-0XE0, with conformal coating and extended environmental temperature range, for connection of SIMATIC S7-300 to PROFIBUS DP.",

    lifecycle: "spare-part",

    specifications: {
      interface: "PROFIBUS DP",
      interfaces: ["PROFIBUS DP"],
      supplyVoltage: "5 V DC via backplane bus; 24 V DC external supply",
      transmissionRate: "9.6 kbit/s to 12 Mbit/s",
      protocols: [
        "PROFIBUS DP",
        "S5-compatible communication",
        "PG/OP communication",
        "S7 communication",
      ],
      connector: "9-pin Sub-D socket (RS485)",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/interhydroilown/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1342-5DA03-7XE0",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-1 — Industrial Ethernet / PROFINET
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp343-1-ex11-0xe0",
    mlfb: "6GK7343-1EX11-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet",

    title: "SIMATIC S7-300 CP 343-1",

    description:
      "SIMATIC S7-300 communications processor for Industrial Ethernet with TCP/IP and ISO communication, supporting S7 communication, open communication and PROFINET IO device functionality.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "ISO-on-TCP",
        "ISO transport",
        "S7 communication",
        "SEND/RECEIVE",
        "PROFINET IO",
      ],
      connector: "2 x RJ45",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/16767769/IE_CP_S7-300_e.pdf",
  },

  {
    id: "siemens-s7-300-cp343-1-ex21-0xe0",
    mlfb: "6GK7343-1EX21-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet",

    title: "SIMATIC S7-300 CP 343-1",

    description:
      "SIMATIC S7-300 communications processor for Industrial Ethernet with TCP/IP and ISO communication, supporting S7 communication, open communication and PROFINET IO device functionality.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "ISO-on-TCP",
        "ISO transport",
        "S7 communication",
        "SEND/RECEIVE",
        "PROFINET IO",
      ],
      connector: "2 x RJ45",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/16767769/IE_CP_S7-300_e.pdf",
  },

  {
    id: "siemens-s7-300-cp343-1-ex30-0xe0",
    mlfb: "6GK7343-1EX30-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet",

    title: "SIMATIC S7-300 CP 343-1",

    description:
      "SIMATIC S7-300 CP 343-1 communications processor for Industrial Ethernet via ISO and TCP/IP, PROFINET IO controller or PROFINET IO device, with integrated 2-port switch and S7 communication services.",

    lifecycle: "spare-part",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "ISO-on-TCP",
        "ISO transport",
        "S7 communication",
        "SEND/RECEIVE RFC1006",
        "PROFINET IO",
        "SNMP",
        "DHCP",
      ],
      connector: "2 x RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/EN/Catalog/Product/6GK7343-1EX30-0XE0",
  },

  {
    id: "siemens-s7-300-cp343-1-lean-cx10-0xe0",
    mlfb: "6GK7343-1CX10-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-lean",

    title: "SIMATIC S7-300 CP 343-1 Lean",

    description:
      "SIMATIC S7-300 CP 343-1 Lean communications processor for Industrial Ethernet via TCP/IP and UDP, supporting S7 communication, open communication, PROFINET IO device functionality and integrated 2-port switch.",

    lifecycle: "spare-part",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "UDP",
        "S7 communication",
        "SEND/RECEIVE",
        "PROFINET IO",
        "Multicast",
      ],
      connector: "2 x RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6GK7343-1CX10-0XE0&lang=en",
  },

  {
    id: "siemens-s7-300-cp343-1-advanced-gx30-0xe0",
    mlfb: "6GK7343-1GX30-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-advanced",

    title: "SIMATIC S7-300 CP 343-1 Advanced",

    description:
      "SIMATIC S7-300 CP 343-1 Advanced communications processor for Industrial Ethernet and PROFINET, with advanced communication services and integrated switch functionality.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "ISO-on-TCP",
        "ISO transport",
        "S7 communication",
        "SEND/RECEIVE",
        "PROFINET IO",
        "SNMP",
        "Multicast",
      ],
      connector: "2 x RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/16767769/IE_CP_S7-300_e.pdf",
  },

  {
    id: "siemens-s7-300-cp343-1-advanced-gx31-0xe0",
    mlfb: "6GK7343-1GX31-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-advanced",

    title: "SIMATIC S7-300 CP 343-1 Advanced",

    description:
      "SIMATIC S7-300 CP 343-1 Advanced communications processor for Industrial Ethernet and PROFINET with enhanced communication and synchronization functions.",

    lifecycle: "spare-part",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100/1000 Mbit/s",
      protocols: [
        "TCP/IP",
        "ISO-on-TCP",
        "ISO transport",
        "S7 communication",
        "SEND/RECEIVE",
        "PROFINET IO",
        "SNMP",
        "Multicast",
      ],
      connector: "RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6GK7343-1GX31-0XE0&lang=en",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-5 — PROFIBUS / FMS
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp343-5-fa00-0xe0",
    mlfb: "6GK7343-5FA00-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "profibus-fms",

    title: "SIMATIC S7-300 CP 343-5",

    description:
      "SIMATIC S7-300 communications processor for connection to PROFIBUS, supporting FMS, S5-compatible communication, PG/OP communication and S7 communication, single-width module.",

    lifecycle: "discontinued",

    specifications: {
      interface: "PROFIBUS",
      interfaces: ["PROFIBUS"],
      supplyVoltage: "5 V DC via backplane bus; 24 V DC external supply",
      transmissionRate: "9.6 kbit/s to 12 Mbit/s",
      protocols: [
        "PROFIBUS",
        "FMS",
        "S5-compatible communication",
        "PG/OP communication",
        "S7 communication",
      ],
      connector: "9-pin Sub-D socket (RS485)",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/78906145/78906145.pdf",
  },

  {
    id: "siemens-s7-300-cp343-5-fa01-0xe0",
    mlfb: "6GK7343-5FA01-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "profibus-fms",

    title: "SIMATIC S7-300 CP 343-5",

    description:
      "SIMATIC S7-300 communications processor for connection to PROFIBUS, supporting FMS, S5-compatible communication, PG/OP communication and S7 communication, with single-width module design.",

    lifecycle: "spare-part",

    specifications: {
      interface: "PROFIBUS",
      interfaces: ["PROFIBUS"],
      supplyVoltage: "5 V DC via backplane bus; 24 V DC external supply",
      transmissionRate: "9.6 kbit/s to 12 Mbit/s",
      protocols: [
        "PROFIBUS",
        "FMS",
        "S5-compatible communication",
        "PG/OP communication",
        "S7 communication",
      ],
      connector: "9-pin Sub-D socket (RS485)",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/8778841/GHB_CP343-5_76.pdf",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-2 — AS-Interface
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp343-2-ah00-0xa0",
    mlfb: "6GK7343-2AH00-0XA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "as-interface",

    title: "SIMATIC S7-300 CP 343-2 AS-Interface",

    description:
      "SIMATIC S7-300 CP 343-2 communications processor and AS-Interface master for connecting an S7-300 to an AS-Interface network.",

    lifecycle: "discontinued",

    specifications: {
      interface: "AS-Interface",
      interfaces: ["AS-Interface"],
      supplyVoltage: "5 V DC via backplane bus; AS-Interface supply via bus",
      protocols: ["AS-Interface"],
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/109823076/P7ASIDRB_en-US.pdf",
  },

  {
    id: "siemens-s7-300-cp343-2-ah01-0xa0",
    mlfb: "6GK7343-2AH01-0XA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "as-interface",

    title: "SIMATIC S7-300 CP 343-2 AS-Interface",

    description:
      "SIMATIC S7-300 CP 343-2 communications processor and AS-Interface master for connecting an S7-300 to an AS-Interface network.",

    lifecycle: "spare-part",

    specifications: {
      interface: "AS-Interface",
      interfaces: ["AS-Interface"],
      supplyVoltage: "5 V DC via backplane bus; AS-Interface supply via bus",
      protocols: ["AS-Interface"],
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/109823076/P7ASIDRB_en-US.pdf",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-2P — AS-Interface
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp343-2p-ah10-0xa0",
    mlfb: "6GK7343-2AH10-0XA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "as-interface-plus",

    title: "SIMATIC S7-300 CP 343-2P AS-Interface",

    description:
      "SIMATIC S7-300 CP 343-2P communications processor and AS-Interface master for connecting an S7-300 to an AS-Interface network.",

    lifecycle: "discontinued",

    specifications: {
      interface: "AS-Interface",
      interfaces: ["AS-Interface"],
      supplyVoltage: "5 V DC via backplane bus; AS-Interface supply via bus",
      protocols: ["AS-Interface"],
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/109823076/P7ASIDRB_en-US.pdf",
  },

  {
    id: "siemens-s7-300-cp343-2p-ah11-0xa0",
    mlfb: "6GK7343-2AH11-0XA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "as-interface-plus",

    title: "SIMATIC S7-300 CP 343-2P AS-Interface",

    description:
      "SIMATIC S7-300 CP 343-2P communications processor and AS-Interface master for connecting an S7-300 to an AS-Interface network.",

    lifecycle: "spare-part",

    specifications: {
      interface: "AS-Interface",
      interfaces: ["AS-Interface"],
      supplyVoltage: "5 V DC via backplane bus; AS-Interface supply via bus",
      protocols: ["AS-Interface"],
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/109823076/P7ASIDRB_en-US.pdf",
  },

  // --------------------------------------------------
  // S7-300 — CP 342-2 — AS-Interface
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp342-2-ah00-0xa0",
    mlfb: "6GK7342-2AH00-0XA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "as-interface",

    title: "SIMATIC S7-300 CP 342-2 AS-Interface",

    description:
      "SIMATIC NET S7-300 communications processor CP 342-2 for connecting an S7-300 to an AS-Interface network.",

    lifecycle: "spare-part",

    specifications: {
      interface: "AS-Interface",
      interfaces: ["AS-Interface"],
      supplyVoltage: "5 V DC via backplane bus; AS-Interface supply via bus",
      protocols: ["AS-Interface"],
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/16504365/PCS7_Released_Modules.pdf",
  },

  {
    id: "siemens-s7-300-cp342-2-ah01-0xa0",
    mlfb: "6GK7342-2AH01-0XA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "as-interface",

    title: "SIMATIC S7-300 CP 342-2 AS-Interface",

    description:
      "SIMATIC NET S7-300 communications processor CP 342-2 for connecting an S7-300 to an AS-Interface network.",

    lifecycle: "spare-part",

    specifications: {
      interface: "AS-Interface",
      interfaces: ["AS-Interface"],
      supplyVoltage: "5 V DC via backplane bus; AS-Interface supply via bus",
      protocols: ["AS-Interface"],
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/16504365/PCS7_Released_Modules.pdf",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-1 ISO — Industrial Ethernet
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp343-1-iso-ba00-0xe0",
    mlfb: "6GK7343-1BA00-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-iso",

    title: "SIMATIC S7-300 CP 343-1 ISO",

    description:
      "SIMATIC S7-300 communications processor for Industrial Ethernet with ISO transport communication.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10 Mbit/s",
      protocols: ["ISO transport", "S7 communication", "SEND/RECEIVE"],
      connector: "15-pin Sub-D interface",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/584459/584459_overview_cps_en.pdf",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-1 IT — Industrial Ethernet / IT
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp343-1it-gx00-0xe0",
    mlfb: "6GK7343-1GX00-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-it",

    title: "SIMATIC S7-300 CP 343-1 IT",

    description:
      "SIMATIC S7-300 CP 343-1 IT communications processor for Industrial Ethernet with TCP/IP and UDP, S7 communication, FETCH/WRITE, SEND/RECEIVE, FTP, HTTP diagnostics, NTP, SNMP, DHCP and email services.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet"],
      supplyVoltage: "5 V DC via backplane bus; 24 V DC external supply",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "UDP",
        "S7 communication",
        "FETCH/WRITE",
        "SEND/RECEIVE",
        "FTP",
        "HTTP",
        "NTP",
        "SNMP",
        "DHCP",
        "Email",
      ],
      connector: "RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/78906145/78906145.pdf",
  },

  {
    id: "siemens-s7-300-cp343-1it-gx11-0xe0",
    mlfb: "6GK7343-1GX11-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-it",

    title: "SIMATIC S7-300 CP 343-1 IT",

    description:
      "SIMATIC S7-300 CP 343-1 IT communications processor for Industrial Ethernet with TCP/IP and UDP, S7 communication, FETCH/WRITE, SEND/RECEIVE, FTP, HTTP diagnostics, NTP, SNMP, DHCP and email services.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet"],
      supplyVoltage: "5 V DC via backplane bus; 24 V DC external supply",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "UDP",
        "S7 communication",
        "FETCH/WRITE",
        "SEND/RECEIVE",
        "FTP",
        "HTTP",
        "NTP",
        "SNMP",
        "DHCP",
        "Email",
      ],
      connector: "RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/78906145/78906145.pdf",
  },

  {
    id: "siemens-s7-300-cp343-1it-gx20-0xe0",
    mlfb: "6GK7343-1GX20-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-it",

    title: "SIMATIC S7-300 CP 343-1 IT",

    description:
      "SIMATIC S7-300 CP 343-1 IT communications processor for Industrial Ethernet with TCP/IP and UDP, S7 communication, FETCH/WRITE, SEND/RECEIVE, HTML diagnostics, FTP client, NTP, SNMP, DHCP, email and web services.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet"],
      supplyVoltage: "5 V DC via backplane bus; 24 V DC external supply",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "UDP",
        "S7 communication",
        "FETCH/WRITE",
        "SEND/RECEIVE",
        "FTP",
        "HTTP",
        "NTP",
        "SNMP",
        "DHCP",
        "Email",
      ],
      connector: "RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/78906145/78906145.pdf",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-1 Advanced — Industrial Ethernet
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp343-1-advanced-gx21-0xe0",
    mlfb: "6GK7343-1GX21-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-advanced",

    title: "SIMATIC S7-300 CP 343-1 Advanced",

    description:
      "SIMATIC S7-300 CP 343-1 Advanced communications processor for Industrial Ethernet and PROFINET with advanced communication and network management functions.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "ISO-on-TCP",
        "ISO transport",
        "UDP",
        "S7 communication",
        "SEND/RECEIVE",
        "PROFINET IO",
        "SNMP",
        "DHCP",
        "Multicast",
      ],
      connector: "2 x RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/16767769/IE_CP_S7-300_e.pdf",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-5 — PROFIBUS / FMS
  // --------------------------------------------------

  // --------------------------------------------------
  // S7-300 — CP 343-1 ERPC — Industrial Ethernet
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp343-1-erpc-fx00-0xe0",
    mlfb: "6GK7343-1FX00-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-erpc",

    title: "SIMATIC S7-300 CP 343-1 ERPC",

    description:
      "SIMATIC S7-300 communications processor CP 343-1 ERPC for Industrial Ethernet communication and direct connection of S7-300 process data to enterprise resource planning systems.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "UDP",
        "S7 communication",
        "SEND/RECEIVE",
        "ERP communication",
      ],
      connector: "2 x RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://cache.industry.siemens.com/dl/files/561/109765561/att_978974/v1/SIMATIC_NET_IKPI_chap02_PROFINET_IE_English_2015.pdf",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-1 BACnet — Building Automation
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp343-1-bacnet-cx10-0xe0",
    mlfb: "6FL4343-1CX10-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "bacnet",

    title: "SIMATIC S7-300 CP 343-1 BACnet",

    description:
      "SIMATIC S7-300 communications processor CP 343-1 BACnet for connecting S7-300 automation systems to BACnet/IP building automation networks.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "BACnet/IP"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: ["BACnet/IP", "TCP/IP"],
      connector: "RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://sid.siemens.com/api/khub/documents/6F7efyrNuR7e_13efi0kVA/content",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-1 Lean
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp343-1-lean-cx00-0xe0",
    mlfb: "6GK7343-1CX00-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-lean",

    title: "SIMATIC S7-300 CP 343-1 Lean",

    description:
      "SIMATIC S7-300 communications processor CP 343-1 Lean for Industrial Ethernet communication with TCP/IP, UDP and S7 communication services.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: ["TCP/IP", "UDP", "S7 communication", "SEND/RECEIVE"],
      connector: "RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/16767769/IE_CP_S7-300_e.pdf",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-1 Lean — SIPLUS
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-300-cp343-1-lean-cx10-2xe0",
    mlfb: "6AG1343-1CX10-2XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-lean",

    title: "SIPLUS S7-300 CP 343-1 Lean",

    description:
      "SIPLUS NET CP 343-1 Lean based on 6GK7343-1CX10-0XE0 for connecting SIMATIC S7-300 to Industrial Ethernet via TCP/IP and UDP, with PROFINET IO device functionality, integrated 2-port switch and conformal coating for extended environmental conditions.",

    lifecycle: "spare-part",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "UDP",
        "S7 communication",
        "SEND/RECEIVE",
        "PROFINET IO",
        "SNMP",
        "Multicast",
      ],
      connector: "2 x RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/23643456/GH_CP343-1-Lean-CX10_76.pdf",
  },

  // --------------------------------------------------
  // S7-300 — CP 343-1 — Industrial Ethernet
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cp343-1-ex00-0xe0",
    mlfb: "6GK7343-1EX00-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet",

    title: "SIMATIC S7-300 CP 343-1",

    description:
      "SIMATIC S7-300 CP 343-1 communications processor for Industrial Ethernet with S7 communication and open communication services.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10 Mbit/s",
      protocols: [
        "ISO transport",
        "TCP/IP",
        "S7 communication",
        "SEND/RECEIVE",
      ],
      connector: "15-pin Sub-D",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/56699406/hy_S7-CPs-IE_76.pdf",
  },

  {
    id: "siemens-s7-300-cp343-1-ex10-0xe0",
    mlfb: "6GK7343-1EX10-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet",

    title: "SIMATIC S7-300 CP 343-1",

    description:
      "SIMATIC S7-300 CP 343-1 communications processor for Industrial Ethernet with Fast Ethernet and expanded TCP/IP communication functions.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "ISO transport",
        "TCP/IP",
        "S7 communication",
        "SEND/RECEIVE",
      ],
      connector: "2 x RJ45",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/56699406/hy_S7-CPs-IE_76.pdf",
  },

  {
    id: "siemens-s7-300-cp343-1-ex20-0xe0",
    mlfb: "6GK7343-1EX20-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet",

    title: "SIMATIC S7-300 CP 343-1",

    description:
      "SIMATIC S7-300 CP 343-1 communications processor for Industrial Ethernet with TCP/IP and UDP communication, PROFINET IO functionality and integrated 2-port switch.",

    lifecycle: "discontinued",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "UDP",
        "S7 communication",
        "SEND/RECEIVE",
        "PROFINET IO",
      ],
      connector: "2 x RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/56699406/hy_S7-CPs-IE_76.pdf",
  },

  {
    id: "siemens-s7-300-cp343-1-pn-hx00-0xe0",
    mlfb: "6GK7343-1HX00-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "profinet",

    title: "SIMATIC S7-300 CP 343-1 PN",

    description:
      "SIMATIC S7-300 CP 343-1 PN communications processor for PROFINET communication and Industrial Ethernet networking.",

    lifecycle: "discontinued",

    specifications: {
      interface: "PROFINET",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: ["TCP/IP", "S7 communication", "PROFINET IO"],
      connector: "RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/78906145/78906145.pdf",
  },

  // --------------------------------------------------
  // S7-300 — SIPLUS CP 343-1 — Industrial Ethernet
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-300-cp343-1-ex30-7xe0",
    mlfb: "6AG1343-1EX30-7XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet",

    title: "SIPLUS S7-300 CP 343-1",

    description:
      "SIPLUS NET CP 343-1 based on 6GK7343-1EX30-0XE0 with conformal coating and extended environmental temperature range, for connecting SIMATIC S7-300 to Industrial Ethernet via ISO and TCP/IP, with PROFINET IO controller/device functionality and integrated 2-port switch.",

    lifecycle: "phase-out",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100 Mbit/s",
      protocols: [
        "TCP/IP",
        "ISO",
        "S7 communication",
        "SEND/RECEIVE",
        "PROFINET IO",
        "SNMP",
        "DHCP",
        "Multicast",
      ],
      connector: "2 x RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://mall.industry.siemens.com/mall/tw/EN/Catalog/Product/?mlfb=6AG1343-1EX30-7XE0",
  },

  {
    id: "siemens-siplus-s7-300-cp343-1-advanced-gx31-4xe0",
    mlfb: "6AG1343-1GX31-4XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-advanced",

    title: "SIPLUS S7-300 CP 343-1 Advanced",

    description:
      "SIPLUS NET CP 343-1 Advanced based on 6GK7343-1GX31-0XE0 with conformal coating and extended environmental temperature range, supporting PROFINET IO controller/device, RT/IRT, MRP, PROFINET CBA, Industrial Ethernet and advanced communication services.",

    lifecycle: "spare-part",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Industrial Ethernet", "PROFINET IO"],
      supplyVoltage: "24 V DC",
      transmissionRate: "10/100/1000 Mbit/s",
      protocols: [
        "TCP/IP",
        "ISO",
        "UDP",
        "S7 communication",
        "S5-compatible communication",
        "SEND/RECEIVE",
        "PROFINET IO",
        "PROFINET CBA",
        "SNMP",
        "DHCP",
        "FTP",
        "Email",
        "MRP",
        "PROFIenergy",
      ],
      connector: "3 x RJ45",
      diagnostics: "Diagnostics and status LEDs",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/conateluyown/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1343-1GX31-4XE0",
  },
];
