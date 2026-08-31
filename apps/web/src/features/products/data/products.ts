import type { Product } from "@/features/products/types/product.types";
import { siemensPLC } from "@/features/products/database/siemens/plc";
import { mapSiemensPLCToProduct } from "@/features/products/database/siemens/plc.adapter";
import { mapSiemensS7300PowerSupplyToProduct } from "@/features/products/database/siemens/s7-300/ps.adapter";
import { siemensS7300PowerSupplies } from "@/features/products/database/siemens/s7-300/ps";
import { siemensS71200CPU } from "@/features/products/database/siemens/s7-1200/cpu";
import { mapSiemensS71200CPUToProduct } from "@/features/products/database/siemens/s7-1200/cpu.adapter";
import { siemensS71200G2CPU } from "@/features/products/database/siemens/s7-1200/g2/cpu";
import { siemensS71200G2PowerModules } from "@/features/products/database/siemens/s7-1200/g2/pm";
import { s71200G2SignalBoards } from "@/features/products/database/siemens/s7-1200/g2/sb";
import { siemensS71200G2SM } from "@/features/products/database/siemens/s7-1200/g2/sm";
import { mapSiemensS71200PowerModuleToProduct } from "@/features/products/database/siemens/s7-1200/pm.adapter";
import { siemensS71200PowerModules } from "@/features/products/database/siemens/s7-1200/pm";
import { mapSiemensS71200SignalBoardToProduct } from "@/features/products/database/siemens/s7-1200/sb.adapter";
import { siemensS71200SM } from "@/features/products/database/siemens/s7-1200/sm";
import { mapSiemensS71200SignalModuleToProduct } from "@/features/products/database/siemens/s7-1200/sm.adapter";

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
];
