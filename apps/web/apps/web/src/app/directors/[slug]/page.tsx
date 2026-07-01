import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingChrome } from "@/components/MarketingChrome";
import { getSiteContent } from "@/lib/api";
import DirectorProfileCard, {
  type DirectorProfileCardProps,
} from "@/components/DirectorProfileCard";

const directorData: Record<string, DirectorProfileCardProps> = {
  "founder": {
    slug: "founder",
    image: "/directors/founder.png",
    honorific: "Ar.",
    label: "FOUNDER",
    firstName: "P.M.S.Noorul",
    lastName: "Fawaaz",
    qualification: "B.Arch., A.I.I.A.",
    designation: "Chairman & Founder",
    company: "RACTYSH GROUP",
    quote: "A leader is one who knows the way, goes the way, and shows the way.",
    description:
      "Leading the Ractysh ecosystem across Architecture, Construction, Real Estate, Import-Export and OTC Exchange \u2014 built on long-term vision, institutional discipline and enterprise-grade execution.",
    expertise: [
      { icon: "DraftingCompass", title: "Architecture" },
      { icon: "HardHat", title: "Construction" },
      { icon: "Landmark", title: "Real Estate" },
      { icon: "Globe", title: "Global Trade" },
    ],
    email: "fawaaz@ractysh.com",
    phone: "+91-98765-43200",
  },
  "ashok-kumar": {
    slug: "ashok-kumar",
    firstName: "Ashok Kumar.",
    lastName: "M",
    qualification: "B.Sc. Physics",
    designation: "Managing Director",
    company: "RACTYSH ASSOCIATES PRIVATE LIMITED",
    quote:
      "Building enterprise trust through strategic vision, financial discipline, and operational excellence.",
    description:
      "Ashok Kumar provides strategic direction for RACTYSH Associates, contributing to business development, financial planning, operational management, and long-term enterprise growth. His practical leadership supports the company\u2019s commitment to delivering trusted financial and intermediary services with professionalism and integrity.",
    expertise: [
      { icon: "TrendingUp", title: "Business Strategy" },
      { icon: "Landmark", title: "Financial Operations" },
      { icon: "Briefcase", title: "Enterprise Management" },
      { icon: "Users", title: "Client Relations" },
    ],
    email: "ashok@ractysh.com",
    phone: "+91-98765-43210",
  },
  "naveen": {
    slug: "naveen",
    firstName: "C.",
    lastName: "Naveen",
    qualification: "B.Arch., BIM",
    designation: "Director",
    company: "RACTYSH DESIGN PRIVATE LIMITED",
    quote:
      "Designing spaces that merge architectural innovation with sustainable functionality.",
    description:
      "C. Naveen leads architectural planning and design innovation at RACTYSH Design. With expertise in Building Information Modeling (BIM) and modern architectural practices, he oversees the delivery of sustainable, functional, and aesthetically refined projects across residential, commercial, and institutional sectors.",
    expertise: [
      { icon: "Palette", title: "Architecture" },
      { icon: "DraftingCompass", title: "BIM Technology" },
      { icon: "HeartHandshake", title: "Sustainable Design" },
      { icon: "Target", title: "Project Management" },
    ],
    email: "naveen@ractysh.com",
    phone: "+91-98765-43211",
  },
  "subash": {
    slug: "subash",
    image: "/directors/subash.png",
    firstName: "A.",
    lastName: "Subash",
    qualification: "B.E. Civil",
    designation: "Director",
    company: "RACTYSH INFRA PRIVATE LIMITED",
    quote:
      "Engineering infrastructure that stands the test of time with precision and safety.",
    description:
      "A. Subash leads the engineering and construction operations of RACTYSH Infra Private Limited. With a strong background in Civil Engineering, he oversees project planning, structural execution, quality assurance, site management, and timely project delivery. His focus on precision, safety, and sustainable construction ensures every project meets the highest industry standards.",
    expertise: [
      { icon: "HardHat", title: "Civil Engineering" },
      { icon: "Building2", title: "Infrastructure Dev" },
      { icon: "Ruler", title: "Construction Mgmt" },
      { icon: "ShieldCheck", title: "Quality Assurance" },
    ],
    email: "subash@ractysh.com",
    phone: "+91-98765-43212",
  },
  "mohamed-jamaldheen": {
    slug: "mohamed-jamaldheen",
    image: "/directors/mohamed-jamaldheen.png",
    honorific: "Mr.",
    firstName: "B. Mohamed",
    lastName: "Jamaldheen",
    qualification: "B.Com., ADCAA",
    designation: "Director",
    company: "RACTYSH EXIM PRIVATE LIMITED",
    quote:
      "Leading global trade through innovation, trusted partnerships, and strategic international commerce.",
    description:
      "B. Mohamed Jamaldheen oversees the international operations of RACTYSH EXIM PRIVATE LIMITED, driving global sourcing, export strategy, trade finance, and cross-border partnerships while ensuring operational excellence across international markets.",
    expertise: [
      { icon: "Globe", title: "Global Trade" },
      { icon: "Ship", title: "Export Operations" },
      { icon: "Package", title: "Supply Chain" },
      { icon: "CreditCard", title: "Trade Finance" },
    ],
    email: "jamaldheen@ractysh.com",
    phone: "+91-98765-43213",
  },
};

interface DirectorPageProps {
  params: Promise<{ slug: string }>;
}

const fullName = (d: DirectorProfileCardProps) => `${d.firstName} ${d.lastName}`;

export async function generateMetadata({ params }: DirectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const director = directorData[slug];
  if (!director) return { title: "Director Not Found | RACTYSH GROUP" };

  return {
    title: `${fullName(director)} | Director | RACTYSH GROUP`,
    description: `${fullName(director)} — ${director.designation} at ${director.company}. ${director.quote}`,
    openGraph: {
      title: `${fullName(director)} | Director | RACTYSH GROUP`,
      description: director.quote,
      url: `/directors/${slug}`,
    },
  };
}

export default async function DirectorProfilePage({ params }: DirectorPageProps) {
  const { slug } = await params;
  const director = directorData[slug];

  if (!director) notFound();

  const content = await getSiteContent();

  return (
    <MarketingChrome content={content}>
      <DirectorProfileCard {...director} />
    </MarketingChrome>
  );
}
