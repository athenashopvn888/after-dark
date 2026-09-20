import type { Metadata } from "next";
import { GBPLandingPage } from "@/app/components/GBPLandingPage";
import { STORE } from "@/app/lib/storeIdentity";

const canonical = `${STORE.baseUrl}${STORE.storePagePath}`;
const pageTitle = "Weed Dispensary in York on Jane Street | After Dark Cannabis";
const pageDescription =
  "Weed dispensary in York at 1664 Jane Street, York, ON M9N 2S1. Jane Street walk-in for flower tiers, prerolls, edibles, and vapes. Call +1 (437) 524-9344. Adults 19+.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "weed dispensary York",
    "weed dispensary Jane Street",
    "York weed dispensary",
    "Jane Street weed store",
    "weed store York ON",
  ],
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    images: [{ url: STORE.schemaImage, alt: "After Dark Cannabis — weed dispensary in York on Jane Street" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [STORE.schemaImage],
  },
};

export default function Page() {
  return <GBPLandingPage />;
}
