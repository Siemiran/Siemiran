export const families = {
  siemens: {
    PLC: [
      "LOGO!",
      "S7-200",
      "S7-200 SMART",
      "S7-300",
      "S7-400",
      "S7-1200",
      "S7-1500",
      "ET200 CPU",
      "SIMOTION",
      "Open Controller",
    ],

    HMI: [
      "Basic Panel",
      "Comfort Panel",
      "Unified Panel",
      "Mobile Panel",
      "Industrial Flat Panel",
      "Industrial Monitor",
    ],

    Drives: [
      "SINAMICS V20",
      "SINAMICS G120",
      "SINAMICS G120X",
      "SINAMICS G130",
      "SINAMICS G150",
      "SINAMICS S120",
      "SINAMICS V90",
      "MICROMASTER",
      "SIMODRIVE",
    ],

    Software: [
      "TIA Portal",
      "STEP 7",
      "WinCC",
      "Startdrive",
      "PLCSIM",
      "SIMATIC Automation Tool",
    ],

    Network: [
      "SCALANCE",
      "Industrial Ethernet",
      "PROFINET",
      "PROFIBUS",
      "Industrial Wireless",
    ],

    "IO Systems": ["ET200SP", "ET200MP", "ET200eco", "ET200pro", "ET200AL"],

    "Power Supply": [
      "SITOP PSU100",
      "SITOP PSU300",
      "SITOP PSU6200",
      "SITOP UPS",
    ],

    Safety: ["SIMATIC Safety", "SIRIUS Safety", "Safety Integrated"],
  },
} as const;
