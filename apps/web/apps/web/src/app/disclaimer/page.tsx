"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const navItems = [
  { label: "Ecosystem", href: "/#features" },
  { label: "Architecture Service", href: "/architecture-service" },
  { label: "Our Work", href: "/our-projects" },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Book Consultation", href: "/book-consultation" },
  { label: "Founder", href: "/founder" },
];

const sections = [
  {
    title: "General Information",
    content:
      "The information provided on the Ractysh Group website is for general informational and educational purposes only. While we strive to keep the information accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose.",
  },
  {
    title: "Professional Advice Disclaimer",
    content:
      "The content on this website does not constitute professional advice of any kind, including but not limited to architectural, construction, legal, financial, investment, or real estate advice. Any reliance you place on the information provided is strictly at your own risk. You should consult with qualified professionals for advice tailored to your specific circumstances before making any decisions based on the information presented.",
  },
  {
    title: "No Guarantees",
    content:
      "Ractysh Group does not guarantee the accuracy, completeness, or timeliness of the information, materials, or content available on this website. All information is provided 'as is' without any warranty of any kind. We reserve the right to modify, update, or remove content at any time without prior notice. We shall not be held responsible for any errors, omissions, or inaccuracies in the content.",
  },
  {
    title: "External Links",
    content:
      "Our website may contain links to external websites that are not provided or maintained by Ractysh Group. We do not endorse, guarantee, or assume responsibility for the content, accuracy, or practices of any third-party websites linked to or from our site. The inclusion of any links does not imply a recommendation or endorsement of the views expressed within them. You access third-party websites at your own risk.",
  },
  {
    title: "Intellectual Property",
    content:
      "All trademarks, service marks, logos, designs, and intellectual property displayed on this website are the property of Ractysh Group or its respective owners. Nothing contained on this website grants any license or right to use any trademark, logo, or intellectual property without the prior written consent of the owner. Unauthorised use of any intellectual property may violate applicable laws.",
  },
  {
    title: "Limitation of Liability",
    content:
      "To the fullest extent permitted by applicable law, Ractysh Group, its directors, employees, affiliates, and agents shall not be liable for any loss or damage, including without limitation indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of or in connection with the use of this website or its content.",
  },
  {
    title: "Contact Details",
    content:
      "If you have any questions, concerns, or require further clarification regarding this disclaimer, please do not hesitate to contact us at ractyshgroup@gmail.com. We are committed to addressing any concerns and providing additional information as needed.",
  },
];

function Section({
  title,
  children,
  index,
}: {
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="mb-3 flex items-center gap-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D6B45F]/10 text-sm font-bold text-[#D6B45F]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>
      </div>
      <p className="ml-12 text-base leading-relaxed text-white/60">{children}</p>
      <div className="ml-12 mt-6 h-px bg-gradient-to-r from-[#D6B45F]/20 to-transparent" />
    </motion.div>
  );
}

export default function DisclaimerPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Navbar logoText="RACTYSH" items={navItems} />
      <main className="min-h-screen bg-[#0A0A0A]">
        <div ref={heroRef} className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D6B45F]/20 to-transparent" />
            <div className="absolute left-1/4 top-0 h-96 w-96 -translate-y-1/2 rounded-full bg-[#D6B45F]/5 blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mx-auto max-w-4xl px-6 pt-32 pb-20 sm:pt-40 sm:pb-28"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6B45F]/20 bg-[#D6B45F]/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D6B45F]" />
              <span className="text-[11px] font-medium tracking-widest text-[#D6B45F] uppercase">
                Legal
              </span>
            </div>
            <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="text-[#D6B45F]">Disclaimer</span>
            </h1>
            <div className="mt-4 h-1 w-20 bg-[#D6B45F]" />
            <p className="mt-6 max-w-2xl text-lg text-white/40">
              Important information regarding the use of content and services provided by Ractysh Group.
            </p>
            <p className="mt-4 text-sm text-white/20">
              Last Updated: June 2026
            </p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <Section key={section.title} title={section.title} index={index}>
                {section.content}
              </Section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white/50 transition-all duration-300 hover:border-[#D6B45F]/30 hover:text-[#D6B45F]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
