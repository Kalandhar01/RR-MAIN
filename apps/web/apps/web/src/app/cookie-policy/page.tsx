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
    title: "What Cookies Are",
    content:
      "Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They are widely used to make websites work more efficiently, enhance user experience, and provide information to the website owners. Cookies enable websites to recognise your device and remember information about your visit, such as your preferences and browsing activity.",
  },
  {
    title: "Essential Cookies",
    content:
      "Essential cookies, also known as strictly necessary cookies, are required for the basic functioning of our website. These cookies enable core functionality such as page navigation, security, and access to secure areas of the site. Without these cookies, the website cannot function properly. These cookies do not collect any personally identifiable information and are set automatically when you access our site.",
  },
  {
    title: "Analytics Cookies",
    content:
      "Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use analytics tools such as Google Analytics to gather data on page views, session duration, referral sources, and user behaviour patterns. This information helps us improve the performance, content, and user experience of our website. All data collected is aggregated and anonymised.",
  },
  {
    title: "Functional Cookies",
    content:
      "Functional cookies enable our website to provide enhanced functionality and personalisation based on your interactions and preferences. These cookies may remember choices you make, such as language preferences, region selections, or form data, to provide a more tailored experience. While these cookies are not essential for the website to function, they improve usability and convenience.",
  },
  {
    title: "Managing Cookies",
    content:
      "You have the right to accept or reject cookies at any time. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. Please note that disabling certain cookies may affect the functionality of our website and your ability to access certain features. You can manage your cookie preferences through your browser settings at any time.",
  },
  {
    title: "Browser Settings",
    content:
      "You can control and manage cookies through your browser settings. Most browsers allow you to view, block, delete, or disable cookies for specific websites or all websites. The method for managing cookies varies by browser. You can typically find these settings in the 'Preferences', 'Privacy', or 'Security' menu of your browser. Please refer to your browser's help documentation for detailed instructions.",
  },
  {
    title: "Cookie Updates",
    content:
      "We may update this Cookie Policy from time to time to reflect changes in the cookies we use, regulatory requirements, or operational needs. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we use cookies and tracking technologies.",
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

export default function CookiePolicyPage() {
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
              Cookie
              <span className="block text-[#D6B45F]">Policy</span>
            </h1>
            <div className="mt-4 h-1 w-20 bg-[#D6B45F]" />
            <p className="mt-6 max-w-2xl text-lg text-white/40">
              How Ractysh Group uses cookies and similar tracking technologies on our website.
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
