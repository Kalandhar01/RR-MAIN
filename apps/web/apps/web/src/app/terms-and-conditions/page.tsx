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
    title: "Acceptance of Terms",
    content:
      "By accessing or using the Ractysh Group website, services, or any associated platforms, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must refrain from using our website and services. These terms apply to all visitors, users, and customers of Ractysh Group and its subsidiaries.",
  },
  {
    title: "Website Usage",
    content:
      "You agree to use the Ractysh Group website and its services only for lawful purposes and in accordance with these Terms & Conditions. You must not use the website in any way that may damage, disable, or impair the functionality of the platform or interfere with other users' access. Unauthorised use of this website may give rise to a claim for damages and may be a criminal offence.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content, materials, designs, logos, trademarks, text, images, graphics, and software on the Ractysh Group website are the intellectual property of Ractysh Group or its licensors and are protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, or exploit any content without prior written consent from Ractysh Group.",
  },
  {
    title: "User Responsibilities",
    content:
      "As a user of our website and services, you are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information when engaging with our services and to promptly update any information to keep it accurate and complete.",
  },
  {
    title: "Accuracy of Information",
    content:
      "While we strive to ensure that all information presented on our website is accurate and up to date, Ractysh Group makes no representations or warranties regarding the completeness, accuracy, reliability, suitability, or availability of the information, products, or services depicted. Any reliance you place on such information is strictly at your own risk.",
  },
  {
    title: "Third Party Links",
    content:
      "Our website may contain links to third-party websites or resources that are not owned or controlled by Ractysh Group. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. We encourage you to review the terms and policies of any third-party sites you visit.",
  },
  {
    title: "Limitation of Liability",
    content:
      "To the fullest extent permitted by law, Ractysh Group and its directors, employees, affiliates, and agents shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to your use of the website, services, or any content therein. This limitation applies regardless of the legal theory under which the claim is brought.",
  },
  {
    title: "Service Availability",
    content:
      "Ractysh Group reserves the right to modify, suspend, or discontinue any aspect of the website or services at any time without prior notice. We strive to maintain high availability but cannot guarantee uninterrupted access. We shall not be liable for any downtime, service interruptions, or data loss resulting from scheduled maintenance, technical issues, or force majeure events.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts located in Coimbatore, Tamil Nadu, India.",
  },
  {
    title: "Termination",
    content:
      "Ractysh Group reserves the right to terminate or suspend your access to the website and services at our sole discretion, without prior notice, for conduct that we believe violates these Terms & Conditions or is harmful to other users, third parties, or our business interests. Provisions relating to intellectual property, limitation of liability, and governing law shall survive termination.",
  },
  {
    title: "Contact Information",
    content:
      "If you have any questions, concerns, or requests regarding these Terms & Conditions, please contact us at ractyshgroup@gmail.com. We are committed to addressing your inquiries and will respond as promptly as possible.",
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

export default function TermsPage() {
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
              Terms &amp;
              <span className="block text-[#D6B45F]">Conditions</span>
            </h1>
            <div className="mt-4 h-1 w-20 bg-[#D6B45F]" />
            <p className="mt-6 max-w-2xl text-lg text-white/40">
              The operational terms governing the use of the Ractysh enterprise ecosystem and its services.
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
