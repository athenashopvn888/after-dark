import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import AgeGate from "./components/AgeGate";
import { STORE, serializeJsonLd } from "./lib/storeIdentity";

export const metadata: Metadata = {
  metadataBase: new URL(STORE.baseUrl),
  title: {
    default: "After Dark Cannabis | Jane Street York Dispensary",
    template: "%s | After Dark Cannabis",
  },
  description:
    "After Dark Cannabis is the 24-hour Jane Street walk-in dispensary at 1664 Jane Street, York, ON M9N 2S1. Call +1 (437) 524-9344. Adults 19+.",
  keywords: [
    "Jane Street dispensary",
    "York cannabis dispensary",
    "weed store York",
    "After Dark Cannabis",
    "1664 Jane Street",
    "Weston cannabis",
    "Mount Dennis dispensary",
    "24 hour dispensary York",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: STORE.homepageUrl,
    siteName: STORE.name,
    title: "After Dark Cannabis | Jane Street York Dispensary",
    description:
      "24-hour walk-in cannabis store at 1664 Jane Street in York. Jane Street / Weston / Mount Dennis corridor. Adults 19+.",
    images: [
      {
        url: STORE.schemaImage,
        width: 1200,
        height: 630,
        alt: "After Dark Cannabis — Jane Street York dispensary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "After Dark Cannabis | Jane Street York Dispensary",
    description: "24-hour Jane Street walk-in at 1664 Jane Street, York. Call +1 (437) 524-9344.",
    images: [STORE.schemaImage],
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
    canonical: STORE.homepageUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${STORE.baseUrl}/#website`,
      url: STORE.homepageUrl,
      name: STORE.name,
      publisher: { "@id": `${STORE.baseUrl}/#store` },
    },
    {
      "@type": "CannabisStore",
      "@id": `${STORE.baseUrl}/#store`,
      name: STORE.name,
      description:
        "24-hour walk-in cannabis dispensary at 1664 Jane Street in York, ON. Jane Street / Weston / Mount Dennis corridor. Flower tiers, edibles, prerolls, and vapes. Adults 19+.",
      url: STORE.homepageUrl,
      telephone: STORE.phoneIntl,
      image: STORE.schemaImage,
      priceRange: "$3 - $12/g",
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.mapsQuery)}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: STORE.streetAddress,
        addressLocality: STORE.addressLocality,
        addressRegion: STORE.addressRegion,
        postalCode: STORE.postalCode,
        addressCountry: STORE.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: STORE.latitude,
        longitude: STORE.longitude,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      areaServed: STORE.corridor.map((name) => ({
        "@type": name === "York" ? "City" : "Place",
        name,
      })),
    },
  ],
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
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
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
        <Link className="deliveryAnnouncement" href="/weed-delivery-york">
          WEED DELIVERY IS HERE — CLICK TO EXPLORE
        </Link>
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
