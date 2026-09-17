import type { Metadata } from "next";
import { AreaIntentPage } from "../../../components/AreaIntentPage";

export const metadata: Metadata = {
  title: { absolute: "Not a Mississauga Store | After Dark Cannabis Jane Street York" },
  description: "After Dark Cannabis is not in Mississauga. The walk-in counter is 1664 Jane Street, York. Use the Jane Street how-to-reach page. Adults 19+.",
  alternates: { canonical: "https://afterdarkcannabis.com/visit" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <AreaIntentPage eyebrow="Not a Mississauga location" h1="Jane Street York Walk-In — Not a Mississauga Store" addressLine="After Dark Cannabis · 1664 Jane Street, York, ON M9N 2S1" storeHref="/visit" storeLabel="How to Reach Jane Street" intro={[
    "After Dark Cannabis is a York store on Jane Street. There is no Mississauga After Dark counter and this URL is not a Mississauga landing page.",
    "If you are driving in from west of the city, you are travelling to 1664 Jane Street, just south of Lawrence Avenue West. Use live traffic tools; the 401/427 pairing is a common approach, not a promised fastest route.",
    "The counter is open 24 hours. Call +1 (437) 524-9344 if one listed item is the reason for the trip. Adults 19+ with government photo ID.",
  ]} sections={[{ heading: "Use the Jane Street reach page", paragraphs: ["Parking, the 35 Jane bus, and Weston / Mount Dennis notes live on /visit. The homepage is the NAP hub. This Mississauga URL is kept so old links do not 404, and it is not indexed as a second location."] }]} />;
}
