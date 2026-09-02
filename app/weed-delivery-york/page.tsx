import type { Metadata } from "next";
import DeliveryContent from "../delivery/DeliveryContent";
import menu from "../delivery/delivery-menu.json";

const canonical = "https://afterdarkcannabis.com/weed-delivery-york";

export const metadata: Metadata = {
  title: "Weed Delivery York",
  description: "Browse the After Dark Cannabis delivery product catalog and compare flower tiers and prices.",
  alternates: { canonical },
};

export default function WeedDeliveryYorkPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Weed Delivery",
    url: canonical,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: menu.products.length,
      itemListElement: menu.products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <DeliveryContent />
    </>
  );
}
