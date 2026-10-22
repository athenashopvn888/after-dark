import { HOME_DOC_TITLE } from "./lib/homeDelivery";
import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { getFleetContent } from "./lib/fleetContent";
import { getLiveMenu } from "./lib/liveMenu";
import { faqPageJsonLd, HOME_FAQS, STORE, serializeJsonLd } from "./lib/storeIdentity";

const metadata: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  const page = fleet.pages.Home;
  if (!fleet.active || !page || (page.metaDescription === metadata.description && page.metaTitle === HOME_DOC_TITLE)) return metadata;
  const title = page.metaTitle || HOME_DOC_TITLE;
  const description = page.metaDescription || metadata.description || "";
  return {
    ...metadata,
    title: { absolute: title },
    description,
    openGraph: { ...metadata.openGraph, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let flowers: Awaited<ReturnType<typeof getLiveMenu>>["flowers"] = [];
  try {
    flowers = (await getLiveMenu()).flowers;
  } catch (error) {
    console.warn("Live homepage ranges unavailable:", error);
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqPageJsonLd(HOME_FAQS)) }}
      />
      <HomePageClient initialFlowers={flowers} />
    </>
  );
}
