export const productTypes = {
  siemens: {
    PLC: {
      "S7-200": [
        "CPU",
        "Expansion Module",
        "Communication Module",
        "Accessory",
      ],

      "S7-200 SMART": [
        "CPU",
        "Signal Module",
        "Communication Module",
        "Technology Module",
        "Accessory",
      ],

      "S7-300": [
        "Power Supply",
        "CPU",
        "Signal Module",
        "Function Module",
        "Communication Processor",
        "Interface Module",
        "Special Module",
        "Connection System",
        "Communication",
        "Accessory",
      ],

      "S7-400": [
        "Power Supply",
        "CPU",
        "Signal Module",
        "Function Module",
        "Communication Processor",
        "Interface Module",
        "Special Module",
        "Connection System",
        "Communication",
        "Accessory",
      ],

      "S7-1200": [
        "CPU",
        "Signal Module",
        "Signal Board",
        "Communication Module",
        "Communication Processor",
        "Technology Module",
        "Power Supply",
        "Memory Card",
        "Starter Kit",
        "Accessory",
      ],

      "S7-1200 G2": [
        "CPU",
        "Signal Module",
        "Signal Board",
        "Communication Module",
        "Technology Module",
        "Accessory",
      ],

      "S7-1500": [
        "CPU",
        "Signal Module",
        "Signal Board",
        "Communication Module",
        "Communication Processor",
        "Technology Module",
        "Interface Module",
        "Power Supply",
        "Memory Card",
        "Accessory",
      ],

      "S7-1500 R/H": [
        "R CPU",
        "H CPU",
        "Redundancy Components",
        "Synchronization Module",
        "Interface Module",
        "Signal Module",
        "Communication Module",
        "Accessory",
      ],

      "S7-1500S": [
        "CPU",
        "Fail-Safe CPU",
        "Technology CPU",
        "Signal Module",
        "Communication Module",
        "Accessory",
      ],

      "S7-1500V": [
        "Virtual Controller",
        "Virtual PLC",
        "Industrial Edge Integration",
        "Software",
        "Accessory",
      ],

      "ET 200 CPU": [
        "CPU",
        "Fail-Safe CPU",
        "Technology CPU",
        "Signal Module",
        "Communication Module",
        "Interface Module",
        "Accessory",
      ],

      "Distributed Controllers": [
        "ET 200SP CPU",
        "ET 200SP Open Controller",
        "Fail-Safe Controller",
        "Technology Controller",
        "Accessory",
      ],

      SIMOTION: [
        "Controller",
        "Motion Controller",
        "Drive-Based Controller",
        "Technology Module",
        "Accessory",
      ],

      "Open Controller": [
        "SIMATIC IPC",
        "Software Controller",
        "Open Controller",
        "Technology Controller",
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

    HMI: {
      "Basic Panel": ["HMI", "Accessory"],

      "Comfort Panel": ["HMI", "Accessory"],

      "Unified Panel": ["HMI", "Unified Comfort Panel", "Accessory"],

      "Mobile Panel": ["Mobile HMI", "Fail-Safe Mobile Panel", "Accessory"],

      "Industrial Flat Panel": ["Flat Panel", "Touch Panel", "Accessory"],

      "Industrial Monitor": ["Monitor", "Touch Monitor", "Accessory"],
    },

    Drives: {
      "SINAMICS V20": ["Drive Unit", "Accessory"],

      "SINAMICS G120": [
        "Power Module",
        "Control Unit",
        "Operator Panel",
        "Brake Module",
        "Filter",
        "Accessory",
      ],

      "SINAMICS G120C": ["Compact Drive", "Accessory"],

      "SINAMICS G120X": [
        "Power Module",
        "Control Unit",
        "Operator Panel",
        "Accessory",
      ],

      "SINAMICS G130": [
        "Power Module",
        "Control Unit",
        "Cabinet Components",
        "Accessory",
      ],

      "SINAMICS G150": [
        "Drive Cabinet",
        "Power Module",
        "Control Unit",
        "Accessory",
      ],

      "SINAMICS S120": [
        "Control Unit",
        "Power Module",
        "Motor Module",
        "Line Module",
        "Active Line Module",
        "Smart Line Module",
        "Booksize",
        "Chassis",
        "Cabinet Module",
        "Accessory",
      ],

      "SINAMICS S210": ["Servo Drive", "Control Unit", "Accessory"],

      "SINAMICS S220": [
        "Servo Drive",
        "Power Module",
        "Motor Module",
        "Accessory",
      ],

      "SINAMICS V90": ["Servo Drive", "Accessory"],

      MICROMASTER: ["Drive", "Control Unit", "Accessory"],

      SIMODRIVE: [
        "Drive",
        "Power Module",
        "Control Unit",
        "Motor Module",
        "Accessory",
      ],
    },

    Software: {
      "TIA Portal": [
        "STEP 7",
        "WinCC",
        "Startdrive",
        "PLCSIM",
        "PLCSIM Advanced",
        "Openness",
        "Engineering Software",
      ],

      "SIMATIC Automation Tool": [
        "Engineering Software",
        "Service Tool",
        "Accessory",
      ],
    },

    Network: {
      SCALANCE: [
        "Industrial Switch",
        "Router",
        "Wireless",
        "Media Converter",
        "Security",
        "Accessory",
      ],

      PROFINET: [
        "Controller",
        "Device",
        "Switch",
        "Interface Module",
        "Accessory",
      ],

      PROFIBUS: ["Master", "Slave", "Repeater", "Connector", "Accessory"],

      "Industrial Wireless": [
        "Wireless Access Point",
        "Wireless Client",
        "Antenna",
        "Accessory",
      ],
    },

    "IO Systems": {
      ET200SP: [
        "CPU",
        "Interface Module",
        "Digital Input",
        "Digital Output",
        "Digital I/O",
        "Analog Input",
        "Analog Output",
        "Analog I/O",
        "Technology Module",
        "Communication Module",
        "Fail-Safe Module",
        "Accessory",
      ],

      ET200MP: [
        "Interface Module",
        "Digital Module",
        "Analog Module",
        "Technology Module",
        "Communication Module",
        "Fail-Safe Module",
        "Accessory",
      ],

      ET200pro: [
        "Interface Module",
        "Digital Module",
        "Analog Module",
        "Technology Module",
        "Fail-Safe Module",
        "Accessory",
      ],

      ET200AL: [
        "Interface Module",
        "Digital Module",
        "Analog Module",
        "Technology Module",
        "Accessory",
      ],

      ET200eco: [
        "Digital Module",
        "Analog Module",
        "Interface Module",
        "Accessory",
      ],
    },

    "Power Supply": {
      "SITOP PSU100": ["Power Supply", "Accessory"],

      "SITOP PSU300": ["Power Supply", "Accessory"],

      "SITOP PSU6200": ["Power Supply", "Accessory"],

      "SITOP PSU8600": ["Power Supply", "Module", "Accessory"],

      "SITOP UPS": ["DC UPS", "Battery Module", "Accessory"],
    },

    Safety: {
      "SIMATIC Safety": [
        "Fail-Safe CPU",
        "Fail-Safe Module",
        "Fail-Safe I/O",
        "Accessory",
      ],

      "SIRIUS Safety": [
        "Safety Relay",
        "Safety Module",
        "Emergency Stop",
        "Accessory",
      ],

      "Safety Integrated": [
        "Safety Controller",
        "Safety Drive",
        "Safety I/O",
        "Accessory",
      ],
    },

    "Low Voltage": {
      SENTRON: [
        "MCB",
        "MCCB",
        "Circuit Breaker",
        "Switch Disconnector",
        "Protection Device",
        "Power Monitoring",
        "Accessory",
      ],

      SIRIUS: [
        "Contactor",
        "Motor Starter",
        "Overload Relay",
        "Control Relay",
        "Soft Starter",
        "Pushbutton",
        "Signaling Device",
        "Accessory",
      ],
    },

    "Industrial PC": {
      "SIMATIC IPC": ["Box PC", "Panel PC", "Rack PC", "Field PG", "Accessory"],
    },

    Instrumentation: {
      SITRANS: [
        "Pressure",
        "Temperature",
        "Flow",
        "Level",
        "Process Analytics",
        "Accessory",
      ],
    },

    "Industrial Edge": {
      "Industrial Edge": ["Edge Device", "Edge App", "Software", "Accessory"],
    },

    Identification: {
      "SIMATIC Ident": [
        "RFID Reader",
        "RFID Transponder",
        "Communication Module",
        "Accessory",
      ],
    },

    "Machine Vision": {
      "SIMATIC MV": ["Vision System", "Camera", "Lighting", "Accessory"],
    },

    Accessories: {
      "SIMATIC Accessories": [
        "Connector",
        "Cable",
        "Memory",
        "Mounting",
        "Replacement Part",
        "Accessory",
      ],
    },
  },
} as const;
