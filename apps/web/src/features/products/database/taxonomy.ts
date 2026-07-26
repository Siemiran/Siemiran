export const taxonomy = {
  brands: ["siemens", "schneider", "abb", "omron", "delta", "phoenix"],

  categories: [
    "PLC",
    "HMI",
    "Drives",
    "Industrial PC",
    "IO Systems",
    "Network",
    "Power Supply",
    "Software",
    "Sensors",
    "Relays",
    "Low Voltage",
    "Instrumentation",
    "Accessories",
  ],

  hierarchy: {
    brand: "Brand",
    category: "Category",
    family: "Family",
    series: "Series",
    product: "Product",
  },
} as const;
