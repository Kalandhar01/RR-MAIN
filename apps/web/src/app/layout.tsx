import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { ChatBot } from "@/components/ChatBot";

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

export const metadata: Metadata = {
  title: "Ractysh Group",
  description:
    "A five-pillar private enterprise group across Architecture, Construction, Real Estate, Export & Import and OTC Exchange.",
  icons: {
    icon: [{ url: "/brand/ractysh-icon-32.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/brand/ractysh-icon-192.png", type: "image/png", sizes: "192x192" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorantGaramond.variable} ${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <head>
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
