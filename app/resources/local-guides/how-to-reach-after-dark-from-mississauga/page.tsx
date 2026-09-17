import type { Metadata } from "next";
import { AreaIntentPage } from "../../../components/AreaIntentPage";

export const metadata: Metadata = {
  title: { absolute: "How to Reach After Dark Cannabis From Mississauga" },
  description: "Plan a trip from Mississauga to After Dark Cannabis at 1664 Jane St in York. Review the route, current menu, 24-hour hours, and store phone.",
  alternates: { canonical: "https://afterdarkcannabis.com/resources/local-guides/how-to-reach-after-dark-from-mississauga/" },
};

export default function Page() {
  return <AreaIntentPage eyebrow="Commuter guide · York storefront" h1="How to Reach the Jane Street York Dispensary From Mississauga" addressLine="After Dark Cannabis · 1664 Jane St, York, ON M9N 2S1" storeHref="/weed-dispensary-york/" storeLabel="York Store Details" intro={[
    "After Dark Cannabis is a York store, not a Mississauga storefront. This guide is for adults travelling from Mississauga to the physical counter at 1664 Jane St.",
    "Drivers commonly plan the trip around Highway 401 and Highway 427 before continuing toward Jane Street. Check current traffic and navigation before leaving because the best route depends on your starting point and road conditions.",
    "The counter is open 24 hours, so you do not need to race a conventional closing time. Review the current menu before travelling and call +1 (437) 524-9344 if one specific item is the reason for the trip.",
  ]} sections={[{ heading: "Arriving at the York Store", paragraphs: ["Bring valid government photo ID. Adults must be 19 or older. Use the York dispensary page for the canonical address, phone, and walk-in information rather than treating this commuter guide as a Mississauga location page."] }]} />;
}
