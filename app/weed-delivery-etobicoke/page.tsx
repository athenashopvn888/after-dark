import type { Metadata } from "next";
import { AreaIntentPage } from "../components/AreaIntentPage";

export const metadata: Metadata = {
  title: { absolute: "Not an Etobicoke Store | After Dark Cannabis Jane Street York" },
  description: "After Dark Cannabis is the Jane Street York walk-in at 1664 Jane Street. This URL is not an Etobicoke storefront. Adults 19+.",
  alternates: { canonical: "https://afterdarkcannabis.com/weed-delivery-york" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <AreaIntentPage eyebrow="Not a storefront · Jane Street York only" h1="Jane Street York Counter — Not an Etobicoke Store" addressLine="Walk-in: 1664 Jane Street, York, ON M9N 2S1" storeHref="/visit" storeLabel="How to Reach Jane Street" intro={[
    "After Dark Cannabis does not have an Etobicoke storefront. The walk-in counter is 1664 Jane Street in York, open 24 hours.",
    "If a drop-off is even possible, it is coordinated from the Jane Street York store and confirmed after an order is sent. Do not treat this URL as coverage of every Etobicoke address.",
    "For the physical visit, use the homepage NAP hub or the Jane Street how-to-reach page.",
  ]} sections={[{ heading: "Use the York pages instead", paragraphs: ["Walk-in details live on the homepage and /visit. York-radius drop-off, when offered, lives on the York delivery page. This Etobicoke URL is kept only so old links do not 404."] }]} />;
}
