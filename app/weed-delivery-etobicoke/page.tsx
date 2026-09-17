import type { Metadata } from "next";
import { AreaIntentPage } from "../components/AreaIntentPage";

export const metadata: Metadata = {
  title: { absolute: "Etobicoke Weed Delivery | After Dark Cannabis" },
  description: "Plan Etobicoke weed delivery dispatched from After Dark Cannabis in York. Coverage and arrival windows are confirmed after ordering. Adults 19+.",
  alternates: { canonical: "https://afterdarkcannabis.com/weed-delivery-etobicoke/" },
};

export default function Page() {
  return <AreaIntentPage eyebrow="Delivery planning · Adults 19+" h1="Etobicoke Weed Delivery — Ordered From York" addressLine="Dispatched from 1664 Jane St, York" storeHref="/weed-dispensary-york/" storeLabel="York Walk-In Store" intro={[
    "This page covers Etobicoke weed delivery coordinated from After Dark Cannabis at 1664 Jane St in York. There is no After Dark storefront in Etobicoke.",
    "Delivery coverage, the arrival window, and any order minimum are confirmed by the dispatcher after the order is sent. This page does not promise service to every Etobicoke address.",
    "If you want to walk in, use the York dispensary page and plan the Jane Street visit instead.",
  ]} sections={[{ heading: "Keep Delivery and Walk-In Plans Separate", paragraphs: ["Use the current menu to review categories and posted details before ordering. For an in-person visit, the physical counter is at 1664 Jane St in York and is open 24 hours."] }]} />;
}
