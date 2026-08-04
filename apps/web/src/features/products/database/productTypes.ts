export const productTypes = {
  siemens: {
    PLC: {
      "S7-1200": [
        "CPU",
        "Signal Module",
        "Communication Module",
        "Technology Module",
        "Power Supply",
        "Memory Card",
        "Starter Kit",
        "Accessory",
      ],

      "S7-1500": [
        "CPU",
        "Signal Module",
        "Communication Module",
        "Technology Module",
        "Failsafe CPU",
        "Redundant CPU",
        "Power Supply",
        "Memory Card",
        "Accessory",
      ],

      LOGO: [
        "Base Module",
        "Expansion Module",
        "Communication Module",
        "Power Supply",
        "Accessory",
      ],
    },

    Drives: {
      "SINAMICS V20": [
        "Drive Unit",
        "Brake Module",
        "Filter",
        "Accessory",
      ],

      "SINAMICS G120": [
        "Power Module",
        "Control Unit",
        "Operator Panel",
        "Brake Module",
        "Accessory",
      ],
    },

    HMI: {
      "Basic Panel": [
        "HMI",
        "Accessory",
      ],

      "Comfort Panel": [
        "HMI",
        "Accessory",
      ],

      "Unified Panel": [
        "HMI",
        "Accessory",
      ],
    },
  },
} as const;