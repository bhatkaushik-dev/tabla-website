import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Cinzel_Decorative } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import SocialLinks from "@/components/SocialLinks";
import { getContent } from "@/lib/content";
import { languageTag, routes, SITE_URL } from "@/lib/site";
import { graph, personSchema, websiteSchema } from "@/lib/jsonld";

/**
 * Every route is prerendered and refreshed from the CMS in the background at
 * most this often (seconds) — and immediately when the admin panel calls
 * /api/revalidate. Declared here as well as on the fetch so every route —
 * including ones that 404 because their page is unpublished — picks up a
 * change within the same interval.
 */
export const revalidate = 300;

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Classical display face, used only for the name in the hero.
const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Site-wide defaults. Each page's own generateMetadata (via pageMetadata)
 * overrides the title, description, canonical and social cards; the defaults
 * here are the home page's, or the profile's while home is unpublished.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { profile, pages } = await getContent();
  const seo = pages.home?.seo ?? {
    title: `${profile.name} | ${profile.role}`,
    description: profile.description,
  };
  const ogTitle = ("ogTitle" in seo && seo.ogTitle) || seo.title;
  const ogDescription = ("ogDescription" in seo && seo.ogDescription) || seo.description;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: seo.title,
      template: `%s | ${profile.shortName}`,
    },
    description: seo.description,
    applicationName: profile.shortName,
    authors: [{ name: profile.name, url: SITE_URL }],
    creator: profile.name,
    publisher: profile.name,
    category: "music",
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: "website",
      siteName: `${profile.name} — ${profile.role}`,
      locale: profile.locale,
      url: SITE_URL,
      title: ogTitle,
      description: ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
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
}

// themeColor and viewport are no longer valid inside `metadata` in this
// version of Next — they belong to their own export.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The site has one look in both schemes, so a single theme colour is right.
  themeColor: "#0b0908",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { profile, pages } = await getContent();
  // Only published pages are linked; an unpublished one's route 404s.
  const nav = routes.flatMap(({ slug, href }) => {
    const page = pages[slug];
    return page ? [{ href, label: page.header.title }] : [];
  });

  return (
    <html
      lang={languageTag(profile.locale)}
      // Required in this version for `scroll-behavior: smooth` to be suppressed
      // during route transitions rather than animating every navigation.
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} ${cinzel.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background font-sans text-foreground antialiased">
        {/* Site-wide entity graph; pages add their own page-specific nodes. */}
        <JsonLd data={graph(personSchema(profile), websiteSchema(profile))} />

        <a
          href="#main"
          data-print="hide"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>

        {/* SocialLinks is a server component, so it is rendered here and
            handed to the client-side Navbar as a slot. */}
        <Navbar
          name={profile.name}
          nav={nav}
          socialLinks={<SocialLinks profile={profile} className="mt-6 justify-center" />}
        />
        <main id="main">{children}</main>
        <Footer profile={profile} nav={nav} />
      </body>
    </html>
  );
}
