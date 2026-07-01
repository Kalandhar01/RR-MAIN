import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { ChatBot } from "@/components/ChatBot";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap"
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap"
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Ractysh Group",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Ractysh Group",
  authors: [{ name: "Ractysh Group" }],
  publisher: "Ractysh Group",
  generator: "Next.js",
  keywords: [
    "Ractysh Group",
    "Ractysh",
    "diversified enterprise",
    "architecture",
    "construction",
    "real estate",
    "import export",
    "OTC business India",
    "global business solutions",
    "Coimbatore",
    "Tamil Nadu",
    "India",
    "Enterprise Group India",
    "Corporate Group Tamil Nadu",
    "Luxury Architecture Company",
    "Infrastructure Company Tamil Nadu",
    "Architecture Company Tamil Nadu",
    "Construction Company Tamil Nadu",
    "Real Estate Company Tamil Nadu",
    "Import Export Company India",
  ],
  icons: {
    icon: [
      { url: "/brand/ractysh-icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/ractysh-icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/brand/ractysh-icon-192.png", type: "image/png", sizes: "192x192" }],
  },
  manifest: "/manifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    countryName: "India",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: "enterprise",
  classification: "Enterprise Group of Companies",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorantGaramond.variable} ${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playwrite+AU+TAS:wght@100..400&family=Playwrite+GB+J+Guides:ital@0;1&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/landingpage-light-theme.avif" type="image/avif" fetchPriority="high" />
      </head>
      <body className="page-noise font-sans overflow-x-hidden">
        <Script
          id="reset-scroll"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if("scrollRestoration" in history)history.scrollRestoration="manual";window.scrollTo(0,0)}catch(e){}})()`
          }}
        />
        <SmoothScrollProvider>
          <Suspense fallback={null}>
            <TransitionProvider>
              {children}
              <ChatBot />
            </TransitionProvider>
          </Suspense>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
