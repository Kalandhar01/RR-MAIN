export type DivisionPortalKey = "architecture" | "construction" | "real-estate" | "import-export" | "otc-exchange";

export type DivisionPortalVisualKind = "architecture" | "construction" | "real-estate" | "trade" | "network";

export interface DivisionPortalConfig {
  title: string;
  label: string;
  metadataDescription: string;
  visualKind: DivisionPortalVisualKind;
}

export const divisionPortalConfig: Record<DivisionPortalKey, DivisionPortalConfig> = {
  architecture: {
    title: "Architecture Division",
    label: "Architectural blueprint wireframe",
    metadataDescription: "Architecture Division launching soon inside the RACTYSH enterprise ecosystem.",
    visualKind: "architecture",
  },
  construction: {
    title: "Construction Division",
    label: "Structural framework animation",
    metadataDescription: "Construction Division launching soon inside the RACTYSH enterprise ecosystem.",
    visualKind: "construction",
  },
  "real-estate": {
    title: "Real Estate Division",
    label: "Luxury property silhouette",
    metadataDescription: "Real Estate Division launching soon inside the RACTYSH enterprise ecosystem.",
    visualKind: "real-estate",
  },
  "import-export": {
    title: "Export & Import Division",
    label: "Global trade network",
    metadataDescription: "Export & Import Division launching soon inside the RACTYSH enterprise ecosystem.",
    visualKind: "trade",
  },
  "otc-exchange": {
    title: "OTC Exchange Division",
    label: "Enterprise network visualization",
    metadataDescription: "OTC Exchange Division launching soon inside the RACTYSH enterprise ecosystem.",
    visualKind: "network",
  }
};
