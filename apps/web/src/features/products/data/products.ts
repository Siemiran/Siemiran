import type { Product } from "@/features/products/types/product.types";
import { siemensPLC } from "@/features/products/database/siemens/plc";
import { mapSiemensPLCToProduct } from "@/features/products/database/siemens/plc.adapter";
import { mapSiemensS7300PowerSupplyToProduct } from "@/features/products/database/siemens/s7-300/ps.adapter";
import { siemensS7300PowerSupplies } from "@/features/products/database/siemens/s7-300/ps";
import { s71200CommunicationBoards } from "@/features/products/database/siemens/s7-1200/cb";
import { s71200CM } from "@/features/products/database/siemens/s7-1200/cm";
import { mapSiemensS71200CommunicationToProduct } from "@/features/products/database/siemens/s7-1200/communication.adapter";
import { s71200CP } from "@/features/products/database/siemens/s7-1200/cp";
import { siemensS71200CPU } from "@/features/products/database/siemens/s7-1200/cpu";
import { mapSiemensS71200CPUToProduct } from "@/features/products/database/siemens/s7-1200/cpu.adapter";
import { siemensS71200G2CPU } from "@/features/products/database/siemens/s7-1200/g2/cpu";
import { siemensS71200G2PowerModules } from "@/features/products/database/siemens/s7-1200/g2/pm";
import { s71200G2SignalBoards } from "@/features/products/database/siemens/s7-1200/g2/sb";
import { siemensS71200G2SM } from "@/features/products/database/siemens/s7-1200/g2/sm";
import { mapSiemensS71200NetworkSwitchToProduct } from "@/features/products/database/siemens/s7-1200/network-switch.adapter";
import { s71200OtherModules } from "@/features/products/database/siemens/s7-1200/other";
import { mapSiemensS71200PowerModuleToProduct } from "@/features/products/database/siemens/s7-1200/pm.adapter";
import { siemensS71200PowerModules } from "@/features/products/database/siemens/s7-1200/pm";
import { s71200SignalBoards } from "@/features/products/database/siemens/s7-1200/sb";
import { mapSiemensS71200SignalBoardToProduct } from "@/features/products/database/siemens/s7-1200/sb.adapter";
import { siemensS71200SM } from "@/features/products/database/siemens/s7-1200/sm";
import { mapSiemensS71200SignalModuleToProduct } from "@/features/products/database/siemens/s7-1200/sm.adapter";
import { s71200SpecialModules } from "@/features/products/database/siemens/s7-1200/special";
import { mapSiemensS71200SpecialModuleToProduct } from "@/features/products/database/siemens/s7-1200/special.adapter";

const verifiedSiemensPLCProducts: Product[] = siemensPLC.map(
  mapSiemensPLCToProduct
);

const verifiedSiemensS7300PowerSupplyProducts: Product[] =
  siemensS7300PowerSupplies.map(mapSiemensS7300PowerSupplyToProduct);

const verifiedSiemensS71200ClassicPowerModuleProducts: Product[] =
  siemensS71200PowerModules.map(mapSiemensS71200PowerModuleToProduct);

const verifiedSiemensS71200G2PowerModuleProducts: Product[] =
  siemensS71200G2PowerModules.map(mapSiemensS71200PowerModuleToProduct);

const verifiedSiemensS71200G2CPUProducts: Product[] =
  siemensS71200G2CPU.map(mapSiemensS71200CPUToProduct);

const verifiedSiemensS71200ClassicCPUProducts: Product[] =
  siemensS71200CPU.map(mapSiemensS71200CPUToProduct);

const verifiedSiemensS71200G2SignalModuleProducts: Product[] =
  siemensS71200G2SM.map(mapSiemensS71200SignalModuleToProduct);

const verifiedSiemensS71200G2SignalBoardProducts: Product[] =
  s71200G2SignalBoards.map(mapSiemensS71200SignalBoardToProduct);

const verifiedSiemensS71200ClassicSignalModuleProducts: Product[] =
  siemensS71200SM.map(mapSiemensS71200SignalModuleToProduct);

const verifiedSiemensS71200ClassicSignalBoardProducts: Product[] =
  s71200SignalBoards.map(mapSiemensS71200SignalBoardToProduct);

const verifiedSiemensS71200CommunicationModuleProducts: Product[] = [
  ...s71200CM.map(mapSiemensS71200CommunicationToProduct),
  ...s71200OtherModules
    .filter((source) => source.productTypeId === "Communication Module")
    .map(mapSiemensS71200CommunicationToProduct),
];

const verifiedSiemensS71200CommunicationProcessorProducts: Product[] =
  s71200CP.map(mapSiemensS71200CommunicationToProduct);

const verifiedSiemensS71200CommunicationBoardProducts: Product[] =
  s71200CommunicationBoards.map(mapSiemensS71200CommunicationToProduct);

const verifiedSiemensS71200SpecialModuleProducts: Product[] =
  s71200SpecialModules
    .filter((source) => source.productTypeId === "Special Module")
    .map(mapSiemensS71200SpecialModuleToProduct);

const verifiedSiemensS71200TechnologyModuleProducts: Product[] =
  s71200SpecialModules
    .filter((source) => source.productTypeId === "Technology Module")
    .map(mapSiemensS71200SpecialModuleToProduct);

const verifiedSiemensS71200NetworkSwitchProducts: Product[] =
  s71200OtherModules
    .filter((source) => source.productTypeId === "Network Switch")
    .map(mapSiemensS71200NetworkSwitchToProduct);

export const products: Product[] = [
  ...verifiedSiemensPLCProducts,
  ...verifiedSiemensS7300PowerSupplyProducts,
  ...verifiedSiemensS71200ClassicPowerModuleProducts,
  ...verifiedSiemensS71200G2PowerModuleProducts,
  ...verifiedSiemensS71200G2CPUProducts,
  ...verifiedSiemensS71200ClassicCPUProducts,
  ...verifiedSiemensS71200G2SignalModuleProducts,
  ...verifiedSiemensS71200G2SignalBoardProducts,
  ...verifiedSiemensS71200ClassicSignalModuleProducts,
  ...verifiedSiemensS71200ClassicSignalBoardProducts,
  ...verifiedSiemensS71200CommunicationModuleProducts,
  ...verifiedSiemensS71200CommunicationProcessorProducts,
  ...verifiedSiemensS71200CommunicationBoardProducts,
  ...verifiedSiemensS71200SpecialModuleProducts,
  ...verifiedSiemensS71200TechnologyModuleProducts,
  ...verifiedSiemensS71200NetworkSwitchProducts,
];
