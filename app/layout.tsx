import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import AgeGate from "./components/AgeGate";
import { STORE, cannabisStoreGraphNode, serializeJsonLd, websiteGraphNode } from "./lib/storeIdentity";

export const metadata: Metadata = {
  metadataBase: new URL(STORE.baseUrl),
  title: {
    default: STORE.seoTitleDefault,
    template: "%s | After Dark Cannabis",
  },
  description: STORE.seoDescription,
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
    title: STORE.seoTitleDefault,
    description: STORE.seoDescription,
    images: [
      {
        url: STORE.schemaImage,
        width: 1200,
        height: 630,
        alt: "After Dark Cannabis — 24-hour Jane Street York dispensary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: STORE.seoTitleDefault,
    description: STORE.seoDescription,
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
  "@graph": [websiteGraphNode(), cannabisStoreGraphNode()],
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
