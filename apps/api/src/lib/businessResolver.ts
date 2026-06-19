import { Model, Document } from "mongoose";
import {
  RactyshGroupModel,
  ArchitectureModel,
  ConstructionModel,
  OtcExchangeModel,
  RealEstateModel,
  ImportExportModel
} from "../models/BusinessCollections.js";

export const BUSINESS_TYPE_MAP: Record<string, { model: Model<Document>; collection: string }> = {
  "ractysh-group": { model: RactyshGroupModel, collection: "ractysh_groups" },
  "architecture": { model: ArchitectureModel, collection: "architectures" },
  "construction": { model: ConstructionModel, collection: "constructions" },
  "otc-exchange": { model: OtcExchangeModel, collection: "otc_exchanges" },
  "real-estate": { model: RealEstateModel, collection: "real_estates" },
  "import-export": { model: ImportExportModel, collection: "import_exports" }
};

export const VALID_BUSINESS_TYPES = Object.keys(BUSINESS_TYPE_MAP);

export function getBusinessModel(type: string): Model<Document> | null {
  const entry = BUSINESS_TYPE_MAP[type];
  return entry ? entry.model : null;
}

export function getBusinessCollection(type: string): string | null {
  const entry = BUSINESS_TYPE_MAP[type];
  return entry ? entry.collection : null;
}

export function isValidBusinessType(type: string): boolean {
  return type in BUSINESS_TYPE_MAP;
}

export function normalizeBusinessType(input: string): string {
  const normalized = input
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\botc\b/g, "otc-exchange")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (normalized === "group" || normalized === "ractysh") return "ractysh-group";
  if (normalized === "import-and-export" || normalized === "export-import") return "import-export";
  if (normalized === "otc") return "otc-exchange";

  return VALID_BUSINESS_TYPES.includes(normalized) ? normalized : "ractysh-group";
}
