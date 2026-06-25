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
    "_id": "green-valley-interiors",
    "id": "green-valley-interiors",
    "title": "Green Valley Interiors",
    "slug": "green-valley-interiors",
    "location": "Salem, Tamil Nadu",
    "description": "Luxury interior design project featuring curated living spaces, modern aesthetics, and seamless functionality.",
    "category": "App-Development",
    "coverImage": "/images/our-works/App-Development/1.webp",
    "galleryImages": [
      "/images/our-works/App-Development/1.webp",
      "/images/our-works/App-Development/2.webp",
      "/images/our-works/App-Development/3.webp",
      "/images/our-works/App-Development/4.webp",
      "/images/our-works/App-Development/5.webp",
      "/images/our-works/App-Development/6.webp",
      "/images/our-works/App-Development/7.webp",
      "/images/our-works/App-Development/8.webp"
    ],
    "status": "Completed"
  },
  {
    "_id": "sri-sakthi-premium-villa",
    "id": "sri-sakthi-premium-villa",
    "title": "Sri Sakthi Premium Villa",
    "slug": "sri-sakthi-premium-villa",
    "location": "Coimbatore, Tamil Nadu",
    "description": "A premium contemporary residence designed with modern architecture, functional planning, and elegant exterior finishes.",
    "category": "Architecture",
    "coverImage": "/images/our-works/Architecture/1.webp",
    "galleryImages": [
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
      "/images/our-works/Architecture/12.webp"
    ],
    "status": "Completed"
  },
  {
    "_id": "anandam-residency",
    "id": "anandam-residency",
    "title": "Anandam Residency",
    "slug": "anandam-residency",
    "location": "Madurai, Tamil Nadu",
    "description": "Residential construction project featuring premium materials, spacious planning, and quality craftsmanship.",
    "category": "Construction",
    "coverImage": "/images/our-works/Construction/1.webp",
    "galleryImages": [
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
      "/images/our-works/Construction/14.webp"
    ],
    "status": "Completed"
  },
  {
    "_id": "vellore-premium-bedrooms",
    "id": "vellore-premium-bedrooms",
    "title": "Vellore Premium Bedrooms",
    "slug": "vellore-premium-bedrooms",
    "location": "Vellore, Tamil Nadu",
    "description": "A digital marketing campaign showcasing premium bedroom designs through strategic visual storytelling.",
    "category": "Digital-Marketing",
    "coverImage": "/images/our-works/Digital-Marketing/1.webp",
    "galleryImages": [
      "/images/our-works/Digital-Marketing/1.webp",
      "/images/our-works/Digital-Marketing/2.webp",
      "/images/our-works/Digital-Marketing/3.webp",
      "/images/our-works/Digital-Marketing/4.webp",
      "/images/our-works/Digital-Marketing/5.webp",
      "/images/our-works/Digital-Marketing/6.webp",
      "/images/our-works/Digital-Marketing/7.webp"
    ],
    "status": "Completed"
  },
  {
    "_id": "raja-thanga-maligai",
    "id": "raja-thanga-maligai",
    "title": "Raja Thanga Maligai",
    "slug": "raja-thanga-maligai",
    "location": "Tirunelveli, Tamil Nadu",
    "description": "A landmark commercial property development featuring prime retail spaces and premium office suites.",
    "category": "Real-Estate",
    "coverImage": "/images/our-works/Real-Estate/1.webp",
    "galleryImages": [
      "/images/our-works/Real-Estate/1.webp",
      "/images/our-works/Real-Estate/2.webp",
      "/images/our-works/Real-Estate/3.webp",
      "/images/our-works/Real-Estate/4.webp",
      "/images/our-works/Real-Estate/5.webp",
      "/images/our-works/Real-Estate/6.webp",
      "/images/our-works/Real-Estate/7.webp",
      "/images/our-works/Real-Estate/8.webp"
    ],
    "status": "Completed"
  },
  {
    "_id": "city-corner-bakery",
    "id": "city-corner-bakery",
    "title": "City Corner Bakery",
    "slug": "city-corner-bakery",
    "location": "Chennai, Tamil Nadu",
    "description": "A complete digital presence transformation for a boutique bakery with modern web design and brand storytelling.",
    "category": "Web-Development",
    "coverImage": "/images/our-works/Web-Development/1.webp",
    "galleryImages": [
      "/images/our-works/Web-Development/1.webp",
      "/images/our-works/Web-Development/2.webp",
      "/images/our-works/Web-Development/3.webp",
      "/images/our-works/Web-Development/4.webp",
      "/images/our-works/Web-Development/5.webp"
    ],
    "status": "Completed"
  }
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
