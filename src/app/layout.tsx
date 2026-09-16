import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { graph, personSchema, websiteSchema } from "@/lib/jsonld";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Kaushik Bhat | Tabla Artist & Tabla Classes in Bangalore",
    template: "%s | Kaushik Bhat Tabla",
  },
  description:
    "Kaushik Bhat is a B-High graded tabla artist of All India Radio, performing Hindustani classical music and teaching tabla classes in JP Nagar, Bangalore.",
  applicationName: site.shortName,
  keywords: [
    "Kaushik Bhat",
    "Kaushik Bhat Tabla",
    "Kaushik G Bhat",
    "Tabla artist Bangalore",
    "Tabla classes in JP Nagar",
    "Tabla classes in Bangalore",
    "Tabla teacher JP Nagar",
    "Tabla lessons Bangalore",
    "Learn tabla Bangalore",
    "Online tabla classes",
    "Indian classical music",
    "Hindustani classical tabla",
    "AIR B-High artist",
    "Tabla solo",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "music",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${site.name} — ${site.role}`,
    locale: site.locale,
    url: site.url,
    title: "Kaushik Bhat | Tabla Artist & Tabla Classes in Bangalore",
    description:
      "B-High graded tabla artist of All India Radio. Hindustani classical performances and tabla classes in JP Nagar, Bangalore.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaushik Bhat | Tabla Artist & Teacher, Bangalore",
    description:
      "B-High graded tabla artist of All India Radio. Performances and tabla classes in JP Nagar, Bangalore.",
  },
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
  manifest: "/manifest.webmanifest",
};

// themeColor and viewport are no longer valid inside `metadata` in this
// version of Next — they belong to their own export.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The site has one look in both schemes, so a single theme colour is right.
  themeColor: "#0b0908",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      // Required in this version for `scroll-behavior: smooth` to be suppressed
      // during route transitions rather than animating every navigation.
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background font-sans text-foreground antialiased">
        {/* Site-wide entity graph; pages add their own page-specific nodes. */}
        <JsonLd data={graph(personSchema(), websiteSchema())} />

        <a
          href="#main"
          data-print="hide"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>

        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
