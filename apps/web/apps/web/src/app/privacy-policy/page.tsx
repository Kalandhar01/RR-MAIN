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
    title: "Introduction",
    content:
      'Ractysh Group ("Ractysh," "we," "our," or "us") takes the privacy of your information seriously. This privacy statement explains what personal data we collect from you, through your interactions with our websites and services, and how we use that data. This privacy statement applies to the main website www.ractysh.com and all related sub-domains operated by Ractysh Group and its subsidiary enterprises, including Ractysh Design Pvt Ltd, Ractysh Infra Pvt Ltd, Ractysh Associates Pvt Ltd, Ractysh Exim Pvt Ltd, and Ractysh Real Estate Pvt Ltd.',
  },
  {
    title: "Definitions",
    content:
      'In this privacy policy, the following definitions apply: "Data" includes information that you submit to us via our websites and information accessed pursuant to your visit. "Cookies" are small files placed on your computer when you visit or use certain features of our websites. "Data Protection Laws" means any applicable law relating to the processing of personal data, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, as amended. "You" or "User" means the natural person who accesses our websites.',
  },
  {
    title: "Scope",
    content:
      "Ractysh Group collects data to operate our websites and deliver enterprise services. You may provide data directly by submitting forms, inquiries, newsletter subscriptions, career applications, or consultation requests. You may visit our websites without disclosing your identity. You have choices about our collection and use of your data, including the ability to access, edit, or remove personal information. When you are asked to provide personal data, you may decline.",
  },
  {
    title: "Data We Collect",
    content:
      "We may collect information that could allow you to be identified, including: (a) Contact information — first and last name, email address, phone number, postal address, company name, job title, and similar contact data; (b) Professional information — company details, project requirements, service preferences, industry; (c) Technical data — IP address, browser type, device information, operating system, and browsing behavior; (d) Communication data — information you provide when you contact us through forms, email, or social media.",
  },
  {
    title: "How We Collect Data",
    content:
      "We collect data in the following ways: (a) Data you give to us directly through contact forms, consultation bookings, career applications, newsletter subscriptions, surveys, and competitions; (b) Data collected automatically through your visit to our websites, including via cookies and analytics tools; (c) Data from third-party service providers who assist us in operating our websites and conducting our business.",
  },
  {
    title: "Data You Share With Us",
    content:
      "Ractysh Group may collect your data when you: (a) contact us through our websites via any form, email address, or social media; (b) register to receive our services, newsletters, or communications; (c) complete surveys conducted by or for us; (d) enter a competition or promotion; (e) submit a career application; (f) book a consultation for architecture, construction, real estate, import-export, or OTC exchange services; (g) interact with our website content.",
  },
  {
    title: "Data Collected Automatically",
    content:
      "We automatically collect information about your visit to our websites to help us improve content and navigation. This includes your IP address, operating system details, browsing details, device details, and language settings. This information is aggregated to measure visit counts, average time spent, pages viewed, and similar usage statistics. We use this data to measure site usage, improve content, ensure security, and enhance website performance. Data may be collected automatically via cookies in line with your browser settings.",
  },
  {
    title: "How We Use Your Data",
    content:
      "We may use your data for the following purposes: (a) improvement of our products, services, and group enterprise offerings; (b) transmission of marketing materials, newsletters, and communications with your consent; (c) contacting you for surveys or feedback via email or mail; (d) enabling our group entities to reach out regarding their programs, products, or services; (e) processing your requests, inquiries, and consultation bookings; (f) executing marketing campaigns and promotional communications with appropriate consent; (g) protecting the security and safety of our websites.",
  },
  {
    title: "Who We Share Data With",
    content:
      "We may share your personal data with: (a) Ractysh Group-controlled affiliates, subsidiaries, and group entities to assist them in reaching out to you regarding their programs, campaigns, and to process your requests; (b) our employees, vendors, agents, and professional advisors working on our behalf for the purposes described in this policy; (c) service-providers who assist in protecting and securing our systems and provide services requiring data processing. We do not sell your personal information to third parties. We may share data if required by applicable law, to respond to valid legal process, or to operate and maintain the security of our websites.",
  },
  {
    title: "Data Security",
    content:
      "Ractysh Group is committed to protecting the security of your data. We use a variety of security technologies and procedures to help protect your personal data from unauthorised access, use, or disclosure. We implement appropriate technical and organisational measures including encryption, secure servers, access controls, and regular security audits. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Data Retention",
    content:
      "Ractysh Group retains personal data for as long as necessary to provide access to and use of our websites, or for other essential purposes such as complying with our legal obligations, resolving disputes, and enforcing our agreements. Actual retention periods may vary for different data types and purposes. Even after we delete your data, it may persist on backup or archival media for audit, legal, tax, or regulatory purposes.",
  },
  {
    title: "Your Rights",
    content:
      "You have the following rights in relation to your data: (a) Right to access — request copies of the information we hold about you; (b) Right to correct — have your data rectified if inaccurate or incomplete; (c) Right to erase — request deletion or removal of your data from our systems; (d) Right to restrict — limit the way in which we can use your data; (e) Right to data portability — request movement, copy, or transfer of your data; (f) Right to object — object to our use of your data, including for our legitimate interests. To exercise any of these rights, please contact us at ractyshgroup@gmail.com. We will respond within the timeframes required by applicable law.",
  },
  {
    title: "Cookies",
    content:
      "Our websites may place and access cookies on your computer. Ractysh Group uses cookies to improve your experience of using our websites. Before cookies are placed, you will be presented with a consent mechanism. You may deny consent; however, certain features may not function fully. You can enable or disable cookies in your internet browser settings. By default, most browsers accept cookies. For detailed information, please refer to our Cookie Policy. We use Google Analytics and similar tools to collect anonymous information about site usage, including average time spent, pages viewed, and traffic sources. You may opt out of Google Analytics at https://tools.google.com/dlpage/gaoptout.",
  },
  {
    title: "Third-Party Links",
    content:
      "Our websites may, from time to time, provide links to other websites. We have no control over such websites and are not responsible for their content or privacy practices. This privacy policy does not extend to your use of such websites. We encourage you to read the privacy policies of other websites prior to using them.",
  },
  {
    title: "Children's Privacy",
    content:
      "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information promptly in accordance with applicable law.",
  },
  {
    title: "Changes to This Policy",
    content:
      "Ractysh Group reserves the right to change this privacy policy as deemed necessary from time to time or as required by law. Any changes will be immediately posted on our websites. You are deemed to have accepted the terms of this policy on your first use of our websites following any alterations. We encourage you to review this policy periodically. The last updated date is displayed at the top of this page.",
  },
  {
    title: "Contact Information",
    content:
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at ractyshgroup@gmail.com. We are committed to addressing your concerns and will respond as promptly as possible.",
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

export default function PrivacyPolicyPage() {
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
              Privacy
              <span className="block text-[#D6B45F]">Policy</span>
            </h1>
            <div className="mt-4 h-1 w-20 bg-[#D6B45F]" />
            <p className="mt-6 max-w-2xl text-lg text-white/40">
              How Ractysh Group collects, manages, and protects your personal information across our enterprise ecosystem.
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
