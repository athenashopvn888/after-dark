import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";

export const metadata: Metadata = {
  metadataBase: new URL("https://afterdarkcannabis.com"),
  title: {
    default: "After Dark Cannabis — Premium Cannabis Dispensary, York",
    template: "%s | After Dark Cannabis",
  },
  description:
    "Shop 200+ premium cannabis strains at After Dark Cannabis. Exotic, Premium, AAA+, AA & Budget flower from $3/g. York's uplifting dispensary at 1664 Jane St. Open 24 Hours.",
  keywords: [
    "cannabis dispensary York",
    "weed store York",
    "exotic flower York",
    "premium cannabis",
    "After Dark Cannabis",
    "cheap weed York",
    "dispensary near me",
    "THC flower",
    "indica sativa hybrid",
    "edibles York",
    "vapes",
    "pre-rolls",
    "native cigarettes York",
    "weed store Mississauga",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://afterdarkcannabis.com",
    siteName: "After Dark Cannabis",
    title: "After Dark Cannabis — Premium York Cannabis Dispensary",
    description:
      "200+ strains from $3/g. Exotic to Budget. York's uplifting dispensary at 1664 Jane St. Open 24 Hours.",
    images: [
      {
        url: "https://afterdarkcannabis.com/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "After Dark Cannabis — Premium Cannabis Dispensary York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "After Dark Cannabis — York's Uplifting Dispensary",
    description: "200+ strains from $3/g. Open 24 Hours at 1664 Jane St, York.",
    images: ["https://afterdarkcannabis.com/wp-content/uploads/2026/04/46Oi5.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://afterdarkcannabis.com",
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  additionalType: "https://schema.org/Store",
  "@id": "https://afterdarkcannabis.com",
  name: "After Dark Cannabis",
  description: "Cannabis dispensary at 1664 Jane St in York, ON. Shop exotic, premium, AAA+, AA, and budget flower tiers plus edibles, prerolls, and vapes. Open 24 Hours.",
  url: "https://afterdarkcannabis.com",
  telephone: "+14163028127",
  image: "https://afterdarkcannabis.com/wp-content/uploads/2026/04/7Clmh.jpg",
  priceRange: "$3 - $12/g",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1664 Jane St",
    addressLocality: "York",
    addressRegion: "ON",
    postalCode: "M9N 2S1",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6989,
    longitude: -79.4975,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  areaServed: {
    "@type": "City",
    name: "York",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GBJCQPFFX4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GBJCQPFFX4');
            `
          }}
        />
      </head>
      <body>
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
