import type { Metadata } from "next";
import { AreaIntentPage } from "../components/AreaIntentPage";

export const metadata: Metadata = {
  title: { absolute: "Weston Is Not a Second Store | After Dark Cannabis Jane Street" },
  description: "After Dark Cannabis is the Jane Street York walk-in at 1664 Jane Street. Weston shoppers come to Jane Street. This URL is not a Weston storefront. Adults 19+.",
  alternates: { canonical: "https://afterdarkcannabis.com/weed-delivery-york" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <AreaIntentPage eyebrow="Not a storefront · Jane Street York only" h1="Jane Street York Walk-In — Weston Is Not a Second Store" addressLine="Walk-in: 1664 Jane Street, York, ON M9N 2S1" storeHref="/visit" storeLabel="How to Reach Jane Street" intro={[
    "Weston sits on the same Jane Street / York / Weston / Mount Dennis corridor, but After Dark Cannabis is not a Weston Road storefront. The counter is 1664 Jane Street in York.",
    "A Weston drop-off, if the dispatcher can take the address, still leaves from Jane Street. Coverage is confirmed after an order — this page does not promise every Weston pin.",
    "For bus, parking, and the Lawrence West intersection, use the how-to-reach page. The homepage remains the NAP hub.",
  ]} sections={[{ heading: "Walk in on Jane Street", paragraphs: ["Plan the 24-hour visit at 1664 Jane Street. York-radius drop-off stays on the York delivery page. This Weston URL is retained so old links resolve, not so it ranks as a second shop."] }]} />;
}
