import { HOME_DOC_TITLE } from "./lib/homeDelivery";
import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { faqPageJsonLd, HOME_FAQS, STORE, serializeJsonLd } from "./lib/storeIdentity";

export const metadata: Metadata = {
  title: { absolute: HOME_DOC_TITLE },
  description: STORE.seoDescription,
  keywords: [
    "dispensary near me",
    "cannabis store near me",
    "after dark cannabis",
    "cannabis near me",
    "Jane Street York dispensary",
  ],
  alternates: { canonical: STORE.homepageUrl },

  openGraph: { title: HOME_DOC_TITLE },

  twitter: { card: "summary_large_image", title: HOME_DOC_TITLE },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqPageJsonLd(HOME_FAQS)) }}
      />
      <HomePageClient />
    </>
  );
}
