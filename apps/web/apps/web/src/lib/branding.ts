export interface CompanyBrand {
  legalName: string;
  shortName: string;
  subtitle: string;
}

const divisionBranding: Record<string, CompanyBrand> = {
  architecture: { legalName: "RACTYSH Design Pvt Ltd", shortName: "RACTYSH Design", subtitle: "Design Pvt Ltd" },
  construction: { legalName: "RACTYSH Infra Pvt Ltd", shortName: "RACTYSH Infra", subtitle: "Infra Pvt Ltd" },
  "real-estate": { legalName: "RACTYSH Realty Pvt Ltd", shortName: "RACTYSH Realty", subtitle: "Realty Pvt Ltd" },
  "import-export": { legalName: "RACTYSH Exim Pvt Ltd", shortName: "RACTYSH Exim", subtitle: "Exim Pvt Ltd" },
  otc: { legalName: "RACTYSH Associates Pvt Ltd", shortName: "RACTYSH Associates", subtitle: "Associates Pvt Ltd" },
};

const defaultBrand: CompanyBrand = {
  legalName: "RACTYSH Group of Companies",
  shortName: "RACTYSH Group",
  subtitle: "Group of Companies",
};

export function getCompanyBrand(pathname: string): CompanyBrand {
  const p = pathname.toLowerCase();

  if (p.startsWith("/architecture") || p.startsWith("/architectural") || p.startsWith("/interior") || p.startsWith("/3d-model") || p.startsWith("/structural") || p.startsWith("/mep") || p.startsWith("/landscape") || p.startsWith("/urban") || p.startsWith("/furniture") || p.startsWith("/lighting") || p.startsWith("/elevation") || p.startsWith("/commercial-building") || p.startsWith("/project-management") || p.startsWith("/logo") || p.startsWith("/rendering") || p.startsWith("/ractysh-design"))
    return divisionBranding.architecture;

  if (p.startsWith("/construction") || p.startsWith("/turnkey"))
    return divisionBranding.construction;

  if (p.startsWith("/real-estate"))
    return divisionBranding["real-estate"];

  if (p.startsWith("/import-export") || p.startsWith("/ractysh-import-export"))
    return divisionBranding["import-export"];

  if (p.startsWith("/otc"))
    return divisionBranding.otc;

  return defaultBrand;
}
