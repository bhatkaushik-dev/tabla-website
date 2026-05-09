import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Kaushik Bhat | Professional Tabla Artist & Teacher in Bangalore",
    template: "%s | Kaushik Bhat",
  },
  description:
    "Official portfolio of Kaushik Bhat, a B-High Graded Tabla artist from AIR. Offering professional Tabla classes in Bangalore (JP Nagar) and performing Indian Classical Music worldwide.",
  keywords: [
    "Kaushik Bhat",
    "Kaushik Bhat Tabla",
    "Tabla Artist",
    "Tabla classes in Bangalore",
    "Tabla classes near JP Nagar",
    "Indian Classical Music",
    "Tabla Player Bangalore",
    "AIR Artist",
    "Tabla Solo",
    "Percussionist",
    "Tabla Teacher Bangalore",
  ],
  authors: [{ name: "Kaushik Bhat" }],
  creator: "Kaushik Bhat",
  publisher: "Kaushik Bhat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tabla.kaushikbhat.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kaushik Bhat | Professional Tabla Artist",
    description:
      "Official portfolio of Kaushik Bhat. B-High Graded Tabla artist. Professional classes in Bangalore & JP Nagar.",
    url: "https://tabla.kaushikbhat.in",
    siteName: "Kaushik Bhat Portfolio",
    images: [
      {
        url: "/hero-tabla.png",
        width: 1200,
        height: 630,
        alt: "Kaushik Bhat Tabla Artist",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaushik Bhat | Professional Tabla Artist",
    description:
      "Official portfolio of Kaushik Bhat. B-High Graded Tabla artist. Professional classes in Bangalore & JP Nagar.",
    images: ["/hero-tabla.png"],
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
  icons: {
    icon: "/icon.jpeg",
    apple: "/apple-icon.jpeg",
  },
  manifest: "/manifest.json",
  themeColor: "#0a0a0a",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kaushik Bhat",
    "url": "https://tabla.kaushikbhat.in",
    "image": "https://tabla.kaushikbhat.in/hero-tabla.png",
    "jobTitle": "Professional Tabla Artist & Teacher",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "India"
    },
    "sameAs": [
      // Add social media URLs here
    ],
    "description": "B-High Graded Tabla artist from AIR specializing in Indian Classical Music and professional teaching in JP Nagar, Bangalore."
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
// test push