export interface PortfolioProject {
  _id: string;
  id: string;
  title: string;
  slug: string;
  location: string;
  description: string;
  category: string;
  coverImage: string;
  galleryImages: string[];
  status: "Completed";
}

const projects: PortfolioProject[] = [
  {
    _id: "emerald-valley-estate",
    id: "emerald-valley-estate",
    title: "Emerald Valley Estate",
    slug: "emerald-valley-estate",
    location: "Salem, Tamil Nadu",
    description: "Premium architectural estate with contemporary design, landscaped gardens, and elegant structural composition.",
    category: "Architecture",
    coverImage: "/images/our-works/Architecture/13.webp",
    galleryImages: [
      "/images/our-works/Architecture/13.webp",
      "/images/our-works/Architecture/14.webp",
      "/images/our-works/Architecture/15.webp",
      "/images/our-works/Architecture/16.webp",
      "/images/our-works/Architecture/17.webp",
      "/images/our-works/Architecture/18.webp",
      "/images/our-works/Architecture/19.webp",
      "/images/our-works/Architecture/20.webp",
    ],
    status: "Completed",
  },
  {
    _id: "sri-sakthi-premium-villa",
    id: "sri-sakthi-premium-villa",
    title: "Sri Sakthi Premium Villa",
    slug: "sri-sakthi-premium-villa",
    location: "Coimbatore, Tamil Nadu",
    description: "A premium contemporary residence designed with modern architecture, functional planning, and elegant exterior finishes.",
    category: "Architecture",
    coverImage: "/images/our-works/Architecture/1.webp",
    galleryImages: [
      "/images/our-works/Architecture/1.webp",
      "/images/our-works/Architecture/2.webp",
      "/images/our-works/Architecture/3.webp",
      "/images/our-works/Architecture/4.webp",
      "/images/our-works/Architecture/5.webp",
      "/images/our-works/Architecture/6.webp",
      "/images/our-works/Architecture/7.webp",
      "/images/our-works/Architecture/8.webp",
      "/images/our-works/Architecture/9.webp",
      "/images/our-works/Architecture/10.webp",
      "/images/our-works/Architecture/11.webp",
      "/images/our-works/Architecture/12.webp",
    ],
    status: "Completed",
  },
  {
    _id: "anandam-residency",
    id: "anandam-residency",
    title: "Anandam Residency",
    slug: "anandam-residency",
    location: "Madurai, Tamil Nadu",
    description: "Residential construction project featuring premium materials, spacious planning, and quality craftsmanship.",
    category: "Construction",
    coverImage: "/images/our-works/Construction/1.webp",
    galleryImages: [
      "/images/our-works/Construction/1.webp",
      "/images/our-works/Construction/2.webp",
      "/images/our-works/Construction/3.webp",
      "/images/our-works/Construction/4.webp",
      "/images/our-works/Construction/5.webp",
      "/images/our-works/Construction/6.webp",
      "/images/our-works/Construction/7.webp",
      "/images/our-works/Construction/8.webp",
      "/images/our-works/Construction/9.webp",
      "/images/our-works/Construction/10.webp",
      "/images/our-works/Construction/11.webp",
      "/images/our-works/Construction/12.webp",
      "/images/our-works/Construction/13.webp",
      "/images/our-works/Construction/14.webp",
    ],
    status: "Completed",
  },
  {
    _id: "vellore-premium-towers",
    id: "vellore-premium-towers",
    title: "Vellore Premium Towers",
    slug: "vellore-premium-towers",
    location: "Vellore, Tamil Nadu",
    description: "Premium residential tower construction with modern design, high-quality finishes, and elegant urban living spaces.",
    category: "Construction",
    coverImage: "/images/our-works/Construction/15.webp",
    galleryImages: [
      "/images/our-works/Construction/15.webp",
      "/images/our-works/Construction/16.webp",
      "/images/our-works/Construction/17.webp",
      "/images/our-works/Construction/18.webp",
      "/images/our-works/Construction/19.webp",
      "/images/our-works/Construction/20.webp",
      "/images/our-works/Construction/21.webp",
    ],
    status: "Completed",
  },
  {
    _id: "raja-thanga-maligai",
    id: "raja-thanga-maligai",
    title: "Raja Thanga Maligai",
    slug: "raja-thanga-maligai",
    location: "Tirunelveli, Tamil Nadu",
    description: "A landmark commercial property development featuring prime retail spaces and premium office suites.",
    category: "Real-Estate",
    coverImage: "/images/our-works/Real-Estate/1.webp",
    galleryImages: [
      "/images/our-works/Real-Estate/1.webp",
      "/images/our-works/Real-Estate/2.webp",
      "/images/our-works/Real-Estate/3.webp",
      "/images/our-works/Real-Estate/4.webp",
      "/images/our-works/Real-Estate/5.webp",
      "/images/our-works/Real-Estate/6.webp",
      "/images/our-works/Real-Estate/7.webp",
      "/images/our-works/Real-Estate/8.webp",
    ],
    status: "Completed",
  },
  {
    _id: "chennai-city-centre-plaza",
    id: "chennai-city-centre-plaza",
    title: "Chennai City Centre Plaza",
    slug: "chennai-city-centre-plaza",
    location: "Chennai, Tamil Nadu",
    description: "Commercial real estate development featuring premium retail spaces, modern offices, and prime urban infrastructure.",
    category: "Real-Estate",
    coverImage: "/images/our-works/Real-Estate/9.webp",
    galleryImages: [
      "/images/our-works/Real-Estate/9.webp",
      "/images/our-works/Real-Estate/10.webp",
      "/images/our-works/Real-Estate/11.webp",
      "/images/our-works/Real-Estate/12.webp",
      "/images/our-works/Real-Estate/13.webp",
    ],
    status: "Completed",
  },
];

export function getAllProjects(): PortfolioProject[] {
  return projects;
}

export function getProjectBySlug(slug: string): PortfolioProject | null {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getRelatedProjects(slug: string, count = 3): PortfolioProject[] {
  return projects.filter((p) => p.slug !== slug).slice(0, count);
}
