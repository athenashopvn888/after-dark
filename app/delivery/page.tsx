import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";

export const metadata: Metadata = {
  title: "Delivery Coming Soon — After Dark Cannabis | York",
  description: "Get notified when After Dark Cannabis launches same-day weed delivery across York and surrounding areas.",
  alternates: {
    canonical: "https://afterdarkcannabis.com/delivery",
  },
};

export default function DeliveryPage() {
  return <DeliveryContent />;
}
