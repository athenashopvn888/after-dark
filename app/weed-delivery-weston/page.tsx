import type { Metadata } from "next";
import { AreaIntentPage } from "../components/AreaIntentPage";

export const metadata: Metadata = {
  title: { absolute: "Weston Weed Delivery | After Dark Cannabis" },
  description: "Plan Weston weed delivery dispatched from After Dark Cannabis on Jane Street. Coverage and arrival windows are confirmed after ordering. Adults 19+.",
  alternates: { canonical: "https://afterdarkcannabis.com/weed-delivery-weston/" },
};

export default function Page() {
  return <AreaIntentPage eyebrow="Delivery planning · Adults 19+" h1="Weston Weed Delivery from Jane Street" addressLine="Dispatched from 1664 Jane St, York" storeHref="/weed-dispensary-york/" storeLabel="Jane Street Walk-In Store" intro={[
    "After Dark Cannabis coordinates Weston weed delivery from the Jane Street store in York. The Weston delivery area is not a second storefront.",
    "The dispatcher confirms the address, availability, arrival window, and any minimum after an order is sent. Check the current menu first because products and posted prices can change.",
    "For an in-person visit, use the York dispensary page for the 24-hour counter at 1664 Jane St.",
  ]} sections={[{ heading: "Ordering From Weston", paragraphs: ["Choose the delivery route when you want a drop-off. Choose the York store route when you plan to travel to the counter. Keeping those choices separate makes the correct address and service expectation clear."] }]} />;
}
